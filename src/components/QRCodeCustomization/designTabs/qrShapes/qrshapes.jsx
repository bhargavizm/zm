"use client";

import React, { useRef, useEffect } from "react";
import useDesignContext from "@/components/hooks/useDesignContext";
import usePremiumContext from "@/components/hooks/usePremiumContext";
import PremiumModal from "@/components/modalPopUps/premiumServicesModal";
import { shapeDefinitions } from "./shapes";

const QRShapes = () => {
  const {
    selectedQRShape,
    setSelectedQRShape,
    setStrokeWidth,
    strokeWidth,
    canvasSize,
    setNoiseDensity,
    noiseDensity,
    setSelectedPremiumItem,
  } = useDesignContext();

  const {
    premiumEnabled,
    setPremiumEnabled,
    showPremiumModal,
    setShowPremiumModal,
  } = usePremiumContext();

  const ref = useRef();

  useEffect(() => {
    const scroll = localStorage.getItem("qrShapesScroll");
    if (ref.current && scroll) ref.current.scrollTop = parseInt(scroll, 10);
  }, []);

  const shapeKeys = Object.keys(shapeDefinitions);
  const freeShapes = shapeKeys.slice(0, 7);
  const premiumShapes = shapeKeys.slice(7);

  const handleClick = (shapeKey, isPremium) => {
    if (isPremium && !premiumEnabled) {
      setShowPremiumModal(true);
    } else {
      setSelectedQRShape(shapeKey);
      localStorage.setItem("selectedQRShape", shapeKey);

      // ✅ If premium shape, mark selectedPremiumItem true
      if (isPremium) setSelectedPremiumItem(true);
    }
  };

  const handleToggle = () => {
    if (!premiumEnabled) {
      setShowPremiumModal(true);
    } else {
      setPremiumEnabled(false);
    }
  };
  const renderShapeBox = (shape, isPremium) => {
    const isSelected = selectedQRShape === shape;

    const handleDeselect = (e) => {
      e.stopPropagation(); // prevent triggering parent onClick
      setSelectedQRShape(null);
      localStorage.removeItem("selectedQRShape");
    };

    return (
      <div
        key={shape}
        onClick={() => handleClick(shape, isPremium)}
        className={`relative aspect-square flex items-center justify-center rounded-xl border-4 cursor-pointer transition-transform duration-200 ${
          isSelected
            ? "border-mainGreen scale-105 shadow-md"
            : "border-transparent hover:border-gray-300"
        }`}
      >
        <svg
          width="60"
          height="60"
          viewBox={`0 0 ${canvasSize} ${canvasSize}`}
          className={`p-1 ${
            !premiumEnabled && isPremium ? "opacity-70 blur-[1px]" : ""
          }`}
        >
          <path
            d={shapeDefinitions[shape](canvasSize)}
            fill="none"
            stroke="black"
            strokeWidth="20"
          />
        </svg>

        {isPremium && !premiumEnabled && (
          <span className="absolute bottom-1 right-1 bg-mainGreen text-white text-[10px] px-1.5 py-0.5 rounded shadow-sm">
            Premium
          </span>
        )}

        {/* X Icon on selected */}
        {isSelected && (
          <button
            onClick={handleDeselect}
            className="absolute top-[-10px] right-[-10px] bg-mainGreen text-white rounded-full w-6 h-6 flex items-center justify-center text-sm shadow-md cursor-pointer"
          >
            ×
          </button>
        )}
      </div>
    );
  };

  return (
    <>
      <section className="mt-4 px-4">
        <PremiumModal />

        {/* Row 1: Free SVG Shapes */}
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-7 gap-5 pr-2 mb-6">
          {freeShapes.map((shape) => renderShapeBox(shape, false))}
        </div>

        {/* Row 2: Premium Toggle */}
        <div className="flex justify-center mb-6">
          <div className="flex items-center gap-3">
            <span className="text-sm font-medium text-gray-700">Premium</span>
            <button
              type="button"
              onClick={handleToggle}
              className={`relative inline-flex cursor-pointer h-7 w-14 items-center rounded-full transition-colors duration-300 ${
                premiumEnabled ? "bg-[#008080]" : "bg-gray-300"
              }`}
            >
              <span
                className={`absolute left-1 top-1 h-5 w-5 rounded-full bg-white shadow-md transition-all duration-300 ${
                  premiumEnabled ? "translate-x-7" : "translate-x-0"
                }`}
              />
            </button>
          </div>
        </div>

        {/* Row 3: Premium SVG Shapes */}
        <div
          ref={ref}
          className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-7 gap-5 pr-2"
        >
          {premiumShapes.map((shape) => renderShapeBox(shape, true))}
        </div>

        <div>
          <label className="block text-sm font-medium my-4">
            Noise Density
          </label>
          <input
            type="range"
            min="0.1"
            max="0.9"
            step="0.05"
            value={noiseDensity}
            onChange={(e) => setNoiseDensity(parseFloat(e.target.value))}
            className="w-full accent-mainGreen"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Border Width</label>
          <input
            type="range"
            min="1"
            max="30"
            step="1"
            value={strokeWidth}
            onChange={(e) => setStrokeWidth(parseInt(e.target.value))}
            className="w-full accent-mainGreen"
          />
        </div>
      </section>
    </>
  );
};

export default QRShapes;
