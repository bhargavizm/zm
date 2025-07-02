// import { connectDB } from "@/lib/mongoDB";
// import AudioModel from "@/models/services/audioSchema";
// import { cloudinary } from "@/utils/cloudinary";
// import { v4 as uuidv4 } from "uuid";

// // POST /api/services/audio
// export async function POST(request) {
//   try {
//     await connectDB();

//     const formData = await request.formData();

//     const title = formData.get("title");
//     const description = formData.get("description");
//     const password = formData.get("password");
//     const file = formData.get("file");

//     if (!file || !file.name) {
//       return new Response("Audio file not found", { status: 400 });
//     }

//     const arrayBuffer = await file.arrayBuffer();
//     const buffer = Buffer.from(arrayBuffer);

//     // Upload to Cloudinary
//     const uploadResult = await new Promise((resolve, reject) => {
//       cloudinary.uploader
//         .upload_stream(
//           {
//             resource_type: "auto", // Detect audio type
//             public_id: `audios/${uuidv4()}`,
//             folder: "audios",
//           },
//           (error, result) => {
//             if (error) return reject(error);
//             resolve(result);
//           }
//         )
//         .end(buffer);
//     });

//     // Save to MongoDB
//     const newAudio = new AudioModel({
//       title,
//       description,
//       password,
//       audioFileName: file.name,
//       audioUrl: uploadResult.secure_url,
//     });

//     await newAudio.save();

//     return new Response(
//       JSON.stringify({
//         success: true,
//         message: "Audio uploaded and saved successfully",
//         audioData: newAudio,
//       }),
//       { status: 201, headers: { "Content-Type": "application/json" } }
//     );
//   } catch (error) {
//     console.error("Audio Upload Error:", error);
//     return new Response("Internal Server Error", { status: 500 });
//   }
// }

import { connectDB } from "@/lib/mongoDB";
import AudioModel from "@/models/services/audioSchema";
import { cloudinary } from "@/utils/cloudinary";
import { v4 as uuidv4 } from "uuid";

// POST /api/services/audio
export async function POST(request) {
  console.log("1. API route received request.");
  try {
    await connectDB();
    console.log("2. Database connected.");

    const formData = await request.formData();
    console.log("3. FormData parsed.");

    const title = formData.get("title");
    const description = formData.get("description");
    const password = formData.get("password");
    const file = formData.get("file");

    console.log("4. Extracted fields:", { title, description, password, filePresent: !!file });
    if (file) {
      console.log("   File details:", { name: file.name, size: file.size, type: file.type });
    }

    if (!file || !file.name) {
      console.log("5. No audio file found or file.name missing.");
      return new Response("Audio file not found", { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    console.log("6. File converted to ArrayBuffer.");
    const buffer = Buffer.from(arrayBuffer);
    console.log("7. ArrayBuffer converted to Buffer.");

    // Upload to Cloudinary
    console.log("8. Starting Cloudinary upload...");
    const uploadResult = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          {
            resource_type: "auto",
            public_id: `audios/${uuidv4()}`,
            folder: "audios",
            // Add a timeout for robustness, though upload_stream has its own
            // timeout: 60000, // 60 seconds
          },
          (error, result) => {
            if (error) {
              console.error("Cloudinary upload_stream error:", error);
              return reject(error);
            }
            console.log("9. Cloudinary upload successful. Result:", result.secure_url);
            resolve(result);
          }
        )
        .end(buffer);
    });

    // Save to MongoDB
    console.log("10. Preparing to save to MongoDB...");
    const newAudio = new AudioModel({
      title,
      description,
      password,
      audioFileName: file.name,
      audioUrl: uploadResult.secure_url,
    });

    await newAudio.save();
    console.log("11. Audio data saved to MongoDB.");

    return new Response(
      JSON.stringify({
        success: true,
        message: "Audio uploaded and saved successfully",
        audioData: newAudio,
      }),
      { status: 201, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Audio Upload Error (Caught in main try/catch):", error);
    // You can add more specific error handling here if needed
    return new Response("Internal Server Error", { status: 500 });
  }
}