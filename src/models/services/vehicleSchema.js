// models/services/vehicleSchema.js

import mongoose from "mongoose";

const vehicleSchema = new mongoose.Schema(
  {
    vehicleNumber: {
      type: String,
      unique: true,
      trim: true,
    },
    model: {
      type: String,
      trim: true,
    },
    manufacturer: {
      type: String,
      trim: true,
    },
    year: {
      type: Number,
    },
    color: {
      type: String,
      default: "Unknown",
    },
    type: {
      type: String,
      enum: ["Car", "Bike", "Auto", "Lorry", "Other"],
      default: "Other",
    },
    ownerName: {
      type: String,
      required: true,
    },
    registrationDate: {
      type: Date,
      default: Date.now,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    location: {
      type: String,
      default: "Not Assigned",
    },
    notes: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

const VehicleModal =  mongoose.models.Vehicle || mongoose.model("Vehicle", vehicleSchema);

export default VehicleModal
