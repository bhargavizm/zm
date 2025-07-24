// // Located at: app/api/services/vehicle/route.js (App Router)
// // Or: pages/api/services/vehicle.js (Pages Router)

// import { connectDB } from "@/lib/mongoDB";
// import { authUser } from "@/middlewares/authMiddleware";
// import VehicleModel from "@/models/services/vehicleSchema";
// import { v2 as cloudinary } from 'cloudinary';
// import { Readable } from 'stream';
// import bcrypt from "bcryptjs";

// // Configure Cloudinary
// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// });

// export const config = {
//   api: {
//     bodyParser: false,
//   },
// };

// /**
//  * Parses FormData from the request
//  */
// async function parseFormData(request) {
//   const formData = await request.formData();

//   return {
//     selectedTemplate: formData.get('selectedTemplate'),
//     vehicleModel: formData.get('vehicleModel'),
//     vehicleType: formData.get('vehicleType'),
//     description: formData.get('description'),
//     rcNumber: formData.get('rcNumber'),
//     driverName: formData.get('driverName'),
//     contact: formData.get('contact'),
//     ownerName: formData.get('ownerName'),
//     altContact: formData.get('altContact'),
//     address: formData.get('address'),
//     password: formData.get('password'),
//     vehicleImage: formData.get('vehicleImage'),
//     licenseFront: formData.get('licenseFront'),
//     licenseBack: formData.get('licenseBack'),
//     rcFront: formData.get('rcFront'),
//     rcBack: formData.get('rcBack'),
//     galleryImages: formData.getAll('galleryImages').filter(file => file.size > 0),
//   };
// }

// /**
//  * Uploads a file to Cloudinary
//  */
// async function uploadToCloudinary(buffer, originalFileName, folder) {
//   return new Promise((resolve, reject) => {
//     const uploadStream = cloudinary.uploader.upload_stream(
//       {
//         resource_type: 'auto',
//         folder: folder,
//         public_id: originalFileName.split('.')[0],
//         overwrite: true,
//       },
//       (error, result) => {
//         if (error) return reject(error);
//         resolve(result.secure_url);
//       }
//     );

//     const readableStream = new Readable();
//     readableStream.push(buffer);
//     readableStream.push(null);
//     readableStream.pipe(uploadStream);
//   });
// }

// /**
//  * Handles file uploads to Cloudinary
//  */
// async function handleFileUploads(fields) {
//   const uploads = {};
//   const fileFields = [
//     { field: 'vehicleImage', folder: 'vehicles' },
//     { field: 'licenseFront', folder: 'vehicle_docs' },
//     { field: 'licenseBack', folder: 'vehicle_docs' },
//     { field: 'rcFront', folder: 'vehicle_docs' },
//     { field: 'rcBack', folder: 'vehicle_docs' },
//   ];

//   // Upload single files
//   for (const { field, folder } of fileFields) {
//     const file = fields[field];
//     if (file && file.size > 0) {
//       try {
//         const buffer = Buffer.from(await file.arrayBuffer());
//         uploads[field] = await uploadToCloudinary(buffer, file.name, folder);
//       } catch (error) {
//         console.error(`Failed to upload ${field}:`, error);
//         throw new Error(`Failed to upload ${field}`);
//       }
//     }
//   }

//   // Upload gallery images
//   if (fields.galleryImages?.length > 0) {
//     uploads.galleryImages = [];
//     for (const file of fields.galleryImages) {
//       try {
//         const buffer = Buffer.from(await file.arrayBuffer());
//         const url = await uploadToCloudinary(buffer, file.name, 'vehicle_gallery');
//         uploads.galleryImages.push(url);
//       } catch (error) {
//         console.error('Failed to upload gallery image:', error);
//         throw new Error('Failed to upload one or more gallery images');
//       }
//     }
//   }

//   return uploads;
// }

// /**
//  * Validate vehicle data
//  */
// function validateVehicleData(data) {
//   const errors = {};


//   if (!data.rcNumber?.trim()) {
//     errors.rcNumber = 'RC number is required';
//   }

//   if (!data.vehicleImage) {
//     errors.vehicleImage = 'Vehicle image is required';
//   }

  

//   return {
//     isValid: Object.keys(errors).length === 0,
//     errors
//   };
// }

// export async function POST(request) {

//   const auth = await authUser(request);
//       if (auth.status !== 200) {
//         return Response.json(auth.json, { status: auth.status });
//       }
  
//       const user = auth.user;

//   await connectDB();

//   try {
//     // Parse form data
//     const fields = await parseFormData(request);

    

//     // Validate data
//     const { isValid, errors } = validateVehicleData({
//       vehicleModel: fields.vehicleModel,
//       rcNumber: fields.rcNumber,
//       vehicleImage: fields.vehicleImage,
//       password: fields.password,
//     });

//     if (!isValid) {
//       return new Response(
//         JSON.stringify({ 
//           error: 'Validation failed',
//           errors 
//         }), 
//         { 
//           status: 400, 
//           headers: { 'Content-Type': 'application/json' } 
//         }
//       );
//     }

//     // Handle file uploads
//     const mediaUrls = await handleFileUploads(fields);

//   let hashedPassword = '';
// if (fields.password) {
//   const salt = await bcrypt.genSalt(10);
//   hashedPassword = await bcrypt.hash(fields.password, salt);
// }


//     // Prepare vehicle data for database
//     const vehicleData = {
//        user: {
//         id: user._id,
//         name: user.name,
//       },
//       template: {
//         selectedTemplate: fields.selectedTemplate || 'none',
//       },
//       general: {
//         vehicleModel: fields.vehicleModel,
//         vehicleType: fields.vehicleType,
//         description: fields.description,
//       },
//       registration: {
//         rcNumber: fields.rcNumber,
//         driverName: fields.driverName,
//         ownerName: fields.ownerName,
//       },
//       contact: {
//         contact: fields.contact,
//         altContact: fields.altContact,
//         address: fields.address,
//       },
//       media: mediaUrls,
//       security: {
//         password: hashedPassword, // In production, hash this password
//       },
//     };

//     // Save to database
//     const newVehicle = await VehicleModel.create(vehicleData);

//     return new Response(
//       JSON.stringify({ 
//         success: true,
//         message: 'Vehicle created successfully',
//         data: newVehicle
//       }),
//       { 
//         status: 201, 
//         headers: { 'Content-Type': 'application/json' } 
//       }
//     );

//   } catch (error) {
//     console.error('Error creating vehicle:', error);
//     return new Response(
//       JSON.stringify({ 
//         error: error.message || 'Failed to create vehicle',
//         ...(process.env.NODE_ENV === 'development' && { stack: error.stack })
//       }),
//       { 
//         status: error.message.includes('Validation') ? 400 : 500,
//         headers: { 'Content-Type': 'application/json' } 
//       }
//     );
//   }
// }

// export async function GET() {
//   await connectDB();

//   try {
//     const vehicles = await VehicleModel.find({})
//       .select('-security.password')
//       .sort({ createdAt: -1 })
//       .limit(50);

//     return new Response(
//       JSON.stringify({ 
//         success: true,
//         count: vehicles.length,
//         data: vehicles 
//       }),
//       { 
//         status: 200, 
//         headers: { 'Content-Type': 'application/json' } 
//       }
//     );
//   } catch (error) {
//     console.error('Error fetching vehicles:', error);
//     return new Response(
//       JSON.stringify({ 
//         error: 'Failed to fetch vehicles',
//         ...(process.env.NODE_ENV === 'development' && { details: error.message })
//       }),
//       { 
//         status: 500, 
//         headers: { 'Content-Type': 'application/json' } 
//       }
//     );
//   }
// }

// Located at: app/api/services/vehicle/route.js (App Router)
// Or: pages/api/services/vehicle.js (Pages Router)

import { connectDB } from "@/lib/mongoDB";
import { authUser } from "@/middlewares/authMiddleware";
import VehicleModel from "@/models/services/vehicleSchema";
import { v2 as cloudinary } from 'cloudinary';
import { Readable } from 'stream';
import bcrypt from "bcryptjs";
import { getShortenedUrl } from "@/utils/shortenUrl";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const config = {
  api: {
    bodyParser: false,
  },
};

// Parse multipart/form-data from request
async function parseFormData(request) {
  const formData = await request.formData();

  return {
    selectedTemplate: formData.get('selectedTemplate'),
    vehicleModel: formData.get('vehicleModel'),
    vehicleType: formData.get('vehicleType'),
    description: formData.get('description'),
    rcNumber: formData.get('rcNumber'),
    driverName: formData.get('driverName'),
    ownerName: formData.get('ownerName'),
    contact: formData.get('contact'),
    altContact: formData.get('altContact'),
    address: formData.get('address'),
    password: formData.get('password'),
    qrCodeImage: formData.get("qrCodeImage") || "",
    qrPassword: formData.get("qrPassword") || "",
    latitude: parseFloat(formData.get("latitude") || "0"),
    longitude: parseFloat(formData.get("longitude") || "0"),
    qrAddress: formData.get("qrAddress") || "",
    renewalDate: formData.get("renewalDate") || null,
    status: formData.get("status") || "active",
    vehicleImage: formData.get("vehicleImage"),
    licenseFront: formData.get("licenseFront"),
    licenseBack: formData.get("licenseBack"),
    rcFront: formData.get("rcFront"),
    rcBack: formData.get("rcBack"),
    galleryImages: formData.getAll("galleryImages").filter(file => file.size > 0),
  };
}

// Upload file to Cloudinary
async function uploadToCloudinary(buffer, originalFileName, folder) {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        resource_type: 'auto',
        folder,
        public_id: originalFileName.split('.')[0],
        overwrite: true,
      },
      (error, result) => {
        if (error) return reject(error);
        resolve(result.secure_url);
      }
    );

    const readableStream = new Readable();
    readableStream.push(buffer);
    readableStream.push(null);
    readableStream.pipe(uploadStream);
  });
}

// Upload all files
async function handleFileUploads(fields) {
  const uploads = {};
  const fileFields = [
    { field: 'vehicleImage', folder: 'vehicles' },
    { field: 'licenseFront', folder: 'vehicle_docs' },
    { field: 'licenseBack', folder: 'vehicle_docs' },
    { field: 'rcFront', folder: 'vehicle_docs' },
    { field: 'rcBack', folder: 'vehicle_docs' },
  ];

  for (const { field, folder } of fileFields) {
    const file = fields[field];
    if (file && file.size > 0) {
      const buffer = Buffer.from(await file.arrayBuffer());
      uploads[field] = await uploadToCloudinary(buffer, file.name, folder);
    }
  }

  // Gallery images
  uploads.galleryImages = [];
  for (const file of fields.galleryImages) {
    const buffer = Buffer.from(await file.arrayBuffer());
    const url = await uploadToCloudinary(buffer, file.name, "vehicle_gallery");
    uploads.galleryImages.push(url);
  }

  return uploads;
}

// Basic validation
function validateVehicleData(data) {
  const errors = {};

  if (!data.rcNumber?.trim()) errors.rcNumber = "RC number is required";
  if (!data.vehicleImage) errors.vehicleImage = "Vehicle image is required";

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

// POST route - create vehicle
export async function POST(request) {
  const auth = await authUser(request);
  if (auth.status !== 200) {
    return new Response(JSON.stringify(auth.json), { status: auth.status });
  }

  await connectDB();

  try {
    const fields = await parseFormData(request);

    const { isValid, errors } = validateVehicleData(fields);
    if (!isValid) {
      return new Response(JSON.stringify({ error: "Validation failed", errors }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const mediaUrls = await handleFileUploads(fields);

    let hashedPassword = "";
    if (fields.password) {
      const salt = await bcrypt.genSalt(10);
      hashedPassword = await bcrypt.hash(fields.password, salt);
    }

    const vehicleData = {
      user: {
        id: auth.user._id,
        name: auth.user.name,
      },
      template: {
        selectedTemplate: fields.selectedTemplate || "none",
      },
      general: {
        vehicleModel: fields.vehicleModel,
        vehicleType: fields.vehicleType,
        description: fields.description,
      },
      registration: {
        rcNumber: fields.rcNumber,
        driverName: fields.driverName,
        ownerName: fields.ownerName,
      },
      contact: {
        contact: fields.contact,
        altContact: fields.altContact,
        address: fields.address,
      },
      media: mediaUrls,
      security: {
        password: hashedPassword,
      },
      qrCodeDetails: {
        qrCodeImage: fields.qrCodeImage || "",
        location: {
          latitude: fields.latitude || null,
          longitude: fields.longitude || null,
          address: fields.qrAddress || "",
        },
        renewalDate: fields.renewalDate ? new Date(fields.renewalDate) : null,
        status: fields.status || "active",
        resetPasswordToken: null,
        resetPasswordExpires: null,
      },
    };

    const newVehicle = await VehicleModel.create(vehicleData);

    const qrUrl = await getShortenedUrl(`/vehicle/${newVehicle._id}`);

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Vehicle created successfully',
        data: newVehicle,
        qrUrl: qrUrl

      }),
      {
        status: 201,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error creating vehicle:", error);
    return new Response(
      JSON.stringify({
        error: error.message || "Failed to create vehicle",
        ...(process.env.NODE_ENV === "development" && { stack: error.stack }),
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}

// GET route - list vehicles
export async function GET() {
  await connectDB();

  try {
    const vehicles = await VehicleModel.find({})
      .select("-security.password")
      .sort({ createdAt: -1 })
      .limit(50);

    return new Response(
      JSON.stringify({
        success: true,
        count: vehicles.length,
        data: vehicles,
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error fetching vehicles:", error);
    return new Response(
      JSON.stringify({
        error: "Failed to fetch vehicles",
        ...(process.env.NODE_ENV === "development" && { details: error.message }),
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
