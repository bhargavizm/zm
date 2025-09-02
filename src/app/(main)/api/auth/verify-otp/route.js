import { connectDB } from "@/lib/mongoDB";
import { auth } from "@/middlewares/authMiddleware";
import User from "@/models/auth/userSchema";
import { NextResponse } from "next/server";


export async function POST(req) {
  try {
    await connectDB();

    const authResult = await auth(req);
    if (authResult.status !== 200) {
      return NextResponse.json(authResult.json, { status: authResult.status });
    }

 const email = authResult?.user?.email;
   const userEmail = await User.findOne({ email });
    if (!userEmail) {
      return NextResponse.json({ error: "This Email address is not registered. Please sign up first!"}, { status: 404 });
    }
    const user = authResult.user;
    const { otp } = await req.json();

    if (!otp) {
      return NextResponse.json({ error: "OTP is required" }, { status: 400 });
    }


    if (user.verifyOtp !== otp) {
      return NextResponse.json({ error: "Invalid OTP!" }, { status: 400 });
    }

    user.isUserVerified = true;
    user.verifyOtp = null;
    await user.save();

    return NextResponse.json({success: true, message: "OTP verified successfully!" });
  } catch (error) {
    console.error("[Verify OTP Error]", error.message);
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
