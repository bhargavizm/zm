import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongoDB";
import { authUser } from "@/middlewares/authMiddleware";
import { cloudinary } from "@/utils/cloudinary";
import { getShortenedUrl } from "@/utils/shortenUrl";
import bcrypt from "bcrypt";
import KidsSafetyModal from "@/models/services/kidSafetySchema";

export async function POST(request) { 
  try {
    // ✅ Authenticate user
    const auth = await authUser(request);
    if (auth.status !== 200) {
      return NextResponse.json(auth.json, { status: auth.status });
    }
    const user = auth.user;

    // ✅ Connect to DB
    await connectDB();

    // ✅ Parse form data
    const formData = await request.formData();
    const childName = formData.get("childName");
    const dob = formData.get("dob");
    const classGrade = formData.get("classGrade");
    const schoolName = formData.get("schoolName");
    const schoolAddress = formData.get("schoolAddress");
    const schoolContact = formData.get("schoolContact");
    const parentName = formData.get("parentName");
    const contact = formData.get("contact");
    const contact2 = formData.get("contact2");
    const altContact = formData.get("altContact") || "[]";
    const homeAddress = formData.get("homeAddress");
    const mapLink = formData.get("mapLink");
    const bgDesign = formData.get("bgDesign");
    const plainPassword = formData.get("password");
    const files = formData.getAll("kidsImage");

    // ✅ Hash password if provided
    const hashedPassword = plainPassword
      ? await bcrypt.hash(plainPassword, 10)
      : null;

    // ✅ Upload images to Cloudinary
    const uploadedImages = [];
    for (const file of files) {
      if (!file || !file.arrayBuffer) continue;
      const buffer = Buffer.from(await file.arrayBuffer());
      const base64 = buffer.toString("base64");
      const dataUri = `data:${file.type};base64,${base64}`;
      const uploaded = await cloudinary.uploader.upload(dataUri, {
        folder: "kids-safety",
        public_id: file.name.split(".")[0],
      });
      uploadedImages.push({ url: uploaded.secure_url, name: file.name });
    }

    // ✅ Create DB entry
    const newEntry = new KidsSafetyModal({
      user: { id: user._id, name: user.name || user.email },
      childName,
      dob,
      classGrade,
      schoolName,
      schoolAddress,
      schoolContact,
      parentName,
      contact,
      contact2,
      altContact: JSON.parse(altContact),
      homeAddress,
      mapLink,
      bgDesign,
      password: hashedPassword,
      kidsImage: uploadedImages,
      qrCodeDetails: {
        qrCodeImage: formData.get("qrCodeImage") || "",
        scanCount: 0,
        lastScanAt: null,
        scanHistory: [],
        lastScanLocation: { city: "", region: "", country: "", lat: null, lon: null },
        qrCodeStatus: "inactive",
      },
    });

    await newEntry.save();

    // ✅ Generate short QR URL
    const qrUrl = await getShortenedUrl(`/kids-safety-qr-tags/${newEntry._id}`);

    return NextResponse.json(
      {
        success: true,
        message: "Kids Safety data submitted successfully",
        data: newEntry,
        qrUrl,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Kids Safety Upload Error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
