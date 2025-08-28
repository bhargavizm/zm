// ✅ /app/api/services/common/handleCardService.js

import { connectDB } from "@/lib/mongoDB";
import { authUser } from "@/middlewares/authMiddleware";
import { cloudinary } from "@/utils/cloudinary";
import { getShortenedUrl } from "@/utils/shortenUrl";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export const config = {
  api: {
    bodyParser: false,
  },
};

export async function CardsServicesRoute({
  request,
  model,
  serviceName,
  imageUploadFolder = "profile_images",
}) {
  try {
    const auth = await authUser(request);
    if (auth.status !== 200) {
      return new Response(JSON.stringify(auth.json), {
        status: auth.status,
        headers: { "Content-Type": "application/json" },
      });
    }

    const user = auth.user;
    await connectDB(); 

    const formData = await request.formData();

    // 🔐 Basic fields
    const name = formData.get("name");
    const subheading = formData.get("subheading");
    const mobile = formData.get("mobile");
    const designation = formData.get("designation");
    const email = formData.get("email");
    const mapLink = formData.get("mapLink");
    const socialLink = formData.get("socialLink");
    const socialLink2 = formData.get("socialLink2");
    const address = formData.get("address");
    const plainPassword = formData.get("password");
    const selectedTemplate = formData.get("selectedTemplate");
    const bgDesign = formData.get("bgDesign");
    const qrCodeImage = formData.get("qrCodeImage");

    const hashedPassword = plainPassword
      ? await bcrypt.hash(plainPassword, 10)
      : null;

    // 🖼️ Profile image upload (if any)
    let profileImageUrl = "";
    const file = formData.get("profileImageUrl") || formData.get("file");

    if (file && typeof file.arrayBuffer === "function") {
      const arrayBuffer = await file.arrayBuffer();
      const sizeInBytes = arrayBuffer.byteLength;
      const sizeInMB = (sizeInBytes / (1024 * 1024)).toFixed(2);



      const base64 = Buffer.from(arrayBuffer).toString("base64");
      const dataUri = `data:${file.type};base64,${base64}`;

      const uploaded = await cloudinary.uploader.upload(dataUri, {
        folder: imageUploadFolder,
        public_id: file.name?.split(".")[0],
      });

      profileImageUrl = uploaded.secure_url;
    }

    const newDoc = await model.create({
      user: { id: user._id, name: user.name },
      name,
      subheading,
      mobile,
      designation,
      email,
      mapLink,
      socialLink,
      socialLink2,
      address,
      password: hashedPassword,
      selectedTemplate,
      bgDesign,
      profileImageUrl,
 qrCodeDetails: {
    qrCodeImage,
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
  },
    });

    const qrUrl = await getShortenedUrl(`/${serviceName}/${newDoc._id}`);

    return NextResponse.json(
      {
        success: true,
        message: `${serviceName} card submitted successfully`,
        data: newDoc,
        qrUrl,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error(`${serviceName} POST error:`, error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
