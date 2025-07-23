import mongoose from "mongoose";

const qrCodeServicesSchema = new mongoose.Schema(
  {
   
    qrCodeImage: String,
    scanCount: { type: Number,default: 0 },

    location: {
      latitude: { type: Number, default: null },
      longitude: { type: Number, default: null },
      address: { type: String, default: "" },
    },

    renewalDate: { type: Date, default: null },

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

export  {qrCodeServicesSchema}
