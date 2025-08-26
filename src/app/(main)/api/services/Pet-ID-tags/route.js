
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
       mapLink: formData.get("ownerInfo.mapLink") || "",
    };

    const pet = {
      name: formData.get("pet.name") || "",
      breed: formData.get("pet.breed") || "",
      color: formData.get("pet.color") || "",
    };

    const qrCodeImage = formData.get("qrCodeImage") || "";

    // QR code info
    const qrCodeDetails = {
    qrCodeImage,
    scanCount: 0,
    lastScanAt: null,
    scanHistory: [
      
    ],
    lastScanLocation: {
      city: "",
      region: "",
      country: "",
      lat: null,
      lon: null,
    },
    qrCodeStatus: "inactive",

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




