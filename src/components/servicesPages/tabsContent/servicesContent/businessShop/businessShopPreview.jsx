// "use client";

// import React, { useEffect } from "react";
// import Image from "next/image";
// import useServicesContext from "@/components/hooks/useServiceContext";
// import useDesignContext from "@/components/hooks/useDesignContext";
// import Template1 from "@/components/servicesPages/tabsContent/servicesContent/businessShop/templates/Template1";
// import Template2 from "@/components/servicesPages/tabsContent/servicesContent/businessShop/templates/Template2";
// import Template3 from "@/components/servicesPages/tabsContent/servicesContent/businessShop/templates/Template3";
// import Template4 from "@/components/servicesPages/tabsContent/servicesContent/businessShop/templates/Template4";

// const Section = ({ title, children, condition }) => {
//   if (!condition) return null;
//   return (
//     <div className="mb-4">
//       <div className="bg-white rounded-lg shadow-sm p-4">
//         <h2 className="text-lg font-semibold mb-2 text-[#008080]">{title}</h2>
//         <div className="space-y-2 text-sm text-gray-800">{children}</div>
//       </div>
//     </div>
//   );
// };

// const BusinessShopPreview = () => {
//   const { dynamicForms } = useServicesContext();
//   const { bgDesign, setBgDesign, isLoading, setIsLoading } = useDesignContext();

//   const {
//     businessInfo = {},
//     shopTimingsTemplate = {}
//   } = dynamicForms;

//   const {
//     general = {},
//     contact = {},
//     media = {},
//     security = {}
//   } = businessInfo;

//   const {
//     selectedTemplate = "template1",
//     template1Data = { days: [] },
//     template2Data = {},
//     template3Data = {},
//     template4Data = {},
//   } = shopTimingsTemplate;

//  const isVideo = bgDesign?.endsWith(".mp4") || bgDesign?.endsWith(".webm");
//   const isImage = bgDesign && !isVideo;

//   const hasData =
//     general.businessName || general.businessType || general.description || general.establishedDate || general.shopTimings ||
//     contact.phone || contact.altPhone || contact.email || contact.address ||
//     media.logo || media.video || (media.galleryImages?.length > 0) ||
//     security.password || selectedTemplate;

//   // 🔄 Reset bg and stop loader on mount
//   useEffect(() => {
//     setBgDesign(null);
//     setIsLoading(false);
//   }, []);

//   // 📌 Render selected template
//   const renderSelectedTemplate = () => {
//     switch (selectedTemplate) {
//       case "template2":
//         return <Template2 data={template2Data} />;
//       case "template3":
//         return <Template3 data={template3Data} />;
//       case "template4":
//         return <Template4 data={template4Data} />;
//       default:
//         return <Template1 data={template1Data} />;
//     }
//   };

//   return (
//     <div className="flex justify-center items-center w-full">
//       <div className="relative w-[350px] h-[650px] border-[14px] border-gray-800 rounded-[36px] overflow-hidden shadow-2xl bg-white">

//         {/* 🌄 Background Layer */}
//         {isImage && (
//           <img
//             src={bgDesign}
//             alt="Background"
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
//         {!bgDesign && <div className="absolute inset-0 bg-white z-0" />}

//         {/* ⏳ Loading */}
//         {isLoading && (
//           <div className="absolute inset-0 z-50 bg-mainGreen backdrop-blur-sm flex justify-center items-center">
//             <Image
//               src="/logos/ZM LOGO.webp"
//               alt="Loading"
//               width={100}
//               height={100}
//               className="w-20 h-20 animate-bounce"
//             />
//           </div>
//         )}

//         {/* 🧾 Content */}
//         <div className="relative z-10 h-full  overflow-y-auto scrollbar-hide pt-8 pb-4 px-4">
//           {!hasData ? (
//             <div className="flex items-center justify-center h-full text-center text-gray-500 text-lg font-medium">
//               Start entering business details to see a live preview!
//             </div>
//           ) : (
//             <>
//               <div className="bg-white rounded-lg shadow-sm p-4">
//                 <h2 className="text-center text-xl font-bold mb-2 text-[#008080]">Business Profile</h2>
//               </div>

//               {/* Templates */}
//               {selectedTemplate === "template1" && (
//                 <div className="bg-white/70 rounded-lg shadow-sm p-4">
//                   <Template1 data={template1Data} />
//                 </div>
//               )}
//               {selectedTemplate === "template2" && (
//                 <div className="bg-white/70 rounded-lg shadow-sm p-4">
//                   <Template2 data={template2Data} />
//                 </div>
//               )}
//               {selectedTemplate === "template3" && (
//                 <div className="bg-white/70 rounded-lg shadow-sm p-4">
//                   <Template3 data={template3Data} />
//                 </div>
//               )}
//               {selectedTemplate === "template4" && (
//                 <div className="bg-white/70 rounded-lg shadow-sm p-4">
//                   <Template4 data={template4Data} />
//                 </div>
//               )}

//               {/* Info Sections */}
//               <Section
//                 title="Business Info"
//                 condition={general.businessName || general.businessType || general.description || general.establishedDate || general.shopTimings}
//               >
//                 {general.businessName && <p><strong>Name:</strong> {general.businessName}</p>}
//                 {general.businessType && <p><strong>Type:</strong> {general.businessType}</p>}
//                 {general.description && <p><strong>Description:</strong> {general.description}</p>}
//                 {general.establishedDate && <p><strong>Established:</strong> {general.establishedDate}</p>}
//                 {general.shopTimings && <p><strong>Timings:</strong> {general.shopTimings}</p>}
//               </Section>

//               <Section
//                 title="Contact Info"
//                 condition={contact.phone || contact.email || contact.address}
//               >
//                 {contact.phone && <p><strong>Phone:</strong> {contact.phone}</p>}
//                 {contact.altPhone && <p><strong>Alternate Phone:</strong> {contact.altPhone}</p>}
//                 {contact.email && <p><strong>Email:</strong> {contact.email}</p>}
//                 {contact.address && <p><strong>Address:</strong> {contact.address}</p>}
//               </Section>

//               <Section
//                 title="Media"
//                 condition={media.logo || media.video || (media.galleryImages?.length > 0)}
//               >
//                 {media.logo && (
//                   <div className="mb-2">
//                     <p className="font-medium">Logo:</p>
//                     <img
//                       src={URL.createObjectURL(media.logo)}
//                       alt="Logo"
//                       className="w-20 h-20 object-cover rounded border"
//                     />
//                   </div>
//                 )}
//                 {media.video && (
//                   <div className="mb-2">
//                     <p className="font-medium">Video:</p>
//                     <video
//                       src={URL.createObjectURL(media.video)}
//                       controls
//                       className="w-full rounded border"
//                     />
//                   </div>
//                 )}
//                 {media.galleryImages?.length > 0 && (
//                   <div>
//                     <p className="font-medium mb-1">Gallery:</p>
//                     <div className="grid grid-cols-2 gap-2">
//                       {media.galleryImages.map((img, idx) => (
//                         <img
//                           key={idx}
//                           src={URL.createObjectURL(img)}
//                           alt={`Gallery ${idx + 1}`}
//                           className="w-full h-20 object-cover border rounded"
//                         />
//                       ))}
//                     </div>
//                   </div>
//                 )}
//               </Section>

             
//             </>
//           )}
//         </div>

//         {/* Footer */}
//         <div className="relative z-10 border-t border-gray-200 text-center text-xs text-gray-500 py-2 bg-white/90">
//           <p>Scan for Business Info</p>
//           <p className="mt-1">v1.0.0</p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default BusinessShopPreview;


"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import useServicesContext from "@/components/hooks/useServiceContext";
import useDesignContext from "@/components/hooks/useDesignContext";
import Template1 from "@/components/servicesPages/tabsContent/servicesContent/businessShop/templates/Template1";
import Template2 from "@/components/servicesPages/tabsContent/servicesContent/businessShop/templates/Template2";
import Template3 from "@/components/servicesPages/tabsContent/servicesContent/businessShop/templates/Template3";
import Template4 from "@/components/servicesPages/tabsContent/servicesContent/businessShop/templates/Template4";

const Section = ({ title, children, condition }) => {
  if (!condition) return null;
  return (
    <div className="mb-4">
      <div className="bg-white rounded-lg shadow-sm p-4">
        <h2 className="text-lg font-semibold mb-2 text-[#008080]">{title}</h2>
        <div className="space-y-2 text-sm text-gray-800">{children}</div>
      </div>
    </div>
  );
};

const BusinessShopPreview = () => {
  const { dynamicForms } = useServicesContext();
  const { bgDesign, setBgDesign, isLoading, setIsLoading } = useDesignContext();

  const {
    businessInfo = {},
    shopTimingsTemplate = {}
  } = dynamicForms;

  const {
    general = {},
    contact = {},
    media = {},
    security = {}
  } = businessInfo;

  const {
    selectedTemplate = "template1",
    template1Data = {},
    template2Data = {},
    template3Data = {},
    template4Data = {},
  } = shopTimingsTemplate;

  const isVideo = bgDesign?.endsWith(".mp4") || bgDesign?.endsWith(".webm");
  const isImage = bgDesign && !isVideo;
  const safeSelectedTemplate = typeof selectedTemplate === "string" ? selectedTemplate : "template1";
  const gallery = Array.isArray(media.galleryImages) ? media.galleryImages : [];

  const getMediaSrc = (fileOrUrl) => {
    if (!fileOrUrl) return "";
    return typeof fileOrUrl === "string" ? fileOrUrl : URL.createObjectURL(fileOrUrl);
  };

  const hasData =
    general.businessName || general.businessType || general.description || general.establishedDate || general.shopTimings || general.discount ||
    contact.phone || contact.altPhone || contact.email || contact.address ||
    media.logo || media.video || gallery.length > 0 ||
    security.password || selectedTemplate;

  useEffect(() => {
    setBgDesign(null);
    setIsLoading(false);
  }, []);

  return (
    <div className="flex justify-center items-center w-full">
      <div className="relative w-[350px] h-[650px] border-[14px] border-gray-800 rounded-[36px] overflow-hidden shadow-2xl bg-white">

        {/* Background Layer */}
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
          <div className="absolute inset-0 bg-gray-100 z-0 flex justify-center items-center text-sm text-gray-400">
            No Background Selected
          </div>
        )}

        {/* Loading */}
        {isLoading && (
          <div className="absolute inset-0 z-50 bg-mainGreen backdrop-blur-sm flex justify-center items-center">
            <Image
              src="/logos/ZM LOGO.webp"
              alt="Loading"
              width={100}
              height={100}
              className="w-20 h-20 animate-bounce"
            />
          </div>
        )}

        {/* Content */}
        <div className="relative z-10 h-full overflow-y-auto scrollbar-hide pt-8 pb-4 px-4">
          {!hasData ? (
            <div className="flex items-center justify-center h-full text-center text-gray-500 text-lg font-medium">
              Start entering business details to see a live preview!
            </div>
          ) : (
            <>
              {/* Logo Section - Now properly circular for any image */}
              <div className="flex flex-col items-center justify-center mb-6">
              {media.logo && (
                
                  <div className="relative w-32 h-32 rounded-full shadow-lg overflow-hidden border-2 border-teal-100 bg-white/90 backdrop-blur-sm">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <img
                        src={getMediaSrc(media.logo)}
                        alt="Business Logo"
                        className="min-w-full min-h-full object-cover"
                        style={{
                          borderRadius: '50%',
                          aspectRatio: '1/1'
                        }}
                      />
                    </div>
                  </div>
                  )}
                  {general.businessName && (
                    <div className="bg-white mt-5 rounded-2xl pb-2 px-2">
                    <h1 className="text-xl font-bold mt-3 text-center text-[#008080]">
                      {general.businessName}
                    </h1>
                    </div>
                  )}
                </div>
              

              {/* Info Sections */}
              <Section
                title="Business Info"
                condition={general.businessType || general.description || general.establishedDate || general.shopTimings}
              >
                {general.businessType && <p><strong>Type:</strong> {general.businessType}</p>}
                {general.description && <p><strong>Description:</strong> {general.description}</p>}
                {general.establishedDate && <p><strong>Established:</strong> {general.establishedDate}</p>}
                {general.shopTimings && <p><strong>Timings:</strong> {general.shopTimings}</p>}
                {general.discount && <p><strong>Discount:</strong> {general.discount}</p>}
              </Section>

              <Section
                title="Contact Info"
                condition={contact.owner || contact.phone || contact.altPhone || contact.email || contact.address}
              >
                {contact.owner && <p><strong>Owner:</strong> {contact.owner}</p>}
                {contact.phone && <p><strong>Phone:</strong> {contact.phone}</p>}
                {contact.altPhone && <p><strong>Alternate Phone:</strong> {contact.altPhone}</p>}
                {contact.email && <p><strong>Email:</strong> {contact.email}</p>}
                {contact.address && <p><strong>Address:</strong> {contact.address}</p>}
              </Section>

              <Section
                title="Media Gallery"
                condition={media.video || gallery.length > 0}
              >
                {media.video && (
                  <div className="mb-4">
                    <p className="font-medium">Promotional Video:</p>
                    <video
                      src={getMediaSrc(media.video)}
                      controls
                      className="w-full rounded-lg border mt-2"
                    />
                  </div>
                )}
                {gallery.length > 0 && (
                  <div>
                    <p className="font-medium mb-2">Photo Gallery:</p>
                    <div className="grid grid-cols-2 gap-2">
                      {gallery.map((img, idx) => (
                        <div key={idx} className="aspect-square overflow-hidden rounded-lg border">
                          <img
                            src={getMediaSrc(img)}
                            alt={`Gallery ${idx + 1}`}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </Section>

              
              {/* Templates */}
              {safeSelectedTemplate === "template1" && (
                <div className="bg-white/70 rounded-lg shadow-sm p-4">
                  <Template1 data={template1Data} />
                </div>
              )}
              {safeSelectedTemplate === "template2" && (
                <div className="bg-white/70 rounded-lg shadow-sm p-4">
                  <Template2 data={template2Data} />
                </div>
              )}
              {safeSelectedTemplate === "template3" && (
                <div className="bg-white/70 rounded-lg shadow-sm p-4">
                  <Template3 data={template3Data} />
                </div>
              )}
              {safeSelectedTemplate === "template4" && (
                <div className="bg-white/70 rounded-lg shadow-sm p-4">
                  <Template4 data={template4Data} />
                </div>
              )}
            </>
          )}
        </div>

        {/* Footer */}
        <div className="relative z-10 border-t border-gray-200 text-center text-xs text-gray-500 py-2 bg-white/90">
          <p>Scan for Business Info</p>
          <p className="mt-1">v1.0.0</p>
        </div>
      </div>
    </div>
  );
};

export default BusinessShopPreview;