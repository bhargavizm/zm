// ✅ add all slice actions

import {
  setBusinessShopServices,
  setCardServices,
  setMenuCardServices,
  setPetIdServices,
  setSmsServices,
  setTextMessageServices,
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
  audios: setAudioServices,
  pdf: setPDFServices,
  gallery: setGalleryServices,
  videos: setVideoServices,
  "Pet-ID-tags": setPetIdServices,
  "business-shops": setBusinessShopServices,
};

urlBasedServices.forEach((service) => {
  reduxDispatchMappers[service] = setURLServices;
});
