import mongoose from "mongoose";
import { qrCodeServicesSchema } from "./qrCodeServicesSchema";

const businessShopSchema = new mongoose.Schema(
  {
    user: {
      id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
      name: String,
    },
    businessName: { type: String },
    businessType: String,
    description: String,
    shopTimings: String,
    shopLogo: String,
    shopImages: [String],
    discount: String,
    password: String,
    bgDesign: String,
    selectedTemplate: String,
    contact: {
      ownerName: String,
      phone: String,
      altPhone: String,
      email: String,
      address: String,
    },

    qrCodeDetails: qrCodeServicesSchema,
  },
  {
    timestamps: true,
  }
);

const BusinessShopModal =
  mongoose.models.BusinessShop ||
  mongoose.model("BusinessShop", businessShopSchema);

export default BusinessShopModal;
