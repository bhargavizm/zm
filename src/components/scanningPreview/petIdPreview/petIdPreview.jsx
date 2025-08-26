"use client";
import React, { useEffect } from "react";
import useDesignContext from "@/components/hooks/useDesignContext";
import BgDesignRenderer from "../bgDesignRender";
import PetIdTemplateOne from "./templates/templateOne";
import PetIdTemplateTwo from "./templates/templateTwo";
import PetIdTemplateThree from "./templates/templateThree";
import PetIdTemplateFour from "./templates/templateFour";

const PetIdPreview = ({ data }) => {
  const { bgDesign, setBgDesign } = useDesignContext();
  const defaultTemplate = "pet1.webp";

  const templateMap = {
    "pet1.webp": PetIdTemplateOne,
    "pet2.webp": PetIdTemplateTwo,
    "pet3.webp": PetIdTemplateThree,
    "pet4.webp": PetIdTemplateFour,
  };

  useEffect(() => {
    if (data?.bgDesign) {
      setBgDesign(data.bgDesign);
    }
  }, [data, setBgDesign]);

  const renderTemplate = () => {
    const props = { petIDFormData: data };
    const TemplateComponent = templateMap[data?.selectedTemplate] || PetIdTemplateOne;
    return <TemplateComponent {...props} />;
  };

  return (
    <div className=" h-screen relative overflow-hidden">
      {/* Full-screen background */}
      <BgDesignRenderer bgDesign={bgDesign} defaultBg={null} />

      {/* Centered Pet ID Template */}
      <div className="relative z-10 flex justify-center items-center h-full">
        {data ? (
          <div className="w-full h-full flex justify-center items-center p-4">
            {/* Maintain aspect ratio of template */}
            <div className=" w-full  h-full">
              {renderTemplate()}
            </div>
          </div>
        ) : (
          <div className="text-center text-gray-400">
            <p className="text-lg font-medium">No Pet ID Tag Data</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PetIdPreview;
