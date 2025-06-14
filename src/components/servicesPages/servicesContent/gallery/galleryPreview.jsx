"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import useServicesContext from "@/components/hooks/useServiceContext";
import useDesignContext from "@/components/hooks/useDesignContext";

const GalleryPreview = () => {
  const { imagesFormData } = useServicesContext();
  const { bgDesign } = useDesignContext();
  const { title, description, files, password } = imagesFormData || {};
  const [imagePreviews, setImagePreviews] = useState([]);

  useEffect(() => {
    if (files && files.length > 0) {
      const urls = files.map((file) => URL.createObjectURL(file));
      setImagePreviews(urls);
      return () => {
        urls.forEach((url) => URL.revokeObjectURL(url));
      };
    } else {
      setImagePreviews([]);
    }
  }, [files]);

  const isVideo = bgDesign?.endsWith(".mp4");
  const isImage = bgDesign && !isVideo;

  return (
    <div className="flex justify-center items-start w-full">
      <div className="relative w-[350px] h-[570px] border-4 border-[#001a1a] text-white rounded-3xl shadow-2xl overflow-hidden">

        {/* 🎥 Background Layer */}
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
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute top-0 left-0 w-full h-full object-cover z-0"
          >
            <source src="/services-service/image-gallery.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        )}

        {/* 🖤 Overlay for text readability */}
        <div className="absolute inset-0 bg-black/30 z-10" />

        {/* 🖼️ Foreground Content */}
        <div className="relative z-20 w-full h-full p-4 overflow-y-auto scrollbar-hide">
          <h2 className="text-xl font-bold text-center mb-4">📸 Gallery Preview</h2>

          <div className="mb-4 text-center">
            <p className="text-xs text-white/80 font-medium mb-1">Title</p>
            <p className="text-sm font-semibold">{title || ""}</p>
          </div>

          <div className="mb-4 text-center">
            <p className="text-xs text-white/80 font-medium mb-1">Description</p>
            <p className="text-sm whitespace-pre-wrap">{description || ""}</p>
          </div>

          <div className="mb-4 text-center">
            <p className="text-xs text-white/80 font-medium mb-1">
              Images ({files ? files.length : 0})
            </p>
            {imagePreviews.length > 0 ? (
              <div className="grid grid-cols-2 gap-2 p-2">
                {imagePreviews.map((src, index) => (
                  <Image
                    key={index}
                    src={src}
                    alt={`Gallery Image ${index + 1}`}
                    width={150}
                    height={150}
                    className="rounded-lg object-cover w-full h-full aspect-square"
                  />
                ))}
              </div>
            ) : (
              <p className="text-sm text-white/70">No images selected</p>
            )}
          </div>

          <div className="text-center">
            <p className="text-xs text-white/80 font-medium mb-1">Password</p>
            <p>{password ? "••••••••" : "Not set"}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GalleryPreview;
