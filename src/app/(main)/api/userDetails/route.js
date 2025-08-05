// /app/api/user/services/route.js
import { connectDB } from "@/lib/mongoDB";
import { authentication } from "@/utils/authentication";
import MenuCardsServiceModel from "@/models/services/menuCardSchema";
import { BusinessCardsModel, VCardsModel } from "@/models/services/cardsSchema";
import ProductsModel from "@/models/services/productSchema";
import User from "@/models/auth/userSchema";
import { AudioServiceModel, GalleryServiceModel, PDFServiceModel, VideoServiceModel } from "@/models/services/encryptedServicesSchema";
import URLServiceModel from "@/models/services/urlServicesSchema";
import PetTagModal from "@/models/services/petIdSchema";
import MultiUrlModal from "@/models/services/multiUrlSchema";
import ResumeModel from "@/models/services/resumeSchema";
import MedicalAlertModel from "@/models/services/medicalAlertSchema";
import TextMessageModal from "@/models/services/textMessage";
import DiscountModal from "@/models/services/discountSchema";
import EventModel from "@/models/services/eventSchema";
import KidsSafetyModal from "@/models/services/kidSafetySchema";
import VehicleModel from "@/models/services/vehicleSchema";
import propertySchema from "@/models/services/propertySchema";
import WifiModel from "@/models/services/wifiSchema";
import SmsModal from "@/models/services/smsSchema";
import BusinessShopModal from "@/models/services/businessShopSchema";

export async function GET(request) {
  try {
    const { user, errorResponse } = await authentication(request);
    if (errorResponse) return errorResponse;

    await connectDB();

    // Fetch user profile (omit sensitive fields like password)
    const userProfile = await User.findById(user._id).select("-password -__v");

    // Define services to query
    const serviceMap = {
            pdf: PDFServiceModel,
      audio: AudioServiceModel,
      video: VideoServiceModel,
      gallery: GalleryServiceModel,
      urlServices: URLServiceModel,
      menuCard: MenuCardsServiceModel,
      businessCards: BusinessCardsModel,
      vCards: VCardsModel,
      businessShop:BusinessShopModal,
      product: ProductsModel,
      petIdTags:PetTagModal,
      multiUrl:MultiUrlModal,
      resume:ResumeModel,
      medicalAlert:MedicalAlertModel,
      textMessages:TextMessageModal,
      discount:DiscountModal,
      events:EventModel,
      kidsSafetyModel:KidsSafetyModal,
      vehicle:VehicleModel,
      property:propertySchema,
      wifi:WifiModel,
      sms:SmsModal
    };

    const servicesData = {};

    // Fetch data and counts for each service
    for (const [key, model] of Object.entries(serviceMap)) {
      const data = await model
        .find({ "user.id": user._id })
        .sort({ createdAt: -1 });
      servicesData[key] = {
        count: data.length,
        data,
      };
    }
    
const servicesArray = Object.entries(servicesData).map(
  ([serviceName, { count, data }]) => ({
    serviceName,
    count,
    data,
  })
);


    return new Response(
      JSON.stringify({
        success: true,
        message: "All User details fetched successfully.",
        userFullDetails:{
        userDetails: userProfile,
        services: servicesArray,
        }

      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error fetching user text messages:", error);
    return new Response(
      JSON.stringify({
        success: false,

        error: error.message,
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
