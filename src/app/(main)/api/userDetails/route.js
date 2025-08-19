// /app/api/user/services/route.js
import { connectDB } from "@/lib/mongoDB";
import { authentication } from "@/utils/authentication";
import User from "@/models/auth/userSchema";
import serviceModelMap, { urlBasedServices } from "../common/allServiceModels";
import ShortLink from "@/models/shortLinkSchema"; // ✅ fix import name
import { authUser } from "@/middlewares/authMiddleware";

export async function GET(req) {
  try {
  const auth = await authUser(req);
      if (auth.status !== 200) {
        return new Response(JSON.stringify(auth.json), {
          status: auth.status,
          headers: { "Content-Type": "application/json" },
        });
      }
  
      await connectDB();
      const user = auth.user;
    await connectDB();

    // Fetch user profile (omit sensitive fields like password)
    const userProfile = await User.findById(user._id).select("-password -__v");

    const servicesData = {};

    // Fetch data and counts for each service
    for (const [key, model] of Object.entries(serviceModelMap)) {
      let filter = { "user.id": user._id };

      // Special filter for URL-based services
      if (urlBasedServices.includes(key)) {
        filter = {
          ...filter,
          serviceName: key, // make sure your schema actually has serviceName
        };
      }

      const data = await model.find(filter).sort({ createdAt: -1 });

      const enrichedData = await Promise.all(
        data.map(async (item) => {
          const obj = item.toObject();

          if (obj.qrCodeDetails?._id) {
            // Find the shortLink record that matches this QR service
            const shortLinkRecord = await ShortLink.findOne({
              fullUrl: new RegExp(obj._id), // since shortLink stores full URL containing serviceId
            });

            if (shortLinkRecord) {
              obj.qrCodeDetails.scanCount =
                shortLinkRecord.scanCount || 0;

              obj.qrCodeDetails.lastScanLocation =
                shortLinkRecord.lastScanLocation || {
                  city: "",
                  region: "",
                  country: "",
                  lat: null,
                  lon: null,
                };

              obj.qrCodeDetails.lastScannedAt =
                shortLinkRecord.lastScannedAt || null;

              // ✅ Include full scan history (structured)
              obj.qrCodeDetails.scanHistory = shortLinkRecord.scanHistory || [];
            } else {
              obj.qrCodeDetails.scanCount =
                obj.qrCodeDetails.scanCount || 0;
              obj.qrCodeDetails.lastScanLocation =
                obj.qrCodeDetails.lastScanLocation || "Unknown";
              obj.qrCodeDetails.lastScannedAt = null;
              obj.qrCodeDetails.scanHistory = [];
            }
          }

          return obj;
        })
      );

      servicesData[key] = {
        count: enrichedData.length,
        data: enrichedData,
      };
    }

    const servicesArray = Object.entries(servicesData).map(
      ([serviceName, { count, data }]) => ({
        serviceName,
        count,
        data,
      })
    );

    return new Response(
      JSON.stringify({
        success: true,
        message: "All User details fetched successfully.",
        userFullDetails: {
          userDetails: userProfile,
          services: servicesArray,
        },
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error fetching user text messages:", error);
    return new Response(
      JSON.stringify({
        success: false,
        error: error.message,
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}


// export async function GET(request) {
//   try {
//     const { user, errorResponse } = await authentication(request);
//     if (errorResponse) return errorResponse;

//     await connectDB();

//     // Fetch user profile (omit sensitive fields like password, __v)
//     const userProfile = await User.findById(user._id).select("-password -__v");

//     const servicesData = {};

//     // Fetch data and counts for each service
//     for (const [key, model] of Object.entries(serviceModelMap)) {
//       let filter = { "user.id": user._id };

//       const data = await model.find(filter).sort({ createdAt: -1 });

//       // Enrich each record with scan info if it has a QR code
//       const enrichedData = await Promise.all(
//         data.map(async (item) => {
//           const obj = item.toObject();

//           if (obj.qrCodeDetails?._id) {
//             console.log("Looking for shortlink with:", obj.qrCodeDetails._id);

//             // Find the shortLink record that matches this QR service
//             const shortLinkRecord = await shortLinkSchema.findOne({
//               fullUrl: new RegExp(obj._id), // since shortLink stores full URL containing serviceId
//             });

//             obj.qrCodeDetails.scanCount =
//               shortLinkRecord?.scanCount || obj.qrCodeDetails.scanCount || 0;

//             obj.qrCodeDetails.lastScanLocation =
//               shortLinkRecord?.lastScanLocation ||
//               obj.qrCodeDetails.lastScanLocation ||
//               "Unknown";

//             obj.qrCodeDetails.lastScannedAt =
//               shortLinkRecord?.lastScannedAt || null;
//           }

//           return obj;
//         })
//       );

//       servicesData[key] = {
//         count: enrichedData.length,
//         data: enrichedData,
//       };
//     }

//     const servicesArray = Object.entries(servicesData).map(
//       ([serviceName, { count, data }]) => ({
//         serviceName,
//         count,
//         data,
//       })
//     );

//     return new Response(
//       JSON.stringify({
//         success: true,
//         message: "All User details fetched successfully.",
//         userFullDetails: {
//           userDetails: userProfile,
//           services: servicesArray,
//         },
//       }),
//       { status: 200, headers: { "Content-Type": "application/json" } }
//     );
//   } catch (error) {
//     console.error("Error fetching user services:", error);
//     return new Response(
//       JSON.stringify({
//         success: false,
//         error: error.message,
//       }),
//       {
//         status: 500,
//         headers: { "Content-Type": "application/json" },
//       }
//     );
//   }
// }
