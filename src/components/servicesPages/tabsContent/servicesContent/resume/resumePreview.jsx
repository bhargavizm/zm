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
      <div className="relative w-[350px] h-[600px] border-4 border-[#001a1a] rounded-3xl shadow-2xl overflow-hidden text-white">
        
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
          <img
            src='/services-service/resume.jpg'
            alt="Background"
            className="absolute top-0 left-0 w-full h-full object-cover z-0"
          />
        )}

        {/* 🔳 Overlay */}
        <div className="absolute inset-0 bg-black/40 z-10" />

        {/* 📝 Foreground Content */}
        <div className="relative z-20 rounded-xl p-9 bg-white/70  flex flex-col items-center justify-center overflow-y-auto no-scrollbar text-center space-y-4 m-2">
          <h2 className="text-base font-bold ">📱 Resume Preview</h2>

          {title && (
            <div className="w-full text-darkGreen">
              <p className="  mb-1">Title</p>
              <p className="text-sm font-semibold">{title}</p>
            </div>
          )}

          {description && (
            <div className="w-full text-darkGreen">
              <p className=" mb-1">Description</p>
              <p className="text-sm whitespace-pre-wrap">{description}</p>
            </div>
          )}

          {resumeFile && (
            <div className="w-full text-darkGreen">
              <p className=" font-medium mb-1">Uploaded Resume</p>
              <p className="text-sm text-blue-300 underline break-all">📄 {resumeFile.name}</p>
            </div>
          )}

          {resumeUrl && (
            <div className="w-full text-darkGreen">
              <p className=" font-medium text-white/80 mb-1">Resume URL</p>
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
            <div className="w-full text-darkGreen">
              <p className=" font-medium text-white/80 mb-1">Password</p>
              <p>••••••••</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResumePreview;
