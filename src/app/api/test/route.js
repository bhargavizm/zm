import { connectDB } from "@/lib/mongoDB";

export const dynamic = "force-dynamic";



export async function GET() {
  await connectDB();
  return Response.json({ message: "✅ MongoDB connected!" });
}
