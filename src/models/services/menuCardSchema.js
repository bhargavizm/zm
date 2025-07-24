import mongoose from "mongoose";
import { qrCodeServicesSchema } from "./qrCodeServicesSchema";

const menuCardsSchema = new mongoose.Schema(
  {
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

    user: {
      id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
      name: String,
    },
    qrCodeDetails:qrCodeServicesSchema
  },
  { timestamps: true }
);

const MenuCardsServiceModel =
  mongoose.models.MenuCards || mongoose.model("MenuCards", menuCardsSchema);

export default MenuCardsServiceModel;
