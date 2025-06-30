"use client";
import useDesignContext from "@/components/hooks/useDesignContext";
import Image from "next/image";
import React, { useRef, useEffect } from "react";
import { logos } from "./logoImages";


const Logos = () => {
  const { selectedLogo, setSelectedLogo } = useDesignContext();
  const ref = useRef(null);

  useEffect(() => {
    const scroll = localStorage.getItem("logosScroll");
    if (ref.current && scroll) {
      ref.current.scrollTop = parseInt(scroll, 10);
    }
  }, []);

  const handleClick = (src) => {
    setSelectedLogo(src);
    localStorage.setItem("selectedLogo", src);
  };

  return (
    <section className="mt-4 px-4">
      <div
        ref={ref}
         className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-7 gap-5 pr-2"
      >
        {logos.map((src, i) => (
          <Image
            key={i}
            src={src}
            alt={`Logo ${i + 1}`}
            width={60}
            height={60}
             className={`w-full aspect-square flex items-center justify-center rounded-xl border-4 cursor-pointer transition-transform duration-200 ${
              selectedLogo === src
                ? "border-mainGreen scale-105 shadow-md"
                : "border-transparent hover:border-gray-300"
            }`}
            // onClick={() => handleClick(src)}
          />
        ))}
      </div>
    </section>
  );
};

export default Logos;
// "use client";

// import useDesignContext from "@/components/hooks/useDesignContext";
// import Image from "next/image";
// import React, { useState, useEffect, useRef } from "react";
// import { logos } from "./logoImages";

// const Logos = ({ onSelectImage }) => {
//   const { logoSize, setLogoSize, selectedLogo, setSelectedLogo } = useDesignContext();
//   const [showWarning, setShowWarning] = useState(false);
//   const containerRef = useRef(null);

//   const scrollKey = `logosScroll_${window.innerWidth}`;

//   // Restore scroll on mount
//   useEffect(() => {
//     const restoreScroll = () => {
//       const saved = localStorage.getItem(scrollKey);
//       if (containerRef.current && saved) {
//         containerRef.current.scrollTop = parseInt(saved, 10);
//       }
//     };
//     requestAnimationFrame(restoreScroll); // Wait for layout to be stable
//   }, [scrollKey]);

//   // Save scroll position
//   const handleScroll = (e) => {
//     localStorage.setItem(scrollKey, e.target.scrollTop);
//   };

//   // Logo size warning
//   useEffect(() => {
//     setShowWarning(logoSize > 47);
//   }, [logoSize]);

//   const handleSliderChange = (e) => {
//     const value = parseInt(e.target.value);
//     setLogoSize(value);
//     localStorage.setItem("logoSize", value);
//   };

//   const handleReset = () => {
//     setLogoSize(45);
//     localStorage.setItem("logoSize", 45);
//   };

//   const handleClick = (src) => {
//     setSelectedLogo(src);
//     localStorage.setItem("selectedLogo", src);
//     onSelectImage(src);
//   };

//   return (
//     <section className="mt-4 px-4">
//       <div
//         ref={containerRef}
//         onScroll={handleScroll}
//         className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-7 gap-5 pr-2"
//       >
//         {logos.map((src, index) => (
//           <Image
//             key={index}
//             src={src}
//             alt={`Logo ${index + 1}`}
//             width={60}
//             height={60}
//             className={`w-full aspect-square flex items-center justify-center rounded-xl border-4 cursor-pointer transition-transform duration-200 ${
//               selectedLogo === src
//                 ? "border-mainGreen scale-105 shadow-md"
//                 : "border-transparent hover:border-gray-300"
//             }`}
//             //onClick={() => handleClick(src)}
//             priority
//           />
//         ))}
//       </div>

//       {/* Optional slider UI block for logo scaling */}
//       {/* 
//       <div className="mt-6 flex flex-col items-start">
//         <div className="flex justify-start items-center gap-9 w-full mb-4">
//           <label htmlFor="logo-size" className="text-lg font-medium text-darkGreen">
//             Logo Scaling:
//           </label>
//           {showWarning && (
//             <span className="text-red-500 text-sm font-bold">
//               ⚠ QR Code may not scan, please test!
//             </span>
//           )}
//         </div>

//         <input
//           type="range"
//           id="logo-size"
//           min="20"
//           max="120"
//           step="5"
//           value={logoSize}
//           onChange={handleSliderChange}
//           className="w-96 accent-mainGreen mb-2"
//         />

//         <button
//           onClick={handleReset}
//           className="text-md text-mainGreen hover:underline"
//         >
//           Reset
//         </button>
//       </div> 
//       */}
//     </section>
//   );
// };

// export default Logos;
