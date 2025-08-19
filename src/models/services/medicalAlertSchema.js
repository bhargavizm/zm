import mongoose from "mongoose";
import { qrCodeServicesSchema } from "./common/qrCodeServicesSchema";
import { securedServicesPricingDetailsSchema } from "./common/securedServicespricingDetails";

const MedicalAlertSchema = new mongoose.Schema(
  {
    user: {
      id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
      name: { type: String, required: true },
    },
    patientInfo: {
      patientName: String,
      age: Number,
      bloodType: String,
    },
    medicalHistory: {
      medicalConditions: String,
      allergies: String,
      medications: String,
      additionalNotes: String,
    },
    emergencyContact: {
      emergencyContact: String,
      contactPhone: String,
    },
    additional: {
      familyDoctorName: String,
      familyDoctorPhone: String,
      emergencyInstructions: String,
      insuranceProvider: String,
      policyNumber: String,
      preferredHospital: String,
      location: String,
    },
    medicalReports: [
      {
        fileName: String,
        fileType: String,
      },
    ],
    prescription: [
      {
        fileName: String,
        fileType: String,
      },
    ],
    insuranceImage: [
      {
        fileName: String,
        fileType: String,
      },
    ],
    bgDesign: String,
    password: { type: String },
    qrCodeDetails: qrCodeServicesSchema,
    priceDetails: securedServicesPricingDetailsSchema,
  },
  {
    timestamps: true,
  }
);

// 👇 Prevent model overwrite error in development
const MedicalAlertModel =
  mongoose.models.MedicalAlert ||
  mongoose.model("MedicalAlert", MedicalAlertSchema);

export default MedicalAlertModel;
