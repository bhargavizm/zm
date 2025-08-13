// /api/services/[userId]/[serviceId]/priceDetails.js
import handleSecuredServicesPriceDetails from "@/app/(main)/api/common/handleSecuredServicesPriceDetails";
import { connectDB } from "@/lib/mongoDB";
import SmsModal from "@/models/services/smsSchema";
import path from "path";
import url from "url";

export async function PATCH(req, context) {
  try {
    // ✅ Await params (Next.js 15 requirement)
    const { serviceId, userId } = await context.params;

    // ✅ Auto-detect service name
    const __filename = url.fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    const serviceName = path.basename(path.dirname(path.dirname(__dirname)));

    // 1️⃣ Validate required params
    if (!userId || !serviceId) {
      return Response.json(
        { success: false, message: "Missing required URL parameters: userId or serviceId." },
        { status: 400 }
      );
    }

    // 2️⃣ Connect to DB
    await connectDB();

    // 3️⃣ Find service record
    const doc = await SmsModal.findById(serviceId);
    if (!doc) {
      return Response.json(
        { success: false, message: `No data found for this service belonging to the user.` },
        { status: 404 }
      );
    }

    // 4️⃣ Ownership check
    if (doc.user.id.toString() !== userId.toString()) {
      return Response.json(
        { success: false, message: "Unauthorized: This service does not belong to the given user." },
        { status: 403 }
      );
    }

    // 5️⃣ Detect content type and parse accordingly
    let body = {};
    const contentType = req.headers.get("content-type") || "";

    if (contentType.includes("application/json")) {
      body = await req.json();
    } else if (
      contentType.includes("multipart/form-data") ||
      contentType.includes("application/x-www-form-urlencoded")
    ) {
      const formData = await req.formData();
      formData.forEach((value, key) => {
        body[key] = value;
      });
    } else {
      return Response.json(
        { success: false, message: `Unsupported Content-Type: ${contentType}` },
        { status: 400 }
      );
    }

    // 6️⃣ Update price details
    await handleSecuredServicesPriceDetails(doc, body);

    // 7️⃣ Return success
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
