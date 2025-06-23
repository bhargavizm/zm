"use client";
import useDesignContext from "@/components/hooks/useDesignContext";
import Image from "next/image";
import React from "react";

const bgImages = [
  "/bg-images/7.png",
  "/bg-images/8.png",
  "/bg-images/9.png",
  "/bg-images/10.png",
  "/bg-images/11.png",
  "/bg-images/12.png",
  "/bg-images/13.png",
  "/bg-images/14.png",
  "/bg-images/15.png",
  "/bg-images/16.png",
  "/bg-images/17.png",
  "/bg-images/18.png",
  "/bg-images/19.png",
  "/bg-images/21.png",
  "/bg-images/22.png",
  "/bg-images/23.png",
  "/bg-images/24.png",
  "/bg-images/25.png",
  "/bg-images/26.png",
  "/bg-images/27.png",
  "/bg-images/28.jpg",
  "/bg-images/29.jpg",
  "/bg-images/30.jpg",
  "/bg-images/31.jpg",
];

const bgVideos = [
  "/bg-images/c.mp4",
  "/bg-images/d.mp4",
  "/bg-images/e.mp4",
  "/bg-images/g.mp4",
  "/bg-images/h.mp4",
  "/bg-images/i.mp4",
  "/bg-images/j.mp4",
  "/bg-images/m.mp4",
  "/bg-images/n.mp4",
  "/bg-images/o.mp4",
  "/bg-images/s.mp4",
  "/bg-images/t.mp4",
  "/bg-images/f.mp4",
  "/bg-images/l.mp4",
  "/bg-images/r.mp4",
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
            />

          </div>
        ))}
      </div>
    </section>
  );
};

export default BackdropDesigns;
