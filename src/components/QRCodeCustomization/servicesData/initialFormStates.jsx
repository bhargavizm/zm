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

  "business-cards": initialBusinessForm,
  "v-cards": initialBusinessForm,
  "text-messages": {
    sender: "",
    message: "",
    password: "",
    bgDesign: "",
  },
    resumes: {
    resumeFiles: [],
    resumeUrl: "",
    password: "",
    bgDesign: "",
  },
  "property": {
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
