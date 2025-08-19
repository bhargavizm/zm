import BusinessShopModal from "@/models/services/businessShopSchema";
import { BusinessCardsModel, VCardsModel } from "@/models/services/cardsSchema";
import DiscountModal from "@/models/services/discountSchema";
import { AudioServiceModel, GalleryServiceModel, PDFServiceModel, VideoServiceModel } from "@/models/services/encryptedServicesSchema";
import EventModel from "@/models/services/eventSchema";
import KidsSafetyModal from "@/models/services/kidSafetySchema";
import MedicalAlertModel from "@/models/services/medicalAlertSchema";
import MenuCardsServiceModel from "@/models/services/menuCardSchema";
import MultiUrlModal from "@/models/services/multiUrlSchema";
import PetTagModal from "@/models/services/petIdSchema";
import ProductsModel from "@/models/services/productSchema";
import propertySchema from "@/models/services/propertySchema";
import ResumeModel from "@/models/services/resumeSchema";
import SmsModal from "@/models/services/smsSchema";
import TextMessageModal from "@/models/services/textMessage";
import URLServiceModel from "@/models/services/urlServicesSchema";
import VehicleModel from "@/models/services/vehicleSchema";
import WifiModel from "@/models/services/wifiSchema";

export const urlBasedServices = [
  "urls",
  "meetings",
  "google-meets",
  "zoom-meets",
  "microsoft-teams",
  "forms",
  "student-forms",
  "personal-notes",
  "youtube",
  "facebook",
  "instagram",
  "linkedin",
  "twitter",
  "location",
  "landing-page",
  "github",
];

  const serviceModelMap = {
      "pdf": PDFServiceModel,
      "audios": AudioServiceModel,
      "videos": VideoServiceModel,
      "gallery": GalleryServiceModel,
      "menu-cards": MenuCardsServiceModel,
      "business-cards": BusinessCardsModel,
      "v-cards": VCardsModel,
      "business-shops": BusinessShopModal,
      "product-cards": ProductsModel,
      "Pet-ID-tags": PetTagModal,
      "multi-urls": MultiUrlModal,
      "resumes": ResumeModel,
      "medical-alerts": MedicalAlertModel,
      "text-messages": TextMessageModal,
      "discounts": DiscountModal,
      "events": EventModel,
      "kids-safety-qr-tags": KidsSafetyModal,
      "vehicles": VehicleModel,
      "property-qr": propertySchema,
      "wifi": WifiModel,
      "sms": SmsModal,
    };

    urlBasedServices.forEach(service => {
  serviceModelMap[service] = URLServiceModel;
});

    export default serviceModelMap
