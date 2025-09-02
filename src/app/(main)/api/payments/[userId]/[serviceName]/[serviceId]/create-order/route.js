import { NextResponse } from "next/server";
import serviceModelMap from "@/app/(main)/api/common/allServiceModels";
import { connectDB } from "@/lib/mongoDB";
import { razorpay } from "@/utils/razorpay";

// ✅ API: POST /api/services/[serviceName]/[userId]/[serviceId]/pay
export async function POST(req, { params }) {
  try {
    const { serviceName, serviceId, userId } = await params;

    if (!serviceName || !serviceId || !userId) {
      return NextResponse.json(
        {
          success: false,
          message: "Missing serviceName, serviceId, or userId.",
        },
        { status: 400 }
      );
    }

    await connectDB();

    const model = serviceModelMap[serviceName];
    if (!model) {
      return NextResponse.json(
        { success: false, message: `Service not found: ${serviceName}` },
        { status: 400 }
      );
    }

    const body = await req.json();
    const { plan, price, validityDays, premiumStickerPlan } = body || {};

    if (!plan || !price || !validityDays) {
      return NextResponse.json(
        { success: false, message: "Missing plan, price, or validityDays." },
        { status: 400 }
      );
    }

    let cleanPrice = Number(String(price).replace(/[^\d.]/g, "")); // plan price
    let sticker = Number(premiumStickerPlan || 0); // force numeric

    let finalAmount = cleanPrice + sticker;
    let amountInPaise = Math.round(finalAmount * 100);

    if (isNaN(amountInPaise) || amountInPaise <= 0) {
      return NextResponse.json(
        { success: false, message: `Invalid price format: ${price}` },
        { status: 400 }
      );
    }

    // ✅ Ensure receipt <= 40 chars
    const shortService = serviceName.slice(0, 10); // truncate long names
    const shortId = String(serviceId).slice(-6); // last 6 chars
    const shortTime = Date.now().toString().slice(-6); // last 6 digits of timestamp
    const receipt = `rcpt_${shortService}_${shortId}_${shortTime}`;

    // ✅ Create Razorpay order
    const order = await razorpay.orders.create({
      amount: amountInPaise,
      currency: "INR",
      receipt,
      notes: {
        userId,
        serviceId,
        serviceName,
        plan,
        validityDays,
      },
    });

    return NextResponse.json({
      success: true,
      message: `${plan} Plan Order is created successfully for ${serviceName}`,
      order,
    });
  } catch (err) {
    console.error("❌ Create order error:", err);
    return NextResponse.json(
      { success: false, err: err.message },
      { status: 500 }
    );
  }
}
