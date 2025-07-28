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
import { qrCodeServicesSchema } from "./qrCodeServicesSchema";

// File sub-schema for file uploads
const fileItemSchema = new mongoose.Schema({
  fileData: Buffer,
  fileName: String,
  fileType: String,
});

// Main audio service schema
const audioSchema = new mongoose.Schema(
  {
    user: {
      id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
      name: { type: String },
    },
    title: { type: String },
    description: { type: String },
    password: { type: String }, // QR-level password protection
 bgDesign:  {
      type: String,
    },
    files: [fileItemSchema], // Multiple file support

    
       
    qrCodeDetails: qrCodeServicesSchema
  },
  {
    timestamps: true,
  }
);

// Create or reuse the model
const AudioServiceModel =
  mongoose.models.AudioService || mongoose.model("AudioService", audioSchema);

export default AudioServiceModel;
