"use client";
import React, { useEffect } from "react";
import useDesignContext from "@/components/hooks/useDesignContext";
import BgDesignRenderer from "../bgDesignRender";
import TemplateFour from "./templates/template4";
import TemplateOne from "./templates/templates1";
import TemplateThree from "./templates/template3";
import TemplateTwo from "./templates/template2";

const BusinessPreview = ({ data }) => {
  const { bgDesign, setBgDesign } = useDesignContext();

  const defaultTemplate = "templateV1";

  const templateMap = {
    "bc1.webp": "templateV1",
    "bc2.webp": "templateV2",
    "bc3.webp": "templateV3",
    "bc4.webp": "templateV4",
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
      businessForm: data,
    };

    switch (selectedTemplate) {
      case "templateV1":
        return <TemplateOne {...props} />;
      case "templateV2":
        return <TemplateTwo {...props} />;
      case "templateV3":
        return <TemplateThree {...props} />;
      case "templateV4":
        return <TemplateFour {...props} />;
      default:
        return <TemplateOne {...props} />;
    }
  };

  return (
    <div className="px-4 h-screen">
      <BgDesignRenderer bgDesign={bgDesign} defaultBg={defaultBg} />
      <div className="relative z-20 flex justify-center py-6">
        <div className="w-full  rounded-xl shadow bg-white/80 p-4 backdrop-blur-sm">
          {data ? (
            renderTemplate()
          ) : (
            <div className="text-center text-gray-400 py-10">
              <p className="text-lg font-medium">No Business Card Data</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BusinessPreview;
