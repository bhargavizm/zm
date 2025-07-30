// // app/api/resumes/upload/route.js

// import { connectDB } from "@/lib/mongoDB";

// import { cloudinary } from "@/utils/cloudinary";
// import { v4 as uuidv4 } from "uuid";
// import bcrypt from "bcryptjs";
// import ResumeModel from "@/models/services/resumeSchema";
// import { authUser } from "@/middlewares/authMiddleware";


// export const config = {
//   api: {
//     bodyParser: false,
//   },
// };

// export async function POST(request) {
//   try {
//     // Authenticate
//     const auth = await authUser(request);
//     if (auth.status !== 200) {
//       return Response.json(auth.json, { status: auth.status });
//     }

//     const user = auth.user;
//     await connectDB();

//     // Parse form data
//     const formData = await request.formData();
//     const password = formData.get("password");
//     const resumeUrl = formData.get("resumeUrl");
//     const resumeFiles = formData.getAll("resumeFiles");

//     // Validate files
//     // if ((!resumeFiles || resumeFiles.length === 0) && !resumeUrl) {
//     //   return Response.json(
//     //     { error: "Please upload at least one file or provide a URL" },
//     //     { status: 400 }
//     //   );
//     // }

//     // Check total size and per-file size
//     let totalSize = 0;
//     for (const file of resumeFiles) {
//       const fileSizeMB = file.size / (1024 * 1024);
//       totalSize += file.size;
//       if (fileSizeMB > 2) {
//         return Response.json(
//           { error: `File ${file.name} exceeds 2MB limit.` },
//           { status: 400 }
//         );
//       }
//     }
//     if (totalSize / (1024 * 1024) > 30) {
//       return Response.json(
//         { error: "Total file size exceeds 30MB limit." },
//         { status: 400 }
//       );
//     }

//     // Upload files to Cloudinary
//     const uploadedFiles = [];
//     for (const file of resumeFiles) {
//       const arrayBuffer = await file.arrayBuffer();
//       const buffer = Buffer.from(arrayBuffer);

//       const cloudinaryResult = await new Promise((resolve, reject) => {
//         cloudinary.uploader
//           .upload_stream(
//             {
//               resource_type: "auto",
//               public_id: `resumes/${uuidv4()}`,
//             },
//             (error, result) => {
//               if (error) reject(error);
//               else resolve(result);
//             }
//           )
//           .end(buffer);
//       });

//       uploadedFiles.push({
//         fileName: file.name,
//         url: cloudinaryResult.secure_url,
//       });
//     }

//     // Encrypt password if present
//     let hashedPassword = "";
//     if (password) {
//       const salt = await bcrypt.genSalt(10);
//       hashedPassword = await bcrypt.hash(password, salt);
//     }

//     // Save single document
//     const newResume = new ResumeModel({
//       user: {
//         id: user._id,
//         name: user.name,
//       },
//       resumeFiles: uploadedFiles,
//       resumeUrl,
//       password: hashedPassword,
//     });

//     const savedResume = await newResume.save();

//     return Response.json({
//       success: true,
//       message: "Resumes uploaded successfully",
//       data: savedResume,
//     });
//    } catch (error) {
//     console.error("Resume upload error:", error);
//     return Response.json(
//       { error: "Internal server error" },
//       { status: 500 }
//     );
//   }
// }


// import { connectDB } from "@/lib/mongoDB"; Ali It is coudanary
// import { cloudinary } from "@/utils/cloudinary";
// import { v4 as uuidv4 } from "uuid";
// import bcrypt from "bcryptjs";
// import ResumeModel from "@/models/services/resumeSchema";
// import { authUser } from "@/middlewares/authMiddleware";
// import { getShortenedUrl } from "@/utils/shortenUrl";

// export const config = {

//   api: {
//     bodyParser: false,
//   },
// };

// export async function POST(request) {
//   try {
//     // ✅ Authenticate user
//     const auth = await authUser(request);
//     if (auth.status !== 200) {
//       return Response.json(auth.json, { status: auth.status });
//     }
//     const user = auth.user;
//     await connectDB();

//     // ✅ Parse multipart/form-data
//     const formData = await request.formData();
//     const password = formData.get("password");
//     const resumeUrl = formData.get("resumeUrl");
//     const bgDesign = formData.get("bgDesign")
//     const resumeFiles = formData.getAll("resumeFiles");

//     // ✅ Optional QR-related fields
//     const qrCodeImage = formData.get("qrCodeImage") || "";
//     const latitude = formData.get("latitude") || null;
//     const longitude = formData.get("longitude") || null;
//     const address = formData.get("address") || "";
//     const renewalDate = formData.get("renewalDate") || null;
//     const status = formData.get("status") || "active";

//     // ✅ Validate file sizes
//     let totalSize = 0;
//     for (const file of resumeFiles) {
//       const fileSizeMB = file.size / (1024 * 1024);
//       totalSize += file.size;
//       if (fileSizeMB > 2) {
//         return Response.json(
//           { error: `File ${file.name} exceeds 2MB limit.` },
//           { status: 400 }
//         );
//       }
//     }

//     if (totalSize / (1024 * 1024) > 30) {
//       return Response.json(
//         { error: "Total file size exceeds 30MB limit." },
//         { status: 400 }
//       );
//     }

//     // ✅ Upload files to Cloudinary
//     const uploadedFiles = [];
//     for (const file of resumeFiles) {
//       const arrayBuffer = await file.arrayBuffer();
//       const buffer = Buffer.from(arrayBuffer);

//       const cloudinaryResult = await new Promise((resolve, reject) => {
//         cloudinary.uploader
//           .upload_stream(
//             {
//               resource_type: "auto",
//               public_id: `resumes/${uuidv4()}`,
//             },
//             (error, result) => {
//               if (error) reject(error);
//               else resolve(result);
//             }
//           )
//           .end(buffer);
//       });

//       uploadedFiles.push({
//         fileName: file.name,
//         url: cloudinaryResult.secure_url,
//       });
//     }

//     // ✅ Hash password
//     let hashedPassword = "";
//     if (password) {
//       const salt = await bcrypt.genSalt(10);
//       hashedPassword = await bcrypt.hash(password, salt);
//     }

//     // ✅ Save to MongoDB
//     const newResume = new ResumeModel({
//       user: {
//         id: user._id,
//         name: user.name,
//       },
//       resumeFiles: uploadedFiles,
//       resumeUrl,
//       password: hashedPassword,
//       bgDesign,
//       qrCodeDetails: {
//         qrCodeImage,
//         location: {
//           latitude,
//           longitude,
//           address,
//         },
//         renewalDate,
//         status,
//         resetPasswordToken: null,
//         resetPasswordExpires: null,
//       },
//     });

//     const savedResume = await newResume.save();
//     const qrUrl = await getShortenedUrl(`/resume/${savedResume._id}`);

//     return Response.json({
//       success: true,
//       message: "Resumes uploaded successfully",
//       data: savedResume,qrUrl
//     });

//   } catch (error) {
//     console.error("Resume upload error:", error);
//     return Response.json(
//       { error: "Internal server error" },
//       { status: 500 }
//     );
//   }
// }


import { connectDB } from "@/lib/mongoDB";
import bcrypt from "bcryptjs";
import ResumeModel from "@/models/services/resumeSchema";
import { authUser } from "@/middlewares/authMiddleware";
import { getShortenedUrl } from "@/utils/shortenUrl";
import fs from "fs";
import path from "path";

export const config = {
  api: {
    bodyParser: false,
  },
  runtime: "nodejs",
};

export async function POST(request) {
  try {
    const auth = await authUser(request);
    if (auth.status !== 200) {
      return new Response(JSON.stringify(auth.json), {
        status: auth.status,
        headers: { "Content-Type": "application/json" },
      });
    }
    const user = auth.user;
    await connectDB();

    const formData = await request.formData();
    const password = formData.get("password");
    const resumeUrl = formData.get("resumeUrl");
    const bgDesign = formData.get("bgDesign");
    const resumeFiles = formData.getAll("resumeFiles");

    const qrCodeImage = formData.get("qrCodeImage") || "";
    const latitude = formData.get("latitude") || null;
    const longitude = formData.get("longitude") || null;
    const address = formData.get("address") || "";
    const renewalDate = formData.get("renewalDate") || null;
    const status = formData.get("status") || "active";

    let totalSize = 0;
    const storedFiles = [];

    const uploadDir = path.join(process.cwd(), "public", "uploads", "resumes");
    if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

    for (const file of resumeFiles) {
      const fileBuffer = Buffer.from(await file.arrayBuffer());
      const fileSizeMB = file.size / (1024 * 1024);
      totalSize += file.size;

      if (fileSizeMB > 2) {
        return new Response(JSON.stringify({ error: `File "${file.name}" exceeds 2MB.` }), {
          status: 400,
          headers: { "Content-Type": "application/json" },
        });
      }

      const fileName = `${Date.now()}-${file.name.replace(/\s+/g, "_")}`;
      const filePath = path.join(uploadDir, fileName);
      fs.writeFileSync(filePath, fileBuffer);

      storedFiles.push({
        fileName,
        fileType: file.type,
      });
    }

    if (totalSize / (1024 * 1024) > 30) {
      return new Response(JSON.stringify({ error: "Total size exceeds 30MB." }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    let hashedPassword = "";
    if (password) {
      const salt = await bcrypt.genSalt(10);
      hashedPassword = await bcrypt.hash(password, salt);
    }

    const newResume = new ResumeModel({
      user: { id: user._id, name: user.name },
      resumeFiles: storedFiles,
      resumeUrl,
      password: hashedPassword,
      bgDesign,
      qrCodeDetails: {
        qrCodeImage,
        location: { latitude, longitude, address },
        renewalDate,
        status,
      },
    });

    const savedResume = await newResume.save();
    const qrUrl = await getShortenedUrl(`/resume/${savedResume._id}`);

    return new Response(
      JSON.stringify({
        success: true,
        message: "Resume saved with files.",
        data: savedResume,
        qrUrl,
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Resume upload error:", error);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
