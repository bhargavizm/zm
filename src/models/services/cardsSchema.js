import mongoose from "mongoose";
import { qrCodeServicesSchema } from "./qrCodeServicesSchema";
import { securedServicesPricingDetailsSchema } from "./common/securedServicespricingDetails";


const cardsSchema = new mongoose.Schema(
  {
    user: {
      id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
      name: String,
    },
    name: { type: String, trim: true },
    subheading: { type: String, trim: true },
    mobile: { type: String, trim: true },
    designation: { type: String, trim: true },
    email: { type: String, trim: true, lowercase: true },
    mapLink: { type: String, trim: true },
    socialLink: { type: String, trim: true },
    socialLink2: { type: String, trim: true },
    address: { type: String, trim: true },
    password: { type: String },
    selectedTemplate: { type: String },
     bgDesign:  {
      type: String,
    },
    profileImageUrl: {
      type: String,
    },
    qrCodeDetails: qrCodeServicesSchema,
    priceDetails: securedServicesPricingDetailsSchema

  },
  { timestamps: true }
);

// // 🔍 Add index to speed up queries by user + service type
// cardsSchema.index({ "user.id": 1 });

const BusinessCardsModel = mongoose.models["business-cards"] || mongoose.model("business-cards", cardsSchema);
const VCardsModel = mongoose.models["v-cards"] || mongoose.model("v-cards", cardsSchema);



export { BusinessCardsModel, VCardsModel };