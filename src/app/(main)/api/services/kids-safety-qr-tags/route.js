import { NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';
import { connectDB } from '@/lib/mongoDB';
import KidsSafetyModal from '@/models/services/kidSafetySchema';
import { authUser } from '@/middlewares/authMiddleware';
import streamifier from 'streamifier';
import { getShortenedUrl } from '@/utils/shortenUrl';
import bcrypt from 'bcryptjs';

// Cloudinary Config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

// Upload Helper
const uploadImageToCloudinary = (file) => {
  return new Promise(async (resolve, reject) => {
    const buffer = Buffer.from(await file.arrayBuffer());
    const stream = cloudinary.uploader.upload_stream(
      {
        folder: 'kids-safety',
        resource_type: 'image',
      },
      (error, result) => {
        if (error) reject(error);
        else resolve({ url: result.secure_url, name: file.name });
      }
    );
    streamifier.createReadStream(buffer).pipe(stream);
  });
};

// Dot notation object builder
function setNestedValue(obj, path, value) {
  const keys = path.split('.');
  let current = obj;
  keys.forEach((key, index) => {
    if (index === keys.length - 1) {
      current[key] = value;
    } else {
      if (!current[key]) current[key] = {};
      current = current[key];
    }
  });
}

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

    // Convert form fields to nested structure
    for (const [key, value] of formData.entries()) {
      if (key !== 'kidsImage' && !key.startsWith('qrCodeDetails.')) {
        setNestedValue(data, key, value);
      }
    }

    // ✅ Add bgDesign to root level
    data.bgDesign = formData.get("bgDesign");

    // ✅ Explicitly build qrCodeDetails object
    data.qrCodeDetails = {
      qrCodeImage: formData.get("qrCodeDetails.qrCodeImage")?.toString() || "",
      scanCount: 0,
      location: {
        latitude: parseFloat(formData.get("qrCodeDetails.location.latitude") || "0"),
        longitude: parseFloat(formData.get("qrCodeDetails.location.longitude") || "0"),
        address: formData.get("qrCodeDetails.location.address") || "",
      },
      renewalDate: formData.get("qrCodeDetails.renewalDate")
        ? new Date(formData.get("qrCodeDetails.renewalDate"))
        : null,
      status: formData.get("qrCodeDetails.status") || "active",
      resetPasswordToken: null,
      resetPasswordExpires: null,
      password: formData.get("qrCodeDetails.password") || null,
    };

    // ✅ Parse dob
    if (data.dob) data.dob = new Date(data.dob);

    // ✅ Parse altContact
    if (data.altContact) {
      try {
        const parsed = JSON.parse(data.altContact);
        data.altContact = Array.isArray(parsed) ? parsed : [parsed];
      } catch {
        data.altContact = [data.altContact];
      }
    }

    // ✅ Upload image(s)
    const uploadedImages = [];
    let totalSize = 0;
    for (const file of files) {
      if (!file.type.startsWith('image/')) continue;
      totalSize += file.size;
      if (totalSize > 30 * 1024 * 1024) {
        return NextResponse.json({ message: `Upload size exceeds 30MB limit.` }, { status: 400 });
      }
      const uploaded = await uploadImageToCloudinary(file);
      uploadedImages.push(uploaded);
    }

    data.kidsImage = uploadedImages;

    // ✅ Add user info
    data.user = {
      id: user._id,
      name: user.name || user.email,
    };

    // ✅ Hash password if provided
    if (data?.password) {
      const salt = await bcrypt.genSalt(10);
      data.password = await bcrypt.hash(data.password, salt);
    } else {
      delete data.password;
    }

    // ✅ Remove empty/undefined/null fields
    for (const key in data) {
      if (
        data[key] === undefined ||
        data[key] === null ||
        data[key] === '' ||
        data[key] === 'undefined'
      ) {
        delete data[key];
      }
    }

    // ✅ Save to DB
    const saved = await KidsSafetyModal.create(data);

    // ✅ Generate short QR URL
    const qrUrl = await getShortenedUrl(`/kids-safety-qr-tags/${saved._id}`);

    return NextResponse.json(
      {
        success: true,
        message: 'Data saved successfully',
        data: saved,
        qrUrl,
      },
      { status: 200 }
    );

  } catch (err) {
    console.error('POST Error:', err);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
