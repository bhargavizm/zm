"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import useServicesContext from "@/components/hooks/useServiceContext";
import useDesignContext from "@/components/hooks/useDesignContext";

const VideoPreview = () => {
  const { videoFormData } = useServicesContext();
  const { bgDesign, setBgDesign, isLoading, setIsLoading } = useDesignContext();
  const { title, description, file } = videoFormData || {};
  const fileName = file ? file.name : "No file selected";

  const defaultBg = "/services-service/video.webp";

  const isVideo = bgDesign?.endsWith(".mp4");
  const isImage = bgDesign && !isVideo;

  // ✅ Set default background when component mounts
  useEffect(() => {
    setIsLoading(true);
    setBgDesign(defaultBg);
  }, []);

  return (
    <div className="flex justify-center items-center w-full">
      <div className="relative w-[350px] h-[650px] border-4 border-[#001a1a] rounded-3xl shadow-2xl overflow-hidden">
        
        {/* 🌄 Background Layer */}
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

        {/* 📝 Foreground Content */}
        <div className="relative z-20 w-full h-full p-4 flex flex-col items-center justify-center space-y-4 text-white text-center bg-black/50">
          <div>
            <p className="text-xs font-semibold text-white/80">Title</p>
            <p className="text-sm font-bold">{title || ""}</p>
          </div>
          <div>
            <p className="text-xs font-semibold text-white/80">Description</p>
            <p className="text-sm font-medium whitespace-pre-wrap">{description || ""}</p>
          </div>
          <div>
            <p className="text-xs font-semibold text-white/80">Video File</p>
            <p className="text-teal-200 text-base">🎞 {fileName}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoPreview;
