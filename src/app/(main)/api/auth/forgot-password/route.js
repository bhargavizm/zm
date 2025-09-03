// /app/api/auth/resend-otp/route.js
import { connectDB } from "@/lib/mongoDB";
import User from "@/models/auth/userSchema";
import { NextResponse } from "next/server";
import { generateOTP } from "@/utils/generateOtp";
import generateToken from "@/utils/token";
import { sendOtpEmail } from "@/lib/mailer/mailer"; // ✅ make sure it's imported

export async function POST(req) {
  try {
    await connectDB();

    const { email } = await req.json();

    if (!email) {
      return NextResponse.json({ error: "Email is required!" }, { status: 400 });
    }

    // ✅ Check if user exists with given email
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ error: "Email not found!" }, { status: 404 });
    }

    // ✅ Generate OTP & save
    const otp = generateOTP();
    user.verifyOtp = otp;
    user.isUserVerified = false;
    await user.save();

    // ✅ Always send OTP via email
    try {
      await sendOtpEmail(user.email, user.fullName || "User", otp);
    } catch (err) {
      console.error("[Resend OTP Email Error]", err.message);
      return NextResponse.json(
        { error: "Failed to send OTP email. Try again." },
        { status: 500 }
      );
    }

    // ✅ Generate temporary token for OTP verification
    const token = generateToken({ _id: user._id, email: user.email });

    return NextResponse.json({
      success: true,
      message: "OTP sent to your email successfully!",
      token,
    });
  } catch (error) {
    console.error("[Resend OTP Error]", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
