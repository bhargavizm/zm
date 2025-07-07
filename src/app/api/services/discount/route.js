import { connectDB } from '@/lib/mongoDB';
import DiscountModal from '@/models/services/discountSchema';
import { NextResponse } from 'next/server';
import CryptoJS from 'crypto-js';

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

    // Optional: Decrypt to verify password (if needed for display/debug)
    const secretKey = process.env.AES_SECRET_KEY || "default-secret-key"; // should come from .env
    let decryptedPassword = null;

    try {
      const bytes = CryptoJS.AES.decrypt(password, secretKey);
      decryptedPassword = bytes.toString(CryptoJS.enc.Utf8);

      // Optional log: remove in production
      console.log("Decrypted password:", decryptedPassword);
    } catch (decryptionErr) {
      console.warn("Failed to decrypt password");
    }

    const newCoupon = new DiscountModal({
      nameOfBusiness,
      code,
      brandLogo,
      couponImage,
      password, // store the encrypted password directly
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
