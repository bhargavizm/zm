import { connectDB } from "@/lib/mongoDB";
import URLServiceModel from "@/models/services/urlServicesSchema";
import { passwordValidationSchema } from "@/utils/validators";

export const POST = async (req, { params }) => {
  try {
    await connectDB();

    const { slug } = params;
    const body = await req.json();

    const { url } = body; // ✅ Get url directly from body

    // ✅ Only validate password using Zod
    const parsed = passwordValidationSchema.safeParse(body);
    if (!parsed.success) {
      const errorMessages = parsed.error.errors.map((e) => e.message);
      return Response.json(
        { success: false, error: errorMessages.join(", ") },
        { status: 400 }
      );
    }

    const { password } = parsed.data;

    const saved = await URLServiceModel.create({
      serviceName: slug,
      url,
      password,
    });

    return Response.json(
      {
        success: true,
        message: `${slug} Service Data submitted Successfully`,
        URLServicesData: saved,
      },
      { status: 201 }
    );
  } catch (error) {
    return Response.json(
      { success: false, error: error.message || "Server error" },
      { status: 500 }
    );
  }
};
