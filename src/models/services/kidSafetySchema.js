import mongoose from "mongoose";

const kidsSafetySchema = new mongoose.Schema({
  childName: { type: String, },
  dob: { type: Date,  },
  classGrade: { type: String },
  
  schoolName: { type: String,  },
  schoolAddress: { type: String,  },
  schoolContact: { type: String, },
  
  parentName: { type: String,  },
  contact: { type: String, },
  contact2: { type: String },
  altContact: [{ type: String }], // dynamic list of extra contacts
  
  homeAddress: { type: String,  },
  mapLink: { type: String }, // optional Google Maps URL

  password: { type: String,  },

  kidsImage: { type: String }, // Cloudinary or local URL

}, { timestamps: true });

const KidsSafetyModal = mongoose.models.KidsSafety || mongoose.model('KidsSafety', kidsSafetySchema)

export default KidsSafetyModal
