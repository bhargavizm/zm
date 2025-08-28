
import mongoose from "mongoose";
import { qrCodeServicesSchema } from "./common/qrCodeServicesSchema";
import { QRCodeCanvas } from "qrcode.react";
import { securedServicesPricingDetailsSchema } from "./common/securedServicespricingDetails";

const propertySchema = new mongoose.Schema(
  {
     user: {
             id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
            name: String,
          },
    basicInfo: {
      propertyName: String,
      propertyType: String,
      ownerName: String,
      contactNumber: String,
      alternateNumber: String,
      propertyDescription: String,
    },
    addressInfo: {
      address: String,
      mapLink: String,
    },
    pricingInfo: {
      price: String,
      area: String,
      amenities: [String],
    },
    password: String,
    images: {
      galleryImages: [String], // Main image removed
    },
    bgDesign: String,
    qrCodeDetails:qrCodeServicesSchema,
     priceDetails:securedServicesPricingDetailsSchema
  },
  { timestamps: true }
);

export default mongoose.models.Property || mongoose.model("Property", propertySchema);




