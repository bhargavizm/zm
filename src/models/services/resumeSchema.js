import mongoose from "mongoose";

const resumeSchema = new mongoose.Schema(
  {
    
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
    },
  },
  {
    timestamps: true,
  }
);

// Prevent model overwrite issue in development
const ResumeModal = mongoose.models.Resume || mongoose.model("Resume", resumeSchema);

export default ResumeModal;
