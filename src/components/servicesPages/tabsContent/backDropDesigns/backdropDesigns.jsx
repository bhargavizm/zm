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
  const { bgDesign, setBgDesign } = useDesignContext();

  return (
    <section className="mt-6  space-y-6">
      {/* Image grid */}
      <div className="grid lg:grid-cols-6 md:grid-cols-4 grid-cols-3 gap-6">
        {bgImages.map((src, index) => (
          <div key={index} className="w-36 h-18 overflow-hidden transition-effects">
            <Image
              src={src}
              alt={`bg-image ${index + 7}`}
              width={64}
              height={64}
              className="cursor-pointer  rounded object-cover"
              onClick={() => setBgDesign(src)}
              priority
            />
          </div>
        ))}
      </div>

      {/* Video grid */}
      <div className="grid lg:grid-cols-5 md:grid-cols-4 grid-cols-2 gap-6">
        {bgVideos.map((videoSrc, index) => (
          <div key={index} className="w-24 h-20 overflow-hidden rounded transition-effects">
            <video
              src={videoSrc}
              className="w-full h-full object-cover cursor-pointer  rounded"
              onClick={() => setBgDesign(videoSrc)}
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
