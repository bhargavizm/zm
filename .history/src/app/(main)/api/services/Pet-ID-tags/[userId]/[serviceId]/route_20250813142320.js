// app/api/services/[userId]/[serviceId]/priceDetails.js

import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongoDB';
import propertySchema from '@/models/services/propertySchema';
import handleSecuredServicesPriceDetails from '@/app/(main)/api/common/handleSecuredServicesPriceDetails';
import path from 'path';
import url from 'url';

export async function PATCH(req, context) {
  try {
    // 1️⃣ Get params
    const { serviceId, userId } = await context.params;

    if (!userId || !serviceId) {
      return NextResponse.json(
        { success: false, message: 'Missing required URL parameters: userId or serviceId.' },
        { status: 400 }
      );
    }

    // 2️⃣ Detect service name automatically
    const __filename = url.fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    const serviceName = path.basename(path.dirname(path.dirname(__dirname))); // parent folder
    console.log('Detected service:', serviceName);

    // 3️⃣ Connect to DB
    await connectDB();

    // 4️⃣ Find the service document
    const doc = await propertySchema.findById(serviceId);
    if (!doc) {
      return NextResponse.json(
        { success: false, message: 'No data found for this service belonging to the user.' },
        { status: 404 }
      );
    }

    // 5️⃣ Ownership check
    if (doc.user.id.toString() !== userId.toString()) {
      return NextResponse.json(
        { success: false, message: 'Unauthorized: This service does not belong to the given user.' },
        { status: 403 }
      );
    }

    // 6️⃣ Parse FormData from request
    const formData = await req.formData();
    const body = {
      plan: formData.get('plan'),
      price: formData.get('price'),
      validityDays: formData.get('validityDays'),
      startDate: formData.get('startDate'),
      status: formData.get('status'),
      renewalDate: formData.get('renewalDate'),
    };

    // 7️⃣ Update the service price details
    await handleSecuredServicesPriceDetails(doc, body);

    return NextResponse.json(
      {
        success: true,
        message: `${serviceName} price details updated successfully.`,
        data: doc,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('❌ Update error:', error);
    return NextResponse.json(
      { success: false, message: 'Error updating price details.', error: error.message },
      { status: 500 }
    );
  }
}
