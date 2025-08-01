
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
  const record = await ShortLink.findOne({ code: params.code });

  if (!record) {
    redirect("/not-found");
  }


  let ip = headers().get("x-forwarded-for")?.split(",")[0]?.trim();

  // 🔁 Force a test IP when running on localhost
  if (!ip || ip === "::1" || ip === "127.0.0.1") {
    ip = "8.8.8.8"; // Google's public DNS IP
  }

  // 🌍 Use ipwho.is (much less rate-limited than ipapi.co)
  let location = "Unknown";

  try {
    const res = await fetch(`https://ipwho.is/${ip}`);
    const data = await res.json();
    // console.log("Geo response:", data);

    if (data.success && data.city && data.country) {
      location = `${data.city}, ${data.country}`;
    } else if (data.success && data.country) {
      location = data.country;
    }
  } catch (error) {
    console.error("Geo location fetch failed:", error);
  }


  const utcDate = new Date();
  const istOffsetMinutes = 330; // IST = UTC+5:30
  const istDate = new Date(utcDate.getTime() + istOffsetMinutes * 60000);

  // 3. Update scan count, location, and scan time (in IST)
  await ShortLink.updateOne(
    { code },
    {
      $inc: { scanCount: 1 },
      $set: {
        lastScanLocation: location,
        lastScannedAt: istDate, // Correctly defined now
      },
    }
  );

  // 4. Redirect to the full URL
  redirect(record.fullUrl);
}