'use client'
import React, { useEffect, useState } from 'react';
import { FiUser, FiMessageSquare, FiCalendar } from 'react-icons/fi';

const SmsPreview = ({ data }) => {
  const defaultBg = '/services-service/text-message.webp';
  const isVideo = defaultBg?.endsWith(".mp4") || defaultBg?.endsWith(".webm");
  const isImage = defaultBg && !isVideo;

   const [bgDesign, setBgDesign] = useState(defaultBg);

   useEffect(() => {
    // setIsLoading(true);
  
    if (data?.bgDesign) {
      setBgDesign(data.bgDesign);
    } else {
      setBgDesign(defaultBg);
    }
  }, [data]);

  return (
    <div className='flex justify-center'>
      <div className="rounded-[40px] border-[14px] border-gray-800 shadow-xl w-[350px] h-[600px] overflow-hidden flex flex-col relative">
        
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
            alt="Default Background"
            onLoad={() => setTimeout(() => setIsLoading(false), 300)}
            className="absolute top-0 left-0 w-full h-full object-cover z-0"
          />
        )}

        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-1/3 h-6 bg-gray-800 rounded-b-xl z-10" />

        <div className="flex-1 overflow-y-auto z-20 bg-white/80 pt-8 m-2 rounded-xl pb-4 px-4 w-full">
          {(data?.genderName || data?.messageType || data?.textMessage) ? (
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-center text-[#008080]">SMS QR Code</h2>

              <div className="bg-[#008080]/10 p-3 rounded border border-[#008080]/20 text-black">
                <div className="flex items-center text-[#008080] mb-1">
                  <FiUser className="mr-2" />
                  <span className="font-medium">Recipient</span>
                </div>
                {data.genderName && <p>{data.genderName}</p>}
                {data.messageType && <p>Type: {data.messageType}</p>}
              </div>

              {data.textMessage && (
                <div className="bg-[#008080]/10 p-3 rounded border border-[#008080]/20 text-black">
                  <div className="flex items-center text-[#008080] mb-1">
                    <FiMessageSquare className="mr-2" />
                    <span className="font-medium">Message</span>
                  </div>
                  <p>{data.textMessage}</p>
                </div>
              )}

              {data.date && (
                <div className="bg-gray-100 p-3 rounded text-black">
                  <div className="flex items-center text-gray-700 mb-1">
                    <FiCalendar className="mr-2" />
                    <span className="font-medium">Date</span>
                  </div>
                  <p>{new Date(data.date).toLocaleDateString('en-GB')}</p>
                </div>
              )}
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-center text-gray-400">
              <FiMessageSquare className="text-4xl mb-4 text-[#008080]" />
              <h3 className="text-lg font-medium">SMS QR Preview</h3>
              <p className="mt-2">No data available.</p>
            </div>
          )}
        </div>

        <div className="border-t border-gray-200 text-center text-xs text-gray-500 py-2 relative z-10 bg-white">
          <p>Scan to send SMS</p>
          <p className="mt-1">v1.0.0</p>
        </div>
      </div>
    </div>
  );
};

export default SmsPreview;




// 'use client'

// import React, { useEffect } from 'react'
// import { FiUser, FiMessageSquare, FiCalendar, FiLock } from 'react-icons/fi'
// import useServicesContext from "@/components/hooks/useServiceContext";
// import useDesignContext from '@/components/hooks/useDesignContext';
// import Image from 'next/image';

// const SmsPreview = () => {
//   const { bgDesign, setBgDesign, isLoading, setIsLoading } = useDesignContext();
//   const { smsFormData } = useServicesContext();

//   const hasData = smsFormData.genderName || smsFormData.messageType || smsFormData.textMessage || smsFormData.date;

//   const defaultBg = '/services-service/text-message.jpg'
  
//        useEffect(() => {
//          setIsLoading(true);
//          setBgDesign(defaultBg);
//        }, []);

//  const isVideo = bgDesign?.endsWith(".mp4") || bgDesign?.endsWith(".webm");
//   const isImage = bgDesign && !isVideo;


//   return (
//     <div className='flex justify-center'>
//     <div className=" rounded-[40px] border-[14px] border-gray-800 shadow-xl w-[350px] h-[600px] overflow-hidden flex flex-col relative">

//             {/* 🌆 Background Layer */}
//         {isImage ? (
//           <img
//             src={bgDesign}
//             alt="Background"
//              onLoad={() => setTimeout(() => setIsLoading(false), 300)}
//             className="absolute top-0 left-0 w-full h-full object-cover z-0"
//           />
//         ) : isVideo ? (
//           <video
//             src={bgDesign}
//             autoPlay
//             loop
//             muted
//             playsInline
//                onLoadedData={() => setTimeout(() => setIsLoading(false), 300)}
//             className="absolute top-0 left-0 w-full h-full object-cover z-0"
//           />
//         ) : (
//            <img
//             src={defaultBg}
//             alt="Background"
//                onLoad={() => setTimeout(() => setIsLoading(false), 300)}
//             className="absolute top-0 left-0 w-full h-full object-cover z-0"
//           />
//         )}

//         {/* ⏳ Loader */}
//                 {isLoading && (
//                   <div className="absolute inset-0 z-50 bg-mainGreen backdrop-blur-sm flex justify-center items-center">
//                     <Image
//                       src="/logos/ZM LOGO.webp"
//                       alt="Loading"
//                       width={100}
//                       height={100}
//                       className="w-20 h-20 animate-bounce"
//                     />
//                   </div>
//                 )}

//       {/* iPhone Notch */}
//       <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-1/3 h-6 bg-gray-800 rounded-b-xl z-10" />

//       <div className="flex-1 overflow-y-auto z-20 bg-white/70 pt-8 m-2 rounded-xl pb-4 px-4 w-full ">
//         {hasData ? (
//           <div className="space-y-4">
//             <h2 className="text-xl font-bold text-center text-[#008080]">SMS QR Code</h2>

//             {/* Recipient */}
//             {(smsFormData.genderName || smsFormData.messageType) && (
//               <div className="bg-[#008080]/10 p-3 rounded border border-[#008080]/20 text-black">
//                 <div className="flex items-center text-[#008080] mb-1">
//                   <FiUser className="mr-2" />
//                   <span className="font-medium">Recipient</span>
//                 </div>
//                 {smsFormData.genderName && <p>{smsFormData.genderName}</p>}
//                 {smsFormData.messageType && <p>Type: {smsFormData.messageType}</p>}
//               </div>
//             )}

//             {/* Message */}
//             {smsFormData.textMessage && (
//               <div className="bg-[#008080]/10 p-3 rounded border border-[#008080]/20 text-black">
//                 <div className="flex items-center text-[#008080] mb-1">
//                   <FiMessageSquare className="mr-2" />
//                   <span className="font-medium">Message</span>
//                 </div>
//                 <p>{smsFormData.textMessage}</p>
//               </div>
//             )}

//             {/* Date */}
//             {smsFormData.date && (
//               <div className="bg-gray-100 p-3 rounded text-black">
//                 <div className="flex items-center text-gray-700 mb-1">
//                   <FiCalendar className="mr-2" />
//                   <span className="font-medium">Date</span>
//                 </div>
//                 <p>{new Date(smsFormData.date).toLocaleDateString('en-GB')}</p>
//               </div>
//             )}


//           </div>
//         ) : (
//           <div className="h-full flex flex-col items-center justify-center text-center text-gray-400">
//             <FiMessageSquare className="text-4xl mb-4 text-[#008080]" />
//             <h3 className="text-lg font-medium">SMS QR Preview</h3>
//             <p className="mt-2">Fill the form to see your SMS QR code preview</p>
//           </div>
//         )}
//       </div>

//       {/* Footer */}
//       <div className="border-t border-gray-200 text-center text-xs text-gray-500 py-2 relative z-10 bg-white">
//         <p>Scan to send SMS</p>
//         <p className="mt-1">v1.0.0</p>
//       </div>
//     </div>
//     </div>
//   )
// }

// export default SmsPreview;
