import BulkQRGenerator from "@/components/homePage/bulkGenerator";
import CreateLogo from "@/components/homePage/createLogo";
import ImageToQR from "@/components/homePage/imageToQR";
import MarketingFeatures from "@/components/homePage/marketingFeatures/marketingFeatures";
// import MultipleQRCodes from "@/components/homePage/multipleQRCodes/multipleQRCodes";
import Security from "@/components/homePage/security/security";
import QRCodeTracking from "@/components/homePage/tracking";
import QRDesign from "@/components/homePage/qrDesign/qrDesign";
import React from "react";
import CustomizeQRCode from "@/components/homePage/customizedQRCodeDesigns/customizeQRCode";
import CustomerReviews from "@/components/homePage/customerReviews";
import ScheduleDemo from "@/components/homePage/demo/demo";


const GenerateQR = () => {
  return (
    <>
      <CustomizeQRCode />
      <CreateLogo />
      <ScheduleDemo />
      <Security/>
      {/* <MultipleQRCodes/> */}
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
