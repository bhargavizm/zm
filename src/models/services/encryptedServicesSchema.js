// 🔸 models/qrServices.js
import mongoose from "mongoose";
import { qrCodeServicesSchema } from "./common/qrCodeServicesSchema";
import { encryptedServicesPricingDetailsSchema } from "./common/encryptedServicesPricingDetailsSchema";

// ✅ Reusable File Schema
const fileItemSchema = new mongoose.Schema(
  {
    url: { type: String, required: true },
    name: { type: String },
  },
  { _id: false }
);

// ✅ Common Fields Schema
const commonFieldsSchema = {
  user: {
    id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    name: String,
  },
  title: String,
  description: String,
  password: String,
  bgDesign: String,
  files: [fileItemSchema], // same for all
  qrCodeDetails: qrCodeServicesSchema,
  priceDetails: encryptedServicesPricingDetailsSchema,
};

// 🔹 Service Schemas (all identical structure)
const audioSchema = new mongoose.Schema({ ...commonFieldsSchema }, { timestamps: true });
const pdfSchema = new mongoose.Schema({ ...commonFieldsSchema }, { timestamps: true });
const videoSchema = new mongoose.Schema({ ...commonFieldsSchema }, { timestamps: true });
const gallerySchema = new mongoose.Schema({ ...commonFieldsSchema }, { timestamps: true });

// ✅ Export Models (separate collections)
export const AudioServiceModel =
  mongoose.models.AudioService || mongoose.model("AudioService", audioSchema);

export const PDFServiceModel =
  mongoose.models.PDFService || mongoose.model("PDFService", pdfSchema);

export const VideoServiceModel =
  mongoose.models.VideoService || mongoose.model("VideoService", videoSchema);

export const GalleryServiceModel =
  mongoose.models.GalleryService || mongoose.model("GalleryService", gallerySchema);