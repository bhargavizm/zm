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
  "text-messages":{
    sender:"",
      message:"",
      password:"",
  }
 

}


export const getInitialFormData = (service) => initialFormStates[service] || {};