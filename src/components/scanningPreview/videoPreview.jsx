"use client";

import React, { useEffect, useState } from "react";
import BgDesignRenderer from "./bgDesignRender";
import useDesignContext from "@/components/hooks/useDesignContext";
import { downloadFiles } from "./common/downloadLogic";
import { FiDownload } from "react-icons/fi";

const VideoPreview = ({ data = {} }) => {
  const { bgDesign, setBgDesign } = useDesignContext();
  const { title = "", description = "", files = [] } = data;

  const [videoPreviews, setVideoPreviews] = useState([]);
  const defaultBg = "/services-service/video.webp";

  // Set background
  useEffect(() => {
    setBgDesign(data?.bgDesign || defaultBg);
  }, [data, setBgDesign]);

  // Prepare video previews
  useEffect(() => {
    if (!files || files.length === 0) {
      setVideoPreviews([]);
      return;
    }

    const previews = files.map((f) => {
      const isLocal = f instanceof File;
      return {
        url: isLocal ? URL.createObjectURL(f) : f.url || f.fileUrl || "",
        name: f.name || f.fileName || "Video",
        local: isLocal,
      };
    });

    setVideoPreviews(previews);

    return () => {
      previews.forEach((v) => {
        if (v.local) URL.revokeObjectURL(v.url);
      });
    };
  }, [files]);

  return (
    <div className="relative w-full">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <BgDesignRenderer bgDesign={data?.bgDesign} defaultBg={defaultBg} />
      </div>

      {/* Foreground */}
      <div className="relative z-10 w-full h-full p-4 flex flex-col space-y-4 bg-white/50 text-black">
        {title && (
          <div className="flex gap-4">
            <p className="text-xl font-semibold">Title:</p>
            <p className="text-xl font-bold">{title}</p>
          </div>
        )}
        {description && (
          <div className="flex gap-4">
            <p className="text-xl font-semibold">Description:</p>
            <p className="text-xl font-medium whitespace-pre-wrap">{description}</p>
          </div>
        )}

        <div>
          <p className="text-xl font-semibold mb-2">Videos</p>
          {videoPreviews.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
              {videoPreviews.map((vid, idx) => (
                <div key={idx} className="relative  p-1 rounded shadow-sm">
                  <video
                    src={vid.url}
                    controls
                     onClick={() => downloadFiles([vid])}
                    className="w-full h-40 object-cover rounded cursor-pointer"
                  />
                  {/* Download Icon */}
                  <button
                    onClick={() => downloadFiles([vid])}
                    className="absolute top-1 right-1 cursor-pointer bg-white text-black p-1 rounded-full shadow-md hover:bg-white transition"
                  >
                    ⬇️
                  </button>
                  {/* <p className="text-sm mt-1 text-center">{vid.name}</p> */}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-black/70">No videos selected</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default VideoPreview;
