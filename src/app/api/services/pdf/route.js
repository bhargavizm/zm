
import { connectDB } from "@/lib/mongoDB";
import { authUser } from "@/middlewares/authMiddleware";
import PDFServiceModel from "@/models/services/pdfSchema";

// Define plan limits in bytes
const planLimits = {
  Basic: 1 * 1024 * 1024 * 1024,        // 1GB
  Starter: 2 * 1024 * 1024 * 1024,      // 2GB
  Pro: 3 * 1024 * 1024 * 1024,          // 3GB
  Advanced: 4 * 1024 * 1024 * 1024,     // 4GB
  Ultima: 5 * 1024 * 1024 * 1024,       // 5GB
};

export async function POST(request) {
  const auth = await authUser(request);

  if (auth.status !== 200) {
    return new Response(JSON.stringify(auth.json), {
      status: auth.status,
      headers: { "Content-Type": "application/json" },
    });
  }

  const currentUser = auth.user;

  try {
    await connectDB();

    const formData = await request.formData();
    const title = formData.get("title");
    const description = formData.get("description");
    const password = formData.get("password");
    const file = formData.get("file");

    // Validate file existence
    if (!file || typeof file.arrayBuffer !== "function") {
      return new Response(
        JSON.stringify({ success: false, error: "No valid file uploaded" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // 🔍 Step 1: Check file size
    const fileSizeInBytes = buffer.length;

    // 🔍 Step 2: Determine user's plan limit
    const userPlan = currentUser.plan || "Basic"; // fallback to Basic
    const maxAllowedSize = planLimits[userPlan] || planLimits["Basic"];

    if (fileSizeInBytes > maxAllowedSize) {
      return new Response(
        JSON.stringify({
          success: false,
          error: `Your plan (${userPlan}) allows only up to ${maxAllowedSize / (1024 * 1024 * 1024)} GB. Your file size is ${(fileSizeInBytes / (1024 * 1024)).toFixed(2)} MB.`,
        }),
        {
          status: 413, // Payload Too Large
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    const originalName = file.name || "uploaded_file";
    const mimeType = file.type || "application/octet-stream";

    const newFile = new PDFServiceModel({
      title,
      description,
      password,
      fileData: buffer,
      fileName: originalName,
      fileType: mimeType,
      user: {
        id: currentUser._id,
        name: currentUser.name,
      },
    });

    await newFile.save();

    return new Response(
      JSON.stringify({
        success: true,
        message: "File uploaded and saved to MongoDB",
        fileData: {
          _id: newFile._id,
          title,
          description,
          password,
          fileName: originalName,
          fileType: mimeType,
          user: {
            id: currentUser._id,
            name: currentUser.name,
          },
        },
      }),
      {
        status: 201,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Upload Error:", error);
    return new Response(
      JSON.stringify({
        success: false,
        error: error.message || "Server error",
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}



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
