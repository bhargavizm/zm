import BulkQRGenerator from "@/components/homePage/bulkGenerator";
import CreateLogo from "@/components/homePage/createLogo";
import ScheduleDemo from "@/components/homePage/demo/demo";
import DesignSection from "@/components/homePage/customizedQRCodeDesigns/designSection";
import ImageToQR from "@/components/homePage/imageToQR";
import MarketingFeatures from "@/components/homePage/marketingFeatures/marketingFeatures";
import QRCodeTracking from "@/components/homePage/tracking";
import QRDesign from "@/components/homePage/qrDesign/qrDesign";
import React from "react";
import Security from "@/components/homePage/security/security";
import TestimonialSection from "@/components/homePage/customerReview";
import MultipleQRCodes from "@/components/homePage/multipleQRCodes.jsx/multipleQRCodes";

const GenerateQR = () => {
    return (
        <>
            {/* <main className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
        <QRCustomizer />
        <QRCustomizer2 />
    </main> */}
            <DesignSection />
            <CreateLogo />
            <ScheduleDemo />
            <Security />
            <MultipleQRCodes />
            <ImageToQR />
            <BulkQRGenerator />
            <QRDesign />
            <TestimonialSection />
            <MarketingFeatures />
            <QRCodeTracking />
        </>
    );
};

export default GenerateQR;
