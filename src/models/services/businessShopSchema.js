import mongoose from 'mongoose';

const dayScheduleSchema = new mongoose.Schema({
  day: String,
  time: String
});

const template1DataSchema = new mongoose.Schema({
  title: String,
  days: [dayScheduleSchema],
  aboutUsLink: String,
  siteLink: String
});

const template2DataSchema = new mongoose.Schema({
  logoText: String,
  mainHeading: String,
  subHeading: String,
  timeRange: String,
  closedDay: String,
  addressLine1: String,
  addressLine2: String,
  website: String
});

const BusinessInfoSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  general: {
    businessName: String,
    businessType: String,
    description: String,
    shopTimings: String
  },
  contact: {
    phone: String,
    altPhone: String,
    email: String,
    address: String
  },
  media: {
    logo: String,
    galleryImages: [String]
  },
  security: {
    password: String
  },
  shopTimingsTemplate: {
    selectedTemplate: String,
    template1Data: template1DataSchema,
    template2Data: template2DataSchema
  }
}, { timestamps: true });

export default mongoose.models.BusinessInfo || mongoose.model('BusinessInfo', BusinessInfoSchema);