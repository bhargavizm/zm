// hooks/useServiceFormSubmit.js or useServiceFormSubmit.ts
"use client";

import useDesignContext from "@/components/hooks/useDesignContext";
import useServicesContext from "@/components/hooks/useServiceContext";
import useSubmitForm from "./useSubmitForm";

import { urlBasedServices } from "./formDataMappers";
import useEncryptedSubmitForm from "./useEncryptedServicesSubmitForm";


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
    setPropertyDetails
  } = useServicesContext();

  const businessShopFormData = dynamicForms?.businessInfo
  const setBusinessShopFormData = setDynamicForms?.businessInfo;
   

  const vehicleData = dynamicForms?.vehicle; // ✅ Correct
  const setVehicleData = updateDynamicForm?.vehicle; // ✅ Correct
  
  const multiUrlFormData = dynamicForms?.multiUrl
  const setMultiUrlFormData = setDynamicForms?.multiUrl

  const kidSafetyFormData = dynamicForms?.kidsSafety
  const setKidSafetyFormData = setDynamicForms?.kidsSafety

  const isUrlBasedService = urlBasedServices.includes(activeService);

  const formDataState = isUrlBasedService
    ? formData
    : {
      "Pet-ID-tags": petIDFormData,
      "business-shops": businessShopFormData,
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

        resumes: resumeFormData,
        "property-qr":propertyDetails,

        "multi-urls":multiUrlFormData,
        
      

      }[activeService];

  const setFormDataState = isUrlBasedService
    ? setFormData
    : {
      
      "Pet-ID-tags": setPetIDFormData,
      "business-shops": setBusinessShopFormData,
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


        resumes: setResumeFormData,
        "property-qr":setPropertyDetails,

        "multi-urls":setMultiUrlFormData,

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