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
    premiumStickerPlan: {
      type: String,
      default: 0, // always ₹99 if premium is selected
    },
    totalAmount: {
      type: Number,
      default: 0, // total amount including premium if any
    },
    // Example: "Basic", "Pro", "Enterprise"
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
  if (this.startDate && this.validityDays) {
    this.endDate = new Date(
      this.startDate.getTime() + this.validityDays * 24 * 60 * 60 * 1000
    );
    this.renewalDate = this.endDate; // auto set renewalDate = expiry
  }
  next();
});

export { encryptedServicesPricingDetailsSchema };
