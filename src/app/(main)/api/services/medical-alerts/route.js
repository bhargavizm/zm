export const runtime = "nodejs";

import { connectDB } from "@/lib/mongoDB";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
// import { v2 as cloudinary } from "cloudinary";
import MedicalAlertModel from "@/models/services/medicalAlertSchema";
import { authUser } from "@/middlewares/authMiddleware";
import { cloudinary } from "@/utils/cloudinary";
import { getShortenedUrl } from "@/utils/shortenUrl";

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

    // ✅ Step 2: Parse Form Data
    const formData = await req.formData();
    const getString = (key) => formData.get(key)?.toString().trim();
    const age = parseInt(getString("age"), 10) || undefined;

    // ✅ Step 3: Password Hash
    const plainPassword = getString("password");
    let hashedPassword = "";
    if (plainPassword) {
      hashedPassword = await bcrypt.hash(plainPassword, 10);
    }

    // ✅ Step 4: Upload files to Cloudinary
    const uploadFiles = async (fieldName, folder) => {
      const files = formData.getAll(fieldName);
      const uploaded = [];

      for (const file of files) {
        if (typeof file.arrayBuffer !== "function") continue;

        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        const base64 = buffer.toString("base64");
        const dataUri = `data:${file.type};base64,${base64}`;

        const result = await cloudinary.uploader.upload(dataUri, {
          folder,
          public_id: file.name.split(".")[0],
        });

        uploaded.push({
          url: result.secure_url,
          name: file.name,
        });
      }
      return uploaded;
    };

    const medicalReports = await uploadFiles("medicalReports", "medical-alert/medicalReports");
    const prescription = await uploadFiles("prescription", "medical-alert/prescription");
    const insuranceImage = await uploadFiles("insuranceImage", "medical-alert/insuranceImage");

    // ✅ Step 5: QR Code Details
    const qrCodeDetails = {
      qrCodeImage: getString("qrCodeImage") || "",
      scanCount: 0,
      lastScanAt: null,
      scanHistory: [],
      lastScanLocation: { city: "", region: "", country: "", lat: null, lon: null },
      qrCodeStatus: "inactive",
    };

    // ✅ Step 6: Create MongoDB Record
    const newRecord = await MedicalAlertModel.create({
      user: { id: user._id, name: user.name },
      bgDesign: getString("bgDesign"),
      patientInfo: {
        patientName: getString("patientName"),
        age,
        bloodType: getString("bloodType"),
      },
      medicalHistory: {
        medicalConditions: getString("medicalConditions"),
        allergies: getString("allergies"),
        medications: getString("medications"),
        additionalNotes: getString("additionalNotes"),
      },
      emergencyContact: {
        emergencyContact: getString("emergencyContact"),
        contactPhone: getString("contactPhone"),
      },
      additional: {
        familyDoctorName: getString("familyDoctorName"),
        familyDoctorPhone: getString("familyDoctorPhone"),
        emergencyInstructions: getString("emergencyInstructions"),
        insuranceProvider: getString("insuranceProvider"),
        policyNumber: getString("policyNumber"),
        preferredHospital: getString("preferredHospital"),
        location: getString("location"),
      },
      password: hashedPassword,
      qrCodeDetails,
      medicalReports,
      prescription,
      insuranceImage,
    });

    // ✅ Step 7: Generate QR URL
    const qrUrl = await getShortenedUrl(`/medical-alerts/${newRecord._id}`);

    return NextResponse.json(
      { success: true, message: "Medical Alert created successfully", data: newRecord, qrUrl },
      { status: 201 }
    );
  } catch (err) {
    console.error("❌ POST Error:", err);
    return NextResponse.json(
      { success: false, error: err.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
