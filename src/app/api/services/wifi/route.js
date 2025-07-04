// // app/api/wifi/route.js
// import { NextResponse } from "next/server";
// import { connectDB } from "@/lib/mongoDB";
// import WifiModel from "@/models/services/wifiSchema";

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


import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongoDB";
import WifiModel from "@/models/services/wifiSchema";

export async function POST(req) {
    try {
        const body = await req.json();
        const { ssid, security, password } = body;

        if (!ssid || !security) {
            return NextResponse.json(
                { error: "SSID and security are required." },
                { status: 400 }
            );
        }

        if (security !== "nopass" && (!password || password.length < 4)) {
            return NextResponse.json(
                { error: "Password must be at least 4 characters." },
                { status: 400 }
            );
        }

        await connectDB();
        const wifi = new WifiModel({
            ssid,
            security,
            password: security === "nopass" ? "" : password,
        });
        await wifi.save();

        return NextResponse.json(
            { message: "WiFi saved successfully!" },
            { status: 201 }
        );
    } catch (error) {
        return NextResponse.json(
            { error: "Failed to save WiFi." },
            { status: 500 }
        );
    }
}
