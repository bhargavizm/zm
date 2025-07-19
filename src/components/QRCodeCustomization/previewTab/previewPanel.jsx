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
import {
  stickerConfig,
  defaultQRConfig,
} from "../designTabs/stickers/stickerImages";

const PreviewPanel = () => {
  const {
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

  useEffect(() => {
    const generateMatrix = async () => {
      const { generateQRMatrix } = await import("../utils/QRMatrixGeneration");
      setMatrix(generateQRMatrix(text));
    };
    generateMatrix();
  }, [text]);

  const { qrScale, qrX, qrY, qrWidth, qrHeight, qrCenterX, qrCenterY } =
    calculateQRScan({
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
    foregroundColorMode,
    foregroundColor,
    foregroundGradientStart,
    foregroundGradientEnd,
  });

  const defaultPosPercent = { x: 20, y: 20 };
  const defaultSizePercent = { width: 60, height: 60 };

  const sticker = selectedSticker && stickerConfig[selectedSticker];
  const posPercent = sticker?.positionPercent ?? defaultPosPercent;
  const sizePercent = sticker?.sizePercent ?? defaultSizePercent;

  // Screen-based container size
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

  // ✅ QR placement: fill container when no sticker, otherwise use sticker config
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

              {foregroundColorMode === "gradient" && (
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

              {eyeFrameColorMode === "gradient" && (
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

              {eyeballColorMode === "gradient" && (
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

              {borderColorMode === "gradient" && (
                <linearGradient
                  id="borderGradient"
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
              {backgroundImage && (
                <image
                  href={backgroundImage}
                  x="0"
                  y="0"
                  width={canvasSize}
                  height={canvasSize}
                  opacity={0.5}
                  preserveAspectRatio="xMidYMid slice"
                />
              )}
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
                        d={
                          bodyFrames?.[selectedBodyFrame] ??
                          bodyFrames.square
                        }
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

              {/* Logo Overlay */}
              <g>
                <image
                  href="/logos/3D Logo.png"
                  x={qrCenterX - companyLogoSize / 2}
                  y={qrCenterY - companyLogoSize / 2}
                  width={companyLogoSize}
                  height={companyLogoSize}
                  preserveAspectRatio="xMidYMid meet"
                />
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
                  borderColorMode === "gradient"
                    ? "url(#borderGradient)"
                    : borderColor
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
