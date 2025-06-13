import BulkQRGenerator from "@/components/homePage/bulkGenerator";
import CreateLogo from "@/components/homePage/createLogo";
import ImageToQR from "@/components/homePage/imageToQR";
import MarketingFeatures from "@/components/homePage/marketingFeatures/marketingFeatures";
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
<<<<<<< HEAD
      {/* <MultipleQRCodes/> */}
=======
>>>>>>> ea6025f1c32b28746d94730d6ff124f67a9b6b13
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
