"use client";

import Image from "next/image";
import React from "react";

const QRShapes = ({ onSelectImage }) => {
    const images = [
        '/images/qr-shapes/qrshapes-1.webp',
        '/images/qr-shapes/qrshapes-2.webp',
        '/images/qr-shapes/qrshapes-3.webp',
        '/images/qr-shapes/qrshapes-4.webp',
         '/images/qr-shapes/qrshapes-5.webp',
        '/images/qr-shapes/qrshapes-6.webp',
         '/images/qr-shapes/qrshapes-7.webp',
        '/images/qr-shapes/qrshapes-8.webp',
        '/images/qr-shapes/qrshapes-9.webp',
        '/images/qr-shapes/qrshapes-10.webp',
         '/images/qr-shapes/qrshapes-11.webp',
        '/images/qr-shapes/qrshapes-12.webp',
 '/images/qr-shapes/qrshapes-13.webp',
        '/images/qr-shapes/qrshapes-14.webp',

  ];

  return (
    <section className="mt-6">
      <div className="grid grid-cols-8 gap-6">
        {images.map((src, index) => (
          <Image
            key={index}
            src={src}
            alt={`qr shape ${index + 1}`}
            width={60}
            height={60}
            className="cursor-pointer hover:scale-110 transition-transform"
            onClick={() => onSelectImage(src)}
            priority
          />
        ))}
      </div>


    </section>
  );
};

export default QRShapes;
