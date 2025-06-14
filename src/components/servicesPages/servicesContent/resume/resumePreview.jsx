"use client";
import React from "react";
import Image from "next/image";
import useServicesContext from "@/components/hooks/useServiceContext";

const ResumePreview = () => {
  const { resumeFormData } = useServicesContext();
  const { title, description, resumeFile, resumeUrl, password } = resumeFormData || {};

  return (
    <div className="flex justify-center items-center w-full">
      <div className="relative w-[320px] h-[570px] border-4 border-[#001a1a] rounded-3xl shadow-2xl overflow-hidden">
        {/* 🖼️ Background Image */}
        <Image
          src="/services-service/resume.jpg" // Replace with your desired background image
          alt="Resume Background"
          fill
          className="object-cover z-0"
        />

        {/* 🔳 Dark overlay */}
        <div className="absolute inset-0 bg-black/50 z-10" />

        {/* 📝 Foreground content */}
        <div className="relative z-20 w-full h-full p-4 flex flex-col items-center justify-start text-white text-center overflow-y-auto no-scrollbar space-y-3">
          <h2 className="text-base font-bold text-white mb-2">📱 Live Preview</h2>

          {title && (
            <div className="w-full">
              <p className="text-xs font-medium text-white/80 mb-1">Title</p>
              <p className="text-sm font-semibold">{title}</p>
            </div>
          )}

          {description && (
            <div className="w-full">
              <p className="text-xs font-medium text-white/80 mb-1">Description</p>
              <p className="text-sm whitespace-pre-wrap">{description}</p>
            </div>
          )}

          {resumeFile && (
            <div className="w-full">
              <p className="text-xs font-medium text-white/80 mb-1">Uploaded Resume</p>
              <p className="text-sm text-blue-300 underline break-all">📄 {resumeFile.name}</p>
            </div>
          )}

          {resumeUrl && (
            <div className="w-full">
              <p className="text-xs font-medium text-white/80 mb-1">Resume URL</p>
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
              <p className="text-xs font-medium text-white/80 mb-1">Password</p>
              <p>••••••••</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResumePreview;
