import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongoDB";
import PetTagModal from "@/models/services/petIdSchema";
import { v2 as cloudinary } from "cloudinary";

// 🔐 Cloudinary Configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(req) {
  try {
    await connectDB();

    const body = await req.json();
    const { image, ...rest } = body;

    let imageUrl = "";
    let publicId = "";

    if (image) {
      // Upload to Cloudinary
      const uploadResponse = await cloudinary.uploader.upload(image, {
        folder: "pet-id-tags",
      });

      imageUrl = uploadResponse.secure_url;
      publicId = uploadResponse.public_id;
    }

    // Create new document with image details
    const newPetTag = new PetTagModal({
      ...rest,
      imageUrl,     // ✅ Save the Cloudinary URL
      publicId,     // ✅ Optional: store public_id for future deletion
    });

    await newPetTag.save();

    return NextResponse.json(
      { message: "Pet ID Tag created successfully!" },
      { status: 201 }
    );
  } catch (error) {
    console.error("POST Error:", error);
    return NextResponse.json(
      { message: "Internal Server Error", error: error.message },
      { status: 500 }
    );
  }
}
