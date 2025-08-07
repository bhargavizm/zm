
import { VideoServiceModel } from "@/models/services/encryptedServicesSchema";
import { HandleEncryptedServices } from "../../common/encryptedServices/encryptedServicesRoute";

 const videoMimeTypes = [
  "video/mp4",
  "video/webm",
  "video/ogg",
  "video/x-matroska",
  "video/quicktime",
  "video/x-msvideo",
  "video/x-ms-wmv",
  "video/x-matroska",
  "video/webm",
  "video/x-flv",
  "video/mpeg",
  "video/MP2T",
  "video/MP2T"
];

export async function POST(request) {
  return HandleEncryptedServices({
    serviceName:"videos",
    request,
    model: VideoServiceModel,
    useCloudinary: true,
    folder: "video_uploads",
    resourceType: "video",
    mediaField: "files",
    allowedMimeTypes: videoMimeTypes, // allow all video types
  });
}



// import VideoServiceModel from "@/models/services/videoSchema";
// import { cloudinary } from "@/utils/cloudinary";
// import { authUser } from "@/middlewares/authMiddleware";
// import { connectDB } from "@/lib/mongoDB";
// import { NextResponse } from "next/server";

// export async function POST(request) {
//   try {
//     const auth = await authUser(request);
//     if (auth.status !== 200) {
//       return new Response(JSON.stringify(auth.json), {
//         status: auth.status,
//         headers: { "Content-Type": "application/json" },
//       });
//     }

//     const currentUser = auth.user;
//     await connectDB();

//     const formData = await request.formData();
//     const title = formData.get("title");
//     const description = formData.get("description");
//     const password = formData.get("password") || "";

//     const files = formData.getAll("files");
//     if (!files.length) {
//       return NextResponse.json({ success: false, error: "No video files uploaded" }, { status: 400 });
//     }

//     const uploadedVideos = [];

//     for (const file of files) {
//       if (!file || typeof file.arrayBuffer !== "function") continue;

//       const buffer = Buffer.from(await file.arrayBuffer());
//       const base64Data = `data:${file.type};base64,${buffer.toString("base64")}`;

//       const result = await cloudinary.uploader.upload(base64Data, {
//         folder: "video_uploads",
//         resource_type: "video",
//       });

//       uploadedVideos.push({
//         url: result.secure_url,
//         name: file.name || result.original_filename,
//       });
//     }

//     const newVideo = await VideoServiceModel.create({
//       title,
//       description,
//       password,
//       videos: uploadedVideos,
//       user: {
//         id: currentUser._id,
//         name: currentUser.name,
//       },
//     });

//     return NextResponse.json(
//       { success: true, message: "Videos uploaded successfully", data: newVideo },
//       { status: 201 }
//     );
//   } catch (error) {
//     console.error("Video Upload Error:", error);
//     return NextResponse.json({ success: false, error: error.message }, { status: 500 });
//   }
// }

// import { connectDB } from "@/lib/mongoDB";
// import { cloudinary } from "@/utils/cloudinary";
// import { authUser } from "@/middlewares/authMiddleware";
// import bcrypt from "bcryptjs";
// import VideoServiceModel from "@/models/services/videoSchema";

// // Plan limits in bytes
// const planLimits = {
//   Basic: 1 * 1024 * 1024 * 1024,      // 1 GB
//   Starter: 2 * 1024 * 1024 * 1024,    // 2 GB
//   Pro: 3 * 1024 * 1024 * 1024,        // 3 GB
//   Advanced: 4 * 1024 * 1024 * 1024,   // 4 GB
//   Ultima: 5 * 1024 * 1024 * 1024,     // 5 GB
// };

// // Allowed video MIME types
// const allowedVideoTypes = [
//   "video/mp4",
//   "video/webm",
//   "video/ogg",
//   "video/quicktime", // for .mov
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
//     const title = formData.get("title");
//     const description = formData.get("description");
//     let password = formData.get("password");
//     const files = formData.getAll("file");

//     if (!files.length) {
//       return Response.json({ success: false, error: "No video files uploaded" }, { status: 400 });
//     }

//     if (password) {
//       const salt = await bcrypt.genSalt(10);
//       password = await bcrypt.hash(password, salt);
//     }

//     let totalSize = 0;
//     const uploadedVideos = [];

//     for (const file of files) {
//       if (!file || typeof file.arrayBuffer !== "function") continue;

//       if (!allowedVideoTypes.includes(file.type)) {
//         return Response.json(
//           {
//             success: false,
//             error: `🚫 "${file.name}" is not a supported video format.`,
//           },
//           { status: 400 }
//         );
//       }

//       const buffer = Buffer.from(await file.arrayBuffer());
//       const fileSize = buffer.length;
//       totalSize += fileSize;

//       if (totalSize > maxAllowedSize) {
//         return Response.json(
//           {
//             success: false,
//             error: `🚫 Total video size exceeds your ${userPlan} plan limit (${(maxAllowedSize / 1024 / 1024).toFixed(
//               2
//             )} MB). Please upgrade your plan.`,
//           },
//           { status: 413 }
//         );
//       }

//       // Convert to base64 for Cloudinary upload
//       const base64Data = `data:${file.type};base64,${buffer.toString("base64")}`;

//       const result = await cloudinary.uploader.upload(base64Data, {
//         folder: "video_uploads",
//         resource_type: "video",
//       });

//       uploadedVideos.push({
//         url: result.secure_url,
//         name: file.name || result.original_filename,
//         duration: result.duration || null,
//         format: result.format || null,
//       });
//     }

//     const newVideo = new VideoServiceModel({
//       title,
//       description,
//       password,
//       videos: uploadedVideos,
//       user: {
//         id: currentUser._id,
//         name: currentUser.name,
//       },
//     });

//     await newVideo.save();

//     return Response.json(
//       {
//         success: true,
//         message: `${uploadedVideos.length} video(s) uploaded successfully.`,
//         videoData: newVideo,
//       },
//       { status: 201 }
//     );
//   } catch (error) {
//     console.error("Video Upload Error:", error);
//     return Response.json({ success: false, error: error.message }, { status: 500 });
//   }
// }
