import serviceModelMap from "@/app/(main)/api/common/allServiceModels";
import { connectDB } from "@/lib/mongoDB";
import bcrypt from "bcryptjs";

export async function POST(req, context) {
  try {
    const params = await context.params;
    const { serviceName, serviceId, userId } = params;

    // 🛑 Missing required info
    if (!serviceName || !serviceId || !userId) {
      return Response.json(
        { success: false, message: "Some required details are missing. Please try again." },
        { status: 400 }
      );
    }

    await connectDB();

    // 🛑 Invalid service name
    const model = serviceModelMap[serviceName];
    if (!model) {
      return Response.json(
        { success: false, message: `We couldn't find this service: ${serviceName}.` },
        { status: 400 }
      );
    }

    // 📦 Handle both JSON and FormData
    let body;
    const contentType = req.headers.get("content-type") || "";
    if (contentType.includes("application/json")) {
      body = await req.json();
    } else if (contentType.includes("multipart/form-data")) {
      const formData = await req.formData();
      body = Object.fromEntries(formData.entries());
    } else {
      return Response.json(
        { success: false, message: "Invalid request format. Please try again." },
        { status: 400 }
      );
    }

    // 🛑 Password missing
    const newPassword = body.password;
    if (!newPassword) {
      return Response.json(
        { success: false, message: "Please enter a new password." },
        { status: 400 }
      );
    }

    // 🔍 Find the service record
    const doc = await model.findById(serviceId);
    if (!doc) {
      return Response.json(
        { success: false, message: "We could not find this service record." },
        { status: 404 }
      );
    }

    // 🛑 Wrong user
    if (doc.user.id.toString() !== userId.toString()) {
      return Response.json(
        { success: false, message: "You are not allowed to update this password." },
        { status: 403 }
      );
    }

    // 🔐 Hash the password before saving
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    // ✅ Update password
    doc.password = hashedPassword;
    await doc.save();

    return Response.json({
      success: true,
      message: `Password updated successfully for ${serviceName}.`,
    });
  } catch (err) {
    console.error("❌ Error resetting password:", err);
    return Response.json(
      { success: false, message: "Something went wrong while updating the password. Please try again later.", err: err.message },
      { status: 500 }
    );
  }
}
