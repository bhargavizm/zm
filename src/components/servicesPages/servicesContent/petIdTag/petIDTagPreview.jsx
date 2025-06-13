"use client";
import React from "react";
import useServicesContext from "@/components/hooks/useServiceContext";
import PetIdTemplateOne from "./templates/PetIdTemplateOne";
import PetIdTemplateTwo from "./templates/PetIdTemplateTwo";
import PetIdTemplateThree from "./templates/PetIdTemplateThree";
import PetIdTemplateFour from "./templates/PetIdTemplateFour";

// Import all pet ID tag templates


const PetTagPreview = () => {
  const { petIDFormData, isAnimating } = useServicesContext();

  // Mapping template filenames to components
  const templateMap = {
    "pet1.webp": PetIdTemplateOne,
    "pet2.webp": PetIdTemplateTwo,
    "pet3.webp": PetIdTemplateThree,
    "pet4.webp": PetIdTemplateFour,
  };
const SelectedTemplate = templateMap[petIDFormData.selectedTemplate || "pet1.webp"];


  return (
    <div className="flex justify-center items-start overflow-y-auto">
      {SelectedTemplate ? (
        <SelectedTemplate
          petIDFormData={petIDFormData}
          isAnimating={isAnimating}
        />
      ) : (
        <p className="text-gray-500">Please select a pet tag template</p>
      )}
    </div>
  );
};

export default PetTagPreview;
