"use client";
import React, { useEffect } from "react";
import Image from "next/image";
import useServicesContext from "@/components/hooks/useServiceContext";
import useDesignContext from "@/components/hooks/useDesignContext";

const AudioPreview = () => {
  const { audioFormData } = useServicesContext();
  const { bgDesign, setBgDesign, isLoading, setIsLoading } = useDesignContext();
  const { title, description, file = [] } = audioFormData || {};

  const defaultVideo = "/services-service/audio.mp4";

  // ✅ Always set Audio’s default background on mount
  useEffect(() => {
    setIsLoading(true);
    setBgDesign(defaultVideo);
  }, []);

  const isVideo = bgDesign?.endsWith(".mp4") || bgDesign?.endsWith(".webm");
  const isImage = bgDesign && !isVideo;
console.log(audioFormData, file)
  return (
    <div className="flex justify-center items-center w-full">
      <div className="relative w-[350px] h-[600px] border-4 border-[#001a1a] rounded-3xl shadow-2xl overflow-hidden">

        {/* 🌄 Background Display */}
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

        {/* 📄 Foreground Content */}
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
          <div>
  <p className="text-xs font-semibold">Audio File{file.length !== 1 ? "s" : ""}</p>
  {file.length > 0 ? (
    <ul className="text-sm space-y-4 w-full px-2">
      {file.map((f, i) => {
        const isLocal = f instanceof File;
        const audioUrl = isLocal ? URL.createObjectURL(f) : f?.fileUrl || ""; // fallbacks
        const name = f?.name || f?.fileName || `Audio ${i + 1}`;
        const type = f?.type || f?.fileType || "";

        return (
          <li key={i}>
            <p className="text-teal-200 text-xs mb-1">🎧 {name}</p>
            {type.startsWith("audio") && audioUrl ? (
              <audio controls src={audioUrl} className="w-full rounded" />
            ) : (
              <p className="text-red-300 italic">Invalid audio file</p>
            )}
          </li>
        );
      })}
    </ul>
  ) : (
    <p className="text-sm text-gray-300 italic">No files selected</p>
  )}
</div>

        </div>
      </div>
    </div>
  );
};

export default AudioPreview;
