
// ✅ add all slice actions

import { setMenuCardServices, setSmsServices } from "@/redux/slices/servicesSlice";

export const reduxDispatchMappers = {
 "menu-cards": setMenuCardServices,
 sms:setSmsServices
//   gallery: setGalleryServices,
//   business: setBusinessServices,
  // 🔁 Add all 50+ services here
};
