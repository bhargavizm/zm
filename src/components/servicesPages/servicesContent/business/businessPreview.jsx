
"use client";

import React from "react";
import useServicesContext from "@/components/hooks/useServiceContext";
import useDesignContext from "@/components/hooks/useDesignContext";
import BusinessCardTemplateOne from './templates/BusinessCardTemplateOne';
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
  const { bgDesign } = useDesignContext();

  const SelectedTemplate =
    templateComponentMap[businessForm.selectedTemplate || "bc.webp"];

  const isVideo = bgDesign?.endsWith(".mp4");
  const isImage = bgDesign && !isVideo;

  return (
    <div className="flex justify-center">
    <div className="relative w-[350px] h-[570px] border-[14px] border-gray-800 rounded-[36px] overflow-hidden shadow-2xl bg-white p-2 ">
      {/* Background */}
      {isImage && ( 
        <img
          src={bgDesign}
          alt="BG"
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
          className="absolute inset-0 w-full h-full object-cover z-0"
        />
      )}
      {!bgDesign && (
        <div className="absolute inset-0 bg-gradient-to-b from-[#f0fdfd] to-white z-0" />
      )}

      {/* Glass overlay */}
      {/* <div className="absolute inset-0 bg-white/80 backdrop-blur-md z-0" /> */}

      {/* Content (Template) */}
      <div className="relative z-10 h-full overflow-y-auto scrollbar-hide ">
        {SelectedTemplate ? (
          <SelectedTemplate
            businessForm={businessForm}
            profileImage={profileImage}
            brandLogo={brandLogo}
            bgDesign={bgDesign}
          />
        ) : (
          <p className="text-gray-500">Please select a template</p>
        )}
      </div>
    </div>  
    </div>
  );
};

export default BusinessPreview;
