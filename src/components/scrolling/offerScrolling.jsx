"use client";

import React, { useEffect, useState, useRef } from "react";
import { IoIosCloseCircleOutline } from "react-icons/io";

const OfferScrolling = () => {
  const [isVisible, setIsVisible] = useState(true);
  const timeoutRef = useRef(null);

  const handleClose = () => {
    if (!isVisible) return; // prevent double click
    setIsVisible(false);

    // Set timeout to re-show after 10 seconds
    timeoutRef.current = setTimeout(() => {
  setIsVisible(true);
}, 10 * 60 * 1000); // 10 minutes

  };

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed top-8 left-0 z-[40]">
      <div className="relative">
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-11 right-24 bg-white text-red-600 bg-opacity-60 rounded-full text-xl z-10 cursor-pointer"
        >
          <IoIosCloseCircleOutline />
        </button>

        {/* GIF */}
        <img
          src="/free.gif"
          alt="Free Trial Gif"
          className="w-52 h-full"
        />
      </div>
    </div>
  );
};

export default OfferScrolling;








// // "use client";

// // import React, { useEffect, useState } from "react";
// // import Image from "next/image";

// // const OfferScrolling = () => {
// //   // const [speed, setSpeed] = useState(15); // Default desktop speed

// //   // useEffect(() => {
// //   //   // Only runs on client
// //   //   const mobile = window.innerWidth < 768;
// //   //   setSpeed(mobile ? 10 : 15);
// //   // }, []);

// //   return (
// //     // <div className="w-full z-80 overflow-hidden bg-white cursor-pointer mb-4">
// //     //   <div
// //     //     className="marquee flex items-center whitespace-nowrap space-x-56"
// //     //     style={{ animationDuration: `${speed}s` }}
// //     //   >
// //     //     {[...Array(3)].map((_, index) => (
// //     //       <div
// //     //         key={index}
// //     //         className="scroll-text text-2xl tracking-wide text-mainGreen flex items-center space-x-4 px-4"
// //     //       >
// //     //         <span className="flex items-center gap-2 text-2xl leading-tight">
// //     //           <img
// //     //             src="/videos/free.gif"
// //     //             alt="Free Trial Gif"
// //     //             className="w-24 h-18 object-contain"
// //     //           />
// //     //           <span className="text-[#d80208]">
// //     //             New to ZM? Enjoy 90 Days of Unlimited Scans + 5 QR Codes
// //     //           </span>
// //     //           -
// //     //           <span className="font-medium text-red-700 relative">
// //     //             <span className="animate-bounce">Absolutely Free Trial!</span>
// //     //           </span>
// //     //           <img
// //     //             src="/videos/free.gif"
// //     //             alt="Free Trial Gif"
// //     //             className="w-18 h-18 object-contain"
// //     //           />
// //     //         </span>
// //     //       </div>
// //     //     ))}
// //     //   </div>

// //     //   <style jsx>{`
// //     //     .scroll-text {
// //     //       font-family: sans;
// //     //     }

// //     //     .marquee {
// //     //       animation: marquee ${speed}s linear infinite;
// //     //     }

// //     //     .marquee:hover {
// //     //       animation-play-state: paused;
// //     //     }

// //     //     @keyframes marquee {
// //     //       0% {
// //     //         transform: translateX(100%);
// //     //       }
// //     //       100% {
// //     //         transform: translateX(-100%);
// //     //       }
// //     //     }
// //     //   `}</style>
// //     // </div>
// //     <>
// //   <div className="fixed top-8 left-0 z-[50]">
// //     <img
// //       src="/free.gif"
// //       alt="Free Trial Gif"
// //       className="w-52 h-full rounded-2xl "
// //     />
   
// //   </div>


// //     </>
// //   );
// // };

// // export default OfferScrolling;
// "use client";

// import React, { useState } from "react";
// import { IoIosCloseCircleOutline } from "react-icons/io";

// const OfferScrolling = () => {
//   const [showGif, setShowGif] = useState(true);

//   const handleClose = () => {
//     setShowGif(false);

//     // Re-show the GIF after 3 seconds
//     setTimeout(() => {
//       setShowGif(true);
//     }, 10000);
//   };

//   if (!showGif) return null;  

//   return (
//     <div className="fixed top-8 right-0 z-[50]">
//       <div className="relative">
//         {/* Close Button */}
//         <button
//           onClick={handleClose}
//           className="absolute top-11 right-24 bg-white text-red-600 bg-opacity-60 rounded-full text-xl z-10 cursor-pointer "
//         >
//           <IoIosCloseCircleOutline />
//         </button>

//         {/* GIF */}
//         <img
//           src="/free.gif"
//           alt="Free Trial Gif"
//           className="w-52 h-full"
//         />
//       </div>
//     </div>
//   );
// };

// export default OfferScrolling;
// "use client";

// import React, { useState, useRef } from "react";
// import { IoIosCloseCircleOutline } from "react-icons/io";

// const OfferScrolling = () => {
//   const [showGif, setShowGif] = useState(true);
//   const timeoutRef = useRef(null);

//   const handleClose = () => {
//     // If it's already hidden, don't do anything
//     if (!showGif) return;

//     // Hide the GIF
//     setShowGif(false);

//     // Clear any previous timers just in case
//     if (timeoutRef.current) {
//       clearTimeout(timeoutRef.current);
//     }

//     // Show the GIF again after 10 seconds
//     timeoutRef.current = setTimeout(() => {
//       setShowGif(true);
//     }, 10000);
//   };

//   if (!showGif) return null;

//   return (
//     <div className="flex items-center justify-center">
//       <div className="fixed top-8 right-0 z-[50]">
//         <div className="relative">
//           {/* Close Button */}
//           <button
//             onClick={handleClose}
//             className="absolute top-11 right-24 bg-white text-red-600 bg-opacity-60 rounded-full text-xl z-10 cursor-pointer"
//           >
//             <IoIosCloseCircleOutline />
//           </button>

//           {/* GIF */}
//           <img
//             src="/free.gif"
//             alt="Free Trial Gif"
//             className="w-52 h-auto pointer-events-none"
//           />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default OfferScrolling;
