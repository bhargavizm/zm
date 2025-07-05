// app/api/business-cards/route.js

import { connectDB } from "@/lib/mongoDB";
import BusinessModel from "@/models/services/businessCardSchema";
import { cloudinary } from "@/utils/cloudinary";

export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(req) {
  try {
    await connectDB();

    const formData = await req.formData();

    // Get fields
    const cardData = {};
    for (const [key, value] of formData.entries()) {
      if (key !== "file") {
        cardData[key] = value;
      }
    }

    // Handle image
    const file = formData.get("file");
    if (file && typeof file === "object") {
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

    const newCard = await BusinessModel.create(cardData);

    return Response.json({ success: true, data: newCard }, { status: 201 });

  } catch (error) {
    console.error("Upload error:", error);
    return Response.json({ success: false, message: error.message }, { status: 500 });
  }
}

export async function GET() {
  try {
    await connectDB();
    const cards = await BusinessModel.find().sort({ createdAt: -1 });

    return Response.json({ success: true, data: cards }, { status: 200 });
  } catch (error) {
    return Response.json({ success: false, message: error.message }, { status: 500 });
  }
}
