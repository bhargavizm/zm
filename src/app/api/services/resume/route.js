import { connectDB } from "@/lib/mongoDB";
import ResumeModal from "@/models/services/resumeSchema";

export async function POST(request) {
  try {
    await connectDB();
    const { title, description, resumeFileName, resumeUrl, password } = await request.json();

    const newResume = new ResumeModal({
      title,
      description,
      resumeFileName,
      resumeUrl,
      password,
    });

    await newResume.save();

    return new Response(
      JSON.stringify({
        success: true,
        message: "Resume saved successfully",
        resumeData: newResume,
      }),
      { status: 201, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Resume Save Error:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
