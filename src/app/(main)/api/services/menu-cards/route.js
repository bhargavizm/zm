import { connectDB } from "@/lib/mongoDB";
import { authUser } from "@/middlewares/authMiddleware";
import EventModel from "@/models/services/eventSchema";
import { getShortenedUrl } from "@/utils/shortenUrl";
import { cloudinary } from "@/utils/cloudinary";
import bcrypt from "bcrypt";

export async function POST(request) {
  try {
    // ✅ Step 1: Authenticate User
    const auth = await authUser(request);
    if (auth.status !== 200) {
      return new Response(JSON.stringify(auth.json), {
        status: auth.status,
        headers: { "Content-Type": "application/json" },
      });
    }
    const user = auth.user;
    await connectDB();

    // ✅ Step 2: Parse FormData
    const formData = await request.formData();

    const organizer = formData.get("organizer") || "";
    const title = formData.get("title") || "";
    const summary = formData.get("summary") || "";
    const fromDate = formData.get("fromDate") || null;
    const toDate = formData.get("toDate") || null;
    const venue = formData.get("venue") || "";
    const address = formData.get("address") || "";
    const contactName = formData.get("contactName") || "";
    const contactEmail = formData.get("contactEmail") || "";
    const contactPhone = formData.get("contactPhone") || "";
    const bgDesign = formData.get("bgDesign") || "";
    const plainPassword = formData.get("password") || "";

    // ✅ Step 3: Hash Password
    const hashedPassword = plainPassword
      ? await bcrypt.hash(plainPassword, 10)
      : null;

    // ✅ Step 4: Upload multiple files to Cloudinary
    const files = formData.getAll("files"); // expect <input type="file" name="files" multiple>
    const uploadedFiles = [];
    let totalSize = 0;

    for (const file of files) {
      if (typeof file.arrayBuffer !== "function") continue;

      const arrayBuffer = await file.arrayBuffer();
      const sizeInBytes = arrayBuffer.byteLength;
      const sizeInMB = (sizeInBytes / (1024 * 1024)).toFixed(2);

      // Single file limit 2MB
      if (sizeInBytes > 2 * 1024 * 1024) {
        return new Response(
          JSON.stringify({
            success: false,
            error: `❌ ${file.name} is ${sizeInMB}MB and exceeds 2MB limit.`,
          }),
          { status: 400, headers: { "Content-Type": "application/json" } }
        );
      }

      // Total upload size limit 30MB
      totalSize += sizeInBytes;
      const totalSizeInMB = (totalSize / (1024 * 1024)).toFixed(2);
      if (totalSize > 30 * 1024 * 1024) {
        return new Response(
          JSON.stringify({
            success: false,
            error: `❌ Total upload size ${totalSizeInMB}MB exceeds 30MB limit.`,
          }),
          { status: 400, headers: { "Content-Type": "application/json" } }
        );
      }

      // Convert to base64 for cloudinary
      const buffer = Buffer.from(arrayBuffer);
      const base64 = buffer.toString("base64");
      const dataUri = `data:${file.type};base64,${base64}`;

      const uploaded = await cloudinary.uploader.upload(dataUri, {
        folder: "events", // optional folder
        public_id: file.name.split(".")[0],
      });

      uploadedFiles.push({
        url: uploaded.secure_url,
        name: file.name
      });
    }

    // ✅ Step 5: Get additional QR fields
    // const qrCodeImage = formData.get("qrCodeImage") ?? "";
    // const qrPassword = formData.get("qrPassword") ?? "";
    // const qrLatitude = formData.get("latitude") ?? null;
    // const qrLongitude = formData.get("longitude") ?? null;
    // const qrAddress = formData.get("address") ?? "";
    // const renewalDate = formData.get("renewalDate") ?? null;
    // const status = formData.get("status") ?? "active";

    // ✅ Step 6: Save Event to MongoDB
    const newEvent = new EventModel({
      user: {
        id: user._id,
        name: user.name,
      },
      organizer,
      title,
      summary,
      fromDate,
      toDate,
      venue,
      address,
      contactName,
      contactEmail,
      contactPhone,
      bgDesign,
      password: hashedPassword,
      files: uploadedFiles, // ✅ save cloudinary uploads here
      qrCodeDetails: {
        qrCodeImage,
        qrPassword,
        location: {
          latitude: qrLatitude,
          longitude: qrLongitude
        },
        renewalDate,
        status,
        resetPasswordToken: null,
        resetPasswordExpires: null,
      },
    });

    await newEvent.save();

    const qrUrl = await getShortenedUrl(`/events/${newEvent._id}`);

    return new Response(
      JSON.stringify({
        success: true,
        message: "Event created successfully.",
        data: newEvent,
        qrUrl,
      }),
      { status: 201, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Event creation error:", error);
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
