// models/services/videoSchema.js

import mongoose from "mongoose";

const videoSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    fileName: {
      type: String,
      trim: true,
    },
    password: {
      type: String,
    },
  },
  {
    timestamps: true, // adds createdAt and updatedAt
  }
);

const VideoModal = mongoose.models.Video || mongoose.model("Video", videoSchema);

export default VideoModal
