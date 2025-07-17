"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import useServicesContext from "@/components/hooks/useServiceContext";
import useDesignContext from "@/components/hooks/useDesignContext";

import PetIdTemplateOne from "./templates/PetIdTemplateOne";
import PetIdTemplateTwo from "./templates/PetIdTemplateTwo";
import PetIdTemplateThree from "./templates/PetIdTemplateThree";
import PetIdTemplateFour from "./templates/PetIdTemplateFour";

const templateMap = {
  "pet1.webp": PetIdTemplateOne,
  "pet2.webp": PetIdTemplateTwo,
  "pet3.webp": PetIdTemplateThree,
  "pet4.webp": PetIdTemplateFour,
};

const PetTagPreview = () => {
  const { petIDFormData, isAnimating } = useServicesContext();
  const { bgDesign, isLoading, setBgDesign, setIsLoading } = useDesignContext();

  const SelectedTemplate = templateMap[petIDFormData.selectedTemplate || "pet1.webp"];

  const isVideo = bgDesign?.endsWith(".mp4") || bgDesign?.endsWith(".webm");
  const isImage = bgDesign && !isVideo;

  useEffect(() => {
    setBgDesign(null);
    setIsLoading(false);
  }, []);

  return (
    <div className="flex justify-center items-center ">
      <div className="relative w-[350px] h-[600px] border-[14px] border-gray-800 rounded-[50px] overflow-hidden shadow-2xl bg-white">
        {/* Notch */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[140px] h-[30px] bg-gray-800 rounded-b-xl z-20" />

        {/* Background */}
        {isImage && (
          <img
            src={bgDesign}
            alt="Background"
            onLoad={() => setTimeout(() => setIsLoading(false), 300)}
            className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none select-none"
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
            className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none select-none"
          />
        )}
        {!bgDesign && (
          <div className="absolute inset-0 bg-gradient-to-b from-[#f0fdfd] to-white z-0" />
        )}

        {/* Loader */}
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

        {/* Template Content */}
        <div
          className="absolute inset-0 flex items-center justify-center z-10 opacity-80"
          style={{
            top: "14px",
            bottom: "14px",
            left: "14px",
            right: "14px",
          }}
        >
          {SelectedTemplate ? (
            <div className="w-full h-full flex items-center justify-center">
              <SelectedTemplate
                petIDFormData={petIDFormData}
                isAnimating={isAnimating}
                bgDesign={bgDesign}
              />
            </div>
          ) : (
            <p className="text-gray-500 text-center p-4">
              Please select a pet tag template
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PetTagPreview;
