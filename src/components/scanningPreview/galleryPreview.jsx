"use client";

import React, { useEffect, useState } from "react";
import BgDesignRenderer from "./bgDesignRender";

const GalleryPreview = ({ data = {} }) => {
  const { title = "", description = "", files = [], bgDesign } = data;
  const defaultBg = "/services-service/image-gallery.webp";

  const [imagePreviews, setImagePreviews] = useState([]);

  useEffect(() => {
    if (!files || files.length === 0) {
      setImagePreviews([]);
      return;
    }

    const previews = files.map((file) => {
      const isLocal = file instanceof File;
      return {
        url: isLocal ? URL.createObjectURL(file) : file.url || "",
        name: file.name || file.fileName || "Image",
        local: isLocal,
      };
    });

    setImagePreviews(previews);

    return () => {
      previews.forEach((img) => {
        if (img.local) URL.revokeObjectURL(img.url);
      });
    };
  }, [files]);

  return (
    <div>
      <div>
        {/* Background */}
        <div className="absolute inset-0 z-0">
          <BgDesignRenderer bgDesign={bgDesign} defaultBg={defaultBg} />
        </div>

        {/* Foreground Content */}
        <div className="relative z-10 p-9 m-2 flex flex-col space-y-4 text-black text-center bg-white/50">
          {title && (
            <div className="flex gap-2">
              <p className="text-xl font-semibold">Title:</p>
              <p className="text-xl font-bold break-words">{title}</p>
            </div>
          )}

          {description && (
            <div className="flex gap-2">
              <p className="text-xl font-semibold">Description:</p>
              <p className="text-xl font-medium whitespace-pre-wrap break-words">
                {description}
              </p>
            </div>
          )}

          {/* Images Grid */}
          <div className="mb-2 text-center w-full">
            <p className="text-md font-medium">Images</p>

            {imagePreviews.length > 0 ? (
              <div className="mt-4 w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                {imagePreviews.map((img, idx) => (
                  <div key={idx} className="w-full">
                    <img
                      src={img.url}
                      alt={img.name}
                      className="rounded-lg object-center w-full h-[200px] mx-auto"
                    />
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-black/70">No images selected</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GalleryPreview;
