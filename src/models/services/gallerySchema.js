import mongoose from "mongoose";


const GallerySchema = new mongoose.Schema({
  title: String,
  description: String,
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
}, { timestamps: true });

const GalleryServiceModel =
  mongoose.models.GalleryService || mongoose.model("GalleryService", GallerySchema);

export default GalleryServiceModel;
