import mongoose from "mongoose";

const medicalAlertSchema = new mongoose.Schema({
  patientInfo: {
    patientName: { type: String },
    birthDate: { type: Date },
    bloodType: { type: String },
  },
  medicalHistory: {
    medicalConditions: { type: String },
    allergies: { type: String },
    medications: { type: String },
    additionalNotes: { type: String },
  },
  emergencyContact: {
    emergencyContact: { type: String },
    contactPhone: { type: String },
  },
  additional: {
    familyDoctorName: { type: String },
    familyDoctorPhone: { type: String },
    emergencyInstructions: { type: String },
    insuranceProvider: { type: String },
    policyNumber: { type: String },
    medicalReports: { type: String }, // PDF stored as URL or base64
    prescription: { type: String },   // image stored as URL or base64
    insuranceImage: { type: String }, // image stored as URL or base64
    preferredHospital: { type: String },
    location: { type: String },
  },
  password: { type: String, required: true },
}, { timestamps: true });

const MedicalAlertModal = mongoose.models.MedicalAlert || mongoose.model("MedicalAlert",medicalAlertSchema)

export default MedicalAlertModal
