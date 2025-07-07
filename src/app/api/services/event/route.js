import { connectDB } from "@/lib/mongoDB";
import { authUser } from "@/middlewares/authMiddleware";
import EventModel from "@/models/services/eventSchema";
import bcrypt from "bcryptjs"; // ✅ Import bcrypt

export async function POST(request) {
  try {
    // ✅ Authenticate user
    const auth = await authUser(request);
    if (auth.status !== 200) {
      return new Response(JSON.stringify(auth.json), {
        status: auth.status,
        headers: { "Content-Type": "application/json" },
      });
    }

    const user = auth.user;
    await connectDB();

    // ✅ Parse request body
    const body = await request.json();
    const {
      organizer,
      title,
      summary,
      fromDate,
      toDate,
      venue,
      address,
      contactName,
      contactEmail,
      contactPhone,
      password, // ✅ Receive password from frontend
    } = body;

    // ✅ Optional validation
    // if (!title || !fromDate || !toDate) {
    //   return new Response(
    //     JSON.stringify({ success: false, error: "Title, From Date, and To Date are required." }),
    //     { status: 400, headers: { "Content-Type": "application/json" } }
    //   );
    // }

    // ✅ Hash password if provided
    let hashedPassword = "";
    if (password && password.trim().length >= 4) {
      hashedPassword = await bcrypt.hash(password.trim(), 10);
    } else if (password && password.trim().length < 4) {
      return new Response(
        JSON.stringify({ success: false, error: "Password must be at least 4 characters long." }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // ✅ Create event
    const newEvent = new EventModel({
      user: {
        id: user._id,
        name: user.name,
      },
      organizer,
      title,
      summary,
      fromDate,
      toDate,
      venue,
      address,
      contactName,
      contactEmail,
      contactPhone,
      password: hashedPassword, // ✅ Save hashed password
    });

    await newEvent.save();

    return new Response(
      JSON.stringify({ success: true, fileData: newEvent }),
      {
        status: 201,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Event creation error:", error);
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}

