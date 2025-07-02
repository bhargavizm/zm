import { connectDB } from "@/lib/mongoDB";
import PDFServiceModel from "@/models/services/pdfSchema";
import { cloudinary } from "@/utils/cloudinary";

import { v4 as uuidv4 } from "uuid";

export async function POST(request) {
  try {
    await connectDB();

    const formData = await request.formData();
    const title = formData.get("title");
    const description = formData.get("description");
    const password = formData.get("password");
    const file = formData.get("file");

    if (!file || typeof file.arrayBuffer !== "function") {
      return new Response(
        JSON.stringify({ success: false, error: "No valid file uploaded" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const originalName = file.name || "file";
    const fileExtension = originalName.split(".").pop();

    const uploadResponse = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          {
            resource_type: "auto",
            content_disposition: "inline",
            format: "pdf",

            public_id: `uploads/${uuidv4()}`,
          },
          (error, result) => { 
            if (error) return reject(error);
            resolve(result);
          }
        )
        .end(buffer);
    });
console.log(uploadResponse)
    const newFile = new PDFServiceModel({
      title,
      description,
      pdfFileName: uploadResponse.secure_url,
      password,
      
    });

    await newFile.save();

    return new Response(
      JSON.stringify({
        success: true,
        message: "File uploaded and saved successfully",
        fileData: newFile,
      }),
      {
        status: 201,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.error("Upload Error:", error.message);

    return new Response(
      JSON.stringify({
        success: false,
        error: error.message || "Internal Server Error",
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}
