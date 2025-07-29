import { connectDB } from "@/lib/mongoDB";
import ProductsModel from "@/models/services/productSchema";
import { cloudinary } from "@/utils/cloudinary";
import { authUser } from "@/middlewares/authMiddleware";
import bcrypt from "bcryptjs";
import { getShortenedUrl } from "@/utils/shortenUrl";

export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(req) {
  try {
    await connectDB();

    // ✅ Authenticate User
    const auth = await authUser(req);
    if (auth.status !== 200) {
      return new Response(JSON.stringify(auth.json), {
        status: auth.status,
        headers: { "Content-Type": "application/json" },
      });
    }

    const formData = await req.formData();
    const user = {
      id: auth.user._id,
      name: auth.user.name,
    };

    // ✅ Basic Fields
    const brandName = formData.get("brandName");
    const email = formData.get("email");
    const phone = formData.get("phone");
    const address = formData.get("address");
    const bgDesign = formData.get("bgDesign");
    const selectedTemplate = Number(formData.get("selectedTemplate") || 0);

    const plainPassword = formData.get("password");
    const hashedPassword = plainPassword
      ? await bcrypt.hash(plainPassword, 10)
      : null;

    // ✅ Parse items[] and qrCodeDetails
    const itemsRaw = JSON.parse(formData.get("items") || "[]");
    const qrCodeDetails = JSON.parse(formData.get("qrCodeDetails") || "{}");

    // ✅ Upload productLogo to Cloudinary
    let productLogoUrl = "";
    const productLogoFile = formData.get("productLogo");

    if (productLogoFile && typeof productLogoFile.arrayBuffer === "function") {
      const arrayBuffer = await productLogoFile.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      const base64 = buffer.toString("base64");
      const dataUri = `data:${productLogoFile.type};base64,${base64}`;

      const uploadRes = await cloudinary.uploader.upload(dataUri, {
        folder: "products/logo",
        public_id: productLogoFile.name?.split(".")[0],
      });

      productLogoUrl = uploadRes.secure_url;
    }

    // ✅ Upload productImages for each item
    const uploadedItems = await Promise.all(
      itemsRaw.map(async (item, index) => {
        const file = formData.getAll("productImage")[index];
        let productImageUrl = "";

        if (file && typeof file.arrayBuffer === "function") {
          const arrayBuffer = await file.arrayBuffer();
          const buffer = Buffer.from(arrayBuffer);
          const base64 = buffer.toString("base64");
          const dataUri = `data:${file.type};base64,${base64}`;

          const uploadRes = await cloudinary.uploader.upload(dataUri, {
            folder: "products/items",
            public_id: file.name?.split(".")[0],
          });

          productImageUrl = uploadRes.secure_url;
        }

        return {
          ...item,
          productImage: productImageUrl,
        };
      })
    );

    // ✅ Save to MongoDB
    const newProduct = await ProductsModel.create({
      user,
      brandName,
      email,
      phone,
      address,
      productLogo: productLogoUrl,
      selectedTemplate,
      bgDesign,
      password: hashedPassword,
      qrCodeDetails,
      items: uploadedItems,
    });
    const qrUrl = await getShortenedUrl(`/product-cards/${newProduct._id}`);
    return new Response(
      JSON.stringify({
        success: true,
        message: "✅ Product service uploaded successfully",
        data: newProduct,
        qrUrl,
      }),
      {
        status: 201,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("❌ Product upload error:", error);
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      { status: 500 }
    );
  }
}
