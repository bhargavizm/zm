// hooks/useServiceFormSubmit.js or useServiceFormSubmit.ts
"use client";

import useDesignContext from "@/components/hooks/useDesignContext";
import useServicesContext from "@/components/hooks/useServiceContext";
import useSubmitForm from "./useSubmitForm";

import { urlBasedServices } from "./formDataMappers";
import useEncryptedSubmitForm from "./useEncryptedServicesSubmitForm";
import DiscountCouponContent from './../../servicesPages/tabsContent/servicesContent/discountCoupon/DiscountCouponContent';


export const useServicesFormData = () => {
  const { bgDesign, setBgDesign } = useDesignContext();
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
    setImagesFormData, petIDFormData, setPetIDFormData,
    setDynamicForms,
    resumeFormData, 
    setResumeFormData,
    propertyDetails,
    setPropertyDetails,
  } = useServicesContext();

  const businessShopFormData = dynamicForms?.businessShop
  const setBusinessShopFormData = setDynamicForms?.businessShop;
  const discountCouponFormData = dynamicForms?.discountCoupon
  const setDiscountCouponFormData = setDynamicForms?.discountCoupon
  const vehicleData = dynamicForms?.vehicle; // ✅ Correct
  const setVehicleData = updateDynamicForm?.vehicle; // ✅ Correct
  



  const multiUrlFormData = dynamicForms?.multiUrl
  const setMultiUrlFormData = setDynamicForms?.multiUrl

  const isUrlBasedService = urlBasedServices.includes(activeService);

  const formDataState = isUrlBasedService
    ? formData
    : {
      "menu-cards": menuBookFormData,
      sms: smsFormData,
      "business-cards": businessForm,
      "v-cards": businessForm,
      "text-messages": textMessageForm,
      audios: audioFormData,
      videos: videoFormData,
      pdf: pdfFormData,
      gallery: imagesFormData,
      "Pet-ID-tags": petIDFormData,
      "business-shops": businessShopFormData,
    // }[activeService];
        "menu-cards": menuBookFormData,
        sms: smsFormData,
        "business-cards": businessForm,
        "v-cards": businessForm,
        "text-messages": textMessageForm,
        "vehicles": vehicleData,    
        audios: audioFormData,
        videos: videoFormData,
        pdf: pdfFormData,
        gallery: imagesFormData,

        resumes: resumeFormData,
        "property-qr": propertyDetails,

        "multi-urls": multiUrlFormData,
        discounts: discountCouponFormData
      }[activeService];

  const setFormDataState = isUrlBasedService
    ? setFormData
    : {
      "menu-cards": setMenuBookFormData,
      sms: setSmsFormData,
      "business-cards": setBusinessForm,
      "v-cards": setBusinessForm,
      "text-messages": setTextMessageForm,
      audios: setAudioFormData,
      videos: setVideoFormData,
      pdf: setPdfFormData,
      gallery: setImagesFormData,
      "Pet-ID-tags": setPetIDFormData,
      "business-shops": setBusinessShopFormData,
    // }[activeService];
        "menu-cards": setMenuBookFormData,
        sms: setSmsFormData,
        "business-cards": setBusinessForm,
        "v-cards": setBusinessForm,
        "text-messages": setTextMessageForm,
        "vehicles": setVehicleData, 
        audios: setAudioFormData,
        videos: setVideoFormData,
        pdf: setPdfFormData,
        gallery: setImagesFormData,

        resumes: setResumeFormData,
        "property-qr":setPropertyDetails,

        "multi-urls":setMultiUrlFormData,
        discounts: setDiscountCouponFormData
      }[activeService];


  const submitForm = useSubmitForm(
    activeService,
    formDataState,
    bgDesign,
    setFormDataState,
    setBgDesign
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

  return { submitForm, encryptSubmitForm };
};
