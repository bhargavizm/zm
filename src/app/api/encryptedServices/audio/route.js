import AudioServiceModel from "@/models/services/audioSchema";
import { HandleEncryptedServices } from "../common/encryptedServicesRoute";


export const audioMimeTypes = [
  "audio/mpeg",
  "audio/wav",
  "audio/ogg",
  "audio/webm",
  "audio/mp3",
  "audio/flac",
  "audio/x-wav",
  "audio/aiff",
   "audio/x-aiff",
   "audio/aac",
   "audio/mp4", 
   "audio/x-m4a",
   "audio/x-ms-wma",
   "audio/opus"
];

export async function POST(request) {
  return HandleEncryptedServices({
    request,
    model: AudioServiceModel,
    useCloudinary: false,
    mediaField: "files",
    allowedMimeTypes: audioMimeTypes, // allow all audio formats
  });
}


// import { connectDB } from "@/lib/mongoDB";
// import { authUser } from "@/middlewares/authMiddleware";
// import AudioServiceModel from "@/models/services/audioSchema";
// import { NextResponse } from "next/server";

// // Allowed audio MIME types
// export const audioMimeTypes = [
//   "audio/mpeg",
//   "audio/wav",
//   "audio/ogg",
//   "audio/webm",
//   "audio/mp3",
//   "audio/flac",
//   "audio/x-wav",
//   "audio/aiff",
//   "audio/x-aiff",
//   "audio/aac",
//   "audio/mp4",
//   "audio/x-m4a",
//   "audio/x-ms-wma",
//   "audio/opus",
// ];

// export async function POST(req) {
//   try {
//     // ✅ Authenticate User
//     const auth = await authUser(req);
//     if (auth.status !== 200) {
//       return new Response(JSON.stringify(auth.json), {
//         status: auth.status,
//         headers: { "Content-Type": "application/json" },
//       });
//     }

//     const user = auth.user;

//     // ✅ Parse JSON Body
//     const body = await req.json();
//     const {
//       title,
//       description,
//       password,
//       files = [],
//       location,
//       renewalDate,
//       status,
//     } = body;

//     // ✅ Validate file types
//     for (const file of files) {
//       if (!audioMimeTypes.includes(file.fileType)) {
//         return NextResponse.json(
//           { error: `Unsupported file type: ${file.fileType}` },
//           { status: 400 }
//         );
//       }
//     }

//     // ✅ Format location
//     const formattedLocation = {
//       latitude: location?.latitude ?? null,
//       longitude: location?.longitude ?? null,
//       address: location?.address ?? "",
//     };

//     // ✅ Connect to DB
//     await connectDB();

//     // ✅ Create and save the audio service entry
//     const audioEntry = new AudioServiceModel({
//       title,
//       description,
//       password,
//       files: files.map((file) => ({
//         fileName: file.fileName,
//         fileType: file.fileType,
//         fileData: Buffer.from(file.fileData, "base64"), // decode base64
//       })),
//       user: {
//         id: user._id,
//         name: user.name,
//       },
//       location: formattedLocation,
//       renewalDate: renewalDate ?? null,
//       status: status ?? "active",
//       scanCount: 0,
//       resetPasswordToken: null,
//       resetPasswordExpires: null,
//     });

//     await audioEntry.save();

//     return NextResponse.json(
//       { message: "Audio service saved successfully", audioId: audioEntry._id },
//       { status: 201 }
//     );
//   } catch (error) {
//     console.error("❌ Error in POST /api/encryptedServices/audio:", error);
//     return NextResponse.json(
//       { error: "Internal Server Error" },
//       { status: 500 }
//     );
//   }
// }



// import { NextResponse } from "next/server";

// import { connectDB } from "@/lib/mongoDB";
// import { authUser } from "@/middlewares/authMiddleware";
// import AudioServiceModel from "@/models/services/audioSchema";

// // POST handler
// export async function POST(request) {
//   try {
//      // ✅ Step 1: Authenticate User
//         const auth = await authUser(request);
//         if (auth.status !== 200) {
//           return new Response(JSON.stringify(auth.json), {
//             status: auth.status,
//             headers: { "Content-Type": "application/json" },
//           });
//         }
    
//         const user = auth.user;
//     await connectDB();

//     const formData = await request.formData();
//     const title = formData.get("title");
//     const description = formData.get("description");
//     const password = formData.get("password") || "";

//     // const userId = formData.get("userId"); // Required from frontend
//     // const userName = formData.get("userName");

//     // Collect multiple files
//     const files = [];
//     for (const [key, value] of formData.entries()) {
//       if (key === "files" && value instanceof File) {
//         const arrayBuffer = await value.arrayBuffer();
//         files.push({
//           //fileData: Buffer.from(arrayBuffer),
//           fileName: value.name,
//           fileType: value.type,
//         });
//       }
//     }

//     const newPDF = await AudioServiceModel.create({
//        user: {
//         id: user._id,
//         name: user.name,
//       },
//       title,
//       description,
//       password,
//       files
//     });

//     return NextResponse.json({ success: true, data: newPDF }, { status: 201 });
//   } catch (error) {
//     console.error("PDF Upload Error:", error);
//     return NextResponse.json({ success: false, message: "Failed to upload PDFs." }, { status: 500 });
//   }
// }


// import { connectDB } from "@/lib/mongoDB";
// import { authUser } from "@/middlewares/authMiddleware";
// import AudioServiceModel from "@/models/services/audioSchema";
// import bcrypt from "bcryptjs";

// // Plan limits (in bytes)
// const planLimits = {
//   Basic: 1 * 1024 * 1024 * 1024,      // 1 GB
//   Starter: 2 * 1024 * 1024 * 1024,    // 2 GB
//   Pro: 3 * 1024 * 1024 * 1024,        // 3 GB
//   Advanced: 4 * 1024 * 1024 * 1024,   // 4 GB
//   Ultima: 5 * 1024 * 1024 * 1024,     // 5 GB
// };

// // Allowed audio MIME types
// const allowedAudioTypes = [
//   "audio/mpeg",
//   "audio/mp3",
//   "audio/wav",
//   "audio/x-wav",
//   "audio/ogg",
//   "audio/webm",
// ];

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
//     const title = formData.get("title") 
//     const description = formData.get("description") 
//     let password = formData.get("password") 
//     const files = formData.getAll("file")

//     if (!files.length) {
//       return new Response(JSON.stringify({ success: false, error: "No audio files uploaded" }), {
//         status: 400,
//         headers: { "Content-Type": "application/json" },
//       });
//     }

//     if (password) {
//       const salt = await bcrypt.genSalt(10);
//       password = await bcrypt.hash(password, salt);
//     }

//     let totalSize = 0;
//     const filesToSave = [];

//     for (const file of files) {
//       if (!file || typeof file.arrayBuffer !== "function") continue;

//       // ✅ Validate audio type
//       if (!allowedAudioTypes.includes(file.type)) {
//         return new Response(
//           JSON.stringify({
//             success: false,
//             error: `🚫 Invalid file type "${file.type}". Only audio files (MP3, WAV, OGG, WEBM) are allowed.`,
//           }),
//           {
//             status: 400,
//             headers: { "Content-Type": "application/json" },
//           }
//         );
//       }

//       const buffer = Buffer.from(await file.arrayBuffer());
//       const fileSize = buffer.length;
//       totalSize += fileSize;

//       if (fileSize > maxAllowedSize) {
//         const nextPlan = Object.entries(planLimits).find(([_, limit]) => fileSize <= limit);
//         const readableSize = (fileSize / (1024 * 1024)).toFixed(2); // MB
//         const readableLimit = (maxAllowedSize / (1024 * 1024)).toFixed(2); // MB

//         let upgradeMessage = `🚫 File "${file.name}" is ${readableSize} MB, which exceeds your ${userPlan} plan limit (${readableLimit} MB).`;

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
//         //fileData: buffer,
//         fileName: file.name || `audio-${Date.now()}`,
//         fileType: file.type || "audio/mpeg",
//       });
//     }

//     if (totalSize > maxAllowedSize) {
//       const totalReadable = (totalSize / (1024 * 1024)).toFixed(2);
//       const planReadable = (maxAllowedSize / (1024 * 1024)).toFixed(2);

//       return new Response(
//         JSON.stringify({
//           success: false,
//           error: `🚫 Total upload is ${totalReadable} MB which exceeds your ${userPlan} plan (${planReadable} MB). Please upgrade your plan.`,
//         }),
//         {
//           status: 413,
//           headers: { "Content-Type": "application/json" },
//         }
//       );
//     }

//     const newDoc = new AudioServiceModel({
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

//     return new Response(
//       JSON.stringify({
//         success: true,
//         message: `${filesToSave.length} audio file(s) uploaded successfully.`,
//         audioData: newDoc,
//       }),
//       {
//         status: 201,
//         headers: { "Content-Type": "application/json" },
//       }
//     );
//   } catch (error) {
//     console.error("Audio Upload Error:", error);
//     return new Response(
//       JSON.stringify({
//         success: false,
//         error: error.message || "Internal server error",
//       }),
//       {
//         status: 500,
//         headers: { "Content-Type": "application/json" },
//       }
//     );
//   }
// }
