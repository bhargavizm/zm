"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { FiFileText, FiLink } from "react-icons/fi";
import useServicesContext from "@/components/hooks/useServiceContext";

const ResumePreview = ({ data }) => {
  const { resumeFormData } = useServicesContext();
  const defaultBg = "/services-service/resume.webp";

  // State for background
  const [bgDesign, setBgDesign] = useState(defaultBg);
  const [isLoading, setIsLoading] = useState(true);

  // Prefer props data > fallback to context
  const resumeFiles = data?.resumeFiles || resumeFormData?.resumeFiles || [];
  const resumeUrl = data?.resumeUrl || resumeFormData?.resumeUrl || "";

  const isVideo = bgDesign?.endsWith(".mp4") || bgDesign?.endsWith(".webm");
  const isImage = bgDesign && !isVideo;

  useEffect(() => {
    setIsLoading(true);
    setBgDesign(data?.bgDesign || defaultBg);
  }, [data]);

  const hasData = (resumeFiles && resumeFiles.length > 0) || resumeUrl;

  return (
    <div className="flex justify-center">
      <div >
        {/* 📽 Background */}
        {isImage ? (
          <img
            src={bgDesign}
            alt="Background"
            onLoad={() => setTimeout(() => setIsLoading(false), 300)}
            className="absolute top-0 left-0 w-full h-full object-cover z-0"
          />
        ) : isVideo ? (
          <video
            src={bgDesign}
            autoPlay
            loop
            muted
            playsInline
            onLoadedData={() => setTimeout(() => setIsLoading(false), 300)}
            className="absolute top-0 left-0 w-full h-full object-cover z-0"
          />
        ) : (
          <img
            src={defaultBg}
            alt="Default Background"
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

        {/* 🔳 Notch */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-1/3 h-6 bg-gray-800 rounded-b-xl z-20" />

        {/* 📄 Main Content */}
        <div className="relative flex-1 bg-white/70 m-2 rounded-xl overflow-y-auto pt-6 pb-3 px-3 z-20 max-h-full">
          {hasData ? (
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-center text-[#004d4d]">
                Resume Preview
              </h2>

              {/* Uploaded Files */}
              {resumeFiles.length > 0 && (
                <div className="bg-[#004d4d]/10 p-3 rounded border border-[#004d4d]/20">
                  <div className="flex items-center text-[#004d4d] mb-1">
                    <FiFileText className="mr-2" />
                    <span className="font-medium">Uploaded Files</span>
                  </div>
                  <ul className="text-sm space-y-1">
                    {resumeFiles.map((file, index) => {
                      const isFromBackend = typeof file === "object" && file._id;
                      const fileName = file?.fileName || file?.name || "Resume";
                      const fileLink = isFromBackend
                        ? `/api/files/${file._id}` // adjust if your backend route differs
                        : URL.createObjectURL(file);

                      return (
                        <li key={index}>
                          <a
                            href={fileLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 underline break-words"
                          >
                            📄 {fileName}
                          </a>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              )}

              {/* Resume URL */}
              {resumeUrl && (
                <div className="bg-[#004d4d]/10 p-3 rounded border border-[#004d4d]/20">
                  <div className="flex items-center text-[#004d4d] mb-1">
                    <FiLink className="mr-2" />
                    <span className="font-medium">Resume URL</span>
                  </div>
                  <a
                    href={resumeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 text-sm underline break-words"
                  >
                    🔗 {resumeUrl}
                  </a>
                </div>
              )}
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-center text-gray-400">
              <FiFileText className="text-4xl mb-4 text-[#004d4d]" />
              <h3 className="text-lg font-medium">Resume Preview</h3>
              <p className="mt-2">No resume data available.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResumePreview;
