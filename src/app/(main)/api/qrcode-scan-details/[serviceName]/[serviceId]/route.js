import serviceModelMap from "@/app/(main)/api/common/allServiceModels";
import { connectDB } from "@/lib/mongoDB";

export async function GET(req, { params }) {
  try {
    const { serviceName, serviceId } = params;

    if (!serviceName || !serviceId) {
      return Response.json(
        { success: false, message: "Missing required details." },
        { status: 400 }
      );
    }

    await connectDB();

    const model = serviceModelMap[serviceName];
    if (!model) {
      return Response.json(
        { success: false, message: `Unknown service: ${serviceName}` },
        { status: 400 }
      );
    }

    const doc = await model.findById(serviceId);
    if (!doc) {
      return Response.json(
        { success: false, message: "Service record not found." },
        { status: 404 }
      );
    }

    let ip =
      req.headers.get("x-forwarded-for")?.split(",")[0] ||
      req.headers.get("x-real-ip") ||
      "";

    function isPrivateIp(ip) {
      return (
        ip.startsWith("192.") ||
        ip.startsWith("10.") ||
        ip.startsWith("127.") ||
        ip.startsWith("::1") ||
        ip.startsWith("172.")
      );
    }

    // fallback for local/dev
    if (!ip || isPrivateIp(ip)) {
      ip = "8.8.8.8"; // test IP (Google DNS)
    }

    const locRes = await fetch(`https://ipapi.co/${ip}/json/`);
    const locData = await locRes.json();

    const locationObj = {
      city: locData.city || "",
      region: locData.region || "",
      country: locData.country_name || "",
      lat: locData.latitude || null,
      lon: locData.longitude || null,
    };

    doc.qrCodeDetails.scanCount = (doc.qrCodeDetails.scanCount || 0) + 1;
    doc.qrCodeDetails.lastScanAt = new Date();
    doc.qrCodeDetails.lastScanLocation = locationObj; // ✅ Corrected path
    doc.qrCodeDetails.scanHistory.push({
      location: `${locationObj.city}, ${locationObj.country}`,
      scannedAt: new Date(),
    });

    await doc.save();

    return Response.json({
      success: true,
      data: doc.qrCodeDetails,
      message: `Scan Count updated for ${serviceName}.`,
    });
  } catch (err) {
    console.error("❌ Error tracking scan:", err);
    return Response.json(
      { success: false, message: "Error tracking scan", err: err.message },
      { status: 500 }
    );
  }
}
