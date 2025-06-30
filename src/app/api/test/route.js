import { connectDB } from "@/lib/mongoDB";

// app/api/test/route.js
export const dynamic = "force-dynamic";



export async function GET() {
  await connectDB();
  return Response.json({ message: "✅ MongoDB connected!" });
}
