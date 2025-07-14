import { connectDB } from "@/lib/mongoDB";
import { authUser } from "@/middlewares/authMiddleware";
import CardsModel from "@/models/services/cardsSchema";
import URLServiceModel from "@/models/services/urlServicesSchema";
import { cloudinary } from "@/utils/cloudinary";
import bcrypt from "bcryptjs";

export const config = {
  api: {
    bodyParser: false, // Required for FormData
  },
};

const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB per file
const MAX_TOTAL_SIZE = 30 * 1024 * 1024; // 30MB total

export async function POST(req, context) {
  const { slug } = context.params;

  const auth = await authUser(req);
  if (auth.status !== 200) {
    return Response.json(auth.json, { status: auth.status });
  }

  const user = auth.user;
  await connectDB();

  const contentType = req.headers.get("content-type") || "";
  const isFormData = contentType.includes("multipart/form-data");

  // ✅ Handle services using FormData (includes file/image)
  if (isFormData) {
    const formData = await req.formData();
    const cardData = {};
    let totalSize = 0;

    // Handle text fields
    for (const [key, value] of formData.entries()) {
      if (key === "file") continue;

      if (key === "password" && value.trim()) {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(value, salt);
        cardData.password = hashedPassword;
      } else {
        cardData[key] = value;
      }
    }

    // ✅ Upload file to Cloudinary if present
    const file = formData.get("file");
    if (file && typeof file === "object") {
      if (file.size > MAX_FILE_SIZE) {
        return Response.json({ error: "File exceeds 2MB limit" }, { status: 400 });
      }

      totalSize += file.size;
      if (totalSize > MAX_TOTAL_SIZE) {
        return Response.json({ error: "Total upload exceeds 30MB" }, { status: 400 });
      }

      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      const mime = file.type;
      const base64 = buffer.toString("base64");
      const dataUri = `data:${mime};base64,${base64}`;

      const uploadResult = await cloudinary.uploader.upload(dataUri, {
        folder: slug,
      });

      cardData.profileImageUrl = uploadResult.secure_url; // ✅ save as string
    }

    // ✅ Save to CardsModel
    const newDoc = await CardsModel.create({
      user: {
        id: user._id,
        name: user.name,
      },
      serviceName: slug,
      ...cardData,
    });

    return Response.json({
      success: true,
      message: `${slug} service data submitted successfully`,
      data: newDoc,
    }, { status: 201 });
  }

  // ✅ Handle JSON-based services (no file, just URL + password)
  const body = await req.json();
  const { url, password } = body;

  const hashedPassword = password
    ? await bcrypt.hash(password, 10)
    : null;

  const result = await URLServiceModel.create({
    user: {
      id: user._id,
      name: user.name,
    },
    url,
    password: hashedPassword,
    serviceName: slug,
  });

  return Response.json({
    success: true,
    message: `${slug} service data submitted successfully`,
    data: result,
  }, { status: 201 });
}



// import { cookies } from "next/headers";
// import { connectDB } from "@/lib/mongoDB";
// import { authUser } from "@/middlewares/authMiddleware";
// import URLServiceModel from "@/models/services/urlServicesSchema";
// import { verifyToken } from "@/utils/verifyToken";
// import bcrypt from "bcrypt";

// export async function POST(req, context) {
//   try {
//     console.log("🚀 Request received");

//     const auth = await authUser(req);
    
//     if (auth.status !== 200) {
//       return new Response(JSON.stringify(auth.json), {
//         status: auth.status,
//         headers: { "Content-Type": "application/json" },
//       });
//     }
    
//     const user = auth.user; 
//     const { slug } = context.params;
//     const body = await req.json();
//     const { url, password } = body;
//     console.log("📦 Payload:", { url, password, slug });

//     await connectDB();
//     console.log("✅ Connected to DB");

//     // Hash password before saving
//     const saltRounds = 10;
//     const hashedPassword = password ? await bcrypt.hash(password, saltRounds) : null;

//     const result = await URLServiceModel.create({
//       user: {
//         id: user._id,
//         name: user.name,
//       },
//       url,
//       password: hashedPassword,
//       serviceName: slug,
//     });

//     return new Response(
//       JSON.stringify({ success: true, message: `${slug} Service Data submitted Successfully`, URLServicesData: result }),
//       {
//         status: 201,
//         headers: { "Content-Type": "application/json" },
//       }
//     );
//   } catch (error) {
//     console.error("❌ API error:", error);
//     return new Response(JSON.stringify({ error: error.message || "Something went wrong" }), {
//       status: 500,
//       headers: { "Content-Type": "application/json" },
//     });
//   }
// }
