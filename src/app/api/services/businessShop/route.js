import { connectDB } from "@/lib/mongoDB";
import BusinessShopModel from "@/models/services/businessShopSchema";
import { cloudinary } from "@/utils/cloudinary";
import { v4 as uuidv4 } from "uuid";

// Helper to convert dot-notation FormData into nested object
function setDeep(obj, path, value) {
  const keys = path.split(".");
  let current = obj;
  keys.forEach((key, index) => {
    if (index === keys.length - 1) {
      current[key] = value;
    } else {
      if (!current[key]) current[key] = {};
      current = current[key];
    }
  });
}

export async function POST(req) {
  try {
    await connectDB();

    const formData = await req.formData();
    const data = {};
    const filesToUpload = [];

    // Parse FormData
    for (const [key, value] of formData.entries()) {
      if (value instanceof File) {
        filesToUpload.push({ key, file: value });
      } else {
        setDeep(data, key, value);
      }
    }

    // Upload logo to Cloudinary
    if (data.businessInfo?.media?.logo === undefined) {
      const logoFile = filesToUpload.find(f => f.key === "businessInfo.media.logo");
      if (logoFile) {
        const buffer = Buffer.from(await logoFile.file.arrayBuffer());
        const uploadedLogo = await new Promise((resolve, reject) => {
          cloudinary.uploader
            .upload_stream(
              {
                resource_type: "image",
                public_id: `businessShops/logo_${uuidv4()}`,
              },
              (err, result) => {
                if (err) reject(err);
                else resolve(result);
              }
            )
            .end(buffer);
        });
        setDeep(data, "businessInfo.media.logo", uploadedLogo.secure_url);
      }
    }

    // Upload gallery images
    const galleryImages = filesToUpload.filter(f => f.key === "businessInfo.media.galleryImages");
    const uploadedGallery = [];

    for (const img of galleryImages) {
      const buffer = Buffer.from(await img.file.arrayBuffer());
      const uploaded = await new Promise((resolve, reject) => {
        cloudinary.uploader
          .upload_stream(
            {
              resource_type: "image",
              public_id: `businessShops/gallery_${uuidv4()}`,
            },
            (err, result) => {
              if (err) reject(err);
              else resolve(result);
            }
          )
          .end(buffer);
      });
      uploadedGallery.push(uploaded.secure_url);
    }

    if (uploadedGallery.length > 0) {
      setDeep(data, "businessInfo.media.galleryImages", uploadedGallery);
    }

    // Save to DB
    const newDoc = new BusinessShopModel(data);
    await newDoc.save();

    return new Response(JSON.stringify({ success: true, data: newDoc }), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("Business Shop POST Error:", err);
    return new Response("Internal Server Error", { status: 500 });
  }
}
