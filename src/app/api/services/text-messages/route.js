// import { connectDB } from "@/lib/mongoDB";
// import { authUser } from "@/middlewares/authMiddleware";
// import TextMessageModal from "@/models/services/textMessage";
// import bcrypt from "bcryptjs"; // ✅ Import bcryptjs

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

//     // ✅ Step 2: Accept raw JSON
//     let body;
//     try {
//       body = await request.json();
//     } catch (error) {
//       return new Response(
//         JSON.stringify({ success: false, error: "Invalid JSON body" }),
//         {
//           status: 400,
//           headers: { "Content-Type": "application/json" },
//         }
//       );
//     }

//     const { sender, message, password } = body;

//     // ✅ Step 3: Validate required fields
//     // if (!message) {
//     //   return new Response(
//     //     JSON.stringify({ success: false, error: "Missing required fields" }),
//     //     {
//     //       status: 400,
//     //       headers: { "Content-Type": "application/json" },
//     //     }
//     //   );
//     // }

//     // ✅ Step 4: Hash the password (if provided)
//     let hashedPassword = null;
//     if (password) {
//       const salt = await bcrypt.genSalt(10);
//       hashedPassword = await bcrypt.hash(password, salt);
//     }

//     // ✅ Step 5: Save to DB
//     const newMessage = new TextMessageModal({
//       user: {
//         id: user._id,
//         name: user.name,
//       },
//       sender,
//       message,
//       password: hashedPassword, // Store hashed password
//     });

//     await newMessage.save();

//     return new Response(
//       JSON.stringify({ success: true, fileData: newMessage }),
//       {
//         status: 201,
//         headers: { "Content-Type": "application/json" },
//       }
//     );
//   } catch (error) {
//     console.error("Server error:", error);
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
      password = "",
      qrPassword = "",
      location = {},
      renewalDate = null,
      status = "active",
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
      password: hashedPassword,
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

    await newMessage.save();

    
        const qrUrl = await getShortenedUrl(`/textMessage/${newMessage._id}`);

    return new Response(
      JSON.stringify({ success: true, data: newMessage, qrUrl }),
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
