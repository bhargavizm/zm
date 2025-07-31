// import { NextResponse } from "next/server";
// import { v2 as cloudinary } from "cloudinary";
// import { Readable } from "stream";
// import { getShortenedUrl } from "@/utils/shortenUrl";

// // Cloudinary config
// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// });

// function bufferToStream(buffer) {
//   const readable = new Readable();
//   readable._read = () => {};
//   readable.push(buffer);
//   readable.push(null);
//   return readable;
// }

// async function uploadToCloudinary(file) {
//   const buffer = Buffer.from(await file.arrayBuffer());
//   return new Promise((resolve, reject) => {
//     const stream = cloudinary.uploader.upload_stream(
//       { folder: "pet-id-tags" },
//       (error, result) => {
//         if (error) reject(error);
//         else resolve(result.secure_url);
//       }
//     );
//     bufferToStream(buffer).pipe(stream);
//   });
// }

// export async function POST(req) {
//   try {
//     const formData = await req.formData();

//     // Get file objects
//     const imageFile = formData.get("image");
//     const bgDesignFile = formData.get("bgDesign");

//     // Upload files to Cloudinary
//     const imageUrl = imageFile instanceof File ? await uploadToCloudinary(imageFile) : "";
//     const bgDesignUrl = bgDesignFile instanceof File ? await uploadToCloudinary(bgDesignFile) : bgDesignFile;

//     // Extract other fields
//     const ownerInfo = {
//       name: formData.get("ownerInfo.name") || "",
//       phone: formData.get("ownerInfo.phone") || "",
//       email: formData.get("ownerInfo.email") || "",
//       address: formData.get("ownerInfo.address") || "",
//     };

//     const pet = {
//       name: formData.get("pet.name") || "",
//       breed: formData.get("pet.breed") || "",
//       color: formData.get("pet.color") || "",
//     };

//     const selectedTemplate = formData.get("selectedTemplate") || "";
//     const password = formData.get("password") || "";

//     // ✅ Final object
//     const finalData = {
//       ownerInfo,
//       pet,
//       selectedTemplate,
//       image: imageUrl,
//       bgDesign: bgDesignUrl,
//       password,
//     };

//     console.log("🚀 Final Data:", finalData);

//     const qrUrl = await getShortenedUrl(`/Pet-ID-tags/${finalData._id}`);

//     // You can store `finalData` in MongoDB if needed here

//     return NextResponse.json({ success: true, data: finalData,qrUrl }, { status: 200 });

//   } catch (error) {
//     console.error("❌ Upload failed:", error);
//     return NextResponse.json({ error: "Failed to upload data" }, { status: 500 });
//   }
// }
import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";
import { Readable } from "stream";
import bcrypt from "bcryptjs";

import { connectDB } from "@/lib/mongoDB";
import { authUser } from "@/middlewares/authMiddleware";
import { getShortenedUrl } from "@/utils/shortenUrl";
import PetTagModal from "@/models/services/petIdSchema";

// Cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

function bufferToStream(buffer) {
  const readable = new Readable();
  readable._read = () => {};
  readable.push(buffer);
  readable.push(null);
  return readable;
}

async function uploadToCloudinary(file, folder = "pet-id-tags") {
  const buffer = Buffer.from(await file.arrayBuffer());
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream({ folder }, (err, result) => {
      if (err) reject(err);
      else resolve({ url: result.secure_url, public_id: result.public_id });
    });
    bufferToStream(buffer).pipe(stream);
  });
}

export async function POST(req) {
  await connectDB();
  const auth = await authUser(req);

  if (auth.status !== 200) {
    return new Response(JSON.stringify(auth.json), {
      status: auth.status,
      headers: { "Content-Type": "application/json" },
    });
  }

  const user = auth.user;

  try {
    const formData = await req.formData();

    // Optional file uploads
    const imageFile = formData.get("image");
    const bgDesignFile = formData.get("bgDesign");

    let mainImage = "";
    let publicId = "";
    let bgDesign = "";

    if (imageFile instanceof File) {
      const uploaded = await uploadToCloudinary(imageFile);
      mainImage = uploaded.url;
      publicId = uploaded.public_id;
    }

    if (bgDesignFile instanceof File) {
      const uploadedBg = await uploadToCloudinary(bgDesignFile);
      bgDesign = uploadedBg.url;
    } else {
      bgDesign = bgDesignFile || "";
    }

    // Password hash
    const rawPassword = formData.get("password") || "";
    const hashedPassword = rawPassword ? await bcrypt.hash(rawPassword, 10) : "";

    // Owner and pet info
    const ownerInfo = {
      name: formData.get("ownerInfo.name") || "",
      phone: formData.get("ownerInfo.phone") || "",
      email: formData.get("ownerInfo.email") || "",
      address: formData.get("ownerInfo.address") || "",
    };

    const pet = {
      name: formData.get("pet.name") || "",
      breed: formData.get("pet.breed") || "",
      color: formData.get("pet.color") || "",
    };

    // QR code info
    const qrCodeDetails = {
      qrCodeImage: formData.get("qrCodeDetails.qrCodeImage") || "",
      location: {
        latitude: parseFloat(formData.get("qrCodeDetails.location.latitude") || "0") || null,
        longitude: parseFloat(formData.get("qrCodeDetails.location.longitude") || "0") || null,
        address: formData.get("qrCodeDetails.location.address") || "",
      },
      renewalDate: formData.get("qrCodeDetails.renewalDate") || null,
      status: formData.get("qrCodeDetails.status") || "active",
      resetPasswordToken: null,
      resetPasswordExpires: null,
    };

    const selectedTemplate = formData.get("selectedTemplate") || "";

    // Build document
    const petTagDoc = new PetTagModal({
      user: {
        id: user._id,
        name: user.name,
      },
      mainImage,
      publicId,
      selectedTemplate,
      ownerInfo,
      pet,
      password: hashedPassword,
      bgDesign,
      qrCodeDetails,
    });

    await petTagDoc.save();

    const qrUrl = await getShortenedUrl(`/Pet-ID-tags/${petTagDoc._id}`);

    return NextResponse.json({
      success: true,
      message: "Pet tag saved successfully",
      data: petTagDoc,
      qrUrl,
    }, { status: 201 });

  } catch (error) {
    console.error("❌ Pet Tag POST Error:", error);
    return NextResponse.json({ error: error.message || "Something went wrong" }, { status: 500 });
  }
}




