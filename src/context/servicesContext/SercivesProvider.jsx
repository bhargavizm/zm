// src/components/ServicesProvider.jsx
"use client";

import React, { useEffect, useState } from "react";
import { ServicesContext } from "./ServicesContext";
import { usePathname } from "next/navigation";

const ServicesProvider = ({ children }) => {
  // --- Initial State Definitions for all forms ---
  // This is crucial for the reset functionality.
  // Define these outside the component or memoize them if they are truly static
  // to prevent re-creation on every render, but for clarity, defining them here
  // is fine for now.

  const [servicesDataLoading, setServicesDataLoading] = useState(false);
  const pathname = usePathname();
  const [activeService, setActiveService] = useState(null);

  useEffect(() => {
    if (pathname.includes("/services/")) {
      const serviceName = pathname.split("/services/")[1]?.split("/")[0];
      setActiveService(serviceName); // ✅ auto-set based on URL
    }
  }, [pathname]);

  //url services
  const [formData, setFormData] = useState({
      url: "",
      password: "",
    });

  

  const initialBusinessForm = {
    name: "",
    heading: "",
    subheading: "",
    businessName: "",
    mobile: "",
    designation: "",
    address: "",
    mapLink: "",
    email: "",
    profileImageUrl:'',
    url: "",
    url1: "",
    password: "",
    bgDesign:""
  };

  const initialProductData = {
    heading: "",
    description: "",
    pageUrl: "",
    videoUrl: "",
    manual: null,
    email: "",
    phone: "",
    address: "",
    password: "",
    selectedTemplate: null,
  };

  const initialAudioFormData = {
    title: "",
    description: "",
    file: [],
    password: "",
    bgDesign:"",
    qrCodeDetails: {
      qrCodeImage: '',

      location: {
        latitude: '',
        longitude: '',
        address: "",
      },
      renewalDate: '',
      status: '',
      resetPasswordToken: '',
      resetPasswordExpires: '',
    },
  };

  const initialVideoFormData = {
    title: "",
    description: "",
    file: [],
    password: "",
     bgDesign:"",
    qrCodeDetails: {
      qrCodeImage: '',

      location: {
        latitude: '',
        longitude: '',
        address: "",
      },
      renewalDate: '',
      status: '',
      resetPasswordToken: '',
      resetPasswordExpires: '',
    },
  };

  const initialPdfFormData = {
    title: "",
    description: "",
    file: [],
    password: "",
     bgDesign:"",
    qrCodeDetails: {
      qrCodeImage: '',

      location: {
        latitude: '',
        longitude: '',
        address: "",
      },
      renewalDate: '',
      status: '',
      resetPasswordToken: '',
      resetPasswordExpires: '',
    },
  };

  const initialImagesFormData = {
    title: "",
    description: "",
    images: [],
    password: "",
     bgDesign:"",
    qrCodeDetails: {
      qrCodeImage: '',

      location: {
        latitude: '',
        longitude: '',
        address: "",
      },
      renewalDate: '',
      status: '',
      resetPasswordToken: '',
      resetPasswordExpires: '',
    },
  };

  const initialResumeFormData = {
    resumeFile: [],
    resumeUrl: "",
    password: "",
    bgDesign:""
  };

  const initialWifiFormData = [{ ssid: "", password: "", security: "WPA" }];

  const initialEventsFormData = {
    organizer: "",
    title: "",
    summary: "",
    // buttonLabel: "Buy Tickets",
    // buttonLink: "www.YourWebsite.com",
    fromDate: "",
    toDate: "",
    venue: "",
    address: "",
    about: "",
    contactName: "",
    contactEmail: "",
    contactPhone: "",
    // webLabel: "My Website",
    // webUrl: "www.yourweburl.com",
  };

  const initialSmsFormData = {
    genderName: "",
    messageType: "",
    textMessage: "",
    bgDesign:"",
    password: "",
     bgDesign: "",
  };

  const initialTextMessageForm = {
    sender: "",
    message: "",
    password: "",
    bgDesign:""
  };

  // Menu Book (Original structure)
  // Inside your ServiceContextProvider
  const [menuBookFormData, setMenuBookFormData] = useState({
    restaurantName: "",
    menuItems: [], // array of { image: "blob-url" }
    phone: "",
    email: "",
    link: "",
    password: "",
    bgDesign: "",
  });

  const [propertyDetails, setPropertyDetails] = useState({
    basicInfo: {
      propertyName: "",
      propertyType: "",
      ownerName: "",
      contactNumber: "",
      alternateNumber: "",
      propertyDescription: "",
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
      galleryImages: [],
    },
    password: "",
  });


  const initialPetIDFormData = {
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
      color: "",
      images: [],
      visible: true,
    },
    password:"",
    bgDesign:""
   
  };

  const initialDynamicForms = {
    medicalAlert: {
      patientInfo: {
        patientName: "",
        age: "",
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
        preferredHospital: "",
        location: "",
      },
      additional: {
        familyDoctorName: "",
        familyDoctorPhone: "",
        emergencyInstructions: "",
        insuranceProvider: "",
        policyNumber: "",
        medicalReports: [],
        prescription: [],
        insuranceImage: [],
        medicalReports: [],
        prescription: [],
        insuranceImage: [],
        preferredHospital: "",
        location: "",
      },
      password: "",
      qrCodeDetails: {
        qrCodeImage: '',

        location: {
          latitude: '',
          longitude: '',
          address: "",
        },
        renewalDate: '',
        status: '',
        resetPasswordToken: '',
        resetPasswordExpires: '',
      },
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
    //BusinessShop Named as BusinessInfo, 
    businessInfo: {
      general: {
        businessName: "",
        businessType: "",
        description: "",
        shopTimings: "",
        discount: "",
      },
      contact: {
        owner: "",
        phone: "",
        altPhone: "",
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
      bgDesign:"",
    },
    shopTimingsTemplate: {
      selectedTemplate: "none",
      password: "",
    },
    discountCoupon: {
      brandLogo: null,
      nameOfBusiness: "",
      code: "",
      type: "percentage",
      value: "",
      minPurchase: "",
      expiryDate: "",
      description: "",
      isActive: true,
      couponImage: null,
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
      contact2: "",
      schoolContact: "",
      altContact: [],
      homeAddress: "",
      mapLink: "",
      password: "",
      selectedTemplate: "",
      kidsImage: null,
    },
    vehicle: {
      general: {
        vehicleModel: "",
        vehicleType: "",
        vehicleNumber: "",
        description: "",
      },
      registration: {
        rcNumber: "",
        driverName: "",
        ownerName: "",
      },
      contact: {
        contact: "",
        altContact: "",
        address: "",
        mapLink: "",
      },
      media: {
        vehicleImage: null, // Corrected from mainImage to match your VehicleContent
        licenseFront: null,
        licenseBack: null,
        rcFront: null,
        rcBack: null,
        pollution: null,
        galleryImages: [],
        insurance: [],
      },
      security: {
        password: "",
      },
      bgDesign:"",
    },
    vehicleTemplate: {
      selectedTemplate: "none",
      templateV1Data: {
        bgimage: "/images/background/bikebg.png",
      },
      templateV2Data: {
        bgimage: "/images/background/carbg.png",
      },
      templateV3Data: {
        bgimage: "/images/background/lorrybg.png",
      },
      templateV4Data: {
        bgimage: "/images/background/autobg.png",
      },
    },
  };

  const resetAllDynamicForms = () => {
    const resetState = {};
    Object.keys(initialDynamicForms).forEach((key) => {
      resetState[key] = { ...initialDynamicForms[key] };
    });
    setDynamicForms(resetState);
  };

 
  
  const [businessForm, setBusinessForm] = useState(initialBusinessForm);
  const [profileImage, setProfileImage] = useState(null); // File state for BusinessForm
  const [brandLogo, setBrandLogo] = useState(null); // File state for BusinessForm

  const [productData, setProductData] = useState(initialProductData);
  const [productLogo, setProductLogo] = useState(null); // File state for ProductData
  const [productImage, setProductImage] = useState(null); // File state for ProductData
  const [items, setItems] = useState([]); // Array state for ProductData items

  const [audioFormData, setAudioFormData] = useState(initialAudioFormData);
  const [videoFormData, setVideoFormData] = useState(initialVideoFormData);
  const [pdfFormData, setPdfFormData] = useState(initialPdfFormData);
  const [imagesFormData, setImagesFormData] = useState(initialImagesFormData);
  const [resumeFormData, setResumeFormData] = useState(initialResumeFormData);
  const [wifiFormData, setWifiFormData] = useState(initialWifiFormData);
  const [eventsFormData, setEventsFormData] = useState(initialEventsFormData);
  const [smsFormData, setSmsFormData] = useState(initialSmsFormData);
  const [textMessageForm, setTextMessageForm] = useState(
    initialTextMessageForm
  );
  const [petIDFormData, setPetIDFormData] = useState(initialPetIDFormData);
  const [dynamicForms, setDynamicForms] = useState(initialDynamicForms); // For medicalAlert, propertyDetails, etc.

  // UI Toggles
  const [showPassword, setShowPassword] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  // --- Core Dynamic Form Update Logic ---
  const updateDynamicForm = (formKey, sectionKey, fieldKey, value) => {
    setDynamicForms((prev) => {
      // If a sectionKey and fieldKey are provided, update a specific nested field
      if (
        sectionKey !== null &&
        sectionKey !== undefined &&
        fieldKey !== null &&
        fieldKey !== undefined
      ) {
        return {
          ...prev,
          [formKey]: {
            ...prev[formKey], // Keep existing form data
            [sectionKey]: {
              ...prev[formKey][sectionKey], // Keep existing section data
              [fieldKey]: value,
            },
          },
        };
      }
      // If only formKey and value are provided, it means replace the entire formKey object
      // This is the case for a full form reset.
      else if (sectionKey === null && fieldKey === null) {
        return {
          ...prev,
          [formKey]: value, // 'value' here is expected to be the full initial state for that formKey
        };
      }
      // Fallback for cases where only formKey and fieldKey are passed without section (unlikely in your current structure, but good for robustness)
      else if (fieldKey !== null && fieldKey !== undefined) {
        return {
          ...prev,
          [formKey]: {
            ...prev[formKey],
            [fieldKey]: value,
          },
        };
      }
      return prev; // No valid update scenario
    });
  };

  // --- New: Reset function for dynamic forms ---
  const resetDynamicForm = (formKey) => {
    setDynamicForms((prev) => {
      // Get the initial state for the given formKey
      let initialStateToApply;
      switch (formKey) {
        case "medicalAlert":
          initialStateToApply = initialDynamicForms.medicalAlert;
          break;
        case "multiUrl":
          initialStateToApply = initialDynamicForms.multiUrl;
          break;
       
        case "businessInfo":
          initialStateToApply = initialDynamicForms.businessInfo;
          break;
        case "shopTimingsTemplate":
          initialStateToApply = initialDynamicForms.shopTimingsTemplate;
          break;
        case "discountCoupon":
          initialStateToApply = initialDynamicForms.discountCoupon;
          break;
        case "kidsSafety":
          initialStateToApply = initialDynamicForms.kidsSafety;
          break;
        case "vehicle":
          initialStateToApply = initialDynamicForms.vehicle;
          break;
        case "vehicleTemplate":
          initialStateToApply = initialDynamicForms.vehicleTemplate;
          break;
        // Add cases for other dynamic forms as needed
        default:
          console.warn(`Attempted to reset unknown dynamic form: ${formKey}`);
          return prev; // Return previous state if formKey is not recognized
      }

      return {
        ...prev,
        [formKey]: initialStateToApply,
      };
    });
  };



  // Add/Remove template fields (these seem fine for their specific use cases)
  const addTemplateField = (
    formKey,
    sectionKey,
    fieldKey,
    defaultValue = ""
  ) => {
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

  return (
    <ServicesContext.Provider
      value={{
        // Static forms and their setters
        formData, setFormData,
        businessForm,
        setBusinessForm,
        profileImage,
        setProfileImage,
        brandLogo,
        setBrandLogo,
        productData,
        setProductData,
        productImage,
        setProductImage,
        productLogo,
        setProductLogo,
        items,
        setItems,
        audioFormData,
        setAudioFormData,
        videoFormData,
        setVideoFormData,
        pdfFormData,
        setPdfFormData,
        imagesFormData,
        setImagesFormData,
        resumeFormData,
        setResumeFormData,
        wifiFormData,
        setWifiFormData,
        eventsFormData,
        setEventsFormData,
        smsFormData,
        setSmsFormData,
        textMessageForm,
        setTextMessageForm,
        menuBookFormData,
        setMenuBookFormData,
        petIDFormData,
        setPetIDFormData,

        propertyDetails,
        setPropertyDetails,

        // Dynamic forms and their handlers
        dynamicForms,
        setDynamicForms,
        updateDynamicForm,
        resetDynamicForm, // Expose the new reset function
        resetAllDynamicForms,
        addTemplateField,
        removeTemplateField,
 

        // UI Toggles
        showPassword,
        setShowPassword,
        isAnimating,
        setIsAnimating,
        servicesDataLoading,
        setServicesDataLoading,
        activeService,
        setActiveService,
        pathname,
      }}
    >
      {children}
    </ServicesContext.Provider>
  );
};

export default ServicesProvider;
