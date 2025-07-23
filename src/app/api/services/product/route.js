// app/api/services/product/route.js

import { connectDB } from "@/lib/mongoDB";
import { authUser } from "@/middlewares/authMiddleware";
import ProductModal from "@/models/services/productSchema";
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

    // ✅ Parse Request Body
    const body = await req.json();
    const {
      productLogo,
      brandName,
      email,
      phone,
      address,
      password = "", // Optional QR code password
      selectedTemplate,
      items = [],
      location = {}, // Optional location object
      renewalDate = null,
      status = "active",
    } = body;

    // ✅ Debug log — helps you confirm incoming data
    console.log("📦 Received Body:", body);

    // ✅ Connect to MongoDB
    await connectDB();

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
      items,
      scanCount: 0,

      // ✅ Defensive defaulting
      location: {
        latitude: location.latitude ?? null,
        longitude: location.longitude ?? null,
        address: location.address ?? "",
      },
      renewalDate,
      status,
      resetPasswordToken: null,
      resetPasswordExpires: null,
    });

    await product.save();

    return NextResponse.json(
      {
        message: "Product saved successfully!",
        productId: product._id,
      },
      {
        status: 201,
        headers: { "Content-Type": "application/json" },
      }
    );

  } catch (error) {
    console.error("❌ Error in POST /api/services/product:", error);
    return new Response(
      JSON.stringify({ error: "Internal Server Error" }),
      { status: 500 }
    );
  }
}
