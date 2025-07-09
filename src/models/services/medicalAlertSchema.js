// import mongoose from "mongoose";

// const fileSchema = new mongoose.Schema({
//   fileName: { type: String, required: true },
//   fileType: { type: String, required: true },
//   // fileData: { type: Buffer, required: true }, // Storing file as binary
// });

// const medicalAlertSchema = new mongoose.Schema(
//   {
//     patientInfo: {
//       patientName: { type: String },
//       birthDate: { type: Date },
//       bloodType: { type: String },
//     },
//     medicalHistory: {
//       medicalConditions: { type: String },
//       allergies: { type: String },
//       medications: { type: String },
//       additionalNotes: { type: String },
//     },
//     emergencyContact: {
//       emergencyContact: { type: String },
//       contactPhone: { type: String },
//     },
//     additional: {
//       familyDoctorName: { type: String },
//       familyDoctorPhone: { type: String },
//       emergencyInstructions: { type: String },
//       insuranceProvider: { type: String },
//       policyNumber: { type: String },
//       preferredHospital: { type: String },
//       location: { type: String },
//     },
//     // Embedded file documents
//     medicalReports: fileSchema,
//     prescription: fileSchema,
//     insuranceImage: fileSchema,

//     password: { type: String, required: true },
//   },
//   { timestamps: true }
// );

// const MedicalAlertModel =
//   mongoose.models.MedicalAlert || mongoose.model("MedicalAlert", medicalAlertSchema);

// export default MedicalAlertModel;


import mongoose from "mongoose";

const fileSchema = new mongoose.Schema({
 
  fileName: { type: String, required: true },
  fileType: { type: String, required: true },
});

const medicalAlertSchema = new mongoose.Schema(
   
  {
    user: {
         id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
        name: String,
      },
    patientInfo: {
      patientName: { type: String },
      //birthDate: { type: Date },
      age:{type:Number},
      
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
      preferredHospital: { type: String },
      location: { type: String },
    },

    // Allow multiple files per field
    medicalReports: [fileSchema],
    prescription: [fileSchema],
    insuranceImage: [fileSchema],

    password: { type: String},
  },
  { timestamps: true }
);

const MedicalAlertModel =
  mongoose.models.MedicalAlert || mongoose.model("MedicalAlert", medicalAlertSchema);

export default MedicalAlertModel;
