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

        const { email, phone, password } = parsed.data;
        const { name } = body; // extract name manually

        // ✅ Check email separately
        const existingEmail = await User.findOne({ email });
        if (existingEmail) {
            return NextResponse.json({ error: 'Email already registered' }, { status: 409 });
        }

        // ✅ Check phone separately
        const existingPhone = await User.findOne({ phone });
        if (existingPhone) {
            return NextResponse.json({ error: 'Mobile number already registered' }, { status: 409 });
        }

        // ✅ Hash password
        const hashedPassword = await bcrypt.hash(password, 12);

        const newUser = await User.create({
            name,
            email,
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
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
