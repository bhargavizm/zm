import { connectDB } from "@/lib/mongoDB";
import { authUser } from "@/middlewares/authMiddleware";
import { cloudinary } from "@/utils/cloudinary";
import { getShortenedUrl } from "@/utils/shortenUrl";
import bcrypt from "bcryptjs";
import { v4 as uuidv4 } from "uuid";
import checkFreePlanEligibility from "../checkFreePlanEligibility";

export const config = { api: { bodyParser: false } };

// Plan prices & storage
const planPrices = { Free: "₹0", Basic: "₹999", Starter: "₹1799", Pro: "₹2499", Advanced: "₹2999", Ultima: "₹3299" };
const planLimits = { Free: 5*1024*1024*1024, Basic: 1*1024*1024*1024, Starter: 2*1024*1024*1024, Pro: 3*1024*1024*1024, Advanced: 4*1024*1024*1024, Ultima: 5*1024*1024*1024 };
const determinePlanBySize = sizeInBytes => sizeInBytes <= planLimits.Basic ? "Basic" : sizeInBytes <= planLimits.Starter ? "Starter" : sizeInBytes <= planLimits.Pro ? "Pro" : sizeInBytes <= planLimits.Advanced ? "Advanced" : "Ultima";
const capitalize = str => str?.charAt(0)?.toUpperCase() + str?.slice(1);

export async function HandleEncryptedServices({ serviceName, request, model, folder = "", resourceType = "raw", allowedMimeTypes = null }) {
  try {
    await connectDB();

    const auth = await authUser(request);
    if (auth.status !== 200) return new Response(JSON.stringify(auth.json), { status: auth.status, headers: { "Content-Type": "application/json" } });
    const user = auth.user;

    const formData = await request.formData();
    const title = formData.get("title");
    const description = formData.get("description");
    const bgDesign = formData.get("bgDesign");
    const qrCodeImage = formData.get("qrCodeImage");
    const scanCount = formData.get("scanCount");
    const latitude = formData.get("latitude");
    const longitude = formData.get("longitude");
    const address = formData.get("address");
    const validityDays = formData.get("validityDays");
    let password = formData.get("password") || "";

    if (password) { const salt = await bcrypt.genSalt(10); password = await bcrypt.hash(password, salt); }

    const files = [];
    let totalSize = 0;

    // Upload files to Cloudinary
    const uploadedFiles = formData.getAll("files");
    for (const file of uploadedFiles) {
      if (!file || typeof file.arrayBuffer !== "function") continue;

      if (allowedMimeTypes && !allowedMimeTypes.includes(file.type)) {
        return new Response(JSON.stringify({ success: false, error: `Unsupported file format: ${file.name}` }), { status: 400 });
      }

      const arrayBuffer = await file.arrayBuffer();
      const fileSize = arrayBuffer.byteLength;
      totalSize += fileSize;

      const base64Data = `data:${file.type};base64,${Buffer.from(arrayBuffer).toString("base64")}`;
      const cleanFileName = file.name.replace(/\.pdf$/i, ""); // for display only

      const result = await cloudinary.uploader.upload(base64Data, {
        folder,
        resource_type: "raw", // ensures downloadable PDF
        public_id: `${uuidv4()}-${cleanFileName}`, // do NOT append .pdf manually
      });

      files.push({
        url: result.secure_url, // use this exact URL
        name: cleanFileName,
        size: fileSize,
        type: file.type,
      });
    }

    // Decide plan
    const daysSinceFirstLogin = Math.floor((new Date() - new Date(user.firstLoginDate)) / (1000*60*60*24));
    let plan;
    if (daysSinceFirstLogin <= 30) {
      const freePlanCheck = await checkFreePlanEligibility(user._id, user.firstLoginDate);
      plan = freePlanCheck.eligible ? "Free" : determinePlanBySize(totalSize);
    } else { plan = determinePlanBySize(totalSize); }

    const price = planPrices[plan];
    const storage = planLimits[plan];
    const validityDaysValue = validityDays || (plan === "Free" ? 30 : undefined) || 30;

    const qrCodeDetails = {
      qrCodeImage,
      scanCount: scanCount ? Number(scanCount) : undefined,
      location: {
        latitude: latitude ? Number(latitude) : undefined,
        longitude: longitude ? Number(longitude) : undefined,
        address: address || "",
      },
    };

    const priceDetails = { plan, price, storage, validityDays: validityDaysValue };

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

    return new Response(JSON.stringify({ success: true, message: `${capitalize(serviceName)} service data submitted successfully`, data: newDoc, qrUrl }), { status: 201 });
  } catch (error) {
    console.error("Upload Error:", error);
    return Response.json({ success: false, message: "Upload failed", error: error.message || "Internal Server Error" }, { status: 500 });
  }
}
