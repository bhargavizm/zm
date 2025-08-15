import mongoose from "mongoose";

const qrCodeServicesSchema = new mongoose.Schema(
  {
    qrCodeImage: String,
    scanCount: { type: Number, default: 0 },
    lastScanAt: { type: Date },
    scanHistory: [
      {
        location: String,
        scannedAt: Date,
      },
    ],
    lastScanLocation: {
      city: { type: String, default: "" },
      region: { type: String, default: "" },
      country: { type: String, default: "" },
      lat: { type: Number, default: null },
      lon: { type: Number, default: null },
    },

    qrCodeStatus: {
      type: String,
      enum: ["active", "inactive"],
      default: "inactive",
    },
  },
  {
    timestamps: true,
  }
);

export { qrCodeServicesSchema };
