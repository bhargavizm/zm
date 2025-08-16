import { connectDB } from "@/lib/mongoDB";
import serviceModelMap from "./allServiceModels";


export async function trackQRCodeScan({ serviceName, serviceId, req }) {
  await connectDB();

  const model = serviceModelMap[serviceName];
  if (!model) {
    throw new Error(`Unknown service: ${serviceName}`);
  }

  const doc = await model.findById(serviceId);
  if (!doc) {
    throw new Error(`Service record not found.`);
  }

  // Get IP address
  let ip =
    req.headers.get("x-forwarded-for")?.split(",")[0] ||
    req.headers.get("x-real-ip") ||
    "";

  const isPrivateIp = (ip) =>
    ip.startsWith("192.") ||
    ip.startsWith("10.") ||
    ip.startsWith("127.") ||
    ip.startsWith("::1") ||
    ip.startsWith("172.");

  if (!ip || isPrivateIp(ip)) {
    ip = "8.8.8.8"; // fallback for testing
  }

  // Get location data
  const locRes = await fetch(`https://ipapi.co/${ip}/json/`);
  const locData = await locRes.json();

  const locationObj = {
    city: locData.city || "",
    region: locData.region || "",
    country: locData.country_name || "",
    lat: locData.latitude || null,
    lon: locData.longitude || null,
  };

  // Update QR code details
  doc.qrCodeDetails.scanCount = (doc.qrCodeDetails.scanCount || 0) + 1;
  doc.qrCodeDetails.lastScanAt = new Date();
  doc.qrCodeDetails.lastScanLocation = locationObj;

  doc.qrCodeDetails.scanHistory.push({
    location: `${locationObj.city}, ${locationObj.country}`,
    scannedAt: new Date(),
  });

  await doc.save();

  return doc.qrCodeDetails;
}
