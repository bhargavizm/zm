// app/api/services/product/route.js

import { connectDB } from "@/lib/mongoDB";
import { authUser } from "@/middlewares/authMiddleware";
import ProductModal from "@/models/services/productSchema";
import { getShortenedUrl } from "@/utils/shortenUrl";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    // ✅ Authenticate User
    const auth = await authUser(req);
    if (auth.status !== 200) {
      return new Response(JSON.stringify(auth.json), {
        status: auth.status,
        headers: { "Content-Type": "application/json" },
      });
    }

    const user = auth.user;
    if (!user || !user._id) {
      throw new Error("Invalid authenticated user.");
    }

    // ✅ Parse Request Body
    const body = await req.json();
    const {
      productLogo,
      brandName,
      email,
      phone,
      address,
      password = "",
      selectedTemplate = 0,
      bgDesign = "",
      items = [],
      qrCodeImage = "",
      location = {},
      renewalDate = null,
      status = "active",
    } = body;

    // ✅ Connect to MongoDB
    await connectDB();

    // ✅ Create Product
    const product = new ProductModal({
      user: {
        id: user._id,
        name: user.name,
      },
      productLogo,
      brandName,
      email,
      phone,
      address,
      password,
      selectedTemplate,
      bgDesign,
      items,
      qrCodeDetails: {
        qrCodeImage,
        location: {
          latitude: location.latitude ?? null,
          longitude: location.longitude ?? null,
          address: location.address ?? "",
        },
        renewalDate,
        status,
        resetPasswordToken: null,
        resetPasswordExpires: null,
      },
    });

    // ✅ Save to DB
    await product.save();
    const qrUrl = await getShortenedUrl(`/product-cards/${product._id}`);

    return NextResponse.json(
      {
        message: "Product saved successfully!",
        data: product, 
        qrUrl
      },
      {
        status: 201,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("❌ Error in POST /api/services/product-cards:", error.message, error);
    return new Response(
      JSON.stringify({ error: "Internal Server Error" }),
      { status: 500 }
    );
  }
}
