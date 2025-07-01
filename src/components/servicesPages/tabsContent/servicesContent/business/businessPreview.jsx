
"use client";
import React, { useEffect } from "react";
import Image from "next/image";
import useServicesContext from "@/components/hooks/useServiceContext";
import useDesignContext from "@/components/hooks/useDesignContext";
import BusinessCardTemplateOne from "./templates/BusinessCardTemplateOne";
import BusinessCardTemplateTwo from "./templates/BusinessCardTemplateTwo";
import BusinessCardTemplateThree from "./templates/BusinessCardTemplateThree";
import BusinessCardTemplateFour from "./templates/BusinessCardTemplateFour";

const templateComponentMap = {
  "bc.webp": BusinessCardTemplateOne,
  "bc2.webp": BusinessCardTemplateTwo,
  "bc3.webp": BusinessCardTemplateThree,
  "bc4.webp": BusinessCardTemplateFour,
};

const BusinessPreview = () => {
  const { businessForm, profileImage, brandLogo } = useServicesContext();
  const { bgDesign, setBgDesign, isLoading, setIsLoading } = useDesignContext();

  const SelectedTemplate = templateComponentMap[businessForm.selectedTemplate || "bc.webp"];
 const isVideo = bgDesign?.endsWith(".mp4") || bgDesign?.endsWith(".webm");
  const isImage = bgDesign && !isVideo;

  useEffect(() => {
    // Clear any previous service's background on initial mount
    setBgDesign(null);
    setIsLoading(false);
  }, []);

  return (
    <div className="flex justify-center items-center w-full">
      <div className="relative w-[350px] h-[650px] border-[14px] border-gray-800 rounded-[36px] overflow-hidden shadow-2xl bg-white p-2">

        {/* Background */}
        {isImage && (
          <img
            src={bgDesign}
            alt="Background"
            onLoad={() => setTimeout(() => setIsLoading(false), 300)}
            className="absolute inset-0 w-full h-full object-cover z-0"
          />
        )}
        {isVideo && (
          <video
            src={bgDesign}
            autoPlay
            loop
            muted
            playsInline
            onLoadedData={() => setTimeout(() => setIsLoading(false), 300)}
            className="absolute inset-0 w-full h-full object-cover z-0"
          />
        )}
        {!bgDesign && (
          <div className="absolute inset-0 bg-white z-0" />
        )}

        {/* Loader Overlay */}
        {isLoading && (
          <div className="absolute inset-0 z-50 bg-mainGreen backdrop-blur-sm flex justify-center items-center">
            <Image
              src="/logos/ZM LOGO.webp"
              alt="Loading Logo"
              width={300}
              height={150}
              className="w-20 h-20 animate-bounce"
            />
          </div>
        )}

        {/* Foreground Template */}
        <div className="relative z-10 h-full overflow-y-auto scrollbar-hide">
          {SelectedTemplate ? (
            <SelectedTemplate
              businessForm={businessForm}
              profileImage={profileImage}
              brandLogo={brandLogo}
              bgDesign={bgDesign}
            />
          ) : (
            <p className="text-gray-500 text-center">Please select a template</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default BusinessPreview;
