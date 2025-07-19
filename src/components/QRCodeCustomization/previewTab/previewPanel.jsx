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

const PreviewPanel = () => {
  const svgRef = useRef(null);
  const [isDownloading, setIsDownloading] = useState(false);
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
    if (!svgRef.current || isDownloading) return;
    setIsDownloading(true);

    try {
      // Create a new SVG element for export
      const exportSvg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      exportSvg.setAttribute("width", "1024");
      exportSvg.setAttribute("height", "1024");
      exportSvg.setAttribute("viewBox", `0 0 ${canvasSize} ${canvasSize}`);
      
      // Clone the content from the original SVG
      const content = svgRef.current.innerHTML;
      exportSvg.innerHTML = content;

      // Add the sticker as an image element if selected
      if (selectedSticker) {
        try {
          const stickerResponse = await fetch(selectedSticker);
          const stickerBlob = await stickerResponse.blob();
          const stickerDataUrl = await new Promise((resolve) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result);
            reader.readAsDataURL(stickerBlob);
          });

          const stickerImage = document.createElementNS("http://www.w3.org/2000/svg", "image");
          stickerImage.setAttribute("href", stickerDataUrl );
          stickerImage.setAttribute("width", canvasSize.toString());
          stickerImage.setAttribute("height", canvasSize.toString());
          stickerImage.setAttribute("x", "0");
          stickerImage.setAttribute("y", "0");
          stickerImage.setAttribute("preserveAspectRatio", "xMidYMid meet");
          exportSvg.insertBefore(stickerImage, exportSvg.firstChild);
        } catch (error) {
          console.error("Error processing sticker:", error);
        }
      }

      // Add the logo if selected
      if (selectedLogo) {
        try {
          const logoResponse = await fetch(selectedLogo);
          const logoBlob = await logoResponse.blob();
          const logoDataUrl = await new Promise((resolve) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result);
            reader.readAsDataURL(logoBlob);
          });

          const logoImage = document.createElementNS("http://www.w3.org/2000/svg", "image");
          logoImage.setAttribute("href", logoDataUrl );
          logoImage.setAttribute("x", (qrCenterX - logoSize / 2).toString());
          logoImage.setAttribute("y", (qrCenterY - logoSize / 2).toString());
          logoImage.setAttribute("width", logoSize.toString());
          logoImage.setAttribute("height", logoSize.toString());
          logoImage.setAttribute("preserveAspectRatio", "xMidYMid meet");

          // Find the group that contains logos and add to it
          const groups = exportSvg.getElementsByTagName('g');
          for (let group of groups) {
            if (group.querySelector('image[href="/logos/3D Logo.png"]')) {
              group.appendChild(logoImage);
              break;
            }
          }
        } catch (error) {
          console.error("Error processing logo:", error);
        }
      }

      // Serialize SVG to string
      const serializer = new XMLSerializer();
      let svgStr = serializer.serializeToString(exportSvg);
      
      // Add namespace if not present
      if (!svgStr.includes('xmlns="http://www.w3.org/2000/svg"')) {
        svgStr = svgStr.replace(/<svg/, '<svg xmlns="http://www.w3.org/2000/svg"');
      }

      // Create canvas for conversion
      const canvas = document.createElement("canvas");
      canvas.width = 1024;
      canvas.height = 1024;
      const ctx = canvas.getContext("2d");
      if (!ctx) throw new Error("Could not get canvas context");

      // Create image for drawing
      const img = new Image();
      img.crossOrigin = "anonymous";
      
      await new Promise((resolve) => {
        img.onload = () => {
          // Draw white background
          ctx.fillStyle = "#ffffff";
          ctx.fillRect(0, 0, canvas.width, canvas.height);
          
          // Draw the SVG
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
          resolve(null);
        };
        img.onerror = () => {
          console.error("Error loading SVG image");
          resolve(null);
        };
        img.src = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svgStr)}`;
      });

      // Create download link
      const pngData = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.download = "qr-code.png";
      link.href = pngData;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error generating QR code:", error);
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <div className="relative lg:w-[440px] lg:h-[400px] md:w-[350px] md:h-[350px] w-[310px] h-[250px]">
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
          ref={(node) => {
            svgRef.current = node;
          }}
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

      <button
        onClick={handleDownload}
        disabled={isDownloading}
        className={`mt-6 ${isDownloading ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'} text-white font-medium py-2 px-6 rounded-lg transition-colors duration-200 shadow-md`}
      >
        {isDownloading ? 'Generating...' : 'Download QR Code (1024px)'}
      </button>
    </div>
  );
};

export default PreviewPanel;