import mongoose from "mongoose";
import { qrCodeServicesSchema } from "./qrCodeServicesSchema";

const businessShopSchema = new mongoose.Schema(
  {
    user: {
      id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
      name: String,
    },
    businessInfo: {
      general: {
        businessName: { type: String },
        businessType: String,
        description: String,
        shopTimings: String,
        discount: String,
      },
      contact: {
        phone: String,
        altPhone: String,
        email: String,
        address: String,
      },
      password: String,
      bgDesign: {
        type: String,
      },
      selectedTemplate: {
        type: String,
      },

      media: {
        logo: String,
        galleryImages: [String],
      },

      qrCodeDetails: qrCodeServicesSchema,
    },
  },
  {
    timestamps: true,
  }
);

const BusinessShopModal =
  mongoose.models.BusinessShop ||
  mongoose.model("BusinessShop", businessShopSchema);

export default BusinessShopModal;
