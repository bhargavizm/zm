import { connectDB } from "@/lib/mongoDB";
import ResumeModel from "@/models/services/resumeSchema";
import fs from "fs";
import path from "path";
import { v4 as uuidv4 } from "uuid";

// Disable default body parser
export const config = {
  api: {
    bodyParser: false,
  },
};

// Utility to parse form data manually
async function parseFormData(request) {
  const formData = await request.formData();
  const title = formData.get("title");
  const description = formData.get("description");
  const password = formData.get("password");
  const file = formData.get("file");
  return { title, description, password, file };
}

export async function POST(request) {
  console.log("1. Resume upload request received");

  try {
    await connectDB();
    console.log("2. MongoDB connected");

    const { title, description, password, file } = await parseFormData(request);
    if (!file || !file.name) {
      return new Response("Resume file missing", { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Save the file to local /public/uploads/resumes folder
    const uploadsDir = path.join(process.cwd(), "public", "uploads", "resumes");
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true });
    }

    const uniqueFileName = `${uuidv4()}-${file.name}`;
    const filePath = path.join(uploadsDir, uniqueFileName);
    fs.writeFileSync(filePath, buffer);
    console.log("3. File saved locally at:", filePath);

    // Construct the URL to access the file
    const resumeUrl = `/uploads/resumes/${uniqueFileName}`;

    // Save metadata to MongoDB
    const newResume = new ResumeModel({
      title,
      description,
      password,
      resumeFileName: file.name,
      resumeUrl,
    });

    await newResume.save();
    console.log("4. Resume metadata saved to MongoDB");

    return new Response(
      JSON.stringify({
        success: true,
        message: "Resume uploaded and saved locally",
        resumeData: newResume,
      }),
      { status: 201, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Resume Upload Error:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
