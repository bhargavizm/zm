
// ✅ add all slice actions


import { setCardServices, setMenuCardServices, setSmsServices, setTextMessageServices, setVehicleServices } from "@/redux/slices/servicesSlice";


export const reduxDispatchMappers = {
 "menu-cards": setMenuCardServices,
 sms:setSmsServices,

   "business-cards": setCardServices,
    "v-cards": setCardServices,
   "text-messages":setTextMessageServices,
   vehicles:setVehicleServices,

};
