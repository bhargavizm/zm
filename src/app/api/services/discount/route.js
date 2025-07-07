import { connectDB } from '@/lib/mongoDB';
import DiscountModal from '@/models/services/discountSchema';
import { NextResponse } from 'next/server';
import cloudinary from '@/utils/cloudinary';

export async function POST(req) {
  try {
    await connectDB();
    const body = await req.json();
    const { nameOfBusiness, code, brandLogo, couponImage, password } = body;

    if (!nameOfBusiness || !code) {
      return NextResponse.json({
        success: false,
        message: 'Missing required fields: nameOfBusiness, code',
      }, { status: 400 });
    }

    // Upload to Cloudinary
    const uploadImage = async (base64, folder) => {
      if (!base64) return null;
      const uploaded = await cloudinary.uploader.upload(base64, {
        folder: `discount-coupons/${folder}`,
      });
      return uploaded.secure_url;
    };

    const brandLogoUrl = await uploadImage(brandLogo, 'brandLogos');
    const couponImageUrl = await uploadImage(couponImage, 'couponImages');

    const newCoupon = new DiscountModal({
      nameOfBusiness,
      code,
      brandLogo: brandLogoUrl,
      couponImage: couponImageUrl,
      password,
    });

    await newCoupon.save();

    return NextResponse.json({
      success: true,
      message: 'Coupon saved',
      data: newCoupon,
    }, { status: 201 });

  } catch (err) {
    console.error('Error saving coupon:', err);
    return NextResponse.json({
      success: false,
      message: 'Server error',
    }, { status: 500 });
  }
}
