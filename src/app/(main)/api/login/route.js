import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongoDB";
import User from "@/models/auth/userSchema";
import bcrypt from "bcryptjs";
import generateToken from "@/utils/token"; // Should return JWT string
import { triggerMessage } from "@/lib/mailer/triggerMessage";

export async function POST(req) {
  try {
    await connectDB();

    const body = await req.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ error: "Invalid email" }, { status: 401 });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return NextResponse.json({ error: "Invalid password" }, { status: 401 });
    }

    // Check if user is verified
    if (!user.isUserVerified) {
      return NextResponse.json(
        { error: "Account not verified. Please complete OTP verification." },
        { status: 403 }
      );
    }

    // Backfill welcome-offer fields if missing
    if (!user.firstLoginDate) {
      user.firstLoginDate = new Date();
      user.offerExpiryDate = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000); // 30 days later
      await user.save();
    }

    // Generate JWT token
    const token = generateToken({ _id: user._id, email: user.email });

    // Send login email notification
    try {
      await triggerMessage(user, "loginNotification"); // template in triggerMessage
    } catch (err) {
      console.error("[Email] Failed to send login notification:", err.message);
    }

    // Create response with token in body and HTTP-only cookie
    const response = NextResponse.json({
      message: "Login successful",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        firstLoginDate: user.firstLoginDate,
        offerExpiryDate: user.offerExpiryDate,
      },
      token,
    });

    response.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      sameSite: "lax",
      maxAge: 60 * 60 * 24, // 1 day
    });

    return response;
  } catch (error) {
    console.error("[Login Error]", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
