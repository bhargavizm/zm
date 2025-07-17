"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import useServicesContext from "@/components/hooks/useServiceContext";
import useDesignContext from "@/components/hooks/useDesignContext";

const VideoPreview = () => {
  const { videoFormData } = useServicesContext();
  const { bgDesign, setBgDesign, isLoading, setIsLoading } = useDesignContext();

  const { title, description, file: files = [] } = videoFormData || {};
  const [videoPreviews, setVideoPreviews] = useState([]);

  const defaultBg = "/services-service/video.webp";

  const isVideo = bgDesign?.endsWith(".mp4") || bgDesign?.endsWith(".webm");
  const isImage = bgDesign && !isVideo;

  // Set background on mount
  useEffect(() => {
    setIsLoading(true);
    setBgDesign(defaultBg);
  }, []);

  // Generate video preview URLs
  useEffect(() => {
    if (!files || files.length === 0) {
      setVideoPreviews([]);
      return;
    }

    const urls = files.map((f) => {
      const isLocal = f instanceof File;
      return {
        url: isLocal ? URL.createObjectURL(f) : f.fileUrl || "",
        name: f.name || f.fileName || "Video",
        local: isLocal,
      };
    });

    setVideoPreviews(urls);

    return () => {
      urls.forEach((v) => {
        if (v.local) URL.revokeObjectURL(v.url);
      });
    };
  }, [files]);

  return (
    <div className="flex justify-center items-center w-full">
      <div className="relative w-[350px] h-[600px] border-4 border-[#001a1a] rounded-3xl shadow-2xl overflow-hidden">

        {/* Background Layer */}
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

        {/* Loader */}
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

        {/* Foreground Content */}
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
          <div className="w-full">
            <p className="text-xl font-semibold text-white/80">Video Files</p>
            <div className="flex flex-col items-center gap-1 mt-2">
              {videoPreviews?.length > 0 ? (
                videoPreviews.map((vid, idx) => (
                  <a
                    key={idx}
                    href={vid.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-teal-200 text-md pb-4 underline hover:text-teal-100 transition"
                  >
                    🎞 {vid.name}
                  </a>
                ))
              ) : (
                <p className="text-sm text-white/70">No videos selected</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoPreview;
