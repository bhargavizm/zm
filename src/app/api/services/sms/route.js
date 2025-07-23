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
import bcrypt from "bcryptjs";

export async function POST(request) {
  try {
    const auth = await authUser(request);
    if (auth.status !== 200) {
      return new Response(JSON.stringify(auth.json), {
        status: auth.status,
        headers: { "Content-Type": "application/json" },
      });
    }

    const user = auth.user;
    await connectDB();

    const body = await request.json();
    const { genderName, messageType, textMessage, password } = body;

   let hashedPassword = null;
if (password && password.trim() !== "") {
  const salt = await bcrypt.genSalt(10);
  hashedPassword = await bcrypt.hash(password.trim(), salt);
}

    // Step 1: Save the SMS document
    const newSms = new SmsModal({
      user: {
        id: user._id,
        name: user.name,
      },
      genderName,
      messageType,
      textMessage,
      password: hashedPassword,
    });

    await newSms.save(); // ✅ Save first to get _id

    // Step 2: Generate QR URL using the _id
    const qrUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/sms/${newSms._id}`;

    // (Optional) You can also generate QR matrix here if needed
    // const qrMatrix = generateQRMatrix(qrUrl);

    return new Response(
      JSON.stringify({ success: true, fileData: newSms, qrUrl }),
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
