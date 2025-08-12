// models/services/resumeSchema.js

import mongoose from "mongoose"; // ✅ REQUIRED
import { qrCodeServicesSchema } from "./qrCodeServicesSchema";
import { securedServicesPricingDetailsSchema } from "./common/securedServicespricingDetails";


const resumeSchema = new mongoose.Schema(
  {
    user: {
      id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
      name: String,
    },

    resumeFiles: [
      {
        fileName: String,
        fileType: String,
        url: String,
      },
    ],

    resumeUrl: {
      type: String,
      default: "",
    },

    password: {
      type: String,
    },
    bgDesign: String,
    qrCodeDetails:qrCodeServicesSchema,
       priceDetails:securedServicesPricingDetailsSchema
  },
  {
    timestamps: true,
  }
);

const ResumeModel = mongoose.models.Resume || mongoose.model("Resume", resumeSchema);
export default ResumeModel;
