// /app/api/signup/route.js
import { NextResponse } from 'next/server';
import User from '@/models/auth/userSchema';
import bcrypt from 'bcryptjs';
import generateToken from '@/utils/token';
import { SignUpValidationSchema } from '@/utils/signUpValidation';
import axios from 'axios';
import { connectDB } from '@/lib/mongoDB';
import { generateOTP } from '@/utils/generateOtp';



export async function POST(req) {
  try {
    await connectDB();
    const body = await req.json();

    // ✅ Validate input
    const parsed = SignUpValidationSchema.safeParse(body);
    if (!parsed.success) {
      const errorMessages = parsed.error.errors.map(err => err.message);
      return NextResponse.json({ error: errorMessages.join(', ') }, { status: 400 });
    }

    const { name, email, phone, password } = parsed.data;

    // ✅ Check existing user
    if (await User.findOne({ email })) {
      return NextResponse.json({ error: 'Email already registered' }, { status: 409 });
    }
    if (await User.findOne({ phone })) {
      return NextResponse.json({ error: 'Mobile number already registered' }, { status: 409 });
    }

    // ✅ Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // ✅ Generate OTP
    const otp = generateOTP();
    const otpExpiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 min

    // ✅ Send OTP
    if (process.env.NODE_ENV === 'development') {
      // 👉 Mock OTP in dev mode
      console.log(`📌 MOCK OTP for ${phone}: ${otp}`);
    } else {
      // 👉 Real SMS in production
      try {
        await axios.post(
          'https://api.phone.email/v1/send',
          {
            to: phone,
            message: `Your verification code is ${otp}`
          },
          {
            headers: {
              'Content-Type': 'application/json',
              'X-Client-Id': process.env.PHONE_EMAIL_CLIENT_ID,
              'X-Api-Key': process.env.PHONE_EMAIL_API_KEY
            },
            timeout: 10000
          }
        );
      } catch (err) {
        console.error('[OTP Error]', err.message);
        return NextResponse.json({ error: err.message }, { status: 500 });
      }
    }

    // ✅ Create user
    const newUser = await User.create({
      name,
      email,
      phone,
      password: hashedPassword,
      verifyOtp: otp,
      otpExpiresAt,
      isUserVerified: false
    });

    // ✅ Generate temporary token for OTP verification
    const token = generateToken({ _id: newUser._id, email: newUser.email });

    return NextResponse.json({
      message:
        process.env.NODE_ENV === 'development'
          ? 'User registered successfully. Mock OTP logged in console.'
          : 'User registered successfully. OTP sent to mobile.',
      newUser,
      token
    }, { status: 201 });

  } catch (error) {
    console.error('[Signup Error]', error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
