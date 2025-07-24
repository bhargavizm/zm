
// ✅ add all slice actions


import { setCardServices, setMenuCardServices, setSmsServices, setTextMessageServices } from "@/redux/slices/servicesSlice";


export const reduxDispatchMappers = {
 "menu-cards": setMenuCardServices,
 sms:setSmsServices,

   "business-cards": setCardServices,
    "v-cards": setCardServices,
   "text-messages":setTextMessageServices

};
