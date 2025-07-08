import { connectDB } from '@/lib/mongoDB';
import { authUser } from '@/middlewares/authMiddleware';
import DiscountModal from '@/models/services/discountSchema';
import { cloudinary } from '@/utils/cloudinary';
import { NextResponse } from 'next/server';


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
      user: {
        id: user._id,
        name: user.name,
      },
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
