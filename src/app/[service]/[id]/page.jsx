import { notFound } from "next/navigation";
import { connectDB } from "@/lib/mongoDB";

// Models
import PetTagModal from "@/models/services/petIdSchema";
import ResumeModel from "@/models/services/resumeSchema";
import businessShopSchema from "@/models/services/businessShopSchema";
import SmsModal from "@/models/services/smsSchema";
import TextMessageModal from "@/models/services/textMessage";

// Components


import KidsSafetyModal from "@/models/services/kidSafetySchema";
import SmsPreview from "@/components/scanningPreview/SmsPreview";
import TextMessagePreview from "@/components/scanningPreview/TextFormPreview";
import KidsSafetyPreview from "@/components/scanningPreview/KidsSafetyPreview";
import MenuCardsServiceModel from "@/models/services/menuCardSchema";
import MenuBookPreview from "@/components/scanningPreview/menuBookPreview";


// Map service names to models & components
const serviceMap = {
  sms: {
    model: SmsModal,
    component: (data) => <SmsPreview data={data} />,
  },

  menuCard: {
    model: MenuCardsServiceModel,
    component: (data) => <MenuBookPreview data={data} />,
  },

  textMessage:{
    model:TextMessageModal,
    component:(data)=><TextMessagePreview data={data}/>
  },
  kidsSafety:{
    model:KidsSafetyModal,
    component:(data)=><KidsSafetyPreview data={data}/>
  },
  petid: {
    model: PetTagModal,
    component: (data) => <PetPreview petIDFormData={data} />,
  },
  resumes: {
    model: ResumeModel,
    component: (data) => <ResumePreview data={data} />,
  },
  businessShop: {
    model: businessShopSchema,
    component: (data) => <CardPreview data={data} />,
  },

  // Add more services as needed
};

// ✅ This handles setting the metadata title dynamically
export async function generateMetadata({ params }) {
  const { service } = await params; // ✅ Await params

  return {
    title: `${service.charAt(0).toUpperCase() + service.slice(1)} - Details`,
  };
}


const Page = async ({ params }) => {
  const { service, id } = params;
  const serviceConfig = serviceMap[service];

  if (!serviceConfig) return notFound();

  await connectDB();

  let data = await serviceConfig.model.findById(id).lean();

  

  // ✅ Fix: Convert `_id` (and other BSON types) to JSON-serializable data
  data = JSON.parse(JSON.stringify(data));

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      {serviceConfig.component(data)}
    </div>
  );
};

export default Page;
