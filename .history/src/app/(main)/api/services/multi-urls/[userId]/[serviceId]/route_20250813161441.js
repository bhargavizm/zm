// // /api/services/[userId]/[serviceId]/priceDetails.js


// import handleSecuredServicesPriceDetails from "@/app/(main)/api/common/handleSecuredServicesPriceDetails";
// import { connectDB } from "@/lib/mongoDB";
// import MultiUrlModal from "@/models/services/multiUrlSchema";

// import path from "path";
// import url from "url";

// export async function PATCH(req, context) {
//   try {
//     const { serviceId, userId } = await context.params;
//      const __filename = url.fileURLToPath(import.meta.url);
//       const __dirname = path.dirname(__filename);
//       const serviceName = path.basename(path.dirname(path.dirname(__dirname))); // parent folder name
    

//     // 1️⃣ Validate required params
//     if (!userId || !serviceId) {
//       return Response.json(
//         {
//           success: false,
//           message: "Missing required URL parameters: userId or serviceId.",
//         },
//         { status: 400 }
//       );
//     }

//     // 2️⃣ Connect DB
//     await connectDB();

//     // 3️⃣ Find service
//     const doc = await MultiUrlModal.findById(serviceId);
//     if (!doc) {
//       return Response.json(
//         {
//           success: false,
//           message: `No data found for this service belonging to the user.`,
//         },
//         { status: 404 }
//       );
//     }

//     // 4️⃣ Ownership check
//     if (doc.user.id.toString() !== userId.toString()) {
//       return Response.json(
//         {
//           success: false,
//           message: "Unauthorized: This service does not belong to the given user.",
//         },
//         { status: 403 }
//       );
//     }

//     // 5️⃣ Parse request body
//     const body = await req.json();

//     // 6️⃣ Update price details
//     await handleSecuredServicesPriceDetails(doc, body);

//     return Response.json(
//       {
//         success: true,
//         message: `${serviceName}Price details updated successfully.`,
//         data: doc,
//       },
//       { status: 200 }
//     );
//   } catch (error) {
//     console.error("❌ Update error:", error);
//     return Response.json(
//       {
//         success: false,
//         message: "Error updating price details.",
//         error: error.message,
//       },
//       { status: 500 }
//     );
//   }
// }

import checkFreePlanEligibility from "@/app/(main)/api/common/checkFreePlanEligibility";
import handleSecuredServicesPriceDetails from "@/app/(main)/api/common/handleSecuredServicesPriceDetails";
import { connectDB } from "@/lib/mongoDB";
import User from "@/models/auth/userSchema";
import MultiUrlModal from "@/models/services/multiUrlSchema";
import SmsModal from "@/models/services/smsSchema";
import path from "path";
import url from "url";

export async function PATCH(req, context) {
  try {
    // 1️⃣ Get params
    const { serviceId, userId } = await context.params;

    // 2️⃣ Auto detect service name
    const __filename = url.fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    const serviceName = path.basename(path.dirname(path.dirname(__dirname)));

    // 3️⃣ Validate params
    if (!userId || !serviceId) {
      return Response.json(
        { success: false, message: "Missing required URL parameters: userId or serviceId." },
        { status: 400 }
      );
    }

    // 4️⃣ Connect DB
    await connectDB();

    // 5️⃣ Find service
    const doc = await MultiUrlModal.findById(serviceId);
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

    // 7️⃣ Get user for plan eligibility check
    const user = await User.findById(userId);
    if (!user || !user.firstLoginDate) {
      return Response.json(
        { success: false, message: "First login date not found for user." },
        { status: 400 }
      );
    }

    // 8️⃣ Parse JSON body
    const body = await req.json();
    const { plan } = body;

    // 9️⃣ Free plan eligibility
    if (plan === "Free") {
      const freePlanCheck = await checkFreePlanEligibility(userId, user.firstLoginDate);
      if (!freePlanCheck.eligible) {
        return Response.json(
          { success: false, message: freePlanCheck.message },
          { status: 400 }
        );
      }
    }

    // 🔟 Update price details
    await handleSecuredServicesPriceDetails(doc, body);

    // 1️⃣1️⃣ Success
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
