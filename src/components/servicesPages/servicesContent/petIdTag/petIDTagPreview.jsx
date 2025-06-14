// "use client";

// import React from "react";
// import useServicesContext from "@/components/hooks/useServiceContext";
// import useDesignContext from "@/components/hooks/useDesignContext";

// import PetIdTemplateOne from "./templates/PetIdTemplateOne";
// import PetIdTemplateTwo from "./templates/PetIdTemplateTwo";
// import PetIdTemplateThree from "./templates/PetIdTemplateThree";
// import PetIdTemplateFour from "./templates/PetIdTemplateFour";

// // Mapping filenames to components
// const templateMap = {
//   "pet1.webp": PetIdTemplateOne,
//   "pet2.webp": PetIdTemplateTwo,
//   "pet3.webp": PetIdTemplateThree,
//   "pet4.webp": PetIdTemplateFour,
// };

// const PetTagPreview = () => {
//   const { petIDFormData, isAnimating } = useServicesContext();
//   const { bgDesign } = useDesignContext();

//   const SelectedTemplate =
//     templateMap[petIDFormData.selectedTemplate || "pet1.webp"];

//   const isVideo = bgDesign?.endsWith(".mp4");
//   const isImage = bgDesign && !isVideo;

//   return (
//     <div className="flex justify-center">
//       <div className="relative w-[350px] h-[550px] border-[14px] border-gray-800 rounded-[36px] overflow-hidden shadow-2xl bg-white">
//         {/* Background layer */}
//         {isImage && (
//           <img
//             src={bgDesign}
//             alt="Background"
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
//             className="absolute inset-0 w-full h-full object-cover z-0"
//           />
//         )}
//         {!bgDesign && (
//           <div className="absolute inset-0 bg-gradient-to-b from-[#f0fdfd] to-white z-0" />
//         )}

//         {/* Content Layer */}
//         <div className="relative z-10 h-full overflow-y-auto scrollbar-hide m-2">
//           {SelectedTemplate ? (
//             <SelectedTemplate
//               petIDFormData={petIDFormData}
//               isAnimating={isAnimating}
//               bgDesign={bgDesign}
//             />
//           ) : (
//             <p className="text-gray-500">Please select a pet tag template</p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PetTagPreview;

"use client";

import React from "react";
import useServicesContext from "@/components/hooks/useServiceContext";
import useDesignContext from "@/components/hooks/useDesignContext";

import PetIdTemplateOne from "./templates/PetIdTemplateOne";
import PetIdTemplateTwo from "./templates/PetIdTemplateTwo";
import PetIdTemplateThree from "./templates/PetIdTemplateThree";
import PetIdTemplateFour from "./templates/PetIdTemplateFour";

// Mapping template file names to components
const templateMap = {
  "pet1.webp": PetIdTemplateOne,
  "pet2.webp": PetIdTemplateTwo,
  "pet3.webp": PetIdTemplateThree,
  "pet4.webp": PetIdTemplateFour,
};

const PetTagPreview = () => {
  const { petIDFormData, isAnimating } = useServicesContext();
  const { bgDesign } = useDesignContext();

  // Determine which template component to render
  const SelectedTemplate = templateMap[petIDFormData.selectedTemplate || "pet1.webp"];

  // Determine background type
  const isVideo = bgDesign?.endsWith(".mp4");
  const isImage = bgDesign && !isVideo;

  return (
    <div className="flex justify-center">
      <div className="relative w-[350px] h-[550px] border-[14px] border-gray-800 rounded-[36px] overflow-hidden shadow-2xl bg-white">

        {/* Background Layer */}
        {isImage && (
          <img
            src={bgDesign}
            alt="Background"
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
            className="absolute inset-0 w-full h-full object-cover z-0"
          />
        )}

        {!bgDesign && (
          <div className="absolute inset-0 bg-gradient-to-b from-[#f0fdfd] to-white z-0" />
        )}

        {/* Foreground Content */}
        <div className="relative z-10 h-full overflow-y-auto scrollbar-hide m-2">
          {SelectedTemplate ? (
            <SelectedTemplate
              petIDFormData={petIDFormData}
              isAnimating={isAnimating}
              bgDesign={bgDesign}
            />
          ) : (
            <p className="text-gray-500 text-center mt-20">
              Please select a pet tag template
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PetTagPreview;

