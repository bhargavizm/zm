// app/api/signup/route.js

import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongoDB';
import User from '@/models/auth/userSchema';
import bcrypt from 'bcryptjs';
import generateToken from '@/utils/token';
import { SignUpValidationSchema } from '@/utils/signUpValidation';


export async function POST(req) {
    try {
        await connectDB();

        const body = await req.json();

        // ✅ Zod validation here
        const parsed = SignUpValidationSchema.safeParse(body);
        if (!parsed.success) {
            const errorMessages = parsed.error.errors.map(err => err.message);
            return NextResponse.json({ error: errorMessages.join(', ') }, { status: 400 });
        }

        const { email, phone, password, confirmPassword } = parsed.data;
        const { name } = body; // ← extract name manually

        const existingUser = await User.findOne({ email: email });
        if (existingUser) {
            return NextResponse.json({ error: 'User already exists' }, { status: 409 });
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        const newUser = await User.create({
            name,
            email: email,
            phone,
            password: hashedPassword,
        });

        const token = generateToken({ _id: newUser._id, email: newUser.email });

        return NextResponse.json({
            message: 'User registered successfully',
            user: {
                id: newUser._id,
                name: newUser.name,
                email: newUser.email,
                phone: newUser.phone,
            },
            token,
        }, { status: 201 });

    } catch (error) {
        console.error('[Signup Error]', error.message);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
