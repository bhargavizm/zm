
import { connectDB } from "@/lib/mongoDB";
import { authUser } from "@/middlewares/authMiddleware";
import { cloudinary } from "@/utils/cloudinary";
import { getShortenedUrl } from "@/utils/shortenUrl";
import bcrypt from "bcryptjs";
import fs from "fs";
import path from "path";
import { v4 as uuidv4 } from "uuid";
import checkFreePlanEligibility from "../checkFreePlanEligibility";
export const config = {
  api: {
    bodyParser: false,
  },
};

// 💰 Plan Prices
const planPrices = {
  Free: "₹0",
  Basic: "₹999",
  Starter: "₹1799",
  Pro: "₹2499",
  Advanced: "₹2999",
  Ultima: "₹3299",
};

// 📦 Plan Storage Limits (bytes)
const planLimits = {
  Free: 5 * 1024 * 1024 * 1024, // 5 GB
  Basic: 1 * 1024 * 1024 * 1024, // 1 GB
  Starter: 2 * 1024 * 1024 * 1024, // 2 GB
  Pro: 3 * 1024 * 1024 * 1024, // 3 GB
  Advanced: 4 * 1024 * 1024 * 1024, // 4 GB
  Ultima: 5 * 1024 * 1024 * 1024, // 5 GB
};

const determinePlanBySize = (sizeInBytes) => {
  if (sizeInBytes <= planLimits.Basic) return "Basic";
  if (sizeInBytes <= planLimits.Starter) return "Starter";
  if (sizeInBytes <= planLimits.Pro) return "Pro";
  if (sizeInBytes <= planLimits.Advanced) return "Advanced";
  return "Ultima";
};

function capitalize(str) {
  return str?.charAt(0)?.toUpperCase() + str?.slice(1);
}

// ✅ Main Upload Handler
export async function HandleEncryptedServices({
  serviceName,
  request,
  model,
  folder = "",
  resourceType = null,
  allowedMimeTypes = null,
  useCloudinary = false,
}) {
  try {
    await connectDB();

    // 🔐 Step 1: Authenticate User
    const auth = await authUser(request);
    if (auth.status !== 200) {
      return new Response(JSON.stringify(auth.json), {
        status: auth.status,
        headers: { "Content-Type": "application/json" },
      });
    }
    const user = auth.user;

    // 🧾 Step 2: Parse form data
    const formData = await request.formData();
    const title = formData.get("title");
    const description = formData.get("description");
    const bgDesign = formData.get("bgDesign");
    const qrCodeImage = formData.get("qrCodeImage");
    const scanCount = formData.get("scanCount");
    const latitude = formData.get("latitude");
    const longitude = formData.get("longitude");
    const address = formData.get("address");
    const renewalDate = formData.get("renewalDate");
    const status = formData.get("status");
    const validityDays = formData.get("validityDays");
    const startDate = formData.get("startDate");
    const endDate = formData.get("endDate");
    let password = formData.get("password") || "";

    if (password) {
      const salt = await bcrypt.genSalt(10);
      password = await bcrypt.hash(password, salt);
    }

    const files = [];
    let totalSize = 0;

    // 📂 Step 3: Process uploaded files
    const uploadedFiles = formData.getAll("files");

    for (const file of uploadedFiles) {
      if (!file || typeof file.arrayBuffer !== "function") continue;

      if (allowedMimeTypes && !allowedMimeTypes.includes(file.type)) {
        return new Response(
          JSON.stringify({
            success: false,
            error: `Unsupported file format: ${file.name}`,
          }),
          { status: 400 }
        );
      }

      let fileSize = 0;
      let arrayBuffer = null;

      if (useCloudinary && resourceType) {
        arrayBuffer = await file.arrayBuffer();
        fileSize = arrayBuffer.byteLength;
      } else {
        fileSize = file.size ?? 0;
      }

      totalSize += fileSize;

      if (useCloudinary && resourceType) {
        const base64Data = `data:${file.type};base64,${Buffer.from(
          arrayBuffer
        ).toString("base64")}`;

        const result = await cloudinary.uploader.upload(base64Data, {
          folder,
          resource_type: resourceType,
        });

        files.push({
          url: result.secure_url,
          name: file.name || result.original_filename,
        });
      } else {
        const uploadsDir = path.join(
          process.cwd(),
          "public",
          "uploads",
          serviceName
        );
        if (!fs.existsSync(uploadsDir)) {
          fs.mkdirSync(uploadsDir, { recursive: true });
        }

        const fileExt = path.extname(file.name) || "";
        const uniqueName = `${uuidv4()}${fileExt}`;
        const filePath = path.join(uploadsDir, uniqueName);

        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        fs.writeFileSync(filePath, buffer);

        files.push({
          fileName: file.name,
          fileType: file.type,
          localPath: `/uploads/${serviceName}/${uniqueName}`,
        });
      }
    }

    // 📊 Step 4: Decide plan
    const daysSinceFirstLogin = Math.floor(
      (new Date() - new Date(user.firstLoginDate)) / (1000 * 60 * 60 * 24)
    );

    let plan;
    if (daysSinceFirstLogin <= 30) {
      // Within free trial → check eligibility
      const freePlanCheck = await checkFreePlanEligibility(
        user._id,
        user.firstLoginDate
      );

      if (freePlanCheck.eligible) {
        plan = "Free"; // Under limit → free
      } else {
        plan = determinePlanBySize(totalSize); // Limit reached → paid
      }
    } else {
      // Trial over → always size-based
      plan = determinePlanBySize(totalSize);
    }

    const price = planPrices[plan];
    const storage = planLimits[plan];

    const startDateValue = startDate ? new Date(startDate) : new Date();
    const validityDaysValue =
      validityDays || (plan === "Free" ? 30 : undefined) || 30;

    const renewalDateValue = new Date(
      startDateValue.getTime() + validityDaysValue * 24 * 60 * 60 * 1000
    );

    const qrCodeDetails = {
      qrCodeImage,
      scanCount: scanCount ? Number(scanCount) : undefined,
      location: {
        latitude: latitude ? Number(latitude) : undefined,
        longitude: longitude ? Number(longitude) : undefined,
        address: address || "",
      },
    };

    const priceDetails = {
      plan,
      price,
      storage,
      validityDays: validityDaysValue,
      startDate: startDateValue,
      endDate: endDate ? new Date(endDate) : undefined,
      renewalDate: renewalDateValue,

    };

    // 📝 Step 5: Save to DB
    const newDoc = await model.create({
      user: { id: user._id, name: user.name },
      title,
      description,
      bgDesign,
      password,
      files,
      qrCodeDetails,
      priceDetails,
    });

    const qrUrl = await getShortenedUrl(`/${serviceName}/${newDoc._id}`);

    return new Response(
      JSON.stringify({
        success: true,
        message: `${serviceName} service data submitted successfully`,
        data: newDoc,
        qrUrl,
      }),
      { status: 201 }
    );
  } catch (error) {
    console.error("Upload Error:", error);

    return Response.json(
      {
        success: false,
        message: "Upload failed",
        error: error.message || "Internal Server Error",
      },
      { status: 500 }
    );
  }
}
