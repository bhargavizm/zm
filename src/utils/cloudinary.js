utils/cloudinary.js
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});
console.log("Cloudinary Config:", cloudinary.config());

export { cloudinary };

// CLOUDINARY_CLOUD_NAME=your_cloud_name
// CLOUDINARY_API_KEY=your_api_key
// CLOUDINARY_API_SECRET=your_api_secret
