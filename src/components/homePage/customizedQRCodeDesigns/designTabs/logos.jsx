"use client";
import useDesignContext from "@/components/hooks/useDesignContext";
import Image from "next/image";
import React from "react";

const Logos = ({ onSelectImage }) => {
  const logos = [
    "/images/logos/cloud.svg",
    "/images/logos/facebook.svg",
    "/images/logos/snapchat.svg",
    "/images/logos/youtube.svg",
  ];

  const { logoSize, setLogoSize } = useDesignContext();

  const handleSliderChange = (e) => {
    const value = parseInt(e.target.value);
    setLogoSize(value);
    localStorage.setItem("logoSize", value); // Optional persistence
  };

  return (
    <section>
      <div className="flex gap-4 flex-wrap mb-4">
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
  <label htmlFor="logo-size" className="block mb-1 text-lg font-medium">
    Logo Scaling:
  </label>
  <input
    type="range"
    id="logo-size"
    min="20"
    max="120"
    step="5"
    value={logoSize}
    onChange={handleSliderChange}
    className="w-96 accent-mainGreen"
  />
</div>

      
    </section>
  );
};

export default Logos;
