import { connectDB } from "@/lib/mongoDB";
import { authUser } from "@/middlewares/authMiddleware";

export async function HandleEncryptedServicesUpdate({
  request,
  model,
  serviceName,
}) {
  try {
    const auth = await authUser(request);
    if (auth.status !== 200) {
      return new Response(JSON.stringify(auth.json), {
        status: auth.status,
        headers: { "Content-Type": "application/json" },
      });
    }

    const user = auth.user;
    await connectDB();

    const formData = await request.formData();
    const id = formData.get("id");

    if (!id) {
      return Response.json(
        { success: false, message: "Missing ID for update" },
        { status: 400 }
      );
    }

    const doc = await model.findById(id);
    if (!doc) {
      return Response.json(
        { success: false, message: "Document not found" },
        { status: 404 }
      );
    }

    if (doc.user.id.toString() !== user._id.toString()) {
      return Response.json(
        { success: false, message: "Unauthorized" },
        { status: 403 }
      );
    }

    // 🔁 Only update priceDetails
    doc.priceDetails.plan = formData.get("plan") || doc.priceDetails.plan;
    doc.priceDetails.price = Number(formData.get("price")) || doc.priceDetails.price;
    doc.priceDetails.storage = Number(formData.get("storage")) || doc.priceDetails.storage;
    doc.priceDetails.validityDays = Number(formData.get("validityDays")) || doc.priceDetails.validityDays;
    doc.priceDetails.startDate = formData.get("startDate")
      ? new Date(formData.get("startDate"))
      : doc.priceDetails.startDate;

    // Let pre-save hook set `endDate`
    await doc.save();

    return Response.json({
      success: true,
      message: `${serviceName} price details updated successfully`,
      data: doc,
    });
  } catch (error) {
    console.error("Price Update Error:", error);
    return Response.json(
      {
        success: false,
        message: "Failed to update price details",
        error: error.message,
      },
      { status: 500 }
    );
  }
}
