// app/api/services/product/route.js

import { connectDB } from "@/lib/mongoDB";
import { authUser } from "@/middlewares/authMiddleware";
import ProductModal from "@/models/services/productSchema";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    // ✅ Step 1: Authenticate User
    const auth = await authUser(req);
    if (auth.status !== 200) {
      return new Response(JSON.stringify(auth.json), {
        status: auth.status,
        headers: { "Content-Type": "application/json" },
      });
    }

    const user = auth.user;

    // ✅ Step 2: Parse Request Body
    const body = await req.json();
    const {
      productLogo,  // ✅ Corrected to match schema
      brandName,
      email,
      phone,
      address,
      password,
      selectedTemplate,
      items = [] // array of { image, heading, description, pageUrl, videoUrl }
    } = body;

    await connectDB();

    // ✅ Step 3: Create New Product Document
    const product = new ProductModal({
      user: {
        id: user._id,
        name: user.name,
      },
      productLogo, // ✅ matches schema
      brandName,
      email,
      phone,
      address,
      password,
      selectedTemplate,
      items,
    });

    await product.save();

    // ✅ Step 4: Respond
    return NextResponse.json(
      { message: "Product saved successfully!" },
      {
        status: 201,
        headers: { "Content-Type": "application/json" },
      }
    );

  } catch (error) {
    console.error("Error in POST /api/services/product:", error);
    return new Response(
      JSON.stringify({ error: "Internal Server Error" }),
      { status: 500 }
    );
  }
}
