"use client";

import React, { useEffect, useState } from "react";
import { DesignContext } from "../qrCodeDesignContext/DesignContext";

const DEFAULT_QR_SHAPE = "/images/qr-shapes/circle.webp";
const DEFAULT_LOGO = "/images/logos/insta.webp";
const DEFAULT_STICKER = "/images/stickers/water.webp";

const DesignProvider = ({ children }) => {
  const [selectedQRShape, setSelectedQRShape] = useState(DEFAULT_QR_SHAPE);
  const [selectedSticker, setSelectedSticker] = useState(DEFAULT_STICKER);
  const [selectedLogo, setSelectedLogo] = useState(DEFAULT_LOGO);
  const [backgroundImage, setBackgroundImage] = useState(null);
  const [logoSize, setLogoSize] = useState(45);
  const [scale, setScale] = useState(160);
  const [isLoading, setIsLoading] = useState(false);
  const [bgDesign, setBgDesign] = useState(null);
 

  const [activeTabs, setActiveTabs] = useState({}); // { slug: tab }
  const [qrColor, setQrColor] = useState("#000000");
  const [qrGradient, setQrGradient] = useState(["#0eb424", "#df0808"]);
  const [gradientType, setGradientType] = useState("linear-gradient");
  const [qrMode, setQrMode] = useState("single");


const setActiveTab = (slug, tab) => {
  setActiveTabs((prev) => ({ ...prev, [slug]: tab }));
};

const getActiveTab = (slug) => {
  return activeTabs[slug] || "Content";
};


  // Load persisted values on mount
  useEffect(() => {
    if (typeof window === "undefined") return;

    const savedQR = localStorage.getItem("selectedQRShape");
    const savedLogo = localStorage.getItem("selectedLogo");
    const savedSticker = localStorage.getItem("selectedSticker");
    const savedLogoSize = localStorage.getItem("logoSize");
    const savedScale = localStorage.getItem("scale");

    if (savedQR) setSelectedQRShape(savedQR);
    if (savedLogo) setSelectedLogo(savedLogo);
    if (savedSticker) setSelectedSticker(savedSticker);
    if (savedLogoSize) setLogoSize(parseInt(savedLogoSize));
    if (savedScale) setScale(parseInt(savedScale));
  }, []);

  return (
    <DesignContext.Provider
      value={{
        selectedQRShape,
        setSelectedQRShape,
        selectedSticker,
        setSelectedSticker,
        selectedLogo,
        setSelectedLogo,
        backgroundImage,
        setBackgroundImage,
        logoSize,
        setLogoSize,
        scale,
        setScale,
        isLoading,
        setIsLoading,
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


      }}
    >
      {children}
    </DesignContext.Provider>
  );
};

export default DesignProvider;
// "use client";

// import React, { useEffect, useState } from "react";
// import { DesignContext } from "./DesignContext";

// const DesignProvider = ({ children }) => {
//     const [isLoading, setIsLoading] = useState(false);
//   const [selectedQRShape, setSelectedQRShape] = useState(null);
//   const [selectedLogo, setSelectedLogo] = useState(null);
//   const [selectedSticker, setSelectedSticker] = useState(null);
//   // const [selectedColor, setSelectedColor] = useState(null);
//   // const [selectedShape, setSelectedShape] = useState(null);
//   const [logoSize, setLogoSize] = useState(45);
//   const [backgroundImage, setBackgroundImage] = useState(null);
//   const [scale, setScale] = useState(80);
//   const [bgDesign, setBgDesign] = useState(null);


//   useEffect(() => {
//     if (typeof window !== "undefined") {
//       const savedSize = parseInt(localStorage.getItem("logoSize"));
//       if (savedSize) setLogoSize(savedSize);

//       const savedScale = parseInt(localStorage.getItem("scale"));
//       if (savedScale) setScale(savedScale);
//     }
//   }, []);

//   // Load from localStorage once on mount
//   useEffect(() => {
//     setSelectedQRShape(
//       localStorage.getItem("selectedQRShape") ||
//         "/images/qr-shapes/circle.png"
//     );
//     setSelectedLogo(
//       localStorage.getItem("selectedLogo") || "/images/logos/wifi.webp"
//     );
//     setSelectedSticker(
//       localStorage.getItem("selectedSticker") ||
//         "/images/stickers/e.webp"
//     );
//     // setSelectedColor(localStorage.getItem("selectedColor") || "#000000");
//     // setSelectedShape(localStorage.getItem("selectedShape") || "square");
//   }, []);

//   useEffect(() => {
//     const size = parseInt(localStorage.getItem("logoSize"));

//     if (size) setLogoSize(size);
//     const imageScale = parseInt(localStorage.getItem("scale"));
//     if (imageScale) setScale(imageScale);
//   }, []);

//   return (
//     <DesignContext.Provider
//       value={{
//         selectedQRShape,
//         setSelectedQRShape,
//         selectedLogo,
//         setSelectedLogo,
//         selectedSticker,
//         setSelectedSticker,
//         // selectedColor,
//         // setSelectedColor,
//         // selectedShape,
//         // setSelectedShape,
//         logoSize,
//         setLogoSize,
//         backgroundImage,
//         setBackgroundImage,
//         scale,
//         setScale,
//         bgDesign,
//         setBgDesign,
//         isLoading,
//         setIsLoading,
//       }}
//     >
//       {children}
//     </DesignContext.Provider>
//   );
// };

// export default DesignProvider;
