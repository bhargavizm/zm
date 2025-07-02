import mongoose from "mongoose";

const audioSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    audioFileName: {
      type: String,
      required: true,
    },
    audioUrl: {
      type: String,
    },
    password: {
      type: String,
    },
  },
  { timestamps: true }
);

// Prevent model overwrite issue in Next.js hot reloading
const AudioModal = mongoose.models.Audio || mongoose.model("Audio", audioSchema);

export default AudioModal;
