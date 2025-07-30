// "use client";
// import React, { useEffect, useState } from "react";
// import BgDesignRenderer from "./bgDesignRender";

// import Template1 from "@/components/servicesPages/tabsContent/servicesContent/businessShop/templates/Template1";
// import Template2 from "@/components/servicesPages/tabsContent/servicesContent/businessShop/templates/Template2";
// import Template3 from "@/components/servicesPages/tabsContent/servicesContent/businessShop/templates/Template3";
// import Template4 from "@/components/servicesPages/tabsContent/servicesContent/businessShop/templates/Template4";

// const templateComponentMap = {
//   "bc.webp": Template1,
//   "bc2.webp": Template2,
//   "bc3.webp": Template3,
//   "bc4.webp": Template4,
// };

// const BusinessPreview = ({ data }) => {
//   // Select template
//   const selectedTemplateKey = data?.selectedTemplate || "bc.webp";
//   const SelectedTemplate = templateComponentMap[selectedTemplateKey];

//   // Use bgDesign from data or fallback
//   const effectiveBgDesign = data?.bgDesign;

//   // Prepare the business data
//   const previewData = {
//     name: data?.name || "Your Name",
//     designation: data?.designation || "",
//     mobile: data?.mobile || "",
//     email: data?.email || "",
//     address: data?.address || "",
//     socialLink: data?.socialLink || "",
//     socialLink2: data?.socialLink2 || "",
//     subheading: data?.subheading || "",
//     mapLink: data?.mapLink || "",
//   };

//   const imageUrl = data?.profileImageUrl || "/default-user.webp";
//   const logoUrl = data?.brandLogoUrl || "/default-logo.webp";

//   return (
//     <div className="flex justify-center items-center w-full">
//       <div>
//         {/* Background Layer */}
//         <BgDesignRenderer bgDesign={effectiveBgDesign} defaultBg={defaultBg} />

//         {/* Foreground Template Layer */}
//         <div className="relative z-10 h-full overflow-y-auto scrollbar-hide">
//           {SelectedTemplate ? (
//             <SelectedTemplate
//               businessForm={previewData}
//               profileImage={imageUrl}
//               brandLogo={logoUrl}
//               bgDesign={effectiveBgDesign}
//             />
//           ) : (
//             <p className="text-gray-500 text-center">Please select a template</p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default BusinessPreview;
"use client";
import React, { useEffect } from "react";
import useDesignContext from "@/components/hooks/useDesignContext";
import TemplateOne from "@/components/templates/business/TemplateOne";
import TemplateTwo from "@/components/templates/business/TemplateTwo";
import TemplateThree from "@/components/templates/business/TemplateThree";
import TemplateFour from "@/components/templates/business/TemplateFour";
import BgDesignRenderer from "../bgDesignRender";

const BusinessPreview = ({ data }) => {
  const {
    template,
    setTemplate,
    bgDesign,
    setBgDesign,
    profileImage,
    setProfileImage,
    brandLogo,
    setBrandLogo,
  } = useDesignContext();

  const defaultTemplate = "templateV1";
  // const defaultBg = "/services-service/business.webp";

  useEffect(() => {
    // set bgDesign from data or default
    if (data?.bgDesign) {
      setBgDesign(data.bgDesign);
    }

    // set selected template from data or fallback
    if (data?.template) {
      setTemplate(data.template);
    } else {
      setTemplate(defaultTemplate);
    }

    // set images if present
    if (data?.profileImage) setProfileImage(data.profileImage);
    if (data?.brandLogo) setBrandLogo(data.brandLogo);
  }, [data]);

  const renderTemplate = () => {
    const props = {
      businessForm: data,
      profileImage,
      brandLogo,
    };

    switch (template) {
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
    <div className="w-full px-4">
      <BgDesignRenderer bgDesign={bgDesign} />
      <div className="relative z-20 flex justify-center py-6">
        <div className="w-full max-w-[360px] rounded-xl shadow bg-white/80 p-4 backdrop-blur-sm">
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
