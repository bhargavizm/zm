
import { GalleryServiceModel } from "@/models/services/encryptedServicesSchema";
import { HandleEncryptedServices } from "../common/encryptedServicesRoute";

 const imageMimeTypes = [
  "image/jpeg",
  "image/png",
  "image/gif",
  "image/webp",
  "image/jpg",
  "image/svg+xml",
  "image/bmp",
  "image/tiff",
  "image/x-icon",
  "image/heic",
  "image/heif",
  "image/avif",
  "image/x-xbitmap"
];

export async function POST(request) {
  return HandleEncryptedServices({
    serviceName:"gallery",
    request,
    model: GalleryServiceModel,
    useCloudinary: true,
    folder: "gallery_uploads",
    resourceType: "image",
    mediaField: "images",
    allowedMimeTypes:imageMimeTypes , // allow all image types
  });
}








// import { connectDB } from "@/lib/mongoDB";
// import { authUser } from "@/middlewares/authMiddleware";
// import GalleryServiceModel from "@/models/services/gallerySchema";
// import { cloudinary } from "@/utils/cloudinary";
// import bcrypt from "bcryptjs";

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
//     let password = formData.get("password") || "";
//     const files = formData.getAll("file");

//     if (!files.length) {
//       return new Response(JSON.stringify({
//         success: false,
//         error: "No image files uploaded",
//       }), { status: 400 });
//     }

//     if (password) {
//       const salt = await bcrypt.genSalt(10);
//       password = await bcrypt.hash(password, salt);
//     }

//     const allowedImageTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
//     const uploadedImages = [];

//     for (const file of files) {
//       if (!file || typeof file.arrayBuffer !== "function") continue;
//       if (!allowedImageTypes.includes(file.type)) {
//         return new Response(JSON.stringify({
//           success: false,
//           error: `Unsupported file format: ${file.name}`,
//         }), { status: 400 });
//       }

//       const buffer = Buffer.from(await file.arrayBuffer());
//       const base64Data = `data:${file.type};base64,${buffer.toString("base64")}`;

//       const result = await cloudinary.uploader.upload(base64Data, {
//         folder: "gallery_uploads",
//         resource_type: "image",
//       });

//       uploadedImages.push({
//         url: result.secure_url,
//         name: file.name || result.original_filename,
//       });
//     }

//     const newGallery = await GalleryServiceModel.create({
//       title,
//       description,
//       password,
//       images: uploadedImages,
//       user: {
//         id: currentUser._id,
//         name: currentUser.name,
//       },
//     });

//     return new Response(JSON.stringify({
//       success: true,
//       message: `${uploadedImages.length} image(s) uploaded successfully.`,
//       data: newGallery,
//     }), { status: 201 });

//   } catch (error) {
//     console.error("Gallery Upload Error:", error);
//     return new Response(JSON.stringify({
//       success: false,
//       error: error.message,
//     }), { status: 500 });
//   }
// }



// import { connectDB } from "@/lib/mongoDB";
// import { cloudinary } from "@/utils/cloudinary";
// import { authUser } from "@/middlewares/authMiddleware";
// import bcrypt from "bcryptjs";
// import GalleryServiceModel from "@/models/services/gallerySchema";


// // File size limits by plan
// const planLimits = {
//   Basic: 1 * 1024 * 1024 * 1024,
//   Starter: 2 * 1024 * 1024 * 1024,
//   Pro: 3 * 1024 * 1024 * 1024,
//   Advanced: 4 * 1024 * 1024 * 1024,
//   Ultima: 5 * 1024 * 1024 * 1024,
// };

// // Allowed image MIME types
// const allowedImageTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

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
//       return Response.json({ success: false, error: "No image files uploaded" }, { status: 400 });
//     }

//     if (password) {
//       const salt = await bcrypt.genSalt(10);
//       password = await bcrypt.hash(password, salt);
//     }

//     let totalSize = 0;
//     const uploadedImages = [];

//     for (const file of files) {
//       if (!file || typeof file.arrayBuffer !== "function") continue;

//       if (!allowedImageTypes.includes(file.type)) {
//         return Response.json(
//           {
//             success: false,
//             error: `🚫 "${file.name}" is not a supported image format.`,
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
//             error: `🚫 Total image size exceeds your plan limit (${(maxAllowedSize / 1024 / 1024).toFixed(
//               2
//             )} MB). Please upgrade your plan.`,
//           },
//           { status: 413 }
//         );
//       }

//       // Convert to base64 for Cloudinary upload
//       const base64Data = `data:${file.type};base64,${buffer.toString("base64")}`;

//       const result = await cloudinary.uploader.upload(base64Data, {
//         folder: "gallery_uploads",
//         resource_type: "image",
//       });

//       uploadedImages.push({
//         url: result.secure_url,
//         name: file.name || result.original_filename,
//       });
//     }

//     const newGallery = new GalleryServiceModel({
//       title,
//       description,
//       password,
//       images: uploadedImages,
//       user: {
//         id: currentUser._id,
//         name: currentUser.name,
//       },
//     });

//     await newGallery.save();

//     return Response.json(
//       {
//         success: true,
//         message: `${uploadedImages.length} image(s) uploaded successfully.`,
//         galleryData: newGallery,
//       },
//       { status: 201 }
//     );
//   } catch (error) {
//     console.error("Gallery Upload Error:", error);
//     return Response.json({ success: false, error: error.message }, { status: 500 });
//   }
// }
