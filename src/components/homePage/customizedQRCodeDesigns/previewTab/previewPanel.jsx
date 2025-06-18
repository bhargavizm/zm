// "use client";

// import useDesignContext from "@/components/hooks/useDesignContext";
// import Image from "next/image";
// import React from "react";

// const PreviewPanel = () => {
//   const {
//     selectedQRShape,
//     selectedLogo,
//     selectedSticker,
//     logoSize,
//     backgroundImage,
//     scale,
//   } = useDesignContext();
//   console.log(selectedQRShape);
//   return (
//     <>
//     <div className="flex justify-center">
//     <div className="relative lg:w-[350px] lg:h-[350px] w-[280px] h-[250px] mx-auto mb-4">
//   {selectedSticker && (
//     <Image
//       src={selectedSticker}
//       alt="Sticker"
//       fill
//       className="object-contain z-10"
//     />
//   )}

//   {backgroundImage && (
//     <Image
//       src={backgroundImage}
//       alt="Background Image"
//       width={scale}
//       height={scale}
//       className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20"
//     />
//   )}

//   {selectedQRShape && (
//     <Image
//       src={selectedQRShape}
//       alt="QR Shape"
//       width={160}
//       height={160}
//       className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20"
//     />
//   )}

//   {selectedLogo && (
//     <Image
//       src={selectedLogo}
//       alt="Logo"
//       width={logoSize}
//       height={logoSize}
//       className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-30"
//     />
//   )}
// </div>
// </div>
   
//     </>
//   );
// };

// export default PreviewPanel;

// 'use client';

// import useDesignContext from "@/components/hooks/useDesignContext";
// import Image from "next/image";
// import React from "react";
// import { stickerConfig } from "../designTabs/stickers/stickerImages";


//   const PreviewPanel = () => {
//   const {
//     selectedQRShape,
//     selectedLogo,
//     selectedSticker,
//     backgroundImage,
//     scale,
//   } = useDesignContext();

//   const stickerStyle = stickerConfig[selectedSticker] || {
//     qrTop: "50%",
//     qrLeft: "50%",
//     scale: 160,
//     logoTop: "50%",
//     logoLeft: "50%",
//     logoSize: 60,
//   };

//   return (
//     <>
//     <div className="">
//     <div className="relative w-[330px] h-[340px]  mx-auto">
//       {selectedSticker && (
//         <Image
//           src={selectedSticker}
//           alt="Sticker"
//           fill
//           className="object-contain z-10"
//         />
//       )}

//       {backgroundImage && (
//         <Image
//           src={backgroundImage}
//           alt="Background"
//           width={scale}
//           height={scale}
//           className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20"
//         />
//       )}

//       {selectedQRShape && (
//         <Image
//           src={selectedQRShape}
//           alt="QR Shape"
//           width={stickerStyle.scale}
//           height={stickerStyle.scale}
//           className="absolute z-20"
//           style={{
//             top: stickerStyle.qrTop,
//             left: stickerStyle.qrLeft,
//             transform: "translate(-50%, -50%)",
//           }}
//         />
//       )}
// {/* 
//       {selectedLogo && (
//         <Image
//           src={selectedLogo}
//           alt="Logo"
//           width={stickerStyle.logoSize || 60}
//           height={stickerStyle.logoSize || 60}
//           className="absolute z-30"
//           style={{
//             top: stickerStyle.logoTop || "50%",
//             left: stickerStyle.logoLeft || "50%",
//             transform: "translate(-50%, -50%)",
//           }}
//         />
//       )} */}
//       {selectedLogo && (
//   <>
//     {/* Always show ZM logo beneath the selected logo */}
//     <Image
//       src='/images/logos/zm-logo.webp'
//       alt="ZM Logo Frame"
//       width={(stickerStyle.logoSize || 60) + 20} // slightly larger for framing
//       height={(stickerStyle.logoSize || 60) + 20}
//       className="absolute z-25" // just below selectedLogo
//       style={{
//         top: stickerStyle.logoTop || "50%",
//         left: stickerStyle.logoLeft || "50%",
//         transform: "translate(-50%, -50%)",
//       }}
//     />
    
//     {/* User-selected logo */}
//     <Image
//       src={selectedLogo}
//       alt="User Logo"
//       width={stickerStyle.logoSize || 60}
//       height={stickerStyle.logoSize || 60}
//       className="absolute z-30"
//       style={{
//         top: stickerStyle.logoTop || "50%",
//         left: stickerStyle.logoLeft || "50%",
//         transform: "translate(-50%, -50%)",
//       }}
//     />
//   </>
// )}

//     </div>
//     </div>
//     </>

//   );
// };

// export default PreviewPanel;

"use client";
import useDesignContext from "@/components/hooks/useDesignContext";
import Image from "next/image";
import React from "react";
import { stickerConfig } from "../designTabs/stickers/stickerImages";

const PreviewPanel = () => {
  const {
    selectedQRShape,
    selectedLogo,
    selectedSticker,
    backgroundImage,
    scale,
    logoSize,
  } = useDesignContext();

  const stickerStyle = stickerConfig[selectedSticker] || {
    qrTop: "50%",
    qrLeft: "50%",
    scale: 160,
    logoTop: "50%",
    logoLeft: "50%",
    logoSize: logoSize || 60,
  };

  return (
    <div className="md:py-9 py-4">
    <div className="relative lg:w-[370px] lg:h-[370px] md:w-[320px] md:h-[300px] w-[300px] h-[290px] mx-auto">
      {selectedSticker && (
        <Image
          src={selectedSticker}
          alt="Sticker"
          fill
          className="object-contain z-10"
        />
      )}

      {backgroundImage && (
        <Image
          src={backgroundImage}
          alt="Background"
          width={scale}
          height={scale}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20"
        />
      )}

      {selectedQRShape && (
        <Image
          src={selectedQRShape}
          alt="QR Shape"
          width={stickerStyle.scale}
          height={stickerStyle.scale}
          className="absolute z-20"
          style={{
            top: stickerStyle.qrTop,
            left: stickerStyle.qrLeft,
            transform: "translate(-50%, -50%)",
          }}
        />
      )}

     {selectedLogo && (
  <>
    {/* Selected Logo at center */}
    <Image
      src={selectedLogo}
      alt="Selected Logo"
      width={stickerStyle.logoSize}
      height={stickerStyle.logoSize}
      className="absolute z-30 rounded-full"
      style={{
        top: stickerStyle.logoTop,
        left: stickerStyle.logoLeft,
        transform: "translate(-50%, -50%)",
      }}
    />

    {/* ZM Badge on selected logo */}
    <div
      className="absolute z-40 p-1 bg-white rounded-full shadow-md"
      style={{
        top: `calc(${stickerStyle.logoTop} + 20px)`,
        left: `calc(${stickerStyle.logoLeft} + 0px)`,
        transform: "translate(-50%, -50%)",
      }}
    >
      <Image
        src="/images/logos/zm-logo.webp"
        alt="ZM Badge"
        width={10}
        height={10}
      />
    </div>
  </>
)}

    </div>
    </div>
  );
};

export default PreviewPanel;
