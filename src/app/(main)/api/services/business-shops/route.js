// import { connectDB } from "@/lib/mongoDB";
// import BusinessShopModel from "@/models/services/businessShopSchema";
// import { cloudinary } from "@/utils/cloudinary";
// import { v4 as uuidv4 } from "uuid";
// import { authUser } from '@/middlewares/authMiddleware';
// import { getShortenedUrl } from "@/utils/shortenUrl";

// // Helper to convert dot-notation FormData into nested object
// function setDeep(obj, path, value) {
//   const keys = path.split(".");
//   let current = obj;
//   keys.forEach((key, index) => {
//     if (index === keys.length - 1) {
//       current[key] = value;
//     } else {
//       if (!current[key]) current[key] = {};
//       current = current[key];
//     }
//   });
// }

// export async function POST(req) {
//   try {
//     const auth = await authUser(req);
//     if (auth.status !== 200) {
//       return new Response(JSON.stringify(auth.json), {
//         status: auth.status,
//         headers: { "Content-Type": "application/json" },
//       });
//     }

//     const user = auth.user;
//     await connectDB();

//     const formData = await req.formData();
//     const data = {
//       user: {
//         id: user._id,
//         name: user.name,
//       },
//       qrCodeDetails: {
//         location: {},
//         renewalDate: null,
//         status: "active",
//         resetPasswordToken: null,
//         resetPasswordExpires: null,
//       }
//     };
//     const filesToUpload = [];

//     // Parse FormData
//     for (const [key, value] of formData.entries()) {
//       if (value instanceof File) {
//         filesToUpload.push({ key, file: value });
//       } else if (value !== 'undefined') {
//         if (key === "renewalDate") {
//           data.qrCodeDetails.renewalDate = new Date(value);
//         } else if (key === "status") {
//           data.qrCodeDetails.status = value;
//         } else if (key.startsWith("location.")) {
//           const locKey = key.split(".")[1];
//           data.qrCodeDetails.location[locKey] = value;
//         } else if (key === "qrCodeImage") {
//           data.qrCodeDetails.qrCodeImage = value;
//         } else if (key === "selectedTemplate") {
//           data.selectedTemplate = value;
//         } else if (key === "password") {
//           data.password = value;
//         } else {
//           setDeep(data, key, value);
//         }
//       }
//     }

//     // Upload logo
//     const logoFile = filesToUpload.find(f => f.key === "businessInfo.media.logo");
//     if (logoFile) {
//       try {
//         const buffer = Buffer.from(await logoFile.file.arrayBuffer());
//         const uploadedLogo = await new Promise((resolve, reject) => {
//           cloudinary.uploader.upload_stream(
//             {
//               resource_type: "image",
//               public_id: `businessShops/logo_${uuidv4()}`,
//             },
//             (err, result) => {
//               if (err) reject(err);
//               else resolve(result);
//             }
//           ).end(buffer);
//         });
//         setDeep(data, "businessInfo.media.logo", uploadedLogo.secure_url);
//       } catch (err) {
//         console.error("Logo upload error:", err);
//         return new Response(
//           JSON.stringify({ error: "Failed to upload logo" }),
//           { status: 500, headers: { "Content-Type": "application/json" } }
//         );
//       }
//     }

//     // Upload gallery images
//     const galleryImages = filesToUpload.filter(f => f.key === "businessInfo.media.galleryImages");
//     const uploadedGallery = [];

//     for (const img of galleryImages) {
//       try {
//         const buffer = Buffer.from(await img.file.arrayBuffer());
//         const uploaded = await new Promise((resolve, reject) => {
//           cloudinary.uploader.upload_stream(
//             {
//               resource_type: "image",
//               public_id: `businessShops/gallery_${uuidv4()}`,
//             },
//             (err, result) => {
//               if (err) reject(err);
//               else resolve(result);
//             }
//           ).end(buffer);
//         });
//         uploadedGallery.push(uploaded.secure_url);
//       } catch (err) {
//         console.error("Gallery image upload error:", err);
//         // Continue uploading remaining images
//       }
//     }

//     if (uploadedGallery.length > 0) {
//       setDeep(data, "businessInfo.media.galleryImages", uploadedGallery);
//     }

//     // Save to DB
//     const newDoc = new BusinessShopModel(data);
//     await newDoc.validate().catch(err => {
//       console.error("Validation error:", err);
//       throw new Error("Validation failed");
//     });

//     await newDoc.save();
    
//     const qrUrl = await getShortenedUrl(`/business-shops/${newDoc._id}`);


//     return new Response(
//       JSON.stringify({
//         success: true,
//         data: newDoc,
//         qrUrl,
//         message: "Business shop created successfully"
//       }),
//       {
//         status: 201,
//         headers: { "Content-Type": "application/json" },
//       }
//     );

//   } catch (err) {
//     console.error("Business Shop POST Error:", err);
//     return new Response(
//       JSON.stringify({
//         error: err.message || "Internal Server Error",
//         details: process.env.NODE_ENV === 'development' ? err.stack : undefined
//       }),
//       {
//         status: 500,
//         headers: { "Content-Type": "application/json" }
//       }
//     );
//   }
// }
import { NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary";
import { connectDB } from "@/lib/mongoDB";
import { authUser } from "@/middlewares/authMiddleware";
import BusinessShopModal from "@/models/services/businessShopSchema";

export async function POST(req) {
  try {
     const auth = await authUser(req);
    if (auth.status !== 200) {
      return new Response(JSON.stringify(auth.json), {
        status: auth.status,
        headers: { "Content-Type": "application/json" },
      });
    }
    await connectDB();
    const user = auth.user;

    const formData = await req.formData();

    // Get fields
    const businessName = formData.get("businessName");
    const businessType = formData.get("businessType");
    const description = formData.get("description");
    const shopTimings = formData.get("shopTimings");
    const discount = formData.get("discount");
    const phone = formData.get("phone");
    const altPhone = formData.get("altPhone");
    const email = formData.get("email");
    const address = formData.get("address");
    const password = formData.get("password");
    const selectedTemplate = formData.get("selectedTemplate");
    const bgDesign = formData.get("bgDesign");

    // Upload logo
    let logoUrl = "";
    const logoFile = formData.get("logo");
    if (logoFile && typeof logoFile === "object") {
      const logoBuffer = Buffer.from(await logoFile.arrayBuffer());
      const base64Logo = `data:${logoFile.type};base64,${logoBuffer.toString("base64")}`;
      const logoUpload = await cloudinary.uploader.upload(base64Logo, {
        folder: "businessShop/logos",
      });
      logoUrl = logoUpload.secure_url;
    }

    // Upload gallery images
    let galleryUrls = [];
    const galleryFiles = formData.getAll("galleryImages");

    for (const image of galleryFiles) {
      if (typeof image === "object") {
        const imageBuffer = Buffer.from(await image.arrayBuffer());
        const base64Image = `data:${image.type};base64,${imageBuffer.toString("base64")}`;
        const upload = await cloudinary.uploader.upload(base64Image, {
          folder: "businessShop/gallery",
        });
        galleryUrls.push(upload.secure_url);
      }
    }

    // Save to DB
    const newShop = await BusinessShopModal.create({
    user: {
        id: user._id,
        name: user.name,
      },
      businessInfo: {
        general: {
          businessName,
          businessType,
          description,
          shopTimings,
          discount,
        },
        contact: {
          phone,
          altPhone,
          email,
          address,
        },
        password,
        selectedTemplate,
        bgDesign,
        media: {
          logo: logoUrl,
          galleryImages: galleryUrls,
        },
        qrCodeDetails: {}, // optional
      },
    });

    return NextResponse.json({ success: true, data: newShop });
  }catch (error) {
    console.error("Upload Error:", error);
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
