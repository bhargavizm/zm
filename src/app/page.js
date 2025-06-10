import VehicleContent from "@/components/servicesContent/VehicleContent";
import GenerateQR from "./generateQR/page";
import KidSafetyForm from "@/components/servicesContent/KidSafetyForm";
import PropertyForm from "@/components/servicesContent/PropertyContent";
import StudentInfoForm from "@/components/servicesContent/StudentsFormContent";
import TextMessageForm from "@/components/servicesContent/TextMsgForm";
import PetIDTagPage from "@/components/servicesContent/PetTagContent";
import EventForm from "@/components/servicesContent/EventContent";
import MedicalAlertForm from "@/components/servicesContent/MedicalAlertContent";
import DiscountCouponForm from "@/components/servicesContent/DiscountContent";
import MenuQRPage from "@/components/servicesContent/MenuContent";
import SmsContent from "@/components/servicesContent/SmsContent";

export default function Home() {
  return (
    <>
      <div className="">
        <StudentInfoForm/>
      </div>
    </>
  );
}
