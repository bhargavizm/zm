"use client";

import Image from "next/image";
import React from "react";
import { images } from "./qrShapeImages";

const QRShapes = ({ onSelectImage }) => {


  return (
    <section className="mt-6">
      <div className="grid grid-cols-6 gap-6  h-[70vh] overflow-y-auto scrollbar-hide">
        {images.map((src, index) => (
          <Image
            key={index}
            src={src}
            alt={`qr shape ${index + 1}`}
            width={60}
            height={60}
            className="cursor-pointer hover:border hover:border-green-500 hover:p-2 transition-effects"
            onClick={() => onSelectImage(src)}
            priority
          />
        ))}
      </div>


    </section>
  );
};

export default QRShapes;
