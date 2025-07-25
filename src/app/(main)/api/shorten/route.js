// app/api/shorten/route.js
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongoDB";
import ShortLink from "@/models/shortLinkSchema";
import { customAlphabet } from "nanoid";

const nanoid = customAlphabet("abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890", 8);

export async function POST(req) {
  await connectDB();
  const { fullUrl } = await req.json();

  const code = nanoid();
  const existing = await ShortLink.findOne({ fullUrl });
  if (existing) {
    return NextResponse.json({ shortUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/r/${existing.code}` });
  }

  await ShortLink.create({ code, fullUrl });
  return NextResponse.json({ shortUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/r/${code}` });
}
