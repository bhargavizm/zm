import { notFound } from "next/navigation";
import { connectDB } from "@/lib/mongoDB";

// Models
import PetTagModal from "@/models/services/petIdSchema";
import ResumeModel from "@/models/services/resumeSchema";
import businessShopSchema from "@/models/services/businessShopSchema";
import SmsModal from "@/models/services/smsSchema";
import TextMessageModal from "@/models/services/textMessage";
import KidsSafetyModal from "@/models/services/kidSafetySchema";
import MenuCardsServiceModel from "@/models/services/menuCardSchema";
import VehicleModel from "@/models/services/vehicleSchema";

// Components (Server or dynamic server-compatible ones)
import SmsPreview from "@/components/scanningPreview/SmsPreview";
import TextMessagePreview from "@/components/scanningPreview/TextFormPreview";
import KidsSafetyPreview from "@/components/scanningPreview/KidsSafetyPreview";
import MenuBookPreview from "@/components/scanningPreview/menuBookPreview";
import VehiclePreview from "@/components/scanningPreview/vehiclePreview";
import MultiUrlModal from "@/models/services/multiUrlSchema";
import MultiUrlPreview from "@/components/scanningPreview/multiUrlPreview";

// Client component
import PasswordModal from "@/components/common/passwordModal"; // ✅ CLIENT COMPONENT

// Service map
const serviceMap = {
  sms: {
    model: SmsModal,
    component: SmsPreview,
  },
  vehicle: {
    model: VehicleModel,
    component: VehiclePreview,
  },
  menuCard: {
    model: MenuCardsServiceModel,
    component: MenuBookPreview,
  },
  textMessage: {
    model: TextMessageModal,
    component: TextMessagePreview,
  },
  kidsSafety: {
    model: KidsSafetyModal,
    component: KidsSafetyPreview,
  },

  "multi-urls": {
    model: MultiUrlModal,
    component: MultiUrlPreview,
  },
};

// Metadata generation
export async function generateMetadata({ params }) {
  const { service } = params;
  return {
    title: `${service.charAt(0).toUpperCase() + service.slice(1)} - Details`,
  };
}

// Page component
const Page = async ({ params }) => {
  const { service, id } = params;
  const serviceConfig = serviceMap[service];

  if (!serviceConfig) return notFound();

  await connectDB();
  let data = await serviceConfig.model.findById(id).lean();
  if (!data) return notFound();

  data = JSON.parse(JSON.stringify(data)); // Make serializable
  const ComponentToRender = serviceConfig.component;

  return (
    <PasswordModal data={data}>
      <ComponentToRender data={data} />
    </PasswordModal>
  );
};

export default Page;
