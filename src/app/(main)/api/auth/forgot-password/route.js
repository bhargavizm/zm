// /app/api/auth/resend-otp/route.js
import { connectDB } from "@/lib/mongoDB";
import User from "@/models/auth/userSchema";
import { NextResponse } from "next/server";
import axios from "axios";
import { generateOTP } from "@/utils/generateOtp";
import generateToken from "@/utils/token";

export async function POST(req) {
  try {
    await connectDB();

    const { phone } = await req.json();

    if (!phone) {
      return NextResponse.json({ error: "Mobile number is required!" }, { status: 400 });
    }

    // ✅ Check if user exists with given phone
    const user = await User.findOne({ phone });
    if (!user) {
      return NextResponse.json({ error: "Mobile number not found!" }, { status: 404 });
    }

    // ✅ Generate OTP & save
    const otp = generateOTP();
    user.verifyOtp = otp;
    user.isUserVerified=false;
    await user.save();

    // ✅ Send OTP
    if (process.env.NODE_ENV === "development") {
      console.log(`📌 MOCK OTP for ${phone}: ${otp}`);
    } else {
      try {
        await axios.post(
          "https://api.phone.email/v1/send",
          {
            to: phone,
            message: `Your password reset code is ${otp}`,
          },
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
        return NextResponse.json({ error: "Failed to send OTP. Try again." }, { status: 500 });
      }
    }

      // ✅ Generate temporary token for OTP verification
        const token = generateToken({ _id: user._id, email: user.email });
    

    return NextResponse.json({
      success: true,
      message: "OTP sent to your mobile number successfully!",token
    });

  } catch (error) {
    console.error("[Resend OTP Error]", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
