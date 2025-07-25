import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongoDB";
import PetTagModal from "@/models/services/petIdSchema";
import { authUser } from "@/middlewares/authMiddleware";
import { v2 as cloudinary } from "cloudinary";

// 🔐 Cloudinary Configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(req) {
  try {
    // Step 1: Authenticate User
    const auth = await authUser(req);
    if (auth.status !== 200) {
      return NextResponse.json(auth.json, { status: auth.status });
    }

    await connectDB();
    const user = auth.user;
    const body = await req.json();

    const {
      image,
      location = {},
      renewalDate = null,
      status = "active",
      qrCodeImage = "",
      ...rest
    } = body;

    let mainImage = "";
    let publicId = "";

    // Step 2: Upload image to Cloudinary if provided
    if (image) {
      if (typeof image !== "string" || !image.startsWith("data:image/")) {
        return NextResponse.json(
          { message: "Invalid image format. Must be a base64 image string." },
          { status: 400 }
        );
      }

      const uploadResponse = await cloudinary.uploader.upload(image, {
        folder: "pet-id-tags",
      });

      mainImage = uploadResponse.secure_url;
      publicId = uploadResponse.public_id;
    }

    // Step 3: Save to DB
    const newPetTag = new PetTagModal({
      ...rest,
      user: {
        id: user._id,
        name: user.name || user.email
      },
      mainImage,
      publicId,
      qrCodeDetails: {
        qrCodeImage,
        location: {
          latitude: location.latitude ?? null,
          longitude: location.longitude ?? null,
          address: location.address ?? ""
        },
        renewalDate,
        status,
        resetPasswordToken: null,
        resetPasswordExpires: null
      }
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
