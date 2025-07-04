import { connectDB } from "@/lib/mongoDB";
import { authUser } from "@/middlewares/authMiddleware";
import EventModel from "@/models/services/eventSchema";
 // make sure this path is correct

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

    // Parse JSON body (expects raw JSON, not FormData)
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
      contactPhone
    } = body;

    // Optional: Add validation here
    if (!title || !fromDate || !toDate) {
      return new Response(
        JSON.stringify({ success: false, error: "Title, From Date and To Date are required." }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

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
