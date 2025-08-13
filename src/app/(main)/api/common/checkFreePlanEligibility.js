import serviceModelMap from "./allServiceModels";


export default async function checkFreePlanEligibility(userId, userFirstLoginDate) {
  const daysSinceFirstLogin = Math.floor(
    (new Date() - new Date(userFirstLoginDate)) / (1000 * 60 * 60 * 24)
  );

  if (daysSinceFirstLogin > 30) {
    return {
      eligible: false,
      message: "Free plan offer expired (beyond 30 days of first login).",
    };
  }

  let totalFreePlansCount = 0;

  // Loop through all service models from the central map
  for (const model of Object.values(serviceModelMap)) {
    const count = await model.countDocuments({
      "user.id": userId,
      "priceDetails.plan": "Free",
    });

    totalFreePlansCount += count;
  }

  console.log("total freeCount:", totalFreePlansCount);

  if (totalFreePlansCount >= 5) {
    return {
      eligible: false,
      message: "Free plan limit reached (5 QR codes).",
    };
  }

  return { eligible: true };
}
