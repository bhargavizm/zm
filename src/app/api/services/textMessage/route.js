import { connectDB } from "@/lib/mongoDB";
import { authUser } from "@/middlewares/authMiddleware";
import TextMessageModal from "@/models/services/textMessage";
import bcrypt from "bcryptjs"; // ✅ Import bcryptjs

export async function POST(request) {
  try {
    // ✅ Step 1: Authenticate User
    const auth = await authUser(request);
    if (auth.status !== 200) {
      return new Response(JSON.stringify(auth.json), {
        status: auth.status,
        headers: { "Content-Type": "application/json" },
      });
    }

    const user = auth.user;

    await connectDB();

    // ✅ Step 2: Accept raw JSON
    let body;
    try {
      body = await request.json();
    } catch (error) {
      return new Response(
        JSON.stringify({ success: false, error: "Invalid JSON body" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    const { sender, message, password } = body;

    // ✅ Step 3: Validate required fields
    if (!message) {
      return new Response(
        JSON.stringify({ success: false, error: "Missing required fields" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // ✅ Step 4: Hash the password (if provided)
    let hashedPassword = null;
    if (password) {
      const salt = await bcrypt.genSalt(10);
      hashedPassword = await bcrypt.hash(password, salt);
    }

    // ✅ Step 5: Save to DB
    const newMessage = new TextMessageModal({
      user: {
        id: user._id,
        name: user.name,
      },
      sender,
      message,
      password: hashedPassword, // Store hashed password
    });

    await newMessage.save();

    return new Response(
      JSON.stringify({ success: true, fileData: newMessage }),
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

