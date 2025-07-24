// models/shortLinkSchema.js
import mongoose from "mongoose";

const shortLinkSchema = new mongoose.Schema({
  code: { type: String, required: true, unique: true },
  fullUrl: { type: String, required: true },
});

export default mongoose.models.ShortLink || mongoose.model("ShortLink", shortLinkSchema);
