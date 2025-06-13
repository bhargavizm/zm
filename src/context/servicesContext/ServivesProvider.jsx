"use client";

import React, { useState } from "react";
import { ServicesContext } from "./ServicesContext";

const ServicesProvider = ({ children }) => {
  // ✅ Business Form
  const [businessForm, setBusinessForm] = useState({
    name: "",
    heading: "",
    subheading: "",
    businessName: "",
    mobile: "",
    designation: "",
    address: "",
    mapLink: "",
    email: "",  
    password: "",
    socialLink: "",
  });
  const [profileImage, setProfileImage] = useState(null);
  const [brandLogo, setBrandLogo] = useState(null);

  // ✅ Product Form
  const [productData, setProductData] = useState({
    heading: "",
    description: "",
    pageUrl: "",
    videoUrl: "",
    manual: null,
    email: "",
    phone: "",
    password: "",
    selectedTemplate: null,
  });
  const [productImage, setProductImage] = useState(null);

  // ✅ Audio/Video
  const [titleFormData, setTitleFormData] = useState({
    title: "",
    description: "",
    file: null,
    password: "",
  });

  // ✅ Gallery
  const [imagesFormData, setImagesFormData] = useState({
    title: "",
    description: "",
    files: [],
    password: "",
  });

  // ✅ Resume
  const [resumeFormData, setResumeFormData] = useState({
    title: "",
    description: "",
    documentFile: null,
    documentUrl: "",
    password: "",
  });

  // ✅ Kids Safety
  const [kidsSafetyFormData, setKidsSafetyFormData] = useState({
    childName: "",
    dob: "",
    classGrade: "",
    schoolName: "",
    schoolAddress: "",
    parentName: "",
    contact: "",
    altContact: "",
    homeAddress: "",
    mapLink: "",
    password: "",
    selectedTemplate: "",
  });
  const [kidsImage, setKidsImage] = useState(null);

  // ✅ Vehicle Form
  const [vehicleForm, setVehicleForm] = useState({
    vehicleModel: "",
    vehicleType: "",
    buyDate: "",
    description: "",
    rcNumber: "",
    driverName: "",
    ownerName: "",
    contact: "",
    altContact: "",
    address: "",
    mapLink: "",
    password: "",
    selectedTemplate: "",
  });
  const [vehicleImage, setVehicleImage] = useState(null);

  // ✅ SMS
  const [smsForm, setSmsForm] = useState({
    genderName: "",
    messageType: "",
    textMessage: "",
    date: "",
    password: "",
  });

  // ✅ Text Message
  const [textMessageForm, setTextMessageForm] = useState({
    sender: "",
    message: "",
  });

  // ✅ Dynamic Forms: Medical Alert, Property Details, Multi URL
  const [dynamicForms, setDynamicForms] = useState({
    // 🏥 Medical Alert
    medicalAlert: {
      patientInfo: {
        patientName: "",
        birthDate: "",
        bloodType: "",
      },
      medicalHistory: {
        medicalConditions: "",
        allergies: "",
        medications: "",
        additionalNotes: "",
      },
      emergencyContact: {
        emergencyContact: "",
        contactPhone: "",
      },
      additional: {
        familyDoctorName: "",
        familyDoctorPhone: "",
        emergencyInstructions: "",
        insuranceProvider: "",
        policyNumber: "",
      },
      password: "",
    },

    // 🏠 Property Details
    propertyDetails: {
      basicInfo: {
        propertyName: "",
        propertyType: "",
        ownerName: "",
        contactNumber: "",
      },
      addressInfo: {
        address: "",
        mapLink: "",
      },
      pricingInfo: {
        price: "",
        area: "",
        amenities: "",
      },
      images: {
        mainImage: null,
        galleryImages: [],
      },
      password: "",
    },

    // 🔗 Multi URL
    multiUrl: {
      socialLinks: {
        youtube: "",
        instagram: "",
        twitter: "",
        linkedin: "",
      },
      customLinks: [], // array of { label, url }
      password: "",
    },
  });

  // ✅ Dynamic Form Helpers
  const updateDynamicForm = (formKey, sectionKey, fieldKey, value) => {
    setDynamicForms((prev) => ({
      ...prev,
      [formKey]: {
        ...prev[formKey],
        [sectionKey]: {
          ...prev[formKey][sectionKey],
          [fieldKey]: value,
        },
      },
    }));
  };

  const addTemplateField = (formKey, sectionKey, fieldKeyOrValue, defaultValue = "") => {
  setDynamicForms((prev) => {
    const section = { ...prev[formKey][sectionKey] };

    // If defaultValue is used — this means we are dealing with nested arrays like: section[fieldKey]
    if (fieldKeyOrValue && defaultValue !== "") {
      const field = section[fieldKeyOrValue] ?? [];
      const updated = Array.isArray(field)
        ? [...field, defaultValue]
        : [defaultValue];

      return {
        ...prev,
        [formKey]: {
          ...prev[formKey],
          [sectionKey]: {
            ...section,
            [fieldKeyOrValue]: updated,
          },
        },
      };
    }

    // If only value is passed — assume section itself is an array like customLinks
    const arrayField = Array.isArray(section) ? [...section, fieldKeyOrValue] : [fieldKeyOrValue];

    return {
      ...prev,
      [formKey]: {
        ...prev[formKey],
        [sectionKey]: arrayField,
      },
    };
  });
};


  const removeTemplateField = (formKey, sectionKey, fieldKey, indexToRemove = null) => {
    setDynamicForms((prev) => {
      const section = { ...prev[formKey][sectionKey] };

      if (Array.isArray(section[fieldKey]) && indexToRemove !== null) {
        section[fieldKey] = section[fieldKey].filter((_, i) => i !== indexToRemove);
      } else {
        delete section[fieldKey]; // For object keys
      }

      return {
        ...prev,
        [formKey]: {
          ...prev[formKey],
          [sectionKey]: section,
        },
      };
    });
  };

  // ✅ Pet ID Tag
  const [petIDFormData, setPetIDFormData] = useState({
    tagTitle: "",
    mainImage: null,
    password:'',
    ownerInfo: {
      name: "",
      phone: "",
      email: "",
      address: "",
      visible: true,
    },
    pet: {
      name: "",
      breed: "",
      species: "",
      gender: "",
      birthDate: "",
      color: "",
      microchip: "",
      specialNeeds: "",
      vetInfo: "",
      diet: "",
      images: [],
      visible: true,
    },
    emergencyContacts: [
      { name: "", relationship: "", phone: "", visible: true },
    ],
    additionalInfo: [
      { type: "", label: "", value: "", visible: true, placeholder: "" },
    ],
  });

  // ✅ Shared UI State
  const [showPassword, setShowPassword] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  return (
    <ServicesContext.Provider
      value={{
        // Static
        businessForm, setBusinessForm,
        profileImage, setProfileImage,
        brandLogo, setBrandLogo,
        productData, setProductData,
        productImage, setProductImage,
        titleFormData, setTitleFormData,
        imagesFormData, setImagesFormData,
        resumeFormData, setResumeFormData,
        kidsSafetyFormData, setKidsSafetyFormData,
        kidsImage, setKidsImage,
        vehicleForm, setVehicleForm,
        vehicleImage, setVehicleImage,
        smsForm, setSmsForm,
        textMessageForm, setTextMessageForm,
        petIDFormData, setPetIDFormData,

        // Dynamic
        dynamicForms, setDynamicForms,
        updateDynamicForm,
        addTemplateField,
        removeTemplateField,

        // Shared
        showPassword, setShowPassword,
        isAnimating, setIsAnimating,
      }}
    >
      {children}
    </ServicesContext.Provider>
  );
};

export default ServicesProvider;
