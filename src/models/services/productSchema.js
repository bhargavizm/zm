import mongoose from "mongoose";

const productItemSchema = new mongoose.Schema({
  image: { type: String }, // Image URL or base64 string
  heading: { type: String },
  description: { type: String },
  pageUrl: { type: String },
  videoUrl: { type: String }
}, { _id: false });

const productSchema = new mongoose.Schema({
  brandName: { type: String, required: true },
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
