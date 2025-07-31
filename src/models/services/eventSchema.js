// models/eventSchema.js

import mongoose from "mongoose";
import { qrCodeServicesSchema } from "./qrCodeServicesSchema";

const eventSchema = new mongoose.Schema({
  user: {
           id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
          name: String,
        },
  organizer: { type: String,  },
  title: { type: String, },
  summary: { type: String },
  fromDate: { type: Date, },
  toDate: { type: Date, },
  venue: { type: String },
  address: { type: String },
  contactName: { type: String },
  contactEmail: { type: String },
  contactPhone: { type: String },
  password:{type:String},
  bgDesign: { type: String },
  qrCodeDetails: qrCodeServicesSchema
}, {
  timestamps: true, // optional: adds createdAt and updatedAt fields
});

 
const EventModel = mongoose.models.Event || mongoose.model("Event", eventSchema);

export default EventModel