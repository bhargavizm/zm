import handleSecuredServicesPriceDetails from "@/app/(main)/api/common/handleSecuredServicesPriceDetails";
import { connectDB } from "@/lib/mongoDB";
import PetTagModal from "@/models/services/petIdSchema";

export async function PATCH(req, context) {
  try {
    // 1️⃣ Get params
    const { serviceId, userId } = context.params;

    // 2️⃣ Connect DB
    await connectDB();

    // 3️⃣ Find service document
    const doc = await PetTagModal.findById(serviceId);
    if (!doc) {
      return new Response(
        JSON.stringify({
          success: false,
          message: `No data found for this service belonging to the user.`,
        }),
        { status: 404, headers: { "Content-Type": "application/json" } }
      );
    }

    // 4️⃣ Ownership check
    if (doc.user.id.toString() !== userId.toString()) {
      return new Response(
        JSON.stringify({
          success: false,
          message: "Unauthorized: This service does not belong to the given user.",
        }),
        { status: 403, headers: { "Content-Type": "application/json" } }
      );
    }

    // 5️⃣ Parse JSON request body
    const body = await req.json();

    // 6️⃣ Use serviceName from document or fallback string
    const serviceName = doc.serviceName || "Pet-ID-tags";

    // 7️⃣ Update price details
    await handleSecuredServicesPriceDetails(doc, body);

    // 8️⃣ Return success
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
