// D:\previous\zm\src\app\api\user\update-profile\route.js
import { NextResponse } from 'next/server';
import User from '@/models/auth/userSchema';
import { connectDB } from '@/lib/mongoDB';
import { authUser } from '@/middlewares/authMiddleware';

export async function PUT(request) {
  try {
    // Authenticate user using your auth middleware
    const auth = await authUser(request);
    if (auth.status !== 200) {
      return NextResponse.json(
        { success: false, message: 'Unauthorized' },
        { status: 401 }
      );
    }

    await connectDB();
    const user = auth.user;

    // Get the request body
    const { name, email, phone } = await request.json();
    
    // Validate input
    if (!name || !email || !phone) {
      return NextResponse.json(
        { success: false, message: 'All fields are required' },
        { status: 400 }
      );
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, message: 'Please provide a valid email address' },
        { status: 400 }
      );
    }

    // Check if email already exists for another user (case-insensitive)
    const existingUserWithEmail = await User.findOne({
      email: { $regex: new RegExp(`^${email}$`, 'i') }, // Case-insensitive match
      _id: { $ne: user._id } // Exclude current user
    });

    if (existingUserWithEmail) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'Email already exists. Please use a different email address.' 
        },
        { status: 400 }
      );
    }

    // Check if phone number already exists for another user
    const existingUserWithPhone = await User.findOne({
      phone: phone,
      _id: { $ne: user._id } // Exclude current user
    });

    if (existingUserWithPhone) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'Phone number already exists. Please use a different phone number.' 
        },
        { status: 400 }
      );
    }

    // Update the user
    const updatedUser = await User.findByIdAndUpdate(
      user._id,
      { 
        name: name.trim(),
        email: email.toLowerCase().trim(), // Store email in lowercase
        phone: phone.trim()
      },
      { 
        new: true, 
        runValidators: true 
      }
    ).select('-password -verifyOtp');

    if (!updatedUser) {
      return NextResponse.json(
        { success: false, message: 'User not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Profile updated successfully',
      user: updatedUser
    });
  } catch (error) {
    console.error('Error updating profile:', error);
    
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(e => e.message);
      return NextResponse.json(
        { success: false, message: 'Validation error', errors: errors.join(', ') },
        { status: 400 }
      );
    }
    
    // Handle duplicate key errors (MongoDB unique constraint)
    if (error.code === 11000) {
      const field = Object.keys(error.keyValue)[0];
      return NextResponse.json(
        { 
          success: false, 
          message: `${field.charAt(0).toUpperCase() + field.slice(1)} already exists. Please use a different ${field}.` 
        },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}