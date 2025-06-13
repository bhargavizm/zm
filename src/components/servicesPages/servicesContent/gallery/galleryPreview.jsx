"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import useServicesContext from "@/components/hooks/useServiceContext";

const GalleryPreview = () => {
  const { imagesFormData } = useServicesContext();
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

  return (
    <>
      {/* Embedded styles */}
      <style jsx>{`
        .bg-image-overlay {
          position: relative;
          overflow: hidden;
          border-radius: 1.5rem;
        }

        .bg-image-overlay::before {
          content: "";
          position: absolute;
          inset: 0;
          background-image: url("/services-service/image-gallery.jpg");
          background-size: cover;
          background-position: center;
          opacity: 0.2;
          z-index: 0;
          border-radius: 1.5rem;
        }

        .bg-image-overlay > * {
          position: relative;
          z-index: 1;
        }

        /* Optional: Customize scrollbar */
        .scroll-container::-webkit-scrollbar {
          width: 6px;
        }

        .scroll-container::-webkit-scrollbar-thumb {
          background-color: #888;
          border-radius: 6px;
        }

        .scroll-container::-webkit-scrollbar-thumb:hover {
          background-color: #555;
        }
      `}</style>

      <div className="flex justify-center items-start">
        <div
          className="w-[320px] h-[570px] border-4 border-[#001a1a] text-[#001a1a] rounded-3xl shadow-2xl bg-white bg-image-overlay"
        >
          {/* Scrollable content inside fixed height */}
          <div className="p-4 flex flex-col items-center space-y-3 h-full overflow-y-auto scrollbar-hide">
            <h2 className="text-xl font-bold">📸 Gallery Preview</h2>

            <div className="w-full mb-3 text-center">
              <p className="text-xs text-gray-500 font-medium mb-1">Title</p>
              <p className="text-sm text-gray-800 font-semibold">{title || ""}</p>
            </div>

            <div className="w-full mb-3 text-center">
              <p className="text-xs text-gray-500 font-medium mb-1">Description</p>
              <p className="text-sm text-gray-700 whitespace-pre-wrap">{description || ""}</p>
            </div>

            <div className="w-full mb-3 text-center">
              <p className="text-xs text-gray-500 font-medium mb-1">
                Images ({files ? files.length : 0})
              </p>
              {imagePreviews.length > 0 ? (
                <div className="grid grid-cols-2 gap-2 p-2 w-full">
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
                <p className="text-gray-500 text-sm">No images selected</p>
              )}
            </div>

            <div className="w-full mb-3 text-center">
              <p className="text-xs text-gray-500 font-medium mb-1">Password</p>
              <p className="text-gray-700">{password ? "••••••••" : "Not set"}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default GalleryPreview;
