// src/components/ServicesProvider.jsx
"use client";

import React, { useState } from "react";
import { ServicesContext } from "./ServicesContext";

const ServicesProvider = ({ children }) => {
  // Business Shop Static Form (Keeping your original static form structure)
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

  // Business Form (Original structure)
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
    url: "", // Changed socialLink to url for consistency
    password: "",
  });
  const [profileImage, setProfileImage] = useState(null);
  const [brandLogo, setBrandLogo] = useState(null);

  // Product Form (Original structure)
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

  // Audio/Video (Original structure)
  const [titleFormData, setTitleFormData] = useState({
    title: "",
    description: "",
    file: null,
    password: "",
  });

  // Gallery (Original structure)
  const [imagesFormData, setImagesFormData] = useState({
    title: "",
    description: "",
    files: [], // Already an array, good for multiple files
    password: "",
  });

  // Resume (Original structure)
  const [resumeFormData, setResumeFormData] = useState({
    title: "",
    description: "",
    documentFile: null,
    documentUrl: "",
    password: "",
  });

  // Wifi (Original structure)
  const [wifiFormData, setWifiFormData] = useState([
    { ssid: "", password: "", security: "WPA" },
  ]);

  // Events (Original structure)
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

  // SMS (Original structure)
  const [smsFormData, setSmsFormData] = useState({
    genderName: "",
    messageType: "",
    textMessage: "",
    date: "",
    password: "",
  });

  // Text Message (Original structure)
  const [textMessageForm, setTextMessageForm] = useState({
    sender: "",
    message: "",
  });

  // Menu Book (Original structure)
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

  // Pet ID Tag (Original structure)
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

  // Dynamic Forms (Now includes Kids Safety and Vehicle Data)
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
    shopTimingsTemplate: {
      selectedTemplate: "none", // 'none', 'template1', 'template2', 'template3'
      template1Data: {
        title: "Opening Hours",
        days: [
          { day: "MONDAY", time: "10AM - 10PM" },
          { day: "TUESDAY", time: "10AM - 10PM" },
          { day: "WEDNESDAY", time: "10AM - 10PM" },
          { day: "THURSDAY", time: "10AM - 10PM" },
          { day: "FRIDAY", time: "10AM - 10PM" },
          { day: "SATURDAY", time: "10AM - 10PM" },
          { day: "SUNDAY", time: "10AM - 10PM" },
        ],
        aboutUsLink: "about us",
        siteLink: "@reallygreatsite",
      },
      template2Data: {
        logoText: "GIGGLING PLATYPUS",
        mainHeading: "WE'RE OPEN",
        subHeading: "TUESDAY TO SUNDAY",
        timeRange: "12 AM - 10 PM",
        closedDay: "CLOSED MONDAY",
        addressLine1: "123 Anywhere St., Any City, ST 12345",
        addressLine2: "123 Anywhere St., Any City",
        website: "www.reallygreatsite.com",
      },
      template3Data: {
        videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
        title: "OUR STORY",
        description: "Experience the best at our shop!",
      },
      password: "",
    },
    discountCoupon: {
      code: "",
      type: "percentage", // "percentage" or "fixed"
      value: "", // The percentage or fixed amount
      minPurchase: "",
      expiryDate: "",
      description: "",
      isActive: true, // Boolean to toggle active state
      couponImage: null, // File object for the coupon visual
      password: "",
    },
    kidsSafety: {
      childName: "",
      dob: "",
      classGrade: "",
      schoolName: "",
      schoolAddress: "",
      parentName: "",
      contact: "",
      altContact: [], // Initialized as an array for dynamic additions
      homeAddress: "",
      mapLink: "",
      password: "",
      selectedTemplate: "",
      kidsImage: null, // Image stored here as File object
    },
    // NEW: Vehicle data structure integrated into dynamicForms
    vehicle: {
      vehicleModel: "",
      vehicleType: "",
      buyDate: "",
      description: "",
      rcNumber: "",
      driverName: "",
      ownerName: "",
      contact: "",
      altContact: [], // Initialize as array for dynamic contacts
      address: "",
      mapLink: "",
      password: "",
      selectedTemplate: "", // If you want to allow different vehicle preview templates
      vehicleFrontImage: null, // Stores File object
      vehicleSideImage: null,   // Stores File object
      rcImage: null,            // Stores File object
      licenseImage: null,       // Stores File object
      ownerImage: null,         // Stores File object
    },
  });

  // Dynamic Helpers (Handle null sectionKey)
  const updateDynamicForm = (formKey, sectionKey, fieldKey, value) => {
    setDynamicForms((prev) => {
      const updatedForm = { ...prev[formKey] };

      if (sectionKey === null || sectionKey === undefined) {
        updatedForm[fieldKey] = value;
      } else {
        updatedForm[sectionKey] = {
          ...updatedForm[sectionKey],
          [fieldKey]: value,
        };
      }

      return {
        ...prev,
        [formKey]: updatedForm,
      };
    });
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

  // UI Toggles (Remain local to this Provider)
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
        // Removed original kidsSafetyFormData, setKidsSafetyFormData, kidsImage, setKidsImage
        // Removed original vehicleForm, setVehicleForm, vehicleImage, setVehicleImage
        smsFormData, setSmsFormData,
        wifiFormData, setWifiFormData,
        menuBookFormData, setMenuBookFormData,
        textMessageForm, setTextMessageForm,
        petIDFormData, setPetIDFormData,
        eventsFormData, setEventsFormData,
        businessShopFormData, setBusinessShopFormData,
        dynamicForms, setDynamicForms, // Crucial: expose dynamicForms and its setter
        updateDynamicForm, addTemplateField, removeTemplateField, // Expose helpers
        showPassword, setShowPassword,
        isAnimating, setIsAnimating,
      }}
    >
      {children}
    </ServicesContext.Provider>
  );
};

export default ServicesProvider;
