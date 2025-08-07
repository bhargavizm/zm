import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  serviceId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Service", // Optional: Use your actual service model name (e.g., "SmsMessage", "QRCode", etc.)
    required: false,
  },
  orderId: {
    type: String,
    required: true,
    unique: true,
  },
  paymentId: {
    type: String,
    required: true,
    unique: true,
  },
  signature: {
    type: String,
    required: true,
  },
  amount: {
    type: Number, // in paise
    required: true,
  },
  currency: {
    type: String,
    default: "INR",
  },
  status: {
    type: String,
    enum: ["success", "failed", "pending", "refunded"],
    default: "success",
  },
}, { timestamps: true });

const paymentModal = mongoose.models.Payment || mongoose.model("Payment", paymentSchema);

export default paymentModal
