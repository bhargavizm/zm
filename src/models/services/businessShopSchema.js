import mongoose from "mongoose";
import { qrCodeServicesSchema } from "./qrCodeServicesSchema";

const businessShopSchema = new mongoose.Schema({
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
    security: {
      password: String,
    },

    bgDesign: {
    type: String,
  },

    media: {
      logo: String,
      galleryImages: [String],
    },

    qrCodeDetails: qrCodeServicesSchema

  },
  shopTimingsTemplate: {
    selectedTemplate: String,
    template1Data: mongoose.Schema.Types.Mixed,
    template2Data: mongoose.Schema.Types.Mixed,
    template3Data: mongoose.Schema.Types.Mixed,
    template4Data: mongoose.Schema.Types.Mixed,
  },
  qrCodeDetails: qrCodeServicesSchema
}, {
  timestamps: true,
});

const businessShopModal =  mongoose.models.BusinessShop ||
  mongoose.model("BusinessShop", businessShopSchema);


export default businessShopModal