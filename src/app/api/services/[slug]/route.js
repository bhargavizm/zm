import { connectDB } from "@/lib/mongoDB";
import URLServiceModel from "@/models/services/urlServicesSchema";

// POST /api/services/landing-page
export const POST = async (req, { params }) => {
  try {
    await connectDB();

    const { slug } = params; // dynamic service name from URL
    const { url, password } = await req.json();

    if (!slug || !url || !password) {
      return Response.json(
        { success: false, error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Save the document with dynamic serviceName
    const saved = await URLServiceModel.create({
      serviceName: slug,
      url,
      password,
    });

    return Response.json({ success: true, URLServicesData: saved }, { status: 201 });
  } catch (error) {
    console.error("POST error:", error);
    return Response.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
