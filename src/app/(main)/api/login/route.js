import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongoDB';
import User from '@/models/auth/userSchema';
import bcrypt from 'bcryptjs';
import generateToken from '@/utils/token'; // Should return JWT string

export async function POST(req) {
  try {
    await connectDB();

    const body = await req.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password are required' }, { status: 400 });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
    }

    // ✅ Backfill welcome-offer fields if missing
    if (!user.firstLoginDate) {
      user.firstLoginDate = new Date();
      user.offerExpiryDate = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000); // 30 days later
      await user.save();
    }

    const token = generateToken({ _id: user._id, email: user.email });

    // ✅ Create the response with token in body
    const response = NextResponse.json({
      message: 'Login successful',
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

    // ✅ Set the token as an HTTP-only cookie
    response.cookies.set('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24, // 1 day
    });

    return response;
  } catch (error) {
    console.error('[Login Error]', error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}