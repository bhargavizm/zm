import { connectDB } from '@/lib/mongoDB';
import { authUser } from '@/middlewares/authMiddleware';
import DiscountModal from '@/models/services/discountSchema';
import { cloudinary } from '@/utils/cloudinary';
import { getShortenedUrl } from '@/utils/shortenUrl';
import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs'

export async function POST(req) {
  try {
    const auth = await authUser(req);

    if (auth.status !== 200) {
      return new Response(JSON.stringify(auth.json), {
        status: auth.status,
        headers: { "Content-Type": "application/json" },
      });
    }

    const user = auth.user;
    await connectDB();

    const formData = await req.formData();

    const nameOfBusiness = formData.get('nameOfBusiness')?.toString() || '';
    const code = formData.get('code')?.toString() || '';
    const password = formData.get('password')?.toString() || '';

    const brandLogoFile = formData.get('brandLogo');
    const couponImageFile = formData.get('couponImage');
    const bgDesign = formData.get("bgDesign");
    // Optional fields
    const items = JSON.parse(formData.get('items') || '[]');
    const location = JSON.parse(formData.get('location') || '{}');
    const renewalDate = formData.get('renewalDate') || null;
    const status = formData.get('status')?.toString() || 'active';
    const qrCodeImage = formData.get('qrCodeImage')?.toString() || '';

    if (
      !nameOfBusiness.trim() &&
      !code.trim() &&
      !password.trim() &&
      !brandLogoFile &&
      !couponImageFile
    ) {
      return NextResponse.json({
        success: false,
        message: 'Please fill at least one field or upload an image.',
      }, { status: 400 });
    }

    const bufferToBase64 = async (file) => {
      if (!file) return null;
      const arrayBuffer = await file.arrayBuffer();
      const base64 = Buffer.from(arrayBuffer).toString('base64');
      const mimeType = file.type;
      return `data:${mimeType};base64,${base64}`;
    };

    const brandLogoBase64 = await bufferToBase64(brandLogoFile);
    const couponImageBase64 = await bufferToBase64(couponImageFile);

    const uploadImage = async (base64, folder) => {
      if (!base64) return null;
      const uploaded = await cloudinary.uploader.upload(base64, {
        folder: `discount-coupons/${folder}`,
      });
      return uploaded.secure_url;
    };

    const brandLogoUrl = await uploadImage(brandLogoBase64, 'brandLogos');
    const couponImageUrl = await uploadImage(couponImageBase64, 'couponImages');
    // ✅ Step 3: Hash the password if provided
            let hashedPassword = "";
            if (password) {
              const salt = await bcrypt.genSalt(10);
              hashedPassword = await bcrypt.hash(password, salt);
            }

    const newCoupon = new DiscountModal({
      user: {
        id: user._id,
        name: user.name,
      },
      nameOfBusiness,
      code,
      brandLogo: brandLogoUrl,
      couponImage: couponImageUrl,
      password: hashedPassword,
      bgDesign,
      qrCodeDetails: {
        qrCodeImage,
        location: {
          latitude: location.latitude ?? null,
          longitude: location.longitude ?? null,
          address: location.address ?? '',
        },
        renewalDate,
        status,
        resetPasswordToken: null,
        resetPasswordExpires: null,
      },
    });

    await newCoupon.save();
    const qrUrl = await getShortenedUrl(`/discounts/${newCoupon._id}`);



    return NextResponse.json({
      success: true,
      message: 'Coupon saved',
      data: newCoupon,
      qrUrl
    }, { status: 201 });

  } catch (err) {
    console.error('Error saving coupon:', err);
    return NextResponse.json({
      success: false,
      message: err.message || 'Internal Server Error',
    }, { status: 500 });
  }
}