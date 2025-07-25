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
    audioFormData,
    setAudioFormData,
    videoFormData,
    setVideoFormData,
    pdfFormData,
    setPdfFormData,
    imagesFormData,
    setImagesFormData,
  } = useServicesContext();

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

  return { submitForm ,encryptSubmitForm};
};
