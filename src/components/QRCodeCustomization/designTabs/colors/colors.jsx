"use client";

import React, { useState } from "react";
import useDesignContext from "@/components/hooks/useDesignContext";
import { ColorPickerGroup } from "./colorPickerGroup";


const Colors = () => {
  const {
    foregroundColorMode, setForegroundColorMode,
    foregroundColor, setForegroundColor,
    foregroundGradientStart, setForegroundGradientStart,
    foregroundGradientEnd, setForegroundGradientEnd,
    // isForegroundEnabled, setIsForegroundEnabled,

    eyeFrameColorMode, setEyeFrameColorMode,
    eyeFrameColor, setEyeFrameColor,
    eyeFrameGradientStart, setEyeFrameGradientStart,
    eyeFrameGradientEnd, setEyeFrameGradientEnd,
    // isEyeFrameEnabled, setIsEyeFrameEnabled,

    eyeballColorMode, setEyeballColorMode,
    eyeballColor, setEyeballColor,
    eyeballGradientStart, setEyeballGradientStart,
    eyeballGradientEnd, setEyeballGradientEnd,
    // isEyeballEnabled, setIsEyeballEnabled,

    borderColorMode, setBorderColorMode,
    borderColor, setBorderColor,
    borderGradientStart, setBorderGradientStart,
    borderGradientEnd, setBorderGradientEnd,
    // isBorderEnabled, setIsBorderEnabled,
  } = useDesignContext();

  const [activePicker, setActivePicker] = useState(null); // shared key like 'Foreground_single', 'Border_end'


  return (
    <div className="p-4 w-full space-y-6">
      <h2 className="text-lg font-semibold mb-4">Customize QR Code Colors</h2>

      <ColorPickerGroup
        label="Border Color"
        colorMode={borderColorMode}
        setColorMode={setBorderColorMode}
        singleColor={borderColor}
        setSingleColor={setBorderColor}
        startColor={borderGradientStart}
        setStartColor={setBorderGradientStart}
        endColor={borderGradientEnd}
        setEndColor={setBorderGradientEnd}
        // isEnabled={isBorderEnabled}
        // setIsEnabled={setIsBorderEnabled}
         activePicker={activePicker}
  setActivePicker={setActivePicker}
      />

      <ColorPickerGroup
        label="Foreground Color"
        colorMode={foregroundColorMode}
        setColorMode={setForegroundColorMode}
        singleColor={foregroundColor}
        setSingleColor={setForegroundColor}
        startColor={foregroundGradientStart}
        setStartColor={setForegroundGradientStart}
        endColor={foregroundGradientEnd}
        setEndColor={setForegroundGradientEnd}
        // isEnabled={isForegroundEnabled}
        // setIsEnabled={setIsForegroundEnabled}
         activePicker={activePicker}
  setActivePicker={setActivePicker}
      />

      <ColorPickerGroup
        label="Eye Frame Color"
        colorMode={eyeFrameColorMode}
        setColorMode={setEyeFrameColorMode}
        singleColor={eyeFrameColor}
        setSingleColor={setEyeFrameColor}
        startColor={eyeFrameGradientStart}
        setStartColor={setEyeFrameGradientStart}
        endColor={eyeFrameGradientEnd}
        setEndColor={setEyeFrameGradientEnd}
        // isEnabled={isEyeFrameEnabled}
        // setIsEnabled={setIsEyeFrameEnabled}
         activePicker={activePicker}
  setActivePicker={setActivePicker}
      />

      <ColorPickerGroup
        label="Eyeball Color"
        colorMode={eyeballColorMode}
        setColorMode={setEyeballColorMode}
        singleColor={eyeballColor}
        setSingleColor={setEyeballColor}
        startColor={eyeballGradientStart}
        setStartColor={setEyeballGradientStart}
        endColor={eyeballGradientEnd}
        setEndColor={setEyeballGradientEnd}
        // isEnabled={isEyeballEnabled}
        // setIsEnabled={setIsEyeballEnabled}
         activePicker={activePicker}
  setActivePicker={setActivePicker}
      />


    </div>
  );
};

export default Colors;
