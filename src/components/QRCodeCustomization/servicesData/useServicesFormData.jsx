// hooks/useServiceFormSubmit.js or useServiceFormSubmit.ts
"use client";

import useDesignContext from "@/components/hooks/useDesignContext";
import useServicesContext from "@/components/hooks/useServiceContext";
import useSubmitForm from "./useSubmitForm";

import { urlBasedServices } from "./formDataMappers";
import useEncryptedSubmitForm from "./useEncryptedServicesSubmitForm";
import DiscountCouponContent from './../../servicesPages/tabsContent/servicesContent/discountCoupon/DiscountCouponContent';

const encryptedServices = ["pdf", "audios", "videos", "gallery"];

export const useServicesFormData = () => {
  const { bgDesign, setBgDesign,selectedQRCodeImage, setSelectedQRCodeImage } = useDesignContext();
  const {
    activeService,
    menuBookFormData,
    setMenuBookFormData,
    smsFormData,
    formData,
    setFormData,
    setSmsFormData,
    businessForm,
    setBusinessForm,
    textMessageForm,
    setTextMessageForm,
    dynamicForms, updateDynamicForm,
    audioFormData,
    setAudioFormData,
    videoFormData,
    setVideoFormData,
    pdfFormData,
    setPdfFormData,
    imagesFormData,
    setImagesFormData,
    petIDFormData,
    setPetIDFormData,
    setDynamicForms,
    resumeFormData,
    setResumeFormData,
    propertyDetails,
    setPropertyDetails, 
    productData,
    setProductData,
    eventsFormData, 
    setEventsFormData,
    wifiFormData,
    setWifiFormData,businessShopFormData, setBusinessShopFormData
  } = useServicesContext();

  const discountCouponFormData = dynamicForms?.discountCoupon
  const setDiscountCouponFormData = setDynamicForms?.discountCoupon
  const vehicleData = dynamicForms?.vehicle; // ✅ Correct
  const setVehicleData = updateDynamicForm?.vehicle; // ✅ Correct
  const multiUrlFormData = dynamicForms?.multiUrl
  const setMultiUrlFormData = setDynamicForms?.multiUrl
   const medicalAlertFormData = dynamicForms?.medicalAlert
  const setMedicalAlertFormData = setDynamicForms?.medicalAlert
  const kidSafetyFormData = dynamicForms?.kidsSafety
  const setKidSafetyFormData = setDynamicForms?.kidsSafety

  const isUrlBasedService = urlBasedServices.includes(activeService);

  const formDataState = isUrlBasedService
    ? formData
    : {
      "Pet-ID-tags": petIDFormData,
     
        "menu-cards": menuBookFormData,
        sms: smsFormData,
        "business-cards": businessForm,
        "kids-safety-qr-tags": kidSafetyFormData,
        "v-cards": businessForm,
        "text-messages": textMessageForm,
        "vehicles": vehicleData,    
        audios: audioFormData,
        videos: videoFormData,
        pdf: pdfFormData,
        gallery: imagesFormData,
        "medical-alerts":medicalAlertFormData,
        events:eventsFormData,
        "Pet-ID-tags": petIDFormData,
        "business-shops": businessShopFormData,
        resumes: resumeFormData,
        "property-qr":propertyDetails,
        "multi-urls":multiUrlFormData,
        "property-qr": propertyDetails,
        "multi-urls": multiUrlFormData,
        discounts: discountCouponFormData,
        "product-cards": productData,
        wifi:wifiFormData
      }[activeService];


  const setFormDataState = isUrlBasedService
    ? setFormData
    : {
      
      "Pet-ID-tags": setPetIDFormData,
      
     
        "menu-cards": setMenuBookFormData,
        sms: setSmsFormData,
        "business-cards": setBusinessForm,
        "v-cards": setBusinessForm,
        "text-messages": setTextMessageForm,
        "kids-safety-qr-tags": setKidSafetyFormData,
        "vehicles": setVehicleData, 
        audios: setAudioFormData,
        videos: setVideoFormData,
        pdf: setPdfFormData,
        gallery: setImagesFormData,


        "Pet-ID-tags": setPetIDFormData,
        "business-shops": setBusinessShopFormData,
        vehicles: setVehicleData,
        resumes: setResumeFormData,
        "property-qr":setPropertyDetails,
        "medical-alerts":setMedicalAlertFormData,
        "multi-urls":setMultiUrlFormData,
        events:setEventsFormData,
        discounts: setDiscountCouponFormData,
        "product-cards":setProductData,
        wifi:setWifiFormData
      }[activeService];
// console.log('services formdata', selectedQRCodeImage);
  const submitForm = useSubmitForm(
    activeService,
    formDataState,
    bgDesign,
    setFormDataState,
    setBgDesign,selectedQRCodeImage, setSelectedQRCodeImage
  );

  const encryptSubmitForm = useEncryptedSubmitForm(
    activeService,
    formDataState,
    bgDesign,
    setFormDataState,
    setBgDesign
  );

  // urlBasedServices.forEach((service) => {
  //   formDataState[service] = formData;
  //   setFormDataState[service] = setFormData;
  // });

  return { submitForm, encryptSubmitForm, formDataState,
  setFormDataState, };
};