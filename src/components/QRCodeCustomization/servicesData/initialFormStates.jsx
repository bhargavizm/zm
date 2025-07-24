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
  }
}


export const getInitialFormData = (service) => initialFormStates[service] || {};