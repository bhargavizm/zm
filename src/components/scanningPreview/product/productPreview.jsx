"use client";
import React, { useEffect, useState } from "react";

// Template imports
import ProductTemplateOne from "./templates/ProductTemplateOne";
import ProductTemplateTwo from "./templates/ProductTemplateTwo";
import ProductTemplateThree from "./templates/ProductTemplateThree";
import ProductTemplateFour from "./templates/ProductTemplateFour";

const ProductPreview = ({ data }) => {
  const defaultBg = "/services-service/product.webp";
  const [bgDesign, setBgDesign] = useState(defaultBg);

  const productData = data;
  const productLogo = data?.productLogo;
  const items = data?.items || [];
  const selectedTemplate = data?.selectedTemplate;

  useEffect(() => {
    setBgDesign(productData?.bgDesign || defaultBg);
  }, [productData]);

  const templateProps = {
    productData,
    productLogo,
    items,
    bgDesign,
  };

  const renderTemplate = () => {
    switch (selectedTemplate) {
      case 0:
        return <ProductTemplateOne {...templateProps} />;
      case 1:
        return <ProductTemplateTwo {...templateProps} />;
      case 2:
        return <ProductTemplateThree {...templateProps} />;
      case 3:
        return <ProductTemplateFour {...templateProps} />;
      default:
        return (
          <div className="text-center text-gray-500 p-4">
            No valid template selected.
          </div>
        );
    }
  };

  // Helper to detect if bg is video
  const isVideo = (url) => url?.match(/\.(mp4|webm|ogg)$/i);

  return (
    <div className="w-full relative overflow-hidden">
      {/* Background Video or Image */}
      {isVideo(bgDesign) ? (
        <video
          className="absolute inset-0 w-full h-full object-cover z-0"
          src={bgDesign}
          autoPlay
          loop
          muted
          playsInline
        />
      ) : (
        <div
          className="absolute inset-0 w-full h-full bg-center bg-cover z-0"
          style={{ backgroundImage: `url(${bgDesign})` }}
        />
      )}

      {/* Content Overlay - fullscreen */}
      <div className="relative z-10 w-full h-full flex justify-center items-center p-6">
        <div className="w-full h-full bg-white/80 rounded-2xl shadow-lg ">
          {renderTemplate()}
        </div>
      </div>
    </div>
  );
};

export default ProductPreview;
