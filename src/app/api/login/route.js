import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongoDB';
import User from '@/models/auth/userSchema';
import bcrypt from 'bcryptjs';
import generateToken from '@/utils/token';

export async function POST(req) {
    try {
        await connectDB();

        const body = await req.json();
        const { email, password } = body;

        // Validate input
        if (!email || !password) {
            return NextResponse.json({ error: 'Email and password are required' }, { status: 400 });
        }

        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
        }

        // Compare passwords
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
        }

        // Generate token
        const token = generateToken({ _id: user._id, email: user.email });

        return NextResponse.json({
            message: 'Login successful',
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                phone: user.phone,
            },
            token,
        }, { status: 200 });

    } catch (error) {
        console.error('[Login Error]', error.message);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
