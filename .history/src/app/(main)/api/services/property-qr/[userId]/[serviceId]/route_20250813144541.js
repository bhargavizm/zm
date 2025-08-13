
import handleSecuredServicesPriceDetails from "@/app/(main)/api/common/handleSecuredServicesPriceDetails";
import { connectDB } from "@/lib/mongoDB";
import propertySchema from "@/models/services/propertySchema";
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
   const serviceName = path.basename(path.dirname(path.dirname(__dirname))); // parent folder name



    // 3️⃣ Validate required params
    if (!userId || !serviceId) {
      return Response.json(
        {
          success: false,
          message: "Missing required URL parameters: userId or serviceId.",
        },
        { status: 400 }
      );
    }

    // 4️⃣ Connect DB
    await connectDB();

    // 5️⃣ Find service
    const doc = await propertySchema.findById(serviceId);
    if (!doc) {
      return Response.json(
        {
          success: false,
          message: `No data found for this service belonging to the user.`,
        },
        { status: 404 }
      );
    }

    // 6️⃣ Service name check
    // if (doc.serviceName.toLowerCase() !== serviceName.toLowerCase()) {
    //   return Response.json(
    //     {
    //       success: false,
    //       message: `Service name is not correct.`,
    //     },
    //     { status: 400 }
    //   );
    // }

    // 7️⃣ Ownership check
    if (doc.user.id.toString() !== userId.toString()) {
      return Response.json(
        {
          success: false,
          message: "Unauthorized: This service does not belong to the given user.",
        },
        { status: 403 }
      );
    }

    const user = await User.findById(userId);
        if (!user || !user.firstLoginDate) {
          return new Response(
            JSON.stringify({ success: false, message: "First login date not found for user." }),
            { status: 400, headers: { "Content-Type": "application/json" } }
          );
        }
    
    // 8️⃣ Parse request body as FormData
    const formData = await req.formData();
    const body = {
      plan: formData.get("plan"),
      price: formData.get("price"),
      validityDays: formData.get("validityDays"),
      startDate: formData.get("startDate"),
      status: formData.get("status"),
      renewalDate: formData.get("renewalDate"),
    };

    // 9️⃣ Update price details
    await handleSecuredServicesPriceDetails(doc, body);
console.log(doc);
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



// import MenuCardsServiceModel from "@/models/services/menuCardSchema";
// import { connectDB } from "@/lib/mongoDB";

// export async function GET(request, { params }) {
//   try {
//     await connectDB();

//     const { id } = params;

//     const message = await MenuCardsServiceModel.findById(id);

//     if (!message) {
//       return new Response(
//         JSON.stringify({
//           success: false,
//           message: "Menu Card data not found.",
//         }),
//         { status: 404, headers: { "Content-Type": "application/json" } }
//       );
//     }

//     return new Response(
//       JSON.stringify({
//         success: true,
//         message: "Menu Card data fetched successfully.",
//         data: message,
//       }),
//       { status: 200, headers: { "Content-Type": "application/json" } }
//     );
//   } catch (error) {
//     console.error("GET /menu-cards/:id error:", error);
//     return new Response(
//       JSON.stringify({
//         success: false,
//         message: "Internal Server Error",
//         error: error.message,
//       }),
//       { status: 500, headers: { "Content-Type": "application/json" } }
//     );
//   }

// }

