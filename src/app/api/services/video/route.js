import { connectDB } from "@/lib/mongoDB";
import { authUser } from "@/middlewares/authMiddleware";
import videoServiceModel from "@/models/services/videoSchema";
import bcrypt from "bcryptjs";

// Plan limits (in bytes)
const planLimits = {
  Basic: 1 * 1024 * 1024 * 1024,      // 1 GB
  Starter: 2 * 1024 * 1024 * 1024,    // 2 GB
  Pro: 3 * 1024 * 1024 * 1024,        // 3 GB
  Advanced: 4 * 1024 * 1024 * 1024,   // 4 GB
  Ultima: 5 * 1024 * 1024 * 1024,     // 5 GB
};

// Allowed video MIME types
const allowedVideoTypes = [
  "video/mp4",
  "video/webm",
  "video/ogg",
  "video/x-matroska",
  "video/quicktime",
];

export async function POST(request) {
  const auth = await authUser(request);
  if (auth.status !== 200) {
    return new Response(JSON.stringify(auth.json), {
      status: auth.status,
      headers: { "Content-Type": "application/json" },
    });
  }

  const currentUser = auth.user;
  const userPlan = currentUser.plan || "Basic";
  const maxAllowedSize = planLimits[userPlan];

  try {
    await connectDB();

    const formData = await request.formData();
    const title = formData.get("title");
    const description = formData.get("description");
    let password = formData.get("password");
    const files = formData.getAll("file");

    if (!files.length) {
      return new Response(
        JSON.stringify({ success: false, error: "No video files uploaded" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    if (password) {
      const salt = await bcrypt.genSalt(10);
      password = await bcrypt.hash(password, salt);
    }

    let totalSize = 0;
    const filesToSave = [];

    for (const file of files) {
      if (!file || typeof file.arrayBuffer !== "function") continue;

      if (!allowedVideoTypes.includes(file.type)) {
        return new Response(
          JSON.stringify({
            success: false,
            error: `🚫 Invalid file type "${file.type}". Only video files (MP4, WEBM, OGG, MKV, MOV) are allowed.`,
          }),
          { status: 400, headers: { "Content-Type": "application/json" } }
        );
      }

      const buffer = Buffer.from(await file.arrayBuffer());
      const fileSize = buffer.length;
      totalSize += fileSize;

      if (fileSize > maxAllowedSize) {
        const nextPlan = Object.entries(planLimits).find(
          ([_, limit]) => fileSize <= limit
        );
        const readableSize = (fileSize / (1024 * 1024)).toFixed(2); // MB
        const readableLimit = (maxAllowedSize / (1024 * 1024)).toFixed(2); // MB

        let upgradeMessage = `🚫 File "${file.name}" is ${readableSize} MB, which exceeds your ${userPlan} plan limit (${readableLimit} MB).`;

        if (nextPlan) {
          upgradeMessage += ` Please upgrade to the ${nextPlan[0]} plan to upload this file.`;
        } else {
          upgradeMessage += ` Even the highest plan cannot support this file size.`;
        }

        return new Response(
          JSON.stringify({ success: false, error: upgradeMessage }),
          { status: 413, headers: { "Content-Type": "application/json" } }
        );
      }

      filesToSave.push({
        // fileData: buffer, // uncomment if you want to store in DB
        fileName: file.name || `video-${Date.now()}`,
        fileType: file.type || "video/mp4",
      });
    }

    if (totalSize > maxAllowedSize) {
      const totalReadable = (totalSize / (1024 * 1024)).toFixed(2);
      const planReadable = (maxAllowedSize / (1024 * 1024)).toFixed(2);

      return new Response(
        JSON.stringify({
          success: false,
          error: `🚫 Total upload is ${totalReadable} MB which exceeds your ${userPlan} plan (${planReadable} MB). Please upgrade your plan.`,
        }),
        { status: 413, headers: { "Content-Type": "application/json" } }
      );
    }

    const newDoc = new videoServiceModel({
      title,
      description,
      password,
      files: filesToSave,
      user: {
        id: currentUser._id,
        name: currentUser.name,
      },
    });

    await newDoc.save();

    return new Response(
      JSON.stringify({
        success: true,
        message: `${filesToSave.length} video file(s) uploaded successfully.`,
        videoData: newDoc,
      }),
      { status: 201, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Video Upload Error:", error);
    return new Response(
      JSON.stringify({
        success: false,
        error: error.message || "Internal server error",
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
