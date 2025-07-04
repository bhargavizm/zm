// import mongoose from "mongoose";

// const basicInfoSchema = new mongoose.Schema({
//   propertyName: String,
//   propertyType: String,
//   ownerName: String,
//   contactNumber: String,
//   alternateNumber: String,
//   propertyDescription: String,
// }, { _id: false });

// const addressInfoSchema = new mongoose.Schema({
//   address: String,
//   mapLink: String,
// }, { _id: false });

// const pricingInfoSchema = new mongoose.Schema({
//   price: String,
//   area: String,
//   amenities: String,
// }, { _id: false });

// const imagesSchema = new mongoose.Schema({
//   mainImage: String,                // Cloudinary or uploaded image URL
//   galleryImages: [String],         // Array of image URLs
// }, { _id: false });

// const propertySchema = new mongoose.Schema({
//   basicInfo: basicInfoSchema,
//   addressInfo: addressInfoSchema,
//   pricingInfo: pricingInfoSchema,
//   images: imagesSchema,
//   password: String,
// }, { timestamps: true });


// const PropertyModal =  mongoose.models.Property || mongoose.model("Property", propertySchema);

// export default PropertyModal
// models/services/propertySchema.js

import mongoose from "mongoose";

const propertySchema = new mongoose.Schema(
  {
    basicInfo: {
      propertyName: String,
      propertyType: String,
      ownerName: String,
      contactNumber: String,
      alternateNumber: String,
      propertyDescription: String,
    },
    addressInfo: {
      address: String,
      mapLink: String,
    },
    pricingInfo: {
      price: String,
      area: String,
      amenities: [String],
    },
    password: String,
    images: {
      mainImage: String,
      galleryImages: [String],
    },
  },
  { timestamps: true }
);

export default mongoose.models.Property || mongoose.model("Property", propertySchema);


