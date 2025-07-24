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

// import { connectDB } from "@/lib/mongoDB";
// import { authUser } from "@/middlewares/authMiddleware";
// import SmsModal from "@/models/services/smsSchema";
// import bcrypt from "bcryptjs"; // ✅ Import bcrypt

// export async function POST(request) {
//   try {
//     // ✅ Step 1: Authenticate User
//     const auth = await authUser(request);
//     if (auth.status !== 200) {
//       return new Response(JSON.stringify(auth.json), {
//         status: auth.status,
//         headers: { "Content-Type": "application/json" },
//       });
//     }

//     const user = auth.user;
//     await connectDB();

//     // ✅ Step 2: Parse JSON body
//     const body = await request.json();
//     const { genderName, messageType, textMessage, password } = body;

//     // ✅ Step 3: Hash the password
//     const salt = await bcrypt.genSalt(10);
//     const hashedPassword = await bcrypt.hash(password, salt);

//     // ✅ Step 4: Create and save the document
//     const newSms = new SmsModal({
//       user: {
//         id: user._id,
//         name: user.name,
//       },
//       genderName,
//       messageType,
//       textMessage,
//       password: hashedPassword, // Store hashed password
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
import { getShortenedUrl } from "@/utils/shortenUrl";
import bcrypt from "bcryptjs";

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

    // ✅ Step 2: Parse JSON body
    const body = await request.json();
    const {
      genderName,
      messageType,
      textMessage,
      password = "",
      location = {},
      renewalDate = null,
      status = "active",
    } = body;

    // ✅ Step 3: Hash the password if provided
    let hashedPassword = "";
    if (password) {
      const salt = await bcrypt.genSalt(10);
      hashedPassword = await bcrypt.hash(password, salt);
    }

    // ✅ Step 4: Create and save the document
    const newSms = new SmsModal({
      user: {
        id: user._id,
        name: user.name,
      },
      genderName,
      messageType,
      textMessage,
      password: hashedPassword,
      scanCount: 0,
      location: {
        latitude: location.latitude ?? null,
        longitude: location.longitude ?? null,
        address: location.address ?? "",
      },
      renewalDate,
      status,
      resetPasswordToken: null,
      resetPasswordExpires: null,
    });

    await newSms.save();

    // const qrUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/sms/${newSms._id}`;

    const qrUrl = await getShortenedUrl(`/sms/${newSms._id}`);

    return new Response(
      JSON.stringify({
        success: true,
        message: "SMS message saved successfully!",
        data: newSms,
        qrUrl,
      }),
      {
        status: 201,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("❌ Error saving SMS message:", error);
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
