import { connectDB } from '@/lib/mongoDB';
import DiscountModal from '@/models/services/discountSchema';
import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    await connectDB();
    const body = await req.json();

    const { nameOfBusiness, code, brandLogo, couponImage, password } = body;

    if (!nameOfBusiness || !code) {
      return NextResponse.json({
        success: false,
        message: "Missing required fields: nameOfBusiness, code",
      }, { status: 400 });
    }

    const newCoupon = new DiscountModal({
      nameOfBusiness,
      code,
      brandLogo,
      couponImage,
      password,
    });

    await newCoupon.save();

    return NextResponse.json({
      success: true,
      message: "Coupon saved",
    }, { status: 201 });

  } catch (err) {
    console.error("Error saving coupon:", err);
    return NextResponse.json({
      success: false,
      message: "Server error",
    }, { status: 500 });
  }
}
