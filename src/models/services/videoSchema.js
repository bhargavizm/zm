import mongoose from "mongoose";



const videoSchema = new mongoose.Schema({
  title: String,
  description: String,
  password: String,

  videos: [
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

const VideoServiceModel =
  mongoose.models.VideoService || mongoose.model("VideoService", videoSchema);

export default VideoServiceModel;
