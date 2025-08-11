

 const handleSecuredServicesPriceDetails = async (doc, body) => {
  if (!doc.priceDetails) {
    doc.priceDetails = {};
  }

  doc.priceDetails.plan = body.plan || doc.priceDetails.plan || "Free";
  doc.priceDetails.price = body.price ?? doc.priceDetails.price ?? "0";
  doc.priceDetails.validityDays =
    body.validityDays ?? doc.priceDetails.validityDays ?? 30;
  doc.priceDetails.startDate = body.startDate
    ? new Date(body.startDate)
    : doc.priceDetails.startDate || new Date();

  // Reset endDate so pre-save hook recalculates
  doc.priceDetails.endDate = undefined;

  if (body.status) doc.priceDetails.status = body.status;
  if (body.renewalDate)
    doc.priceDetails.renewalDate = new Date(body.renewalDate);

  await doc.save();
};


export default handleSecuredServicesPriceDetails