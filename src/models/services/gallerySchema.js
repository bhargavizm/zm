import mongoose from "mongoose";

const gallerySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    fileNames: {
      type: [String], // Array of image file names or URLs
    },
    password: {
      type: String,
      // If you hash the password before saving, keep it plain here
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    collection: "galleries",
  }
);

const GalleryModal = mongoose.models.Gallery || mongoose.model("Gallery", gallerySchema);

export default GalleryModal
