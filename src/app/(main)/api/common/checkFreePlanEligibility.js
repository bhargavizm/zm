import User from "@/models/auth/userSchema";

export default async function checkFreePlanEligibility(userId) {
  const user = await User.findById(userId).select(
    "firstLoginDate freePlansUsed"
  );

  if (!user) {
    return {
      eligible: false,
      message: "User not found",
      totalFreePlansCount: 0,
    };
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

