import { connectDB } from "@/lib/mongoDB";
import { authUser } from "@/middlewares/authMiddleware";
import PropertyModal from "@/models/services/propertySchema";
import { cloudinary } from "@/utils/cloudinary";
import { getShortenedUrl } from "@/utils/shortenUrl";
import bcrypt from "bcryptjs";

export const config = {
  api: {
    bodyParser: false,
  },
  runtime: "nodejs",
};

export async function POST(request) {
  try {
    // Authenticate user
    const auth = await authUser(request);
    if (auth.status !== 200) {
      return new Response(JSON.stringify(auth.json), {
        status: auth.status,
        headers: { "Content-Type": "application/json" },
      });
    }
    const user = auth.user;

    await connectDB();

    // Check content-type header
    const contentType = request.headers.get("content-type") || "";
    if (!contentType.includes("multipart/form-data")) {
      return new Response(
        JSON.stringify({ success: false, error: "Expected multipart/form-data" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const formData = await request.formData();

    // --- Debug log all keys and values ---
    for (const [key, value] of formData.entries()) {
      if (value instanceof File) {
        // console.log(`Key: ${key}, File name: ${value.name}, size: ${value.size}`);
      } else {
        // console.log(`Key: ${key}, Value: ${value}`);
      }
    }

    // Extract password and log it
    const password = formData.get("password");
    // console.log("Password extracted:", password);

    // Hash password if valid
    let hashedPassword = null;
    if (password && password.length >= 1) {
      const salt = await bcrypt.genSalt(10);
      hashedPassword = await bcrypt.hash(password, salt);
      // console.log("Hashed password:", hashedPassword);
    }

    // Other form fields
    const bgDesign = formData.get("bgDesign") || "";

    const basicInfo = {
      propertyName: formData.get("propertyName") || "",
      propertyType: formData.get("propertyType") || "",
      ownerName: formData.get("ownerName") || "",
      contactNumber: formData.get("contactNumber") || "",
      alternateNumber: formData.get("alternateNumber") || "",
      propertyDescription: formData.get("propertyDescription") || "",
    };

    const addressInfo = {
      address: formData.get("address") || "",
      mapLink: formData.get("mapLink") || "",
    };

    const pricingInfo = {
      price: formData.get("price") || "",
      area: formData.get("area") || "",
      amenities: formData.getAll("amenities").map(String),
    };

    // Handle gallery images upload
    const galleryImages = formData.getAll("galleryImages");
    let totalSize = 0;

    for (const file of galleryImages) {
      totalSize += file.size;
      // if (file.size > 2 * 1024 * 1024) {
      //   return new Response(
      //     JSON.stringify({ success: false, error: `Each file must be ≤ 2MB. File ${file.name} is too large.` }),
      //     { status: 400, headers: { "Content-Type": "application/json" } }
      //   );
      // }
    }
    if (totalSize > 30 * 1024 * 1024) {
      return new Response(
        JSON.stringify({ success: false, error: "Total file size must be ≤ 30MB" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const galleryImageUrls = [];
    for (const file of galleryImages) {
      const buffer = Buffer.from(await file.arrayBuffer());
      const base64 = buffer.toString("base64");
      const dataUri = `data:${file.type};base64,${base64}`;

      try {
        const uploadResult = await cloudinary.uploader.upload(dataUri, {
          folder: "property-gallery",
          resource_type: "auto",
        });
        galleryImageUrls.push(uploadResult.secure_url);
      } catch (err) {
        console.error(`Cloudinary upload failed for file ${file.name}:`, err);
        return new Response(
          JSON.stringify({ success: false, error: `Upload failed for ${file.name}: ${err.message}` }),
          { status: 500, headers: { "Content-Type": "application/json" } }
        );
      }
    }

    // QR code metadata fields
    const qrCodeImage = formData.get("qrCodeImage") || "";
    const qrPassword = formData.get("qrPassword") || "";

    const location = {
      latitude: formData.get("latitude") || null,
      longitude: formData.get("longitude") || null,
      address: formData.get("locationAddress") || "",
    };

    const renewalDate = formData.get("renewalDate") || null;
    const status = formData.get("status") || "active";

    // Save to DB
    const newProperty = new PropertyModal({
      user: {
        id: user._id,
        name: user.name,
      },
      basicInfo,
      addressInfo,
      pricingInfo,
      bgDesign,
      images: {
        galleryImages: galleryImageUrls,
      },
      password: hashedPassword,
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

    const saved = await newProperty.save();
    const qrUrl = await getShortenedUrl(`/property-qr/${saved._id}`);

    return new Response(
      JSON.stringify({ success: true, data: saved, qrUrl }),
      { status: 201, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Server error:", error);
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
