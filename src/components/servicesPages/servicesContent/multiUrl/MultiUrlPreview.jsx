"use client";

import React from "react";
import useServicesContext from "@/components/hooks/useServiceContext";
import { FaYoutube, FaInstagram, FaTwitter, FaLinkedin, FaLink,FaFacebook, } from "react-icons/fa";
import useDesignContext from "@/components/hooks/useDesignContext";

const getPlatformIcon = (platform) => {
  switch (platform) {
    case "youtube":
      return <FaYoutube className="w-5 h-5 text-red-600" />;
    case "instagram":
      return <FaInstagram className="w-5 h-5 text-pink-600" />;
    case "twitter":
      return <FaTwitter className="w-5 h-5 text-blue-400" />;
    case "linkedin":
      return <FaLinkedin className="w-5 h-5 text-blue-700" />;
    case "facebook":
      return <FaFacebook className="w-5 h-5 text-blue-700" />;
    case "custom":
      return <FaLink className="w-5 h-5 text-blue-700" />;
    default:
      return <FaLink className="w-5 h-5 text-gray-600" />;
  }
};

const MultiUrlPreview = () => {
  const { dynamicForms } = useServicesContext();
  const { bgDesign } = useDesignContext();

  const socialLinks = dynamicForms?.multiUrl?.socialLinks || {};
  const isVideo = bgDesign?.endsWith(".mp4");
  const isImage = bgDesign && !isVideo;

  const hasLinks = Object.values(socialLinks).some(Boolean);

  return (
    <div className="flex justify-center">
      <div className="relative w-[350px] h-[570px] rounded-[40px] border-[14px] border-gray-800 shadow-xl overflow-hidden flex flex-col text-gray-800 bg-white">
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
          <div className="absolute inset-0 bg-gradient-to-b from-[#e0f7f7] to-white z-0" />
        )}

        {/* Top Notch */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-1/3 h-6 bg-gray-800 rounded-b-xl z-10" />

        {/* Content */}
        <div className="relative z-10 flex-1 overflow-y-auto no-scrollbar pt-8 pb-4 px-4 space-y-4">
          <h2 className="text-xl font-bold text-center text-[#008080] mb-4">
            Social Links
          </h2>

          {hasLinks ? (
            Object.entries(socialLinks).map(
              ([platform, url]) =>
                url && (
                  <div
                    key={platform}
                    className="flex items-center gap-3 bg-gray-100 px-3 py-2 rounded"
                  >
                    {getPlatformIcon(platform)}
                    <a
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 underline break-all"
                    >
                      {url}
                    </a>
                  </div>
                )
            )
          ) : (
            <div className="text-center text-gray-400 mt-20">
              <p className="text-lg font-medium">No links added</p>
              <p className="text-sm mt-1">Fill the form to see preview</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="relative z-10 border-t border-gray-200 text-center text-xs text-gray-500 py-2 bg-white/70">
          <p>Scan for Links</p>
          <p className="mt-1">v1.0.0</p>
        </div>
      </div>
    </div>
  );
};

export default MultiUrlPreview;






// "use client";

// import React from "react";
// import useServicesContext from "@/components/hooks/useServiceContext";
// import useDesignContext from "@/components/hooks/useDesignContext";
// import {
//   FaYoutube,
//   FaInstagram,
//   FaTwitter,
//   FaLinkedin,
//   FaLink,
// } from "react-icons/fa";

// const linkIcons = {
//   youtube: "/icons/youtube.png",
//   instagram: "/icons/instagram.png",
//   twitter: "/icons/twitter.png",
//   linkedin: "/icons/linkedin.png",
//   custom: "/icons/link.png",
// };

// const MultiUrlPreview = () => {
//   const { dynamicForms } = useServicesContext();
//   const { bgDesign } = useDesignContext();

//   const socialLinks = dynamicForms?.multiUrl?.socialLinks || {};
//   const customLinks = Array.isArray(dynamicForms?.multiUrl?.customLinks)
//     ? dynamicForms.multiUrl.customLinks
//     : [];

//   const isVideo = bgDesign?.endsWith(".mp4");
//   const isImage = bgDesign && !isVideo;

//   const hasLinks =
//     Object.values(socialLinks).some(Boolean) ||
//     customLinks.some((link) => link?.label && link?.url);

//   return (
//     <div className="flex justify-center">
//       <div className="relative w-[350px] h-[570px] rounded-[40px] border-[14px] border-gray-800 shadow-xl overflow-hidden flex flex-col text-gray-800 bg-white">
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
//           <div className="absolute inset-0 bg-gradient-to-b from-[#e0f7f7] to-white z-0" />
//         )}

//         {/* Top notch */}
//         <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-1/3 h-6 bg-gray-800 rounded-b-xl z-10" />

//         {/* Content */}
//         <div className="relative z-10 flex-1 overflow-y-auto no-scrollbar pt-8 pb-4 px-4 space-y-4">
//           <h2 className="text-xl font-bold text-center text-[#008080] mb-4">
//             Social & Custom Links
//           </h2>

//           {hasLinks ? (
//             <>
//               {/* Social Links */}
//               {Object.entries(socialLinks).map(([platform, url]) =>
//                 url ? (
//                   <div
//                     key={platform}
//                     className="flex items-center gap-3 bg-gray-100 px-3 py-2 rounded"
//                   >
//                     <img
//                       src={linkIcons[platform] || linkIcons.custom}
//                       alt={platform}
//                       className="w-5 h-5"
//                     />
//                     <a
//                       href={url}
//                       target="_blank"
//                       rel="noopener noreferrer"
//                       className="text-blue-600 underline break-all"
//                     >
//                       {url}
//                     </a>
//                   </div>
//                 ) : null
//               )}

//               {/* Custom Links */}
//               {customLinks
//                 .filter((link) => link?.label && link?.url)
//                 .map((link, index) => (
//                   <div
//                     key={`custom-${index}`}
//                     className="flex items-center gap-3 bg-gray-100 px-3 py-2 rounded"
//                   >
//                     <img
//                       src={linkIcons.custom}
//                       alt="custom"
//                       className="w-5 h-5"
//                     />
//                     <a
//                       href={link.url}
//                       target="_blank"
//                       rel="noopener noreferrer"
//                       className="text-blue-600 underline break-all"
//                     >
//                       {link.label}: {link.url}
//                     </a>
//                   </div>
//                 ))}
//             </>
//           ) : (
//             <div className="text-center text-gray-400 mt-20">
//               <p className="text-lg font-medium">No links added</p>
//               <p className="text-sm mt-1">Fill the form to see preview</p>
//             </div>
//           )}
//         </div>

//         {/* Footer */}
//         <div className="relative z-10 border-t border-gray-200 text-center text-xs text-gray-500 py-2 bg-white/70">
//           <p>Scan for Links</p>
//           <p className="mt-1">v1.0.0</p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MultiUrlPreview;
