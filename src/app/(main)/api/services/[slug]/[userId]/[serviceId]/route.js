import { connectDB } from "@/lib/mongoDB";
import URLServiceModel from "@/models/services/urlServicesSchema";
import handleSecuredServicesPriceDetails from "@/app/(main)/api/common/handleSecuredServicesPriceDetails";
import checkFreePlanEligibility from "@/app/(main)/api/common/checkFreePlanEligibility";
import User from "@/models/auth/userSchema";

export async function PATCH(req, context) {
  try {
    const { slug, serviceId, userId } = await context.params;

    // 1️⃣ Validate required params
    if (!userId || !serviceId || !slug) {
      return Response.json(
        {
          success: false,
          message: "Missing required URL parameters: userId, serviceId, or slug.",
        },
        { status: 400 }
      );
    }

    // 2️⃣ Connect DB
    await connectDB();

    // 3️⃣ Find service
    const doc = await URLServiceModel.findById(serviceId);
    if (!doc) {
      return Response.json(
        {
          success: false,
          message: `No data found for this service belonging to the user.`,
        },
        { status: 404 }
      );
    }

    // 4️⃣ Service name check
    if (doc.serviceName.toLowerCase() !== slug.toLowerCase()) {
      return Response.json(
        {
          success: false,
          message: `Service Name is not correct.`,
        },
        { status: 400 }
      );
    }

    // 5️⃣ Ownership check
    if (doc.user.id.toString() !== userId.toString()) {
      return Response.json(
        {
          success: false,
          message: "Unauthorized: This service does not belong to the given user.",
        },
        { status: 403 }
      );
    }

    // 6️⃣ Get user & validate first login date (needed for Free plan)
    const user = await User.findById(userId);
    if (!user || !user.firstLoginDate) {
      return Response.json(
        {
          success: false,
          message: "First login date not found for user.",
        },
        { status: 400 }
      );
    }

    // 7️⃣ Parse body
    const body = await req.json();
    const { plan } = body;

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

    // 9️⃣ Update price details
    await handleSecuredServicesPriceDetails(doc, {
      ...body,
      validityDays: plan === "Free" ? 90 : body.validityDays,
    });

    return Response.json(
      {
        success: true,
        message: `${slug} price details updated successfully.`,
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
















// export async function PATCH(req, context) {
//   try {
//     const { slug, serviceId, userId } = context.params;

//     // 1️⃣ Validate required params
//     if (!userId || !serviceId || !slug) {
//       return Response.json(
//         {
//           success: false,
//           message:
//             "Missing required URL parameters: userId, serviceId, or slug.",
//         },
//         { status: 400 }
//       );
//     }

//     // 2️⃣ Connect DB
//     await connectDB();

//     // 3️⃣ Find service
//     const doc = await URLServiceModel.findById(serviceId);
//     // 5️⃣ Service name check
//     if (doc.serviceName.toLowerCase() !== slug.toLowerCase()) {
//       return Response.json(
//         {
//           success: false,
//           message: `Service name mismatch`,
//         },
//         { status: 400 }
//       );
//     }

//     // 4️⃣ Ownership check using userId from URL
//     if (doc.user.id.toString() !== userId.toString()) {
//       return Response.json(
//         {
//           success: false,
//           message:
//             "Unauthorized: This service does not belong to the given user.",
//         },
//         { status: 403 }
//       );
//     }

//     if (!doc) {
//       return Response.json(
//         {
//           success: false,
//           message: `No service found for serviceId '${serviceId}' belonging to user '${userId}'.`,
//         },
//         { status: 404 }
//       );
//     }

//     // 6️⃣ Parse request body
//     const body = await req.json();
//     if (!doc.priceDetails) {
//       doc.priceDetails = {};
//     }

//     // 7️⃣ Update price details
//     doc.priceDetails.plan = body.plan || doc.priceDetails.plan || "Free";
//     doc.priceDetails.price = body.price ?? doc.priceDetails.price ?? "0";
//     doc.priceDetails.validityDays =
//       body.validityDays ?? doc.priceDetails.validityDays ?? 30;
//     doc.priceDetails.startDate = body.startDate
//       ? new Date(body.startDate)
//       : doc.priceDetails.startDate || new Date();

//     // 🔹 Reset endDate so pre-save hook recalculates
//     doc.priceDetails.endDate = undefined;

//     if (body.status) doc.priceDetails.status = body.status;
//     if (body.renewalDate)
//       doc.priceDetails.renewalDate = new Date(body.renewalDate);

//     // 8️⃣ Save
//     await doc.save();

//     return Response.json(
//       {
//         success: true,
//         message: `${slug} price details updated successfully.`,
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
