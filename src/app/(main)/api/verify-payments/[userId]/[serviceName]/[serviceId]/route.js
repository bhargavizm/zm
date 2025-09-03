// src/app/(main)/api/verify-payments/[userId]/[serviceName]/[serviceId]/route.js

import { NextResponse } from "next/server";
import crypto from "crypto";
import serviceModelMap from "@/app/(main)/api/common/allServiceModels";
import { connectDB } from "@/lib/mongoDB";
import User from "@/models/auth/userSchema";
import checkFreePlanEligibility from "@/app/(main)/api/common/checkFreePlanEligibility";

// ✅ Import email trigger
import { triggerMessage } from "@/lib/mailer/triggerMessage";

export async function POST(req, { params }) {
  try {
    // ✅ Use params directly (do NOT await)
    const { serviceName, serviceId, userId } = params;

    const body = await req.json();
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      plan,
      validityDays,
      price,
      qrImageUrl,
      encrypted = false,
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

    const userDetails = await User.findById(userId);
    if (!userDetails) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 400 }
      );
    }

    // ✅ Check Free plan eligibility
    if (plan === "Free") {
      const freePlanCheck = await checkFreePlanEligibility(
        userId,
        userDetails.firstLoginDate
      );
      if (!freePlanCheck.eligible) {
        return NextResponse.json(
          { success: false, message: freePlanCheck.message },
          { status: 400 }
        );
      }
    }

    // ✅ Update service
    const doc = await model.findOne({ _id: serviceId, "user.id": userId });
    if (!doc) {
      return NextResponse.json(
        { success: false, message: "Service not found" },
        { status: 400 }
      );
    }

    if (!doc.priceDetails) doc.priceDetails = {};
    const startDate = new Date();
    const endDate = new Date(
      startDate.getTime() + validityDays * 24 * 60 * 60 * 1000
    );

    // ✅ Store all price & plan details + reminder tracker
    doc.priceDetails = {
      plan,
      price,
      validityDays,
      startDate,
      endDate,
      renewalDate: endDate,
      razorpayOrderId: razorpay_order_id,
      razorpayPaymentId: razorpay_payment_id,
      razorpaySignature: razorpay_signature,
      paymentStatus: "success",
      paymentDate: new Date(),
      currency: "INR",
      reminderSent: [], // Track sent reminders
    };

    doc.qrCodeDetails = doc.qrCodeDetails || {};
    doc.qrCodeDetails.qrCodeImage = qrImageUrl || "";
    doc.qrCodeDetails.qrCodeStatus = startDate < endDate ? "active" : "inactive";

    await doc.save();

    // ✅ Trigger initial email
    try {
      if (plan === "Free") {
        const updatedUser = await User.findByIdAndUpdate(
          userId,
          { $inc: { freePlansUsed: 1 } },
          { new: true }
        );
        await triggerMessage(updatedUser, "freeQR", updatedUser.freePlansUsed);
      } else if (encrypted) {
        await triggerMessage(
          userDetails,
          "encryptedService",
          `Encrypted QR Code Activated! Plan: ₹${price}, Validity: ${validityDays} days.`
        );
      } else {
        await triggerMessage(
          userDetails,
          "purchase",
          `Thank you for your purchase! You’ve activated ${serviceName} for ₹${price}, valid for ${validityDays} days.`
        );
      }
    } catch (emailErr) {
      console.error("[Email Error] Payment:", emailErr.message);
    }

    return NextResponse.json({
      success: true,
      message: `Payment verified successfully. ${serviceName} activated with ${plan} plan (₹${price}, ${validityDays} days).`,
      data: doc,
    });
  } catch (err) {
    console.error("❌ Payment verification error:", err);
    return NextResponse.json(
      { success: false, message: err?.message || "Payment verification failed" },
      { status: 500 }
    );
  }
}
