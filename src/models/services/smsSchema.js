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
import { qrCodeServicesSchema } from "./qrCodeServicesSchema";

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
    bgDesign:{
      type:String,
    },
    qrCodeDetails:qrCodeServicesSchema
  },
  { timestamps: true }
);

const SmsModal =
  mongoose.models.SmsMessage || mongoose.model("SmsMessage", smsMessageSchema);

export default SmsModal;
