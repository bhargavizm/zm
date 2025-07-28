// "use client";
// import React, { useEffect, useRef, useState } from "react";
// import { useRenderEyes } from "../utils/renderEyes";
// import { useGenerateNoiseElements } from "../utils/noiseGeneration";
// import { isEye, isInQRBounds } from "../utils/QRMatrixGeneration";
// import { calculateQRScan } from "../utils/calculateQRScan";
// import useDesignContext from "@/components/hooks/useDesignContext";
// import { shapeDefinitions } from "../designTabs/qrShapes/shapes";
// import { bodyFrames } from "../designTabs/qrFrames/qrFrameImages";
// import NextImage from "next/image";
// import {
//   stickerConfig,
//   defaultQRConfig,
// } from "../designTabs/stickers/stickerImages";
// import DownloadButton from "./downloadButton";
// import { toPng } from "html-to-image";
// import toast from "react-hot-toast";
// import useServicesContext from "@/components/hooks/useServiceContext";
// import useSubmitForm from "../servicesData/useSubmitForm";
// import { useServicesFormData } from "../servicesData/useServicesFormData";

// // Base64 conversion helper
// const convertToBase64 = async (url) => {
//   const response = await fetch(url, { mode: "cors" });
//   const blob = await response.blob();
//   return new Promise((resolve, reject) => {
//     const reader = new FileReader();
//     reader.onloadend = () => resolve(reader.result);
//     reader.onerror = reject;
//     reader.readAsDataURL(blob);
//   });
// };

// const PreviewPanel = () => {
//   const previewRef = useRef(null);

//    const { submitForm } = useServicesFormData();

//   const {
//     qrCodeUrl,
//     setText,
//     bgDesign,
//     setBgDesign,
//     foregroundColorMode,
//     foregroundColor,
//     foregroundGradientStart,
//     foregroundGradientEnd,
//     eyeFrameColorMode,
//     eyeFrameColor,
//     eyeFrameGradientStart,
//     eyeFrameGradientEnd,
//     eyeballColorMode,
//     eyeballColor,
//     eyeballGradientStart,
//     eyeballGradientEnd,
//     borderColorMode,
//     borderColor,
//     borderGradientStart,
//     borderGradientEnd,
//     selectedLogo,
//     backgroundImage,
//     imageScale,
//     logoSize,
//     companyLogoSize,
//     text,
//     setMatrix,
//     matrix,
//     moduleSize,
//     fullSize,
//     canvasSize,
//     padding,
//     qrSize,
//     selectedQRShape,
//     selectedBodyFrame,
//     moduleShapes,
//     colorMode,
//     qrColor: fgColor,
//     selectedSticker,
//     bgColor,
//     gradientStart,
//     gradientEnd,
//     logoImage,
//     platformBadge,
//     badgeSize,
//     logoPosition = { x: 0, y: 0 },
//     strokeWidth = 8,
//     modulePath,
//   } = useDesignContext();

//   const [base64Logo, setBase64Logo] = useState(null);
//   const [base64Background, setBase64Background] = useState(null);

//   const effectiveForegroundColor = backgroundImage
//     ? "#000000"
//     : foregroundColor;
//   const effectiveBorderColor = backgroundImage ? "#000000" : borderColor;
//   const effectiveEyeFrameColor = backgroundImage ? "#000000" : eyeFrameColor;
//   const effectiveEyeballColor = backgroundImage ? "#000000" : eyeballColor;

//   // useEffect(() => {
//   //   const generateMatrix = async () => {
//   //     const { generateQRMatrix } = await import("../utils/QRMatrixGeneration");
//   //     setMatrix(generateQRMatrix(text));
//   //   };
//   //   generateMatrix();
//   // }, [text]);

//   const generateMatrix = async (textInput) => {
//     const { generateQRMatrix } = await import("../utils/QRMatrixGeneration");
//     const matrixData = generateQRMatrix(textInput ?? text);
//     setMatrix(matrixData);
//   };

//   const regenerateMatrixWithText = async (textOverride) => {
//     const { generateQRMatrix } = await import("../utils/QRMatrixGeneration");
//     setMatrix(generateQRMatrix(textOverride));
//   };

//   useEffect(() => {
//     generateMatrix(text);
//   }, [text]);

//   useEffect(() => {
//     const prepareImages = async () => {
//       try {
//         if (selectedLogo) {
//           const logo = await convertToBase64(selectedLogo);
//           setBase64Logo(logo);
//         } else {
//           setBase64Logo(null);
//         }

//         if (backgroundImage) {
//           const bg = await convertToBase64(backgroundImage);
//           setBase64Background(bg);
//         } else {
//           setBase64Background(null);
//         }
//       } catch (error) {
//         console.error("Image conversion failed", error);
//       }
//     };

//     prepareImages();
//   }, [selectedLogo, backgroundImage]);

//   const { qrScale, qrX, qrY, qrWidth, qrHeight, qrCenterX, qrCenterY } =
//     calculateQRScan({
//       fullSize,
//       moduleSize,
//       canvasSize,
//       selectedQRShape,
//       logoPosition,
//     });

//   const renderEyes = useRenderEyes({
//     eyeFrameColorMode: backgroundImage ? "solid" : eyeFrameColorMode,
//     eyeFrameColor: effectiveEyeFrameColor,
//     eyeFrameGradientStart,
//     eyeFrameGradientEnd,
//     eyeballColorMode: backgroundImage ? "solid" : eyeballColorMode,
//     eyeballColor: effectiveEyeballColor,
//     eyeballGradientStart,
//     eyeballGradientEnd,
//   });

//   const generateNoiseElements = useGenerateNoiseElements({
//     qrX,
//     qrY,
//     qrWidth,
//     qrHeight,
//     selectedBodyFrame,
//     moduleShapes,
//     selectedQRShape,
//     fgColor,
//     colorMode,
//     foregroundColorMode: backgroundImage ? "solid" : foregroundColorMode,
//     foregroundColor: effectiveForegroundColor,
//     foregroundGradientStart,
//     foregroundGradientEnd,
//   });

//   const defaultPosPercent = { x: 25, y: 25 };
//   const defaultSizePercent = { width: 50, height: 50 };

//   const sticker = selectedSticker && stickerConfig[selectedSticker];
//   const posPercent = sticker?.positionPercent ?? defaultPosPercent;
//   const sizePercent = sticker?.sizePercent ?? defaultSizePercent;

//   let containerWidth = 440;
//   let containerHeight = 400;

//   if (typeof window !== "undefined") {
//     const screenWidth = window.innerWidth;
//     if (screenWidth < 768) {
//       containerWidth = 310;
//       containerHeight = 250;
//     } else if (screenWidth < 1024) {
//       containerWidth = 350;
//       containerHeight = 350;
//     }
//   }

//   const isStickerSelected = Boolean(selectedSticker);

//   const qrPosition = isStickerSelected
//     ? {
//         x: (posPercent.x / 100) * containerWidth,
//         y: (posPercent.y / 100) * containerHeight,
//       }
//     : { x: 0, y: 0 };

//   const sizeQr = isStickerSelected
//     ? {
//         width: (sizePercent.width / 100) * containerWidth,
//         height: (sizePercent.height / 100) * containerHeight,
//       }
//     : {
//         width: containerWidth,
//         height: containerHeight,
//       };

 
// const handleDownload = async () => {
//   if (!previewRef.current) {
//     toast.error("Preview element not found");
//     return;
//   }

//   try {
//     const generatedUrl = await submitForm();
//     if (!generatedUrl) {
//       toast.error("QR Code generation failed. Please try again.");
//       return;
//     }

//     await regenerateMatrixWithText(generatedUrl);
//     setQrRenderTrigger(prev => prev + 1);

//     await new Promise(resolve => setTimeout(resolve, 150)); // Give time to rerender

//     const exportWidth = 1024;
//     const exportHeight = Math.round(
//       (previewRef.current.offsetHeight / previewRef.current.offsetWidth) * exportWidth
//     );

//     const dataUrl = await toPng(previewRef.current, {
//       cacheBust: true,
//       backgroundColor: "white",
//       width: exportWidth,
//       height: exportHeight,
//       style: {
//         transform: `scale(${exportWidth / previewRef.current.offsetWidth})`,
//         transformOrigin: "top left",
//         width: `${previewRef.current.offsetWidth}px`,
//         height: `${previewRef.current.offsetHeight}px`,
//       },
//     });

//     const link = document.createElement("a");
//     link.download = "qr-code.png";
//     link.href = dataUrl;
//     link.click();

//     toast.success("QR code downloaded successfully!");
//   } catch (error) {
//     console.error("Download failed:", error);
//     toast.error("Download failed. Please try again.");
//   }
// };


//   return (
//     <div className="flex justify-center items-center flex-col">
//       <div className="flex justify-center items-center">
//         <div
//           ref={previewRef}
//           className="relative lg:w-[440px] lg:h-[400px] md:w-[350px] md:h-[350px] w-[310px] h-[250px]"
//         >
//           {/* Sticker Background */}
//           {selectedSticker && (
//             <NextImage
//               src={selectedSticker}
//               alt="Sticker"
//               fill
//               className="absolute inset-0 w-full h-full object-contain z-0 pointer-events-none"
//               priority
//             />
//           )}

//           {/* QR SVG */}
//           <svg
//             className="absolute z-10"
//             style={{
//               top: qrPosition.y,
//               left: qrPosition.x,
//               width: sizeQr.width,
//               height: sizeQr.height,
//             }}
//             viewBox={`0 0 ${canvasSize} ${canvasSize}`}
//           >
//             {/* <rect
//     x="0"
//     y="0"
//     width={canvasSize}
//     height={canvasSize}
//     fill="white"
//   /> */}
//             <defs>
//               <clipPath id="shape-clip">
//                 {shapeDefinitions[selectedQRShape] && (
//                   <path d={shapeDefinitions[selectedQRShape](canvasSize)} />
//                 )}
//               </clipPath>

//               {foregroundColorMode === "gradient" && !backgroundImage && (
//                 <linearGradient
//                   id="qrGradient"
//                   x1="0%"
//                   y1="0%"
//                   x2="100%"
//                   y2="100%"
//                 >
//                   <stop offset="0%" stopColor={foregroundGradientStart} />
//                   <stop offset="100%" stopColor={foregroundGradientEnd} />
//                 </linearGradient>
//               )}

//               {eyeFrameColorMode === "gradient" && !backgroundImage && (
//                 <linearGradient
//                   id="eyeFrameGradient"
//                   x1="0%"
//                   y1="0%"
//                   x2="100%"
//                   y2="100%"
//                 >
//                   <stop offset="0%" stopColor={eyeFrameGradientStart} />
//                   <stop offset="100%" stopColor={eyeFrameGradientEnd} />
//                 </linearGradient>
//               )}

//               {eyeballColorMode === "gradient" && !backgroundImage && (
//                 <linearGradient
//                   id="eyeballGradient"
//                   x1="0%"
//                   y1="0%"
//                   x2="100%"
//                   y2="100%"
//                 >
//                   <stop offset="0%" stopColor={eyeballGradientStart} />
//                   <stop offset="100%" stopColor={eyeballGradientEnd} />
//                 </linearGradient>
//               )}

//               {borderColorMode === "gradient" && !backgroundImage && (
//                 <linearGradient
//                   id={`borderGradient-${selectedQRShape}`}
//                   x1="0%"
//                   y1="0%"
//                   x2="100%"
//                   y2="100%"
//                 >
//                   <stop offset="0%" stopColor={borderGradientStart} />
//                   <stop offset="100%" stopColor={borderGradientEnd} />
//                 </linearGradient>
//               )}
//             </defs>

//             <g clipPath="url(#shape-clip)">
//               {base64Background && (
//                 <image
//                   href={base64Background}
//                   x={qrX}
//                   y={qrY}
//                   width={qrWidth}
//                   height={qrHeight}
//                   opacity={0.3}
//                   preserveAspectRatio="xMidYMid slice"
//                   clipPath="url(#shape-clip)"
//                 />
//               )}

//               {generateNoiseElements()}

//               <g transform={`translate(${qrX}, ${qrY}) scale(${qrScale})`}>
//                 {Array.from({ length: fullSize }).map((_, row) =>
//                   Array.from({ length: fullSize }).map((_, col) => {
//                     const isQRPixel =
//                       isInQRBounds(row, col, padding, qrSize) &&
//                       matrix[row - padding]?.[col - padding] === 1;
//                     const isEyeArea = isEye(row, col, padding, qrSize);
//                     if (!isQRPixel || isEyeArea) return null;

//                     const x = col * moduleSize + moduleSize / 2;
//                     const y = row * moduleSize + moduleSize / 2;

//                     return (
//                       <path
//                         key={`qr-${row}-${col}`}
//                         d={bodyFrames?.[selectedBodyFrame] ?? bodyFrames.square}
//                         transform={`translate(${x}, ${y}) scale(1)`}
//                         // fill={
//                         //   foregroundColorMode === "gradient"
//                         //     ? "url(#qrGradient)"
//                         //     : foregroundColor
//                         // }
//                         fill={
//                           foregroundColorMode === "gradient" && !backgroundImage
//                             ? "url(#qrGradient)"
//                             : effectiveForegroundColor
//                         }
//                       />
//                     );
//                   })
//                 )}
//                 {renderEyes()}
//               </g>

//               <g>
//                 <image
//                   href="/logos/3D Logo.png"
//                   x={qrCenterX - companyLogoSize / 2}
//                   y={qrCenterY - companyLogoSize / 2}
//                   width={companyLogoSize}
//                   height={companyLogoSize}
//                   preserveAspectRatio="xMidYMid meet"
//                 />
//                 {base64Logo && (
//                   <image
//                     href={base64Logo}
//                     x={qrCenterX - logoSize / 2}
//                     y={qrCenterY - logoSize / 2}
//                     width={logoSize}
//                     height={logoSize}
//                     preserveAspectRatio="xMidYMid meet"
//                   />
//                 )}
//               </g>
//             </g>

//             {shapeDefinitions[selectedQRShape] && (
//               <path
//                 d={shapeDefinitions[selectedQRShape](canvasSize)}
//                 fill="none"
//                 stroke={
//                   backgroundImage // 🔁 auto switch to black if image present
//                     ? "#000000"
//                     : borderColorMode === "gradient"
//                     ? `url(#borderGradient-${selectedQRShape})`
//                     : borderColor
//                 }
//                 strokeWidth={strokeWidth}
//               />
//             )}
//           </svg>
//         </div>
//       </div>

//       <DownloadButton handleDownload={handleDownload} />
//     </div>
//   );
// };

// export default PreviewPanel;


"use client";
import React, { useEffect, useRef, useState } from "react";
import { useRenderEyes } from "../utils/renderEyes";
import { useGenerateNoiseElements } from "../utils/noiseGeneration";
import { isEye, isInQRBounds } from "../utils/QRMatrixGeneration";
import { calculateQRScan } from "../utils/calculateQRScan";
import useDesignContext from "@/components/hooks/useDesignContext";
import { shapeDefinitions } from "../designTabs/qrShapes/shapes";
import { bodyFrames } from "../designTabs/qrFrames/qrFrameImages";
import NextImage from "next/image";
import {
  stickerConfig,
  defaultQRConfig,
} from "../designTabs/stickers/stickerImages";
import DownloadButton from "./downloadButton";
import { toPng } from "html-to-image";
import toast from "react-hot-toast";
import useServicesContext from "@/components/hooks/useServiceContext";
import useSubmitForm from "../servicesData/useSubmitForm";
import { useServicesFormData } from "../servicesData/useServicesFormData";

const convertToBase64 = async (url) => {
  const response = await fetch(url, { mode: "cors" });
  const blob = await response.blob();
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
};

const PreviewPanel = () => {
  const previewRef = useRef(null);


   const { submitForm } = useServicesFormData();

  const { activeService, menuBookFormData, setMenuBookFormData, smsFormData, setSmsFormData,textMessageForm, setTextMessageForm ,resetAllDynamicForms

  } = useServicesContext();
  const {
    qrCodeUrl,
    setText,
    bgDesign,
    setBgDesign,
    foregroundColorMode,
    foregroundColor,
    foregroundGradientStart,
    foregroundGradientEnd,
    eyeFrameColorMode,
    eyeFrameColor,
    eyeFrameGradientStart,
    eyeFrameGradientEnd,
    eyeballColorMode,
    eyeballColor,
    eyeballGradientStart,
    eyeballGradientEnd,
    borderColorMode,
    borderColor,
    borderGradientStart,
    borderGradientEnd,
    selectedLogo,
    backgroundImage,
    imageScale,
    logoSize,
    companyLogoSize,
    text,
    setMatrix,
    matrix,
    moduleSize,
    fullSize,
    canvasSize,
    padding,
    qrSize,
    selectedQRShape,
    selectedBodyFrame,
    moduleShapes,
    colorMode,
    qrColor: fgColor,
    selectedSticker,
    bgColor,
    gradientStart,
    gradientEnd,
    logoImage,
    platformBadge,
    badgeSize,
    logoPosition = { x: 0, y: 0 },
    strokeWidth = 8,
    modulePath,
  } = useDesignContext();

  const [base64Logo, setBase64Logo] = useState(null);
  const [base64Background, setBase64Background] = useState(null);
  const [qrRenderTrigger, setQrRenderTrigger] = useState(0);

  const effectiveForegroundColor = backgroundImage ? "#000000" : foregroundColor;
  const effectiveBorderColor = backgroundImage ? "#000000" : borderColor;
  const effectiveEyeFrameColor = backgroundImage ? "#000000" : eyeFrameColor;
  const effectiveEyeballColor = backgroundImage ? "#000000" : eyeballColor;

  const generateMatrix = async (textInput) => {
    const { generateQRMatrix } = await import("../utils/QRMatrixGeneration");
    const matrixData = generateQRMatrix(textInput ?? text);
    setMatrix(matrixData);
  };

  const regenerateMatrixWithText = async (textOverride) => {
    const { generateQRMatrix } = await import("../utils/QRMatrixGeneration");
    setMatrix(generateQRMatrix(textOverride));
  };

  useEffect(() => {
    generateMatrix(text);
  }, [text]);

  useEffect(() => {
    const prepareImages = async () => {
      try {
        if (selectedLogo) {
          const logo = await convertToBase64(selectedLogo);
          setBase64Logo(logo);
        } else {
          setBase64Logo(null);
        }

        if (backgroundImage) {
          const bg = await convertToBase64(backgroundImage);
          setBase64Background(bg);
        } else {
          setBase64Background(null);
        }
      } catch (error) {
        console.error("Image conversion failed", error);
        toast.error("Failed to process images");
      }
    };

    prepareImages();
  }, [selectedLogo, backgroundImage]);

  const { qrScale, qrX, qrY, qrWidth, qrHeight, qrCenterX, qrCenterY } =
    calculateQRScan({
      fullSize,
      moduleSize,
      canvasSize,
      selectedQRShape,
      logoPosition,
    });

  const renderEyes = useRenderEyes({
    eyeFrameColorMode: backgroundImage ? "solid" : eyeFrameColorMode,
    eyeFrameColor: effectiveEyeFrameColor,
    eyeFrameGradientStart,
    eyeFrameGradientEnd,
    eyeballColorMode: backgroundImage ? "solid" : eyeballColorMode,
    eyeballColor: effectiveEyeballColor,
    eyeballGradientStart,
    eyeballGradientEnd,
  });

  const generateNoiseElements = useGenerateNoiseElements({
    qrX,
    qrY,
    qrWidth,
    qrHeight,
    selectedBodyFrame,
    moduleShapes,
    selectedQRShape,
    fgColor,
    colorMode,
    foregroundColorMode: backgroundImage ? "solid" : foregroundColorMode,
    foregroundColor: effectiveForegroundColor,
    foregroundGradientStart,
    foregroundGradientEnd,
  });

  const defaultPosPercent = { x: 25, y: 25 };
  const defaultSizePercent = { width: 50, height: 50 };

  const sticker = selectedSticker && stickerConfig[selectedSticker];
  const posPercent = sticker?.positionPercent ?? defaultPosPercent;
  const sizePercent = sticker?.sizePercent ?? defaultSizePercent;

  let containerWidth = 440;
  let containerHeight = 400;

  if (typeof window !== "undefined") {
    const screenWidth = window.innerWidth;
    if (screenWidth < 768) {
      containerWidth = 310;
      containerHeight = 250;
    } else if (screenWidth < 1024) {
      containerWidth = 350;
      containerHeight = 350;
    }
  }

  const isStickerSelected = Boolean(selectedSticker);

  const qrPosition = isStickerSelected
    ? {
        x: (posPercent.x / 100) * containerWidth,
        y: (posPercent.y / 100) * containerHeight,
      }
    : { x: 0, y: 0 };

  const sizeQr = isStickerSelected
    ? {
        width: (sizePercent.width / 100) * containerWidth,
        height: (sizePercent.height / 100) * containerHeight,
      }
    : {
        width: containerWidth,
        height: containerHeight,
      };



const handleDownload = async () => {
  if (!previewRef.current) {
    toast.error("Preview element not found");
    return;
  }

  try {
    const generatedUrl = await submitForm();
    if (!generatedUrl) {
      toast.error("QR Code generation failed. Please try again.");
      return;
    }

    await regenerateMatrixWithText(generatedUrl);
    setQrRenderTrigger(prev => prev + 1);

    await new Promise(resolve => setTimeout(resolve, 150)); // Give time to rerender

    const exportWidth = 1024;
    const exportHeight = Math.round(
      (previewRef.current.offsetHeight / previewRef.current.offsetWidth) * exportWidth
    );

    const dataUrl = await toPng(previewRef.current, {
      cacheBust: true,
      backgroundColor: "white",
      width: exportWidth,
      height: exportHeight,
      style: {
        transform: `scale(${exportWidth / previewRef.current.offsetWidth})`,
        transformOrigin: "top left",
        width: `${previewRef.current.offsetWidth}px`,
        height: `${previewRef.current.offsetHeight}px`,
      },
    });

    const link = document.createElement("a");
    link.download = "qr-code.png";
    link.href = dataUrl;
    link.click();

    toast.success("QR code downloaded successfully!");
    resetAllDynamicForms();
  } catch (error) {
    console.error("Download failed:", error);
    toast.error("Download failed. Please try again.");
  }
};


  return (
    <div className="flex justify-center items-center flex-col">
      <div className="flex justify-center items-center">
        <div
          ref={previewRef}
          className="relative lg:w-[440px] lg:h-[400px] md:w-[350px] md:h-[350px] w-[310px] h-[250px]"
        >
          {selectedSticker && (
            <NextImage
              src={selectedSticker}
              alt="Sticker"
              fill
              className="absolute inset-0 w-full h-full object-contain z-0 pointer-events-none"
              priority
            />
          )}

          <svg
            className="absolute z-10"
            style={{
              top: qrPosition.y,
              left: qrPosition.x,
              width: sizeQr.width,
              height: sizeQr.height,
            }}
            viewBox={`0 0 ${canvasSize} ${canvasSize}`}
          >
            <defs>
              <clipPath id="shape-clip">
                {shapeDefinitions[selectedQRShape] && (
                  <path d={shapeDefinitions[selectedQRShape](canvasSize)} />
                )}
              </clipPath>

              {foregroundColorMode === "gradient" && !backgroundImage && (
                <linearGradient
                  id="qrGradient"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="100%"
                >
                  <stop offset="0%" stopColor={foregroundGradientStart} />
                  <stop offset="100%" stopColor={foregroundGradientEnd} />
                </linearGradient>
              )}

              {eyeFrameColorMode === "gradient" && !backgroundImage && (
                <linearGradient
                  id="eyeFrameGradient"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="100%"
                >
                  <stop offset="0%" stopColor={eyeFrameGradientStart} />
                  <stop offset="100%" stopColor={eyeFrameGradientEnd} />
                </linearGradient>
              )}

              {eyeballColorMode === "gradient" && !backgroundImage && (
                <linearGradient
                  id="eyeballGradient"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="100%"
                >
                  <stop offset="0%" stopColor={eyeballGradientStart} />
                  <stop offset="100%" stopColor={eyeballGradientEnd} />
                </linearGradient>
              )}

              {borderColorMode === "gradient" && !backgroundImage && (
                <linearGradient
                  id={`borderGradient-${selectedQRShape}`}
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="100%"
                >
                  <stop offset="0%" stopColor={borderGradientStart} />
                  <stop offset="100%" stopColor={borderGradientEnd} />
                </linearGradient>
              )}
            </defs>

            <g clipPath="url(#shape-clip)">
              {base64Background && (
                <image
                  href={base64Background}
                  x={qrX}
                  y={qrY}
                  width={qrWidth}
                  height={qrHeight}
                  opacity={0.3}
                  preserveAspectRatio="xMidYMid slice"
                  clipPath="url(#shape-clip)"
                />
              )}

              {generateNoiseElements()}

              <g transform={`translate(${qrX}, ${qrY}) scale(${qrScale})`}>
                {Array.from({ length: fullSize }).map((_, row) =>
                  Array.from({ length: fullSize }).map((_, col) => {
                    const isQRPixel =
                      isInQRBounds(row, col, padding, qrSize) &&
                      matrix[row - padding]?.[col - padding] === 1;
                    const isEyeArea = isEye(row, col, padding, qrSize);
                    if (!isQRPixel || isEyeArea) return null;

                    const x = col * moduleSize + moduleSize / 2;
                    const y = row * moduleSize + moduleSize / 2;

                    return (
                      <path
                        key={`qr-${row}-${col}`}
                        d={bodyFrames?.[selectedBodyFrame] ?? bodyFrames.square}
                        transform={`translate(${x}, ${y}) scale(1)`}
                        fill={
                          foregroundColorMode === "gradient" && !backgroundImage
                            ? "url(#qrGradient)"
                            : effectiveForegroundColor
                        }
                      />
                    );
                  })
                )}
                {renderEyes()}
              </g>

              <g>
                <image
                  href="/logos/3D Logo.png"
                  x={qrCenterX - companyLogoSize / 2}
                  y={qrCenterY - companyLogoSize / 2}
                  width={companyLogoSize}
                  height={companyLogoSize}
                  preserveAspectRatio="xMidYMid meet"
                />
                {base64Logo && (
                  <image
                    href={base64Logo}
                    x={qrCenterX - logoSize / 2}
                    y={qrCenterY - logoSize / 2}
                    width={logoSize}
                    height={logoSize}
                    preserveAspectRatio="xMidYMid meet"
                  />
                )}
              </g>
            </g>

            {shapeDefinitions[selectedQRShape] && (
              <path
                d={shapeDefinitions[selectedQRShape](canvasSize)}
                fill="none"
                stroke={
                  backgroundImage
                    ? "#000000"
                    : borderColorMode === "gradient"
                    ? `url(#borderGradient-${selectedQRShape})`
                    : borderColor
                }
                strokeWidth={strokeWidth}
              />
            )}
          </svg>
        </div>
      </div>

      <DownloadButton handleDownload={handleDownload} />
    </div>
  );
};

export default PreviewPanel;