
export const runtime = "nodejs";

import { connectDB } from "@/lib/mongoDB";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import fs from "fs";
import path from "path";
import { v4 as uuidv4 } from "uuid";
import MedicalAlertModel from "@/models/services/medicalAlertSchema";
import { authUser } from "@/middlewares/authMiddleware";
import { getShortenedUrl } from "@/utils/shortenUrl";

const saveFiles = async (formData, fieldName) => {
  const files = formData.getAll(fieldName);
  const savedFiles = [];
  const uploadDir = path.join(process.cwd(), "public", "uploads", "medical-alert");

  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }

  for (const file of files) {
    if (!file || typeof file.arrayBuffer !== "function") continue;

    const buffer = Buffer.from(await file.arrayBuffer());
    const safeName = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.\-_]/g, '_')}`;
    const filePath = path.join(uploadDir, safeName);
    fs.writeFileSync(filePath, buffer);

    savedFiles.push({
      //_id: uuidv4(),
      fileName: safeName,
      fileType: file.type,
    });
  }
  return savedFiles;
};

export async function POST(req) {
  try {
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

    // Extract basic fields
    const getString = (key) => formData.get(key)?.toString().trim();
    const age = parseInt(getString("age"), 10) || undefined;

    const qrCodeDetails = {
      qrCodeImage: getString("qrCodeImage") || "",
      scanCount: 0,
    lastScanAt: null,
    scanHistory: [
      
    ],
    lastScanLocation: {
      city: "",
      region: "",
      country: "",
      lat: null,
      lon: null,
    },
    qrCodeStatus: "inactive",

    };

    const plainPassword = getString("password");
    let hashedPassword = "";
    if (plainPassword) {
      const salt = await bcrypt.genSalt(10);
      hashedPassword = await bcrypt.hash(plainPassword, salt);
    }

    // Save files
    const medicalReports = await saveFiles(formData, "medicalReports");
    const prescription = await saveFiles(formData, "prescription");
    const insuranceImage = await saveFiles(formData, "insuranceImage");

    // Create DB record
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

    const qrUrl = await getShortenedUrl(`/medical-alerts/${newRecord._id}`);
    return NextResponse.json({ success: true, data: newRecord, qrUrl }, { status: 201 });
  } catch (err) {
    console.error("❌ POST Error:", err);
    return NextResponse.json(
      { success: false, error: err.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
