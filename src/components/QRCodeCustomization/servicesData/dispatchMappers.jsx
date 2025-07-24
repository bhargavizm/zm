
// ✅ add all slice actions

import { setMenuCardServices, setSmsServices, setTextMessageServices } from "@/redux/slices/servicesSlice";

export const reduxDispatchMappers = {
 "menu-cards": setMenuCardServices,
 sms:setSmsServices,
 "text-messages":setTextMessageServices,
//   gallery: setGalleryServices,
//   business: setBusinessServices,
  // 🔁 Add all 50+ services here
};
