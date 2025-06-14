"use client";
import React from "react";
import useServicesContext from "@/components/hooks/useServiceContext";
import useDesignContext from "@/components/hooks/useDesignContext";

const VideoPreview = () => {
  const { titleFormData } = useServicesContext();
  const { bgDesign } = useDesignContext();

  const { title, description, file, password } = titleFormData || {};
  const fileName = file ? file.name : "No file selected";

  // Determine if background is a video or an image
  const isVideo = bgDesign?.endsWith(".mp4");
  const isImage = bgDesign && !isVideo;

  return (
    <div className="flex justify-center items-center w-full">
      <div className="relative w-[350px] h-[550px] border-4 border-[#001a1a] rounded-3xl shadow-2xl overflow-hidden">

        {/* Background layer: Image or Video or Default Video */}
        {isImage ? (
          <img
            src={bgDesign}
            alt="Background"
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
            <source src="/services-service/video.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        )}

        {/* Foreground overlay for readability */}
        <div className="absolute inset-0 bg-black/30 z-10" />

        {/* Foreground content */}
        <div className="relative z-20 w-full h-full p-4 flex flex-col items-center justify-center space-y-4 text-white text-center">
          <div>
            <p className="text-xs font-semibold text-white/80">Title</p>
            <p className="text-sm font-bold">{title || ""}</p>
          </div>

          <div>
            <p className="text-xs font-semibold text-white/80">Description</p>
            <p className="text-sm font-medium whitespace-pre-wrap">
              {description || ""}
            </p>
          </div>

          <div>
            <p className="text-xs font-semibold text-white/80">Video File</p>
            <p className="text-teal-200 text-base">🎞 {fileName}</p>
          </div>

          <div>
            <p className="text-xs font-semibold text-white/80">Password</p>
            <p>{password ? "••••••••" : "Not set"}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoPreview;
