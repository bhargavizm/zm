"use client";

import React, { useEffect, useState } from "react";
import { DesignContext } from "./DesignContext";

const DesignProvider = ({ children }) => {
    const [isLoading, setIsLoading] = useState(false);
  const [selectedQRShape, setSelectedQRShape] = useState(null);
  const [selectedLogo, setSelectedLogo] = useState(null);
  const [selectedSticker, setSelectedSticker] = useState(null);
  // const [selectedColor, setSelectedColor] = useState(null);
  // const [selectedShape, setSelectedShape] = useState(null);
  const [logoSize, setLogoSize] = useState(45);
  const [backgroundImage, setBackgroundImage] = useState(null);
  const [scale, setScale] = useState(80);
  const [bgDesign, setBgDesign] = useState(null);


  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedSize = parseInt(localStorage.getItem("logoSize"));
      if (savedSize) setLogoSize(savedSize);

      const savedScale = parseInt(localStorage.getItem("scale"));
      if (savedScale) setScale(savedScale);
    }
  }, []);

  // Load from localStorage once on mount
  useEffect(() => {
    setSelectedQRShape(
      localStorage.getItem("selectedQRShape") ||
        "/images/qr-shapes/qrshapes-15.webp"
    );
    setSelectedLogo(
      localStorage.getItem("selectedLogo") || "/images/logos/zm-logo.png"
    );
    setSelectedSticker(
      localStorage.getItem("selectedSticker") ||
        "/images/stickers/stickers-4.svg"
    );
    // setSelectedColor(localStorage.getItem("selectedColor") || "#000000");
    // setSelectedShape(localStorage.getItem("selectedShape") || "square");
  }, []);

  useEffect(() => {
    const size = parseInt(localStorage.getItem("logoSize"));

    if (size) setLogoSize(size);
    const imageScale = parseInt(localStorage.getItem("scale"));
    if (imageScale) setScale(imageScale);
  }, []);

  return (
    <DesignContext.Provider
      value={{
        selectedQRShape,
        setSelectedQRShape,
        selectedLogo,
        setSelectedLogo,
        selectedSticker,
        setSelectedSticker,
        // selectedColor,
        // setSelectedColor,
        // selectedShape,
        // setSelectedShape,
        logoSize,
        setLogoSize,
        backgroundImage,
        setBackgroundImage,
        scale,
        setScale,
        bgDesign,
        setBgDesign,
        isLoading,
        setIsLoading,
      }}
    >
      {children}
    </DesignContext.Provider>
  );
};

export default DesignProvider;
