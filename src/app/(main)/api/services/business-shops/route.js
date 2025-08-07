import { NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary";
import { connectDB } from "@/lib/mongoDB";
import { authUser } from "@/middlewares/authMiddleware";
import BusinessShopModal from "@/models/services/businessShopSchema";
import { getShortenedUrl } from "@/utils/shortenUrl";
import bcrypt from "bcryptjs";


export async function POST(req) {
  try {
    const auth = await authUser(req);
    if (auth.status !== 200) {
      return new Response(JSON.stringify(auth.json), {
        status: auth.status,
        headers: { "Content-Type": "application/json" },
      });
    }

    await connectDB();
    const user = auth.user;
    const formData = await req.formData();

    // Extract basic fields
    const businessName = formData.get("businessName");
    const businessType = formData.get("businessType");
    const description = formData.get("description");
    const shopTimings = formData.get("shopTimings");
    const discount = formData.get("discount");
    const plainPassword = formData.get("password");
    const selectedTemplate = formData.get("selectedTemplate");
    const bgDesign = formData.get("bgDesign");

    // Contact details
     const ownerName = formData.get("ownerName");
    const phone = formData.get("phone");
    const altPhone = formData.get("altPhone");
    const email = formData.get("email");
    const address = formData.get("address");
    const qrCodeImage = formData.get("qrCodeImage");

    // Upload shop logo
    let shopLogo = "";
    const logoFile = formData.get("shopLogo");
    if (logoFile && typeof logoFile === "object") {
      const logoBuffer = Buffer.from(await logoFile.arrayBuffer());
      const base64Logo = `data:${logoFile.type};base64,${logoBuffer.toString("base64")}`;
      const uploadRes = await cloudinary.uploader.upload(base64Logo, {
        folder: "businessShop/logos",
      });
      shopLogo = uploadRes.secure_url;
    }

    // Upload gallery images
    let shopImages = [];
    const galleryFiles = formData.getAll("shopImages");
    for (const file of galleryFiles) {
      if (file && typeof file === "object") {
        const buffer = Buffer.from(await file.arrayBuffer());
        const base64 = `data:${file.type};base64,${buffer.toString("base64")}`;
        const uploadRes = await cloudinary.uploader.upload(base64, {
          folder: "businessShop/gallery",
        });
        shopImages.push(uploadRes.secure_url);
      }
    }

    //password
    // Hash the password before storing
 const hashedPassword = plainPassword
      ? await bcrypt.hash(plainPassword, 10)
      : null;


    // Create the business shop entry
    const newShop = await BusinessShopModal.create({
      user: {
        id: user._id,
        name: user.name,
      },
      businessName,
      businessType,
      description,
      shopTimings,
      discount,
      password: hashedPassword,
      selectedTemplate,
      bgDesign,
      shopLogo,
      shopImages,
      contact: {
        ownerName,
        phone,
        altPhone,
        email,
        address,
      },
      qrCodeDetails: {
        qrCodeImage,
        scanCount: 0,
        location: {
          latitude: null,
          longitude: null,
          address: "",
        },
        renewalDate: null,
        status: "active",
        resetPasswordToken: null,
        resetPasswordExpires: null,
      },  
    });

     const qrUrl = await getShortenedUrl(`/business-shops/${newShop._id}`);

    return NextResponse.json({ success: true, message: " Business Shop data submitted successfully", data: newShop,qrUrl });
  } catch (error) {
    console.error("Upload Error:", error);
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
