import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  phone: { type: String, required: true, unique: true },
  password: { type: String, required: true },

  // Welcome Offer Fields
  firstLoginDate: { type: Date, default: null },
  welcomeOfferUsed: { type: Boolean, default: false },
  qrCodesCreatedDuringOffer: { type: Number, default: 0 },
  offerExpiryDate: { type: Date, default: null }
}, { timestamps: true });

// Optional indexes for faster queries
userSchema.index({ offerExpiryDate: 1 });
userSchema.index({ welcomeOfferUsed: 1 });

const User = mongoose.models.User || mongoose.model('User', userSchema);
export default User;
