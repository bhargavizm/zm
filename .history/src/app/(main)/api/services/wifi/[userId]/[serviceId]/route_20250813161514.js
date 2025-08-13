

// import handleSecuredServicesPriceDetails from "@/app/(main)/api/common/handleSecuredServicesPriceDetails";
// import { connectDB } from "@/lib/mongoDB";
// import WifiModel from "@/models/services/wifiSchema";
// import path from "path";
// import url from "url";

// export async function PATCH(req, context) {
//   try {
//     const { serviceId, userId } = await context.params;

//         // 2️⃣ Auto detect service name from folder path
//         const __filename = url.fileURLToPath(import.meta.url);
//         const __dirname = path.dirname(__filename);
//        const serviceName = path.basename(path.dirname(path.dirname(__dirname))); // parent folder name
    

//     // 1️⃣ Validate required params
//     if (!userId || !serviceId) {
//       return Response.json(
//         {
//           success: false,
//           message: "Missing required URL parameters: userId, serviceId.",
//         },
//         { status: 400 }
//       );
//     }

//     // 2️⃣ Connect DB
//     await connectDB();

//     // 3️⃣ Find service
//     const doc = await WifiModel.findById(serviceId);
//     if (!doc) {
//       return Response.json(
//         {
//           success: false,
//           message: `No data found for this service belonging to the user.`,
//         },
//         { status: 404 }
//       );
//     }

//     // 4️⃣ Service name check
//     // if (doc.serviceName.toLowerCase() !== slug.toLowerCase()) {
//     //   return Response.json(
//     //     {
//     //       success: false,
//     //       message: `Service Name is not correct `,
//     //     },
//     //     { status: 400 }
//     //   );
//     // }

//     // 5️⃣ Ownership check
//     if (doc.user.id.toString() !== userId.toString()) {
//       return Response.json(
//         {
//           success: false,
//           message: "Unauthorized: This service does not belong to the given user.",
//         },
//         { status: 403 }
//       );
//     }

//     // 6️⃣ Parse request body
//     const body = await req.json();

//     // 7️⃣ Update price details
//     await handleSecuredServicesPriceDetails(doc, body);

//     return Response.json(
//       {
//         success: true,
//         message: `${serviceName} price details updated successfully.`,
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

