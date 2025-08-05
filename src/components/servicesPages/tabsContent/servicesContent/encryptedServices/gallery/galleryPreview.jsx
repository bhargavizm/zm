"use client";

import React, { useEffect, useMemo } from "react";
import Image from "next/image";
import useServicesContext from "@/components/hooks/useServiceContext";
import useDesignContext from "@/components/hooks/useDesignContext";

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
        <div className="relative z-10 w-full h-full p-4 flex flex-col items-center justify-start space-y-4 text-white text-center bg-black/50">
          {title && (
            <div className="flex gap-4">
              <p className="text-xl font-semibold">Title :</p>
              <p className="text-xl font-bold">{title}</p>
            </div>
          )}
          {description && (
            <div className="flex gap-4">
              <p className="text-xl font-semibold">Description</p>
              <p className="text-xl font-medium whitespace-pre-wrap">
                {description}
              </p>
            </div>
          )}

          <div className="mb-2 text-center w-full">
            <p className="text-xs text-white/80 font-medium">
              Images ({imagePreviews.length})
            </p>

            {imagePreviews.length > 0 ? (
              <div
                className={`${
                  imagePreviews.length === 1
                    ? "flex justify-center"
                    : "grid grid-cols-2 gap-2"
                } mt-2`}
              >
                {imagePreviews.map((img, idx) => (
                  <img
                    key={idx}
                    src={img.url}
                    alt={img.name}
                    className="rounded-lg object-cover aspect-square w-full h-auto"
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
