// app/api/services/product/route.js

import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongoDB";
import ProductModal from "@/models/services/productSchema";
import { authUser } from "@/middlewares/authMiddleware";

// Utility to validate URLs
const isValidUrl = (url) => {
  try {
    const parsed = new URL(url);
    return ["http:", "https:"].includes(parsed.protocol);
  } catch {
    return false;
  }
};

export async function POST(req) {
  try {
    // 1. Authenticate the user
    const auth = await authUser(req);
    if (auth.status !== 200) {
      return NextResponse.json(auth.json, { status: auth.status });
    }

    // 2. Connect to MongoDB
    await connectDB();

    // 3. Parse request body
    const body = await req.json();
    const {
      brandName,
      email,
      phone,
      address,
      password,
      selectedTemplate,
      productLogo,
      items,
    } = body;

    // 4. Validate required fields
    if (!brandName || !password) {
      return NextResponse.json(
        { message: "Brand name and password are required." },
        { status: 400 }
      );
    }

    if (!Array.isArray(items) || items.length === 0) {
      return NextResponse.json(
        { message: "At least one product item is required." },
        { status: 400 }
      );
    }

    for (const [index, item] of items.entries()) {
      if (!item.heading || !item.description) {
        return NextResponse.json(
          { message: `Item ${index + 1} must include heading and description.` },
          { status: 400 }
        );
      }

      if (item.pageUrl && !isValidUrl(item.pageUrl)) {
        return NextResponse.json(
          { message: `Invalid page URL: ${item.pageUrl}` },
          { status: 400 }
        );
      }

      if (item.videoUrl && !isValidUrl(item.videoUrl)) {
        return NextResponse.json(
          { message: `Invalid video URL: ${item.videoUrl}` },
          { status: 400 }
        );
      }
    }

    // 5. Create and save the product
    const newProduct = new ProductModal({
      brandName,
      email,
      phone,
      address,
      password,
      selectedTemplate,
      productLogo,
      items,
      user: {
        id: auth.user._id, // Fix: include user ID to satisfy schema validation
      },
    });

    await newProduct.save();

    // 6. Success response
    return NextResponse.json(
      { message: "Product successfully saved." },
      { status: 201 }
    );

  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      { message: "Server error", error: error.message },
      { status: 500 }
    );
  }
}
