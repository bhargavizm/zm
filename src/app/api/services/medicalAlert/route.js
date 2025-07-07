// import { connectDB } from "@/lib/mongoDB";
// import MedicalAlertModel from "@/models/services/medicalAlertSchema";
// import { NextResponse } from "next/server";


// export async function POST(req) {
//   try {
//     await connectDB();

//     const formData = await req.formData();

//     // Patient Info
//     const patientName = formData.get("patientName");
//     const birthDate = new Date(formData.get("birthDate"));
//     const bloodType = formData.get("bloodType");

//     // Medical History
//     const medicalConditions = formData.get("medicalConditions");
//     const allergies = formData.get("allergies");
//     const medications = formData.get("medications");
//     const additionalNotes = formData.get("additionalNotes");

//     // Emergency Contact
//     const emergencyContact = formData.get("emergencyContact");
//     const contactPhone = formData.get("contactPhone");

//     // Additional Info
//     const familyDoctorName = formData.get("familyDoctorName");
//     const familyDoctorPhone = formData.get("familyDoctorPhone");
//     const emergencyInstructions = formData.get("emergencyInstructions");
//     const insuranceProvider = formData.get("insuranceProvider");
//     const policyNumber = formData.get("policyNumber");
//     const preferredHospital = formData.get("preferredHospital");
//     const location = formData.get("location");

//     // Password (you can hash this before saving if needed)
//     const password = formData.get("password");

//     // Helper to convert file
//     const fileToBuffer = async (file) => {
//       if (!file || typeof file.arrayBuffer !== "function") return null;
//       const arrayBuffer = await file.arrayBuffer();
//       return {
//         fileName: file.name,
//         fileType: file.type,
//         fileData: Buffer.from(arrayBuffer),
//       };
//     };

//     // Get file data
//     const medicalReports = await fileToBuffer(formData.get("medicalReports"));
//     const prescription = await fileToBuffer(formData.get("prescription"));
//     const insuranceImage = await fileToBuffer(formData.get("insuranceImage"));

//     // Create record
//     const newRecord = await MedicalAlertModel.create({
//       patientInfo: { patientName, birthDate, bloodType },
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
//       password,
//     });

//     return NextResponse.json({ success: true, data: newRecord }, { status: 201 });
//   } catch (err) {
//     console.error("POST error:", err);
//     return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
//   }
// }




import { connectDB } from "@/lib/mongoDB";
import { authUser } from "@/middlewares/authMiddleware";
import MedicalAlertModel from "@/models/services/medicalAlertSchema";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(req) {
  try {
    // ✅ Step 1: Authenticate User
    const auth = await authUser(req);
    if (auth.status !== 200) {
      return new Response(JSON.stringify(auth.json), {
        status: auth.status,
        headers: { "Content-Type": "application/json" },
      });
    }

    const user = auth.user;

    await connectDB();
    const formData = await req.formData();

    // Patient Info
    const patientName = formData.get("patientName");
    const birthDate = new Date(formData.get("birthDate"));
    const bloodType = formData.get("bloodType");

    // Medical History
    const medicalConditions = formData.get("medicalConditions");
    const allergies = formData.get("allergies");
    const medications = formData.get("medications");
    const additionalNotes = formData.get("additionalNotes");

    // Emergency Contact
    const emergencyContact = formData.get("emergencyContact");
    const contactPhone = formData.get("contactPhone");

    // Additional Info
    const familyDoctorName = formData.get("familyDoctorName");
    const familyDoctorPhone = formData.get("familyDoctorPhone");
    const emergencyInstructions = formData.get("emergencyInstructions");
    const insuranceProvider = formData.get("insuranceProvider");
    const policyNumber = formData.get("policyNumber");
    const preferredHospital = formData.get("preferredHospital");
    const location = formData.get("location");

    const plainPassword = formData.get("password");

    const maxFileSize = 2 * 1024 * 1024;
    const maxTotalSize = 30 * 1024 * 1024;
    let totalSize = 0;

    // ✅ Helper to process multiple files
    const processFiles = async (fieldName) => {
      const files = formData.getAll(fieldName);
      const processed = [];

      for (const file of files) {
        if (!file || typeof file.arrayBuffer !== "function") continue;
        const arrayBuffer = await file.arrayBuffer();
        const size = arrayBuffer.byteLength;

        if (size > maxFileSize) {
          throw new Error(`File "${file.name}" in "${fieldName}" exceeds 2MB limit.`);
        }

        totalSize += size;
        if (totalSize > maxTotalSize) {
          throw new Error(`Total file size exceeds 30MB limit.`);
        }

        processed.push({
          fileName: file.name,
          fileType: file.type,
        });
      }

      return processed;
    };

    // Process all file arrays
    const medicalReports = await processFiles("medicalReports");
    const prescription = await processFiles("prescription");
    const insuranceImage = await processFiles("insuranceImage");

    // ✅ Hash the password if present
    let hashedPassword = "";
    if (plainPassword && plainPassword.trim() !== "") {
      const salt = await bcrypt.genSalt(10);
      hashedPassword = await bcrypt.hash(plainPassword, salt);
    }

    // ✅ Save to DB
    const newRecord = await MedicalAlertModel.create({
      user: {
        id: user._id,
        name: user.name,
      },
      patientInfo: { patientName, birthDate, bloodType },
      medicalHistory: { medicalConditions, allergies, medications, additionalNotes },
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
    });

    return NextResponse.json({ success: true, data: newRecord }, { status: 201 });
  } catch (err) {
    console.error("POST error:", err);
    return NextResponse.json(
      { success: false, error: err.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
