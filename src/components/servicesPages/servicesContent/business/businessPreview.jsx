// "use client";
// import React from "react";
// import Image from "next/image";
// import useServicesContext from "@/components/hooks/useServiceContext";



// const BusinessPreview = () => {
//   const { businessForm, profileImage, brandLogo } = useServicesContext()
//   return (
//     <>
//       <div className="flex justify-center items-start">

//         <div className="w-[320px] h-[570px] border-4 border-[#001a1a] rounded-3xl p-4 shadow-2xl bg-white flex flex-col items-center space-y-3">
//           {profileImage && (
//             <Image
//               src={profileImage}
//               alt="Profile"
//               width={200}
//               height={200}
//               className="rounded-xl object-cover"
//             />
//           )}
//           {brandLogo && (
//             <Image
//               src={brandLogo}
//               alt="Logo"
//               width={120}
//               height={60}
//               className="object-contain"
//             />
//           )}
//           <h2 className="text-xl font-bold">{businessForm.name}</h2>
//           <p className="text-sm text-gray-600">{businessForm.heading}</p>
//           <p className="text-sm text-gray-600 italic">{businessForm.subheading}</p>
//           <p className="text-sm mt-2">📱 {businessForm.mobile}</p>
//           <p className="text-sm">🏢 {businessForm.businessName}</p>
//           <p className="text-sm">🧑‍💼 {businessForm.designation}</p>
//           <p className="text-sm">📍 {businessForm.address}</p>
//           <a
//             href={businessForm.mapLink}
//             target="_blank"
//             className="text-blue-500 text-sm"
//             rel="noreferrer"
//           >
//             View on Map
//           </a>
//           <p className="text-sm">📧 {businessForm.email}</p>
//           <a
//             href={businessForm.socialLink}
//             target="_blank"
//             className="text-sm text-[#008080]"
//             rel="noreferrer"
//           >
//             🔗 Social
//           </a>
//         </div> 
//       </div>
//     </>
//   );
// };

// export default BusinessPreview; 


"use client";
import React from "react";
import useServicesContext from "@/components/hooks/useServiceContext";

// Import all template components
import BusinessCardTemplateOne from './templates/BusinessCardTemplateOne';
import BusinessCardTemplateTwo from "./templates/BusinessCardTemplateTwo";
import BusinessCardTemplateThree from "./templates/BusinessCardTemplateThree";
import BusinessCardTemplateFour from "./templates/BusinessCardTemplateFour";

const BusinessPreview = () => {
  const { businessForm, profileImage, brandLogo } = useServicesContext();

  // Template mapping logic
  const templateComponentMap = {
    "bc.webp": BusinessCardTemplateOne,
    "bc2.webp": BusinessCardTemplateTwo,
    "bc3.webp": BusinessCardTemplateThree,
    "bc4.webp": BusinessCardTemplateFour,
  };

  const SelectedTemplate = templateComponentMap[businessForm.selectedTemplate];

  return (
    <div className="flex justify-center items-start">
      {SelectedTemplate ? (
        <SelectedTemplate
          businessForm={businessForm}
          profileImage={profileImage}
          brandLogo={brandLogo}
        />
      ) : (
        <p className="text-gray-500">Please select a template</p>
      )}
    </div>
  );
};

export default BusinessPreview;
