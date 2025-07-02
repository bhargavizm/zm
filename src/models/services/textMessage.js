import mongoose from "mongoose";

const textMessageSchema = new mongoose.Schema(
  {
    sender: {
      type: String,
      trim: true,
    },
    message: {
      type: String,
      trim: true,
    },
    password: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const TextMessageModal = mongoose.models.TextMessage || mongoose.model("TextMessage", textMessageSchema);

export default TextMessageModal
