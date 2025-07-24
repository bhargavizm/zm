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

}


export const getInitialFormData = (service) => initialFormStates[service] || {};