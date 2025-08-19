
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongoDB";
import WifiModel from "@/models/services/wifiSchema";
import { authUser } from "@/middlewares/authMiddleware";
import { getShortenedUrl } from "@/utils/shortenUrl";

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

    // ✅ Parse Body
    const body = await req.json();
    const {
      ssid,
      security,
      password = "",
      qrCodeImage = "",
      bgDesign=""
    } = body;

   
    // if (security !== "nopass" && (!password || password.length < 4)) {
    //   return NextResponse.json(
    //     { error: "Password must be at least 4 characters." },
    //     { status: 400 }
    //   );
    // }

    // ✅ Connect to MongoDB
    await connectDB();

    const wifi = new WifiModel({
      user: {
        id: user._id,
        name: user.name,
      },
      ssid,
      security,
      password: security === "nopass" ? "" : password,
      bgDesign,
     qrCodeDetails: {
    qrCodeImage,
    scanCount: 0,
    lastScanAt: null,
    scanHistory: [
      
    ],
    lastScanLocation: {
      city: "",
      region: "",
      country: "",
      lat: null,
      lon: null,
    },
    qrCodeStatus: "inactive",
  },
    });

    await wifi.save();

     const wifiString = `WIFI:T:${security};S:${ssid};P:${password || ""};;`;

    const qrUrl = wifiString
    

    return NextResponse.json(
      {
        success: true,
        message: "WiFi saved successfully!",
        data:wifi,
        qrUrl,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("❌ Error in POST /api/services/wifi:", error);
    return NextResponse.json(
      { error: error.message || "Failed to save WiFi." },
      { status: 500 }
    );
  }
}
