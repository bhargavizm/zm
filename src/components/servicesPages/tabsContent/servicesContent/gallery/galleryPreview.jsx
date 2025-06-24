"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import useServicesContext from "@/components/hooks/useServiceContext";
import useDesignContext from "@/components/hooks/useDesignContext";

const GalleryPreview = () => {
  const { imagesFormData } = useServicesContext();
  const { bgDesign, setBgDesign, isLoading, setIsLoading } = useDesignContext();
  const { title, description, files } = imagesFormData || {};
  const [imagePreviews, setImagePreviews] = useState([]);

  const defaultBg = "/services-service/image-gallery.jpg";

  // ✅ Set default background on mount
  useEffect(() => {
    setIsLoading(true);
    setBgDesign(defaultBg);
  }, []);

  // ✅ Generate preview thumbnails
  useEffect(() => {
    if (files && files.length > 0) {
      const urls = files.map((file) => URL.createObjectURL(file));
      setImagePreviews(urls);

      return () => urls.forEach((url) => URL.revokeObjectURL(url));
    } else {
      setImagePreviews([]);
    }
  }, [files]);

  const isVideo = bgDesign?.endsWith(".mp4");
  const isImage = bgDesign && !isVideo;

  return (
    <div className="flex justify-center items-start w-full">
      <div className="relative w-[350px] h-[650px] border-4 border-[#001a1a] text-white rounded-3xl shadow-2xl overflow-hidden">

        {/* 🎥 Background Layer */}
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
              src="/logos/ZM LOGO.png"
              alt="Loading"
              width={100}
              height={100}
              className="w-20 h-20 animate-bounce"
            />
          </div>
        )}

        {/* 🖼️ Foreground Content */}
        <div className="relative z-20 w-full h-full p-4 overflow-y-auto scrollbar-hide">
          <h2 className="text-xl font-bold text-center mb-4">📸 Gallery Preview</h2>

          <div className="mb-4 text-center">
            <p className="text-xs text-white/80 font-medium mb-1">Title</p>
            <p className="text-sm font-semibold">{title || ""}</p>
          </div>

          <div className="mb-4 text-center">
            <p className="text-xs text-white/80 font-medium mb-1">Description</p>
            <p className="text-sm whitespace-pre-wrap">{description || ""}</p>
          </div>

          <div className="mb-4 text-center">
            <p className="text-xs text-white/80 font-medium mb-1">
              Images ({files ? files.length : 0})
            </p>

            {imagePreviews.length > 0 ? (
              <div
                className={`${
                  imagePreviews.length === 1 ? "flex justify-center" : "grid grid-cols-2 gap-2"
                } p-2`}
              >
                {imagePreviews.map((src, index) => (
                  <Image
                    key={index}
                    src={src}
                    alt={`Gallery Image ${index + 1}`}
                    width={150}
                    height={150}
                    className="rounded-lg object-cover aspect-square"
                  />
                ))}
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
