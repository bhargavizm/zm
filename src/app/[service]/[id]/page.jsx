import dynamic from "next/dynamic";
import { notFound } from "next/navigation";
import { connectDB } from "@/lib/mongoDB";
import PetTagModal from "@/models/services/petIdSchema";
import ResumeModel from "@/models/services/resumeSchema";
import SmsModal from "@/models/services/smsSchema";
import TextMessageModal from "@/models/services/textMessage";
import BusinessShopModel from '@/models/services/businessShopSchema';
import propertySchema from "@/models/services/propertySchema";
import KidsSafetyModal from "@/models/services/kidSafetySchema";
import MenuCardsServiceModel from "@/models/services/menuCardSchema";
import VehicleModel from "@/models/services/vehicleSchema";
import SmsPreview from "@/components/scanningPreview/SmsPreview";
import TextMessagePreview from "@/components/scanningPreview/TextFormPreview";
import KidsSafetyPreview from "@/components/scanningPreview/KidsSafetyPreview";
import MenuBookPreview from "@/components/scanningPreview/menuBookPreview";
import PetIdPreview from "@/components/scanningPreview/PetIdPreview";
import BusinessShopPreview from "@/components/scanningPreview/BusinessShopPreview";
import VehiclePreview from "@/components/scanningPreview/vehiclePreview";
import ResumePreview from "@/components/scanningPreview/resumePreview";
import PropertyPreview from "@/components/scanningPreview/PropertyPreview";
import URLServicesPreview from "@/components/scanningPreview/urlServicesPreview";
import URLServiceModel from "@/models/services/urlServicesSchema";
import MultiUrlModal from "@/models/services/multiUrlSchema";
import MultiUrlPreview from "@/components/scanningPreview/multiUrlPreview";
import CardsModel from "@/models/services/cardsSchema";
import BusinessPreview from "@/components/servicesPages/tabsContent/servicesContent/business/businessPreview";
import EventModal from "@/models/services/eventSchema";
import EventModel from "@/models/services/eventSchema";
import EventPreview from "@/components/servicesPages/tabsContent/servicesContent/events/eventPreview";
import DiscountModal from "@/models/services/discountSchema";
import DiscountCouponPreview from "@/components/scanningPreview/DiscountCouponPreview";



const PasswordProtectedPreview = dynamic(() =>
  import("@/components/common/passwordModal")
);

export const urlServices = [
  'urls', 'meetings', 'google-meets', 'zoom-meets', 'microsoft-teams',
  'form-qr', 'forms', 'student-forms', 'personal-notes', 'youtube',
  'facebook', 'instagram', 'linkedin', 'twitter', 'location',
  , 'landing-page', 'github'
];

// Service map
const serviceMap = {
  urlServices: {
    model: URLServiceModel, // Replace with your actual model
    component: URLServicesPreview,
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
  kidsSafety: {
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
  "business-cards":{
    model: CardsModel,
    component: BusinessPreview,
  }
  discounts: {
    model: DiscountModal,
    component: DiscountCouponPreview,
  },
};


// Metadata
export async function generateMetadata({ params }) {
  const { service } = params;
  return {
    title: `${service.charAt(0).toUpperCase() + service.slice(1)} - Details`,
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
  return (
    <PasswordProtectedPreview
      data={data}
      Component={serviceConfig.component}
    />
  );
};

export default Page;



// // Metadata generation
// export async function generateMetadata({ params }) {
//   const { service } = params;
//   return {

//     title: `${service.charAt(0).toUpperCase() + service.slice(1)} - Details`,

//     title: ${service.charAt(0).toUpperCase() + service.slice(1)} - Details,
//   };
// }

// // Page component
// const Page = async ({ params }) => {
//   const { service, id } = params;
//   const serviceConfig = serviceMap[service];

//   if (!serviceConfig) return notFound();

//   await connectDB();
//   let data = await serviceConfig.model.findById(id).lean();
//   if (!data) return notFound();

//   data = JSON.parse(JSON.stringify(data)); // Make serializable
//   const ComponentToRender = serviceConfig.component;

//   return (
//     <PasswordModal data={data}>
//       <ComponentToRender data={data} />
//     </PasswordModal>
//   );
// };


// export default Page;


// export default Page;

