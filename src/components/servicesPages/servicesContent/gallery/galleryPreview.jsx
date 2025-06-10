"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image"; // Import Image component for optimized images

import useServicesContext from "@/components/hooks/useServiceContext";

const GalleryPreview = () => {
  // Access imagesFormData from the context
  const { imagesFormData } = useServicesContext();

  const {
    title,
    description,
    files, // 'files' will be an array of File objects from your context
    password,
  } = imagesFormData || {}; // Ensure imagesFormData is not null/undefined

  // State to store the URLs for image previews
  const [imagePreviews, setImagePreviews] = useState([]);

  // useEffect to create object URLs for image previews when 'files' changes
  useEffect(() => {
    if (files && files.length > 0) {
      // Create a URL for each selected file
      const urls = files.map((file) => URL.createObjectURL(file));
      setImagePreviews(urls);

      // IMPORTANT: Clean up object URLs when the component unmounts
      // or when the 'files' array changes, to prevent memory leaks.
      return () => {
        urls.forEach((url) => URL.revokeObjectURL(url));
      };
    } else {
      setImagePreviews([]); // Clear previews if no files are selected
    }
  }, [files]); // Dependency array: re-run this effect when 'files' changes

  return (
    <>
      <div className="flex justify-center items-start">
        {/* Main container for the preview, styled like the business preview */}
        <div className="w-[320px] h-[570px] border-4 border-[#001a1a] rounded-3xl p-4 shadow-2xl bg-white flex flex-col items-center space-y-3 overflow-y-auto no-scrollbar">
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
            {/* Conditional rendering for multiple images */}
            {imagePreviews.length > 0 ? (
              <div className="grid grid-cols-2 gap-2 p-2 w-full"> {/* Responsive grid for images */}
                {imagePreviews.map((src, index) => (
                  <Image
                    key={index} // Unique key for each image in the list
                    src={src}
                    alt={`Gallery Image ${index + 1}`}
                    width={150} // Adjust width as needed for preview size
                    height={150} // Adjust height to maintain aspect ratio or desired size
                    className="rounded-lg object-cover w-full h-full aspect-square" // Ensure images fill their grid cell nicely
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
    </>
  );
};

export default GalleryPreview;