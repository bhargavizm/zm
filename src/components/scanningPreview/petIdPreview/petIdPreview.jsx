"use client";
import React, { useEffect } from "react";
import useDesignContext from "@/components/hooks/useDesignContext";
import BgDesignRenderer from "../bgDesignRender";
import PetIdTemplateOne from "./templates/templateOne";
import PetIdTemplateTwo from "./templates/templateTwo";
import PetIdTemplateThree from "./templates/templateThree";
import PetIdTemplateFour from "./templates/templateFour";
import TemplateThree from "../cards/templates/template3";


const PetIdPreview = ({ data }) => {
  const { bgDesign, setBgDesign } = useDesignContext();

  const defaultTemplate = "pet1.webp";

  const templateMap = {
  "pet1.webp": PetIdTemplateOne,
  "pet2.webp": PetIdTemplateTwo,
  "pet3.webp": PetIdTemplateThree,
  "pet4.webp": PetIdTemplateFour,
};

  const selectedTemplateFile = data?.selectedTemplate;
  const selectedTemplate = templateMap[selectedTemplateFile] || defaultTemplate;
  const defaultBg = null;

  useEffect(() => {
    // set bgDesign from data or default
    if (data?.bgDesign) {
      setBgDesign(data.bgDesign);
    }
  }, [data]);
  const renderTemplate = () => {
    const props = {
      petIDFormData: data,
    };

    switch (data?.selectedTemplate) {
      case "pet1.webp":
        return <PetIdTemplateOne {...props} />;
      case "pet2.webp":
        return <PetIdTemplateTwo {...props} />;
      case "pet3.webp":
        return <PetIdTemplateThree {...props} />;
      case "pet4.webp":
        return <PetIdTemplateFour {...props} />;
      default:
        return <PetIdTemplateOne {...props} />;
    }
  };

  return (
    <div className="px-4 h-screen">
      <BgDesignRenderer bgDesign={bgDesign} defaultBg={defaultBg} />
      <div className="relative z-20 flex justify-center py-6">
        <div className="w-full  rounded-xl">
          {data ? (
            renderTemplate()
          ) : (
            <div className="text-center text-gray-400 py-10">
              <p className="text-lg font-medium">No Pet Id Tag  Data</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PetIdPreview;
