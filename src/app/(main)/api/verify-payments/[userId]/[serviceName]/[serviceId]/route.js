import { NextResponse } from "next/server";
import crypto from "crypto";
import serviceModelMap from "@/app/(main)/api/common/allServiceModels";
import { connectDB } from "@/lib/mongoDB";
import User from "@/models/auth/userSchema";
import checkFreePlanEligibility from "@/app/(main)/api/common/checkFreePlanEligibility";

// 🔹 Helper: Check Free Plan eligibility
// async function checkFreePlanEligibility(userId) {
//   let totalFreePlans = 0;

//   // loop over all services
//   for (const model of Object.values(serviceModelMap)) {
//     const count = await model.countDocuments({
//       "user.id": userId,
//       "priceDetails.plan": "Free",
//     });
//     totalFreePlans += count;
//   }
// console.log("totalFreePlans:", totalFreePlans);
//   if (totalFreePlans >= 5) {
//     return {
//       eligible: false,
//       message: "You have already used your 5 Free plan limit. Please upgrade.",
//     };
//   }

//   return { eligible: true };
// }

export async function POST(req, { params }) {
  try {
    const { serviceName, serviceId, userId } = await params;
    const body = await req.json();
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      plan,
      validityDays,
      price, 
      qrImageUrl,
    } = body;

    // 🔒 Verify signature (skip for Free plan)
    if (plan !== "Free") {
      const sign = razorpay_order_id + "|" + razorpay_payment_id;
      const expectedSign = crypto
        .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
        .update(sign.toString())
        .digest("hex");

      if (razorpay_signature !== expectedSign) {
        return NextResponse.json(
          { success: false, message: "Invalid signature" },
          { status: 400 }
        );
      }
    }

    // ✅ Connect DB
    await connectDB();
    const model = serviceModelMap[serviceName];
    if (!model) {
      return NextResponse.json(
        { success: false, message: "Service not found" },
        { status: 400 }
      );
    }

      const userDetails = await User.findOne({ "_id": userId });
    if (!userDetails) {
      return NextResponse.json(
        { success: false, message: "userDetails not found" },
        { status: 400 }
      );
    }

    // ✅ Update service with Razorpay + Pricing details
    const doc = await model.findOne({ _id: serviceId, "user.id": userId });
    if (!doc) {
      return NextResponse.json(
        { success: false, message: "Service not found" },
        { status: 400 }
      );
    }

    if (plan === "Free") {
  const freePlanCheck = await checkFreePlanEligibility(userId, userDetails.firstLoginDate);
  if (!freePlanCheck.eligible) {
    return NextResponse.json(
      { success: false, message: freePlanCheck.message },
      { status: 400 }
    );
  }
}


    if (!doc.priceDetails) {
      doc.priceDetails = {}; // initialize subdocument
    }

    const startDate = new Date();
    const endDate = new Date(startDate.getTime() + validityDays * 24 * 60 * 60 * 1000);
    const renewalDate = endDate;

     doc.priceDetails.plan = plan;
    doc.priceDetails.price = price;
    doc.priceDetails.validityDays = validityDays;
    doc.priceDetails.startDate = startDate;
    doc.priceDetails.endDate = endDate;
    doc.priceDetails.renewalDate = renewalDate;
    doc.priceDetails.razorpayOrderId = razorpay_order_id;
    doc.priceDetails.razorpayPaymentId = razorpay_payment_id;
    doc.priceDetails.razorpaySignature = razorpay_signature;
    doc.priceDetails.paymentStatus = "success";
    doc.priceDetails.paymentDate = new Date();
    doc.priceDetails.currency = "INR";
     doc.qrCodeDetails.qrCodeImage = qrImageUrl || "";
     
      const now = new Date();
    if (now >= startDate && now < endDate) {
      doc.qrCodeDetails.qrCodeStatus = "active";
    } else {
      doc.qrCodeDetails.qrCodeStatus = "inactive";
    }

    await doc.save(); // ✅ will trigger pre("save") => auto sets endDate & renewalDate

    if (plan === "Free") {
  await User.findByIdAndUpdate(userId, {
    $inc: { freePlansUsed: 1 },
  });
}

    return NextResponse.json({
      success: true,
      message: `Payment verified successfully. ${serviceName} activated with ${plan} plan (₹${price}, ${validityDays} days).`,
      data: doc,
    });
  } catch (err) {
    console.error("❌ Verify error:", err);
    return NextResponse.json(
      { success: false, message: err?.message || "Verify failed" },
      { status: 500 }
    );
  }
}
