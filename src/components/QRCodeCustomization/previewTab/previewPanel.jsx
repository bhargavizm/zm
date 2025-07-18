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
import { stickerConfig,defaultQRConfig  } from "../designTabs/stickers/stickerImages";

const PreviewPanel = () => {
  const {
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
    logoPosition,
  });

  const renderEyes = useRenderEyes();
  const generateNoiseElements = useGenerateNoiseElements({
    qrX,
    qrY,
    qrWidth,
    qrHeight,
    selectedBodyFrame,
    moduleShapes,
    containerShape: selectedQRShape,
    fgColor,
    colorMode,
  });

  // ✅ Sticker placement calculation with percent-based config and screen-aware container size

const defaultPosPercent = { x: 20, y: 20 };
const defaultSizePercent = { width: 60, height: 60 };

// ✅ Get sticker config safely
const sticker = selectedSticker && stickerConfig[selectedSticker];

// ✅ Apply fallbacks using nullish coalescing (??)
const posPercent = sticker?.positionPercent ?? defaultPosPercent;
const sizePercent = sticker?.sizePercent ?? defaultSizePercent;

// ✅ Detect container size based on screen width
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

// ✅ Calculate QR position and size in pixels
const qrPosition = {
  x: (posPercent.x / 100) * containerWidth,
  y: (posPercent.y / 100) * containerHeight,
};

const sizeQr = {
  width: (sizePercent.width / 100) * containerWidth,
  height: (sizePercent.height / 100) * containerHeight,
};




  return (
    <>
      <div className="flex justify-center items-center">
        <div className="relative lg:w-[440px] lg:h-[400px] md:w-[350px] md:h-[350px] w-[310px] h-[250px]">

          {/* Sticker Background */}
          {selectedSticker && (
            <NextImage
              src={selectedSticker}
              alt="Sticker"
              fill
              className="absolute inset-0 w-full h-full object-contain z-0 pointer-events-none"
              priority
            />
          )}

          {/* QR SVG with dynamic position */}
          <svg
            className="absolute z-10"
            style={{
              top: qrPosition.y,
              left: qrPosition.x,
              width:sizeQr.width,
              height:sizeQr.height
            }}
            
            viewBox={`0 0 ${canvasSize} ${canvasSize}`}
          >
            <defs>
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
            </defs>

            <g clipPath="url(#shape-clip)">
              {generateNoiseElements()}

              {/* QR Code Modules */}
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
                          colorMode === "gradient"
                            ? "url(#qrGradient)"
                            : fgColor
                        }
                      />
                    );
                  })
                )}
                {renderEyes()}
              </g>

              {/* Logo Overlay */}
              <g>
                {/* Outer Company Logo */}
                <image
                  href="/logos/d-logo.png"
                  x={qrCenterX - companyLogoSize / 2}
                  y={qrCenterY - companyLogoSize / 2}
                  width={companyLogoSize}
                  height={companyLogoSize}
                  preserveAspectRatio="xMidYMid meet"
                />

                {/* Inner Logo */}
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
            </g>

            {/* QR Shape Outline */}
            {shapeDefinitions[selectedQRShape] && (
              <path
                d={shapeDefinitions[selectedQRShape](canvasSize)}
                fill="none"
                stroke={
                  colorMode === "gradient" ? "url(#qrGradient)" : fgColor
                }
                strokeWidth={strokeWidth}
                strokeLinejoin="round"
              />
            )}
          </svg>
        </div>
      </div>
    </>
  );
};

export default PreviewPanel;