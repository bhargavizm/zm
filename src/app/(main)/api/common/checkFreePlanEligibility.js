// // import useDesignContext from "@/components/hooks/useDesignContext";
// // import serviceModelMap from "./allServiceModels";

import User from "@/models/auth/userSchema";
import serviceModelMap from "./allServiceModels";


// // export default async function checkFreePlanEligibility(userId, userFirstLoginDate) {
// //   const {setFreePlanCount}=useDesignContext()
// //   const daysSinceFirstLogin = Math.floor(
// //     (new Date() - new Date(userFirstLoginDate)) / (1000 * 60 * 60 * 24)
// //   );

// //   if (daysSinceFirstLogin > 30) {
// //     return {
// //       eligible: false,
// //       message: "Free plan offer expired (beyond 30 days of first login).",
// //     };
// //   }

// //   let totalFreePlansCount = 0;

// //   // Loop through all service models from the central map
// //   for (const model of Object.values(serviceModelMap)) {
// //     const count = await model.countDocuments({
// //       "user.id": userId,
// //       "priceDetails.plan": "Free",
// //     });

// //     totalFreePlansCount += count;
// //   }
// // setFreePlanCount(totalFreePlansCount)
// //   console.log("total freeCount:", totalFreePlansCount);
  

// //   if (totalFreePlansCount >= 5) {
// //     return {
// //       eligible: false,
// //       message: "Free plan limit reached (5 QR codes).",
// //     };
// //   }

// //   return { eligible: true };
// // }

// // src/app/(main)/api/common/checkFreePlanEligibility.js
// import serviceModelMap from "./allServiceModels";

// export default async function checkFreePlanEligibility(userId, userFirstLoginDate) {
//   const daysSinceFirstLogin = Math.floor(
//     (new Date() - new Date(userFirstLoginDate)) / (1000 * 60 * 60 * 24)
//   );

//   if (daysSinceFirstLogin > 30) {
//     return {
//       eligible: false,
//       message: "Free plan offer expired (beyond 30 days of first login).",
//       totalFreePlansCount: null
//     };
//   }

//   // let totalFreePlansCount = 0;
//   // for (const model of Object.values(serviceModelMap)) {
//   //   const count = await model.countDocuments({
//   //     "user.id": userId,
//   //     "priceDetails.plan": "Free",
//   //   });
//   //   totalFreePlansCount += count;
//   // }

//   let totalFreePlansCount = 0;
// const seenIds = new Set();

// for (const model of Object.values(serviceModelMap)) {
//   const docs = await model.find({
//     "user.id": userId,
//     "priceDetails.plan": "Free",
//   }).select("_id");

//   docs.forEach(doc => seenIds.add(doc._id.toString()));
// }

// totalFreePlansCount = seenIds.size;


//   console.log("freePlanCount:",totalFreePlansCount)

//   if (totalFreePlansCount >= 5) {
//     return {
//       eligible: false,
//       message: "Free plan limit reached (5 QR codes).",
//       totalFreePlansCount
//     };
//   }

//   return { eligible: true, totalFreePlansCount };
// }





export default async function checkFreePlanEligibility(userId) {
  const user = await User.findById(userId).select(
    "firstLoginDate freePlansUsed"
  );

  if (!user) {
    return { eligible: false, message: "User not found", totalFreePlansCount: 0 };
  }

  // ⏳ Check if first login is older than 30 days
  const daysSinceFirstLogin = Math.floor(
    (new Date() - new Date(user.firstLoginDate)) / (1000 * 60 * 60 * 24)
  );

  if (daysSinceFirstLogin > 30) {
    return {
      eligible: false,
      message: "Free plan offer expired (beyond 30 days of first login).",
      totalFreePlansCount: user.freePlansUsed,
    };
  }

  // 🚨 Enforce max 5 free QR codes (based on counter only)
  if (user.freePlansUsed >= 5) {
    return {
      eligible: false,
      message: "Free plan limit reached (5 QR codes).",
      totalFreePlansCount: user.freePlansUsed,
    };
  }

  return {
    eligible: true,
    totalFreePlansCount: user.freePlansUsed,
  };
}
// ✅ 3. When creating a new Free plan
// Whenever you create a new QR code with plan: "Free", also update the counter:

// js
// Copy code
// if (newQR.priceDetails.plan === "Free") {
//   await User.findByIdAndUpdate(userId, {
//     $inc: { freePlansUsed: 1 },
//   });
// }

