"use client";
import React, { useEffect } from "react";
import { useRenderEyes } from "../utils/renderEyes";
import { useGenerateNoiseElements } from "../utils/noiseGeneration";
import { isEye, isInQRBounds } from "../utils/QRMatrixGeneration";
import { calculateQRScan } from "../utils/calculateQRScan";
import useDesignContext from "@/components/hooks/useDesignContext";
import { shapeDefinitions } from "../designTabs/qrShapes/shapes";
import { bodyFrames } from "../designTabs/qrFrames/qrFrameImages";
import NextImage from "next/image";
import { stickerConfig } from "../designTabs/stickers/stickerImages";

const PreviewPanel = () => {
  console.log(shapeDefinitions);


  const {
    foregroundColorMode, foregroundColor, foregroundGradientStart, foregroundGradientEnd,
    eyeFrameColorMode, eyeFrameColor, eyeFrameGradientStart, eyeFrameGradientEnd,
    eyeballColorMode, eyeballColor, eyeballGradientStart, eyeballGradientEnd,
    borderColorMode, borderColor, borderGradientStart, borderGradientEnd,
    selectedLogo,
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

  console.log(selectedQRShape);
  useEffect(() => {
    const generateMatrix = async () => {
      const { generateQRMatrix } = await import("../utils/QRMatrixGeneration");
      setMatrix(generateQRMatrix(text));
    };
    generateMatrix();
  }, [text]);

  const {
    qrScale,
    qrX,
    qrY,
    qrWidth,
    qrHeight,
    qrCenterX,
    qrCenterY
  } = calculateQRScan({
    fullSize,
    moduleSize,
    canvasSize,
    selectedQRShape,
    logoPosition, // ✅ this was missing!
  });


  //const sticker = stickerConfig[selectedSticker] || {};
  // const qrCenterX = qrX + qrWidth / 2 + logoPosition.x;
  // const qrCenterY = qrY + qrHeight / 2 + logoPosition.y;

  const stickerSettings = stickerConfig[selectedSticker] || {};
  const qrPosition = stickerSettings.qrPosition || { x: 0, y: 0 };
  const sizeQr = stickerSettings.qrSize || { width: 100, height: 100 };


  const renderEyes = useRenderEyes();
  const generateNoiseElements = useGenerateNoiseElements({
    qrX,
    qrY,
    qrWidth,
    qrHeight,
    // moduleShape: selectedQRShape,
    selectedBodyFrame,
    moduleShapes,
    containerShape: selectedQRShape,
    fgColor,
    colorMode,
    foregroundColorMode,
    foregroundColor,
    foregroundGradientStart,
    foregroundGradientEnd,
  });

  return (
    <>
      <div className="flex justify-center items-center">
        <div className="relative lg:w-[440px] lg:h-[400px] md:w-[350px] md:h-[350px] w-[310px] h-[250px]">
          {/* <div className="relative w-[90vw] sm:w-[400px] md:w-[440px] aspect-square"> */}

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
            className="absolute top-0 left-0 w-full h-full z-10 "
            style={{
              left: qrPosition.x,
              top: qrPosition.y,
              width: sizeQr.width,
              height: sizeQr.height,
            }}
            viewBox={`0 0 ${canvasSize} ${canvasSize}`}
          >
            {/* <defs>
              <clipPath id="shape-clip">
                {shapeDefinitions[selectedQRShape] && (
                  <path d={shapeDefinitions[selectedQRShape](canvasSize)} />
                )}
              </clipPath>

              {colorMode === "gradient" && (
                <linearGradient
                  id="qrGradient"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="100%"
                >
                  <stop offset="0%" stopColor={gradientStart} />
                  <stop offset="100%" stopColor={gradientEnd} />
                </linearGradient>
              )}
            </defs> */}
            <defs>
              <clipPath id="shape-clip">
                {shapeDefinitions[selectedQRShape] && (
                  <path d={shapeDefinitions[selectedQRShape](canvasSize)} />
                )}
              </clipPath>

              {foregroundColorMode === "gradient" && (
                <linearGradient id="qrGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor={foregroundGradientStart} />
                  <stop offset="100%" stopColor={foregroundGradientEnd} />
                </linearGradient>
              )}

              {eyeFrameColorMode === "gradient" && (
                <linearGradient id="eyeFrameGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor={eyeFrameGradientStart} />
                  <stop offset="100%" stopColor={eyeFrameGradientEnd} />
                </linearGradient>
              )}

              {eyeballColorMode === "gradient" && (
                <linearGradient id="eyeballGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor={eyeballGradientStart} />
                  <stop offset="100%" stopColor={eyeballGradientEnd} />
                </linearGradient>
              )}

              {borderColorMode === "gradient" && (
                <linearGradient id="borderGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor={borderGradientStart} />
                  <stop offset="100%" stopColor={borderGradientEnd} />
                </linearGradient>
              )}
            </defs>


            <g clipPath="url(#shape-clip)">
              {/* <rect width={canvasSize} height={canvasSize} fill="#ffffff" /> */}
              {generateNoiseElements()}

              {/* QR Code Matrix */}
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
                        // d={modulePath}
                        d={bodyFrames?.[selectedBodyFrame] ?? bodyFrames.square}
                        transform={`translate(${x}, ${y}) scale(1)`}
                        fill={
                          foregroundColorMode === "gradient"
                            ? "url(#qrGradient)"
                            : foregroundColor
                        }

                      />
                    );
                  })
                )}
                {renderEyes()}
              </g>

              {/* Logo and Badge */}

              {(
                <g>
                  {/* Outer Company Logo */}
                  <image
                    href="/logos/3D Logo.png"
                    x={qrCenterX - companyLogoSize / 2}
                    y={qrCenterY - companyLogoSize / 2}
                    width={companyLogoSize}
                    height={companyLogoSize}
                    preserveAspectRatio="xMidYMid meet"
                  />

                  {/* Inner Selected Logo */}
                  {selectedLogo && (
                    <image
                      href={selectedLogo}
                      x={qrCenterX - logoSize / 2}
                      y={qrCenterY - logoSize / 2}
                      width={logoSize}
                      height={logoSize}
                      preserveAspectRatio="xMidYMid meet"
                    />
                  )}
                </g>
              )}

            </g>

            {/* Shape Outline */}
            {shapeDefinitions[selectedQRShape] && (
              <path
                d={shapeDefinitions[selectedQRShape](canvasSize)}
                fill="none"
                stroke={
                  borderColorMode === "gradient"
                    ? "url(#borderGradient)"
                    : borderColor
                }
                strokeWidth={strokeWidth}
                strokeLinejoin="round"
              />

            )}
          </svg>


          {/* {selectedSticker && (
            <NextImage
              src={selectedSticker}
              alt="Sticker Frame"
              fill
              className="absolute inset-0 w-full h-full object-contain z-0"
              // className="absolute z-0 object-contain"
            />
          )} */}
        </div>
      </div>
    </>
  );
};

export default PreviewPanel;