// // app/api/wifi/route.js
// import { NextResponse } from "next/server";
// import { connectDB } from "@/lib/mongoDB";
// import WifiModel from "@/models/services/wifiSchema";

// import { connectDB } from "@/lib/mongoDB";

// export async function POST(req) {
//     try {
//         const body = await req.json();
//         const { ssid, security, password } = body;

//         if (!ssid || !security) {
//             return NextResponse.json({ error: "SSID and security are required." }, { status: 400 });
//         }

//         if (security !== "nopass" && (!password || password.length < 4)) {
//             return NextResponse.json({ error: "Password must be at least 4 characters." }, { status: 400 });
//         }

//         await connectDB();
//         const wifi = new WifiModel({ ssid, security, password: security === "nopass" ? "" : password });
//         await wifi.save();

//         return NextResponse.json({ message: "WiFi saved successfully!" }, { status: 201 });
//     } catch (error) {
//         return NextResponse.json({ error: "Failed to save WiFi." }, { status: 500 });
//     }
// }


// import { NextResponse } from "next/server";
// import { connectDB } from "@/lib/mongoDB";
// import WifiModel from "@/models/services/wifiSchema";
// import { authUser } from "@/middlewares/authMiddleware";

// export async function POST(req) {
//     try {
//         // ✅ Step 1: Authenticate User
//         const auth = await authUser(req);
//         if (auth.status !== 200) {
//             return new Response(JSON.stringify(auth.json), {
//                 status: auth.status,
//                 headers: { "Content-Type": "application/json" },
//             });
//         }

//         const user = auth.user;

//         const body = await req.json();
//         const { ssid, security, password, qrPassword } = body;

//         if (!ssid || !security) {
//             return NextResponse.json(
//                 { error: "SSID and security are required." },
//                 { status: 400 }
//             );
//         }

//         if (security !== "nopass" && (!password || password.length < 4)) {
//             return NextResponse.json(
//                 { error: "Password must be at least 4 characters." },
//                 { status: 400 }
//             );
//         }

//         await connectDB();
//         const wifi = new WifiModel({
//             ssid,
//             security,
//             password: security === "nopass" ? "" : password,
//             qrPassword
//         });
//         await wifi.save();

//         return NextResponse.json(
//             { message: "WiFi saved successfully!" },
//             { status: 201 }
//         );
//     } catch (error) {
//         return NextResponse.json(
//             { error: "Failed to save WiFi." },
//             { status: 500 }
//         );
//     }
// }

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
      qrPassword = "",
      bgDesign="",
      location = {},
      renewalDate = null,
      status = "active",
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
        qrCodeImage: body.qrCodeImage ?? "",

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
