// import { connectDB } from "@/lib/mongoDB";
// import SmsModal from "@/models/services/smsSchema";

// export async function POST(request) {
//   try {
//     await connectDB();

//     const body = await request.json(); // ⬅️ Parse raw JSON
//     const { genderName, messageType, textMessage, password } = body;

//     const newSms = new SmsModal({
//       genderName,
//       messageType,
//       textMessage,
//       password,
//     });

//     await newSms.save();

//     return new Response(
//       JSON.stringify({ success: true, fileData: newSms }),
//       {
//         status: 201,
//         headers: { "Content-Type": "application/json" },
//       }
//     );
//   } catch (error) {
//     console.error("Error saving SMS message:", error);
//     return new Response(
//       JSON.stringify({ success: false, error: error.message }),
//       {
//         status: 500,
//         headers: { "Content-Type": "application/json" },
//       }
//     );
//   }
// }

import { connectDB } from "@/lib/mongoDB";
import { authUser } from "@/middlewares/authMiddleware";
import SmsModal from "@/models/services/smsSchema";

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

    // const form = await request.formData(); // ✅ Accept multipart form-data

    // const genderName = form.get("genderName");
    // const messageType = form.get("messageType");
    // const textMessage = form.get("textMessage");
    // const password = form.get("password");
const body = await request.json();
const { genderName, messageType, textMessage, password } = body;

    const newSms = new SmsModal({
      user:{
        id:user._id,
        name:user.name,
      },
      genderName,
      messageType,
      textMessage,
      password,

    });

    await newSms.save();

    return new Response(
      JSON.stringify({ success: true, fileData: newSms }),
      {
        status: 201,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error saving SMS message:", error);
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
