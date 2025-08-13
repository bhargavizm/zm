// import mongoose from "mongoose";
// import { qrCodeServicesSchema } from "./qrCodeServicesSchema";
// import { string } from "zod";

// // Sub-schema for Owner Info
// const ownerInfoSchema = new mongoose.Schema({
//   name: { type: String },
//   phone: { type: String },
//   email: { type: String },
//   // ⚠️ Consider hashing in production
//   address: { type: String }
// }, { _id: false });

// // Sub-schema for Pet Info
// const petSchema = new mongoose.Schema({
//   name: { type: String },
//   breed: { type: String },
//   color: { type: String }
// }, { _id: false });

// // Sub-schema for QR Code Details
// const qrCodeDetailsSchema = new mongoose.Schema({
//   qrCodeImage: { type: String, default: "" },
//   location: {
//     latitude: { type: Number, default: null },
//     longitude: { type: Number, default: null },
//     address: { type: String, default: "" }
//   },
//   renewalDate: { type: Date, default: null },
//   status: { type: String, default: "active" },
//   resetPasswordToken: { type: String, default: null },
//   resetPasswordExpires: { type: Date, default: null }
// }, { _id: false });

// const petTagSchema = new mongoose.Schema({
//   user: {
//     id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
//     name: { type: String }
//   },
//   mainImage: { type: String },
//   publicId: { type: String },
//   selectedTemplate: { type: String },
//   ownerInfo: ownerInfoSchema,
//   pet: petSchema,
//   password: { type: String },
//   bgDesign:{type:String},
//   qrCodeDetails: qrCodeServicesSchema
// }, { timestamps: true });

// const PetTagModal = mongoose.models.PetTag || mongoose.model("PetTag", petTagSchema);
// export default PetTagModal;


import mongoose from "mongoose";
import { qrCodeServicesSchema } from "./qrCodeServicesSchema";
import { securedServicesPricingDetailsSchema } from "./common/securedServicespricingDetails";

// Sub-schema for Owner Info
const ownerInfoSchema = new mongoose.Schema({
  name: String,
  phone: String,
  email: String,
  address: String
}, { _id: false });

// Sub-schema for Pet Info
const petSchema = new mongoose.Schema({
  name: String,
  breed: String,
  color: String
}, { _id: false });

const petTagSchema = new mongoose.Schema({
  user: {
    id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    name: String,
  },
  mainImage: String,
  publicId: String,
  selectedTemplate: String,
  ownerInfo: ownerInfoSchema,
  pet: petSchema,
  password: String,
  bgDesign: String,
  qrCodeDetails: qrCodeServicesSchema,
  priceDetails:securedServicesPricingDetailsSchema
}, { timestamps: true });

const PetTagModal = mongoose.models.PetTag || mongoose.model("PetTag", petTagSchema);
export default PetTagModal;
