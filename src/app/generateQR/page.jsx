import BulkQRGenerator from "@/components/homePage/bulkGenerator";
import CreateLogo from "@/components/homePage/createLogo";
import ImageToQR from "@/components/homePage/imageToQR";
import MarketingFeatures from "@/components/homePage/marketingFeatures/marketingFeatures";
import Security from "@/components/homePage/security/security";
import React from "react";
import CustomizeQRCode from "@/components/homePage/customizedQRCodeDesigns/customizeQRCode";
import CustomerReviews from "@/components/homePage/customerReviews";
import ScheduleDemo from "@/components/homePage/demo/demo";
import QRDesign from "@/components/homePage/qrDesign/qrDesign";
import QRCodeTracking from "@/components/homePage/tracking";
// import OfferScrolling from "@/components/homePage/offerScrolling";


const GenerateQR = () => {
  return (
    <>
      {/* <OfferScrolling /> */}
      <CustomizeQRCode />
      <CreateLogo />
      <ScheduleDemo />
      <Security/>
      <ImageToQR/>
      <BulkQRGenerator/>
      <QRDesign />
      <CustomerReviews/>
      <MarketingFeatures/>
      <QRCodeTracking />
      </>
  );
};

export default GenerateQR;
