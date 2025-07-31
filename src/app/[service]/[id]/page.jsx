import dynamic from "next/dynamic";
import { notFound } from "next/navigation";
import { connectDB } from "@/lib/mongoDB";

import ResumeModel from "@/models/services/resumeSchema";
import SmsModal from "@/models/services/smsSchema";
import TextMessageModal from "@/models/services/textMessage";
import BusinessShopModel from '@/models/services/businessShopSchema';
import propertySchema from "@/models/services/propertySchema";
import MedicalAlertModel from "@/models/services/medicalAlertSchema";
import EventModel from "@/models/services/eventSchema";
import KidsSafetyModal from "@/models/services/kidSafetySchema";
import MenuCardsServiceModel from "@/models/services/menuCardSchema";
import VehicleModel from "@/models/services/vehicleSchema";
import SmsPreview from "@/components/scanningPreview/SmsPreview";
import TextMessagePreview from "@/components/scanningPreview/TextFormPreview";
import KidsSafetyPreview from "@/components/scanningPreview/KidsSafetyPreview";
import MenuBookPreview from "@/components/scanningPreview/menuBookPreview";

import BusinessShopPreview from "@/components/scanningPreview/BusinessShopPreview";
import VehiclePreview from "@/components/scanningPreview/vehiclePreview";
import ResumePreview from "@/components/scanningPreview/resumePreview";
import PropertyPreview from "@/components/scanningPreview/PropertyPreview";
import MultiUrlModal from "@/models/services/multiUrlSchema";
import MultiUrlPreview from "@/components/scanningPreview/multiUrlPreview";
import medicalalertsPreview from "@/components/scanningPreview/medicalalertsPreview";
import EventsPreview from "@/components/scanningPreview/eventsPreview";
//import BusinessPreview from "@/components/servicesPages/tabsContent/servicesContent/business/businessPreview";
import EventModal from "@/models/services/eventSchema";
import DiscountModal from "@/models/services/discountSchema";
import DiscountCouponPreview from "@/components/scanningPreview/DiscountCouponPreview";
import { BusinessCardsModel } from "@/models/services/cardsSchema";

import { model } from "mongoose";
import WifiModel from "@/models/services/wifiSchema";
import PetIdPreview from "@/components/scanningPreview/PetIdPreview";
import PetTagModal from "@/models/services/petIdSchema";
import ProductsModel from "@/models/services/productSchema";
import ProductPreview from "@/components/scanningPreview/product/productPreview";
//import { BusinessCardsModel } from "@/models/services/cardsSchema";
import EventModal from "@/models/services/eventSchema";
import DiscountModal from "@/models/services/discountSchema";
import DiscountCouponPreview from "@/components/scanningPreview/DiscountCouponPreview";
import { AudioServiceModel, GalleryServiceModel, PDFServiceModel, VideoServiceModel } from "@/models/services/encryptedServicesSchema";
import pdfPreview from "@/components/scanningPreview/pdfPreview";
import AudioPreview from "@/components/scanningPreview/audioPreview";
import VideoPreview from "@/components/scanningPreview/videoPreview";
import GalleryPreview from "@/components/scanningPreview/galleryPreview";
//import UrlServicePreview from "@/components/scanningPreview/urlServicesPreview";
import URLServiceModel from "@/models/services/urlServicesSchema";
import UrlPreview from "@/components/scanningPreview/urlServicesPreview";







const PasswordProtectedPreview = dynamic(() =>
  import("@/components/common/passwordModal")
);

export const urlServices = [
  'urls', 'meetings', 'google-meets', 'zoom-meets', 'microsoft-teams',
  'form-qr', 'forms', 'student-forms', 'personal-notes', 'youtube',
  'facebook', 'instagram', 'linkedin', 'twitter', 'location',
   'landing-page', 'github'
];

// Service map
const serviceMap = {
  instagram:{
  model: URLServiceModel,
    component: UrlPreview,
  },
  pdf:{
     model: PDFServiceModel,
    component: pdfPreview,
  },
  audios:{
     model: AudioServiceModel,
    component: AudioPreview,
  },
   videos:{
     model: VideoServiceModel,
    component: VideoPreview,
  },
   gallery:{
     model: GalleryServiceModel,
    component: GalleryPreview,
  },
  sms: {
    model: SmsModal,
    component: SmsPreview,
  },
  vehicle: {
    model: VehicleModel,
    component: VehiclePreview,
  },
  
  "menu-cards": {
    model: MenuCardsServiceModel,
    component: MenuBookPreview,
  },
  textMessage: {
    model: TextMessageModal,
    component: TextMessagePreview,
  },
  "kids-safety-qr-tags": {
    model: KidsSafetyModal,
    component: KidsSafetyPreview,
  },
  "Pet-ID-tags": {
    model: PetTagModal,
    component: PetIdPreview
  },  
  "business-shops": {
    model: BusinessShopModel,
    component: BusinessShopPreview
  },
  resume: {
    model: ResumeModel,
    component:ResumePreview, 
  },
  "property-qr": {
    model:propertySchema,
    component:PropertyPreview, 
  },
  "multi-urls": {
    model: MultiUrlModal,
    component: MultiUrlPreview,
  },
  "medical-alerts":{
    model:MedicalAlertModel,
    component:medicalalertsPreview,
  },
  events:{
    model:EventModel,
    component:EventsPreview,
  },

  discounts: {
    model: DiscountModal,
    component: DiscountCouponPreview,
  },
  "product-cards":{
    model:ProductsModel,
    component:ProductPreview,
  },

  wifi:{
    model:WifiModel,
    component:SmsPreview,
  }

}

// Add URL-only services to serviceMap dynamically
urlServices.forEach((serviceName) => {
  serviceMap[serviceName] = {
    model: URLServiceModel,
    component: UrlPreview,
  };
});

console.log(urlServices)

// Metadata
export async function generateMetadata({ params }) {
  const { service } = params;
  return {
    title:` ${service.charAt(0).toUpperCase() + service.slice(1)} - Details`,
  };
}

// Main Page
const Page = async ({ params }) => {
  const { service, id } = params;
  const serviceConfig = serviceMap[service];

  if (!serviceConfig) return notFound();

  await connectDB();

  let data = await serviceConfig.model.findById(id).lean();
  if (!data) return notFound();

  data = JSON.parse(JSON.stringify(data)); // Make serializable
console.log(service, id, data)
  return (
    <PasswordProtectedPreview
      data={data}
      Component={serviceConfig.component}
    />
  );
};

export default Page;


