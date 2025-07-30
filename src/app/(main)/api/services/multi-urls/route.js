import { NextResponse } from "next/server";

import { connectDB } from "@/lib/mongoDB";
import { authUser } from "@/middlewares/authMiddleware";
import { getShortenedUrl } from "@/utils/shortenUrl";
import MultiUrlModal from "@/models/services/multiUrlSchema";
import bcrypt from "bcryptjs"
// URL validation regex
const isValidUrl = (url) => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

export async function POST(req) {
    const auth = await authUser(req);
          
          if (auth.status !== 200) {
            return new Response(JSON.stringify(auth.json), {
              status: auth.status,
              headers: { "Content-Type": "application/json" },
            });
          }
          
          const user = auth.user; 
  await connectDB();

  try {
    const body = await req.json();

    const { socialLinks = {}, customLinks = [], password = "" , bgDesign = "", qrPassword = "", 
      location = {},
      renewalDate = null,
      status = "active",} = body;

    // Validate social links
    // const socialPlatforms = ["youtube", "instagram", "twitter", "linkedin", "facebook", "custom"];
    // for (const platform of socialPlatforms) {
    //   const url = socialLinks[platform];
    //   if (url && !isValidUrl(url)) {
    //     return NextResponse.json(
    //       { error: `Invalid URL for ${platform}` },
    //       { status: 400 }
    //     );
    //   }
    // }

    // // Validate custom links
    // for (const link of customLinks) {
    //   if (!link.label || !link.url) {
    //     return NextResponse.json(
    //       { error: "Each custom link must have both label and URL" },
    //       { status: 400 }
    //     );
    //   }
    //   if (!isValidUrl(link.url)) {
    //     return NextResponse.json(
    //       { error: `Invalid URL for custom link "${link.label}"` },
    //       { status: 400 }
    //     );
    //   }
    // }
     // ✅ Step 3: Hash the password if provided
        let hashedPassword = "";
        if (password) {
          const salt = await bcrypt.genSalt(10);
          hashedPassword = await bcrypt.hash(password, salt);
        }

    const newMultiUrl = new MultiUrlModal({
       user: {
        id: user._id,
        name: user.name,
      },
      socialLinks,
      customLinks,
      password : hashedPassword,
      bgDesign,
      qrCodeDetails: {
    qrCodeImage: body.qrCodeImage ?? "",

    location: {
      latitude: location.latitude ?? null,
      longitude: location.longitude ?? null,
      address: location.address ?? "",
    },
    renewalDate,
    status,
    resetPasswordToken: null,
    resetPasswordExpires: null,
  },
    });

    await newMultiUrl.save();
    const qrUrl = await getShortenedUrl(`/multi-urls/${newMultiUrl._id}`);

    return NextResponse.json(
      { success: true, message: "Multi URL content saved successfully" ,data:newMultiUrl,qrUrl},
      
      { status: 201 },
     
    );

  } catch (error) {
    console.error("Error saving Multi URL data:", error);
    return NextResponse.json(
      { error: "Something went wrong while saving data" },
      { status: 500 }
    );
  }
}
