// models/services/discountCouponSchema.js

import mongoose from "mongoose";
import { qrCodeServicesSchema } from "./qrCodeServicesSchema";
import { securedServicesPricingDetailsSchema } from "./common/securedServicespricingDetails";

const discountCouponSchema = new mongoose.Schema(
  {
    user: {
          id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
          name: String,
        },
    brandLogo: {
      type: String, // store Cloudinary URL 
    
    },
    nameOfBusiness: {
      type: String,
    
      trim: true,
    },
    code: {
      type: String,

      trim: true,
      uppercase: true,
    },
    couponImage: {
      type: String, // store Cloudinary URL 
    
    },
    bgDesign: { type: String },
    password: {
      type: String,
    },
    qrCodeDetails: qrCodeServicesSchema,
    priceDetails:securedServicesPricingDetailsSchema
  },
  {
    timestamps: true, // adds createdAt and updatedAt
  }
);
 
const DiscountModal = mongoose.models.DiscountCoupon || mongoose.model("DiscountCoupon", discountCouponSchema);

export default DiscountModal
