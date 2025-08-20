// "use client";
// import React, { useEffect } from "react";
// import useServicesContext from "@/components/hooks/useServiceContext";
// import useDesignContext from "@/components/hooks/useDesignContext";
// import Image from "next/image";

// import ProductTemplateOne from "./templates/ProductTemplateOne";
// import ProductTemplateTwo from "./templates/ProductTemplateTwo";
// import ProductTemplateThree from "./templates/ProductTemplateThree";
// import ProductTemplateFour from "./templates/ProductTemplateFour";

// const templateComponentMap = {
//   "temp1.webp": ProductTemplateOne,
//   "temp2.webp": ProductTemplateTwo,
//   "temp3.webp": ProductTemplateThree,
//   "temp4.webp": ProductTemplateFour,
// };

// const ProductPreview = () => {
//   const { productData, productImage } = useServicesContext();
//   const { bgDesign, isLoading, setIsLoading, setBgDesign } = useDesignContext();

//   const selectedFilename =
//     ["temp1.webp", "temp2.webp", "temp3.webp", "temp4.webp"][productData.selectedTemplate] || "temp1.webp";

//   const SelectedTemplate = templateComponentMap[selectedFilename];

//   const isVideo = bgDesign?.endsWith(".mp4");
//   const isImage = bgDesign && !isVideo;

//   useEffect(() => {
//     setBgDesign(null);
//     setIsLoading(false);
//   }, []);

//   return (
//     <div className="flex justify-center items-center w-full">
//       <div className="relative w-[350px] h-[650px] border-[14px] border-gray-800 rounded-[36px] bg-white overflow-hidden shadow-2xl p-2">
        
//         {/* Background */}
//         {isImage && (
//           <img
//             src={bgDesign}
//             alt="BG"
//             onLoad={() => setTimeout(() => setIsLoading(false), 300)}
//             className="absolute inset-0 w-full h-full object-cover z-0"
//           />
//         )}
//         {isVideo && (
//           <video
//             src={bgDesign}
//             autoPlay
//             loop
//             muted
//             playsInline
//             onLoadedData={() => setTimeout(() => setIsLoading(false), 300)}
//             className="absolute inset-0 w-full h-full object-cover z-0"
//           />
//         )}
//         {!bgDesign && (
//           <div className="absolute inset-0 bg-gradient-to-b from-[#f0fdfd] to-white z-0" />
//         )}

//         {/* Loader Overlay */}
//         {isLoading && (
//           <div className="absolute inset-0 z-50 bg-mainGreen backdrop-blur-sm flex justify-center items-center">
//             <Image
//               src="/logos/ZM LOGO.png"
//               alt="Loading Logo"
//               width={300}
//               height={150}
//               className="w-20 h-20 animate-bounce"
//             />
//           </div>
//         )}

//         {/* Foreground */}
//         <div className="relative z-10 h-full overflow-y-auto scrollbar-hide p-2">
//           {SelectedTemplate ? (
//             <SelectedTemplate
//               productData={productData}
//               productImage={productImage}
//               bgDesign={bgDesign}
//             />
//           ) : (
//             <p className="text-center text-gray-500 mt-4">Please select a template</p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProductPreview;









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

  const productData = data 
  const productLogo = data?.productLogo 
  const items = data?.items || []
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
  const isVideo = (url) =>
    url?.match(/\.(mp4|webm|ogg)$/i);

  return (
    <div className="w-full min-h-screen relative overflow-hidden">
      {/* Background Video or Image */}
      {isVideo(bgDesign) ? (
        <video
          className="absolute inset-0 w-full h-full object-center z-0"
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

      {/* Content Overlay */}
      <div className="relative z-10 max-w-[95%] mx-auto opacity-85 rounded-2xl p-3 shadow-lg mt-6 mb-6">
        {renderTemplate()}
      </div>
    </div>
  );
};

export default ProductPreview;
