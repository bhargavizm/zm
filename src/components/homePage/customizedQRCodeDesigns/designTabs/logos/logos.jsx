"use client";
import useDesignContext from "@/components/hooks/useDesignContext";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { logos } from "./logoImages";

const Logos = ({ onSelectImage }) => {


  const { logoSize, setLogoSize } = useDesignContext();
  const [showWarning, setShowWarning] = useState(false);

  // Check if logo size is too large (more than 25% of QR size)
  useEffect(() => {
    setShowWarning(logoSize > 47); // Adjust threshold as needed
  }, [logoSize]);

  const handleSliderChange = (e) => {
    const value = parseInt(e.target.value);
    setLogoSize(value);
    localStorage.setItem("logoSize", value);
  };

  const handleReset = () => {
    setLogoSize(45); // Default size
    localStorage.setItem("logoSize", 45);
  };

  return (
    <section className="">
      <div className="grid lg:grid-cols-8 md:grid-cols-6 sm:grid-cols-4 grid-cols-3 gap-6  mb-9 h-[70vh] overflow-y-auto scrollbar-hide">
        {logos.map((src, index) => (
          <Image
            key={index}
            src={src}
            alt={`Logo ${index + 1}`}
            width={60}
            height={60}
            className="cursor-pointer hover:scale-110 transition-transform"
            onClick={() => onSelectImage(src)}
            priority
          />
        ))}
      </div>

      <div className="mb-2 flex flex-col items-start">
        <div className="flex justify-start items-center gap-9 w-full mb-4">
          <label htmlFor="logo-size" className="text-lg font-medium text-darkGreen">
            Logo Scaling:
          </label>
          {showWarning && (
            <span className="text-red-500 text-sm font-bold">
              ⚠️ QR Code may not scan, please test!
            </span>
          )}
        </div>

        <input
          type="range"
          id="logo-size"
          min="20"
          max="120"
          step="5"
          value={logoSize}
          onChange={handleSliderChange}
          className="w-96 accent-mainGreen mb-2"
        />

          <button
            onClick={handleReset}
            className="text-md text-mainGreen hover:underline"
          >
            Reset
          </button>
      </div>
    </section>
  );
};

export default Logos;
