// models/services/discountCouponSchema.js

import mongoose from "mongoose";
import { qrCodeServicesSchema } from "./qrCodeServicesSchema";

const discountCouponSchema = new mongoose.Schema(
  {
    user: {
          id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
          name: String,
        },
    brandLogo: {
      type: String, // store Cloudinary URL or base64-encoded string
    
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
      type: String, // store Cloudinary URL or base64-encoded string
    
    },
    password: {
      type: String,
    },
    qrCodeDetails: qrCodeServicesSchema
  },
  {
    timestamps: true, // adds createdAt and updatedAt
  }
);

const DiscountModal = mongoose.models.DiscountCoupon || mongoose.model("DiscountCoupon", discountCouponSchema);

export default DiscountModal
