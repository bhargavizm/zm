"use client";
import React from "react";
import useServicesContext from "@/components/hooks/useServiceContext";

// Import all product templates
import ProductTemplateOne from "./templates/ProductTemplateOne";
import ProductTemplateTwo from "./templates/ProductTemplateTwo";
import ProductTemplateThree from "./templates/ProductTemplateThree";
import ProductTemplateFour from "./templates/ProductTemplateFour";

const ProductPreview = () => {
  const { productData, productImage } = useServicesContext();

  // Mapping template image filenames to components
  const templateComponentMap = {
    "temp1.webp": ProductTemplateOne,
    "temp2.webp": ProductTemplateTwo,
    "temp3.webp": ProductTemplateThree,
    "temp4.webp": ProductTemplateFour,
  };

  // Resolve selected template filename based on index
  const selectedTemplateFilename = ["temp1.webp", "temp2.webp", "temp3.webp", "temp4.webp"][productData.selectedTemplate];

  const SelectedTemplate = templateComponentMap[selectedTemplateFilename];

  return (
    <div className="flex justify-center items-start">
      {SelectedTemplate ? (
        <SelectedTemplate
          productData={productData}
          productImage={productImage}
        />
      ) : (
        <p className="text-gray-500">Please select a product template</p>
      )}
    </div>
  );
};

export default ProductPreview;
