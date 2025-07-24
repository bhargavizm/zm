// hooks/useServiceFormSubmit.js or useServiceFormSubmit.ts
"use client";

import useDesignContext from "@/components/hooks/useDesignContext";
import useServicesContext from "@/components/hooks/useServiceContext";
import useSubmitForm from "./useSubmitForm";


export const useServicesFormData = () => {
  const { bgDesign, setBgDesign } = useDesignContext();
  const {
    activeService,
    menuBookFormData,
    setMenuBookFormData,
    smsFormData,
    setSmsFormData, businessForm, setBusinessForm,textMessageForm, setTextMessageForm
    // ... add all other service formData and setters here
  } = useServicesContext();

  const formDataState = {
    "menu-cards": menuBookFormData,
    sms: smsFormData,
     "business-cards": businessForm,
      "v-cards": businessForm,
      "text-messages":textMessageForm
    // gallery: galleryFormData,
    // ...
  }[activeService];

  const setFormDataState = {
    "menu-cards": setMenuBookFormData,
    sms: setSmsFormData,
     "business-cards": setBusinessForm,
      "v-cards": setBusinessForm,
      "text-messages":setTextMessageForm
    // gallery: setGalleryFormData,
    // ...
  }[activeService];

  const submitForm = useSubmitForm(
    activeService,
    formDataState,
    bgDesign,
    setFormDataState,
    setBgDesign
  );

  return { submitForm };
};
