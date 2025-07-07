import mongoose from "mongoose";

const businessSchema = new mongoose.Schema(
  {
    user: {
          id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
          name: String,
        },
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

const BusinessModel = mongoose.models.Business || mongoose.model("Business", businessSchema);

export default BusinessModel;
