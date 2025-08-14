import handleSecuredServicesPriceDetails from "@/app/(main)/api/common/handleSecuredServicesPriceDetails";
import checkFreePlanEligibility from "@/app/(main)/api/common/checkFreePlanEligibility";
import { connectDB } from "@/lib/mongoDB";
import User from "@/models/auth/userSchema";
import path from "path";
import url from "url";
import propertySchema from "@/models/services/propertySchema";
import ProductsModel from "@/models/services/productSchema";

export async function PATCH(req, context) {
  try {
    const params = context.params;
    const { serviceId, userId } = params;


    const __filename = url.fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    const serviceName = path.basename(path.dirname(path.dirname(__dirname)));


    if (!userId || !serviceId) {
      return new Response(
        JSON.stringify({ success: false, message: "Missing required URL parameters." }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    await connectDB();

    const doc = await ProductsModel.findById(serviceId);
    if (!doc) {
      return new Response(
        JSON.stringify({ success: false, message: `No data found for this service.` }),
        { status: 404, headers: { "Content-Type": "application/json" } }
      );
    }

    if (doc.user.id.toString() !== userId.toString()) {
      return new Response(
        JSON.stringify({ success: false, message: "Unauthorized: Service not owned by user." }),
        { status: 403, headers: { "Content-Type": "application/json" } }
      );
    }

    const user = await User.findById(userId);
    if (!user || !user.firstLoginDate) {
      return new Response(
        JSON.stringify({ success: false, message: "First login date not found for user." }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const formData = await req.formData();
    const plan = formData.get("plan");

    if (plan === "Free") {
      const freePlanCheck = await checkFreePlanEligibility(userId, user.firstLoginDate);
      if (!freePlanCheck.eligible) {
        return new Response(
          JSON.stringify({ success: false, message: freePlanCheck.message }),
          { status: 400, headers: { "Content-Type": "application/json" } }
        );
      }
    }

    const body = {
      plan,
      price: formData.get("price"),
      validityDays: plan === "Free" ? 90 : formData.get("validityDays"),
      startDate: formData.get("startDate"),
      status: formData.get("status"),
      renewalDate: formData.get("renewalDate"),
    };

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
