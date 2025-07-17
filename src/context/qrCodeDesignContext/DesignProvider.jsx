"use client";

import React, { useEffect, useState } from "react";
import { DesignContext } from "../qrCodeDesignContext/DesignContext";

const DEFAULT_QR_SHAPE = "/images/qr-shapes/circle.webp";
const DEFAULT_LOGO = "/images/logos/insta.webp";
const DEFAULT_STICKER = "/images/stickers/water.webp";

const DesignProvider = ({ children }) => {
    const [bgDesign, setBgDesign] = useState(null);

  const [selectedQRShape, setSelectedQRShape] = useState("square");
  const [selectedBodyFrame, setSelectedBodyFrame] = useState("heart");
  const [selectedEyeFrame, setSelectedEyeFrame] = useState("rounded");
  const [selectedEyeBall, setSelectedEyeBall] = useState("circle");
  const [selectedSticker, setSelectedSticker] = useState(DEFAULT_STICKER);
    const [selectedLogo, setSelectedLogo] = useState(DEFAULT_LOGO);
    const [backgroundImage, setBackgroundImage] = useState(null);

  const [matrix, setMatrix] = useState([]);
  const [text, setText] = useState("https://www.zmqrcode.in/");
  const [noiseDensity, setNoiseDensity] = useState(0.7);
  const [strokeWidth, setStrokeWidth] = useState(12);


const [logoSize, setLogoSize] = useState(30); // for inner selected logo
const [companyLogoSize, setCompanyLogoSize] = useState(180); // for outer company logo

  const [scale, setScale] = useState(160);
  const [isLoading, setIsLoading] = useState(false);


  const [qrColor, setQrColor] = useState("#000000");

  const [activeTabs, setActiveTabs] = useState({}); // { slug: tab }
  // const [qrColor, setQrColor] = useState("#000000");
  // const [qrGradient, setQrGradient] = useState(["#0eb424", "#df0808"]);
  // const [gradientType, setGradientType] = useState("linear-gradient");
  // const [qrMode, setQrMode] = useState("single");


    const moduleSize = 8;
  const padding = 2;
  const qrSize = matrix.length;
  const fullSize = qrSize + padding * 2;
  const canvasSize = 512;

  const setActiveTab = (slug, tab) => {
    setActiveTabs((prev) => ({ ...prev, [slug]: tab }));
  };

  const getActiveTab = (slug) => {
    return activeTabs[slug] || "Content";
  };

  // Load persisted values on mount
  // useEffect(() => {
  //   if (typeof window === "undefined") return;

  //   const savedQR = localStorage.getItem("selectedQRShape");
  //   const savedLogo = localStorage.getItem("selectedLogo");
  //   const savedSticker = localStorage.getItem("selectedSticker");
  //   const savedLogoSize = localStorage.getItem("logoSize");
  //   const savedScale = localStorage.getItem("scale");

  //   if (savedQR) setSelectedQRShape(savedQR);
  //   if (savedLogo) setSelectedLogo(savedLogo);
  //   if (savedSticker) setSelectedSticker(savedSticker);
  //   if (savedLogoSize) setLogoSize(parseInt(savedLogoSize));
  //   if (savedScale) setScale(parseInt(savedScale));
  // }, []);

  return (
    <DesignContext.Provider
      value={{
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
        companyLogoSize, setCompanyLogoSize,
        logoSize,
        setLogoSize,
        scale,
        setScale,
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
        bgDesign, setBgDesign,
        qrColor, setQrColor,
       activeTabs, setActiveTab, getActiveTab,
       qrColor,
        setQrColor,
        qrGradient,
        setQrGradient,
        gradientType,
        setGradientType,
        qrMode,
        setQrMode,

      //  activeTabs, setActiveTab, getActiveTab, selectedBodyFrame,
 

      }}
    >
      {children}
    </DesignContext.Provider>
  );
};

export default DesignProvider;

