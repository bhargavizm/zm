"use client";

import React, { useEffect, useRef, useState } from "react";
import NextImage from "next/image";
import QRCodeStyling from "qr-code-styling";
import useDesignContext from "@/components/hooks/useDesignContext";
import { stickerConfig } from "../designTabs/stickers/stickerImages";
import { qrShapeConfig } from "../designTabs/qrShapes/qrShapeImages";

const combineLogos = async (userLogoUrl, companyLogoUrl, size = 60) => {
  if (!userLogoUrl || !companyLogoUrl) {
    throw new Error("Missing logo URL(s)");
  }

  const canvas = document.createElement("canvas");
  const highRes = 3;
  canvas.width = size * highRes;
  canvas.height = size * highRes * 1.2;
  const ctx = canvas.getContext("2d");
  ctx.scale(highRes, highRes);

  const loadImage = (src) =>
    new Promise((resolve, reject) => {
      const img = new window.Image();
      img.crossOrigin = "anonymous";
      img.onload = () => resolve(img);
      img.onerror = (err) => {
        console.error(`❌ Failed to load image: ${src}`, err);
        reject(new Error(`Image load failed: ${src}`));
      };
      img.src = src;
    });

  const [userImg, companyImg] = await Promise.all([
    loadImage(userLogoUrl),
    loadImage(companyLogoUrl),
  ]);

  ctx.drawImage(userImg, 0, 0, size, size);

  const badgeSize = size * 0.6;
  const companyX = (size - badgeSize) / 2;
  const companyY = size - badgeSize / 1.4;

  ctx.drawImage(companyImg, companyX, companyY, badgeSize, badgeSize);

  return canvas.toDataURL();
};


const PreviewPanel = () => {
  const {
    selectedQRShape,
    selectedSticker,
    selectedLogo,
    backgroundImage,
    logoSize = 30,
    qrColor,
  } = useDesignContext();

  const qrRef = useRef(null);
  const qrInstance = useRef(null);
  const [windowWidth, setWindowWidth] = useState(1024);
  const [combinedLogo, setCombinedLogo] = useState(null);

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
  const qrBaseSize = getValue(sticker.scale, 220);
  const qrScaleFactor = shape.scale || 1.6;

  const logoPixelSize = getValue(shape.logoSize, logoSize);

 useEffect(() => {
  const generateCombined = async () => {
    if (!selectedLogo) {
      // ❌ No selected logo → show nothing at all
      setCombinedLogo(null);
      return;
    }

    try {
      const dataUrl = await combineLogos(
        selectedLogo,
        "/images/logos/zm-logo.webp", // your company logo
        logoPixelSize
      );
      setCombinedLogo(dataUrl); // ✅ Combined user + company logo
    } catch (err) {
      console.error("❌ Logo combine failed", err);
      setCombinedLogo(null); // ❌ Fail gracefully, show nothing
    }
  };

  generateCombined();
}, [selectedLogo, logoPixelSize]);


useEffect(() => {
  if (!qrRef.current || !combinedLogo) return;

  const qr = new QRCodeStyling({
    width: qrBaseSize,
    height: qrBaseSize,
    data: "https://www.zmqrcode.in/",
    image: combinedLogo,
    dotsOptions: {
      color: qrColor,
      type: "rounded",
    },
    imageOptions: {
      hideBackgroundDots: true,
      crossOrigin: "anonymous",
      imageSize: Math.min(logoPixelSize / qrBaseSize, 1),
    },
    backgroundOptions: {
      color: "transparent",
    },
  });

  qrRef.current.innerHTML = ""; // ✅ clean previous canvas
  qr.append(qrRef.current);     // ✅ append new one

  qrInstance.current = qr;

  // No need to clean up manually — innerHTML clears everything each time
}, [combinedLogo, qrColor, qrBaseSize]);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="flex justify-center items-center">
      <div className="relative lg:w-[400px] lg:h-[370px] md:w-[350px] md:h-[350px] w-[310px] h-[250px]">

        {/* Sticker */}
        {selectedSticker && (
          <NextImage
            src={selectedSticker}
            alt="Sticker"
            fill
            className="absolute z-0 object-contain"
          />
        )}

        {/* Background */}
        {selectedQRShape && backgroundImage && (
          <div
            className="absolute z-10 overflow-hidden"
            style={{
              top: qrShapeTop,
              left: qrShapeLeft,
              transform: "translate(-50%, -50%)",
              width: `${qrShapeSize}px`,
              height: `${qrShapeSize}px`,
            }}
          >
            <NextImage
              src={backgroundImage}
              alt="Background"
              fill
              className="object-cover"
            />
          </div>
        )}

        {/* QR Shape */}
        {selectedQRShape && (
          <NextImage
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

        

        {/* Styled QR Code Canvas */}
        {selectedQRShape && (
          <div
            className="absolute z-50"
            style={{
              top: qrTop,
              left: qrLeft,
              transform: `translate(-50%, -50%) scale(${qrScaleFactor})`,
            }}
          >
            <div ref={qrRef} />
          </div>
        )}
      </div>
    </div>
  );
};

export default PreviewPanel;
