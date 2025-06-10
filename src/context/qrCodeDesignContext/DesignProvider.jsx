
<<<<<<< HEAD
// 'use client'

// import React, { useState } from "react";
// import { DesignContext } from "./DesignContext";

// const DesignProvider = ({ children }) => {


//         const [selectedQRShape, setSelectedQRShape] = useState(null);
//         const [selectedLogo, setSelectedLogo] = useState(null);
//   return (
//     <>
//       <DesignContext.Provider value={{selectedQRShape, setSelectedQRShape,selectedLogo,setSelectedLogo}}>{children}</DesignContext.Provider>
//     </>
//   );
// };

// export default DesignProvider;
=======
>>>>>>> 8428f6bc963f2b9e53dfee6c6c8b7ce69a225361

"use client";

import React, { useEffect, useState } from "react";
import { DesignContext } from "./DesignContext";

const DesignProvider = ({ children }) => {
  const [selectedQRShape, setSelectedQRShape] = useState(null);
  const [selectedLogo, setSelectedLogo] = useState(null);
  const [selectedSticker, setSelectedSticker] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedShape, setSelectedShape] = useState(null);
  const [logoSize, setLogoSize] = useState(50);

useEffect(() => {
  if (typeof window !== "undefined") {
    const savedSize = parseInt(localStorage.getItem("logoSize"));
    if (savedSize) setLogoSize(savedSize);
  }
}, []);


  // Load from localStorage once on mount
  useEffect(() => {
    setSelectedQRShape(localStorage.getItem("selectedQRShape"));
    setSelectedLogo(localStorage.getItem("selectedLogo"));
    setSelectedSticker(localStorage.getItem("selectedSticker"));
    setSelectedColor(localStorage.getItem("selectedColor"));
    setSelectedShape(localStorage.getItem("selectedShape"));
  }, []);

  useEffect(() => {
  const size = parseInt(localStorage.getItem("logoSize"));
  if (size) setLogoSize(size);
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
  setLogoSize,
      }}
    >
      {children}
    </DesignContext.Provider>
  );
};

export default DesignProvider;
