"use client";

import React, { useEffect, useState } from "react";
import BgDesignRenderer from "./bgDesignRender";
import useDesignContext from "@/components/hooks/useDesignContext";

const VideoPreview = ({ data = {} }) => {
  const { bgDesign, setBgDesign } = useDesignContext();
  const { title = "", description = "", files = [] } = data;

  const [videoPreviews, setVideoPreviews] = useState([]);
  const defaultBg = "/services-service/video.webp";

  const isVideo = bgDesign?.endsWith(".mp4") || bgDesign?.endsWith(".webm");
  const isImage = bgDesign && !isVideo;

  useEffect(() => {
    setBgDesign(data?.bgDesign || defaultBg);
  }, [data]);

  useEffect(() => {
    if (!files || files.length === 0) {
      setVideoPreviews([]);
      return;
    }

    const urls = files.map((f) => {
      const isLocal = f instanceof File;
      return {
        url: isLocal ? URL.createObjectURL(f) : f.url || f.fileUrl || "",
        name: f.name || f.fileName || "Video",
        local: isLocal,
      };
    });

    setVideoPreviews(urls);

    return () => {
      urls.forEach((v) => {
        if (v.local) URL.revokeObjectURL(v.url);
      });
    };
  }, [files]);

  return (
    <div >
      <div >

         <div className="absolute inset-0 z-0">
        <BgDesignRenderer bgDesign={data?.bgDesign} defaultBg={defaultBg} />
      </div>

        <div className="relative z-10 w-full h-full p-4 flex flex-col  space-y-4 text-black  bg-white/50">
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
          <div className="w-full">
            <p className="text-xl font-semibold ">Video Files</p>
            <div className="flex flex-col  gap-1 mt-2">
              {videoPreviews?.length > 0 ? (
                videoPreviews.map((vid, idx) => (
                  <a
                    key={idx}
                    href={vid.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className=" text-md pb-4 underline transition"
                  >
                    🎞 {vid.name}
                  </a>
                ))
              ) : (
                <p className="text-sm text-white/70">No videos selected</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoPreview;
