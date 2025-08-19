
import { connectDB } from "@/lib/mongoDB";
import { authUser } from "@/middlewares/authMiddleware";
import TextMessageModal from "@/models/services/textMessage";
import { getShortenedUrl } from "@/utils/shortenUrl";
import bcrypt from "bcryptjs";

export async function POST(request) {
  try {
    // ✅ Step 1: Authenticate user
    const auth = await authUser(request);
    if (auth.status !== 200) {
      return new Response(JSON.stringify(auth.json), {
        status: auth.status,
        headers: { "Content-Type": "application/json" },
      });
    }

    const user = auth.user;
    await connectDB();

    // ✅ Step 2: Parse body
    const body = await request.json();
    const {
      sender,
      message,
      bgDesign,
      password = "",
      qrCodeImage = ""
    } = body;
 

    // ✅ Step 3: Hash password if present
    let hashedPassword = null;
    if (password) {
      const salt = await bcrypt.genSalt(10);
      hashedPassword = await bcrypt.hash(password, salt);
    }

    // ✅ Step 4: Create document
    const newMessage = new TextMessageModal({
      user: {
        id: user._id,
        name: user.name,
      },
      sender,
      message,
      bgDesign,
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

    await newMessage.save();


    // const qrUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/textMessage/${newMessage._id}`;
    const qrUrl = await getShortenedUrl(`/textMessage/${newMessage._id}`);

    return new Response(
      JSON.stringify({ success: true,  data: newMessage, qrUrl }),
      {
        status: 201,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Server error:", error);
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
