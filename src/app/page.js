import VehicleContent from "@/components/servicesContent/VehicleContent";
import GenerateQR from "./generateQR/page";
import KidSafetyForm from "@/components/servicesContent/KidSafetyForm";
import PropertyForm from "@/components/servicesContent/PropertyContent";
import StudentInfoForm from "@/components/servicesContent/StudentsFormContent";
import TextMessageForm from "@/components/servicesContent/TextMsgForm";

export default function Home() {
  return (
    <>
      <div className="">
        <GenerateQR/>
      </div>
    </>
  );
}
