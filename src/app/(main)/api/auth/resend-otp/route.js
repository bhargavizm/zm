// /app/api/auth/resend-otp/route.js
import { connectDB } from "@/lib/mongoDB";
import { auth } from "@/middlewares/authMiddleware";
import User from "@/models/auth/userSchema";
import { NextResponse } from "next/server";
import axios from "axios";
import { generateOTP } from "@/utils/generateOtp";


export async function POST(req) {
  try {
    await connectDB();

    // ✅ Authenticate user (token in headers)
    const authResult = await auth(req);
    if (authResult.status !== 200) {
      return NextResponse.json(authResult.json, { status: authResult.status });
    }

    const email = authResult.user.email;

    // ✅ Find user in DB
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ error: "User not found!" }, { status: 404 });
    }

    // ✅ Check if already verified
    if (user.isUserVerified) {
      return NextResponse.json({ message: "User already verified!" });
    }

    // ✅ Generate new OTP & expiry
    const otp = generateOTP();

    user.verifyOtp = otp;

    await user.save();

    // ✅ Send OTP
    if (process.env.NODE_ENV === "development") {
      console.log(`📌 MOCK OTP for ${user.phone || user.email}: ${otp}`);
    } else {
      try {
        await axios.post(
          "https://api.phone.email/v1/send",
          { to: user.phone, message: `Your new verification code is ${otp}` },
          {
            headers: {
              "Content-Type": "application/json",
              "X-Client-Id": process.env.PHONE_EMAIL_CLIENT_ID,
              "X-Api-Key": process.env.PHONE_EMAIL_API_KEY,
            },
            timeout: 10000,
          }
        );
      } catch (err) {
        console.error("[Resend OTP Error]", err.message);
        return NextResponse.json({ error: err.message }, { status: 500 });
      }
    }

    return NextResponse.json({
      success: true,
      message: "A new OTP has been sent successfully!",
    });

  } catch (error) {
    console.error("[Resend OTP Error]", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
