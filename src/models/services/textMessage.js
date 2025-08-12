// import mongoose from "mongoose";

// const textMessageSchema = new mongoose.Schema(
//   {
//     user: {
//          id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
//         name: String,
//       },
//     sender: {
//       type: String,
//       trim: true,
//     },
//     message: {
//       type: String,
//       trim: true,
//     },
//     password: {
//       type: String,
//     },
//   },
//   {
//     timestamps: true,
//   }
// );

// const TextMessageModal = mongoose.models.TextMessage || mongoose.model("TextMessage", textMessageSchema);

// export default TextMessageModal


import mongoose from "mongoose";
import { qrCodeServicesSchema } from "./qrCodeServicesSchema";
import { securedServicesPricingDetailsSchema } from "./common/securedServicespricingDetails";

const textMessageSchema = new mongoose.Schema(
  {
    user: {
      id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
      name: { type: String, required: true },
    },
    sender: {
      type: String,
      trim: true,
    },
    message: {
      type: String,
      trim: true,
    },
    bgDesign:  {
      type: String,
    },
    password: {
      type: String,
    },
  
    qrCodeDetails: qrCodeServicesSchema,
     priceDetails:securedServicesPricingDetailsSchema

  },
  {
    timestamps: true,
  }
);

const TextMessageModal =
  mongoose.models.TextMessage || mongoose.model("TextMessage", textMessageSchema);

export default TextMessageModal;
