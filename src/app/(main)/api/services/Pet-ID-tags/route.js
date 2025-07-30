import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";
import { Readable } from "stream";
import { getShortenedUrl } from "@/utils/shortenUrl";

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

async function uploadToCloudinary(file) {
  const buffer = Buffer.from(await file.arrayBuffer());
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: "pet-id-tags" },
      (error, result) => {
        if (error) reject(error);
        else resolve(result.secure_url);
      }
    );
    bufferToStream(buffer).pipe(stream);
  });
}

export async function POST(req) {
  try {
    const formData = await req.formData();

    // Get file objects
    const imageFile = formData.get("image");
    const bgDesignFile = formData.get("bgDesign");

    // Upload files to Cloudinary
    const imageUrl = imageFile instanceof File ? await uploadToCloudinary(imageFile) : "";
    const bgDesignUrl = bgDesignFile instanceof File ? await uploadToCloudinary(bgDesignFile) : bgDesignFile;

    // Extract other fields
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

    const selectedTemplate = formData.get("selectedTemplate") || "";
    const password = formData.get("password") || "";

    // ✅ Final object
    const finalData = {
      ownerInfo,
      pet,
      selectedTemplate,
      image: imageUrl,
      bgDesign: bgDesignUrl,
      password,
    };

    console.log("🚀 Final Data:", finalData);

    const qrUrl = await getShortenedUrl(`/Pet-ID-tags/${finalData._id}`);

    // You can store `finalData` in MongoDB if needed here

    return NextResponse.json({ success: true, data: finalData,qrUrl }, { status: 200 });

  } catch (error) {
    console.error("❌ Upload failed:", error);
    return NextResponse.json({ error: "Failed to upload data" }, { status: 500 });
  }
}
