

import { NextResponse } from "next/server";

import { connectDB } from "@/lib/mongoDB";
import { authUser } from "@/middlewares/authMiddleware";
import PDFServiceModel from "@/models/services/pdfSchema";

// POST handler
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

    const formData = await request.formData();
    const title = formData.get("title");
    const description = formData.get("description");
    const password = formData.get("password") || "";

    // const userId = formData.get("userId"); // Required from frontend
    // const userName = formData.get("userName");

    // Collect multiple files
    const files = [];
    for (const [key, value] of formData.entries()) {
      if (key === "files" && value instanceof File) {
        const arrayBuffer = await value.arrayBuffer();
        files.push({
          //fileData: Buffer.from(arrayBuffer),
          fileName: value.name,
          fileType: value.type,
        });
      }
    }

    const newPDF = await PDFServiceModel.create({
       user: {
        id: user._id,
        name: user.name,
      },
      title,
      description,
      password,
      files
    });

    return NextResponse.json({ success: true, data: newPDF }, { status: 201 });
  } catch (error) {
    console.error("PDF Upload Error:", error);
    return NextResponse.json({ success: false, message: "Failed to upload PDFs." }, { status: 500 });
  }
}

// import { connectDB } from "@/lib/mongoDB";
// import { authUser } from "@/middlewares/authMiddleware";
// import PDFServiceModel from "@/models/services/pdfSchema";
// import bcrypt from "bcryptjs";


// // Plan limits (in bytes)
// const planLimits = {
//   Basic: 1 * 1024 * 1024 * 1024,      // 1 GB
//   Starter: 2 * 1024 * 1024 * 1024,    // 2 GB
//   Pro: 3 * 1024 * 1024 * 1024,        // 3 GB
//   Advanced: 4 * 1024 * 1024 * 1024,   // 4 GB
//   Ultima: 5 * 1024 * 1024 * 1024,     // 5 GB
// };

// export async function POST(request) {
//   const auth = await authUser(request);
//   if (auth.status !== 200) {
//     return new Response(JSON.stringify(auth.json), {
//       status: auth.status,
//       headers: { "Content-Type": "application/json" },
//     });
//   }

//   const currentUser = auth.user;
//   const userPlan = currentUser.plan || "Basic";
//   const maxAllowedSize = planLimits[userPlan];

//   try {
//     await connectDB();

//     const formData = await request.formData();
//     const title = formData.get("title") || "Untitled";
//     const description = formData.get("description") || "";
//     let password = formData.get("password") || "";
//     const files = formData.getAll("file");

//     if (password) {
//   const salt = await bcrypt.genSalt(10);
//   password = await bcrypt.hash(password, salt);
// }

//     if (!files.length) {
//       return new Response(JSON.stringify({ success: false, error: "No files uploaded" }), {
//         status: 400,
//         headers: { "Content-Type": "application/json" },
//       });
//     }
    

//     let totalSize = 0;
//     const filesToSave = [];

//     for (const file of files) {
//       if (!file || typeof file.arrayBuffer !== "function") continue;

//       const buffer = Buffer.from(await file.arrayBuffer());
//       const fileSize = buffer.length;

//       totalSize += fileSize;

//       if (fileSize > maxAllowedSize) {
//         const nextPlan = Object.entries(planLimits).find(([_, limit]) => fileSize <= limit);

//         const readableSize = (fileSize / (1024 * 1024)).toFixed(2); // MB
//         const readableLimit = (maxAllowedSize / (1024 * 1024)).toFixed(2); // MB

//         let upgradeMessage = `File "${file.name}" is ${readableSize} MB, which exceeds your ${userPlan} plan limit (${readableLimit} MB).`;

//         if (nextPlan) {
//           upgradeMessage += ` Please upgrade to the ${nextPlan[0]} plan to upload this file.`;
//         } else {
//           upgradeMessage += ` Even the highest plan cannot support this file size.`;
//         }

//         return new Response(JSON.stringify({ success: false, error: upgradeMessage }), {
//           status: 413,
//           headers: { "Content-Type": "application/json" },
//         });
//       }

//       filesToSave.push({
//         fileName: file.name || `file-${Date.now()}`,
//         fileType: file.type || "application/pdf",
//       });
//     }

//     if (totalSize > maxAllowedSize) {
//       const totalReadable = (totalSize / (1024 * 1024)).toFixed(2);
//       const planReadable = (maxAllowedSize / (1024 * 1024)).toFixed(2);

//       return new Response(
//         JSON.stringify({
//           success: false,
//           error: `Your total upload is ${totalReadable} MB which exceeds your ${userPlan} plan (${planReadable} MB). Please upgrade your plan.`,
//         }),
//         {
//           status: 413,
//           headers: { "Content-Type": "application/json" },
//         }
//       );
//     }

//     const newDoc = new PDFServiceModel({
//       title,
//       description,
//       password,
//       files: filesToSave,
//       user: {
//         id: currentUser._id,
//         name: currentUser.name,
//       },
//     });

//     await newDoc.save();

//     return new Response(JSON.stringify({
//       success: true,
//       message: `${filesToSave.length} file(s) uploaded successfully.`,
//       pdfData: newDoc,
//     }), {
//       status: 201,
//       headers: { "Content-Type": "application/json" },
//     });

//   } catch (error) {
//     console.error("Upload Error:", error);
//     return new Response(JSON.stringify({
//       success: false,
//       error: error.message || "Internal server error",
//     }), {
//       status: 500,
//       headers: { "Content-Type": "application/json" },
//     });
//   }
// }





















// import { connectDB } from "@/lib/mongoDB";
// import { authUser } from "@/middlewares/authMiddleware";
// import PDFServiceModel from "@/models/services/pdfSchema";

// export async function POST(request) {
//   // 🔐 Step 1: Auth check
//   const auth = await authUser(request);
//   if (auth.status !== 200) {
//     return new Response(JSON.stringify(auth.json), {
//       status: auth.status,
//       headers: { "Content-Type": "application/json" },
//     });
//   }

//   const currentUser = auth.user;

//   try {
//     await connectDB();

//     const formData = await request.formData();
//     const title = formData.get("title");
//     const description = formData.get("description");
//     const password = formData.get("password");
//     const file = formData.get("file");

//     // ✅ Basic validation
//     if (!file || typeof file.arrayBuffer !== "function") {
//       return new Response(
//         JSON.stringify({ success: false, error: "No valid file uploaded" }),
//         { status: 400, headers: { "Content-Type": "application/json" } }
//       );
//     }

//     const arrayBuffer = await file.arrayBuffer();
//     const buffer = Buffer.from(arrayBuffer);

//     const originalName = file.name || "uploaded_file";
//     const mimeType = file.type || "application/octet-stream";

//     // ✅ Save in MongoDB
//     const newFile = new PDFServiceModel({
//       title,
//       description,
//       password,
//       fileData: buffer,
//       fileName: originalName,
//       fileType: mimeType,
//       user: {
//         id: currentUser._id,
//         name: currentUser.name,
//       },
//     });

//     await newFile.save();

//     return new Response(
//       JSON.stringify({
//         success: true,
//         message: "File uploaded and saved to MongoDB",
//         fileData: {
//           _id: newFile._id,
//           title,
//           description,
//           password,
//           fileName: originalName,
//           fileType: mimeType,
//           user: {
//             id: currentUser._id,
//             name: currentUser.name,
//           },
//         },
//       }),
//       {
//         status: 201,
//         headers: { "Content-Type": "application/json" },
//       }
//     );
//   } catch (error) {
//     console.error("Upload Error:", error);
//     return new Response(
//       JSON.stringify({
//         success: false,
//         error: error.message || "Server error",
//       }),
//       {
//         status: 500,
//         headers: { "Content-Type": "application/json" },
//       }
//     );
//   }
// }



// import { connectDB } from "@/lib/mongoDB";
// import PDFServiceModel from "@/models/services/pdfSchema";
// import { cloudinary } from "@/utils/cloudinary";

// import { authUser } from "@/middlewares/authMiddleware";

// import { v4 as uuidv4 } from "uuid";

// export async function POST(request) {
//   try {
//     await connectDB();

//     const formData = await request.formData();
//     const title = formData.get("title");
//     const description = formData.get("description");
//     const password = formData.get("password");
//     const file = formData.get("file");

//     if (!file || typeof file.arrayBuffer !== "function") {
//       return new Response(
//         JSON.stringify({ success: false, error: "No valid file uploaded" }),
//         { status: 400, headers: { "Content-Type": "application/json" } }
//       );
//     }

//     // ✅ Size check
// // const maxSizeInBytes = 5 * 1024 * 1024; // 5MB
// // if (file.size > maxSizeInBytes) {
// //   return new Response(
// //     JSON.stringify({ success: false, error: "File size exceeds 5MB limit" }),
// //     { status: 400, headers: { "Content-Type": "application/json" } }
// //   );
// // }

//     const arrayBuffer = await file.arrayBuffer();
//     const buffer = Buffer.from(arrayBuffer);

//     const originalName = file.name || "file";
//     const fileSize = file.size;
//     const fileExtension = originalName.split(".").pop();

//     const uploadResponse = await new Promise((resolve, reject) => {
//       cloudinary.uploader
//         .upload_stream(
//           {
//             resource_type: "auto",
//             content_disposition: "inline",
//             format: "pdf",

//             public_id: `uploads/${uuidv4()}`,
//           },
//           (error, result) => {
//             if (error) return reject(error);
//             resolve(result);
//           }
//         )
//         .end(buffer);
//     });
// console.log(uploadResponse)
//     const newFile = new PDFServiceModel({
//       title,
//       description,
//       pdfFileName: uploadResponse.secure_url,
//       password,

//     });

//     await newFile.save();

//     return new Response(
//       JSON.stringify({
//         success: true,
//         message: "File uploaded and saved successfully",
//         fileData: newFile,
//       }),
//       {
//         status: 201,
//         headers: {
//           "Content-Type": "application/json",
//         },
//       }
//     );
//   } catch (error) {
//     console.error("Upload Error:", error.message);

//     return new Response(
//       JSON.stringify({
//         success: false,
//         error: error.message || "Internal Server Error",
//       }),
//       {
//         status: 500,
//         headers: {
//           "Content-Type": "application/json",
//         },
//       }
//     );
//   }
// }
// export async function POST(request) {
//   // 🔐 Step 1: Auth check
//   const auth = await authUser(request);
//   if (auth.status !== 200) {
//     return new Response(JSON.stringify(auth.json), {
//       status: auth.status,
//       headers: { "Content-Type": "application/json" },
//     });
//   }

//   const currentUser = auth.user; // now you have access to user._id, user.email, etc.

//   try {
//     await connectDB();

//     const formData = await request.formData();
//     const title = formData.get("title");
//     const description = formData.get("description");
//     const password = formData.get("password");
//     const file = formData.get("file");

//     if (!file || typeof file.arrayBuffer !== "function") {
//       return new Response(
//         JSON.stringify({ success: false, error: "No valid file uploaded" }),
//         { status: 400, headers: { "Content-Type": "application/json" } }
//       );
//     }

//     const arrayBuffer = await file.arrayBuffer();
//     const buffer = Buffer.from(arrayBuffer);

//     const originalName = file.name || "file";
//     const fileExtension = originalName.split(".").pop();

//     const uploadResponse = await new Promise((resolve, reject) => {
//       cloudinary.uploader
//         .upload_stream(
//           {
//             resource_type: "auto",
//             content_disposition: "inline",
//             format: fileExtension, // make it dynamic instead of hardcoding pdf
//             public_id: `uploads/${uuidv4()}`,
//           },
//           (error, result) => {
//             if (error) return reject(error);
//             resolve(result);
//           }
//         )
//         .end(buffer);
//     });

//     const newFile = new PDFServiceModel({
//       title,
//       description,
//       password,
//       pdfFileURL: uploadResponse.secure_url,
//       pdfFileName: originalName,
//       user: {
//         id: currentUser._id,
//         name: currentUser.name,
//       },
//     });

//     await newFile.save();

//     return new Response(
//       JSON.stringify({
//         success: true,
//         message: "File uploaded and saved successfully",
//         fileData: newFile,
//       }),
//       {
//         status: 201,
//         headers: { "Content-Type": "application/json" },
//       }
//     );
//   } catch (error) {
//     console.error("Upload Error:", error.message);

//     return new Response(
//       JSON.stringify({
//         success: false,
//         error: error.message || "Server error",
//       }),
//       {
//         status: 500,
//         headers: { "Content-Type": "application/json" },
//       }
//     );
//   }
// }
