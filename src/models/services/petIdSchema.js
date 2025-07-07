import mongoose from "mongoose";

const ownerInfoSchema = new mongoose.Schema({

  name: { type: String, },
  phone: { type: String },
  email: { type: String },
  password: { type: String }, // Consider hashing this if used for protection
  address: { type: String }
}, { _id: false });

const petSchema = new mongoose.Schema({
  
  name: { type: String, },
  breed: { type: String },
  color: { type: String }
}, { _id: false });

const petTagSchema = new mongoose.Schema({
    user: {
    id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    name: String,
  },
  mainImage: { type: String }, // URL or path to uploaded image
  selectedTemplate: { type: String }, // Filename of selected template
  ownerInfo: ownerInfoSchema,
  pet: petSchema
}, { timestamps: true });


const PetTagModal = mongoose.models.PetTag || mongoose.model("PetTag", petTagSchema)

export default PetTagModal
