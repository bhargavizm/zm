// // app/api/wifi/route.js
// import { NextResponse } from "next/server";
// import { connectDB } from "@/lib/mongoDB";
// import WifiModel from "@/models/services/wifiSchema";

// import { connectDB } from "@/lib/mongoDB";

// export async function POST(req) {
//     try {
//         const body = await req.json();
//         const { ssid, security, password } = body;

//         if (!ssid || !security) {
//             return NextResponse.json({ error: "SSID and security are required." }, { status: 400 });
//         }

//         if (security !== "nopass" && (!password || password.length < 4)) {
//             return NextResponse.json({ error: "Password must be at least 4 characters." }, { status: 400 });
//         }

//         await connectDB();
//         const wifi = new WifiModel({ ssid, security, password: security === "nopass" ? "" : password });
//         await wifi.save();

//         return NextResponse.json({ message: "WiFi saved successfully!" }, { status: 201 });
//     } catch (error) {
//         return NextResponse.json({ error: "Failed to save WiFi." }, { status: 500 });
//     }
// }


// import { NextResponse } from "next/server";
// import { connectDB } from "@/lib/mongoDB";
// import WifiModel from "@/models/services/wifiSchema";
// import { authUser } from "@/middlewares/authMiddleware";

// export async function POST(req) {
//     try {
//         // ✅ Step 1: Authenticate User
//         const auth = await authUser(req);
//         if (auth.status !== 200) {
//             return new Response(JSON.stringify(auth.json), {
//                 status: auth.status,
//                 headers: { "Content-Type": "application/json" },
//             });
//         }

//         const user = auth.user;

//         const body = await req.json();
//         const { ssid, security, password, qrPassword } = body;

//         if (!ssid || !security) {
//             return NextResponse.json(
//                 { error: "SSID and security are required." },
//                 { status: 400 }
//             );
//         }

//         if (security !== "nopass" && (!password || password.length < 4)) {
//             return NextResponse.json(
//                 { error: "Password must be at least 4 characters." },
//                 { status: 400 }
//             );
//         }

//         await connectDB();
//         const wifi = new WifiModel({
//             ssid,
//             security,
//             password: security === "nopass" ? "" : password,
//             qrPassword
//         });
//         await wifi.save();

//         return NextResponse.json(
//             { message: "WiFi saved successfully!" },
//             { status: 201 }
//         );
//     } catch (error) {
//         return NextResponse.json(
//             { error: "Failed to save WiFi." },
//             { status: 500 }
//         );
//     }
// }

// import { NextResponse } from "next/server";
// import { connectDB } from "@/lib/mongoDB";
// import WifiModel from "@/models/services/wifiSchema";
// import { authUser } from "@/middlewares/authMiddleware";

// export async function POST(req) {
//   try {
//     // ✅ Authenticate User
//     const auth = await authUser(req);
//     if (auth.status !== 200) {
//       return new Response(JSON.stringify(auth.json), {
//         status: auth.status,
//         headers: { "Content-Type": "application/json" },
//       });
//     }

//     const user = auth.user;

//     // ✅ Parse Body
//     const body = await req.json();
//     const {
//       ssid,
//       security,
//       password = "",
//       qrPassword = "",
//       location = {},
//       renewalDate = null,
//       status = "active",
//     } = body;

//     if (!ssid || !security) {
//       return NextResponse.json(
//         { error: "SSID and security are required." },
//         { status: 400 }
//       );
//     }

//     if (security !== "nopass" && (!password || password.length < 4)) {
//       return NextResponse.json(
//         { error: "Password must be at least 4 characters." },
//         { status: 400 }
//       );
//     }

//     // ✅ Connect to MongoDB
//     await connectDB();

//     const wifi = new WifiModel({
//       user: {
//         id: user._id,
//         name: user.name,
//       },
//       ssid,
//       security,
//       password: security === "nopass" ? "" : password,
//      qrCodeDetails: {
//     qrCodeImage: body.qrCodeImage ?? "",

//     location: {
//       latitude: location.latitude ?? null,
//       longitude: location.longitude ?? null,
//       address: location.address ?? "",
//     },
//     renewalDate,
//     status,
//     resetPasswordToken: null,
//     resetPasswordExpires: null,
//   },
//     });

//     await wifi.save();

//     return NextResponse.json(
//       {
//         message: "WiFi saved successfully!",
//        wifi
//       },
//       { status: 201 }
//     );
//   } catch (error) {
//     console.error("❌ Error in POST /api/services/wifi:", error);
//     return NextResponse.json(
//       { error: "Failed to save WiFi." },
//       { status: 500 }
//     );
//   }
// }


import { connectDB } from "@/lib/mongoDB";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import MedicalAlertModel from "@/models/services/medicalAlertSchema";
import { authUser } from "@/middlewares/authMiddleware";

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

    // ✅ Parse multipart form-data
    const formData = await req.formData();
    console.log("🧾 Form Keys:", Array.from(formData.keys()));

    // Basic fields
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

    // ✅ QR Code Details
    const qrCodeImage = formData.get("qrCodeImage") ?? "";
    const latitude = formData.get("latitude") ?? null;
    const longitude = formData.get("longitude") ?? null;
    const address = formData.get("address") ?? "";
    const renewalDate = formData.get("renewalDate") ?? null;
    const status = formData.get("status") ?? "active";

    // ✅ File upload processing
    const maxFileSize = 2 * 1024 * 1024;
    const maxTotalSize = 30 * 1024 * 1024;
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
          throw new Error(`Total file size exceeds 30MB.`);
        }

        processed.push({
          fileName: file.name,
          fileType: file.type,
          // content: Buffer.from(buffer).toString('base64') // optional
        });
      }

      return processed;
    };

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

    // ✅ Hash the password
    let hashedPassword = "";
    if (plainPassword && plainPassword.trim() !== "") {
      const salt = await bcrypt.genSalt(10);
      hashedPassword = await bcrypt.hash(plainPassword.trim(), salt);
    }

    // ✅ Create document in DB
    const newRecord = await MedicalAlertModel.create({
      user: {
        id: user._id,
        name: user.name,
      },
      patientInfo: { patientName, age, bloodType },
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

      // ✅ Add qrCodeDetails here
      qrCodeDetails: {
        qrCodeImage,
        location: {
          latitude,
          longitude,
          address,
        },
        renewalDate,
        status,
        resetPasswordToken: null,
        resetPasswordExpires: null,
      },
    });

    console.log("✅ Medical Alert form submitted successfully!");

    return NextResponse.json({ success: true, data: newRecord }, { status: 201 });

  } catch (err) {
    console.error("❌ POST error:", err);
    return NextResponse.json(
      { success: false, error: err.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
