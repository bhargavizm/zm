import { NextResponse } from "next/server";
import User from "@/models/auth/userSchema";
import bcrypt from "bcryptjs";
import generateToken from "@/utils/token";
import { SignUpValidationSchema } from "@/utils/signUpValidation";
import axios from "axios";
import { connectDB } from "@/lib/mongoDB";
import { generateOTP } from "@/utils/generateOtp";
import { triggerMessage } from "@/lib/mailer/triggerMessage";

export async function POST(req) {
  try {
    // 1️⃣ Connect to DB
    await connectDB();

    const body = await req.json();

    // 2️⃣ Validate input
    const parsed = SignUpValidationSchema.safeParse(body);
    if (!parsed.success) {
      const errorMessages = parsed.error.errors.map((err) => err.message);
      return NextResponse.json({ error: errorMessages.join(", ") }, { status: 400 });
    }

    const { name, email, phone, password } = parsed.data;

    // 3️⃣ Check if user already exists
    if (await User.findOne({ email })) {
      return NextResponse.json({ error: "Email already registered" }, { status: 409 });
    }
    if (await User.findOne({ phone })) {
      return NextResponse.json({ error: "Mobile number already registered" }, { status: 409 });
    }

    // 4️⃣ Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // 5️⃣ Generate OTP
    const otp = generateOTP();
    const otpExpiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    // 6️⃣ Send OTP SMS
    try {
      if (process.env.NODE_ENV === "development") {
        console.log(`📌 MOCK OTP for ${phone}: ${otp}`);
      } else {
        await axios.post(
          process.env.SMS_API_URL, // your SMS API endpoint
          {
            to: phone,
            message: `Your verification code is ${otp}`,
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
        console.log("✅ OTP sent to phone:", phone);
      }
    } catch (smsErr) {
      console.error("[SMS Error]", smsErr);
    }

    // 7️⃣ Create user
    const newUser = await User.create({
      name,
      email,
      phone,
      password: hashedPassword,
      verifyOtp: otp,
      otpExpiresAt,
      isUserVerified: false,
    });

    // 8️⃣ Trigger welcome email
    try {
      console.log("💡 Sending welcome email to:", newUser.email);
      await triggerMessage(newUser, "signup");
      console.log("✅ Welcome email sent to:", newUser.email);
    } catch (emailErr) {
      console.error("[Email Error]", emailErr);
    }

    // 9️⃣ Generate token for OTP verification
    const token = generateToken({ _id: newUser._id, email: newUser.email });

    // 10️⃣ Return response
    return NextResponse.json(
      {
        message:
          process.env.NODE_ENV === "development"
            ? "User registered successfully. OTP logged in console."
            : "User registered successfully. OTP sent to mobile and welcome email triggered.",
        newUser,
        token,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("[Signup Error]", error);
    return NextResponse.json({ error: error.message || "Internal Server Error" }, { status: 500 });
  }
}
