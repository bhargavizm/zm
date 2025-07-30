import { BusinessCardsModel } from "@/models/services/cardsSchema";
import { CardsServicesRoute } from "../../common/cardsServicesRoute";



export async function POST(request) {
  return CardsServicesRoute({
    request,
    model: BusinessCardsModel,
    serviceName: "business-cards",
    imageUploadFolder: "profile_images", // Optional custom folder
  });
}


// import { connectDB } from "@/lib/mongoDB";
// import { authUser } from "@/middlewares/authMiddleware";
// import CardsModel, { BusinessCardsModel } from "@/models/services/cardsSchema";
// import { cloudinary } from "@/utils/cloudinary";
// import { getShortenedUrl } from "@/utils/shortenUrl";
// import bcrypt from "bcryptjs";
// import { NextResponse } from "next/server";

// export const config = {
//   api: {
//     bodyParser: false,
//   },
// };

// export async function POST(request) {
//   try {
//     const auth = await authUser(request);
//     if (auth.status !== 200) {
//       return new Response(JSON.stringify(auth.json), {
//         status: auth.status,
//         headers: { "Content-Type": "application/json" },
//       });
//     }

//     const user = auth.user;
//     await connectDB();

//     const formData = await request.formData();

//     // 🔐 Basic fields
//     const name = formData.get("name");
//     const subheading = formData.get("subheading");
//     const mobile = formData.get("mobile");
//     const designation = formData.get("designation");
//     const email = formData.get("email");
//     const mapLink = formData.get("mapLink");
//     const socialLink = formData.get("socialLink");
//     const socialLink2 = formData.get("socialLink2");
//     const address = formData.get("address");
//     const plainPassword = formData.get("password");
//     const selectedTemplate = formData.get("selectedTemplate");
//     const bgDesign = formData.get("bgDesign");

//     // 🔐 Hash password if provided
//     const hashedPassword = plainPassword
//       ? await bcrypt.hash(plainPassword, 10)
//       : null;

//     // 🖼️ Handle profile image upload
//     let profileImageUrl = "";
//     const file = formData.get("profileImageUrl") || formData.get("file"); // fallback

//     if (file && typeof file.arrayBuffer === "function") {
//       const arrayBuffer = await file.arrayBuffer();
//       const sizeInBytes = arrayBuffer.byteLength;
//       const sizeInMB = (sizeInBytes / (1024 * 1024)).toFixed(2);

//       // ⛔ Single file limit: 2MB
//       if (sizeInBytes > 2 * 1024 * 1024) {
//         return NextResponse.json(
//           {
//             success: false,
//             error: `❌ ${file.name} is ${sizeInMB}MB and exceeds 2MB limit.`,
//           },
//           { status: 400 }
//         );
//       }

//       const buffer = Buffer.from(arrayBuffer);
//       const base64 = buffer.toString("base64");
//       const dataUri = `data:${file.type};base64,${base64}`;

//       const uploaded = await cloudinary.uploader.upload(dataUri, {
//         folder: "profile_images",
//         public_id: file.name?.split(".")[0],
//       });

//       profileImageUrl = uploaded.secure_url;
//     }

//     const newCard = new BusinessCardsModel({
//       user: { id: user._id, name: user.name },

//       name,
//       subheading,
//       mobile,
//       designation,
//       email,
//       mapLink,
//       socialLink,
//       socialLink2,
//       address,
//       password: hashedPassword,
//       selectedTemplate,
//       bgDesign,
//       profileImageUrl,
//     });

//     await newCard.save();

//     const qrUrl = await getShortenedUrl(`/business-cards/${newCard._id}`);

//     return NextResponse.json(
//       {
//         success: true,
//         message: "Business card submitted successfully",
//         data: newCard,
//         qrUrl,
//       },
//       { status: 201 }
//     );
//   } catch (error) {
//     console.error("Business card POST error:", error);
//     return NextResponse.json(
//       { success: false, error: error.message },
//       { status: 500 }
//     );
//   }
// }
