import mongoose from "mongoose";
import { qrCodeServicesSchema } from "./qrCodeServicesSchema";



const videoSchema = new mongoose.Schema({
   user: {
    id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    name: String,
  },
  title: String,
  description: String,
  password: String,
  bgDesign: String,

  videos: [
      {
        url: String,
        name: String,
      },
    ],

 
  qrCodeDetails: qrCodeServicesSchema
}, { timestamps: true });

const VideoServiceModel =
  mongoose.models.VideoService || mongoose.model("VideoService", videoSchema);

export default VideoServiceModel;
