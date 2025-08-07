import { connectDB } from "@/lib/mongoDB";
import { authUser } from "@/middlewares/authMiddleware";
import { cloudinary } from "@/utils/cloudinary";
import { getShortenedUrl } from "@/utils/shortenUrl";
import bcrypt from "bcryptjs";
import fs from "fs";
import path from "path";
import { v4 as uuidv4 } from "uuid";

export const config = {
  api: {
    bodyParser: false, // Important for handling multipart/form-data
  },
};

// ✅ Plan Limits (1GB to 5GB)
const planLimits = {
  Basic: 1 * 1024 * 1024 * 1024, // 1 GB
  Starter: 2 * 1024 * 1024 * 1024, // 2 GB
  Pro: 3 * 1024 * 1024 * 1024, // 3 GB
  Advanced: 4 * 1024 * 1024 * 1024, // 4 GB
  Ultima: 5 * 1024 * 1024 * 1024, // 5 GB
};

const getPlanLimit = (userPlan = "Basic") => {
  return planLimits[userPlan] || planLimits.Basic;
};

function capitalize(str) {
  return str?.charAt(0)?.toUpperCase() + str?.slice(1);
}

// ✅ Main Upload Handler
export async function HandleEncryptedServices({
  serviceName,
  request,
  model,
  folder = "",
  resourceType = null, // "image", "video", or null
  allowedMimeTypes = null,
  // mediaField = "files",
  useCloudinary = false,
}) {
  try {
    // 🔐 Step 1: Authenticate User
    const auth = await authUser(request);
    if (auth.status !== 200) {
      return new Response(JSON.stringify(auth.json), {
        status: auth.status,
        headers: { "Content-Type": "application/json" },
      });
    }

    const user = auth.user;
    await connectDB();

    // 🧾 Step 2: Parse form data
    const formData = await request.formData();
    const title = formData.get("title");
    const description = formData.get("description");
    const bgDesign = formData.get("bgDesign");
    const qrCodeImage = formData.get("qrCodeImage");
    const scanCount = formData.get("scanCount");
    const latitude = formData.get("latitude");
    const longitude = formData.get("longitude");
    const address = formData.get("address");
    const renewalDate = formData.get("renewalDate");
    const status = formData.get("status");
    let password = formData.get("password") || "";

    if (password) {
      const salt = await bcrypt.genSalt(10);
      password = await bcrypt.hash(password, salt);
    }

    const planLimit = getPlanLimit(user?.plan || "Basic");
    const files = [];
    let totalSize = 0;

    // 📂 Step 3: Process all uploaded files
    const uploadedFiles = formData.getAll("files"); // always returns an array (even for one file)

    for (const file of uploadedFiles) {
      if (!file || typeof file.arrayBuffer !== "function") continue;

      // 🔎 Validate type
      if (allowedMimeTypes && !allowedMimeTypes.includes(file.type)) {
        return new Response(
          JSON.stringify({
            success: false,
            error: `Unsupported file format: ${file.name}`,
          }),
          { status: 400 }
        );
      }

      // 🧮 Size checks
      let fileSize = 0;
      let arrayBuffer = null;

      if (useCloudinary && resourceType) {
        arrayBuffer = await file.arrayBuffer();
        fileSize = arrayBuffer.byteLength;
      } else {
        fileSize = file.size ?? 0;
      }

      totalSize += fileSize;

      // ☁️ Upload or collect file info
      if (useCloudinary && resourceType) {
        const base64Data = `data:${file.type};base64,${Buffer.from(
          arrayBuffer
        ).toString("base64")}`;

        const result = await cloudinary.uploader.upload(base64Data, {
          folder,
          resource_type: resourceType,
        });

        files.push({
          url: result.secure_url,
          name: file.name || result.original_filename,
        });
        // } else {
        //   files.push({
        //     fileName: file.name,
        //     fileType: file.type,
        //   });
        // }
      } else {
        // 🔽 Save to /public/uploads/<serviceName>/<uniqueName.ext>
        const uploadsDir = path.join(
          process.cwd(),
          "public",
          "uploads",
          serviceName
        );
        if (!fs.existsSync(uploadsDir)) {
          fs.mkdirSync(uploadsDir, { recursive: true });
        }

        const fileExt = path.extname(file.name) || "";
        const uniqueName = `${uuidv4()}${fileExt}`;
        const filePath = path.join(uploadsDir, uniqueName);

        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        fs.writeFileSync(filePath, buffer);

        // ✅ Add file info for database
        files.push({
          fileName: file.name,
          fileType: file.type,
          localPath: `/uploads/${serviceName}/${uniqueName}`, // Publicly accessible
        });
      }
    }

    const qrCodeDetails = {
      qrCodeImage,
      scanCount: scanCount ? Number(scanCount) : undefined,
      location: {
        latitude: latitude ? Number(latitude) : undefined,
        longitude: longitude ? Number(longitude) : undefined,
        address: address || "",
      },
      renewalDate: renewalDate ? new Date(renewalDate) : null,
      status: status || "active",
    };

    // 📝 Step 4: Save to database
    const newDoc = await model.create({
      user: { id: user._id, name: user.name },
      title,
      description,
      bgDesign,
      password,
      files,
      qrCodeDetails,
    });
    const qrUrl = await getShortenedUrl(`/${serviceName}/${newDoc._id}`);
    // ✅ Return success
    return new Response(
      JSON.stringify({
        success: true,
        message: `${serviceName} service data submitted successfully`,
        // type: totalSize > planLimit ? "upgrade" : "normal",
        data: newDoc,
        qrUrl,
      }),
      { status: 201 }
    );
  } catch (error) {
  console.error("Upload Error:", error);

    return Response.json(
      {
        success: false,
        message: "Upload failed",
        error: error.message || "Internal Server Error",
      },
      { status: 500 }
    );
}

}
