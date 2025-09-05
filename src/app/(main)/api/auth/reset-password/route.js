// D:\present\zm\src\app\(auth)\api\reset-password\route.js

import { connectDB } from "@/lib/mongoDB";
import { auth } from "@/middlewares/authMiddleware";
import User from "@/models/auth/userSchema";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { triggerMessage } from "@/lib/mailer/triggerMessage"; // ✅ import

export async function POST(req) {
  try {
    await connectDB();

    // ✅ Auth middleware validates token
    const authResult = await auth(req);
    if (authResult.status !== 200) {
      return NextResponse.json(authResult.json, { status: authResult.status });
    }

    const { email } = authResult.user || {};
    if (!email) {
      return NextResponse.json({ error: "Invalid token" }, { status: 400 });
    }

    // ✅ Find user
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ error: "This email is not registered!" }, { status: 404 });
    }

    const { password, confirmPassword } = await req.json();

    if (!password || !confirmPassword) {
      return NextResponse.json(
        { error: "Password and Confirm Password are required" },
        { status: 400 }
      );
    }

    if (password !== confirmPassword) {
      return NextResponse.json({ error: "Passwords do not match" }, { status: 400 });
    }

    // ✅ Password rules
    if (password.length < 6) {
      return NextResponse.json(
        { error: "Password must be at least 6 characters long" },
        { status: 400 }
      );
    }

    if (!/[^A-Za-z0-9]/.test(password)) {
      return NextResponse.json(
        { error: "Password must contain at least one special character" },
        { status: 400 }
      );
    }

    // ✅ Hash and update
    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;
    await user.save();

    // ✅ Send email notification
    try {
      await triggerMessage(user, "reset", true); // uses reset template (success = true)
      console.log(`[Email] Password reset confirmation sent to ${user.email}`);
    } catch (emailErr) {
      console.error("[Email Error] Password Reset:", emailErr.message);
    }

    return NextResponse.json({
      success: true,
      message: "Password updated successfully! Please login.",
    });
  } catch (error) {
    console.error("[Create Password Error]", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
