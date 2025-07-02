import mongoose from "mongoose";

const businessShopSchema = new mongoose.Schema(
  {
    shopName: {
      type: String,
      trim: true,
    },
    category: {
      type: String,
      trim: true,
    },
    ownerName: {
      type: String,
      trim: true,
    },
    contactNumber: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
    },
    address: {
      street: String,
      city: String,
      state: String,
      pincode: String,
      country: {
        type: String,
        default: "India",
      },
    },
    website: {
      type: String,
      trim: true,
    },
    shopLogo: {
      type: String, // Cloudinary URL or image link
    },
    password: {
      type: String, // Optional password for protected data
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { collection: "businessShops" }
);

const BusinessShopModal = mongoose.models.BusinessShop || mongoose.model("BusinessShop", businessShopSchema);

export default BusinessShopModal
