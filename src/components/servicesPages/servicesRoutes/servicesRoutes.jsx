"use client";

import dynamic from "next/dynamic";

const componentMap = {
  "business-cards": {
    content: dynamic(() => import("@/components/servicesPages/servicesContent/business/businessContent"), { ssr: false }),
    preview: dynamic(() => import("@/components/servicesPages/servicesContent/business/businessPreview"), { ssr: false }),
  },
  "v-cards": {
    content: dynamic(() => import("@/components/servicesPages/servicesContent/business/businessContent"), { ssr: false }),
    preview: dynamic(() => import("@/components/servicesPages/servicesContent/business/businessPreview"), { ssr: false }),
  },
  "product-cards": {
    content: dynamic(() => import("@/components/servicesPages/servicesContent/product/ProductContent"), { ssr: false }),
    preview: dynamic(() => import("@/components/servicesPages/servicesContent/product/productPreview"), { ssr: false }),
  },
  audios: {
    content: dynamic(() => import('@/components/servicesPages/servicesContent/audio/audioContent'), { ssr: false }),
    preview: dynamic(() => import('@/components/servicesPages/servicesContent/audio/audioPreview'), { ssr: false }),
  },
  videos: {
    content: dynamic(() => import('@/components/servicesPages/servicesContent/video/videoContent'), { ssr: false }),
    preview: dynamic(() => import('@/components/servicesPages/servicesContent/video/videoPreview'), { ssr: false }),
  },
  "Pet-ID-tags": {
    content: dynamic(() => import('@/components/servicesPages/servicesContent/petIdTag/PetTagContent'), { ssr: false }),
    preview: dynamic(() => import('@/components/servicesPages/servicesContent/petIdTag/petIDTagPreview'), { ssr: false }),
  },
  gallery: {
    content: dynamic(() => import('@/components/servicesPages/servicesContent/gallery/galleryContent'), { ssr: false }),
    preview: dynamic(() => import('@/components/servicesPages/servicesContent/gallery/galleryPreview'), { ssr: false }),
  },
  resumes: {
    content: dynamic(() => import('@/components/servicesPages/servicesContent/resume/resumeContent'), { ssr: false }),
    preview: dynamic(() => import('@/components/servicesPages/servicesContent/resume/resumePreview'), { ssr: false }),
  },
  vehicles: {
    content: dynamic(() => import('@/components/servicesPages/servicesContent/vehicle/VehicleContent'), { ssr: false }),
    preview: dynamic(() => import('@/components/servicesPages/servicesContent/vehicle/VehiclePreview'), { ssr: false }),
  },
  "kids-safety-qr-tags": {
    content: dynamic(() => import('@/components/servicesPages/servicesContent/kidSafety/KidsSafetyContent'), { ssr: false }),
    preview: dynamic(() => import('@/components/servicesPages/servicesContent/kidSafety/KidsSafetyPreview'), { ssr: false }),
  },
  sms: {
    content: dynamic(() => import("@/components/servicesPages/servicesContent/sms/SmsContent"), { ssr: false }),
    preview: dynamic(() => import("@/components/servicesPages/servicesContent/sms/SmsPreview"), { ssr: false }),
  },
  "text-messages": {
    content: dynamic(() => import("@/components/servicesPages/servicesContent/textMsg/TextFormContent"), { ssr: false }),
    preview: dynamic(() => import("@/components/servicesPages/servicesContent/textMsg/TextFormPreview"), { ssr: false }),
  },
  "medical-alerts": {
    content: dynamic(() => import("@/components/servicesPages/servicesContent/medicalAlert/MedicalAlertContent"), { ssr: false }),
    preview: dynamic(() => import("@/components/servicesPages/servicesContent/medicalAlert/MedicalAlertPreview"), { ssr: false }),
  },
  events: { // Corrected and singular 'events' entry
    content: dynamic(() => import('@/components/servicesPages/servicesContent/events/eventContent'), { ssr: false }),
    preview: dynamic(() => import('@/components/servicesPages/servicesContent/events/eventPreview'), { ssr: false }),
  },
  "property-qr": {
    content: dynamic(() => import("@/components/servicesPages/servicesContent/property/PropertyContent"), { ssr: false }),
    preview: dynamic(() => import("@/components/servicesPages/servicesContent/property/PropertyPreview"), { ssr: false }),
  },
  "multi-urls": {
    content: dynamic(() => import("@/components/servicesPages/servicesContent/multiUrl/MultiUrlContent"), { ssr: false }),
    preview: dynamic(() => import("@/components/servicesPages/servicesContent/multiUrl/MultiUrlPreview"), { ssr: false }),
  },
  "business-shops": { // Corrected and singular 'business-shops' entry
    content: dynamic(() => import('@/components/servicesPages/servicesContent/businessShop/BusinessContent'), { ssr: false }),
    preview: dynamic(() => import('@/components/servicesPages/servicesContent/businessShop/BusinessPreview'), { ssr: false }),
  },
  "discounts": {
    content: dynamic(() => import('@/components/servicesPages/servicesContent/discountCoupon/DiscountCouponContent'), { ssr: false }),
    preview: dynamic(() => import('@/components/servicesPages/servicesContent/discountCoupon/DiscountCouponPreview'), { ssr: false }),
  },
  "menu-books": {
    content: dynamic(() => import("@/components/servicesPages/servicesContent/menuBook/menuBookContent"), { ssr: false }),
    preview: dynamic(() => import("@/components/servicesPages/servicesContent/menuBook/menuBookPreview"), { ssr: false }),
  },
  wifi: {
    content: dynamic(() => import("@/components/servicesPages/servicesContent/wifi/wifiContent"), { ssr: false }),
    preview: dynamic(() => import("@/components/servicesPages/servicesContent/wifi/wifiPreview"), { ssr: false }),
  },
};

export default componentMap;