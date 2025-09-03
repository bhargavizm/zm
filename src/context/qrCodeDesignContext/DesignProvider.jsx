"use client";

import React, { useEffect, useState } from "react";
import { DesignContext } from "../qrCodeDesignContext/DesignContext";
import { usePathname } from "next/navigation";



const DEFAULT_LOGO = "/images/logos/insta.webp";
const DEFAULT_STICKER = "/images/stickers/graduation.webp";
const DEFAULT_PREVIEW_IMAGE = "/invester.webp"; // 👈 default fallback image

const DesignProvider = ({ children }) => {
  const [bgDesign, setBgDesign] = useState(null);
  const [selectedQRShape, setSelectedQRShape] = useState("square");
  const [selectedBodyFrame, setSelectedBodyFrame] = useState("heart");
  const [selectedEyeFrame, setSelectedEyeFrame] = useState("rounded");
  const [selectedEyeBall, setSelectedEyeBall] = useState("circle");
  const [selectedSticker, setSelectedSticker] = useState(DEFAULT_STICKER);
  const [selectedQRCodeImage, setSelectedQRCodeImage] = useState("");
  const [selectedPremiumItem, setSelectedPremiumItem] = useState(false);
  const [backgroundImage, setBackgroundImage] = useState(null);
  const [imageScale, setImageScale] = useState(80);
  const [matrix, setMatrix] = useState([]);
  const [text, setText] = useState("https://www.zmqrcode.com/");
  const [qrCodeUrl, setQrCodeUrl] = useState("");
  const [noiseDensity, setNoiseDensity] = useState(0.2);
  const [strokeWidth, setStrokeWidth] = useState(8);
  const [selectedLogo, setSelectedLogo] = useState(DEFAULT_LOGO);
  const [logoSize, setLogoSize] = useState(35); // for inner selected logo
  const [companyLogoSize, setCompanyLogoSize] = useState(105); // for outer company logo
  const [customLogo, setCustomLogo] = useState(null);
  const [freePlanCount, setFreePlanCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [qrColor, setQrColor] = useState("#000000");
  const [activeTabs, setActiveTabs] = useState({}); // { slug: tab }
  // const [qrColor, setQrColor] = useState("#000000");
  //sticker,shapes
   const [premiumEnabled, setPremiumEnabled] = useState(false);
  const [showPremiumModal, setShowPremiumModal] = useState(false);

    const pathname = usePathname();

  const moduleSize = 8;
  const padding = 2;
  const qrSize = matrix.length;
  const fullSize = qrSize + padding * 2;
  const canvasSize = 400;
  // const canvasSize = useResponsiveCanvasSize(); // ✅ dynamic

  // const canvasSize = 400;

  const [foregroundColorMode, setForegroundColorMode] = useState("single"); // or "gradient"
  const [foregroundColor, setForegroundColor] = useState("#000000");
  const [foregroundGradientStart, setForegroundGradientStart] =
    useState("#000000");
  const [foregroundGradientEnd, setForegroundGradientEnd] = useState("#ffffff");

  const [eyeFrameColorMode, setEyeFrameColorMode] = useState("single");
  const [eyeFrameColor, setEyeFrameColor] = useState("#000000");
  const [eyeFrameGradientStart, setEyeFrameGradientStart] = useState("#000000");
  const [eyeFrameGradientEnd, setEyeFrameGradientEnd] = useState("#ffffff");

  const [eyeballColorMode, setEyeballColorMode] = useState("single");
  const [eyeballColor, setEyeballColor] = useState("#000000");
  const [eyeballGradientStart, setEyeballGradientStart] = useState("#000000");
  const [eyeballGradientEnd, setEyeballGradientEnd] = useState("#ffffff");

  const [borderColorMode, setBorderColorMode] = useState("single");
  const [borderColor, setBorderColor] = useState("#000000");
  const [borderGradientStart, setBorderGradientStart] = useState("#000000");
  const [borderGradientEnd, setBorderGradientEnd] = useState("#ffffff");

  // const [isForegroundEnabled, setIsForegroundEnabled] = useState(true);
  // const [isEyeFrameEnabled, setIsEyeFrameEnabled] = useState(true);
  // const [isEyeballEnabled, setIsEyeballEnabled] = useState(true);
  // const [isBorderEnabled, setIsBorderEnabled] = useState(true);

  const setActiveTab = (slug, tab) => {
    setActiveTabs((prev) => ({ ...prev, [slug]: tab }));
  };

  const getActiveTab = (slug) => {
    return activeTabs[slug] || "Content";
  };

  // Reset function to clear everything and set default preview
  const resetPreview = () => {
    setBgDesign(null);
    setSelectedQRShape("square"); // 👈 fallback shape
    setSelectedBodyFrame("heart"); // 👈 fallback body frame
    setSelectedEyeFrame("rounded"); // 👈 fallback eye frame
    setSelectedEyeBall("circle"); // 👈 fallback eyeball
    setSelectedLogo(DEFAULT_LOGO); // 👈 fallback logo
    setSelectedSticker(DEFAULT_STICKER); // 👈 fallback sticker
    setBackgroundImage(null);

     setPremiumEnabled(false);
  setShowPremiumModal(false);
  setSelectedPremiumItem(false);
  };

    useEffect(() => {
    if (pathname?.startsWith("/services/")) {
      resetPreview();
    }
  }, [pathname]);

  // Load persisted values on mount
  // useEffect(() => {
  //   if (typeof window === "undefined") return;

  //   const savedQR = localStorage.getItem("selectedQRShape");
  //   const savedLogo = localStorage.getItem("selectedLogo");
  //   const savedSticker = localStorage.getItem("selectedSticker");
  //   // const savedLogoSize = localStorage.getItem("logoSize");
  //   // const savedScale = localStorage.getItem("scale");

  //   if (savedQR) setSelectedQRShape(savedQR);
  //   if (savedLogo) setSelectedLogo(savedLogo);
  //   if (savedSticker) setSelectedSticker(savedSticker);
  //   // if (savedLogoSize) setLogoSize(parseInt(savedLogoSize));
  //   // if (savedScale) setScale(parseInt(savedScale));
  // }, []);



  return (
    <DesignContext.Provider
      value={{
        premiumEnabled, setPremiumEnabled,showPremiumModal, setShowPremiumModal,
        selectedPremiumItem, setSelectedPremiumItem,
        selectedQRCodeImage,
        setSelectedQRCodeImage,
        resetPreview,
        text,
        setText,
        matrix,
        setMatrix,
        noiseDensity,
        setNoiseDensity,
        strokeWidth,
        setStrokeWidth,
        moduleSize,
        selectedQRShape,
        padding,
        qrSize,
        fullSize,
        canvasSize,
        setSelectedQRShape,
        selectedSticker,
        setSelectedSticker,
        selectedLogo,
        setSelectedLogo,
        backgroundImage,
        setBackgroundImage,
        companyLogoSize,
        setCompanyLogoSize,
        logoSize,
        setLogoSize,
        imageScale,
        setImageScale,
        isLoading,
        setIsLoading,
        bgDesign,
        setBgDesign,
        qrColor,
        setQrColor,
        activeTabs,
        setActiveTab,
        getActiveTab,
        selectedBodyFrame,
        setSelectedBodyFrame,
        selectedEyeFrame,
        setSelectedEyeFrame,
        selectedEyeBall,
        setSelectedEyeBall,
        bgDesign,
        setBgDesign,
        qrColor,
        setQrColor,
        activeTabs,
        setActiveTab,
        getActiveTab,
        qrColor,
        setQrColor,
        foregroundColorMode,
        setForegroundColorMode,
        foregroundColor,
        setForegroundColor,
        foregroundGradientStart,
        setForegroundGradientStart,
        foregroundGradientEnd,
        setForegroundGradientEnd,
        // isForegroundEnabled,
        // setIsForegroundEnabled,
        eyeFrameColorMode,
        setEyeFrameColorMode,
        eyeFrameColor,
        setEyeFrameColor,
        eyeFrameGradientStart,
        setEyeFrameGradientStart,
        eyeFrameGradientEnd,
        setEyeFrameGradientEnd,
        // isEyeFrameEnabled,
        // setIsEyeFrameEnabled,
        customLogo,
        setCustomLogo,
        eyeballColorMode,
        setEyeballColorMode,
        eyeballColor,
        setEyeballColor,
        eyeballGradientStart,
        setEyeballGradientStart,
        eyeballGradientEnd,
        setEyeballGradientEnd,
        // isEyeballEnabled,
        // setIsEyeballEnabled,

        borderColorMode,
        setBorderColorMode,
        borderColor,
        setBorderColor,
        borderGradientStart,
        setBorderGradientStart,
        borderGradientEnd,
        setBorderGradientEnd,
        qrCodeUrl,
        setQrCodeUrl,
        freePlanCount,
        setFreePlanCount,
        // isBorderEnabled,
        // setIsBorderEnabled,
      }}
    >
      {children}
    </DesignContext.Provider>
  );
};

export default DesignProvider;
