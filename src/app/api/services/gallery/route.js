import { connectDB } from "@/lib/mongoDB";
import GalleryModal from "@/models/services/gallerySchema";
import { cloudinary } from "@/utils/cloudinary";
import { v4 as uuidv4 } from "uuid";

// POST /api/services/image
export async function POST(request) {
  try {
    await connectDB();

    const formData = await request.formData();

    const title = formData.get("title");
    const description = formData.get("description");
    const password = formData.get("password");
    const file = formData.get("file");

    if (!file || !file.name) {
      return new Response("image file not found", { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Upload to Cloudinary
    const uploadResult = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          {
            resource_type: "auto", 
            public_id: `images/${uuidv4()}`,
            folder: "images",
          },
          (error, result) => {
            if (error) return reject(error);
            resolve(result);
          }
        )
        .end(buffer);
    });

    // Save to MongoDB
    const newAudio = new GalleryModal({
      title,
      description,
      password,
      imageFileName: file.name,
      imageUrl: uploadResult.secure_url,
    });

    await newAudio.save();

    return new Response(
      JSON.stringify({
        success: true,
        message: "Images uploaded and saved successfully",
        audioData: newAudio,
      }),
      { status: 201, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Images Upload Error:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}