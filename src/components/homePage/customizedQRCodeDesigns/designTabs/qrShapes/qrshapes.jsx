"use client";

import React, { useRef, useEffect } from "react";
import Image from "next/image";
import { qrShapeConfig } from "./qrShapeImages";
import useDesignContext from "@/components/hooks/useDesignContext";
import usePremiumContext from "@/components/hooks/usePremiumContext";
import PremiumModal from "@/components/modalPopUps/premiumServicesModal";

const QRShapes = () => {
  const { selectedQRShape, setSelectedQRShape } = useDesignContext();
  const {
    premiumEnabled,
    setPremiumEnabled,
    showPremiumModal,
    setShowPremiumModal,
  } = usePremiumContext();

  const ref = useRef();

  useEffect(() => {
    const scroll = localStorage.getItem("qrShapesScroll");
    if (ref.current && scroll) ref.current.scrollTop = parseInt(scroll, 10);
  }, []);

  const shapeKeys = Object.keys(qrShapeConfig);
  const freeShapes = shapeKeys.slice(0, 7);
  const premiumShapes = shapeKeys.slice(7);

  const handleClick = (src, isPremium) => {
    if (isPremium && !premiumEnabled) {
      setShowPremiumModal(true);
    } else {
      setSelectedQRShape(src);
      localStorage.setItem("selectedQRShape", src);
    }
  };

  const handleToggle = () => {
    if (!premiumEnabled) {
      setShowPremiumModal(true);
    } else {
      setPremiumEnabled(false);
    }
  };

  return (
    <section className="mt-4 px-4">
      <PremiumModal />

      {/* Row 1: Free Shapes */}
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-7 gap-5 pr-2 mb-6">
        {freeShapes.map((src, index) => {
          const isSelected = selectedQRShape === src;

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
                alt={`QR Shape ${index + 1}`}
                width={64}
                height={64}
                className="object-contain w-full h-full"
              />
            </div>
          );
        })}
      </div>

      {/* Row 2: Centered Premium Toggle */}
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

      {/* Row 3+: Premium Shapes */}
      <div
        ref={ref}
        className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-7 gap-5 pr-2"
      >
        {premiumShapes.map((src, index) => {
          const isSelected = selectedQRShape === src;

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
                alt={`Premium Shape ${index + 6}`}
                width={64}
                height={64}
                className={`object-contain w-full h-full ${
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

export default QRShapes;



// 'use client';

// import useDesignContext from "@/components/hooks/useDesignContext";
// import React, { useEffect, useRef } from "react";
// import { images } from "./qrShapeImages";
// import Image from "next/image";

// const QRShapes = ({ onSelectImage }) => {
//   const { selectedQRShape, setSelectedQRShape } = useDesignContext();
//   const containerRef = useRef(null);

//   // On mount, restore scroll
//   useEffect(() => {
//     const savedScroll = localStorage.getItem("qrShapesScroll");
//     if (containerRef.current && savedScroll) {
//       containerRef.current.scrollTop = parseInt(savedScroll, 10);
//     }
//   }, []);

//   // On scroll, save position
//   const handleScroll = (e) => {
//     localStorage.setItem("qrShapesScroll", e.target.scrollTop);
//   };

//   const handleClick = (src) => {
//     setSelectedQRShape(src);
//     localStorage.setItem("selectedQRShape", src);
//     onSelectImage(src);
//   };

//   return (
//     <section className="mt-4 px-4">
//       <div
//         ref={containerRef}
//         onScroll={handleScroll}
//         className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-7 gap-5 pr-2" // Add height
//       >
//         {images.map((src, index) => (
//           <div
//             key={index}
//             onClick={() => handleClick(src)}
//             className={`w-full aspect-square flex items-center justify-center rounded-xl border-4 cursor-pointer transition-transform duration-200 ${
//               selectedQRShape === src
//                 ? "border-mainGreen scale-105 shadow-md"
//                 : "border-transparent hover:border-gray-300"
//             }`}
//           >
//             <Image
//               src={src}
//               alt={`qr shape ${index + 1}`}
//               width={72}
//               height={72}
//               className="object-contain w-14 h-14"
//               priority
//             />
//           </div>
//         ))}
//       </div>
//     </section>
//   );
// };
// export default QRShapes;