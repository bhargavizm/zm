
"use client";
import React from "react";
import useServicesContext from "@/components/hooks/useServiceContext";
import useDesignContext from "@/components/hooks/useDesignContext";

const AudioPreview = () => {
  const { audioFormData } = useServicesContext();
  const { bgDesign } = useDesignContext();
  const { title, description, file, password } = audioFormData || {};
  const fileName = file ? file.name : "No file selected";

  // Determine if selected background is a video or image
  const isVideo = bgDesign?.endsWith(".mp4");
  const isImage = bgDesign && !isVideo;

  return (
    <div className="flex justify-center items-center w-full">
      <div className="relative w-[350px] h-[600px] border-4 border-[#001a1a] rounded-3xl shadow-2xl overflow-hidden">

        {/* Background Display: Image, Video, or Default Video */}
        {isImage ? (
          <img
            src={bgDesign}
            alt="Selected Background"
            className="absolute top-0 left-0 w-full h-full object-cover z-0"
          />
        ) : isVideo ? (
          <video
            src={bgDesign}
            autoPlay
            loop
            muted
            playsInline
            className="absolute top-0 left-0 w-full h-full object-cover z-0"
          />
        ) : (
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute top-0 left-0 w-full h-full object-cover z-0"
          >
            <source src="/services-service/audio.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        )}

        {/* Foreground Content */}
        <div className="relative z-10 w-full h-full p-4 flex flex-col items-center justify-center space-y-4 text-white text-center bg-black/50">
          <div>
            <p className="text-xs font-semibold">Title</p>
            <p className="text-sm font-bold">{title || ""}</p>
          </div>
          <div>
            <p className="text-xs font-semibold">Description</p>
            <p className="text-sm font-medium whitespace-pre-wrap">
              {description || ""}
            </p>
          </div>
          <div>
            <p className="text-xs font-semibold">Audio File</p>
            <p className="text-teal-200 text-base">🎧 {fileName}</p>
          </div>
          <div>
            <p className="text-xs font-semibold">Password</p>
            <p className="text-white">{password ? "••••••••" : "Not set"}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AudioPreview;
