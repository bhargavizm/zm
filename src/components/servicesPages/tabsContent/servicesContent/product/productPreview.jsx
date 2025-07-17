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
//       <div className="relative w-[350px] h-[600px] border-[14px] border-gray-800 rounded-[36px] bg-white overflow-hidden shadow-2xl p-2">
        
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
import React, { useEffect } from "react";
import useServicesContext from "@/components/hooks/useServiceContext";
import useDesignContext from "@/components/hooks/useDesignContext";
import Image from "next/image";

// Import your product template components
import ProductTemplateOne from "./templates/ProductTemplateOne";
import ProductTemplateTwo from "./templates/ProductTemplateTwo";
import ProductTemplateThree from "./templates/ProductTemplateThree"; // Adjusted path if needed
import ProductTemplateFour from "./templates/ProductTemplateFour"; // Adjusted path if needed

// Map template filenames to template components for dynamic rendering
const templateComponentMap = {
  "temp1.webp": ProductTemplateOne,
  "temp2.webp": ProductTemplateTwo,
  "temp3.webp": ProductTemplateThree,
  "temp4.webp": ProductTemplateFour,
};

const ProductPreview = () => {
  // Destructure product-related data from ServicesContext
  const { productData, productLogo, productImage, items = [] } = useServicesContext();
  // Destructure design-related data from DesignContext
  const { bgDesign, isLoading, setIsLoading, setBgDesign } = useDesignContext();

  // Determine the selected template filename based on productData.selectedTemplate index
  const selectedFilename =
    ["temp1.webp", "temp2.webp", "temp3.webp", "temp4.webp"][productData.selectedTemplate] || "temp1.webp";

  // Get the actual React component for the selected template
  const SelectedTemplate = templateComponentMap[selectedFilename];

  // Check if the background design is a video or image
const isVideo = bgDesign?.endsWith(".mp4") || bgDesign?.endsWith(".webm");
  const isImage = bgDesign && !isVideo;

  // Effect to manage initial loading state and potentially clear background
  useEffect(() => {
    // This effect might clear user-selected background from DesignContent if not managed carefully.
    // Consider the UX: do you want the background to reset every time this component mounts?
    setBgDesign(null); // Clears background on initial load/mount
    setIsLoading(false); // Ensures loader is off after initial render
  }, []); // Empty dependency array means this runs only once on mount

  return (
    <div className="flex justify-center items-center w-full">
      <div className="relative w-[350px] h-[600px] border-[14px] border-gray-800 rounded-[36px] bg-white overflow-hidden shadow-2xl p-2">

        {/* Background Handling (Image or Video) */}
        {isImage && (
          <img
            src={bgDesign}
            alt="Background"
            onLoad={() => setTimeout(() => setIsLoading(false), 300)}
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
            onLoadedData={() => setTimeout(() => setIsLoading(false), 300)}
            className="absolute inset-0 w-full h-full object-cover z-0"
          />
        )}
        {!bgDesign && (
          // Default gradient background if no specific background is set
          <div className="absolute inset-0 bg-gradient-to-b from-[#f0fdfd] to-white z-0" />
        )}

        {/* Loader Overlay */}
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

        {/* Foreground Content - Product Template */}
        <div className="relative z-10 h-full overflow-y-auto scrollbar-hide p-2">
          {SelectedTemplate ? (
            <SelectedTemplate
              productLogo={productLogo} // Pass the productLogo to the template
              items={items}
              productData={productData}
              productImage={productImage} // This might be redundant if items have their own images
              bgDesign={bgDesign} // Pass background design to template if it needs to adjust its content based on it
            />
          ) : (
            <p className="text-center text-gray-500 mt-4">Please select a template</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductPreview;