"use client";

import useDesignContext from "@/components/hooks/useDesignContext";
import Image from "next/image";
import React from "react";

const PreviewPanel = () => {
  const { selectedQRShape, selectedLogo, selectedSticker, logoSize , backgroundImage,
    scale} = useDesignContext();
console.log(selectedQRShape)
  return (
    <>
    
      {selectedSticker && (
        <div className="relative lg:w-[380px] lg:h-[350px] md:w-[280px] md:h-[250px] w-[180px] h-[150px] mx-auto mb-4">

          {/* Sticker (base layer, centered) */}
          <Image
            src={selectedSticker}
            alt="Sticker"
            fill
            className="object-contain z-10"
          />

          {/* QR Shape (centered over sticker) */}
          {selectedQRShape && (
             <div className="relative lg:w-[380px] lg:h-[350px] md:w-[280px] md:h-[250px] w-[180px] h-[150px] mx-auto mb-4">
            <Image
              src={selectedQRShape}
              alt="QR Shape"
              width={200}
              height={200}
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20"
            />
            </div>
          )}

          {backgroundImage && (
            <Image
              src={backgroundImage}
              alt="QR Shape"
              width={scale}
              height={scale}
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20"
            />
          )}

          {/* Logo (centered over QR shape) */}
          {selectedLogo && (
            <Image
              src={selectedLogo}
              alt="Logo"
              width={logoSize}
              height={logoSize}
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-30"
            />
          )}

        </div>
      )}
    </>
  );
};

export default PreviewPanel;


// "use client";

// import useDesignContext from "@/components/hooks/useDesignContext";
// import Image from "next/image";
// import React from "react";

// const PreviewPanel = () => {
//   const { selectedQRShape, selectedLogo, selectedSticker, logoSize } = useDesignContext();

//   return (
//     <>
//       {selectedSticker && (
//         <div className="relative w-[350px] h-[350px] mx-auto mb-4 flex items-center justify-center">
          
//           {/* Sticker Background (base layer) */}
//           <div className="absolute inset-0 flex items-center justify-center ">
//             <Image
//               src={selectedSticker}
//               alt="Sticker"
//               fill
//               className="object-contain"
//             />
//           </div>

//           {/* QR Shape (middle layer) */}
//           {selectedQRShape && (
//             <div className="absolute z-20 ">
//               <Image
//                 src={selectedQRShape}
//                 alt="QR Shape"
//                 width={250}
//                 height={200}
//                 className="object-contain"
//               />
//             </div>
//           )}

//           {/* Logo (top layer) */}
//           {selectedLogo && (
//             <div className="absolute z-30">
//               <Image
//                 src={selectedLogo}
//                 alt="Logo"
//                 width={logoSize}
//                 height={logoSize}
//                 className="object-contain"
//               />
//             </div>
//           )}

//         </div>
//       )}
//     </>
//   );
// };

// export default PreviewPanel;
