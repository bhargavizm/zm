import mongoose from 'mongoose';
import { qrCodeServicesSchema } from './qrCodeServicesSchema';

const vehicleSchema = new mongoose.Schema({
  user: {
    id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    name: String,
  },
  template: {
    selectedTemplate: {
      type: String,
      enum: ['templateV1', 'templateV2', 'templateV3', 'templateV4', 'none'],
      default: 'none'
    }
  },
  general: {
    vehicleModel: {
      type: String,
      required: [true, 'Vehicle model is required'],
      trim: true
    },
    vehicleType: {
      type: String,
      trim: true
    },
    description: {
      type: String,
      trim: true
    }
  },
  registration: {
    rcNumber: {
      type: String,
      required: [true, 'RC number is required'],
      trim: true,
      uppercase: true
    },
    driverName: {
      type: String,
      trim: true
    },
    ownerName: {
      type: String,
      trim: true
    }
  },
  contact: {
    contact: {
      type: String,
      trim: true
    },
    altContact: {
      type: String,
      trim: true
    },
    address: {
      type: String,
      trim: true
    }
  },
  media: {
    vehicleImage: {
      type: String,
      required: [true, 'Vehicle image is required']
    },
    licenseFront: String,
    licenseBack: String,
    rcFront: String,
    rcBack: String,
    pollution: String,             // ✅ Add this
    insurance: [String],           // ✅ Add this
    galleryImages: [String]
  },

  security: {
    password: {
      type: String,
    },

  },
  bgDesign: {
    type: String,
  },
  qrCodeDetails: qrCodeServicesSchema
}, {
  timestamps: true,
  toJSON: {
    transform: function (doc, ret) {
      delete ret.security.password;
      delete ret.__v;
      return ret;
    }
  }
});

// Add indexes for better performance
vehicleSchema.index({ 'general.vehicleModel': 'text' });
vehicleSchema.index({ 'registration.rcNumber': 1 }, { unique: true });

const VehicleModel = mongoose.models.Vehicle || mongoose.model('Vehicle', vehicleSchema);

export default VehicleModel;