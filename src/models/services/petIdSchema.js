
import mongoose from "mongoose";
import { qrCodeServicesSchema } from "./common/qrCodeServicesSchema";
import { securedServicesPricingDetailsSchema } from "./common/securedServicespricingDetails";

// Sub-schema for Owner Info
const ownerInfoSchema = new mongoose.Schema({
  name: String,
  phone: String,
  email: String,
  address: String,
  mapLink: String
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
