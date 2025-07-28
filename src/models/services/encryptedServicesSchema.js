// 🔸 models/qrServices.js
import mongoose from "mongoose";
import { qrCodeServicesSchema } from "./qrCodeServicesSchema";


export const commonFieldsSchema = {
  user: {
    id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    name: String,
  },
  title: String,
  description: String,
  password: String,
  bgDesign: String,
   qrCodeDetails: qrCodeServicesSchema
};


// 🔹 File sub-schema for Audio/PDF
const fileItemSchema = new mongoose.Schema({
  fileData: Buffer, // Optional if using Cloudinary
  fileName: String,
  fileType: String,
 
});

// 🔹 Audio Service
const audioSchema = new mongoose.Schema(
  {
    ...commonFieldsSchema,
    files: [fileItemSchema], // Audio files
  },
  { timestamps: true }
);

// 🔹 PDF Service
const pdfSchema = new mongoose.Schema(
  {
    ...commonFieldsSchema,
    files: [fileItemSchema], // PDF files
  },
  { timestamps: true }
);

// 🔹 Video Service
const videoSchema = new mongoose.Schema(
  {
    ...commonFieldsSchema,
    files: [
      {
        url: String,
        name: String,
      },
    ],
  },
  { timestamps: true }
);

// 🔹 Gallery Service
const gallerySchema = new mongoose.Schema(
  {
    ...commonFieldsSchema,
    files: [
      {
        url: String,
        name: String,
      },
    ],
  },
  { timestamps: true }
);

// ✅ Export models (separate collections)
export const AudioServiceModel =
  mongoose.models.AudioService || mongoose.model("AudioService", audioSchema);

export const PDFServiceModel =
  mongoose.models.PDFService || mongoose.model("PDFService", pdfSchema);

export const VideoServiceModel =
  mongoose.models.VideoService || mongoose.model("VideoService", videoSchema);

export const GalleryServiceModel =
  mongoose.models.GalleryService || mongoose.model("GalleryService", gallerySchema);
