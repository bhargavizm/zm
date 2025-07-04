// app/api/services/product/route.js

import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongoDB";
import ProductModal from "@/models/services/productSchema";

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
    await connectDB();

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

    for (const item of items) {
      if (!item.heading || !item.description) {
        return NextResponse.json(
          { message: "Each product must have a heading and description." },
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

    const newProduct = new ProductModal({
      brandName,
      email,
      phone,
      address,
      password,
      selectedTemplate,
      productLogo,
      items,
    });

    await newProduct.save();

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
