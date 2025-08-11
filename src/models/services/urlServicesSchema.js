import mongoose from "mongoose";
import { qrCodeServicesSchema } from "./qrCodeServicesSchema";
import { securedServicesPricingDetailsSchema } from "./common/securedServicespricingDetails";

const URLServicesSchema = new mongoose.Schema(
  {
    user: {
      id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
      name: String,
    },
    serviceName: { type: String, required: true },
    url: { type: String },
    password: { type: String },
    qrCodeDetails:qrCodeServicesSchema,
    priceDetails:securedServicesPricingDetailsSchema
  },
  { timestamps: true }
  
);
// Create index on userId + serviceName to speed up queries
URLServicesSchema.index({ "user.id": 1, serviceName: 1 });

// Use camelCase model name and match with models[ModelName]
const URLServiceModel =
  mongoose.models.URLService || mongoose.model("URLService", URLServicesSchema);

export default URLServiceModel;
