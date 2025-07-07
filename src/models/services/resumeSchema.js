// models/services/resumeSchema.js

import mongoose from "mongoose"; // ✅ REQUIRED


const resumeSchema = new mongoose.Schema(
  {
    user: {
      id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
      name: String,
    },

    resumeFiles: [
      {
        fileName: String,
        url: String,
      },
    ],

    resumeUrl: {
      type: String,
      default: "",
    },

    password: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const ResumeModel = mongoose.models.Resume || mongoose.model("Resume", resumeSchema);
export default ResumeModel;
