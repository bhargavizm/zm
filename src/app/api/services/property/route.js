import { connectDB } from "@/lib/mongoDB";
import PropertyModal from "@/models/services/propertySchema";
import { writeFile } from "fs/promises";
import fs from "fs";
import path from "path";
import { v4 as uuidv4 } from "uuid";

export const config = {
  api: {
    bodyParser: false,
  },
  runtime: "nodejs",
};

export async function POST(request) {
  try {
    await connectDB();

    const contentType = request.headers.get("content-type") || "";
    if (!contentType.includes("multipart/form-data")) {
      return new Response(
        JSON.stringify({ success: false, error: "Expected multipart/form-data" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const formData = await request.formData();

    // Extract form fields
    const basicInfoRaw = {
      propertyName: formData.get("propertyName") || "",
      propertyType: formData.get("propertyType") || "",
      ownerName: formData.get("ownerName") || "",
      contactNumber: formData.get("contactNumber") || "",
      alternateNumber: formData.get("alternateNumber") || "",
      propertyDescription: formData.get("propertyDescription") || "",
    };

    const addressInfoRaw = {
      address: formData.get("address") || "",
      mapLink: formData.get("mapLink") || "",
    };

    const pricingInfoRaw = {
      price: formData.get("price") || "",
      area: formData.get("area") || "",
      amenities: formData.getAll("amenities").map((item) => String(item)),
    };

    const password = formData.get("password") || "";

    // Create uploads directory if not exists
    const uploadDir = path.join(process.cwd(), "public/uploads");
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    // Handle mainImage
    let mainImageUrl = null;
    const mainImageFile = formData.get("mainImage");
    if (mainImageFile && typeof mainImageFile.name === "string") {
      const buffer = Buffer.from(await mainImageFile.arrayBuffer());
      const filename = `${uuidv4()}-${mainImageFile.name}`;
      const filepath = path.join(uploadDir, filename);
      await writeFile(filepath, buffer);
      mainImageUrl = `/uploads/${filename}`;
    }

    // Handle galleryImages
    const galleryImageUrls = [];
    const galleryImages = formData.getAll("galleryImages");
    for (const file of galleryImages) {
      if (file && typeof file.name === "string") {
        const buffer = Buffer.from(await file.arrayBuffer());
        const filename = `${uuidv4()}-${file.name}`;
        const filepath = path.join(uploadDir, filename);
        await writeFile(filepath, buffer);
        galleryImageUrls.push(`/uploads/${filename}`);
      }
    }

    // Save property to DB
    const newProperty = new PropertyModal({
      basicInfo: basicInfoRaw,
      addressInfo: addressInfoRaw,
      pricingInfo: pricingInfoRaw,
      password,
      images: {
        mainImage: mainImageUrl,
        galleryImages: galleryImageUrls,
      },
    });

    const savedProperty = await newProperty.save();

    return new Response(
      JSON.stringify({ success: true, fileData: savedProperty.toObject() }),
      { status: 201, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Property upload error:", error);
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}







// import { NextResponse } from "next/server";
// import { connectDB } from "@/lib/mongoDB";
// import Property from "@/models/services/propertySchema";
// import { v2 as cloudinary } from "cloudinary";

// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// });

// export async function POST(req) {
//   await connectDB();

//   const formData = await req.formData();
//   const propertyDetails = {
//     basicInfo: {},
//     addressInfo: {},
//     pricingInfo: {},
//     images: {},
//     password: "",
//   };

//   for (const [key, value] of formData.entries()) {
//     if (key === "password") {
//       propertyDetails.password = value;
//       continue;
//     }

//     const [section, field] = key.split(".");
//     if (!section || !field) continue;

//     if (value instanceof File) {
//       const bytes = await value.arrayBuffer();
//       const buffer = Buffer.from(bytes);
//       const base64 = buffer.toString("base64");
//       const dataUrl = `data:${value.type};base64,${base64}`;

//       const upload = await cloudinary.uploader.upload(dataUrl, {
//         folder: "property_uploads",
//       });

//       if (field === "galleryImages") {
//         propertyDetails[section][field] ||= [];
//         propertyDetails[section][field].push(upload.secure_url);
//       } else {
//         propertyDetails[section][field] = upload.secure_url;
//       }
//     } else {
//       propertyDetails[section][field] = value;
//     }
//   }

//   try {
//     const newProperty = new Property(propertyDetails);
//     await newProperty.save();

//     return NextResponse.json({
//       success: true,
//       message: "Property saved successfully",
//       data: newProperty,
//     });
//   } catch (err) {
//     console.error("Save error:", err);
//     return NextResponse.json(
//       { success: false, error: "Failed to save property" },
//       { status: 500 }
//     );
//   }
// }




