//import MenuQRPage from "@/components/servicesPages/servicesLayout/contentTabs/MenuContent";

import Navbar from "@/components/navbar/navbar";
import GenerateQR from "./(main)/generateQR/page";
import Footer from "@/components/footer/footer";

// import VehicleContent from "@/components/servicesPages/servicesLayout/contentTabs/VehicleContent";
// import UniversalFormWrapper from "@/forms/KidSafetyForm";

export default function Home() {
  return (
    <>
    
    <Navbar/>
    
      <GenerateQR />

    <Footer/>

    </>
  );
}
