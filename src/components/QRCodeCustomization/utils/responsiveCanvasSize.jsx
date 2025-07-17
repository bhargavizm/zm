"use client";
import { useState, useEffect } from "react";

export const useResponsiveCanvasSize = () => {
  const [canvasSize, setCanvasSize] = useState(350);

  useEffect(() => {
    const updateSize = () => {
      const width = window.innerWidth;

      if (width < 480) setCanvasSize(60);       // small mobile
      else if (width < 768) setCanvasSize(320);  // large mobile
      else if (width < 1024) setCanvasSize(360); // tablet
      else setCanvasSize(400);                   // desktop
    };

    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  return canvasSize;
};
