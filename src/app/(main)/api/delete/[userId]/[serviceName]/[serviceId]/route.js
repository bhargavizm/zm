import { connectDB } from "@/lib/mongoDB";
import serviceModelMap from "@/app/(main)/api/common/allServiceModels";
import ShortLink from "@/models/shortLinkSchema";
import User from "@/models/auth/userSchema";
import { triggerMessage } from "@/lib/mailer/triggerMessage";

export async function DELETE(req, context) {
  try {
    const params = await context.params;
    const { serviceName, serviceId, userId } = params;

    // 🛑 Check required params
    if (!serviceName || !serviceId || !userId) {
      return Response.json(
        { success: false, message: "Some required details are missing. Please try again." },
        { status: 400 }
      );
    }

    await connectDB();

    // 🛑 Validate service name
    const model = serviceModelMap[serviceName];
    if (!model) {
      return Response.json(
        { success: false, message: `We couldn't find this service: ${serviceName}.` },
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

    // 🛑 Check user ownership
    if (doc.user.id.toString() !== userId.toString()) {
      return Response.json(
        { success: false, message: "You are not allowed to delete this service." },
        { status: 403 }
      );
    }

    // ✅ Delete service record
    await model.findByIdAndDelete(serviceId);

    // ✅ Delete related ShortLink entries
    await ShortLink.deleteMany({ fullUrl: new RegExp(serviceId) });

    // ✅ Trigger email to user about deletion
    try {
      const user = await User.findById(userId);
      if (user) {
        await triggerMessage(user, "serviceDeleted", serviceName);
        console.log(`Service deletion email sent to: ${user.email}`);
      }
    } catch (emailErr) {
      console.error("[Email Error] Service deletion:", emailErr.message);
      // Do not block deletion if email fails
    }

    return Response.json({
      success: true,
      message: `Service ${serviceName} and its related short links have been deleted successfully.`,
    });
  } catch (err) {
    console.error("❌ Error deleting service:", err);
    return Response.json(
      {
        success: false,
        message: "Something went wrong while deleting the service. Please try again later.",
        err: err.message,
      },
      { status: 500 }
    );
  }
}
