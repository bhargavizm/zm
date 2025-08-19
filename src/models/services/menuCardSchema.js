import mongoose from "mongoose";
import { qrCodeServicesSchema } from "./common/qrCodeServicesSchema";
import { securedServicesPricingDetailsSchema } from "./common/securedServicespricingDetails";


const menuCardsSchema = new mongoose.Schema(
  {
        user: {
      id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
      name: String,
    },
    restaurantName: String,
    phone: String,
    email: String,
    link: String,
    password: String,
    images: [
      {
        url: String,
        name: String,
      },
    ],
    bgDesign: String,
    qrCodeDetails: qrCodeServicesSchema,
    priceDetails:securedServicesPricingDetailsSchema
  },
  { timestamps: true }
);

const MenuCardsServiceModel =
  mongoose.models.MenuCards || mongoose.model("MenuCards", menuCardsSchema);

export default MenuCardsServiceModel;
