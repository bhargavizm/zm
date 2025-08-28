import { connectDB } from "@/lib/mongoDB";
import { authUser } from "@/middlewares/authMiddleware";
import VehicleModel from "@/models/services/vehicleSchema";
import { v2 as cloudinary } from 'cloudinary';
import { Readable } from 'stream';
import bcrypt from "bcryptjs";
import { getShortenedUrl } from "@/utils/shortenUrl";
import { map } from "zod";

// Configure Cloudinary
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

// Enhanced file upload function with error handling
async function uploadToCloudinary(buffer, originalFileName, folder) {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        resource_type: 'auto',
        folder: `vehicle_services/${folder}`,
        public_id: `${Date.now()}-${originalFileName.split('.')[0]}`,
        overwrite: false,
      },
      (error, result) => {
        if (error) {
          console.error(`Cloudinary upload error for ${originalFileName}:`, error);
          return reject(new Error(`Failed to upload ${originalFileName}`));
        }
        resolve(result.secure_url);
      }
    );

    const readableStream = new Readable();
    readableStream.push(buffer);
    readableStream.push(null);
    readableStream.pipe(uploadStream);
  });
}

// Improved form data parser with validation
async function parseFormData(request) {
  try {
    const formData = await request.formData();
    
    return {
      // Vehicle details
      vehicleTemplate: formData.get('vehicleTemplate') || 'none',
      vehicleModel: formData.get('vehicleModel'),
      vehicleType: formData.get('vehicleType'),
      vehicleNumber: formData.get('vehicleNumber'),
      description: formData.get('description'),
      
      // Registration
      rcNumber: formData.get('rcNumber'),
      driverName: formData.get('driverName'),
      ownerName: formData.get('ownerName'),
      
      // Contact
      contact: formData.get('contact'),
      altContact: formData.get('altContact'),
      address: formData.get('address'),
      mapLink: formData.get('mapLink'),
      
      // Security
      password: formData.get('password'),
      
      // Design
      bgDesign: formData.get('bgDesign'),
      
      // QR Code details
      qrCodeImage: formData.get('qrCodeImage'),
      qrPassword: formData.get('qrPassword'),
      latitude: parseFloat(formData.get('latitude') || 0),
      longitude: parseFloat(formData.get('longitude') || 0),
      qrAddress: formData.get('qrAddress'),
      renewalDate: formData.get('renewalDate'),
      status: formData.get('status') || 'active',
      
      // Files
      vehicleImage: formData.get('vehicleImage'),
      licenseFront: formData.get('licenseFront'),
      licenseBack: formData.get('licenseBack'),
      rcFront: formData.get('rcFront'),
      rcBack: formData.get('rcBack'),
      pollution: formData.get('pollution'),
      galleryImages: formData.getAll('galleryImages').filter(file => file.size > 0),
      insurance: formData.getAll('insurance').filter(file => file.size > 0),
    };
  } catch (error) {
    console.error('Error parsing form data:', error);
    throw new Error('Invalid form data submission');
  }
}

// Enhanced file upload handler
async function handleFileUploads(fields) {
  const uploads = {
    vehicleImage: null,
    licenseFront: null,
    licenseBack: null,
    rcFront: null,
    rcBack: null,
    pollution: null,
    galleryImages: [],
    insurance: []
  };

  // Process single file uploads
  const singleFiles = [
    { field: 'vehicleImage', folder: 'main' },
    { field: 'licenseFront', folder: 'documents' },
    { field: 'licenseBack', folder: 'documents' },
    { field: 'rcFront', folder: 'documents' },
    { field: 'rcBack', folder: 'documents' },
    { field: 'pollution', folder: 'documents' }
  ];

  for (const { field, folder } of singleFiles) {
    if (fields[field]?.size > 0) {
      try {
        const buffer = Buffer.from(await fields[field].arrayBuffer());
        uploads[field] = await uploadToCloudinary(buffer, fields[field].name, folder);
      } catch (error) {
        console.error(`Error uploading ${field}:`, error);
        throw new Error(`Failed to upload ${field}`);
      }
    }
  }

  // Process gallery images
  if (fields.galleryImages?.length > 0) {
    for (const [index, file] of fields.galleryImages.entries()) {
      try {
        const buffer = Buffer.from(await file.arrayBuffer());
        const url = await uploadToCloudinary(buffer, `gallery-${index}-${file.name}`, 'gallery');
        uploads.galleryImages.push(url);
      } catch (error) {
        console.error(`Error uploading gallery image ${index}:`, error);
        // Continue with other images even if one fails
      }
    }
  }

  // Process insurance documents
  if (fields.insurance?.length > 0) {
    for (const [index, file] of fields.insurance.entries()) {
      try {
        const buffer = Buffer.from(await file.arrayBuffer());
        const url = await uploadToCloudinary(buffer, `insurance-${index}-${file.name}`, 'insurance');
        uploads.insurance.push(url);
      } catch (error) {
        console.error(`Error uploading insurance document ${index}:`, error);
        // Continue with other documents even if one fails
      }
    }
  }

  return uploads;
}

// Enhanced validation
function validateVehicleData(data) {
  const errors = {};

  // if (!data.vehicleModel?.trim()) {
  //   errors.vehicleModel = 'Vehicle model is required';
  // }

  if (!data.rcNumber?.trim()) {
    errors.rcNumber = 'RC number is required';
  }

  if (!data.vehicleImage) {
    errors.vehicleImage = 'Vehicle image is required';
  }

  // if (data.contact && !/^\d{10,15}$/.test(data.contact)) {
  //   errors.contact = 'Invalid contact number format';
  // }

  // if (data.altContact && !/^\d{10,15}$/.test(data.altContact)) {
  //   errors.altContact = 'Invalid alternate contact number format';
  // }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}

export async function POST(request) {
  try {
    // Authentication check
    const auth = await authUser(request);
    if (auth.status !== 200) {
      return Response.json(auth.json, { status: auth.status });
    }

    await connectDB();

    // Parse and validate form data
    const formFields = await parseFormData(request);
    // const { isValid, errors } = validateVehicleData(formFields);
    
    // if (!isValid) {
    //   return Response.json(
    //     { error: 'Validation failed', errors },
    //     { status: 400 }
    //   );
    // }

    // Handle file uploads
    const mediaUrls = await handleFileUploads(formFields);

    // Hash password if provided
    let hashedPassword = '';
    if (formFields.password) {
      const salt = await bcrypt.genSalt(10);
      hashedPassword = await bcrypt.hash(formFields.password, salt);
    }

    

    // Prepare vehicle data
    const vehicleData = {
      user: {
        id: auth.user._id,
        name: auth.user.name,
      },
      general: {
        vehicleModel: formFields.vehicleModel,
        vehicleType: formFields.vehicleType,
        vehicleNumber: formFields.vehicleNumber,
        description: formFields.description,
      },
      registration: {
        rcNumber: formFields.rcNumber,
        driverName: formFields.driverName,
        ownerName: formFields.ownerName,
      },
      contact: {
        contact: formFields.contact,
        altContact: formFields.altContact,
        address: formFields.address,
        mapLink: formFields.mapLink,
      },
      media: mediaUrls,
      password: hashedPassword,
      vehicleTemplate: formFields.vehicleTemplate,
      bgDesign: formFields.bgDesign,
      qrCodeDetails: {
        qrCodeImage: formFields.qrCodeImage || '',
       scanCount: 0,
    lastScanAt: null,
    scanHistory: [
      
    ],
    lastScanLocation: {
      city: "",
      region: "",
      country: "",
      lat: null,
      lon: null,
    },
    qrCodeStatus: "inactive",

      }
    };

    // Create vehicle record
    const newVehicle = await VehicleModel.create(vehicleData);
    
    // Generate shortened URL for QR code
    const qrUrl = await getShortenedUrl(`/vehicle/${newVehicle._id}`);

    return Response.json(
      {
        success: true,
        message: 'Vehicle created successfully',
        data: newVehicle,
        qrUrl
      },
      { status: 201 }
    );

  } catch (error) {
    console.error('Error in vehicle creation:', error);
    return Response.json(
      {
        error: error.message || 'Failed to create vehicle',
        ...(process.env.NODE_ENV === 'development' && { details: error.stack })
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    await connectDB();

    const vehicles = await VehicleModel.find({})
      .select('-password -__v')
      .sort({ createdAt: -1 })
      .limit(50)
      .lean();

    return Response.json(
      {
        success: true,
        count: vehicles.length,
        data: vehicles
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Error fetching vehicles:', error);
    return Response.json(
      {
        error: 'Failed to fetch vehicles',
        ...(process.env.NODE_ENV === 'development' && { details: error.message })
      },
      { status: 500 }
    );
  }
}