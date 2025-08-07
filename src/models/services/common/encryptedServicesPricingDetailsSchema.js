import mongoose from "mongoose";

const encryptedServicesPricingDetailsSchema = new mongoose.Schema(
  {
    plan: {
      type: String,
      default: "Free",
    },
    price: {
      type: Number,
      default: 0,
    },
    storage: {
      type: Number, // in MB
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
    status: {
      type: String,
      enum: ["active", "inactive", "pending"],
      default: "inactive",
    },
  },
  {
    timestamps: true,
  }
);

// 🔁 Auto-calculate endDate before save
// This part calculates endDate = startDate + 30 days
encryptedServicesPricingDetailsSchema.pre("save", function (next) {
  if (!this.endDate) {
    const start = this.startDate || new Date();
    this.endDate = new Date(
      start.getTime() + this.validityDays * 24 * 60 * 60 * 1000
    );
  }
  next();
});


export { encryptedServicesPricingDetailsSchema };
