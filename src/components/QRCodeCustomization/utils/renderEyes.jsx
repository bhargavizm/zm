// utils/renderEyes.js
import useDesignContext from "@/components/hooks/useDesignContext";
import React from "react";
import { eyeballFrames, eyeFrames } from "../designTabs/qrFrames/qrFrameImages";

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
    eyeFrameColorMode,
    eyeFrameColor,
    eyeFrameGradientStart,
    eyeFrameGradientEnd,
    eyeballColorMode,
    eyeballColor,
    eyeballGradientStart,
    eyeballGradientEnd,
    backgroundImage, // 🆕 Get background image
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

    // 🧠 Override to black if background image is selected
    const effectiveEyeFrameFill =
      backgroundImage 
        ? "#000000"
        : eyeFrameColorMode === "gradient"
        ? "url(#eyeFrameGradient)"
        : eyeFrameColor;

    const effectiveEyeballFill =
      backgroundImage
        ? "#000000"
        : eyeballColorMode === "gradient"
        ? "url(#eyeballGradient)"
        : eyeballColor;

    return eyes.map((eye, index) => (
      <g key={`eye-${index}`}>
        {EyeFrameComponent(
          eye.x,
          eye.y,
          eyeModuleSize,
          effectiveEyeFrameFill
        )}
        {EyeballComponent(
          eye.x + eyeModuleSize / 4,
          eye.y + eyeModuleSize / 4,
          eyeModuleSize / 2,
          effectiveEyeballFill
        )}
      </g>
    ));
  };
};
