// models/services/productSchema.js

import mongoose from "mongoose";
import { qrCodeServicesSchema } from "./qrCodeServicesSchema";

const productSchema = new mongoose.Schema(
  {
    user: {
      id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
      name: { type: String, required: true },
    },
    productLogo: String,
    brandName: String,
    email: String,
    phone: String,
    address: String,
    password: String,
    selectedTemplate: Number,
    items: [
      {
        image: String,
        heading: String,
        description: String,
        pageUrl: String,
        videoUrl: String,
      },
    ],
    qrCodeDetails: qrCodeServicesSchema
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Product || mongoose.model("Product", productSchema);
