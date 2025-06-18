"use client";
import React from "react";
import useServicesContext from "@/components/hooks/useServiceContext";
import useDesignContext from "@/components/hooks/useDesignContext";

const PDFPreview = () => {
  const { pdfFormData } = useServicesContext();
  const { bgDesign } = useDesignContext();
  const { title, description, file, password } = pdfFormData || {};
  const fileName = file ? file.name : "No file selected";

  const isVideo = bgDesign?.endsWith(".mp4");
  const isImage = bgDesign && !isVideo;

  return (
    <div className="flex justify-center items-center w-full">
      <div className="relative w-[350px] h-[600px] border-4 border-[#001a1a] rounded-3xl shadow-2xl overflow-hidden">
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
        <img
            src='/services-service/pdf.webp'
            alt="Selected Background"
            className="absolute top-0 left-0 w-full h-full object-cover z-0"
          />
        )}

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
            <p className="text-xs font-semibold">PDF File</p>
            <p className="text-teal-200 text-base">📄 {fileName}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PDFPreview;
