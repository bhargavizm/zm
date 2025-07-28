const initialBusinessForm = {
  name: '',
  subheading: '',
  designation: '',
  email: '',
  mobile: '',
  mapLink: '',
  socialLink: '',
  socialLink2: '',
  address: '',
  password: '',
  selectedTemplate: '',
  logo: null,
  bgDesign: '',
};


const initialFormStates = {
  "menu-cards": {
    restaurantName: '',
    menuItems: [],
    phone: '',
    email: '',
    link: '',
    password: '',
    bgDesign: ''
  },
  sms: {
    genderName: '',
    messageType: '',
    textMessage: '',
    password: ''
  },

 "business-cards": initialBusinessForm,
  "v-cards": initialBusinessForm,
  "text-messages":{
     sender: '',
    message: '',
    password: '',
    bgDesign:''
  },

  vehicles: {
    selectedTemplate: '',
    
    general: {
      vehicleModel: '',
      vehicleNumber: '',
      vehicleType: '',
      description: ''
    },
    
    registration: {
      rcNumber: '',
      driverName: '',
      ownerName: ''
    },
    
    contact: {
      contact: '',
      altContact: '',
      address: ''
    },
    
    security: {
      password: ''
    },
    
    media: {
      vehicleImage: null,
      licenseFront: null,
      licenseBack: null,
      rcFront: null,
      rcBack: null,
      pollution: null,
      galleryImages: [],      // multiple images
      insurance: []           // multiple images
    }
  }
  

}


export const getInitialFormData = (service) => initialFormStates[service] || {};