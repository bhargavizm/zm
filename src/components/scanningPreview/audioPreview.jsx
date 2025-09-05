"use client";

import React, { useEffect } from "react";
import useDesignContext from "@/components/hooks/useDesignContext";
import BgDesignRenderer from "./bgDesignRender";
import { FiDownload } from "react-icons/fi";

const AudioPreview = ({ data = {} }) => {
  const { setBgDesign } = useDesignContext();

  const title = data?.title || "";
  const description = data?.description || "";
  const files = Array.isArray(data?.files) ? data.files : [];

  const defaultBg = "/services-service/audio.mp4";

  useEffect(() => {
    setBgDesign(data?.bgDesign || defaultBg);
  }, [data?.bgDesign]);

  // 🔹 Force download (works with Cloudinary/remote files)
  const handleDownload = async (url, fileName) => {
    try {
      const response = await fetch(url, { mode: "cors" });
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = fileName || "download";
      document.body.appendChild(link);
      link.click();
      link.remove();

      window.URL.revokeObjectURL(blobUrl);
    } catch (err) {
      console.error("Download failed:", err);
    }
  };

  return (
    <>
      {/* 🎵 Background */}
      <div className="absolute inset-0 z-0">
        <BgDesignRenderer bgDesign={data?.bgDesign} defaultBg={defaultBg} />
      </div>

      {/* 🎶 Foreground */}
      <div className="relative z-20 w-full mx-auto p-4">
        <div className="bg-white/70 p-6 rounded-[28px] shadow-lg space-y-4">
          {title && (
            <div className="flex gap-4">
              <p className="text-xl font-semibold">Title:</p>
              <p className="text-xl font-bold">{title}</p>
            </div>
          )}

          {description && (
            <div className="flex gap-4">
              <p className="text-xl font-semibold">Description:</p>
              <p className="text-xl font-medium whitespace-pre-wrap">
                {description}
              </p>
            </div>
          )}

          <div className="w-full">
            <p className="text-lg font-semibold mb-2">Audio Files:</p>
            <div className="flex flex-col gap-4">
              {files.length > 0 ? (
                files.map((f, idx) => {
                  const fileName = f?.name || `Audio-${idx + 1}`;
                  const fileUrl = f?.url;

                  return (
                    <div
                      key={idx}
                      className="flex flex-col gap-2 bg-gray-100 px-3 py-3 rounded-lg"
                    >
                      {/* 🎧 Audio Player */}
                      <audio
                        controls
                        className="w-full rounded-lg"
                        src={fileUrl}
                      >
                        Your browser does not support the audio element.
                      </audio>

                      {/* 🔽 Download Button */}
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium truncate">
                          🎵 {fileName}
                        </span>
                        <button
                          onClick={() => handleDownload(fileUrl, fileName)}
                          className="flex items-center gap-1 text-blue-600 hover:text-blue-800 transition"
                        >
                          <FiDownload className="text-lg" />
                          <span className="text-sm">Download</span>
                        </button>
                      </div>
                    </div>
                  );
                })
              ) : (
                <p className="text-sm text-gray-500">No audio uploaded</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AudioPreview;