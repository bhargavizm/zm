// import mongoose from "mongoose";

// const smsMessageSchema = new mongoose.Schema({
//   user: {
//          id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
//         name: String,
//       },
//   genderName: {
//     type: String,
//     trim: true,
//   },
//   messageType: {
//     type: String,
//     trim: true,
//   },
//   textMessage: {
//     type: String,
//     trim: true,
//   },
//   password: {
//     type: String,
//   },
// }, { timestamps: true });

// const SmsModal = mongoose.models.SmsMessage || mongoose.model("SmsMessage", smsMessageSchema)

// export default SmsModal

import mongoose from "mongoose";

const smsMessageSchema = new mongoose.Schema(
  {
    user: {
      id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
      name: { type: String, required: true },
    },
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
    scanCount: {
      type: Number,
      default: 0,
    },
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
  { timestamps: true }
);

const SmsModal =
  mongoose.models.SmsMessage || mongoose.model("SmsMessage", smsMessageSchema);

export default SmsModal;
