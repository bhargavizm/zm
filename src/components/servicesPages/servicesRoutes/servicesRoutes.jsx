import dynamic from "next/dynamic";

export const directToCustomize = [
  'urls', 'meetings', 'google-meets', 'zoom-meets', 'microsoft-teams',
  'form-qr', 'forms', 'student-forms', 'personal-notes', 'youtube',
  'facebook', 'instagram', 'linkedin', 'twitter', 'location',
  , 'landing-page', 'github'
];

export    const componentMap = {
   audios: {
    content: dynamic(() => import('@/components/servicesPages/tabsContent/servicesContent/encryptedServices/audio/audioContent')),
    preview: dynamic(() => import('@/components/servicesPages/tabsContent/servicesContent/encryptedServices/audio/audioPreview')),
  },
   "pdf": {
    content: dynamic(() => import('@/components/servicesPages/tabsContent/servicesContent/encryptedServices/pdf/pdfContent')),
    preview: dynamic(() => import('@/components/servicesPages/tabsContent/servicesContent/encryptedServices/pdf/pdfPreview')),
  },
  videos: {
    content: dynamic(() => import('@/components/servicesPages/tabsContent/servicesContent/encryptedServices/video/videoContent')),
    preview: dynamic(() => import('@/components/servicesPages/tabsContent/servicesContent/encryptedServices/video/videoPreview')),
  },
    gallery: {
    content: dynamic(() => import('@/components/servicesPages/tabsContent/servicesContent/encryptedServices/gallery/galleryContent')),
    preview: dynamic(() => import('@/components/servicesPages/tabsContent/servicesContent/encryptedServices/gallery/galleryPreview')),
  },
  "business-cards": {
    content: dynamic(() => import("@/components/servicesPages/tabsContent/servicesContent/business/businessContent")),
    preview: dynamic(() => import("@/components/servicesPages/tabsContent/servicesContent/business/businessPreview")),
  },
  "v-cards": {
    content: dynamic(() => import("@/components/servicesPages/tabsContent/servicesContent/business/businessContent")),
    preview: dynamic(() => import("@/components/servicesPages/tabsContent/servicesContent/business/businessPreview")),
  },
  "product-cards": {
    content: dynamic(() => import("@/components/servicesPages/tabsContent/servicesContent/product/ProductContent")),
    preview: dynamic(() => import("@/components/servicesPages/tabsContent/servicesContent/product/productPreview")),
  },
  "Pet-ID-tags": {
    content: dynamic(() => import('@/components/servicesPages/tabsContent/servicesContent/petIdTag/PetTagContent')),
    preview: dynamic(() => import('@/components/servicesPages/tabsContent/servicesContent/petIdTag/petIDTagPreview')),
  },

  resumes: {
    content: dynamic(() => import('@/components/servicesPages/tabsContent/servicesContent/resume/resumeContent')),
    preview: dynamic(() => import('@/components/servicesPages/tabsContent/servicesContent/resume/resumePreview')),
  },
  vehicles: {
    content: dynamic(() => import('@/components/servicesPages/tabsContent/servicesContent/vehicle/VehicleContent')),
    preview: dynamic(() => import('@/components/servicesPages/tabsContent/servicesContent/vehicle/VehiclePreview')),
  },
  "kids-safety-qr-tags": {
    content: dynamic(() => import('@/components/servicesPages/tabsContent/servicesContent/kidSafety/KidsSafetyContent')),
    preview: dynamic(() => import('@/components/servicesPages/tabsContent/servicesContent/kidSafety/KidsSafetyPreview')),
  },
  sms: {
    content: dynamic(() => import("@/components/servicesPages/tabsContent/servicesContent/sms/smsContent")),
    preview: dynamic(() => import("@/components/servicesPages/tabsContent/servicesContent/sms/SmsPreview")),
  },
  "text-messages": {
    content: dynamic(() => import("@/components/servicesPages/tabsContent/servicesContent/textMsg/TextFormContent")),
    preview: dynamic(() => import("@/components/servicesPages/tabsContent/servicesContent/textMsg/TextFormPreview")),
  },
  "medical-alerts": {
    content: dynamic(() => import("@/components/servicesPages/tabsContent/servicesContent/medicalAlert/MedicalAlertContent")),
    preview: dynamic(() => import("@/components/servicesPages/tabsContent/servicesContent/medicalAlert/MedicalAlertPreview")),
  },
  events: {
    content: dynamic(() => import('@/components/servicesPages/tabsContent/servicesContent/events/eventContent')),
    preview: dynamic(() => import('@/components/servicesPages/tabsContent/servicesContent/events/eventPreview')),
  },
  "property-qr": {
    content: dynamic(() => import("@/components/servicesPages/tabsContent/servicesContent/property/PropertyContent")),
    preview: dynamic(() => import("@/components/servicesPages/tabsContent/servicesContent/property/PropertyPreview")),
  },
  "multi-urls": {
    content: dynamic(() => import("@/components/servicesPages/tabsContent/servicesContent/multiUrl/MultiUrlContent")),
    preview: dynamic(() => import("@/components/servicesPages/tabsContent/servicesContent/multiUrl/MultiUrlPreview")),
  },
  "business-shops": {
    content: dynamic(() => import('@/components/servicesPages/tabsContent/servicesContent/businessShop/businessShopContent')),
    preview: dynamic(() => import('@/components/servicesPages/tabsContent/servicesContent/businessShop/businessShopPreview')),
  },
  discounts: {
    content: dynamic(() => import('@/components/servicesPages/tabsContent/servicesContent/discountCoupon/DiscountCouponContent')),
    preview: dynamic(() => import('@/components/servicesPages/tabsContent/servicesContent/discountCoupon/DiscountCouponPreview')),
  },
  "menu-cards": {
    content: dynamic(() => import("@/components/servicesPages/tabsContent/servicesContent/menuBook/menuBookContent")),
    preview: dynamic(() => import("@/components/servicesPages/tabsContent/servicesContent/menuBook/menuBookPreview")),
  },
  wifi: {
    content: dynamic(() => import("@/components/servicesPages/tabsContent/servicesContent/wifi/wifiContent")),
    preview: dynamic(() => import("@/components/servicesPages/tabsContent/servicesContent/wifi/wifiPreview")),
  },
};

// "use client";

// import dynamic from "next/dynamic";

// const componentMap = {
//   "business-cards": {
//     content: dynamic(() => import("@/components/servicesPages/tabsContent/servicesContent/business/businessContent"), { ssr: false }),
//     preview: dynamic(() => import("@/components/servicesPages/tabsContent/servicesContent/business/businessPreview"), { ssr: false }),
//   },
//   "v-cards": {
//     content: dynamic(() => import("@/components/servicesPages/tabsContent/servicesContent/business/businessContent"), { ssr: false }),
//     preview: dynamic(() => import("@/components/servicesPages/tabsContent/servicesContent/business/businessPreview"), { ssr: false }),
//   },
//   "product-cards": {
//     content: dynamic(() => import("@/components/servicesPages/tabsContent/servicesContent/product/ProductContent"), { ssr: false }),
//     preview: dynamic(() => import("@/components/servicesPages/tabsContent/servicesContent/product/productPreview"), { ssr: false }),
//   },
//   audios: {
//     content: dynamic(() => import('@/components/servicesPages/tabsContent/servicesContent/audio/audioContent'), { ssr: false }),
//     preview: dynamic(() => import('@/components/servicesPages/tabsContent/servicesContent/audio/audioPreview'), { ssr: false }),
//   },
//   videos: {
//     content: dynamic(() => import('@/components/servicesPages/tabsContent/servicesContent/video/videoContent'), { ssr: false }),
//     preview: dynamic(() => import('@/components/servicesPages/tabsContent/servicesContent/video/videoPreview'), { ssr: false }),
//   },
//   "Pet-ID-tags": {
//     content: dynamic(() => import('@/components/servicesPages/tabsContent/servicesContent/petIdTag/PetTagContent'), { ssr: false }),
//     preview: dynamic(() => import('@/components/servicesPages/tabsContent/servicesContent/petIdTag/petIDTagPreview'), { ssr: false }),
//   },
//   gallery: {
//     content: dynamic(() => import('@/components/servicesPages/tabsContent/servicesContent/gallery/galleryContent'), { ssr: false }),
//     preview: dynamic(() => import('@/components/servicesPages/tabsContent/servicesContent/gallery/galleryPreview'), { ssr: false }),
//   },
//   resumes: {
//     content: dynamic(() => import('@/components/servicesPages/tabsContent/servicesContent/resume/resumeContent'), { ssr: false }),
//     preview: dynamic(() => import('@/components/servicesPages/tabsContent/servicesContent/resume/resumePreview'), { ssr: false }),
//   },
//   vehicles: {
//     content: dynamic(() => import('@/components/servicesPages/tabsContent/servicesContent/vehicle/VehicleContent'), { ssr: false }),
//     preview: dynamic(() => import('@/components/servicesPages/tabsContent/servicesContent/vehicle/VehiclePreview'), { ssr: false }),
//   },
//   "kids-safety-qr-tags": {
//     content: dynamic(() => import('@/components/servicesPages/tabsContent/servicesContent/kidSafety/KidsSafetyContent'), { ssr: false }),
//     preview: dynamic(() => import('@/components/servicesPages/tabsContent/servicesContent/kidSafety/KidsSafetyPreview'), { ssr: false }),
//   },
//   sms: {
//     content: dynamic(() => import("@/components/servicesPages/tabsContent/servicesContent/sms/smsContent"), { ssr: false }),
//     preview: dynamic(() => import("@/components/servicesPages/tabsContent/servicesContent/sms/SmsPreview"), { ssr: false }),
//   },
//   "text-messages": {
//     content: dynamic(() => import("@/components/servicesPages/tabsContent/servicesContent/textMsg/TextFormContent"), { ssr: false }),
//     preview: dynamic(() => import("@/components/servicesPages/tabsContent/servicesContent/textMsg/TextFormPreview"), { ssr: false }),
//   },
//   "medical-alerts": {
//     content: dynamic(() => import("@/components/servicesPages/tabsContent/servicesContent/medicalAlert/MedicalAlertContent"), { ssr: false }),
//     preview: dynamic(() => import("@/components/servicesPages/tabsContent/servicesContent/medicalAlert/MedicalAlertPreview"), { ssr: false }),
//   },
//   events: {
//     content: dynamic(() => import('@/components/servicesPages/tabsContent/servicesContent/events/eventContent'), { ssr: false }),
//     preview: dynamic(() => import('@/components/servicesPages/tabsContent/servicesContent/events/eventPreview'), { ssr: false }),
//   },
//   "property-qr": {
//     content: dynamic(() => import("@/components/servicesPages/tabsContent/servicesContent/property/PropertyContent"), { ssr: false }),
//     preview: dynamic(() => import("@/components/servicesPages/tabsContent/servicesContent/property/PropertyPreview"), { ssr: false }),
//   },
//   "multi-urls": {
//     content: dynamic(() => import("@/components/servicesPages/tabsContent/servicesContent/multiUrl/MultiUrlContent"), { ssr: false }),
//     preview: dynamic(() => import("@/components/servicesPages/tabsContent/servicesContent/multiUrl/MultiUrlPreview"), { ssr: false }),
//   },
//   "business-shops": {
//     content: dynamic(() => import('@/components/servicesPages/tabsContent/servicesContent/businessShop/BusinessContent'), { ssr: false }),
//     preview: dynamic(() => import('@/components/servicesPages/tabsContent/servicesContent/businessShop/BusinessPreview'), { ssr: false }),
//   },
//   discounts: {
//     content: dynamic(() => import('@/components/servicesPages/tabsContent/servicesContent/discountCoupon/DiscountCouponContent'), { ssr: false }),
//     preview: dynamic(() => import('@/components/servicesPages/tabsContent/servicesContent/discountCoupon/DiscountCouponPreview'), { ssr: false }),
//   },
//   "menu-cards": {
//     content: dynamic(() => import("@/components/servicesPages/tabsContent/servicesContent/menuBook/menuBookContent"), { ssr: false }),
//     preview: dynamic(() => import("@/components/servicesPages/tabsContent/servicesContent/menuBook/menuBookPreview"), { ssr: false }),
//   },
//   wifi: {
//     content: dynamic(() => import("@/components/servicesPages/tabsContent/servicesContent/wifi/wifiContent"), { ssr: false }),
//     preview: dynamic(() => import("@/components/servicesPages/tabsContent/servicesContent/wifi/wifiPreview"), { ssr: false }),
//   },
// };

// export default componentMap;
