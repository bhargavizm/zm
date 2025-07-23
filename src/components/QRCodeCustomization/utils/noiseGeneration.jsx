"use client";
import useDesignContext from "@/components/hooks/useDesignContext";
import React from "react";
import { bodyFrames } from "../designTabs/qrFrames/qrFrameImages";
import { shapeDefinitions } from "../designTabs/qrShapes/shapes";

export const useGenerateNoiseElements = ({
  qrX,
  qrY,
  qrWidth,
  qrHeight,
  selectedBodyFrame,
  moduleShapes,
  selectedQRShape,
  fgColor,
  colorMode,
    foregroundColorMode,
  foregroundColor,
  foregroundGradientStart,
  foregroundGradientEnd,
}) => {
  const { fullSize, noiseDensity, canvasSize } = useDesignContext();

  return () => {
    const elements = [];
    const modulePath = bodyFrames?.[selectedBodyFrame];

    if (!modulePath) {
      console.warn(`⚠ bodyFrames["${selectedBodyFrame}"] is undefined.`);
      return elements;
    }

    const numElements = Math.floor(fullSize * fullSize * noiseDensity);
    const qrLeft = qrX;
    const qrRight = qrX + qrWidth;
    const qrTop = qrY;
    const qrBottom = qrY + qrHeight;

    const shapePathFunction = shapeDefinitions?.[selectedQRShape];
    if (!shapePathFunction) return [];

    // Create an offscreen canvas path for point-in-path checks
    const shapePath = new Path2D(shapePathFunction(canvasSize));
    const ctx = document.createElement("canvas").getContext("2d");

    const isInsideShape = (x, y) => {
      return ctx.isPointInPath(shapePath, x, y);
    };

    const getRandomPoint = () => {
      let x, y;
      let attempts = 0;

      do {
        if (++attempts > 200) break;

        x = Math.random() * canvasSize;
        y = Math.random() * canvasSize;

        const insideShape = isInsideShape(x, y);
        const outsideQR = x < qrLeft || x > qrRight || y < qrTop || y > qrBottom;

        if (insideShape && outsideQR) break;

        x = y = null;
      } while (x === null || y === null);

      return { x, y };
    };

    for (let i = 0; i < numElements; i++) {
      const { x, y } = getRandomPoint();
      const size = 0.8 + Math.random() * 0.4;
      const rotation = Math.random() * 360;
      
      elements.push(
        <path
          key={`noise-${i}`}
          d={modulePath}
          transform={`translate(${x}, ${y}) scale(${size}) rotate(${rotation})`}
          fill={
  foregroundColorMode === "gradient"
    ? "url(#qrGradient)"
    : foregroundColor
}

          opacity={0.8 + Math.random() * 0.2}
        />
      );
    }

    return elements;
  };
};
