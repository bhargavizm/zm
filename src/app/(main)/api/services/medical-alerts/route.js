
// export const runtime = "nodejs";

// import { connectDB } from "@/lib/mongoDB";
// import { NextResponse } from "next/server";
// import bcrypt from "bcryptjs";
// import MedicalAlertModel from "@/models/services/medicalAlertSchema";
// import { authUser } from "@/middlewares/authMiddleware";


// export async function POST(req) {
//   try {
//     // Authenticate user
//     const auth = await authUser(req);
//     if (auth.status !== 200) {
//       return new Response(JSON.stringify(auth.json), {
//         status: auth.status,
//         headers: { "Content-Type": "application/json" },
//       });
//     }
//     const user = auth.user;

//     // Connect to MongoDB
//     await connectDB();

//     // Parse multipart/form-data body
//     const formData = await req.formData();

//     // Extract fields
//     const patientName = formData.get("patientName");
//     const ageStr = formData.get("age");
//     const age = ageStr ? parseInt(ageStr, 10) : undefined;
//     const bloodType = formData.get("bloodType");

//     const medicalConditions = formData.get("medicalConditions");
//     const allergies = formData.get("allergies");
//     const medications = formData.get("medications");
//     const additionalNotes = formData.get("additionalNotes");

//     const emergencyContact = formData.get("emergencyContact");
//     const contactPhone = formData.get("contactPhone");

//     const familyDoctorName = formData.get("familyDoctorName");
//     const familyDoctorPhone = formData.get("familyDoctorPhone");
//     const emergencyInstructions = formData.get("emergencyInstructions");
//     const insuranceProvider = formData.get("insuranceProvider");
//     const policyNumber = formData.get("policyNumber");
//     const preferredHospital = formData.get("preferredHospital");
//     const location = formData.get("location");

//     const plainPassword = formData.get("password");

//     // File size limits
//     const maxFileSize = 2 * 1024 * 1024; // 2MB per file
//     const maxTotalSize = 30 * 1024 * 1024; // 30MB total
//     let totalSize = 0;

//     // Helper to process multiple files
//     const processFiles = async (fieldName) => {
//       const files = formData.getAll(fieldName);
//       const processed = [];
//       for (const file of files) {
//         if (!file || typeof file.arrayBuffer !== "function") continue;
//         const arrayBuffer = await file.arrayBuffer();
//         const size = arrayBuffer.byteLength;

//         if (size > maxFileSize) {
//           throw new Error(`File "${file.name}" in "${fieldName}" exceeds 2MB limit.`);
//         }

//         totalSize += size;
//         if (totalSize > maxTotalSize) {
//           throw new Error(`Total file size exceeds 30MB limit.`);
//         }

//         processed.push({
//           fileName: file.name,
//           fileType: file.type,
//         });
//       }
//       return processed;
//     };

//     // Process file uploads
//     const medicalReports = await processFiles("medicalReports");
//     const prescription = await processFiles("prescription");
//     const insuranceImage = await processFiles("insuranceImage");

//     // Hash password if provided
//     let hashedPassword = "";
//     if (plainPassword && plainPassword.trim() !== "") {
//       const salt = await bcrypt.genSalt(10);
//       hashedPassword = await bcrypt.hash(plainPassword, salt);
//     }

//     // Create new record in DB
//     const newRecord = await MedicalAlertModel.create({
//       user: {
//         id: user._id,
//         name: user.name,
//       },
//       patientInfo: { patientName, age, bloodType },
//       medicalHistory: { medicalConditions, allergies, medications, additionalNotes },
//       emergencyContact: { emergencyContact, contactPhone },
//       additional: {
//         familyDoctorName,
//         familyDoctorPhone,
//         emergencyInstructions,
//         insuranceProvider,
//         policyNumber,
//         preferredHospital,
//         location,
//       },
//       medicalReports,
//       prescription,
//       insuranceImage,
//       password: hashedPassword,
//     });

//     return NextResponse.json({ success: true, data: newRecord }, { status: 201 });
//   } catch (err) {
//     console.error("POST error:", err);
//     return NextResponse.json(
//       { success: false, error: err.message || "Internal Server Error" },
//       { status: 500 }
//     );
//   }

// }

// export const runtime = "nodejs";

// import { connectDB } from "@/lib/mongoDB";
// import { NextResponse } from "next/server";
// import bcrypt from "bcryptjs";
// import MedicalAlertModel from "@/models/services/medicalAlertSchema";
// import { authUser } from "@/middlewares/authMiddleware";

// export async function POST(req) {
//   try {
//     // Authenticate user
//     const auth = await authUser(req);
//     if (auth.status !== 200) {
//       return new Response(JSON.stringify(auth.json), {
//         status: auth.status,
//         headers: { "Content-Type": "application/json" },
//       });
//     }

//     const user = auth.user;

//     // Connect to DB
//     await connectDB();

//     // Parse multipart/form-data
//     const formData = await req.formData();

//     // ✅ Debug logs
//     console.log("🧾 Form Keys:", Array.from(formData.keys()));

//     // Extract basic fields
//     const patientName = formData.get("patientName");
//     const ageStr = formData.get("age");
//     const age = ageStr ? parseInt(ageStr, 10) : undefined;
//     const bloodType = formData.get("bloodType");

//     const medicalConditions = formData.get("medicalConditions");
//     const allergies = formData.get("allergies");
//     const medications = formData.get("medications");
//     const additionalNotes = formData.get("additionalNotes");

//     const emergencyContact = formData.get("emergencyContact");
//     const contactPhone = formData.get("contactPhone");

//     const familyDoctorName = formData.get("familyDoctorName");
//     const familyDoctorPhone = formData.get("familyDoctorPhone");
//     const emergencyInstructions = formData.get("emergencyInstructions");
//     const insuranceProvider = formData.get("insuranceProvider");
//     const policyNumber = formData.get("policyNumber");
//     const preferredHospital = formData.get("preferredHospital");
//     const location = formData.get("location");

//     const plainPassword = formData.get("password");

//     // ✅ File upload logic
//     const maxFileSize = 2 * 1024 * 1024; // 2MB
//     const maxTotalSize = 30 * 1024 * 1024; // 30MB
//     let totalSize = 0;

//     const processFiles = async (fieldName) => {
//       const files = formData.getAll(fieldName);
//       if (!files || files.length === 0) return [];

//       const processed = [];

//       for (const file of files) {
//         if (!file || typeof file.arrayBuffer !== "function") continue;

//         const buffer = await file.arrayBuffer();
//         const size = buffer.byteLength;

//         if (size > maxFileSize) {
//           throw new Error(`File "${file.name}" in "${fieldName}" exceeds 2MB limit.`);
//         }

//         totalSize += size;
//         if (totalSize > maxTotalSize) {
//           throw new Error(`Total file size exceeds 30MB.`);
//         }

//         processed.push({
//           fileName: file.name,
//           fileType: file.type,
//           // Optionally save as base64 or buffer
//           // content: Buffer.from(buffer).toString('base64')
//         });
//       }

//       return processed;
//     };

//     // ✅ Wrap file processing in try-catch
//     let medicalReports = [];
//     let prescription = [];
//     let insuranceImage = [];

//     try {
//       medicalReports = await processFiles("medicalReports");
//       prescription = await processFiles("prescription");
//       insuranceImage = await processFiles("insuranceImage");
//     } catch (fileError) {
//       console.error("❌ File Processing Error:", fileError);
//       return NextResponse.json(
//         { success: false, error: fileError.message },
//         { status: 400 }
//       );
//     }

//     // ✅ Hash password if provided
//     let hashedPassword = "";
//     if (plainPassword && plainPassword.trim() !== "") {
//       const salt = await bcrypt.genSalt(10);
//       hashedPassword = await bcrypt.hash(plainPassword.trim(), salt);
//     }

//     // ✅ Create DB record
//     const newRecord = await MedicalAlertModel.create({
//       user: {
//         id: user._id,
//         name: user.name,
//       },
//       patientInfo: { patientName, age, bloodType },
//       medicalHistory: { medicalConditions, allergies, medications, additionalNotes },
//       emergencyContact: { emergencyContact, contactPhone },
//       additional: {
//         familyDoctorName,
//         familyDoctorPhone,
//         emergencyInstructions,
//         insuranceProvider,
//         policyNumber,
//         preferredHospital,
//         location,
//       },
//       medicalReports,
//       prescription,
//       insuranceImage,
//       password: hashedPassword,
//     });

//     console.log("✅ Form submitted successfully!");

//     return NextResponse.json({ success: true, data: newRecord }, { status: 201 });

//   } catch (err) {
//     console.error("❌ POST error:", err);
//     return NextResponse.json(
//       { success: false, error: err.message || "Internal Server Error" },
//       { status: 500 }
//     );
//   }
// }


export const runtime = "nodejs";

import { connectDB } from "@/lib/mongoDB";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import MedicalAlertModel from "@/models/services/medicalAlertSchema";
import { authUser } from "@/middlewares/authMiddleware";
import { getShortenedUrl } from "@/utils/shortenUrl";

export async function POST(req) {
  try {
    // ✅ Authenticate user
    const auth = await authUser(req);
    if (auth.status !== 200) {
      return new Response(JSON.stringify(auth.json), {
        status: auth.status,
        headers: { "Content-Type": "application/json" },
      });
    }

    const user = auth.user;

    // ✅ Connect to DB
    await connectDB();

    // ✅ Parse multipart/form-data
    const formData = await req.formData();
    const  bgDesign = formData.get("bgDesign");
    // ✅ Extract form fields
    const patientName = formData.get("patientName");
    const ageStr = formData.get("age");
    const age = ageStr ? parseInt(ageStr, 10) : undefined;
    const bloodType = formData.get("bloodType");

    const medicalConditions = formData.get("medicalConditions");
    const allergies = formData.get("allergies");
    const medications = formData.get("medications");
    const additionalNotes = formData.get("additionalNotes");

    const emergencyContact = formData.get("emergencyContact");
    const contactPhone = formData.get("contactPhone");

    const familyDoctorName = formData.get("familyDoctorName");
    const familyDoctorPhone = formData.get("familyDoctorPhone");
    const emergencyInstructions = formData.get("emergencyInstructions");
    const insuranceProvider = formData.get("insuranceProvider");
    const policyNumber = formData.get("policyNumber");
    const preferredHospital = formData.get("preferredHospital");
    const location = formData.get("location");

    const plainPassword = formData.get("password");

    // ✅ Extract QR Code Details
    const qrCodeImage = formData.get("qrCodeImage") || "";
    const locationLatitude = formData.get("locationLatitude");
    const locationLongitude = formData.get("locationLongitude");
    const locationAddress = formData.get("locationAddress");
    const renewalDateStr = formData.get("renewalDate");
    const status = formData.get("status") || "active";

    const qrCodeDetails = {
      qrCodeImage,
      location: {
        latitude: locationLatitude ? parseFloat(locationLatitude) : null,
        longitude: locationLongitude ? parseFloat(locationLongitude) : null,
        address: locationAddress || "",
      },
      renewalDate: renewalDateStr ? new Date(renewalDateStr) : null,
      status,
      resetPasswordToken: null,
      resetPasswordExpires: null,
    };

    // ✅ File Upload Handling
    const maxFileSize = 2 * 1024 * 1024; // 2MB per file
    const maxTotalSize = 30 * 1024 * 1024; // 30MB total
    let totalSize = 0;

    const processFiles = async (fieldName) => {
      const files = formData.getAll(fieldName);
      if (!files || files.length === 0) return [];

      const processed = [];
      for (const file of files) {
        if (!file || typeof file.arrayBuffer !== "function") continue;

        const buffer = await file.arrayBuffer();
        const size = buffer.byteLength;

        if (size > maxFileSize) {
          throw new Error(`File "${file.name}" in "${fieldName}" exceeds 2MB limit.`);
        }

        totalSize += size;
        if (totalSize > maxTotalSize) {
          throw new Error("Total file size exceeds 30MB.");
        }

        processed.push({
          fileName: file.name,
          fileType: file.type,
        });
      }

      return processed;
    };

    // ✅ Process File Inputs
    let medicalReports = [];
    let prescription = [];
    let insuranceImage = [];

    try {
      medicalReports = await processFiles("medicalReports");
      prescription = await processFiles("prescription");
      insuranceImage = await processFiles("insuranceImage");
    } catch (fileError) {
      console.error("❌ File Processing Error:", fileError);
      return NextResponse.json(
        { success: false, error: fileError.message },
        { status: 400 }
      );
    }

    // ✅ Hash Password (if provided)
    let hashedPassword = "";
    if (plainPassword && plainPassword.trim() !== "") {
      const salt = await bcrypt.genSalt(10);
      hashedPassword = await bcrypt.hash(plainPassword.trim(), salt);
    }

    // ✅ Create New Record
    const newRecord = await MedicalAlertModel.create({
      user: {
        id: user._id,
        name: user.name,
      },
      bgDesign,
      patientInfo: { patientName, age, bloodType },
      medicalHistory: {
        medicalConditions,
        allergies,
        medications,
        additionalNotes,
      },
      emergencyContact: { emergencyContact, contactPhone },
      additional: {
        familyDoctorName,
        familyDoctorPhone,
        emergencyInstructions,
        insuranceProvider,
        policyNumber,
        preferredHospital,
        location,
      },
      medicalReports,
      prescription,
      insuranceImage,
      password: hashedPassword,
      bgDesign,
      qrCodeDetails, // ✅ Added QR Code data
    });


    const qrUrl = await getShortenedUrl(`/medical-alerts/${newRecord._id}`);
    return NextResponse.json({ success: true, data: newRecord,qrUrl }, { status: 201 });

  } catch (err) {
    console.error("❌ POST Error:", err);
    return NextResponse.json(
      { success: false, error: err.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}

