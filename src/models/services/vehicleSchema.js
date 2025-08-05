import mongoose from 'mongoose';


const vehicleSchema = new mongoose.Schema({
  user: {
    id: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'User',
      required: true
    },
    name: String
  },

  general: {
    vehicleModel: { type: String, required: true },
    vehicleType: { type: String },
    vehicleNumber: { type: String },
    description: { type: String }
  },

  registration: {
    rcNumber: { type: String, required: true, unique: true },
    driverName: String,
    ownerName: String
  },

  contact: {
    contact: String,
    altContact: String,
    address: String,
    mapLink: String
  },

  media: {
    vehicleImage: { type: String, required: true },
    licenseFront: String,
    licenseBack: String,
    rcFront: String,
    rcBack: String,
    pollution: String,
    galleryImages: [String],
    insurance: [String]
  },

  password: {
    type: String,
  },

  vehicleTemplate: {
    type: String,
    default: 'none'
  },

  bgDesign: String,

  status: {
    type: String,
    default: 'active'
  },

  lastUpdated: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true // Adds createdAt and updatedAt automatically
});



const VehicleModel = mongoose.models.Vehicle || mongoose.model('Vehicle', vehicleSchema);
export default VehicleModel;
