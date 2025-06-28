
'use client';

import useDesignContext from "@/components/hooks/useDesignContext";
import React, { useEffect, useRef } from "react";
import { images } from "./qrShapeImages";
import Image from "next/image";

const QRShapes = ({ onSelectImage }) => {
  const { selectedQRShape, setSelectedQRShape } = useDesignContext();
  const containerRef = useRef(null);

  // On mount, restore scroll
  useEffect(() => {
    const savedScroll = localStorage.getItem("qrShapesScroll");
    if (containerRef.current && savedScroll) {
      containerRef.current.scrollTop = parseInt(savedScroll, 10);
    }
  }, []);

  // On scroll, save position
  const handleScroll = (e) => {
    localStorage.setItem("qrShapesScroll", e.target.scrollTop);
  };

  const handleClick = (src) => {
    setSelectedQRShape(src);
    localStorage.setItem("selectedQRShape", src);
    onSelectImage(src);
  };

  return (
    <section className="mt-4 px-4">
      <div
        ref={containerRef}
        onScroll={handleScroll}
        className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-7 gap-5 pr-2" // Add height
      >
        {images.map((src, index) => (
          <div
            key={index}
            onClick={() => handleClick(src)}
            className={`w-full aspect-square flex items-center justify-center rounded-xl border-4 cursor-pointer transition-transform duration-200 ${
              selectedQRShape === src
                ? "border-mainGreen scale-105 shadow-md"
                : "border-transparent hover:border-gray-300"
            }`}
          >
            <Image
              src={src}
              alt={`qr shape ${index + 1}`}
              width={72}
              height={72}
              className="object-contain w-14 h-14"
              priority
            />
          </div>
        ))}
      </div>
    </section>
  );
};
export default QRShapes;