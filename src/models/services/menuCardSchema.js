import mongoose from "mongoose";

const extraFieldSchema = new mongoose.Schema({
  label: { type: String, required: true },
  type: { type: String, enum: ["text", "video"], default: "text" },
  value: { type: String }, // could be text or video URL
  placeholder: { type: String },
  visible: { type: Boolean, default: true },
}, { _id: false });

const menuItemSchema = new mongoose.Schema({
  name: { type: String },
  description: { type: String },
  price: { type: String },
  image: { type: String }, // base64 or uploaded URL
  visible: { type: Boolean, default: true },
}, { _id: false });

const menuBookSchema = new mongoose.Schema({
  restaurantName: { type: String, required: true },
  menuItems: [menuItemSchema],
  extras: [extraFieldSchema],
}, { timestamps: true });

const MenuBookModal = mongoose.models.MenuBook || mongoose.model("MenuBook",menuBookSchema)

export default MenuBookModal
