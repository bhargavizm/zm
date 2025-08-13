import handleSecuredServicesPriceDetails from "@/app/(main)/api/common/handleSecuredServicesPriceDetails";
import checkFreePlanEligibility from "@/app/(main)/api/common/checkFreePlanEligibility";
import { connectDB } from "@/lib/mongoDB";
import User from "@/models/auth/userSchema";
import PetTagModal from "@/models/services/petIdSchema";
import path from "path";
import url from "url";

export async function PATCH(req, context) {
  try {
    // 1️⃣ Get params (must await in Next.js 15)
    const params = await context.params;
    const { serviceId, userId } = params;

    // 2️⃣ Auto detect service name from folder path
    const __filename = url.fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    const serviceName = path.basename(path.dirname(path.dirname(__dirname)));

    // 3️⃣ Validate required params
    if (!userId || !serviceId) {
      return new Response(
        JSON.stringify({ success: false, message: "Missing required URL parameters: userId or serviceId." }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // 4️⃣ Connect DB
    await connectDB();

    // 5️⃣ Find service
    const doc = await PetTagModal.findById(serviceId);
    if (!doc) {
      return new Response(
        JSON.stringify({ success: false, message: `No data found for this service.` }),
        { status: 404, headers: { "Content-Type": "application/json" } }
      );
    }

    // 6️⃣ Ownership check
    if (doc.user.id.toString() !== userId.toString()) {
      return new Response(
        JSON.stringify({ success: false, message: "Unauthorized: This service does not belong to the given user." }),
        { status: 403, headers: { "Content-Type": "application/json" } }
      );
    }

    // 7️⃣ Find user & check firstLoginDate
    const user = await User.findById(userId);
    if (!user || !user.firstLoginDate) {
      return new Response(
        JSON.stringify({ success: false, message: "First login date not found for user." }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // 8️⃣ Parse request body
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

    // 🔟 Prepare update data
    const body = {
      plan,
      price: formData.get("price"),
      validityDays: plan === "Free" ? 90 : formData.get("validityDays"),
      startDate: formData.get("startDate"),
      status: formData.get("status"),
      renewalDate: formData.get("renewalDate"),
    };

    // 1️⃣1️⃣ Update & save
    await handleSecuredServicesPriceDetails(doc, body);
    await doc.save();

    return new Response(
      JSON.stringify({
        success: true,
        message: `${serviceName} price details updated successfully.`,
        data: doc,
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );

  } catch (error) {
    console.error("❌ Update error:", error);
    return new Response(
      JSON.stringify({
        success: false,
        message: "Error updating price details.",
        error: error.message,
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
