// cron/updateExpiredServices.js
import { connectDB } from "@/lib/mongoDB";
import serviceModelMap from "../allServiceModels";

export default async function checkValidityStatus() {
  const now = new Date();
  await connectDB();

  for (const model of Object.values(serviceModelMap)) {
    // 1️⃣ Expire services whose renewalDate has passed
    await model.updateMany(
      {
        "priceDetails.paymentStatus": "success",
        "priceDetails.renewalDate": { $lt: now },
        "qrCodeDetails.qrCodeStatus": { $ne: "expired" },
      },
      {
        $set: {
          "priceDetails.status": "expired",
          "qrCodeDetails.qrCodeStatus": "expired",
        },
      }
    );

    // 2️⃣ Mark inactive if payment failed
    await model.updateMany(
      {
        "priceDetails.paymentStatus": "failed",
        "qrCodeDetails.qrCodeStatus": { $ne: "inactive" },
      },
      {
        $set: {
          "priceDetails.status": "inactive",
          "qrCodeDetails.qrCodeStatus": "inactive",
        },
      }
    );

    // 3️⃣ Keep pending unpaid services inactive
    await model.updateMany(
      {
        "priceDetails.paymentStatus": "pending",
        "qrCodeDetails.qrCodeStatus": { $ne: "inactive" },
      },
      {
        $set: {
          "priceDetails.status": "inactive",
          "qrCodeDetails.qrCodeStatus": "inactive",
        },
      }
    );

    // 4️⃣ Ensure active services are correctly marked
    await model.updateMany(
      {
        "priceDetails.paymentStatus": "success",
        "priceDetails.renewalDate": { $gte: now },
        "qrCodeDetails.qrCodeStatus": { $ne: "active" },
      },
      {
        $set: {
          "priceDetails.status": "active",
          "qrCodeDetails.qrCodeStatus": "active",
        },
      }
    );
  }

  console.log("✅ QR statuses synced at", now.toISOString());
}
