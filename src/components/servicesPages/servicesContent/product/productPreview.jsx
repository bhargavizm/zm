"use client";

import React from "react";
import useServicesContext from "@/components/hooks/useServiceContext";
import useDesignContext from "@/components/hooks/useDesignContext";

// Template components
import ProductTemplateOne from "./templates/ProductTemplateOne";
import ProductTemplateTwo from "./templates/ProductTemplateTwo";
import ProductTemplateThree from "./templates/ProductTemplateThree";
import ProductTemplateFour from "./templates/ProductTemplateFour";

const templateComponentMap = {
  "temp1.webp": ProductTemplateOne,
  "temp2.webp": ProductTemplateTwo,
  "temp3.webp": ProductTemplateThree,
  "temp4.webp": ProductTemplateFour,
};

const ProductPreview = () => {
  const { productData, productImage } = useServicesContext();
  const { bgDesign } = useDesignContext();

  const selectedFilename = [
    "temp1.webp",
    "temp2.webp",
    "temp3.webp",
    "temp4.webp",
  ][productData.selectedTemplate] || "temp1.webp";

  const SelectedTemplate = templateComponentMap[selectedFilename];

  const isVideo = bgDesign?.endsWith(".mp4");
  const isImage = bgDesign && !isVideo;

  return (
    <div className="relative w-[350px] h-[570px] border-[14px] border-gray-800 rounded-[36px] bg-white overflow-hidden shadow-2xl">
      
      {/* Background image or video */}
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

      {/* Foreground: Template Content */}
      <div className="relative z-10 h-full overflow-y-auto scrollbar-hide p-2">
        {SelectedTemplate ? (
          <SelectedTemplate
            productData={productData}
            productImage={productImage}
            bgDesign={bgDesign}
          />
        ) : (
          <p className="text-center text-gray-500 mt-4">
            Please select a template
          </p>
        )}
      </div>
    </div>
  );
};

export default ProductPreview;
