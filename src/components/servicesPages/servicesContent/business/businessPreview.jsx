"use client";
import React from "react";
import useServicesContext from "@/components/hooks/useServiceContext";
import BusinessCardTemplateOne from "./templates/BusinessCardTemplateOne";
import BusinessCardTemplateTwo from "./templates/BusinessCardTemplateTwo";
import BusinessCardTemplateThree from "./templates/BusinessCardTemplateThree";
import BusinessCardTemplateFour from "./templates/BusinessCardTemplateFour";

const BusinessPreview = () => {
  const { businessForm, profileImage, brandLogo } = useServicesContext();

  const renderTemplate = () => {
    switch (businessForm.selectedTemplate) {
      case "bc.webp":
        return <BusinessCardTemplateOne data={businessForm} profileImage={profileImage} brandLogo={brandLogo} />;
      case "bc2.webp":
        return <BusinessCardTemplateTwo data={businessForm} profileImage={profileImage} brandLogo={brandLogo} />;
      case "bc3.webp":
        return <BusinessCardTemplateThree data={businessForm} profileImage={profileImage} brandLogo={brandLogo} />;
      case "bc4.webp":
        return <BusinessCardTemplateFour data={businessForm} profileImage={profileImage} brandLogo={brandLogo} />;
      default:
        return <BusinessCardTemplateOne data={businessForm} profileImage={profileImage} brandLogo={brandLogo} />;
    }
  };

  return <section className="p-6">{renderTemplate()}</section>;
};

export default BusinessPreview;
