import { NextResponse } from "next/server";
import MultiUrlModal from "@/models/services/multiUrlSchema";
import { connectDB } from "@/lib/mongoDB";

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
  
  await connectDB();

  try {
    const body = await req.json();

    const { socialLinks = {}, customLinks = [], password = "" } = body;

    // Validate social links
    const socialPlatforms = ["youtube", "instagram", "twitter", "linkedin", "facebook", "custom"];
    for (const platform of socialPlatforms) {
      const url = socialLinks[platform];
      if (url && !isValidUrl(url)) {
        return NextResponse.json(
          { error: `Invalid URL for ${platform}` },
          { status: 400 }
        );
      }
    }

    // Validate custom links
    for (const link of customLinks) {
      if (!link.label || !link.url) {
        return NextResponse.json(
          { error: "Each custom link must have both label and URL" },
          { status: 400 }
        );
      }
      if (!isValidUrl(link.url)) {
        return NextResponse.json(
          { error: `Invalid URL for custom link "${link.label}"` },
          { status: 400 }
        );
      }
    }

    const newMultiUrl = new MultiUrlModal({
      socialLinks,
      customLinks,
      password,
    });

    await newMultiUrl.save();

    return NextResponse.json(
      { message: "Multi URL content saved successfully" ,multiUrldata:newMultiUrl},
      
      { status: 201 }
    );

  } catch (error) {
    console.error("Error saving Multi URL data:", error);
    return NextResponse.json(
      { error: "Something went wrong while saving data" },
      { status: 500 }
    );
  }
}
