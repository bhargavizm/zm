import mongoose from "mongoose";

const shortLinkSchema = new mongoose.Schema({
  // userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },

  code: { type: String, required: true, unique: true },
  fullUrl: { type: String, required: true },
  scanCount: { type: Number, default: 0 },
  lastScanLocation: { type: String },
  lastScannedAt: { type: Date }, // ✅ Make sure this field name is correct
});

export default mongoose.models.ShortLink || mongoose.model("ShortLink", shortLinkSchema);
