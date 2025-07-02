import mongoose from "mongoose";

const smsMessageSchema = new mongoose.Schema({
  genderName: {
    type: String,
    trim: true,
  },
  messageType: {
    type: String,
    trim: true,
  },
  textMessage: {
    type: String,
    trim: true,
  },
  password: {
    type: String,
  },
}, { timestamps: true });

const SmsModal = mongoose.models.SmsMessage || mongoose.model("SmsMessage", smsMessageSchema)

export default SmsModal
