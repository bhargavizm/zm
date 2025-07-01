import mongoose from 'mongoose';
import crypto from 'crypto';

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    validate: {
      validator: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v),
      message: 'Please enter a valid email',
    },
  },
  phone: {
    type: String,
    required: [true, 'Phone number is required'],
    validate: {
      validator: (v) => /^[6-9]\d{9}$/.test(v),
      message: 'Please enter a valid Indian phone number',
    },
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: 6,
    select: false,
  },
  nameHash: String,
  emailHash: String,
  phoneHash: String,
}, { timestamps: true });

// Pre-save hook
UserSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    const bcrypt = require('bcryptjs');
    this.password = await bcrypt.hash(this.password, 12);
  }

  // const hash = (value) => crypto.createHash('sha256').update(value).digest('hex');
  // this.nameHash = hash(this.name);
  // this.emailHash = hash(this.email);
  // this.phoneHash = hash(this.phone);

  next();
});


export const UserModel = mongoose.models.User || mongoose.model('User', UserSchema);
