import { connectDB } from "@/lib/mongoDB";
import { authUser } from "@/middlewares/authMiddleware";
import URLServiceModel from "@/models/services/urlServicesSchema";
import { getShortenedUrl } from "@/utils/shortenUrl";
import bcrypt from "bcryptjs";

export const config = {
  api: {
    bodyParser: false, // Required for FormData
  },
};

export async function POST(req, context) {
  try {
    const { slug } = context.params;

    const auth = await authUser(req);
    if (auth.status !== 200) {
      return Response.json(auth.json, { status: auth.status });
    }

    const user = auth.user;
    await connectDB();

    const body = await req.json();
    const {
      url,
      password,qrCodeImage 
    } = body;

    const hashedPassword = password ? await bcrypt.hash(password, 10) : null;

   const result = await URLServiceModel.create({
  user: {
    id: user._id,
    name: user.name,
  },
  url,
  password: hashedPassword,
  serviceName: slug,
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


    const qrUrl = await getShortenedUrl(`/${slug}/${result._id}`);
    return Response.json(
      {
        success: true,
        message: `${slug} service data submitted successfully`,
        data: result,
        qrUrl,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating service:", error);
    return Response.json(
      {
        success: false,
        message: "Upload failed",
        error: error.message || "Internal Server Error",
      },
      { status: 500 }
    );
  }
}

