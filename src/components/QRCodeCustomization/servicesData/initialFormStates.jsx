import { urlBasedServices } from "./formDataMappers";

const initialUrlForm = {
  url: "",
  password: "",
  bgDesign: "",
};

const initialBusinessForm = {
  name: "",
  subheading: "",
  designation: "",
  email: "",
  mobile: "",
  mapLink: "",
  socialLink: "",
  socialLink2: "",
  address: "",
  password: "",
  selectedTemplate: "",
  logo: null,
  bgDesign: "",
};

const initialFormStates = {
  "menu-cards": {
    restaurantName: "",
    menuItems: [],
    phone: "",
    email: "",
    link: "",
    password: "",
    bgDesign: "",
  },
  sms: {
    genderName: "",
    messageType: "",
    textMessage: "",
    password: "",
  },

  "multi-urls": {
    socialLinks: {
      youtube: "",
      instagram: "",
      twitter: "",
      linkedin: "",
      facebook: "",
      custom: "",
    },
    customLinks: [],
    password: "",
    bgDesign: "",
  },

  "business-cards": initialBusinessForm,
  "v-cards": initialBusinessForm,
  "text-messages": {
    sender: "",
    message: "",
    password: "",
    bgDesign: "",
  },
  "Pet-ID-tags": {
    petName: "",
    ownerName: "",
    contactNumber: "",
    email: "",
    address: "",
    location: {
      latitude: null,
      longitude: null,
      address: "",
    },
    renewalDate: null,
    status: "active",
    qrCodeImage: "",
    bgDesign: "",
    password: "",
  },
  "business-shops": {
    businessInfo: {
      general: {
        businessName: "",
        businessType: "",
        description: "",
        shopTimings: "",
        discount: "",
      },
      contact: {
        phone: "",
        altPhone: "",
        email: "",
        address: "",
      },
      security: {
        password: "",
      },
      media: {
        logo: null, // File
        galleryImages: [], // Array of Files or URLs
      },
      qrCodeDetails: {
        title: "",
        description: "",
        qrType: "",
        url: "",
        file: null,
        bgDesign: "",
        password: "",
      },
    },
    shopTimingsTemplate: {
      selectedTemplate: "",
      template1Data: {},
      template2Data: {},
      template3Data: {},
      template4Data: {},
    },
    qrCodeDetails: {
      title: "",
      description: "",
      qrType: "",
      url: "",
      file: null,
      bgDesign: "",
      password: "",
    },
  },
  // resumes: {

  vehicles: {
    selectedTemplate: "",
    general: {
      vehicleModel: "",
      vehicleNumber: "",
      vehicleType: "",
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
    },

    security: {
      password: "",
    },

    media: {
      vehicleImage: null,
      licenseFront: null,
      licenseBack: null,
      rcFront: null,
      rcBack: null,
      pollution: null,
      galleryImages: [], // multiple images
      insurance: [], // multiple images
    },
  },

  "kids-safety-qr-tags": {
    childInfo: {
      childName: "",
      dob: "",
      classGrade: "",
      kidsImage: null, // File or URL
    },
    schoolInfo: {
      schoolName: "",
      schoolAddress: "",
      schoolContact: "",
    },
    parentContacts: {
      parentName: "",
      primaryContact: "",
      secondaryContact: "",
      altContacts: [], // Array of strings
    },
    homeLocation: {
      homeAddress: "",
      mapLink: "",
    },
    security: {
      password: "",
    },
    qrCustomization: {
      selectedTemplate: "",
      bgDesign: "",
    },
  discounts: {
    nameOfBusiness: "",
      code: "",
      brandLogo: "",
      couponImage: "",
      password: "",
      bgDesign: "",
  },
  resumes: {
    resumeFiles: [],
    resumeUrl: "",
    password: "",
    bgDesign: "",
  },
  "property-qr": {
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
    bgDesign: "",
  },
   "product-cards": {
    productLogo: "", // string (Cloudinary URL or file name after upload)
    brandName: "",
    items: [
      {
        productImage: "", // string (Cloudinary URL or file name)
        description: "",
        heading: "",
        pageUrl: "",
        videoUrl: "",
      },
    ],
    email: "",
    phone: "",
    address: "",
    password: "",
    selectedTemplate: null,
    bgDesign: "", // if you're using design selection for product cards too
  },

  // 📌 Add this inside `initialFormStates`:
"medical-alert": {
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
    medicalReports: { displayValue: "", files: [] },
    prescription: { displayValue: "", files: [] },
    insuranceImage: { displayValue: "", files: [] },
  },
  password: "",
  bgDesign: "",
},
  events: {
    eventTitle: "",
    eventDate: "",
    eventTime: "",
    location: "",
    description: "",
    contactPhone: "",
    contactEmail: "",
    registrationLink: "",
    galleryImages: [], // multiple images or event posters
    password: "",
    bgDesign: "",
  },


};

const initialEncryptedForm = {
  title: "",
  description: "",
  password: "",
  file: [],
  bgDesign: "",
};

urlBasedServices.forEach((service) => {
  initialFormStates[service] = initialUrlForm;
});

const encryptedServices = ["pdf", "audios", "videos", "gallery"];
encryptedServices.forEach((service) => {
  initialFormStates[service] = initialEncryptedForm;
});

export const getInitialFormData = (service) => initialFormStates[service] || {};
