// /api/services/sms/[userId]/[serviceId]/priceDetails.js

import checkFreePlanEligibility from "@/app/(main)/api/common/checkFreePlanEligibility";
import handleSecuredServicesPriceDetails from "@/app/(main)/api/common/handleSecuredServicesPriceDetails";
import { connectDB } from "@/lib/mongoDB";
import User from "@/models/auth/userSchema";
import SmsModal from "@/models/services/smsSchema";

import path from "path";
import url from "url";

export async function PATCH(req, context) {
  try {
    // 1️⃣ Get params
    const params = await context.params;
    const { serviceId, userId } = params;

    // 2️⃣ Detect service name from folder path
    const __filename = url.fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    const serviceName = path.basename(path.dirname(path.dirname(__dirname))); // parent folder name

    console.log("Detected service:", serviceName);

    // 3️⃣ Validate required params
    if (!userId || !serviceId) {
      return Response.json(
        { success: false, message: "Missing required URL parameters: userId or serviceId." },
        { status: 400 }
      );
    }

    // 4️⃣ Connect DB
    await connectDB();

    // 5️⃣ Find service doc
    const doc = await SmsModal.findById(serviceId);
    if (!doc) {
      return Response.json(
        { success: false, message: `No data found for this service belonging to the user.` },
        { status: 404 }
      );
    }

    // 6️⃣ Ownership check
    if (doc.user.id.toString() !== userId.toString()) {
      return Response.json(
        { success: false, message: "Unauthorized: This service does not belong to the given user." },
        { status: 403 }
      );
    }

    // 7️⃣ Get user + first login date
    const user = await User.findById(userId);
    if (!user || !user.firstLoginDate) {
      return new Response(
        JSON.stringify({ success: false, message: "First login date not found for user." }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // 8️⃣ Parse FormData from request
    const formData = await req.formData();
    const plan = formData.get("plan");

    // 9️⃣ Free plan eligibility check
    if (plan === "Free") {
      const freePlanCheck = await checkFreePlanEligibility(userId, user.firstLoginDate);
      if (!freePlanCheck.eligible) {
        return new Response(
          JSON.stringify({ success: false, message: freePlanCheck.message }),
          { status: 400, headers: { "Content-Type": "application/json" } }
        );
      }
    }

    // 🔟 Prepare body for update
    const body = {
      price: formData.get("price"),
      validityDays: formData.get("validityDays"),
      startDate: formData.get("startDate"),
      status: formData.get("status"),
      renewalDate: formData.get("renewalDate"),
    };

    // 1️⃣1️⃣ Update price details
    await handleSecuredServicesPriceDetails(doc, body);

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
      { success: false, message: "Error updating price details.", error: error.message },
      { status: 500 }
    );
  }
}
