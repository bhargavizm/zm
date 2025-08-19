import mongoose from "mongoose";

const shortLinkSchema = new mongoose.Schema({
  // userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },

  code: { type: String, required: true, unique: true },
  fullUrl: { type: String, required: true },
  scanCount: { type: Number, default: 0 },
  lastScanLocation: {
      city: { type: String, default: "" },
      region: { type: String, default: "" },
      country: { type: String, default: "" },
      lat: { type: Number, default: null },
      lon: { type: Number, default: null },
    },
  lastScannedAt: { type: Date }, 
  scanHistory: [
    {
      city: { type: String, default: "" },
      region: { type: String, default: "" },
      country: { type: String, default: "" },
      lat: { type: Number, default: null },
      lon: { type: Number, default: null },
      ip: { type: String },
      scannedAt: { type: Date, default: Date.now },
    },
  ],
});

export default mongoose.models.ShortLink || mongoose.model("ShortLink", shortLinkSchema);
