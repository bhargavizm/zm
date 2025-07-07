// app/api/business-cards/route.js

import { connectDB } from "@/lib/mongoDB";
import { authUser } from "@/middlewares/authMiddleware";
import BusinessModel from "@/models/services/businessCardSchema";
import { cloudinary } from "@/utils/cloudinary";
import bcrypt from "bcryptjs";

export const config = {
  api: {
    bodyParser: false,
  },
};

// File size limits
const MAX_SINGLE_FILE_SIZE = 2 * 1024 * 1024; // 2MB
const MAX_TOTAL_SIZE = 30 * 1024 * 1024; // 30MB

export async function POST(req) {
  try {
    const auth = await authUser(req);
    if (auth.status !== 200) {
      return Response.json(auth.json, { status: auth.status });
    }

    const user = auth.user;
    await connectDB();

    const formData = await req.formData();
    const cardData = {};
    let totalSize = 0;

    // Handle fields
    for (const [key, value] of formData.entries()) {
      if (key === "file") continue;

      if (key === "password" && value.trim()) {
        if (value.length < 6) {
          return Response.json(
            { error: "Password must be at least 6 characters" },
            { status: 400 }
          );
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(value, salt);
        cardData.password = hashedPassword;
      } else if (key !== "password") {
        cardData[key] = value;
      }
    }

    // Handle single image file
    const file = formData.get("file");

    if (file && typeof file === "object") {
      if (file.size > MAX_SINGLE_FILE_SIZE) {
        return Response.json(
          { error: "Image exceeds 2MB limit" },
          { status: 400 }
        );
      }

      totalSize += file.size;
      if (totalSize > MAX_TOTAL_SIZE) {
        return Response.json(
          { error: "Total upload exceeds 30MB limit" },
          { status: 400 }
        );
      }

      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      const mime = file.type;
      const base64 = buffer.toString("base64");
      const dataUri = `data:${mime};base64,${base64}`;

      const result = await cloudinary.uploader.upload(dataUri, {
        folder: "business-cards",
      });

      cardData.profileImageUrl = result.secure_url;
    }

    // Save to MongoDB
    const newCard = await BusinessModel.create({
      user: {
        id: user._id,
        name: user.name,
      },
      ...cardData,
    });

    return Response.json({ success: true, data: newCard }, { status: 201 });

  } catch (error) {
    console.error("Upload error:", error);
    return Response.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    await connectDB();

    const cards = await BusinessModel.find()
      .select("-password")
      .sort({ createdAt: -1 });

    return Response.json({ success: true, data: cards }, { status: 200 });

  } catch (error) {
    return Response.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
