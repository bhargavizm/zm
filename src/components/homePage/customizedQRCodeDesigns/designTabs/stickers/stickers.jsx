// import Image from 'next/image';
// import React from 'react'
// import { stickers } from './stickerImages';

// const Stickers = ({ onSelectImage }) => {

//   return (

//         <section className="mt-6">
//              <div className="grid lg:grid-cols-8 md:grid-cols-6 sm:grid-cols-4 grid-cols-3 gap-6 h-[70vh] overflow-y-auto scrollbar-hide" >
//                {stickers.map((src, index) => (
//                  <Image
//                    key={index}
//                    src={src}
//                    alt={`qr shape ${index + 1}`}
//                    width={60}
//                    height={60}
//                    className="cursor-pointer hover:scale-110 transition-transform"
//                    onClick={() => onSelectImage(src)}
//                    priority
//                  />
//                ))}
//              </div>

//            </section>

//   )
// }

// export default Stickers

"use client";

import Image from "next/image";
import React, { useEffect, useRef } from "react";
import { stickerConfig } from "./stickerImages";
import useDesignContext from "@/components/hooks/useDesignContext";

const Stickers = ({ onSelectImage }) => {
  const { selectedSticker, setSelectedSticker } = useDesignContext();
  const containerRef = useRef(null);

  // Restore scroll position on mount
  useEffect(() => {
    const savedScroll = localStorage.getItem("stickersScroll");
    if (containerRef.current && savedScroll) {
      containerRef.current.scrollTop = parseInt(savedScroll, 100);
    }
  }, []);

  // Save scroll position on scroll
  const handleScroll = (e) => {
    localStorage.setItem("stickersScroll", e.target.scrollTop);
  };

  const handleClick = (src) => {
    setSelectedSticker(src);
    localStorage.setItem("selectedSticker", src); // persist selection
    onSelectImage(src);
  };

  return (
    <section className="mt-4 px-4">
      <div
        ref={containerRef}
        onScroll={handleScroll}
        className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-7 gap-5 pr-2"
      >
        {Object.keys(stickerConfig).map((src, index) => (
          <div
            key={index}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              handleClick(src);
            }}
            className={`aspect-square flex items-center justify-center rounded-xl border-4 cursor-pointer transition-transform duration-200 ${
              selectedSticker === src
                ? "border-mainGreen scale-105 shadow-md"
                : "border-transparent hover:border-gray-300"
            }`}
          >
            <Image
              src={src}
              alt={`sticker ${index + 1}`}
              width={60}
              height={60}
              className="object-contain w-16 h-16"
              priority
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default Stickers;
