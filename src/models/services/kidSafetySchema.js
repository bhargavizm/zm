import mongoose from "mongoose";
import { qrCodeServicesSchema } from "./qrCodeServicesSchema";
import { securedServicesPricingDetailsSchema } from "./common/securedServicespricingDetails";

const phoneRegex = /^\+?[0-9]{10,15}$/; // Supports 10–15 digits, optional +country code

const kidsSafetySchema = new mongoose.Schema({
  user: {
    id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    name: String,
  },
  childName: { type: String },
  dob: { type: Date },
  classGrade: { type: String },

  schoolName: { type: String },
  schoolAddress: { type: String },
  schoolContact: {
    type: String,
    validate: {
      validator: (v) => phoneRegex.test(v),
      message: (props) => `${props.value} is not a valid phone number`,
    },
  },

  parentName: { type: String },
  contact: {
    type: String,
    validate: {
      validator: (v) => phoneRegex.test(v),
      message: (props) => `${props.value} is not a valid phone number`,
    },
  },
  contact2: {
    type: String,
    validate: {
      validator: (v) => phoneRegex.test(v),
      message: (props) => `${props.value} is not a valid phone number`,
    },
  },
  altContact: [
    {
      type: String,
      validate: {
        validator: (v) => phoneRegex.test(v),
        message: (props) => `${props.value} is not a valid phone number`,
      },
    },
  ],

  homeAddress: { type: String },

  mapLink: {
    type: String,
    validate: {
      validator: function (v) {
        return (
          !v || /^https:\/\/(www\.)?(google\.[a-z.]+\/maps|maps\.google\.[a-z.]+)\//.test(v)
        );
      },
      message: (props) =>
        `${props.value} is not a valid Google Maps link`,
    },
  },

  password: { type: String },
  bgDesign:{type:String},
  
  kidsImage: [
    {
      url: String,
      name: String,
    },
    
  ],
  qrCodeDetails: qrCodeServicesSchema,
  priceDetails:securedServicesPricingDetailsSchema
}, { timestamps: true });

const KidsSafetyModal =
  mongoose.models.KidsSafety ||
  mongoose.model("KidsSafety", kidsSafetySchema);

export default KidsSafetyModal;
