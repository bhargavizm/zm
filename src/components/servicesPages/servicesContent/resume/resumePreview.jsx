"use client";
import React from "react";
import Image from "next/image";
import useServicesContext from "@/components/hooks/useServiceContext";
import useDesignContext from "@/components/hooks/useDesignContext";

const ResumePreview = () => {
  const { resumeFormData } = useServicesContext();
  const { bgDesign } = useDesignContext();
  const { title, description, resumeFile, resumeUrl, password } = resumeFormData || {};

  const isVideo = bgDesign?.endsWith(".mp4");
  const isImage = bgDesign && !isVideo;

  return (
    <div className="flex justify-center items-start w-full">
      <div className="relative w-[350px] h-[570px] border-4 border-[#001a1a] rounded-3xl shadow-2xl overflow-hidden text-white">
        
        {/* 🌆 Background Layer */}
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
            <source src="/services-service/resume.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        )}

        {/* 🔳 Overlay */}
        <div className="absolute inset-0 bg-black/40 z-10" />

        {/* 📝 Foreground Content */}
        <div className="relative z-20 w-full h-full p-4 flex flex-col items-center justify-start overflow-y-auto no-scrollbar text-center space-y-4">
          <h2 className="text-base font-bold text-white">📱 Resume Preview</h2>

          {title && (
            <div className="w-full">
              <p className="text-xs text-white/80 mb-1">Title</p>
              <p className="text-sm font-semibold">{title}</p>
            </div>
          )}

          {description && (
            <div className="w-full">
              <p className="text-xs text-white/80 mb-1">Description</p>
              <p className="text-sm whitespace-pre-wrap">{description}</p>
            </div>
          )}

          {resumeFile && (
            <div className="w-full">
              <p className="text-xs text-white/80 mb-1">Uploaded Resume</p>
              <p className="text-sm text-blue-300 underline break-all">📄 {resumeFile.name}</p>
            </div>
          )}

          {resumeUrl && (
            <div className="w-full">
              <p className="text-xs text-white/80 mb-1">Resume URL</p>
              <a
                href={resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-blue-300 underline break-all"
              >
                🔗 {resumeUrl}
              </a>
            </div>
          )}

          {password && (
            <div className="w-full">
              <p className="text-xs text-white/80 mb-1">Password</p>
              <p>••••••••</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResumePreview;
