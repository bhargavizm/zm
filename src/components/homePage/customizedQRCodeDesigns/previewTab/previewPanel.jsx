"use client";
import useDesignContext from "@/components/hooks/useDesignContext";
import Image from "next/image";
import React, { useEffect, useState } from "react";
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

  const [windowWidth, setWindowWidth] = useState(1024);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const config = stickerConfig[selectedSticker] || {
    qrTop: "50%",
    qrLeft: "50%",
    scale: {
      default: 160,
      tablet: 140,
      mobile: 110,
    },
    logoTop: "50%",
    logoLeft: "50%",
    logoSize: {
      default: logoSize || 30,
      tablet: logoSize || 30,
      mobile: logoSize || 30,
    },
  };

  const getResponsiveScale = (scaleObj) => {
    if (typeof scaleObj === "number") return scaleObj;
    if (windowWidth < 480) return scaleObj.mobile;
    if (windowWidth < 769) return scaleObj.tablet;
    return scaleObj.default;
  };

  const adjustedScale = getResponsiveScale(config.scale);
  const adjustedLogoSize = getResponsiveScale(config.logoSize);

  return (
    <div className="flex justify-center items-center md:py-4">
      <div className="relative lg:w-[350px] lg:h-[350px] md:w-[320px] md:h-[300px] w-[310px] h-[250px] mx-auto">
        {/* Sticker */}
        {selectedSticker && (
          <Image
            src={selectedSticker}
            alt="Sticker"
            fill
            className="object-contain absolute z-10"
          />
        )}

        {/* Background */}
        {backgroundImage && (
          <Image
            src={backgroundImage}
            alt="Background"
            width={scale}
            height={scale}
            className="absolute top-1/2 left-1/2 z-20 -translate-x-1/2 -translate-y-1/2"
          />
        )}

        {/* QR Shape */}
        {selectedQRShape && (
          <Image
            src={selectedQRShape}
            alt="QR Shape"
            width={adjustedScale}
            height={adjustedScale}
            className="absolute z-30"
            style={{
              top: config.qrTop,
              left: config.qrLeft,
              transform: "translate(-50%, -50%)",
            }}
          />
        )}

        {/* Logo and ZM Badge */}
        {/* {selectedLogo && (
          <>
            <Image
              src={selectedLogo}
              alt="Selected Logo"
              width={adjustedLogoSize}
              height={adjustedLogoSize}
              className="absolute z-40 rounded-full"
              style={{
                top: config.logoTop,
                left: config.logoLeft,
                transform: "translate(-50%, -50%)",
              }}
            />
            <div
              className="absolute z-50 p-1 rounded-full shadow-md"
              style={{
                top: `calc(${config.logoTop} + 20px)`,
                left: `calc(${config.logoLeft} + 0px)`,
                transform: "translate(-50%, -50%)",
              }}
            >
              <Image
                src="/images/logos/zm-logo.webp"
                alt="ZM Badge"
                width={18}
                height={20}
              />
            </div>
          </>
        )} */}
      </div>
    </div>
  );
};

export default PreviewPanel;

// "use client";
// import useDesignContext from "@/components/hooks/useDesignContext";
// import Image from "next/image";
// import React from "react";
// import { stickerConfig } from "../designTabs/stickers/stickerImages";

// const PreviewPanel = () => {
//   const {
//     selectedQRShape,
//     selectedLogo,
//     selectedSticker,
//     backgroundImage,
//     scale,
//     logoSize,
//   } = useDesignContext();

//   // Use default values if no sticker is selected
//   const stickerStyle = stickerConfig[selectedSticker] || {
//     qrTop: "50%",
//     qrLeft: "50%",
//     scale: selectedSticker ? 160 : 370, // QR inside sticker = smaller, QR alone = full size
//     logoTop: "50%",
//     logoLeft: "50%",
//     logoSize: logoSize || 60,
//   };

//   return (
//     <div className="md:py-4 flex justify-center items-center">
//       <div className="relative lg:w-[350px] lg:h-[350px] md:w-[320px] md:h-[300px] w-[310px] h-[250px] mx-auto">
        
//         {/* Sticker as base layer if selected */}
//         {selectedSticker && (
//           <Image
//             src={selectedSticker}
//             alt="Sticker"
//             fill
//             className="object-contain z-10"
//           />
//         )}

//         {/* Background design */}
//         {backgroundImage && (
//           <Image
//             src={backgroundImage}
//             alt="Background"
//             width={scale}
//             height={scale}
//             className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20"
//           />
//         )}

//         {/* QR Shape */}
//         {selectedQRShape && (
//           <Image
//             src={selectedQRShape}
//             alt="QR Shape"
//             width={stickerStyle.scale}
//             height={stickerStyle.scale}
//             className="absolute z-20"
//             style={{
//               top: stickerStyle.qrTop,
//               left: stickerStyle.qrLeft,
//               transform: "translate(-50%, -50%)",
//             }}
//           />
//         )}

//         {/* Center Logo with ZM badge */}
//         {/* {selectedLogo && (
//           <>
//             <Image
//               src={selectedLogo}
//               alt="Selected Logo"
//               width={stickerStyle.logoSize}
//               height={stickerStyle.logoSize}
//               className="absolute z-30 rounded-full"
//               style={{
//                 top: stickerStyle.logoTop,
//                 left: stickerStyle.logoLeft,
//                 transform: "translate(-50%, -50%)",
//               }}
//             />
//             <div
//               className="absolute z-40 p-1 rounded-full shadow-md"
//               style={{
//                 top: `calc(${stickerStyle.logoTop} + 20px)`,
//                 left: `calc(${stickerStyle.logoLeft} + 0px)`,
//                 transform: "translate(-50%, -50%)",
//               }}
//             >
//               <Image
//                 src="/images/logos/zm-logo.webp"
//                 alt="ZM Badge"
//                 width={18}
//                 height={20}
//               />
//             </div>
//           </>
//         )} */}
//       </div>
//     </div>
//   );
// };

// export default PreviewPanel;
