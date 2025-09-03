import { NextResponse } from "next/server";
import User from "@/models/auth/userSchema";
import bcrypt from "bcryptjs";
import generateToken from "@/utils/token";
import { SignUpValidationSchema } from "@/utils/signUpValidation";
import { connectDB } from "@/lib/mongoDB";
import { generateOTP } from "@/utils/generateOtp";
import { sendOtpEmail } from "@/lib/mailer/mailer";

export async function POST(req) {
  try {
    await connectDB();
    const body = await req.json();

    // ✅ Validate input
    const parsed = SignUpValidationSchema.safeParse(body);
    if (!parsed.success) {
      const errorMessages = parsed.error.errors.map((err) => err.message);
      return NextResponse.json(
        { error: errorMessages.join(", ") },
        { status: 400 }
      );
    }

    const { name, email, phone, password } = parsed.data;

    // ✅ Check existing user
    if (await User.findOne({ email })) {
      return NextResponse.json(
        { error: "Email already registered" },
        { status: 409 }
      );
    }
    if (await User.findOne({ phone })) {
      return NextResponse.json(
        { error: "Mobile number already registered" },
        { status: 409 }
      );
    }

    // ✅ Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // ✅ Generate OTP
    const otp = generateOTP();
    const otpExpiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 min

    // ✅ Store user in DB first
    const newUser = await User.create({
      name,
      email,
      phone,
      password: hashedPassword,
      verifyOtp: otp,
      otpExpiresAt,
      isUserVerified: false,
    });

    // ✅ Send OTP email after DB success
    try {
      await sendOtpEmail(email, name, otp);
    } catch (err) {
      console.error("[Email OTP Error]", err.message);
      return NextResponse.json(
        { error: err.message || "Error sending email" },
        { status: 500 }
      );
    }

    // ✅ Generate temporary token (for verify-otp)
    const token = generateToken({ _id: newUser._id, email: newUser.email });

    return NextResponse.json(
      {
        message: "User registered successfully. OTP sent to email.",
        newUser,
        token,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("[Signup Error]", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
