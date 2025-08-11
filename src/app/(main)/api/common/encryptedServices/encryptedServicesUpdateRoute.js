import { connectDB } from "@/lib/mongoDB";

export async function HandleEncryptedServicesUpdate({
  request,
  model,
  serviceName,
  params,
}) {
  try {
    console.log("Received params:", params);

    const { userId, serviceId } = params;

    if (!userId || !serviceId) {
      return Response.json(
        {
          success: false,
          message: "Invalid request. User ID or Service ID is missing in the URL.",
        },
        { status: 400 }
      );
    }

    await connectDB();

    let doc;

    try {
      doc = await model.findById(serviceId);
    } catch (err) {
      return Response.json(
        {
          success: false,
          message: "Invalid Service ID. Please check the URL and try again.",
        },
        { status: 400 }
      );
    }

    if (!doc) {
      return Response.json(
        {
          success: false,
          message: "No service found for the given Service ID.",
        },
        { status: 404 }
      );
    }

    if (doc.user.id.toString() !== userId.toString()) {
      return Response.json(
        {
          success: false,
          message: "The provided User ID does not match the user of this service.",
        },
        { status: 403 }
      );
    }

   const formData = await request.formData();

// ✅ Ensure priceDetails exists
if (!doc.priceDetails) {
  doc.priceDetails = {};
}

// ✅ Safely update priceDetails
doc.priceDetails.plan = formData.get("plan") || doc.priceDetails.plan || "Free";
doc.priceDetails.price = Number(formData.get("price")) || doc.priceDetails.price || 0;
doc.priceDetails.storage = Number(formData.get("storage")) || doc.priceDetails.storage || 1000;
doc.priceDetails.validityDays = Number(formData.get("validityDays")) || doc.priceDetails.validityDays || 30;
doc.priceDetails.startDate = formData.get("startDate")
  ? new Date(formData.get("startDate"))
  : doc.priceDetails.startDate || new Date();

await doc.save();

return Response.json({
  success: true,
  message: `${serviceName} price details updated successfully.`,
  data: doc,
});

  } catch (error) {
    console.error("Update error:", error);
    return Response.json(
      {
        success: false,
        message: "Something went wrong while updating. Please try again later.",
        error: error.message,
      },
      { status: 500 }
    );
  }
}
