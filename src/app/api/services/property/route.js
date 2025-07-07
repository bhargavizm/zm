// import { connectDB } from "@/lib/mongoDB";
// import { authUser } from "@/middlewares/authMiddleware";
// import PropertyModal from "@/models/services/propertySchema";
// import { cloudinary } from "@/utils/cloudinary";
// import bcrypt from "bcryptjs"; // 🔐 Import bcrypt

// export const config = {
//   api: {
//     bodyParser: false,
//   },
//   runtime: "nodejs",
// };

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

//     const contentType = request.headers.get("content-type") || "";
//     if (!contentType.includes("multipart/form-data")) {
//       return new Response(
//         JSON.stringify({ success: false, error: "Expected multipart/form-data" }),
//         { status: 400, headers: { "Content-Type": "application/json" } }
//       );
//     }

//     const formData = await request.formData();

//     const basicInfo = {
//       propertyName: formData.get("propertyName") || "",
//       propertyType: formData.get("propertyType") || "",
//       ownerName: formData.get("ownerName") || "",
//       contactNumber: formData.get("contactNumber") || "",
//       alternateNumber: formData.get("alternateNumber") || "",
//       propertyDescription: formData.get("propertyDescription") || "",
//     };

//     const addressInfo = {
//       address: formData.get("address") || "",
//       mapLink: formData.get("mapLink") || "",
//     };

//     const pricingInfo = {
//       price: formData.get("price") || "",
//       area: formData.get("area") || "",
//       amenities: formData.getAll("amenities").map((item) => String(item)),
//     };

//     let password = formData.get("password") || "";

//     // ✅ Step 2: Validate password
//     if (!password || password.length < 4) {
//       return new Response(
//         JSON.stringify({ success: false, error: "Password must be at least 4 characters" }),
//         { status: 400, headers: { "Content-Type": "application/json" } }
//       );
//     }

//     // ✅ Step 3: Hash password with bcrypt
//     const salt = await bcrypt.genSalt(10);
//     const hashedPassword = await bcrypt.hash(password, salt);

//     // ✅ Step 4: Handle file uploads
//     const galleryImages = formData.getAll("galleryImages");
//     let totalSize = 0;

//     for (const file of galleryImages) {
//       totalSize += file.size;
//       if (file.size > 2 * 1024 * 1024) {
//         return new Response(
//           JSON.stringify({ success: false, error: `Each file must be ≤ 2MB. File ${file.name} is too large.` }),
//           { status: 400, headers: { "Content-Type": "application/json" } }
//         );
//       }
//     }

//     if (totalSize > 30 * 1024 * 1024) {
//       return new Response(
//         JSON.stringify({ success: false, error: "Total file size must be ≤ 30MB" }),
//         { status: 400, headers: { "Content-Type": "application/json" } }
//       );
//     }

//     const galleryImageUrls = [];
//     for (const file of galleryImages) {
//       const buffer = Buffer.from(await file.arrayBuffer());
//       const base64 = buffer.toString("base64");
//       const dataUri = `data:${file.type};base64,${base64}`;

//       try {
//         const uploadResult = await cloudinary.uploader.upload(dataUri, {
//           folder: "property-gallery",
//           resource_type: "auto",
//         });
//         galleryImageUrls.push(uploadResult.secure_url);
//       } catch (err) {
//         console.error(`Cloudinary upload failed for file ${file.name}:`, err);
//         return new Response(
//           JSON.stringify({ success: false, error: `Upload failed for ${file.name}: ${err.message}` }),
//           { status: 500, headers: { "Content-Type": "application/json" } }
//         );
//       }
//     }

//     // ✅ Step 5: Save to DB
//     const newProperty = new PropertyModal({
//       user: {
//         id: user._id,
//         name: user.name,
//       },
//       basicInfo,
//       addressInfo,
//       pricingInfo,
//       password: hashedPassword, // ✅ Save hashed password
//       images: {
//         galleryImages: galleryImageUrls,
//       },
//     });

//     const saved = await newProperty.save();

//     return new Response(
//       JSON.stringify({ success: true, data: saved }),
//       { status: 201, headers: { "Content-Type": "application/json" } }
//     );
//   } catch (error) {
//     console.error("Server error:", error);
//     return new Response(
//       JSON.stringify({ success: false, error: error.message }),
//       { status: 500, headers: { "Content-Type": "application/json" } }
//     );
//   }
// }

import { connectDB } from "@/lib/mongoDB";
import { authUser } from "@/middlewares/authMiddleware";
import PropertyModal from "@/models/services/propertySchema";
import { cloudinary } from "@/utils/cloudinary";
import bcrypt from "bcryptjs";

export const config = {
  api: {
    bodyParser: false,
  },
  runtime: "nodejs",
};

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

    const contentType = request.headers.get("content-type") || "";
    if (!contentType.includes("multipart/form-data")) {
      return new Response(
        JSON.stringify({ success: false, error: "Expected multipart/form-data" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const formData = await request.formData();

    const basicInfo = {
      propertyName: formData.get("propertyName") || "",
      propertyType: formData.get("propertyType") || "",
      ownerName: formData.get("ownerName") || "",
      contactNumber: formData.get("contactNumber") || "",
      alternateNumber: formData.get("alternateNumber") || "",
      propertyDescription: formData.get("propertyDescription") || "",
    };

    const addressInfo = {
      address: formData.get("address") || "",
      mapLink: formData.get("mapLink") || "",
    };

    const pricingInfo = {
      price: formData.get("price") || "",
      area: formData.get("area") || "",
      amenities: formData.getAll("amenities").map((item) => String(item)),
    };

    let password = formData.get("password") || "";
    let hashedPassword = null;

    // ✅ Step 2: Optional password validation
    if (password && password.length >= 4) {
      const salt = await bcrypt.genSalt(10);
      hashedPassword = await bcrypt.hash(password, salt);
    }

    // ✅ Step 3: Handle image uploads
    const galleryImages = formData.getAll("galleryImages");
    let totalSize = 0;

    for (const file of galleryImages) {
      totalSize += file.size;
      if (file.size > 2 * 1024 * 1024) {
        return new Response(
          JSON.stringify({ success: false, error: `Each file must be ≤ 2MB. File ${file.name} is too large.` }),
          { status: 400, headers: { "Content-Type": "application/json" } }
        );
      }
    }

    if (totalSize > 30 * 1024 * 1024) {
      return new Response(
        JSON.stringify({ success: false, error: "Total file size must be ≤ 30MB" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const galleryImageUrls = [];
    for (const file of galleryImages) {
      const buffer = Buffer.from(await file.arrayBuffer());
      const base64 = buffer.toString("base64");
      const dataUri = `data:${file.type};base64,${base64}`;

      try {
        const uploadResult = await cloudinary.uploader.upload(dataUri, {
          folder: "property-gallery",
          resource_type: "auto",
        });
        galleryImageUrls.push(uploadResult.secure_url);
      } catch (err) {
        console.error(`Cloudinary upload failed for file ${file.name}:`, err);
        return new Response(
          JSON.stringify({ success: false, error: `Upload failed for ${file.name}: ${err.message}` }),
          { status: 500, headers: { "Content-Type": "application/json" } }
        );
      }
    }

    // ✅ Step 4: Save to DB
    const newProperty = new PropertyModal({
      user: {
        id: user._id,
        name: user.name,
      },
      basicInfo,
      addressInfo,
      pricingInfo,
      images: {
        galleryImages: galleryImageUrls,
      },
      ...(hashedPassword && { password: hashedPassword }), // ✅ Only include if present
    });

    const saved = await newProperty.save();

    return new Response(
      JSON.stringify({ success: true, data: saved }),
      { status: 201, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Server error:", error);
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
