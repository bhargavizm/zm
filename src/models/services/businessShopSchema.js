import mongoose from "mongoose";

const businessShopSchema = new mongoose.Schema({
  businessInfo: {
    general: {
      businessName: String,
      businessType: String,
      description: String,
      shopTimings: String,
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
});

export default mongoose.models.BusinessShop ||
  mongoose.model("BusinessShop", businessShopSchema);
