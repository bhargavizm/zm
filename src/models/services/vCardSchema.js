import mongoose from "mongoose";

const vCardSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
    },
    subheading: {
      type: String,
      trim: true,
    },
    mobile: {
      type: String,
      required: true,
      trim: true,
    },
    designation: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
    },
    mapLink: {
      type: String,
      trim: true,
    },
    socialLink: {
      type: String,
      trim: true,
    },
    socialLink2: {
      type: String,
      trim: true,
    },
    address: {
      type: String,
      trim: true,
    },
    password: {
      type: String,
    },
    selectedTemplate: {
      type: String,
    },
    profileImageUrl: {
      type: String,
    },
  },
  { timestamps: true }
);

const VCardModel = mongoose.models.VCard || mongoose.model("VCard", vCardSchema);

export default VCardModel
