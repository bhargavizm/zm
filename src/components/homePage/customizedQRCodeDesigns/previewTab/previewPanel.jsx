"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { QRCodeSVG } from "qrcode.react";
import useDesignContext from "@/components/hooks/useDesignContext";
import { stickerConfig } from "../designTabs/stickers/stickerImages";
import { qrShapeConfig } from "../designTabs/qrShapes/qrShapeImages";

const PreviewPanel = () => {
  const {
    selectedQRShape,
    selectedSticker,
    selectedLogo,
    backgroundImage,
    logoSize,
  } = useDesignContext();

  const [windowWidth, setWindowWidth] = useState(1024);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const getValue = (obj, fallback) => {
    if (typeof obj === "number") return obj;
    if (!obj || typeof obj !== "object") return fallback;
    if (windowWidth < 480) return obj.mobile ?? fallback;
    if (windowWidth < 768) return obj.tablet ?? fallback;
    return obj.default ?? fallback;
  };

  const sticker = stickerConfig[selectedSticker] || {};
  const shape = qrShapeConfig[selectedQRShape] || {};

  const qrShapeTop = sticker.qrTop || "50%";
  const qrShapeLeft = sticker.qrLeft || "50%";
  const qrShapeSize = getValue(sticker.scale, 220);

  const qrTop = shape.qrTop || "50%";
  const qrLeft = shape.qrLeft || "50%";
const qrBaseSize = getValue(sticker.scale, 220); // make sure this is large enough
const qrScaleFactor = shape.scale || 1.6; // increase for better scan


  const logoTop = shape.logoTop || "50%";
  const logoLeft = shape.logoLeft || "50%";
  const logoPixelSize = getValue(shape.logoSize, logoSize || 30);

  return (
    <div className="flex justify-center items-center ">
      <div className="relative lg:w-[400px] lg:h-[370px] md:w-[350px] md:h-[350px] w-[310px] h-[250px] ">
        {/* Background */}
        

       {/* Sticker (outer frame) */}
{selectedSticker && (
  <Image
    src={selectedSticker}
    alt="Sticker"
    fill
    className="absolute z-0 object-contain"
  />
)}

{/* Background inside shape */}
{selectedQRShape && backgroundImage && (
  <div
    className="absolute z-10  overflow-hidden"
    style={{
      top: qrShapeTop,
      left: qrShapeLeft,
      transform: "translate(-50%, -50%)",
      width: `${qrShapeSize}px`,
      height: `${qrShapeSize}px`,

    }}
  >
    <Image
      src={backgroundImage}
      alt="Background"
      fill
      className="object-cover"
    />
  </div>
)}

{/* QR Shape on top of background */}
{selectedQRShape && (
  <Image
    src={selectedQRShape}
    alt="QR Shape"
    width={qrShapeSize}
    height={qrShapeSize}
    className="absolute z-15"
    style={{
      top: qrShapeTop,
      left: qrShapeLeft,
      transform: "translate(-50%, -50%)",
    }}
  />
)}


        {/* QR Scan (scaled inside shape) */}
        {/* {selectedQRShape && (
        <div
  className="absolute z-20"
  style={{
    top: shape.qrTop || "50%",
    left: shape.qrLeft || "50%",
    transform: `translate(-50%, -50%) scale(${qrScaleFactor})`,

  }}
>
  <QRCodeSVG
    value="https://www.zmqrcode.in/"
    size={qrBaseSize}
    fgColor="#008080"
    // bgColor="transparent"
    imageSettings={selectedLogo ? {
      src: selectedLogo,
      width: logoPixelSize,
      height: logoPixelSize,
      excavate: true,
    } : undefined}
  />
</div>
        )} */}

        {/* Logo & Badge */}
        {/* {selectedLogo && (
          <>
            <Image
              src={selectedLogo}
              alt="Selected Logo"
              width={logoPixelSize}
              height={logoPixelSize}
              className="absolute z-30 rounded-full"
              style={{
                top: logoTop,
                left: logoLeft,
                transform: "translate(-50%, -50%)",
              }}
            />
            <div
              className="absolute z-40 p-1 rounded-full shadow-md"
              style={{
                top: `calc(${logoTop} + 9px)`,
                left: `calc(${logoLeft} + 0px)`,
                transform: "translate(-50%, -50%)",
              }}
            >
              <Image
                src="/images/logos/zm-logo.webp"
                alt="ZM Badge"
                width={16}
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

// import React, { useEffect, useState } from "react";
// import Image from "next/image";
// import { QRCodeSVG } from "qrcode.react";
// import useDesignContext from "@/components/hooks/useDesignContext";
// import { stickerConfig } from "../designTabs/stickers/stickerImages";
// import { qrShapeConfig } from "../designTabs/qrShapes/qrShapeImages";

// const PreviewPanel = () => {
//   const {
//     selectedQRShape,
//     selectedSticker,
//     selectedLogo,
//     backgroundImage,
//     logoSize,
//   } = useDesignContext();

//   const [windowWidth, setWindowWidth] = useState(1024);

//   useEffect(() => {
//     const handleResize = () => setWindowWidth(window.innerWidth);
//     handleResize();
//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   const getValue = (obj, fallback) => {
//     if (typeof obj === "number") return obj;
//     if (!obj || typeof obj !== "object") return fallback;
//     if (windowWidth < 480) return obj.mobile ?? fallback;
//     if (windowWidth < 768) return obj.tablet ?? fallback;
//     return obj.default ?? fallback;
//   };

//   const sticker = stickerConfig[selectedSticker] || {};
//   const shape = qrShapeConfig[selectedQRShape] || {};

//   const qrTop = shape.qrTop || sticker.qrTop || "50%";
//   const qrLeft = shape.qrLeft || sticker.qrLeft || "50%";

//   const qrScaleFactor = shape.scale || 1;
//   const baseQrSize = getValue(sticker.scale, 220);
//   const qrScale = baseQrSize; // Do NOT multiply by scale again; use transform below

//   const logoTop = sticker.logoTop ?? "50%";
//   const logoLeft = sticker.logoLeft ?? "50%";
//   const logoPixelSize = getValue(sticker.logoSize, logoSize || 40);

//   const qrTransformScale = `scale(${qrScaleFactor})`;


//   return (
//     <div className="flex justify-center items-center md:py-4">
//       <div className="relative w-[320px] h-[320px] md:w-[350px] md:h-[350px]">
//         {/* Background */}
//         {backgroundImage && (
//           <Image
//             src={backgroundImage}
//             alt="Background"
//             fill
//             className="absolute z-0 object-cover rounded-xl"
//           />
//         )}

//         {/* Sticker */}
//         {selectedSticker && (
//           <Image
//             src={selectedSticker}
//             alt="Sticker"
//             fill
//             className="absolute z-10 object-contain"
//           />
//         )}

//         {/* QR Shape */}
//         {selectedQRShape && (
//           <Image
//             src={selectedQRShape}
//             alt="QR Shape"
//             width={qrScale}
//             height={qrScale}
//             className="absolute z-15"
//             style={{
//               top: qrTop,
//               left: qrLeft,
//               transform: "translate(-50%, -50%)",
//             }}
//           />
//         )}

//         {/* QR Code with scale transform */}
//         <div
//           className="absolute z-20"
//           style={{
//             top: qrTop,
//             left: qrLeft,
//             transform: `translate(-50%, -50%) ${qrTransformScale}`,
//           }}
//         >
//           <QRCodeSVG
//             value="https://example.com"
//             size={qrScale}
//             fgColor="#000000"
//             bgColor="transparent"
//             imageSettings={
//               selectedLogo
//                 ? {
//                     src: selectedLogo,
//                     width: logoPixelSize,
//                     height: logoPixelSize,
//                     excavate: true,
//                   }
//                 : undefined
//             }
//           />
//         </div>

//         {/* Company Logo */}
//         {selectedLogo && (
//           <div
//             className="absolute z-30 bg-white rounded-full shadow-md"
//             style={{

//               top: `calc(${logoTop} + 12px)`,
//               left: `calc(${logoLeft} + 1px)`,

//               transform: "translate(-50%, -50%)",
//             }}
//           >
//             <Image
//               src="/images/logos/logo-New.png"
//               alt="Company Logo"
//               width={18}
//               height={18}
//             />
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default PreviewPanel;


//--- main code with logo
// "use client";
// import useDesignContext from "@/components/hooks/useDesignContext";
// import Image from "next/image";
// import React, { useEffect, useState } from "react";
// import { stickerConfig } from "../designTabs/stickers/stickerImages";


// const PreviewPanel = () => {
//   const {
//     selectedQRShape,
//     selectedSticker,
//     selectedLogo,
//     backgroundImage,
//     logoSize,
//   } = useDesignContext();

//   const [windowWidth, setWindowWidth] = useState(1024);
//   useEffect(() => {
//     const handleResize = () => setWindowWidth(window.innerWidth);
//     handleResize();
//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   const config = stickerConfig[selectedSticker] || {
//     qrTop: "50%",
//     qrLeft: "50%",
//     scale: { default: 160 },
//     logoTop: "50%",
//     logoLeft: "50%",
//     logoSize: { default: logoSize || 40 },
//   };

//   const getValue = (obj, fallback) => {
//     if (typeof obj === "number") return obj;
//     if (!obj || typeof obj !== "object") return fallback;
//     if (windowWidth < 480) return obj.mobile ?? fallback;
//     if (windowWidth < 768) return obj.tablet ?? fallback;
//     return obj.default ?? fallback;
//   };

//   const qrScale = getValue(config.scale, 160);
//   const logoPixelSize = getValue(config.logoSize, 40);

//   return (
//     <div className="flex justify-center items-center md:py-4">
//       <div className="relative w-[320px] h-[320px] md:w-[350px] md:h-[350px]">
//         {/* Background */}
//         {backgroundImage && (
//           <Image
//             src={backgroundImage}
//             alt="Background"
//             fill
//             className="absolute z-0 object-cover rounded-xl"
//           />
//         )}

//         {/* Sticker */}
//         {selectedSticker && (
//           <Image
//             src={selectedSticker}
//             alt="Sticker"
//             fill
//             className="absolute z-10 object-contain"
//           />
//         )}

//         {/* QR Shape */}
//         {selectedQRShape && (
//           <Image
//             src={selectedQRShape}
//             alt="QR Shape"
//             width={qrScale}
//             height={qrScale}
//             className="absolute z-20"
//             style={{
//               top: config.qrTop,
//               left: config.qrLeft,
//               transform: "translate(-50%, -50%)",
//             }}
//           />
//         )}

//         {/* Logo (in QR) */}
//         {selectedLogo && (
//           <>
//             <Image
//               src={selectedLogo}
//               alt="Logo"
//               width={logoPixelSize}
//               height={logoPixelSize}
//               className="absolute z-30 rounded-full"
//               style={{
//                 top: config.logoTop ?? "50%",
//                 left: config.logoLeft ?? "50%",
//                 transform: "translate(-50%, -50%)",
//               }}
//             />

//             {/* Company Badge */}
//             <div
//               className="absolute z-40 bg-white rounded-full shadow-md"
//               style={{

//                 top: `calc(${config.logoTop ?? "50%"} + 12px)`,
//                 left: `calc(${config.logoLeft ?? "50%"} + 1px)`,

//                 transform: "translate(-50%, -50%)",
//               }}
//             >
//               <Image
//                 src="/images/logos/logo-New.png"
//                 alt="Company Logo"
//                 width={16}
//                 height={16}
//               />
//             </div>
//           </>
//         )}
//       </div>
//     </div>
//   );
// };

// export default PreviewPanel;




// "use client";

// import useDesignContext from "@/components/hooks/useDesignContext";
// import Image from "next/image";
// import React, { useEffect, useState } from "react";
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

//   const [windowWidth, setWindowWidth] = useState(1024);

//   useEffect(() => {
//     const handleResize = () => setWindowWidth(window.innerWidth);
//     handleResize();
//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   const config = stickerConfig[selectedSticker] || {
//     qrTop: "50%",
//     qrLeft: "50%",
//     scale: {
//       default: 160,
//       tablet: 140,
//       mobile: 110,
//     },
//     logoTop: "50%",
//     logoLeft: "50%",
//     logoSize: {
//       default: logoSize || 30,
//       tablet: logoSize || 30,
//       mobile: logoSize || 30,
//     },
//   };

//   const getResponsiveValue = (valueObj, fallback = 160) => {
//     if (!valueObj) return fallback;
//     if (typeof valueObj === "number") return valueObj;
//     if (typeof valueObj !== "object") return fallback;
//     if (windowWidth < 480) return valueObj.mobile ?? fallback;
//     if (windowWidth < 769) return valueObj.tablet ?? fallback;
//     return valueObj.default ?? fallback;
//   };

//   const adjustedScale = getResponsiveValue(config.scale, 160);
//   const adjustedLogoSize = getResponsiveValue(config.logoSize, logoSize || 30);

//   return (
//     <div className="flex justify-center items-center md:py-4">
//       <div className="relative lg:w-[350px] lg:h-[350px] md:w-[320px] md:h-[300px] w-[310px] h-[250px] mx-auto">
//         {/* Sticker */}
//         {selectedSticker && (
//           <Image
//             src={selectedSticker}
//             alt="Sticker"
//             fill
//             className="object-contain absolute z-10"
//           />
//         )}

//         {/* Background */}
//         {backgroundImage && (
//           <Image
//             src={backgroundImage}
//             alt="Background"
//             width={scale}
//             height={scale}
//             className="absolute top-1/2 left-1/2 z-20 -translate-x-1/2 -translate-y-1/2"
//           />
//         )}

//         {/* QR Shape */}
//         {selectedQRShape && (
//           <Image
//             src={selectedQRShape}
//             alt="QR Shape"
//             width={adjustedScale}
//             height={adjustedScale}
//             className="absolute z-30"
//             style={{
//               top: config.qrTop,
//               left: config.qrLeft,
//               transform: "translate(-50%, -50%)",
//             }}
//           />
//         )}

//         {/* Logo and ZM Badge (Commented Out) */}
//         {/*
//         {selectedLogo && (
//           <>
//             <Image
//               src={selectedLogo}
//               alt="Selected Logo"
//               width={adjustedLogoSize}
//               height={adjustedLogoSize}
//               className="absolute z-40 rounded-full"
//               style={{
//                 top: config.logoTop ?? "50%",
//                 left: config.logoLeft ?? "50%",
//                 transform: "translate(-50%, -50%)",
//               }}
//             />
//             <div
//               className="absolute z-50 p-1 rounded-full shadow-md"
//               style={{

//                 top: `calc(${config.logoTop ?? "50%"} + 10px)`,
//                 left: `calc(${config.logoLeft ?? "50%"} + 20px)`,

//                 transform: "translate(-50%, -50%)",
//               }}
//             >
//               <Image
//                 src="/images/logos/logo-New.png"
//                 alt="ZM Badge"
//                 width={18}
//                 height={20}
//               />
//             </div>
//           </>
//         )}
//         */}
//       </div>
//     </div>
//   );
// };

// export default PreviewPanel;





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
//                 top: calc(${stickerStyle.logoTop} + 20px),
//                 left: calc(${stickerStyle.logoLeft} + 0px),
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