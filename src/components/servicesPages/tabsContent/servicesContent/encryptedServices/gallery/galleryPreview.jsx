"use client";

import React, { useEffect, useMemo } from "react";
import Image from "next/image";
import Slider from "react-slick";
import useServicesContext from "@/components/hooks/useServiceContext";
import useDesignContext from "@/components/hooks/useDesignContext";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const GalleryPreview = () => {
  const { imagesFormData } = useServicesContext();
  const { bgDesign, setBgDesign, isLoading, setIsLoading } = useDesignContext();

  const { title, description, file: files = [] } = imagesFormData || {};

  const defaultBg = "/services-service/image-gallery.webp";
  const isVideo = bgDesign?.endsWith(".mp4") || bgDesign?.endsWith(".webm");
  const isImage = bgDesign && !isVideo;

  // ✅ Set default background on mount
  useEffect(() => {
    setIsLoading(true);
    setBgDesign(defaultBg);
  }, []);

  // ✅ Memoize preview URLs to prevent re-creation on every render
  const imagePreviews = useMemo(() => {
    if (!files || files.length === 0) return [];
    return files.map((file) => {
      const isLocal = file instanceof File;
      return {
        url: isLocal ? URL.createObjectURL(file) : file.url || "",
        name: file.name || file.fileName || "Image",
        local: isLocal,
      };
    });
  }, [files]);

  // ✅ Cleanup object URLs on unmount or when imagePreviews change
  useEffect(() => {
    return () => {
      imagePreviews.forEach((img) => {
        if (img.local) URL.revokeObjectURL(img.url);
      });
    };
  }, [imagePreviews]);

  // ⚡ Slider settings
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <div className="flex justify-center items-start w-full">
      <div className="relative w-[350px] h-[650px] border-4 border-[#001a1a] text-white rounded-3xl shadow-2xl overflow-hidden">
        {/* 🌄 Background */}
        {isImage && (
          <img
            src={bgDesign}
            alt="Background"
            onLoad={() => setTimeout(() => setIsLoading(false), 300)}
            className="absolute top-0 left-0 w-full h-full object-cover z-0"
          />
        )}
        {isVideo && (
          <video
            src={bgDesign}
            autoPlay
            loop
            muted
            playsInline
            onLoadedData={() => setTimeout(() => setIsLoading(false), 300)}
            className="absolute top-0 left-0 w-full h-full object-cover z-0"
          />
        )}
        {!bgDesign && (
          <img
            src={defaultBg}
            alt="Fallback Background"
            onLoad={() => setTimeout(() => setIsLoading(false), 300)}
            className="absolute top-0 left-0 w-full h-full object-cover z-0"
          />
        )}

        {/* ⏳ Loader */}
        {isLoading && (
          <div className="absolute inset-0 z-50 bg-mainGreen backdrop-blur-sm flex justify-center items-center">
            <Image
              src="/logos/ZM LOGO.webp"
              alt="Loading"
              width={100}
              height={100}
              className="w-20 h-20 animate-bounce"
            />
          </div>
        )}

        {/* 🖼️ Foreground Content */}
      <div className="relative z-10 w-full h-full p-4 flex flex-col justify-start text-white text-center bg-black/50 overflow-y-auto">
  {/* Title */}
  {title && (
    <div className="flex flex-col items-start mb-4 px-4">
      <p className="text-lg font-semibold">Title:</p>
      <p className="text-xl font-bold break-words">{title}</p>
    </div>
  )}

  {/* Description */}
  {description && (
    <div className="flex flex-col items-start mb-4 px-4">
      <p className="text-lg font-semibold">Description:</p>
      <p className="text-md font-medium whitespace-pre-wrap break-words">
        {description}
      </p>
    </div>
  )}

  {/* Images Slider */}
  <div className="flex flex-col items-center mb-4 w-full px-4">
    <p className="text-md text-white font-medium mb-2">Images ({imagePreviews.length})</p>
    {imagePreviews.length > 0 ? (
      <div className="w-full">
        <Slider {...sliderSettings}>
          {imagePreviews.map((img, idx) => (
            <div key={idx} className="px-2">
              <img
                src={img.url}
                alt={img.name}
                className="rounded-lg object-center w-full h-[200px] mx-auto"
              />
            </div>
          ))}
        </Slider>
      </div>
    ) : (
      <p className="text-sm text-white/70">No images selected</p>
    )}
  </div>
</div>

      </div>
    </div>
  );
};

export default GalleryPreview;
