import { connectDB } from "@/lib/mongoDB";
import { authUser } from "@/middlewares/authMiddleware";
import { cloudinary } from "@/utils/cloudinary";
import bcrypt from "bcryptjs";

export const config = {
  api: {
    bodyParser: false, // Important for handling multipart/form-data
  },
};

// ✅ Plan Limits (1GB to 5GB)
const planLimits = {
  Basic: 1 * 1024 * 1024 * 1024, // 1 GB
  Starter: 2 * 1024 * 1024 * 1024, // 2 GB
  Pro: 3 * 1024 * 1024 * 1024, // 3 GB
  Advanced: 4 * 1024 * 1024 * 1024, // 4 GB
  Ultima: 5 * 1024 * 1024 * 1024, // 5 GB
};

const getPlanLimit = (userPlan = "Basic") => {
  return planLimits[userPlan] || planLimits.Basic;
};

function capitalize(str) {
  return str?.charAt(0)?.toUpperCase() + str?.slice(1);
}

// ✅ Main Upload Handler
export async function HandleEncryptedServices({
  request,
  model,
  folder = "",
  resourceType = null, // "image", "video", or null
  allowedMimeTypes = null,
  mediaField = "files",
  useCloudinary = false,
}) {
  try {
    // 🔐 Step 1: Authenticate User
    const auth = await authUser(request);
    if (auth.status !== 200) {
      return new Response(JSON.stringify(auth.json), {
        status: auth.status,
        headers: { "Content-Type": "application/json" },
      });
    }

    const user = auth.user;
    await connectDB();

    // 🧾 Step 2: Parse form data
    const formData = await request.formData();
    const title = formData.get("title");
    const description = formData.get("description");
    const qrCodeImage = formData.get("qrCodeImage");
const scanCount = formData.get("scanCount");
const latitude = formData.get("latitude");
const longitude = formData.get("longitude");
const address = formData.get("address");
const renewalDate = formData.get("renewalDate");
const status = formData.get("status");
    let password = formData.get("password") || "";

    if (password) {
      const salt = await bcrypt.genSalt(10);
      password = await bcrypt.hash(password, salt);
    }

    const planLimit = getPlanLimit(user?.plan || "Basic");
    const files = [];
    let totalSize = 0;

    // 📂 Step 3: Process all uploaded files
    for (const [key, value] of formData.entries()) {
      if (key === "files" && typeof value.arrayBuffer === "function") {
        // 🔎 Check file type if allowed
        if (allowedMimeTypes && !allowedMimeTypes.includes(value.type)) {
          return new Response(
            JSON.stringify({
              success: false,
              error: `Unsupported file format: ${value.name}`,
            }),
            { status: 400 }
          );
        }

        // 🧮 File size check
        // const arrayBuffer = await value.arrayBuffer();
        // const fileSize = arrayBuffer.byteLength;
        // totalSize += fileSize;
        let fileSize = 0;
        let arrayBuffer = null;

        if (useCloudinary && resourceType) {
          arrayBuffer = await value.arrayBuffer();
          fileSize = arrayBuffer.byteLength;
        } else {
          fileSize = value.size ?? 0;
        }

        totalSize += fileSize;

        // if (totalSize > planLimit) {
        //   return new Response(JSON.stringify({
        //     success: false,
        //     error: `File size too large. Got ${totalSize}. Maximum is ${planLimit}. Upgrade your plan.`,
        //   }), { status: 413 });
        // }

        //        if (totalSize > planLimit) {
        //   return new Response(JSON.stringify({
        //     success: false,
        //     error: `🚫 Upload size (${(totalSize / (1024 ** 3)).toFixed(2)} GB) exceeds the maximum limit allowed by your ${user.plan} plan (${(planLimit / (1024 ** 3)).toFixed(2)} GB). Please reduce the total file size and try again.`,
        //   }), { status: 413 });
        // }

        const maxLimit = planLimits["Ultima"]; // Hard limit

        if (totalSize > maxLimit) {
          return new Response(
            JSON.stringify({
              success: false,
              error: `🚫 Upload size (${(totalSize / 1024 ** 3).toFixed(
                2
              )} GB) exceeds the maximum limit of 5 GB. Please reduce your total file size.`,
            }),
            { status: 413 }
          );
        }

        // User exceeded their current plan but still within 5GB → allow upload, but send upgrade hint
        if (totalSize > planLimit) {
          // Add flag in response so frontend can suggest upgrade
          request.upgradeWarning = true; // You can also collect this info for logs
        }

        // ☁️ Upload to Cloudinary or push raw file info
        if (useCloudinary && resourceType) {
          const base64Data = `data:${value.type};base64,${Buffer.from(
            arrayBuffer
          ).toString("base64")}`;
          const result = await cloudinary.uploader.upload(base64Data, {
            folder,
            resource_type: resourceType,
          });

          files.push({
            url: result.secure_url,
            name: value.name || result.original_filename,
          });
        } else {
          files.push({
            fileName: value.name,
            fileType: value.type,
          });
        }
      }
    }

    // ❌ No valid files?
    if (!files.length) {
      return new Response(
        JSON.stringify({ success: false, error: "No valid files uploaded" }),
        {
          status: 400,
        }
      );
    }
const qrCodeDetails = {
  qrCodeImage,
  scanCount: scanCount ? Number(scanCount) : undefined,
  location: {
    latitude: latitude ? Number(latitude) : undefined,
    longitude: longitude ? Number(longitude) : undefined,
    address: address || "",
  },
  renewalDate: renewalDate ? new Date(renewalDate) : null,
  status: status || "active",
};

    // 📝 Step 4: Save to database
    const newDoc = await model.create({
      user: { id: user._id, name: user.name },
      title,
      description,
      password,
      [mediaField]: files,
      qrCodeDetails
    });

    // ✅ Return success
    return new Response(
      JSON.stringify({
        success: true,
        message: `${capitalize(
          mediaField.replace("file", "")
        )} service data submitted successfully`,
        type: totalSize > planLimit ? "upgrade" : "normal",
        data: newDoc,
      }),
      { status: 201 }
    );
  } catch (error) {
    console.error("Upload Error:", error, error.message);
    return new Response(
      JSON.stringify({
        success: false,
        message: "Upload failed",
        error: error.message || error.toString(),
      }),
      { status: 500 }
    );
  }
}

// // ✅ lib/handleGenericUpload.js
// import { connectDB } from "@/lib/mongoDB";
// import { authUser } from "@/middlewares/authMiddleware";
// import bcrypt from "bcryptjs";
// import { cloudinary } from "@/utils/cloudinary";

// export async function HandleEncryptedServices({
//   request,
//   model,
//   folder = "",
//   resourceType = null, // "image", "video", or null
//   allowedMimeTypes = null,
//   mediaField = "files",
//   useCloudinary = false,
// }) {
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
//     const title = formData.get("title");
//     const description = formData.get("description");
//     let password = formData.get("password") || "";

//     if (password) {
//       const salt = await bcrypt.genSalt(10);
//       password = await bcrypt.hash(password, salt);
//     }

//     const files = [];
//     for (const [key, value] of formData.entries()) {
//     if (key === "files" && typeof value.arrayBuffer === "function"){

//         if (allowedMimeTypes && !allowedMimeTypes.includes(value.type)) {
//           return new Response(
//             JSON.stringify({ success: false, error: `Unsupported file format: ${value.name}` }),
//             { status: 400 }
//           );
//         }

//         const arrayBuffer = await value.arrayBuffer();

//         if (useCloudinary && resourceType) {
//           const base64Data = `data:${value.type};base64,${Buffer.from(arrayBuffer).toString("base64")}`;
//           const result = await cloudinary.uploader.upload(base64Data, {
//             folder,
//             resource_type: resourceType,
//           });

//           files.push({
//             url: result.secure_url,
//             name: value.name || result.original_filename,
//           });
//         } else {
//           files.push({
//             fileName: value.name,
//             fileType: value.type,
//           });
//         }
//       }
//     }

//     if (!files.length) {
//       return new Response(JSON.stringify({ success: false, error: "No valid files uploaded" }), {
//         status: 400,
//       });
//     }

//     const newDoc = await model.create({
//       user: { id: user._id, name: user.name },
//       title,
//       description,
//       password,
//       [mediaField]: files,
//     });

//     return new Response(
//       JSON.stringify({ success: true, message: "Files uploaded successfully", data: newDoc }),
//       { status: 201 }
//     );
//   } catch (error) {
//     console.error("Upload Error:", error);
//     return new Response(
//       JSON.stringify({ success: false, message: "Upload failed", error: error.message }),
//       { status: 500 }
//     );
//   }
// }

// with prices
// ✅ Imports
