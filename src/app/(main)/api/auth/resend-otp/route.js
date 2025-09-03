// /app/api/auth/resend-otp/route.js
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongoDB";
import { auth } from "@/middlewares/authMiddleware";
import User from "@/models/auth/userSchema";
import { generateOTP } from "@/utils/generateOtp";
import { sendEmail, sendResendOtpEmail } from "@/lib/mailer/mailer";

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
    const otpExpiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 min

    user.verifyOtp = otp;
    user.otpExpiresAt = otpExpiresAt;
    await user.save();

    // ✅ Send OTP email
    try {
       await sendResendOtpEmail(user.email, user.name, otp);
    } catch (err) {
      console.error("[Resend OTP Email Error]", err.message);
      return NextResponse.json(
        { error: err.message || "Failed to send OTP email. Please try again later." },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "A new OTP has been sent to your email!",
    });
  } catch (error) {
    console.error("[Resend OTP Error]", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
