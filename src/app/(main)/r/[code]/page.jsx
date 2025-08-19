
//   let ip = headers().get("x-forwarded-for")?.split(",")[0]?.trim();
// let location = "Unknown";

// try {
//   const res = await fetch(`https://ipwho.is/${ip}`);
//   const data = await res.json();

//   if (data.success && data.city && data.country) {
//     location = `${data.city}, ${data.country}`;
//   } else if (data.success && data.country) {
//     location = data.country;
//   }
// } catch (error) {
//   console.error("Location fetch failed", error);
// }



export const runtime = "nodejs"; // force Node.js runtime

import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { connectDB } from "@/lib/mongoDB";
import ShortLink from "@/models/shortLinkSchema";

export default async function RedirectPage({ params }) {
  const code = params.code;
  await connectDB();
  const record = await ShortLink.findOne({ code });

  if (!record) {
    redirect("/not-found");
  }

  let ip = headers().get("x-forwarded-for")?.split(",")[0]?.trim();

  // 🔁 Force a test IP when running on localhost
  if (!ip || ip === "::1" || ip === "127.0.0.1") {
    ip = "8.8.8.8"; // Google's public DNS IP
  }

  // 🌍 Use ipwho.is (structured location)
  let location = {
    city: "",
    region: "",
    country: "",
    lat: null,
    lon: null,
  };

  try {
    const res = await fetch(`https://ipwho.is/${ip}`);
    const data = await res.json();

    if (data.success) {
      location = {
        city: data.city || "",
        region: data.region || "",
        country: data.country || "",
        lat: data.latitude ?? null,
        lon: data.longitude ?? null,
      };
    }
  } catch (error) {
    console.error("Geo location fetch failed:", error);
  }

  // ⏰ Convert UTC → IST
  const utcDate = new Date();
  const istOffsetMinutes = 330; // IST = UTC+5:30
  const istDate = new Date(utcDate.getTime() + istOffsetMinutes * 60000);

  // 📌 Update scan count, last location, last time AND history
  await ShortLink.updateOne(
    { code },
    {
      $inc: { scanCount: 1 },
      $set: {
        lastScanLocation: location,
        lastScannedAt: istDate,
      },
      $push: {
        scanHistory: {
          ...location,
          ip,
          scannedAt: istDate,
        },
      },
    }
  );

  // 🚀 Redirect to full URL
  redirect(record.fullUrl);
}
