"use client";

import Image from "next/image";
import React from "react";
import { images } from "./qrShapeImages";
import useDesignContext from "@/components/hooks/useDesignContext";

const QRShapes = ({ onSelectImage }) => {
  const { selectedQRShape, setSelectedQRShape } = useDesignContext();

  const handleClick = (src) => {
    setSelectedQRShape(src);
    localStorage.setItem("selectedQRShape", src); // Optional persistence
    onSelectImage(src);
  };

  return (
    <section className="mt-6">
      <div className="grid xl:grid-cols-7 lg:grid-cols-6 md:grid-cols-4 grid-cols-3 gap-8 h-[68vh] overflow-y-auto scrollbar-hide px-6 pt-4">
        {images.map((src, index) => (
          <Image
            key={index}
            src={src}
            alt={`qr shape ${index + 1}`}
            width={60}
            height={60}
            className={`cursor-pointer rounded-2xl border-4 transition-all duration-200 ${
              selectedQRShape === src
                ? "border-mainGreen scale-110 shadow-lg"
                : "border-transparent"
            }`}
            onClick={() => handleClick(src)}
            priority
          />
        ))}
      </div>
    </section>
  );
};

export default QRShapes;
