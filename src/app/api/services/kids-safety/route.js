import { NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';
import { connectDB } from '@/lib/mongoDB';
import KidsSafetyModal from '@/models/services/kidSafetySchema';
import { authUser } from '@/middlewares/authMiddleware';
import streamifier from 'streamifier';

// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true,
});

// Upload helper
const uploadImageToCloudinary = (file) => {
    return new Promise(async (resolve, reject) => {
        const buffer = Buffer.from(await file.arrayBuffer());

        const stream = cloudinary.uploader.upload_stream(
            {
                folder: 'kids-safety',
                resource_type: 'image',
            },
            (error, result) => {
                if (error) {
                    reject(error);
                } else {
                    resolve({
                        url: result.secure_url,
                        name: file.name,
                    });
                }
            }
        );

        streamifier.createReadStream(buffer).pipe(stream);
    });
};

export async function POST(req) {
    try {
        const auth = await authUser(req);
        if (auth.status !== 200) {
            return NextResponse.json(auth.json, { status: auth.status });
        }

        await connectDB();
        const user = auth.user;
        const formData = await req.formData();
        const files = formData.getAll('kidsImage');

        const data = {};

        // Extract all fields except images
        for (const [key, value] of formData.entries()) {
            if (key !== 'kidsImage') {
                data[key] = value;
            }
        }

        // Handle parsing of JSON/Array fields
        if (data.altContact) {
            try {
                const parsed = JSON.parse(data.altContact);
                data.altContact = Array.isArray(parsed) ? parsed : [parsed];
            } catch {
                data.altContact = [data.altContact];
            }
        }

        if (data.dob) {
            data.dob = new Date(data.dob);
        }

        // Validate and Upload Images
        const maxFileSize = 2 * 1024 * 1024;
        const maxTotalSize = 30 * 1024 * 1024;

        let totalSize = 0;
        const validImages = [];

        for (const file of files) {
            if (!file.type.startsWith('image/')) {
                return NextResponse.json(
                    { message: `Invalid file type: ${file.name}` },
                    { status: 400 }
                );
            }

            if (file.size > maxFileSize) {
                return NextResponse.json(
                    { message: `${file.name} exceeds 2MB limit.` },
                    { status: 400 }
                );
            }

            totalSize += file.size;
            if (totalSize > maxTotalSize) {
                return NextResponse.json(
                    { message: `Total upload size exceeds 30MB.` },
                    { status: 400 }
                );
            }

            validImages.push(file);
        }

        const uploadedImages = [];
        for (const file of validImages) {
            try {
                const uploaded = await uploadImageToCloudinary(file);
                uploadedImages.push(uploaded);
            } catch (err) {
                return NextResponse.json(
                    { message: `Failed to upload ${file.name}`, error: err.message },
                    { status: 500 }
                );
            }
        }

        data.kidsImage = uploadedImages;
        data.user = {
            id: user._id,
            name: user.name || user.email,
        };

        // Remove undefined or empty fields
        for (const key in data) {
            if (!data[key] || data[key] === 'undefined') {
                delete data[key];
            }
        }

        const existing = await KidsSafetyModal.findOne({ 'user.id': user._id }).sort({ createdAt: -1 });
        const saved = existing
            ? await KidsSafetyModal.findByIdAndUpdate(existing._id, { $set: data }, { new: true, runValidators: true })
            : await KidsSafetyModal.create(data);

        return NextResponse.json({ success: true, data: saved }, { status: 200 });
    } catch (err) {
        console.error('POST Error:', err);
        return NextResponse.json({ success: false, error: err.message }, { status: 500 });
    }
}
