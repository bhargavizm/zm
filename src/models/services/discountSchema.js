// models/services/discountCouponSchema.js

import mongoose from "mongoose";

const discountCouponSchema = new mongoose.Schema(
  {
    user: {
          id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
          name: String,
        },
    brandLogo: {
      type: String, // store Cloudinary URL or base64-encoded string
      required: false,
    },
    nameOfBusiness: {
      type: String,
      required: true,
      trim: true,
    },
    code: {
      type: String,
      required: true,
      trim: true,
      uppercase: true,
    },
    couponImage: {
      type: String, // store Cloudinary URL or base64-encoded string
      required: false,
    },
    password: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true, // adds createdAt and updatedAt
  }
);

const DiscountModal = mongoose.models.DiscountCoupon || mongoose.model("DiscountCoupon", discountCouponSchema);

export default DiscountModal
