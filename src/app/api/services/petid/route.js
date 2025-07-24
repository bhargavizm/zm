// import { NextResponse } from "next/server";
// import { connectDB } from "@/lib/mongoDB";
// import PetTagModal from "@/models/services/petIdSchema";
// import { authUser } from "@/middlewares/authMiddleware"; // ✅ make sure this is imported
// import { v2 as cloudinary } from "cloudinary";

// // 🔐 Cloudinary Configuration
// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// });

// export async function POST(req) {
//   try {
//     // Step 1: Auth
//     const auth = await authUser(req);
//     if (auth.status !== 200) {
//       return NextResponse.json(auth.json, { status: auth.status });
      
//     }

//     await connectDB();
//     const user = auth.user;
//     const body = await req.json();
//     const {
//             image,
//             qrPassword = "",
//             location = {},
//             renewalDate = null,
//             status = "active",
//             ...rest
//           } = body;

//        let imageUrl = "";
//     let publicId = "";
    

//     // Step 2: Upload image if provided
//     if (image) {
//       // Optional: Validate image base64 format
//       if (!image.startsWith("data:image/")) {
//         return NextResponse.json(
//           { message: "Invalid image format. Must be a base64 image string." },
//           { status: 400 }
//         );
//       }

//       const uploadResponse = await cloudinary.uploader.upload(image, {
//         folder: "pet-id-tags",
//       });

//       imageUrl = uploadResponse.secure_url;
//       publicId = uploadResponse.public_id;
//     }

//     // Step 3: Create document
//     const newPetTag = new PetTagModal({
//       ...rest,
//       user: {
//         id: user._id,
//         name: user.name || user.email,
//       },
//       imageUrl,
//       publicId,

//         qrCodeDetails: {
//     qrCodeImage: body.qrCodeImage ?? "",

//     location: {
//       latitude: location.latitude ?? null,
//       longitude: location.longitude ?? null,
//       address: location.address ?? "",
//     },
//     renewalDate,
//     status,
//     resetPasswordToken: null,
//     resetPasswordExpires: null,
//   },
//     });

//     await newPetTag.save();

//     return NextResponse.json(
//       { message: "Pet ID Tag created successfully!" },
//       { status: 201 }
//     );
//   } catch (error) {
//     console.error("POST Error:", error);
//     return NextResponse.json(
//       { message: "Internal Server Error", error: error.message },
//       { status: 500 }
//     );
//   }
// }

// app/api/services/pet-id/route.js
// app/api/services/petid/route.js

import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongoDB";
import PetTagModal from "@/models/services/petIdSchema";
import { authUser } from "@/middlewares/authMiddleware";
import { v2 as cloudinary } from "cloudinary";

// ✅ Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(req) {
  try {
    // ✅ 1. Authenticate the user
    const auth = await authUser(req);
    if (auth.status !== 200) {
      return NextResponse.json(auth.json, { status: auth.status });
    }

    const user = auth.user;
    await connectDB();

    // ✅ 2. Read the request body
    const body = await req.json();
    const {
      image,
      qrPassword = "",
      qrCodeImage = "",
      location = {},
      renewalDate = null,
      status = "active",
      ...rest
    } = body;

    let imageUrl = "";
    let publicId = "";

    // ✅ 3. Upload to Cloudinary if image is provided
    if (image) {
      if (!image.startsWith("data:image/")) {
        return NextResponse.json(
          { message: "Image must be base64 string" },
          { status: 400 }
        );
      }

      const uploadedImage = await cloudinary.uploader.upload(image, {
        folder: "pet-id-tags",
      });

      imageUrl = uploadedImage.secure_url;
      publicId = uploadedImage.public_id;
    }

    // ✅ 4. Create the Pet Tag document
    const newPetTag = new PetTagModal({
      ...rest,
      user: {
        id: user._id,
        name: user.name || user.email,
      },
      imageUrl,
      publicId,
      qrPassword,
      qrCodeDetails: {
        qrCodeImage,
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

    // ✅ 5. Save it to MongoDB
    await newPetTag.save();

    return NextResponse.json(
      { message: "✅ Pet ID Tag Created Successfully!" },
      { status: 201 }
    );
  } catch (error) {
    console.error("❌ Pet ID POST Error:", error);
    return NextResponse.json(
      {
        message: "Something went wrong",
        error: error.message,
      },
      { status: 500 }
    );
  }
}


