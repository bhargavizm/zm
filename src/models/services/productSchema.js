// models/services/productSchema.js

import mongoose from "mongoose";

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
    qrCodeImage: String,
    scanCount: { type: Number, default: 0 },

    // ✅ Add this block for LOCATION
    location: {
      latitude: { type: Number, default: null },
      longitude: { type: Number, default: null },
      address: { type: String, default: "" },
    },

    // ✅ Add this block for RENEWAL DATE
    renewalDate: { type: Date, default: null },

    // ✅ Add this block for STATUS
    status: {
      type: String,
      enum: ["active", "expired", "pending"],
      default: "active",
    },

    resetPasswordToken: { type: String, default: null },
    resetPasswordExpires: { type: Date, default: null },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Product || mongoose.model("Product", productSchema);
