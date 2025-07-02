import { connectDB } from "@/lib/mongoDB";
import ResumeModal from "@/models/services/resumeSchema";
import { cloudinary } from "@/utils/cloudinary";
import { v4 as uuidv4 } from "uuid";

export async function POST(request) {
  try {
    await connectDB();
    const formData = await request.formData();

    const password = formData.get("password");
    const resumeUrl = formData.get("resumeUrl"); // ✅ user-provided link
    const resumeFile = formData.get("resumeFile");

    if (!resumeFile || !resumeFile.name) {
      return new Response("File not found", { status: 400 });
    }

    const arrayBuffer = await resumeFile.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const uploadResponse = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          {
            resource_type: "auto",
            public_id: `resumes/${uuidv4()}`,
          },
          (error, result) => {
            if (error) return reject(error);
            resolve(result);
          }
        )
        .end(buffer);
    });

    const newResume = new ResumeModal({
      resumeFileName: uploadResponse.secure_url, // ✅ Cloudinary uploaded file URL
      resumeUrl, // ✅ user-provided link (not file.name)
      password,
    });

    await newResume.save();

    return new Response(
      JSON.stringify({
        success: true,
        message: "Resume uploaded and saved successfully",
        resumeData: newResume,
      }),
      { status: 201, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Resume Upload Error:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
