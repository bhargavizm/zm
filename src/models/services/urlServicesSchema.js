
const mongoose = require("mongoose");

const URLServicesSchema = new mongoose.Schema(
  {
    serviceName: { type: String, required: true, unique: true },
    url: { type: String, required: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

const serviceModel = mongoose.models.Service || mongoose.model("URL-Services", URLServicesSchema);
module.exports = { serviceModel };
