"use client";

import React, { useState } from "react";
import { ServicesContext } from "./ServicesContext";

const ServicesProvider = ({ children }) => {
  // Business Shop Static Form
  const [businessShopFormData, setBusinessShopFormData] = useState({
    shopName: "",
    ownerName: "",
    contactNumber: "",
    email: "",
    address: "",
    mapLink: "",
    openingHours: "",
    closingHours: "",
    shopType: "",
    servicesOffered: "",
    shopLogo: null,
    bannerImage: null,
    password: "",
    socialMediaLinks: {
      facebook: "",
      instagram: "",
      twitter: "",
      website: "",
    },
  });

  // Business Form
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

  // Product Form
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

  // Audio/Video
  const [titleFormData, setTitleFormData] = useState({
    title: "",
    description: "",
    file: null,
    password: "",
  });

  // Gallery
  const [imagesFormData, setImagesFormData] = useState({
    title: "",
    description: "",
    files: [],
    password: "",
  });

  // Resume
  const [resumeFormData, setResumeFormData] = useState({
    title: "",
    description: "",
    documentFile: null,
    documentUrl: "",
    password: "",
  });

  // Wifi
  const [wifiFormData, setWifiFormData] = useState([
    { ssid: "", password: "", security: "WPA" },
  ]);

  // Events
  const [eventsFormData, setEventsFormData] = useState({
    organizer: "",
    title: "",
    summary: "",
    buttonLabel: "Buy Tickets",
    buttonLink: "www.YourWebsite.com",
    fromDate: "",
    toDate: "",
    venue: "",
    address: "",
    about: "",
    contactName: "",
    contactEmail: "",
    contactPhone: "",
    webLabel: "My Website",
    webUrl: "www.yourweburl.com",
  });

  // Kids Safety
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

  // Vehicle
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

  // SMS
  const [smsFormData, setSmsFormData] = useState({
    genderName: "",
    messageType: "",
    textMessage: "",
    date: "",
    password: "",
  });

  // Text Message
  const [textMessageForm, setTextMessageForm] = useState({
    sender: "",
    message: "",
  });

  // Menu Book
  const [menuBookFormData, setMenuBookFormData] = useState({
    restaurantName: "",
    menuItems: [{ name: "", description: "", price: "", image: "", visible: true }],
    extras: [
      { type: "phone", label: "Phone", value: "", visible: true, placeholder: "+91-0000000000" },
      { type: "email", label: "Email", value: "", visible: true, placeholder: "example@mail.com" },
      { type: "link", label: "Link", value: "", visible: true, placeholder: "https://yourlink.com" },
      { type: "form", label: "Form", value: "", visible: true, placeholder: "https://formurl.com" },
      { type: "video", label: "Video", value: "", visible: true, placeholder: "upload" },
    ],
  });

  // Pet ID Tag
  const [petIDFormData, setPetIDFormData] = useState({
    tagTitle: "",
    mainImage: null,
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
    emergencyContacts: [{ name: "", relationship: "", phone: "", visible: true }],
    additionalInfo: [{ type: "", label: "", value: "", visible: true, placeholder: "" }],
  });

  // Dynamic Forms
  const [dynamicForms, setDynamicForms] = useState({
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
    multiUrl: {
      socialLinks: {
        youtube: "",
        instagram: "",
        twitter: "",
        linkedin: "",
      },
      customLinks: [],
      password: "",
    },
    businessShop: {
      general: {
        shopName: "",
        ownerName: "",
        contactNumber: "",
        email: "",
        website: "",
      },
      address: {
        street: "",
        city: "",
        state: "",
        pincode: "",
        mapLink: "",
      },
      shopImages: {
        logo: null,
        banner: null,
        gallery: [],
      },
      about: {
        description: "",
        services: "",
      },
      password: "",
    },
    businessInfo: {
      general: {
        businessName: "",
        businessType: "",
        description: "",
        establishedDate: "",
        shopTimings: "",
      },
      contact: {
        phone: "",
        email: "",
        address: "",
      },
      media: {
        logo: null,
        video: null,
        galleryImages: [],
      },
      security: {
        password: "",
      },
    },
  });

  // Dynamic Helpers
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

  const addTemplateField = (formKey, sectionKey, fieldKey, defaultValue = "") => {
    setDynamicForms((prev) => ({
      ...prev,
      [formKey]: {
        ...prev[formKey],
        [sectionKey]: {
          ...prev[formKey][sectionKey],
          [fieldKey]: defaultValue,
        },
      },
    }));
  };

  const removeTemplateField = (formKey, sectionKey, fieldKey) => {
    const updatedSection = { ...dynamicForms[formKey][sectionKey] };
    delete updatedSection[fieldKey];
    setDynamicForms((prev) => ({
      ...prev,
      [formKey]: {
        ...prev[formKey],
        [sectionKey]: updatedSection,
      },
    }));
  };

  // UI Toggles
  const [showPassword, setShowPassword] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  return (
    <ServicesContext.Provider
      value={{
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
        smsFormData, setSmsFormData,
        wifiFormData, setWifiFormData,
        menuBookFormData, setMenuBookFormData,
        textMessageForm, setTextMessageForm,
        petIDFormData, setPetIDFormData,
        eventsFormData, setEventsFormData,
        businessShopFormData, setBusinessShopFormData,
        dynamicForms, setDynamicForms,
        updateDynamicForm, addTemplateField, removeTemplateField,
        showPassword, setShowPassword,
        isAnimating, setIsAnimating,
      }}
    >
      {children}
    </ServicesContext.Provider>
  );
};

export default ServicesProvider;
