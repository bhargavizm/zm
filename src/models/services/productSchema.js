// // models/services/productSchema.js

// import mongoose from "mongoose";
// import { qrCodeServicesSchema } from "./qrCodeServicesSchema";

// const productSchema = new mongoose.Schema(
//   {
//     user: {
//       id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
//       name: { type: String, required: true },
//     },
//     productLogo: String,
//     brandName: String,
//     email: String,
//     phone: String,
//     address: String,
//     password: String,
//     selectedTemplate: Number,
//     bgDesign: String,
//     items: [
//       {
//         productImage: String,
//         heading: String,
//         description: String,
//         pageUrl: String,
//         videoUrl: String,
//       },
//     ],
//     bgDesign: String,
//     qrCodeDetails: qrCodeServicesSchema,
//   },
//   {
//     timestamps: true,
//   }
// );

// const ProductsModel =  mongoose.models.Product ||
//   mongoose.model("Products", productSchema);

//   export default ProductsModel
// models/services/productSchema.js

import mongoose from "mongoose";
import { qrCodeServicesSchema } from "./qrCodeServicesSchema";

const productSchema = new mongoose.Schema(
  {
    user: {
      id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
      name: { type: String, required: true },
    },
    productLogo: String,
    brandName: String,
    email: String,
    phone: String,
    address: String,
    password: String,
    selectedTemplate: Number,
    bgDesign: String,
    items: [
      {
        productImage: String,
        heading: String,
        description: String,
        pageUrl: String,
        videoUrl: String,
      },
    ],
    qrCodeDetails: qrCodeServicesSchema,
  },
  {
    timestamps: true,
  }
);

// ✅ Ensure model name matches both places: "Products"
const ProductsModel =
  mongoose.models.Products || mongoose.model("Products", productSchema);

export default ProductsModel;
