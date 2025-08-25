import mongoose from "mongoose";

const encryptedServicesPricingDetailsSchema = new mongoose.Schema(
  {
    plan: {
      type: String,
      default: "Free",
    },
    price: {
      type: String,
      default: 0,
    },
    storage: {
      type: String, // in MB
      default: 1000, // 1 GB = 1000 MB (can be adjusted)
    },
    validityDays: {
      type: Number,
      default: 30,
    },
    startDate: {
      type: Date,
      default: Date.now,
    },
    endDate: {
      type: Date,
    },
    renewalDate: {
      type: Date,
      default: null,
    },
     // 🆕 Payment details (for Razorpay tracking)
    razorpayOrderId: {
      type: String,
     
    },
    razorpayPaymentId: {
      type: String,
     
    },
    razorpaySignature: {
      type: String,
     
    },
    paymentStatus: {
      type: String,
      enum: ["success", "failed", "pending"],
      default: "pending",
    },
    paymentDate: {
      type: Date,
     
    },
    currency: {
      type: String,
      default: "INR",
    },
  },
  {
    timestamps: true,
  }
);

// 🔁 Auto-calculate endDate before save
// This part calculates endDate = startDate + 30 days
encryptedServicesPricingDetailsSchema.pre("save", function (next) {
  // Only calculate endDate if startDate and validityDays exist
  if (!this.endDate && this.startDate && this.validityDays) {
    this.endDate = new Date(
      this.startDate.getTime() + this.validityDays * 24 * 60 * 60 * 1000
    );
  }
  next();
});



export { encryptedServicesPricingDetailsSchema };
