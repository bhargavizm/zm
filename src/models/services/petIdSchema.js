// import mongoose from "mongoose";

// const ownerInfoSchema = new mongoose.Schema({

//   name: { type: String, },
//   phone: { type: String },
//   email: { type: String },
//   password: { type: String }, // Consider hashing this if used for protection
//   address: { type: String }
// }, { _id: false });

// const petSchema = new mongoose.Schema({
  
//   name: { type: String, },
//   breed: { type: String },
//   color: { type: String }
// }, { _id: false });

// const petTagSchema = new mongoose.Schema({
//     user: {
//     id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
//     name: String,
//     qrCodeDetails: qrCodeServicesSchema
//   },
//   mainImage: { type: String }, // URL or path to uploaded image
//   selectedTemplate: { type: String }, // Filename of selected template
//   ownerInfo: ownerInfoSchema,
//   pet: petSchema
// }, { timestamps: true });


// const PetTagModal = mongoose.models.PetTag || mongoose.model("PetTag", petTagSchema)

// export default PetTagModal

// models/services/petIdSchema.js

import mongoose from "mongoose";

const PetIdSchema = new mongoose.Schema({
  user: {
    id: mongoose.Types.ObjectId,
    name: String,
  },
  imageUrl: String,
  publicId: String,
  qrPassword: String,
  qrCodeDetails: {
    qrCodeImage: String,
    location: {
      latitude: Number,
      longitude: Number,
      address: String,
    },
    renewalDate: Date,
    status: {
      type: String,
      default: "active",
      enum: ["active", "expired", "suspended"],
    },
    resetPasswordToken: String,
    resetPasswordExpires: Date,
  },
}, {
  timestamps: true,
});

export default mongoose.models.PetTag || mongoose.model("PetTag", PetIdSchema);
