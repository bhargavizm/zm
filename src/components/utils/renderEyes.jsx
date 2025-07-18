
// utils/renderEyes.js
import useDesignContext from "@/components/hooks/useDesignContext";
import React from "react";
import { eyeballFrames, eyeFrames } from "../QRCodeCustomization/QRCodeCustomization/designTabs/qrFrames/qrFrameImages";
//import { eyeFrames, eyeballShapes } from "@/components/shapes/qrShapes";

export const useRenderEyes = () => {
  const {
    matrix,
    moduleSize,
    padding,
    qrSize,
    selectedEyeFrame,
    selectedEyeBall,
    colorMode,
    qrColor,
  } = useDesignContext();

  return () => {
    if (matrix.length < 7) return null;

    const eyeSize = 7;
    const eyeModuleSize = eyeSize * moduleSize;
    const eyes = [
      { x: padding * moduleSize, y: padding * moduleSize },
      {
        x: (padding + qrSize - eyeSize) * moduleSize,
        y: padding * moduleSize,
      },
      {
        x: padding * moduleSize,
        y: (padding + qrSize - eyeSize) * moduleSize,
      },
    ];

    const EyeFrameComponent = eyeFrames[selectedEyeFrame];
    const EyeballComponent = eyeballFrames[selectedEyeBall];

    return eyes.map((eye, index) => (
      <g key={`eye-${index}`}>
        {EyeFrameComponent(
          eye.x,
          eye.y,
          eyeModuleSize,
          colorMode === "gradient" ? "url(#qrGradient)" : qrColor
        )}
        {EyeballComponent(
          eye.x + eyeModuleSize / 4,
          eye.y + eyeModuleSize / 4,
          eyeModuleSize / 2,
          colorMode === "gradient" ? "url(#qrGradient)" : qrColor
        )}
      </g>
    ));
  };
};
