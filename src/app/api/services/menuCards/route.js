import { connectDB } from "@/lib/mongoDB";
import { authUser } from "@/middlewares/authMiddleware";
import MenuCardsServiceModel from "@/models/services/menuCardSchema";
import { cloudinary } from "@/utils/cloudinary";
import bcrypt from "bcrypt"; // ✅ Import bcrypt

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

    // ✅ Step 2: Parse Form Data
    const formData = await request.formData();
    const restaurantName = formData.get("restaurantName");
    const phone = formData.get("phone");
    const email = formData.get("email");
    const link = formData.get("link");
    const plainPassword = formData.get("password");

    // ✅ Step 3: Hash Password
    const hashedPassword = plainPassword
      ? await bcrypt.hash(plainPassword, 10)
      : null;

    // ✅ Step 4: Process Uploaded Images
    const files = formData.getAll("images");
    const uploadedImages = [];
    let totalSize = 0;

    for (const file of files) {
      if (typeof file.arrayBuffer !== "function") continue;

      const arrayBuffer = await file.arrayBuffer();
      const sizeInBytes = arrayBuffer.byteLength;
      const sizeInMB = (sizeInBytes / (1024 * 1024)).toFixed(2);

      if (sizeInBytes > 2 * 1024 * 1024) {
        return new Response(
          JSON.stringify({
            success: false,
            error: `❌ ${file.name} is ${sizeInMB}MB and exceeds 2MB limit.`,
          }),
          { status: 400, headers: { "Content-Type": "application/json" } }
        );
      }

      totalSize += sizeInBytes;
      const totalSizeInMB = (totalSize / (1024 * 1024)).toFixed(2);

      if (totalSize > 30 * 1024 * 1024) {
        return new Response(
          JSON.stringify({
            success: false,
            error: `❌ Total upload size ${totalSizeInMB}MB exceeds 30MB limit.`,
          }),
          { status: 400, headers: { "Content-Type": "application/json" } }
        );
      }

      console.log(`📦 Uploading ${file.name} (${sizeInMB} MB)...`);

      const buffer = Buffer.from(arrayBuffer);
      const base64 = buffer.toString("base64");
      const dataUri = `data:${file.type};base64,${base64}`;

      const uploaded = await cloudinary.uploader.upload(dataUri, {
        public_id: file.name.split(".")[0],
      });

      uploadedImages.push({
        url: uploaded.secure_url,
        name: file.name,
        sizeMB: sizeInMB,
      });
    }

    // ✅ Step 5: Save to MongoDB
    const newEntry = new MenuCardsServiceModel({
      user: {
        id: user._id,
        name: user.name,
      },
      restaurantName,
      phone,
      email,
      link,
      password: hashedPassword,
      images: uploadedImages,
    });

    await newEntry.save();

    // ✅ Step 6: Return Success Response
    return new Response(
      JSON.stringify({
        success: true,
        message: "✅ Menu cards data submitted successfully",
        menuCardData: newEntry,
      }),
      { status: 201, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Upload Error:", error);
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
