import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    phone: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    verifyOtp: { type: String },
    isUserVerified: { type: Boolean, default: false },
    firstLoginDate: { type: Date, default: null },
    offerExpiryDate: { type: Date, default: null },
    freePlansUsed: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const User = mongoose.models.User || mongoose.model("User", userSchema);
export default User;
