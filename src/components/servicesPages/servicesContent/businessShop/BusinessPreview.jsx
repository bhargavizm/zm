// // src/components/BusinessPreview.jsx
// 'use client';

// import React from 'react';
// import useServicesContext from '@/components/hooks/useServiceContext';
// import Template1 from '@/components/servicesPages/servicesContent/businessShop/templates/Template1';
// import Template2 from '@/components/servicesPages/servicesContent/businessShop/templates/Template2';
// import Template3 from '@/components/servicesPages/servicesContent/businessShop/templates/Template3';
// import useDesignContext from '@/components/hooks/useDesignContext';

// const Section = ({ title, children, condition }) => {
//   if (!condition) return null;
//   return (
//     <div className="mb-6 pb-2 border-b border-gray-200 last:border-b-0 last:pb-0">
//       <h2 className="text-lg font-bold text-gray-800 mb-3">{title}</h2>
//       <div className="space-y-1.5 text-gray-700 text-sm">
//         {children}
//       </div>
//     <div className="mb-6">
//       <h2 className="text-xl font-semibold mb-2 text-[#008080]">{title}</h2>
//       {children}
//     </div>
//   );
// };

// const BusinessPreview = () => {
//   const { dynamicForms } = useServicesContext();

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
//     selectedTemplate = "none",
//     template1Data = { days: [] },
//     template2Data = {},
//     template3Data={},
//   } = shopTimingsTemplate;

//   const hasData =
//     general?.businessName || general?.businessType || general?.description || general?.establishedDate || general?.shopTimings ||
//     contact?.phone || contact?.email || contact?.address ||
//     media?.logo || media?.video || (media?.galleryImages?.length > 0) ||
//     security?.password ||
//     selectedTemplate !== "none";

//   if (!hasData) {
//     return (
//       <div className="flex justify-center items-center h-48 text-gray-500 text-lg font-medium">
//         Start entering business details to see a live preview!
//       </div>
//     );
//   }
//   const { bgDesign } = useDesignContext();
//   const businessInfo = dynamicForms.businessInfo;
//   const { general, contact, media, security } = businessInfo;

//   const isVideo = bgDesign?.endsWith('.mp4');
//   const isImage = bgDesign && !isVideo;

//   return (
//     <div className="flex justify-center items-center mt-10">
//       <div className="relative bg-gradient-to-br from-gray-900 to-gray-800 p-3 rounded-[3rem] w-[390px] h-[640px] shadow-2xl border-4 border-gray-700 overflow-y-auto">
//         {/* iPhone Notch */}
//         <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-gray-900 rounded-b-xl z-20 flex items-center justify-center space-x-1">
//           <div className="w-1.5 h-1.5 bg-gray-600 rounded-full"></div>
//           <div className="w-12 h-3 bg-gray-700 rounded-full"></div>
//         </div>

//         {/* iPhone Screen */}
//         <div className="bg-white h-full w-full rounded-[2.5rem] overflow-hidden flex flex-col">
//           {/* Status Bar */}
//           <div className="flex justify-between items-center px-6 pt-4 text-xs font-semibold text-gray-700">
//             <span>9:41</span>
//             <div className="flex items-center space-x-1">
//               <span>🔋</span>
//               <span>📶</span>
//               <span>5G</span>
//             </div>
//           </div>

//           {/* Scrollable Content */}
//           <div className="flex-grow w-full overflow-y-scroll hide-scrollbar p-6 pt-2 text-gray-800">
//             <div className="space-y-6">

//               {/* Templates */}
//               {selectedTemplate === "template1" && <Template1 data={template1Data} />}
//               {selectedTemplate === "template2" && <Template2 data={template2Data} />}
//               {selectedTemplate === "template3" && <Template3 data={template3Data} />}

//               {/* Business Info */}
//               <Section title="Business Information" condition={
//                 general?.businessName || general?.businessType || general?.description || general?.establishedDate || general?.shopTimings
//               }>
//                 {general?.businessName && <p><strong>Name:</strong> <span className="font-normal">{general.businessName}</span></p>}
//                 {general?.businessType && <p><strong>Type:</strong> <span className="font-normal">{general.businessType}</span></p>}
//                 {general?.description && <p className="text-sm italic">{general.description}</p>}
//                 {general?.establishedDate && <p><strong>Established:</strong> <span className="font-normal">{general.establishedDate}</span></p>}
//                 {general?.shopTimings && <p><strong>Timings:</strong> <span className="font-normal">{general.shopTimings}</span></p>}
//               </Section>

//               {/* Contact Info */}
//               <Section title="Contact Information" condition={
//                 contact?.phone || contact?.email || contact?.address
//               }>
//                 {contact?.phone && <p><strong>Phone:</strong> <span className="font-normal">{contact.phone}</span></p>}
//                 {contact?.email && <p><strong>Email:</strong> <span className="font-normal">{contact.email}</span></p>}
//                 {contact?.address && <p><strong>Address:</strong> <span className="font-normal">{contact.address}</span></p>}
//               </Section>

//               {/* Media Section */}
//               <Section title="Media" condition={
//                 media?.logo || media?.video || (media?.galleryImages?.length > 0)
//               }>
//                 {media?.logo && (
//                   <div className="mb-4">
//                     <p className="font-medium text-gray-800 mb-2">Logo:</p>
//                     <img
//                       src={URL.createObjectURL(media.logo)}
//                       alt="Business Logo"
//                       className="w-28 h-28 object-contain rounded-lg border border-gray-200 shadow-sm"
//                     />
//                   </div>
//                 )}
//                 {media?.video && (
//                   <div className="mb-4">
//                     <p className="font-medium text-gray-800 mb-2">Video:</p>
//                     <video
//                       src={URL.createObjectURL(media.video)}
//                       controls
//                       className="w-full max-w-xs rounded-lg border border-gray-200 shadow-sm bg-black"
//                     >
//                       Your browser does not support the video tag.
//                     </video>
//                   </div>
//                 )}
//                 {media?.galleryImages?.length > 0 && (
//                   <div>
//                     <p className="font-medium text-gray-800 mb-2">Gallery:</p>
//                     <div className="grid grid-cols-2 gap-3">
//                       {media.galleryImages.map((img, idx) => (
//                         <img
//                           key={idx}
//                           src={URL.createObjectURL(img)}
//                           alt={`Gallery Image ${idx + 1}`}
//                           className="w-full h-28 object-cover rounded-lg border border-gray-200 shadow-sm"
//                         />
//                       ))}
//                     </div>
//                   </div>
//                 )}
//               </Section>

//             </div>
//           </div>
//         </div>
//     <div className="relative w-[350px] h-[570px] rounded-[40px] border-[14px] border-gray-800 shadow-xl overflow-hidden flex flex-col text-gray-800 bg-white">
      
//       {/* Background layer */}
//       {isImage && (
//         <img
//           src={bgDesign}
//           alt="Background"
//           className="absolute inset-0 w-full h-full object-cover z-0"
//         />
//       )}
//       {isVideo && (
//         <video
//           src={bgDesign}
//           autoPlay
//           loop
//           muted
//           playsInline
//           className="absolute inset-0 w-full h-full object-cover z-0"
//         />
//       )}
//       {!bgDesign && (
//         <div className="absolute inset-0 bg-gradient-to-b from-[#d1f0f0] to-white z-0" />
//       )}

//       {/* Overlay for readability */}
//       {/* <div className="absolute inset-0 bg-white/80 backdrop-blur-sm z-0" /> */}

//       {/* Top Bar */}
//       <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-1/3 h-6 bg-gray-800 rounded-b-xl z-10" />

//       {/* Content */}
//       <div className="relative z-10 flex-1 overflow-y-auto no-scrollbar pt-8 pb-4 px-4">
//         <h2 className="text-center text-xl font-bold mb-4 text-[#008080]">Business Profile</h2>

//         <Section
//           title="Business Info"
//           condition={
//             general.businessName ||
//             general.businessType ||
//             general.description ||
//             general.establishedDate ||
//             general.shopTimings
//           }
//         >
//           {general.businessName && <p><strong>Name:</strong> {general.businessName}</p>}
//           {general.businessType && <p><strong>Type:</strong> {general.businessType}</p>}
//           {general.description && <p><strong>Description:</strong> {general.description}</p>}
//           {general.establishedDate && <p><strong>Established:</strong> {general.establishedDate}</p>}
//           {general.shopTimings && <p><strong>Timings:</strong> {general.shopTimings}</p>}
//         </Section>

//         <Section
//           title="Contact Info"
//           condition={contact.phone || contact.email || contact.address}
//         >
//           {contact.phone && <p><strong>Phone:</strong> {contact.phone}</p>}
//           {contact.email && <p><strong>Email:</strong> {contact.email}</p>}
//           {contact.address && <p><strong>Address:</strong> {contact.address}</p>}
//         </Section>

//         <Section
//           title="Media"
//           condition={media.logo || media.video || (media.galleryImages?.length > 0)}
//         >
//           {media.logo && (
//             <div className="mb-2">
//               <p className="font-medium">Logo:</p>
//               <img
//                 src={URL.createObjectURL(media.logo)}
//                 alt="Logo"
//                 className="w-20 h-20 object-cover rounded border"
//               />
//             </div>
//           )}
//           {media.video && (
//             <div className="mb-2">
//               <p className="font-medium">Video:</p>
//               <video
//                 src={URL.createObjectURL(media.video)}
//                 controls
//                 className="w-full rounded border"
//               />
//             </div>
//           )}
//           {media.galleryImages?.length > 0 && (
//             <div>
//               <p className="font-medium mb-1">Gallery:</p>
//               <div className="grid grid-cols-2 gap-2">
//                 {media.galleryImages.map((img, idx) => (
//                   <img
//                     key={idx}
//                     src={URL.createObjectURL(img)}
//                     alt={`Gallery ${idx + 1}`}
//                     className="w-full h-20 object-cover border rounded"
//                   />
//                 ))}
//               </div>
//             </div>
//           )}
//         </Section>

//         <Section title="Security" condition={security.password}>
//           <p><strong>Password:</strong> ********</p>
//         </Section>
//       </div>

//       {/* Footer */}
//       <div className="relative z-10 border-t border-gray-200 text-center text-xs text-gray-500 py-2 bg-white/70">
//         <p>Scan for Business Info</p>
//         <p className="mt-1">v1.0.0</p>
//       </div>
//     </div>
//   );
// };

// export default BusinessPreview;
'use client';

import React from 'react';
import useServicesContext from '@/components/hooks/useServiceContext';
import Template1 from '@/components/servicesPages/servicesContent/businessShop/templates/Template1';
import Template2 from '@/components/servicesPages/servicesContent/businessShop/templates/Template2';
import Template3 from '@/components/servicesPages/servicesContent/businessShop/templates/Template3';
import useDesignContext from '@/components/hooks/useDesignContext';

const Section = ({ title, children, condition }) => {
  if (!condition) return null;
  return (
    <div className="mb-6 pb-2 border-b border-gray-200 last:border-b-0 last:pb-0">
      <h2 className="text-lg font-bold text-gray-800 mb-3">{title}</h2>
      <div className="space-y-1.5 text-gray-700 text-sm">
        {children}
      </div>
    </div>
  );
};

const BusinessPreview = () => {
  const { dynamicForms } = useServicesContext();
  const { bgDesign } = useDesignContext();

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
    selectedTemplate = "none",
    template1Data = { days: [] },
    template2Data = {},
    template3Data = {},
  } = shopTimingsTemplate;

  const hasData =
    general?.businessName || general?.businessType || general?.description || general?.establishedDate || general?.shopTimings ||
    contact?.phone || contact?.email || contact?.address ||
    media?.logo || media?.video || (media?.galleryImages?.length > 0) ||
    security?.password ||
    selectedTemplate !== "none";

  if (!hasData) {
    return (
      <div className="flex justify-center items-center h-48 text-gray-500 text-lg font-medium">
        Start entering business details to see a live preview!
      </div>
    );
  }

  const isVideo = bgDesign?.endsWith('.mp4');
  const isImage = bgDesign && !isVideo;

  return (
    <div className="flex justify-center items-center mt-10">
      <div className="relative w-[350px] h-[570px] rounded-[40px] border-[14px] border-gray-800 shadow-xl overflow-hidden flex flex-col text-gray-800 bg-white">
        
        {/* Background Layer */}
        {isImage && (
          <img src={bgDesign} alt="Background" className="absolute inset-0 w-full h-full object-cover z-0" />
        )}
        {isVideo && (
          <video src={bgDesign} autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover z-0" />
        )}
        {!bgDesign && (
          <div className="absolute inset-0 bg-gradient-to-b from-[#d1f0f0] to-white z-0" />
        )}

        {/* Top Notch */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-1/3 h-6 bg-gray-800 rounded-b-xl z-10" />

        {/* Main Content */}
        <div className="relative z-10 flex-1 overflow-y-auto no-scrollbar pt-8 pb-4 px-4">
          <h2 className="text-center text-xl font-bold mb-4 text-[#008080]">Business Profile</h2>

          {/* Templates */}
          {selectedTemplate === "template1" && <Template1 data={template1Data} />}
          {selectedTemplate === "template2" && <Template2 data={template2Data} />}
          {selectedTemplate === "template3" && <Template3 data={template3Data} />}

          {/* Sections */}
          <Section title="Business Info" condition={
            general.businessName || general.businessType || general.description || general.establishedDate || general.shopTimings
          }>
            {general.businessName && <p><strong>Name:</strong> {general.businessName}</p>}
            {general.businessType && <p><strong>Type:</strong> {general.businessType}</p>}
            {general.description && <p><strong>Description:</strong> {general.description}</p>}
            {general.establishedDate && <p><strong>Established:</strong> {general.establishedDate}</p>}
            {general.shopTimings && <p><strong>Timings:</strong> {general.shopTimings}</p>}
          </Section>

          <Section title="Contact Info" condition={
            contact.phone || contact.email || contact.address
          }>
            {contact.phone && <p><strong>Phone:</strong> {contact.phone}</p>}
            {contact.email && <p><strong>Email:</strong> {contact.email}</p>}
            {contact.address && <p><strong>Address:</strong> {contact.address}</p>}
          </Section>

          <Section title="Media" condition={
            media.logo || media.video || (media.galleryImages?.length > 0)
          }>
            {media.logo && (
              <div className="mb-2">
                <p className="font-medium">Logo:</p>
                <img src={URL.createObjectURL(media.logo)} alt="Logo" className="w-20 h-20 object-cover rounded border" />
              </div>
            )}
            {media.video && (
              <div className="mb-2">
                <p className="font-medium">Video:</p>
                <video src={URL.createObjectURL(media.video)} controls className="w-full rounded border" />
              </div>
            )}
            {media.galleryImages?.length > 0 && (
              <div>
                <p className="font-medium mb-1">Gallery:</p>
                <div className="grid grid-cols-2 gap-2">
                  {media.galleryImages.map((img, idx) => (
                    <img
                      key={idx}
                      src={URL.createObjectURL(img)}
                      alt={`Gallery ${idx + 1}`}
                      className="w-full h-20 object-cover border rounded"
                    />
                  ))}
                </div>
              </div>
            )}
          </Section>

          <Section title="Security" condition={security.password}>
            <p><strong>Password:</strong> ********</p>
          </Section>
        </div>

        {/* Footer */}
        <div className="relative z-10 border-t border-gray-200 text-center text-xs text-gray-500 py-2 bg-white/70">
          <p>Scan for Business Info</p>
          <p className="mt-1">v1.0.0</p>
        </div>
      </div>
    </div>
  );
};

export default BusinessPreview;

