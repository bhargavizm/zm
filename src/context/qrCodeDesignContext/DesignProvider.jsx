

"use client";

import React, { useEffect, useState } from "react";
import { DesignContext } from "./DesignContext";

const DesignProvider = ({ children }) => {
  const [selectedQRShape, setSelectedQRShape] = useState(null);
  const [selectedLogo, setSelectedLogo] = useState(null);
  const [selectedSticker, setSelectedSticker] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedShape, setSelectedShape] = useState(null);
  const [logoSize, setLogoSize] = useState(45);
   const [backgroundImage, setBackgroundImage] = useState(null);
 const [scale, setScale] = useState(55);
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
    setSelectedQRShape(localStorage.getItem("selectedQRShape"));
    setSelectedLogo(localStorage.getItem("selectedLogo"));
    setSelectedSticker(localStorage.getItem("selectedSticker"));
    setSelectedColor(localStorage.getItem("selectedColor"));
    setSelectedShape(localStorage.getItem("selectedShape"));
    // setBackgroundImage(localStorage.getItem("selectedShape"));
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
        selectedColor,
        setSelectedColor,
        selectedShape,
        setSelectedShape,
        logoSize,
  setLogoSize,backgroundImage, setBackgroundImage, scale, setScale,bgDesign, setBgDesign
      }}
    >
      {children}
    </DesignContext.Provider>
  );
};

export default DesignProvider;
