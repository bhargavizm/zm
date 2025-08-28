import mongoose from "mongoose";

const securedServicesPricingDetailsSchema = new mongoose.Schema(
  {
    plan: {
      type: String,
      default: "Free",
    },
    price: {
      type: String,
      default: 0,
    },
    validityDays: {
      type: Number,
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

// 🔁 Auto-calculate endDate & renewalDate before save
securedServicesPricingDetailsSchema.pre("save", function (next) {
  if (this.startDate && this.validityDays) {
    // Calculate end date
    if (!this.endDate) {
      this.endDate = new Date(
        this.startDate.getTime() + this.validityDays * 24 * 60 * 60 * 1000
      );
    }

    // Calculate renewal date (same as endDate or maybe 1 day after)
    if (!this.renewalDate) {
      this.renewalDate = new Date(this.endDate.getTime() + 24 * 60 * 60 * 1000); 
      // ↑ Adds 1 extra day after end date for renewal
    }
  }
  next();
});

export { securedServicesPricingDetailsSchema };
