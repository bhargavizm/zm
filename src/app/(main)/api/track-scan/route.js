import { connectDB } from "@/lib/mongoDB";
import ShortLink from "@/models/shortLinkSchema";

export async function POST(req) {
  try {
    await connectDB();
    const body = await req.json();
    const { code, lat, lon, accuracy } = body;

    const scannedAt = new Date();
    let city = "",
      region = "",
      country = "",
      area = "",
      ip = "";

    if (lat && lon) {
      // 🌍 Reverse geocode GPS with BigDataCloud
      try {
        const res = await fetch(
          `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=en`
        );
        const data = await res.json();

        city = data.city || "";
        region = data.principalSubdivision || "";
        country = data.countryName || "";

        // ✅ extract area details (neighbourhood, suburb, locality etc.)
        const locality = data.locality || "";
        const subLocality =
          data.localityInfo?.administrative?.[0]?.name || "";
        const neighbourhood =
          data.localityInfo?.informative?.[0]?.name || "";

        area = [neighbourhood, subLocality, locality]
          .filter(Boolean)
          .join(", ");
      } catch (err) {
        console.error("Reverse geocode failed:", err);
      }
    } else {
      // 📌 Fallback: IP geolocation
      ip =
        req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
        "8.8.8.8";
      try {
        const res = await fetch(`https://ipwho.is/${ip}`);
        const data = await res.json();
        city = data.city || "";
        region = data.region || "";
        country = data.country || "";
        area = data.district || ""; // ipwho.is sometimes gives district
      } catch (err) {
        console.error("IP lookup failed:", err);
      }
    }

    // Save scan entry
    await ShortLink.updateOne(
      { code },
      {
        $push: {
          scanHistory: {
            lat: lat || null,
            lon: lon || null,
            accuracy: accuracy || null,
            ip,
            city,
            region,
            country,
            area,
            scannedAt,
            source: lat && lon ? "gps" : "ip",
          },
        },
        $set: {
          lastScanLocation: { lat, lon, city, region, country, area },
          lastScannedAt: scannedAt,
        },
        $inc: { scanCount: 1 },
      }
    );

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
    });
  } catch (err) {
    console.error("Track-scan API error:", err);
    return new Response(JSON.stringify({ success: false }), {
      status: 500,
    });
  }
}
