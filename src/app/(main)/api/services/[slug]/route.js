import { connectDB } from "@/lib/mongoDB";
import { authUser } from "@/middlewares/authMiddleware";
import CardsModel from "@/models/services/cardsSchema";
import URLServiceModel from "@/models/services/urlServicesSchema";
import { cloudinary } from "@/utils/cloudinary";
import { getShortenedUrl, getShortenedUrlServices } from "@/utils/shortenUrl";
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

  // ✅ Handle FormData (cards, v-cards, etc.)
  if (isFormData) {
    const formData = await req.formData();
    const cardData = {};
    let totalSize = 0;

    for (const [key, value] of formData.entries()) {
      if (key === "file") continue;

      if (key === "password" && value.trim()) {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(value, salt);
        cardData.password = hashedPassword;
      }  else if (key.startsWith("qrCodeDetails.")) {
  const fieldPath = key.split(".").slice(1); // remove 'qrCodeDetails'
  cardData.qrCodeDetails = cardData.qrCodeDetails || {};
  let current = cardData.qrCodeDetails;

  for (let i = 0; i < fieldPath.length; i++) {
    const part = fieldPath[i];
    if (i === fieldPath.length - 1) {
      // Convert types accordingly
      if (["latitude", "longitude"].includes(part)) {
        current[part] = parseFloat(value);
      } else if (["scanCount"].includes(part)) {
        current[part] = parseInt(value);
      } else if (["renewalDate"].includes(part)) {
        current[part] = new Date(value);
      } else {
        current[part] = value;
      }
    } else {
      // current[part] = current[part] || {};
      // current = current[part];
       cardData[key] = value;
    }
  }
}

       else {
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

      cardData.profileImageUrl = uploadResult.secure_url;

      
    }

     cardData.qrCodeDetails = {
      qrCodeImage: cardData.qrCodeDetails?.qrCodeImage ?? "",
      location: {
        latitude: cardData.qrCodeDetails?.location?.latitude ?? null,
        longitude: cardData.qrCodeDetails?.location?.longitude ?? null,
        address: cardData.qrCodeDetails?.location?.address ?? "",
      },
      renewalDate: cardData.qrCodeDetails?.renewalDate ?? null,
      status: cardData.qrCodeDetails?.status ?? "active",
      scanCount: cardData.qrCodeDetails?.scanCount ?? 0,
      resetPasswordToken: null,
      resetPasswordExpires: null,
      ...cardData.qrCodeDetails,
    };

     
    

    const newDoc = await CardsModel.create({
      user: {
        id: user._id,
        name: user.name,
      },
      serviceName: slug,
      ...cardData,
    });

     const qrUrl = await getShortenedUrl(`/${slug}/${newDoc._id}`);

    return Response.json({
      success: true,
      message: `${slug} service data submitted successfully`,
      data: newDoc,qrUrl
    }, { status: 201 });
  }

  // ✅ Handle JSON-based service (e.g., URL)
  const body = await req.json();
  const { url, password,  qrPassword = "",
      location = {},
      renewalDate = null,
      status = "active", } = body;

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
  }, // ✅ include QR data
  });

   const qrUrl = await getShortenedUrlServices(`${url}`);
console.log(qrUrl)
  return Response.json({
    success: true,
    message: `${slug} service data submitted successfully`,
    data: result,qrUrl
  }, { status: 201 });
}


// import { connectDB } from "@/lib/mongoDB";
// import { authUser } from "@/middlewares/authMiddleware";
// import CardsModel from "@/models/services/cardsSchema";
// import URLServiceModel from "@/models/services/urlServicesSchema";
// import { cloudinary } from "@/utils/cloudinary";
// import bcrypt from "bcryptjs";

// export const config = {
//   api: {
//     bodyParser: false, // Required for FormData
//   },
// };

// const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB per file
// const MAX_TOTAL_SIZE = 30 * 1024 * 1024; // 30MB total

// export async function POST(req, context) {
//   const { slug } = context.params;

//   const auth = await authUser(req);
//   if (auth.status !== 200) {
//     return Response.json(auth.json, { status: auth.status });
//   }

//   const user = auth.user;
//   await connectDB();

//   const contentType = req.headers.get("content-type") || "";
//   const isFormData = contentType.includes("multipart/form-data");

//   // ✅ Handle services using FormData (includes file/image)
//   if (isFormData) {
//     const formData = await req.formData();
//     const cardData = {};
//     let totalSize = 0;

//     // Handle text fields
//     for (const [key, value] of formData.entries()) {
//       if (key === "file") continue;

//       if (key === "password" && value.trim()) {
//         const salt = await bcrypt.genSalt(10);
//         const hashedPassword = await bcrypt.hash(value, salt);
//         cardData.password = hashedPassword;
//       } else {
//         cardData[key] = value;
//       }
//     }

//     // ✅ Upload file to Cloudinary if present
//     const file = formData.get("file");
//     if (file && typeof file === "object") {
//       if (file.size > MAX_FILE_SIZE) {
//         return Response.json({ error: "File exceeds 2MB limit" }, { status: 400 });
//       }

//       totalSize += file.size;
//       if (totalSize > MAX_TOTAL_SIZE) {
//         return Response.json({ error: "Total upload exceeds 30MB" }, { status: 400 });
//       }

//       const arrayBuffer = await file.arrayBuffer();
//       const buffer = Buffer.from(arrayBuffer);
//       const mime = file.type;
//       const base64 = buffer.toString("base64");
//       const dataUri = `data:${mime};base64,${base64}`;

//       const uploadResult = await cloudinary.uploader.upload(dataUri, {
//         folder: slug,
//       });

//       cardData.profileImageUrl = uploadResult.secure_url;
//     }

//     // ✅ Handle QR Code Details
//     cardData.qrCodeDetails = {
//       qrCodeImage: formData.get("qrCodeImage") || "",
//       location: {
//         latitude: parseFloat(formData.get("latitude") || 0) || null,
//         longitude: parseFloat(formData.get("longitude") || 0) || null,
//         address: formData.get("address") || "",
//       },
//       renewalDate: formData.get("renewalDate") || null,
//       status: formData.get("status") || "active",
//       resetPasswordToken: null,
//       resetPasswordExpires: null,
//     };

//     const newDoc = await CardsModel.create({
//       user: {
//         id: user._id,
//         name: user.name,
//       },
//       serviceName: slug,
//       ...cardData,
//     });

//     return Response.json({
//       success: true,
//       message: `${slug} service data submitted successfully`,
//       data: newDoc,
//     }, { status: 201 });
//   }

//   // ✅ Handle JSON-based services (URL services)
//   const body = await req.json();
//   const {
//     url,
//     password,
//     qrCodeImage = "",
//     location = {},
//     renewalDate = null,
//     status = "active"
//   } = body;

//   const hashedPassword = password ? await bcrypt.hash(password, 10) : null;

//   const result = await URLServiceModel.create({
//     user: {
//       id: user._id,
//       name: user.name,
//     },
//     url,
//     password: hashedPassword,
//     serviceName: slug,
//     qrCodeDetails: {
//       qrCodeImage,
//       location: {
//         latitude: location.latitude ?? null,
//         longitude: location.longitude ?? null,
//         address: location.address ?? "",
//       },
//       renewalDate,
//       status,
//       resetPasswordToken: null,
//       resetPasswordExpires: null,
//     },
//   });

//   return Response.json({
//     success: true,
//     message: `${slug} service data submitted successfully`,
//     data: result,
//   }, { status: 201 });
// }



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
