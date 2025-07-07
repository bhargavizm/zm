import mongoose from "mongoose";

const productItemSchema = new mongoose.Schema({
  image: { type: String }, // Image URL or base64 string
  heading: { type: String },
  description: { type: String },
  pageUrl: { type: String },
  videoUrl: { type: String }
}, { _id: false });

const productSchema = new mongoose.Schema({
  user: {
    id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    name: String,
  },
  brandName: { type: String},
  email: { type: String },
  phone: { type: String },
  address: { type: String },
  password: { type: String },
  selectedTemplate: { type: Number }, // index (e.g., 0, 1, 2, 3)
  productLogo: { type: String }, // URL of uploaded logo
  items: [productItemSchema] // Array of product items
}, { timestamps: true });


const ProductModal = mongoose.models.Product || mongoose.model("Product", productSchema);

export default ProductModal