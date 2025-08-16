"use client";

import React, { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import useServicesContext from "@/components/hooks/useServiceContext";
import useDesignContext from "@/components/hooks/useDesignContext";

const serviceDefaults = {
  audio: {
    defaultBg: "/services-service/audio.mp4",
    label: "Audio File(s)",
    icon: "🎧",
  },
  video: {
    defaultBg: "/services-service/video.webp",
    label: "Video File(s)",
    icon: "🎞",
  },
  pdf: {
    defaultBg: "/services-service/pdf.webp",
    label: "PDF File(s)",
    icon: "📄",
  },
  gallery: {
    defaultBg: "/services-service/image-gallery.webp",
    label: "Images",
    icon: "🖼️",
  },
};

const UniversalPreview = ({ type }) => {
  const {
    audioFormData,
    videoFormData,
    pdfFormData,
    imagesFormData,
  } = useServicesContext();

  const { bgDesign, setBgDesign, isLoading, setIsLoading } = useDesignContext();
  const [previews, setPreviews] = useState([]);

  const formData =
    type === "audio"
      ? audioFormData
      : type === "video"
      ? videoFormData
      : type === "pdf"
      ? pdfFormData
      : type === "gallery"
      ? imagesFormData
      : {};

  const { title, description, files = formData?.file || [] } = formData || {};

  const config = useMemo(() => serviceDefaults[type] || {}, [type]);
const { defaultBg } = config;
useEffect(() => {
  if (!bgDesign && defaultBg) {
    setIsLoading(true);
    setBgDesign((prev) => prev || defaultBg);
  }
}, [bgDesign, defaultBg]);


  // ✅ Build previews for local or remote files
useEffect(() => {
  if (files?.length > 0) {
    const newPreviews = files.map((f) => {
      const isLocal = f instanceof File;
      return {
        name: f?.name || f?.fileName || "File",
        type: f?.type || f?.fileType || "",
        url: isLocal ? URL.createObjectURL(f) : f?.fileUrl || "",
        local: isLocal,
      };
    });

    setPreviews((prev) => {
      const same =
        prev.length === newPreviews.length &&
        prev.every((p, i) => p.name === newPreviews[i].name && p.url === newPreviews[i].url);
      if (same) return prev; // 🔁 Skip setting if same
      return newPreviews;
    });

    return () => {
      newPreviews.forEach((d) => d.local && URL.revokeObjectURL(d.url));
    };
  } else {
    setPreviews([]);
  }
}, [files]);

  const isVideo = bgDesign?.endsWith(".mp4") || bgDesign?.endsWith(".webm");
  const isImage = bgDesign && !isVideo;

  return (
    <div className="flex justify-center items-start w-full">
      <div className="relative w-[350px] h-[650px] border-4 border-[#001a1a] rounded-3xl shadow-2xl overflow-hidden text-white">
        {/* 🌄 Background */}
        {isImage && (
          <img
            src={bgDesign}
            alt="Background"
            onLoad={() => setTimeout(() => setIsLoading(false), 300)}
            onError={() => setIsLoading(false)}
            className="absolute top-0 left-0 w-full h-full object-center z-0"
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
            onError={() => setIsLoading(false)}
            className="absolute top-0 left-0 w-full h-full object-center z-0"
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

        {/* 📄 Content */}
        <div className="relative z-10 w-full h-full p-6 overflow-y-auto scrollbar-hide bg-black/50 flex flex-col text-center space-y-4">
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

          {previews.length > 0 ? (
            <>
              {/* 🖼️ Video/Image Grid */}
              <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-3 mt-2">
                {previews
                  .filter(
                    (f) =>
                      f.type.startsWith("image") || f.type.startsWith("video")
                  )
                  .map((f, i) => (
                    <li key={i} className="list-none">
                      <a
                        href={f.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block w-full h-24 border rounded-lg flex items-center justify-center bg-gray-100 overflow-hidden"
                      >
                        {f.type.startsWith("image") ? (
                          <img
                            src={f.url}
                            alt={f.name}
                            className="h-full w-full object-center"
                          />
                        ) : (
                          <video src={f.url} className="h-full" controls />
                        )}
                      </a>
                      <p className="text-xs text-center mt-1 truncate text-white">
                        {f.name}
                      </p>
                    </li>
                  ))}
              </div>

              {/* 🎵📄 Audio, PDF etc */}
              <div className="mt-4 flex flex-col space-y-2">
                {previews
                  .filter(
                    (f) =>
                      f.type.startsWith("audio") ||
                      f.type === "application/pdf" ||
                      f.type === "application/msword" ||
                      f.type ===
                        "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
                      f.type === "application/zip" ||
                      (!f.type.startsWith("image") &&
                        !f.type.startsWith("video"))
                  )
                  .map((f, i) => (
                    <div key={i} className="flex items-center gap-2">
                      {f.type.startsWith("audio") ? (
                        <audio src={f.url} controls className="w-full" />
                      ) : (
                        <a
                          href={f.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-300 underline text-sm"
                        >
                          📄 {f.name}
                        </a>
                      )}
                    </div>
                  ))}
              </div>
            </>
          ) : (
            <p className="text-sm text-white/70 text-center">No files selected</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default UniversalPreview;
