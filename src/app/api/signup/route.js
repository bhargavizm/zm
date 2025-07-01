// import { NextResponse } from 'next/server';
// import jwt from 'jsonwebtoken';
// import { connectDB } from '@/lib/mongoDB';
// import { UserModel } from '@/models/auth/userSchema';

// export async function POST(req) {
//     await connectDB();

//     try {
//         const { name, email, phone, password, cpassword } = await req.json();

//         // Validation checks
//         if (!name || !email || !phone || !password || !cpassword) {
//             return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
//         }

//         if (password !== cpassword) {
//             return NextResponse.json({ error: 'Passwords do not match' }, { status: 400 });
//         }

//         // Check if user already exists
//         const existingUser = await UserModel.findOne({ email });
//         if (existingUser) {
//             return NextResponse.json({ error: 'Email already registered' }, { status: 409 });
//         }

//         // Create and save new user
//         const newUser = new UserModel({ name, email, phone, password });
//         await newUser.save();

//         // Optional: Create a JWT token (if you want to auto-login or verify email)
//         const token = jwt.sign(
//             { id: newUser._id, email: newUser.email },
//             process.env.JWT_SECRET || 'your_jwt_secret', // use env var in production
//             { expiresIn: '7d' }
//         );

//         return NextResponse.json({
//             message: 'Signup successful',
//             token,
//             user: {
//                 id: newUser._id,
//                 name: newUser.name,
//                 email: newUser.email,
//                 phone: newUser.phone,
//             },
//         }, { status: 201 });
//     } catch (error) {
//         console.error('Signup error:', error);
//         return NextResponse.json({ error: 'Server error during signup' }, { status: 500 });
//     }
// }


import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { connectDB } from '@/lib/mongoDB';
import { UserModel } from '@/models/auth/userSchema';

export async function POST(req) {
    await connectDB();

    try {
        const { name, email, phone, password, cpassword } = await req.json();
        const errors = {};

        // Name validation
        if (!name || name.trim().length < 3) {
            errors.name = 'Name must be at least 3 characters long';
        }

        // Email validation
        if (!email) {
            errors.email = 'Email is required';
        } else if (!/^\S+@\S+\.\S+$/.test(email)) {
            errors.email = 'Invalid email format';
        }

        // Phone validation
        if (!phone) {
            errors.phone = 'Phone number is required';
        } else if (!/^\d{10}$/.test(phone)) {
            errors.phone = 'Phone number must be 10 digits';
        }

        // Password validation
        const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]).{8,}$/;
        if (!password) {
            errors.password = 'Password is required';
        } else if (!passwordRegex.test(password)) {
            errors.password =
                'Password must be at least 8 characters long and include at least one uppercase letter, one digit, and one special character';
        }

        // Confirm password
        if (!cpassword) {
            errors.cpassword = 'Please confirm your password';
        } else if (password !== cpassword) {
            errors.cpassword = 'Passwords do not match';
        }

        if (Object.keys(errors).length > 0) {
            return NextResponse.json({ errors }, { status: 400 });
        }

        // Check if user already exists
        const existingUser = await UserModel.findOne({ email });
        if (existingUser) {
            return NextResponse.json(
                { errors: { email: 'Email already registered' } },
                { status: 409 }
            );
        }

        // Save new user
        const newUser = new UserModel({ name, email, phone, password });
        await newUser.save();

        const token = jwt.sign(
            { id: newUser._id, email: newUser.email },
            process.env.JWT_SECRET || 'your_jwt_secret',
            { expiresIn: '7d' }
        );

        return NextResponse.json(
            {
                message: 'Signup successful',
                token,
                user: {
                    id: newUser._id,
                    name: newUser.name,
                    email: newUser.email,
                    phone: newUser.phone,
                },
            },
            { status: 201 }
        );
    } catch (error) {
        console.error('Signup error:', error);
        return NextResponse.json({ error: 'Server error during signup' }, { status: 500 });
    }
}
