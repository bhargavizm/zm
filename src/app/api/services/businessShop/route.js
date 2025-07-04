import { NextResponse } from 'next/server';
import { connectDB } from "@/lib/mongoDB";
import { cloudinary } from '@/utils/cloudinary'; // Ensure cloudinary config is correctly set up
import businessShopSchema from '@/models/services/businessShopSchema'; // Ensure Mongoose schema is correct

/**
 * Uploads a file to Cloudinary.
 * @param {File} file - The file to upload.
 * @returns {Promise<string|null>} The secure URL of the uploaded image, or null if no file.
 */
async function uploadImage(file) {
  if (!file) {
    console.log("No file provided for upload.");
    return null;
  }
  
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      { folder: 'business_shop' }, // Specify a folder in Cloudinary
      (error, result) => {
        if (error) {
          console.error("Cloudinary upload error:", error);
          reject(error);
        }
        else {
          resolve(result.secure_url);
        }
      }
    );
    uploadStream.end(buffer);
  });
}

/**
 * Deletes an image from Cloudinary using its URL.
 * Extracts the public ID and folder from the URL.
 * @param {string} url - The Cloudinary URL of the image to delete.
 */
async function deleteImage(url) {
  if (!url || typeof url !== 'string') {
    console.log("Invalid URL provided for deletion:", url);
    return;
  }
  
  try {
    // Example Cloudinary URL: https://res.cloudinary.com/cloud_name/image/upload/v12345/folder/public_id.ext
    const parts = url.split('/');
    const publicIdWithExtension = parts.pop(); // e.g., "public_id.ext"
    const publicId = publicIdWithExtension.split('.')[0]; // e.g., "public_id"
    const folderIndex = parts.indexOf('upload') + 1;
    const folderPath = parts.slice(folderIndex).join('/'); // e.g., "folder" or "folder1/folder2"

    const fullPublicId = folderPath ? `${folderPath}/${publicId}` : publicId;

    console.log(`Attempting to delete Cloudinary image with publicId: ${fullPublicId}`);
    const result = await cloudinary.uploader.destroy(fullPublicId);
    console.log(`Cloudinary deletion result for ${fullPublicId}:`, result);
  } catch (error) {
    console.error('Error deleting image from Cloudinary:', error);
  }
}

/**
 * Handles GET requests to retrieve business shop information.
 * Expects a 'userId' query parameter.
 */
export async function GET(req) {
  try {
    await connectDB();
    
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get('userId');
    
   

    const businessInfo = await businessShopSchema.findOne({ userId })
      .select('-__v -createdAt -updatedAt') // Exclude version key and timestamps
      .lean(); // Return plain JavaScript objects

    // Provide default empty objects/arrays if no data is found to prevent client-side errors
    return NextResponse.json({ 
      data: {
        businessInfo: businessInfo || {
          general: {},
          contact: {},
          media: { logo: null, galleryImages: [] }, // Ensure media fields are initialized
          security: {}
        },
        shopTimingsTemplate: businessInfo?.shopTimingsTemplate || {
          selectedTemplate: null,
          template1Data: { days: [] }, // Ensure days is initialized for template1
          template2Data: {}
        }
      } 
    }, { status: 200 });
  } catch (error) {
    console.error('GET Business Info Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch business information' },
      { status: 500 }
    );
  }
}

/**
 * Handles POST requests to create or update business shop information.
 * Expects form data with 'jsonData' (containing businessInfo, shopTimingsTemplate, userId)
 * and optionally 'logo' (File or string URL) and 'newGalleryImages' (Files).
 */
export async function POST(req) {
  try {
    await connectDB();
    
    const formData = await req.formData();
    const jsonData = formData.get('jsonData');
    
    if (!jsonData) {
      return NextResponse.json({ error: 'jsonData is missing in form data' }, { status: 400 });
    }

    const data = JSON.parse(jsonData);
    
    const userId = data.userId;
    if (!userId) {
      return NextResponse.json({ error: 'userId is required in jsonData' }, { status: 400 });
    }

    const existingInfo = await businessShopSchema.findOne({ userId });

    // --- Process Logo ---
    let logoUrl = null;
    const logoFileOrUrl = formData.get('logo'); // This can be a File, a string URL, or 'null'

    if (logoFileOrUrl instanceof File) {
        // Case 1: New logo file uploaded
        if (existingInfo?.media?.logo) {
            await deleteImage(existingInfo.media.logo); // Delete old logo from Cloudinary
        }
        logoUrl = await uploadImage(logoFileOrUrl);
    } else if (typeof logoFileOrUrl === 'string' && logoFileOrUrl !== 'null') {
        // Case 2: Existing logo URL was sent (meaning it was not changed/removed by user)
        logoUrl = logoFileOrUrl;
    } else if (logoFileOrUrl === 'null') {
        // Case 3: Logo was explicitly removed by the user
        if (existingInfo?.media?.logo) {
            await deleteImage(existingInfo.media.logo); // Delete existing logo from Cloudinary
        }
        logoUrl = null;
    }


    // --- Process Gallery Images ---
    // These are the URLs of existing images that the client decided to keep
    let finalGalleryUrls = data.businessInfo.media.galleryImages || []; 
    // These are the new File objects uploaded by the client
    const newGalleryFiles = formData.getAll('newGalleryImages'); 

    // Upload new gallery images
    const uploadedNewGalleryUrls = await Promise.all(
        Array.from(newGalleryFiles)
            .filter(file => file instanceof File) // Ensure it's a File object before mapping
            .map(uploadImage)
    );
    // Combine existing kept URLs with newly uploaded URLs
    finalGalleryUrls = [...finalGalleryUrls, ...uploadedNewGalleryUrls].filter(url => url); // Filter out any nulls

    // Determine which old images (from DB) are no longer in the final list and delete them
    const imagesToDelete = existingInfo?.media?.galleryImages?.filter(
        oldUrl => !finalGalleryUrls.includes(oldUrl)
    ) || [];

    if (imagesToDelete.length > 0) {
        console.log("Deleting old gallery images:", imagesToDelete);
        await Promise.all(imagesToDelete.map(deleteImage));
    }

    // Prepare the data to save/update in the database
    const businessInfoToSave = {
      userId,
      general: data.businessInfo.general,
      contact: data.businessInfo.contact,
      security: data.businessInfo.security,
      shopTimingsTemplate: data.shopTimingsTemplate,
      media: {
        logo: logoUrl,
        galleryImages: finalGalleryUrls
      }
    };

    // Update or create the document using upsert: true
    const result = await businessShopSchema.findOneAndUpdate(
        { userId },
        businessInfoToSave,
        { new: true, upsert: true, setDefaultsOnInsert: true } // new: return updated doc, upsert: create if not found, setDefaultsOnInsert: apply schema defaults on insert
    );

    return NextResponse.json(
      { 
        data: {
          businessInfo: result,
          shopTimingsTemplate: result.shopTimingsTemplate // Return the updated template data
        },
        message: 'Business information saved successfully'
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('POST Business Info Error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to save business information' },
      { status: 500 }
    );
  }
}

/**
 * Handles DELETE requests to remove business shop information.
 * Expects a 'userId' query parameter.
 */
export async function DELETE(req) {
  try {
    await connectDB();
    
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get('userId');
    
    

    // Find and delete the document
    const businessInfo = await businessShopSchema.findOneAndDelete({ userId });

    if (!businessInfo) {
      return NextResponse.json(
        { message: 'No business information found to delete for this user' },
        { status: 200 }
      );
    }

    // Delete associated media from Cloudinary
    if (businessInfo.media?.logo) {
      await deleteImage(businessInfo.media.logo);
    }

    if (businessInfo.media?.galleryImages?.length > 0) {
      await Promise.all(
        businessInfo.media.galleryImages.map(deleteImage)
      );
    }

    return NextResponse.json(
      { message: 'Business information and associated media deleted successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('DELETE Business Info Error:', error);
    return NextResponse.json(
      { error: 'Failed to delete business information' },
      { status: 500 }
    );
  }
}
