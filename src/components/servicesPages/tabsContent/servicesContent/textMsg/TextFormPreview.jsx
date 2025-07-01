// 'use client';

// import React from 'react';
// import { FiUser, FiMessageSquare } from 'react-icons/fi';
// import useServicesContext from '@/components/hooks/useServiceContext';
// import useDesignContext from '@/components/hooks/useDesignContext';

// const TextMessagePreview = () => {
//   const { textMessageForm } = useServicesContext();
//   const { bgDesign } = useDesignContext();

//   const hasData = textMessageForm.sender || textMessageForm.message;
//   const isVideo = bgDesign?.endsWith('.mp4');
//   const isImage = bgDesign && !isVideo;

//   return (
//     <div className='flex justify-center'>
//     <div className="relative w-[350px] h-[650px] border-[14px] border-gray-800 rounded-[40px] shadow-xl overflow-hidden flex flex-col">

//       {/* 🔳 Background layer */}
//       {isImage ? (
//         <img
//           src={bgDesign}
//           alt="Background"
//           className="absolute top-0 left-0 w-full h-full object-cover z-0"
//         />
//       ) : isVideo ? (
//         <video
//           src={bgDesign}
//           autoPlay
//           loop
//           muted
//           playsInline
//           className="absolute top-0 left-0 w-full h-full object-cover z-0"
//         />
//       ) : (
//         <img
//           src='/services-service/text-message.jpg'
//           alt="Background"
//           className="absolute top-0 left-0 w-full h-full object-cover z-0"
//         />
//       )}

//       {/* 🔳 White overlay */}
//       {/* <div className="absolute inset-0 bg-white/90 backdrop-blur-sm z-10" /> */}

//       {/* ⬛ Notch */}
//       <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-1/3 h-6 bg-gray-800 rounded-b-xl z-20" />

//       {/* 🧾 Main Content */}
//       <div className="relative flex-1 bg-white/70 m-2 rounded-xl overflow-y-auto pt-8 pb-4 px-4 z-20">
//         {hasData ? (
//           <div className="space-y-4">
//             <h2 className="text-xl font-bold text-center text-[#008080]">Text Message Preview</h2>

//             {textMessageForm.sender && (
//               <div className="bg-[#008080]/10 p-3 rounded border border-[#008080]/20">
//                 <div className="flex items-center text-[#008080] mb-1">
//                   <FiUser className="mr-2" />
//                   <span className="font-medium">Sender</span>
//                 </div>
//                 <p>{textMessageForm.sender}</p>
//               </div>
//             )}

//             {textMessageForm.message && (
//               <div className="bg-[#008080]/10 p-3 rounded border border-[#008080]/20">
//                 <div className="flex items-center text-[#008080] mb-1">
//                   <FiMessageSquare className="mr-2" />
//                   <span className="font-medium">Message</span>
//                 </div>
//                 <p>{textMessageForm.message}</p>
//               </div>
//             )}
//           </div>
//         ) : (
//           <div className="h-full flex flex-col items-center justify-center text-center text-gray-400">
//             <FiMessageSquare className="text-4xl mb-4 text-[#008080]" />
//             <h3 className="text-lg font-medium">Text Message Preview</h3>
//             <p className="mt-2">Fill the form to see your preview</p>
//           </div>
//         )}
//       </div>

//       {/* 📎 Footer */}
//       <div className="relative z-20 border-t border-gray-200 text-center text-xs text-gray-500 py-2 bg-white/80 backdrop-blur">
//         <p>Scan to read message</p>
//         <p className="mt-1">v1.0.0</p>
//       </div>
//     </div>
//     </div>
//   );
// };

// export default TextMessagePreview;

"use client";

import React, { useEffect } from "react";
import { FiUser, FiMessageSquare } from "react-icons/fi";
import useServicesContext from "@/components/hooks/useServiceContext";
import useDesignContext from "@/components/hooks/useDesignContext";
import Image from "next/image";

const TextMessagePreview = () => {
  const { textMessageForm } = useServicesContext();
  const { bgDesign, setBgDesign, isLoading, setIsLoading } = useDesignContext();

  const defaultBg = "/services-service/text-message.webp";

  useEffect(() => {
    setIsLoading(true);
    setBgDesign(defaultBg);
  }, []);

  const hasData = textMessageForm.sender || textMessageForm.message;
  const isVideo = bgDesign?.endsWith(".mp4") || bgDesign?.endsWith(".webm");
  const isImage = bgDesign && !isVideo;

  return (
    <div className="flex justify-center">
      <div className="relative w-[350px] h-[650px] border-[14px] border-gray-800 rounded-[40px] shadow-xl overflow-hidden flex flex-col">
        {/* 🔳 Background Layer */}
        {isImage ? (
          <img
            src={bgDesign}
            alt="Background"
            onLoad={() => setTimeout(() => setIsLoading(false), 300)}
            className="absolute top-0 left-0 w-full h-full object-cover z-0"
          />
        ) : isVideo ? (
          <video
            src={bgDesign}
            autoPlay
            loop
            muted
            playsInline
            onLoadedData={() => setTimeout(() => setIsLoading(false), 300)}
            className="absolute top-0 left-0 w-full h-full object-cover z-0"
          />
        ) : (
          <img
            src={defaultBg}
            alt="Background"
            onLoad={() => setTimeout(() => setIsLoading(false), 300)}
            className="absolute top-0 left-0 w-full h-full object-cover z-0"
          />
        )}

        {/* ⏳ Loader */}
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

        {/* 🔳 Notch */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-1/3 h-6 bg-gray-800 rounded-b-xl z-20" />

        {/* 🧾 Main Content Area */}
        <div className="relative flex-1 bg-white/70 m-2 rounded-xl overflow-y-auto pt-6 pb-3 px-3 z-20 max-h-full">
          {hasData ? (
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-center text-[#008080]">
                Text Message Preview
              </h2>

              {textMessageForm.sender && (
                <div className="bg-[#008080]/10 p-3 rounded border border-[#008080]/20">
                  <div className="flex items-center text-[#008080] mb-1">
                    <FiUser className="mr-2" />
                    <span className="font-medium">Sender</span>
                  </div>
                  <p className="break-words max-w-full whitespace-pre-wrap">
                    {textMessageForm.sender}
                  </p>
                </div>
              )}

              {textMessageForm.message && (
                <div className="bg-[#008080]/10 p-3 rounded border border-[#008080]/20">
                  <div className="flex items-center text-[#008080] mb-1">
                    <FiMessageSquare className="mr-2" />
                    <span className="font-medium">Message</span>
                  </div>
                  <p className="break-words max-w-full whitespace-pre-wrap">
                    {textMessageForm.message}
                  </p>
                </div>
              )}
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-center text-gray-400">
              <FiMessageSquare className="text-4xl mb-4 text-[#008080]" />
              <h3 className="text-lg font-medium">Text Message Preview</h3>
              <p className="mt-2">Fill the form to see your preview</p>
            </div>
          )}
        </div>

        {/* 📎 Footer */}
        <div className="relative z-20 border-t border-gray-200 text-center text-xs text-gray-500 py-2 bg-white/80 backdrop-blur">
          <p>Scan to read message</p>
          <p className="mt-1">v1.0.0</p>
        </div>
      </div>
    </div>
  );
};

export default TextMessagePreview;
