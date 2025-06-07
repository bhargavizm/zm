import BulkQRGenerator from "@/components/homePage/bulkGenerator";
import CreateLogo from "@/components/homePage/createLogo";
import ScheduleDemo from "@/components/homePage/demo/demo";
import DesignSection from "@/components/homePage/customizedQRCodeDesigns/designSection";
import ImageToQR from "@/components/homePage/imageToQR";
import MarketingFeatures from "@/components/homePage/marketingFeatures/marketingFeatures";
import MultipleQRCodes from "@/components/homePage/multipleQRCodes/multipleQRCodes";
import Security from "@/components/homePage/security/security";
import QRCodeTracking from "@/components/homePage/tracking";
import QRDesign from "@/components/homePage/qrDesign/qrDesign";
import React from "react";
import CustomizeQRCode from "@/components/homePage/customizedQRCodeDesigns/customizeQRCode";
import ServicesLayout from "@/components/servicesPages/servicesLayout/servicesLayout";
import CustomerReviews from "@/components/homePage/customerReviews";



const GenerateQR = () => {
  return (
    <>
      <CustomizeQRCode />
      <ServicesLayout/>
      <CreateLogo />
      <ScheduleDemo/>
      <Security/>
      <MultipleQRCodes/>
      <ImageToQR/>
      <BulkQRGenerator/>
      <QRDesign/>
      <CustomerReviews/>
      <MarketingFeatures/>
      <QRCodeTracking/>
    </>
  );
};

export default GenerateQR;
