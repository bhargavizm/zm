// ✅ add all slice actions

import {
  
  setCardServices,
  setMenuCardServices,
  setPetIdServices,
  setPropertyServices,
  setResumeServices,
  setMultiUrlServices,
  setSmsServices,
  setTextMessageServices,
  setVehicleServices,
  setKidsSafetyServices,
  setProductCardServices,
  setMedicalServices,
  setEventServices,
  setDiscountServices,
  setWifiServices,
  setBusinessShopServices,

} from "@/redux/slices/servicesSlice";

import { urlBasedServices } from "./formDataMappers";
import { setURLServices } from "@/redux/slices/urlServicesSlice";
import {
  setAudioServices,
  setGalleryServices,
  setPDFServices,
  setVideoServices,
} from "@/redux/slices/encryptedServicesSlice";

export const reduxDispatchMappers = {
  "menu-cards": setMenuCardServices,
  sms: setSmsServices,
  "business-cards": setCardServices,
  "v-cards": setCardServices,
  "text-messages": setTextMessageServices,
  vehicles:setVehicleServices,
  audios: setAudioServices,
  pdf: setPDFServices,
  gallery: setGalleryServices,
  videos: setVideoServices,
  "Pet-ID-tags": setPetIdServices,
  "business-shops": setBusinessShopServices,
  resumes:setResumeServices,
  "property-qr":setPropertyServices,
  "multi-urls":setMultiUrlServices,
  "kids-safety-qr-tags":setKidsSafetyServices,
  "product-cards":setProductCardServices,
  "medical-alerts":setMedicalServices,
  events:setEventServices,
  discounts: setDiscountServices,
  wifi:setWifiServices
};

urlBasedServices.forEach((service) => {
  reduxDispatchMappers[service] = setURLServices;
});
