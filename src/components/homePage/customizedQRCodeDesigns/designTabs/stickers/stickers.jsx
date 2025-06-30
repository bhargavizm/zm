"use client";

import useDesignContext from "@/components/hooks/useDesignContext";
import usePremiumContext from "@/components/hooks/usePremiumContext";
import PremiumModal from "@/components/modalPopUps/premiumServicesModal";
import Image from "next/image";
import React, { useRef, useEffect } from "react";
import { stickerConfig } from "./stickerImages";

const Stickers = () => {
  const { selectedSticker, setSelectedSticker } = useDesignContext();
  const {
    premiumEnabled,
    setPremiumEnabled,
    showPremiumModal,
    setShowPremiumModal,
  } = usePremiumContext();

  const containerRef = useRef(null);

  useEffect(() => {
    const scroll = localStorage.getItem("stickersScroll");
    if (containerRef.current && scroll) {
      containerRef.current.scrollTop = parseInt(scroll, 10);
    }
  }, []);

  const handleScroll = (e) => {
    localStorage.setItem("stickersScroll", e.target.scrollTop);
  };

  const stickerKeys = Object.keys(stickerConfig);
  const freeStickers = stickerKeys.slice(0, 7);
  const premiumStickers = stickerKeys.slice(7);

  const handleClick = (src, isPremium) => {
    if (isPremium && !premiumEnabled) {
      setShowPremiumModal(true);
    } else {
      setSelectedSticker(src);
      localStorage.setItem("selectedSticker", src);
    }
  };

  const handleToggle = () => {
    if (!premiumEnabled) {
      setShowPremiumModal(true);
    } else {
      setPremiumEnabled(false); // allow toggling off
    }
  };

  return (
    <section className="mt-4 px-4">
      <PremiumModal />

      {/* Row 1: Free Stickers */}
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-7 gap-5 pr-2 mb-6">
        {freeStickers.map((src, index) => {
          const isSelected = selectedSticker === src;

          return (
            <div
              key={index}
              onClick={() => handleClick(src, false)}
              className={`relative aspect-square flex items-center justify-center rounded-xl border-4 cursor-pointer transition-transform duration-200 ${
                isSelected
                  ? "border-mainGreen scale-105 shadow-md"
                  : "border-transparent hover:border-gray-300"
              }`}
            >
              <Image
                src={src}
                alt={`Sticker ${index + 1}`}
                width={60}
                height={60}
                className="object-contain w-16 h-16"
              />
            </div>
          );
        })}
      </div>

      {/* Row 2: Premium Toggle Button (Centered) */}
      <div className="flex justify-center mb-6">
        <div className="flex items-center gap-3">
          <span className="text-sm font-medium text-gray-700">Premium</span>
          <button
            type="button"
            onClick={handleToggle}
            className={`relative inline-flex h-7 w-14 items-center rounded-full transition-colors duration-300 ${
              premiumEnabled ? "bg-[#008080]" : "bg-gray-300"
            }`}
          >
            <span
              className={`absolute left-1 top-1 h-5 w-5 rounded-full bg-white shadow-md transition-all duration-300 ${
                premiumEnabled ? "translate-x-7" : "translate-x-0"
              }`}
            />
          </button>
        </div>
      </div>

      {/* Row 3+: Premium Stickers */}
      <div
        ref={containerRef}
        onScroll={handleScroll}
        className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-7 gap-5 pr-2"
      >
        {premiumStickers.map((src, index) => {
          const isSelected = selectedSticker === src;

          return (
            <div
              key={index}
              onClick={() => handleClick(src, true)}
              className={`relative aspect-square flex items-center justify-center rounded-xl border-4 cursor-pointer transition-transform duration-200 ${
                isSelected
                  ? "border-mainGreen scale-105 shadow-md"
                  : "border-transparent hover:border-gray-300"
              }`}
            >
              <Image
                src={src}
                alt={`Premium Sticker ${index + 8}`}
                width={60}
                height={60}
                className={`object-contain w-16 h-16 ${
                  !premiumEnabled ? "opacity-70 blur-[1px]" : ""
                }`}
              />
              {!premiumEnabled && (
                <span className="absolute bottom-1 right-1 bg-mainGreen text-white text-[10px] px-1.5 py-0.5 rounded shadow-sm">
                  Premium
                </span>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Stickers;

// // import Image from 'next/image';
// // import React from 'react'
// // import { stickers } from './stickerImages';

// // const Stickers = ({ onSelectImage }) => {

// //   return (

// //         <section className="mt-6">
// //              <div className="grid lg:grid-cols-8 md:grid-cols-6 sm:grid-cols-4 grid-cols-3 gap-6 h-[70vh] overflow-y-auto scrollbar-hide" >
// //                {stickers.map((src, index) => (
// //                  <Image
// //                    key={index}
// //                    src={src}
// //                    alt={`qr shape ${index + 1}`}
// //                    width={60}
// //                    height={60}
// //                    className="cursor-pointer hover:scale-110 transition-transform"
// //                    onClick={() => onSelectImage(src)}
// //                    priority
// //                  />
// //                ))}
// //              </div>

// //            </section>

// //   )
// // }

// // export default Stickers

// "use client";

// import Image from "next/image";
// import React, { useEffect, useRef } from "react";
// import { stickerConfig } from "./stickerImages";
// import useDesignContext from "@/components/hooks/useDesignContext";

// const Stickers = ({ onSelectImage }) => {
//   const { selectedSticker, setSelectedSticker } = useDesignContext();
//   const containerRef = useRef(null);

//   // Restore scroll position on mount
//   useEffect(() => {
//     const savedScroll = localStorage.getItem("stickersScroll");
//     if (containerRef.current && savedScroll) {
//       containerRef.current.scrollTop = parseInt(savedScroll, 100);
//     }
//   }, []);

//   // Save scroll position on scroll
//   const handleScroll = (e) => {
//     localStorage.setItem("stickersScroll", e.target.scrollTop);
//   };

//   const handleClick = (src) => {
//     setSelectedSticker(src);
//     localStorage.setItem("selectedSticker", src); // persist selection
//     onSelectImage(src);
//   };

//   return (
//     <section className="mt-4 px-4">
//       <div
//         ref={containerRef}
//         onScroll={handleScroll}
//         className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-7 gap-5 pr-2"
//       >
//         {Object.keys(stickerConfig).map((src, index) => (
//           <div
//             key={index}
//             onClick={(e) => {
//               e.preventDefault();
//               e.stopPropagation();
//               handleClick(src);
//             }}
//             className={`aspect-square flex items-center justify-center rounded-xl border-4 cursor-pointer transition-transform duration-200 ${
//               selectedSticker === src
//                 ? "border-mainGreen scale-105 shadow-md"
//                 : "border-transparent hover:border-gray-300"
//             }`}
//           >
//             <Image
//               src={src}
//               alt={`sticker ${index + 1}`}
//               width={60}
//               height={60}
//               className="object-contain w-16 h-16"
//               priority
//             />
//           </div>
//         ))}
//       </div>
//     </section>
//   );
// };

// export default Stickers;
