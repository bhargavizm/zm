import mongoose from "mongoose";

const cardsSchema = new mongoose.Schema(
  {
    user: {
      id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
      name: String,
    },
    serviceName: {
      type: String,
      required: true, // "business-cards", "v-cards", etc.
    },
    name: { type: String, trim: true },
    subheading: { type: String, trim: true },
    mobile: { type: String, trim: true },
    designation: { type: String, trim: true },
    email: { type: String, trim: true, lowercase: true },
    mapLink: { type: String, trim: true },
    socialLink: { type: String, trim: true },
    socialLink2: { type: String, trim: true },
    address: { type: String, trim: true },
    password: { type: String },
    selectedTemplate: { type: String },
   profileImageUrl: {
  type: String,
  trim: true,
  default: "",
},

  },
  { timestamps: true }
);

// 🔍 Add index to speed up queries by user + service type
cardsSchema.index({ "user.id": 1, serviceType: 1 });

const CardsModel =
  mongoose.models.Cards || mongoose.model("Cards", cardsSchema);

export default CardsModel;
