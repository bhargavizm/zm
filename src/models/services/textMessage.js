import mongoose from "mongoose";

const textMessageSchema = new mongoose.Schema(
  {
    user: {
         id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
        name: String,
      },
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
