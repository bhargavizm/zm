// import mongoose from "mongoose";

// const fileItemSchema = new mongoose.Schema({
//   fileData: Buffer,
//   fileName: String,
//   fileType: String,
// });

// const audioSchema = new mongoose.Schema({
//   title: String,
//   description: String,
//   password: String,

//   files: [fileItemSchema], // multiple file support

//   user: {
//     id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
//     name: String,
//   },
// }, { timestamps: true });

// const AudioServiceModel =
//   mongoose.models.AudioService || mongoose.model("AudioService", audioSchema);

// export default AudioServiceModel;


import mongoose from "mongoose";

// File sub-schema for file uploads
const fileItemSchema = new mongoose.Schema({
  fileData: Buffer,
  fileName: String,
  fileType: String,
});

// Main audio service schema
const audioSchema = new mongoose.Schema(
  {
    title: { type: String },
    description: { type: String },
    password: { type: String }, // QR-level password protection

    files: [fileItemSchema], // Multiple file support

    user: {
      id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
      name: { type: String },
    },
    qrCodeImage: String,
    scanCount: { type: Number, default: 0 },

    // ✅ Location data (optional)
    location: {
      latitude: { type: Number, default: null },
      longitude: { type: Number, default: null },
      address: { type: String, default: "" },
    },

    // ✅ QR or subscription renewal date
    renewalDate: { type: Date, default: null },

    // ✅ Service status
    status: {
      type: String,
      enum: ["active", "expired", "pending"],
      default: "active",
    },

    // ✅ Password reset handling
    resetPasswordToken: { type: String, default: null },
    resetPasswordExpires: { type: Date, default: null },
  },
  {
    timestamps: true,
  }
);

// Create or reuse the model
const AudioServiceModel =
  mongoose.models.AudioService || mongoose.model("AudioService", audioSchema);

export default AudioServiceModel;
