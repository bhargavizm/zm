import { NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';
import { connectDB } from '@/lib/mongoDB';
import KidsSafetyModal from '@/models/services/kidSafetySchema';

// Cloudinary configuration
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true,
});

// Cloudinary upload helper
async function uploadImageToCloudinary(file) {
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    return new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
            {
                folder: 'kids-safety',
                resource_type: 'auto',
            },
            (error, result) => {
                if (error) {
                    console.error('Cloudinary upload error:', error);
                    reject(error);
                } else {
                    resolve(result.secure_url);
                }
            }
        );
        uploadStream.end(buffer);
    });
}

// POST handler
export async function POST(req) {
    try {
        await connectDB();

        const formData = await req.formData();
        const imageFile = formData.get('kidsImage');
        const data = {};

        // Extract all text fields
        for (const [key, value] of formData.entries()) {
            if (key !== 'kidsImage') {
                data[key] = value;
            }
        }

        // Handle altContact as array
        if (data.altContact) {
            try {
                const parsed = JSON.parse(data.altContact);
                data.altContact = Array.isArray(parsed) ? parsed : [parsed];
            } catch (err) {
                data.altContact = [data.altContact];
            }
        } else {
            data.altContact = [];
        }

        // Convert dob to Date object
        if (data.dob) {
            data.dob = new Date(data.dob);
        }

        // Upload image if exists
        if (imageFile && typeof imageFile.arrayBuffer === 'function') {
            try {
                const imageUrl = await uploadImageToCloudinary(imageFile);
                data.kidsImage = imageUrl;
            } catch (error) {
                return NextResponse.json(
                    { message: 'Image upload failed', error: error.message },
                    { status: 500 }
                );
            }
        }

        // Clean empty/null/undefined
        for (const key in data) {
            if (
                data[key] === '' ||
                data[key] === null ||
                data[key] === 'undefined'
            ) {
                delete data[key];
            }
        }

        // Save to DB (upsert: update existing or create new)
        const existing = await KidsSafetyModal.findOne().sort({ createdAt: -1 });
        let result;

        if (existing) {
            result = await KidsSafetyModal.findByIdAndUpdate(
                existing._id,
                { $set: data },
                { new: true, runValidators: true }
            );
        } else {
            result = await KidsSafetyModal.create(data);
        }

        return NextResponse.json(
            {
                success: true,
                message: 'Kids safety data saved successfully',
                data: result,
            },
            { status: 200 }
        );
    } catch (error) {
        console.error('POST Error:', error);
        return NextResponse.json(
            {
                success: false,
                message: 'Failed to save kids safety data',
                error: error.message,
            },
            { status: 500 }
        );
    }
}

// Optional GET for debug/testing
export async function GET() {
    try {
        await connectDB();
        const latest = await KidsSafetyModal.findOne().sort({ createdAt: -1 });
        if (!latest) {
            return NextResponse.json({ message: 'No data found' }, { status: 404 });
        }
        return NextResponse.json(latest);
    } catch (error) {
        return NextResponse.json(
            { message: 'Error fetching data', error: error.message },
            { status: 500 }
        );
    }
}
