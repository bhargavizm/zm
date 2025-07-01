import mongoose from "mongoose";

const resumeSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    resumeFileName: {
      type: String,
      default: null, // if user provides file
    },
    resumeUrl: {
      type: String,
      default: "", // if user provides URL instead of file
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Prevent model overwrite issue in development
const ResumeModal = mongoose.models.Resume || mongoose.model("Resume", resumeSchema);

export default ResumeModal;
