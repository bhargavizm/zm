"use client";
import useDesignContext from "@/components/hooks/useDesignContext";
import Image from "next/image";
import React from "react";

const bgImages = [
  "/bg-images/7.webp",
  "/bg-images/8.webp",
  "/bg-images/9.webp",
  "/bg-images/10.webp",
  "/bg-images/11.webp",
  "/bg-images/12.webp",
  "/bg-images/13.webp",
  "/bg-images/14.webp",
  "/bg-images/15.webp",
  "/bg-images/16.webp",
  "/bg-images/17.webp",
  "/bg-images/18.webp",
  "/bg-images/19.webp",
  "/bg-images/21.webp",
  "/bg-images/22.webp",
  "/bg-images/23.webp",
  "/bg-images/24.webp",
  "/bg-images/25.webp",
  "/bg-images/26.webp",
  "/bg-images/27.webp",
  "/bg-images/28.webp",
  "/bg-images/29.webp",
  "/bg-images/30.webp",
  "/bg-images/31.webp",
];

const bgVideos = [
  "/bg-images/c.webm",
  "/bg-images/d.webm",
  // "/bg-images/e.webm",
  "/bg-images/g.webm",
  "/bg-images/h.webm",
  "/bg-images/i.webm",
  "/bg-images/j.webm",
  "/bg-images/m.webm",
  "/bg-images/n.webm",
  "/bg-images/o.webm",
  "/bg-images/s.webm",
  "/bg-images/t.webm",
  "/bg-images/f.webm",
  "/bg-images/l.webm",
  "/bg-images/r.webm",
];
const BackdropDesigns = () => {
  const { setIsLoading, setBgDesign, bgDesign } = useDesignContext();

  const handleSelect = (src) => {
    setIsLoading(true); // Start loader
    setBgDesign(src);
  };
  

  return (
    <section className="space-y-4 text-center">
      {/* Image grid */}

      <h2 className="text-3xl font-bold text-mainGreen text-center">Images</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 px-2 max-w-full">
        {bgImages.map((src, index) => (
          <div
            key={index}
            className={`relative w-full h-20 overflow-hidden rounded border-2 cursor-pointer ${
              bgDesign === src
                ? "border-[#008080] ring-1 ring-[#008080] p-1"
                : "border-gray-300"
            }`}
            onClick={() => handleSelect(src)}
          >
            <Image
              src={src}
              alt={`bg-image ${index + 1}`}
              width={300}
              height={80}
              className="rounded object-cover w-full h-full"
            />
          </div>
        ))}
      </div>

      {/* Video grid */}
      <h2 className="text-3xl font-bold text-mainGreen text-center">Videos</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 px-2 max-w-full">
        {bgVideos.map((videoSrc, index) => (
          <div
            key={index}
            className={`relative w-full h-20 overflow-hidden rounded border-2 cursor-pointer ${
              bgDesign === videoSrc
                ? "border-[#008080] ring-1 p-1 ring-[#008080]"
                : "border-gray-300"
            }`}
            onClick={() => handleSelect(videoSrc)}
          >
            <video
              src={videoSrc}
              className="object-cover rounded w-full h-full"
              muted
              loop
              playsInline
              autoPlay
              type='video/webm'
               preload="metadata"
              //  controls
            />

          </div>
        ))}
      </div>
    </section>
  );
};

export default BackdropDesigns;
