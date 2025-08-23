import { connectDB } from "@/lib/mongoDB";
import { auth } from "@/middlewares/authMiddleware";
import User from "@/models/auth/userSchema";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(req) {
  try {
    await connectDB();

    // ✅ Auth middleware validates token and attaches user
    const authResult = await auth(req);
    if (authResult.status !== 200) {
      return NextResponse.json(authResult.json, { status: authResult.status });
    }

    const { email } = authResult.user || {};
    if (!email) {
      return NextResponse.json({ error: "Invalid token" }, { status: 400 });
    }

    // ✅ Ensure user exists
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

    // ✅ Password validation rules
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

    // ✅ Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // ✅ Update password in DB
    user.password = hashedPassword;
    await user.save();

    return NextResponse.json({
      success: true,
      message: "Password updated successfully! Please login.",
    });
  } catch (error) {
    console.error("[Create Password Error]", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
