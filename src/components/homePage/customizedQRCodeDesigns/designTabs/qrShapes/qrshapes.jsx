"use client";

import Image from "next/image";
import React from "react";
import { images } from "./qrShapeImages";

const QRShapes = ({ onSelectImage }) => {


  return (
    <section className="mt-6">
      <div className="grid xl:grid-cols-7 lg:grid-cols-6 md:grid-cols-4 grid-cols-3 gap-8  h-[65vh] overflow-y-auto scrollbar-hide px-6">
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
