import handleSecuredServicesPriceDetails from "@/app/(main)/api/common/handleSecuredServicesPriceDetails";
import checkFreePlanEligibility from "@/app/(main)/api/common/checkFreePlanEligibility";
import { connectDB } from "@/lib/mongoDB";
import MedicalAlertModel from "@/models/services/medicalAlertSchema";
import User from "@/models/auth/userSchema";
import path from "path";
import url from "url";

export async function PATCH(req, context) {
  try {
    // 1️⃣ Get params
    const params = await context.params;
    const { serviceId, userId } = params;

    // 2️⃣ Detect service name
    const __filename = url.fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    const serviceName = path.basename(path.dirname(path.dirname(__dirname)));

    if (!userId || !serviceId) {
      return Response.json(
        { success: false, message: "Missing required URL parameters: userId or serviceId." },
        { status: 400 }
      );
    }

    // 3️⃣ Connect DB
    await connectDB();

    // 4️⃣ Find service document
    const doc = await MedicalAlertModel.findById(serviceId);
    if (!doc) {
      return Response.json(
        { success: false, message: "No data found for this service." },
        { status: 404 }
      );
    }

    // 5️⃣ Ownership check
    if (doc.user.id.toString() !== userId.toString()) {
      return Response.json(
        { success: false, message: "Unauthorized: This service does not belong to the given user." },
        { status: 403 }
      );
    }

    // 6️⃣ Fetch user for free plan logic
    const user = await User.findById(userId);
    if (!user || !user.firstLoginDate) {
      return Response.json(
        { success: false, message: "First login date not found for user." },
        { status: 400 }
      );
    }

    // 7️⃣ Parse request body as FormData
    const formData = await req.formData();
    const plan = formData.get("plan");

    // 8️⃣ Free plan eligibility check
    if (plan === "Free") {
      const freePlanCheck = await checkFreePlanEligibility(userId, user.firstLoginDate);
      if (!freePlanCheck.eligible) {
        return Response.json(
          { success: false, message: freePlanCheck.message },
          { status: 400 }
        );
      }
    }

    // 9️⃣ Prepare body for update
    const body = {
      plan,
      price: formData.get("price"),
      validityDays: plan === "Free" ? 90 : formData.get("validityDays"),
      startDate: formData.get("startDate"),
      status: formData.get("status"),
      renewalDate: formData.get("renewalDate"),
    };

    // 🔟 Update service price details
    await handleSecuredServicesPriceDetails(doc, body);
    await doc.save();

    return Response.json(
      {
        success: true,
        message: `${serviceName} price details updated successfully.`,
        data: doc,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("❌ Update error:", error);
    return Response.json(
      {
        success: false,
        message: "Error updating price details.",
        error: error.message,
      },
      { status: 500 }
    );
  }
}
