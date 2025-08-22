"use client";

import React, { useEffect } from "react";
import useDesignContext from "@/components/hooks/useDesignContext";
import BgDesignRenderer from "./bgDesignRender";

const AudioPreview = ({ data = {} }) => {
  const { setBgDesign } = useDesignContext();

  const title = data?.title || "";
  const description = data?.description || "";
  const files = Array.isArray(data?.files) ? data.files : [];
  const defaultBg = "/services-service/audio.mp4";

  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

  useEffect(() => {
    setBgDesign(data?.bgDesign || defaultBg);
  }, [data?.bgDesign]);
console.log(data)
  return (
    <>
      {/* 🌄 Background */}
      <div className="absolute inset-0 z-0">
        <BgDesignRenderer bgDesign={data?.bgDesign} defaultBg={defaultBg} />
      </div>

      {/* 📄 Foreground content */}
      <div className="relative z-20 w-full mx-auto p-4">
        <div className="bg-white/70 p-6 rounded-[28px] shadow-lg space-y-4 mx-auto">
          {/* 🔤 Title */}
          {title && (
            <div className="flex gap-4">
              <p className="text-xl font-semibold">Title:</p>
              <p className="text-xl font-bold">{title}</p>
            </div>
          )}

          {/* 📋 Description */}
          {description && (
            <div className="flex gap-4">
              <p className="text-xl font-semibold">Description:</p>
              <p className="text-xl font-medium whitespace-pre-wrap">
                {description}
              </p>
            </div>
          )}

          {/* 🎧 Audio Files */}
          <div className="w-full">
            <p className="text-lg font-semibold mb-1">
              Audio File{files.length !== 1 ? "s" : ""}
            </p>

            <div className="flex flex-col gap-4">
              {files.length > 0 ? (
                files.map((f, idx) => {
                  const fileName = f?.fileName || `Audio ${idx + 1}`;
                  const fileType = f?.fileType || "";
                  const localPath = f?.localPath || "";
                  const audioUrl = localPath.startsWith("/")
                    ? `${BASE_URL}${localPath}`
                    : localPath;
console.log(audioUrl, localPath)
                  return (
                    <div key={idx}>
                      <p className="text-teal-800 text-sm font-medium">🎵 {fileName}</p>
                      {fileType.startsWith("audio") ? (
                        <audio
                          controls
                          preload="none"
                          src={audioUrl}
                          className="w-full rounded"
                        />
                      ) : (
                        <p className="text-red-500 italic text-sm">
                          Invalid audio file type
                        </p>
                      )}
                    </div>
                  );
                })
              ) : (
                <p className="text-sm text-gray-500 italic">No audio files uploaded</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AudioPreview;
