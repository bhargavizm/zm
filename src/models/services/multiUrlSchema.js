import mongoose from "mongoose";
import { qrCodeServicesSchema } from "./qrCodeServicesSchema";

const socialLinksSchema = new mongoose.Schema({
  youtube: { type: String },
  instagram: { type: String },
  twitter: { type: String },
  linkedin: { type: String },
  facebook: { type: String },
  custom: { type: String }
}, { _id: false });

const customLinkSchema = new mongoose.Schema({
  label: { type: String, required: true },
  url: { type: String, required: true }
}, { _id: false });

const multiUrlSchema = new mongoose.Schema({
    user: {
            id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
            name: String,
          },
  
  socialLinks: socialLinksSchema,
  customLinks: [customLinkSchema],
  password: { type: String },
  bgDesign:{type:String},
  qrCodeDetails:qrCodeServicesSchema
}, { timestamps: true });

const MultiUrlModal = mongoose.models.MultiUrl || mongoose.model("MultiUrl", multiUrlSchema)

export default MultiUrlModal
