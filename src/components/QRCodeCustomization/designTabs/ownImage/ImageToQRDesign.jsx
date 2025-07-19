"use client";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import useDesignContext from "@/components/hooks/useDesignContext";

const ImageToQRDesign = () => {
  const { backgroundImage, setBackgroundImage, imageScale, setImageScale } =
    useDesignContext();

  const [showWarning, setShowWarning] = useState(false);
  const fileInputRef = useRef(null);

  useEffect(() => {
    setShowWarning(imageScale > 80);
  }, [imageScale]);

  const handleUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageURL = URL.createObjectURL(file);
      setBackgroundImage(imageURL);
    }
  };

  const handleReset = () => {
    if (fileInputRef.current) fileInputRef.current.value = null;
    setBackgroundImage(null);
  };

  const handleAddNew = () => {
    if (fileInputRef.current) fileInputRef.current.click();
  };

  return (
    <div className="mx-auto">
      <h2 className="text-2xl font-bold text-darkGreen mb-6">
        Create QR Using Image
      </h2>

      {/* Hidden Upload Input */}
      <input
        type="file"
        accept="image/*"
        onChange={handleUpload}
        className="hidden"
        ref={fileInputRef}
      />

      {/* Action Buttons */}
      <div className="flex gap-3 mb-4">
        {!backgroundImage ? (
          <button
            className="px-4 py-2 bg-mainGreen font-bold text-white rounded cursor-pointer"
            onClick={handleAddNew}
          >
            Upload Image
          </button>
        ) : (
          <>
            <button
              className="px-4 py-2 bg-mainGreen font-bold text-white rounded"
              onClick={handleAddNew}
            >
              Add New Picture
            </button>
            <button
              className="px-4 py-2 bg-red-600 text-white rounded font-bold"
              onClick={handleReset}
            >
              Reset
            </button>
          </>
        )}
      </div>

      {/* Image Preview */}
      {backgroundImage && (
        <div className="relative w-[200px] h-[200px] border rounded shadow overflow-hidden">
          <Image
            src={backgroundImage}
            alt="Uploaded"
            width={200}
            height={200}
            objectFit="cover"
          />
        </div>
      )}

      {/* Image Scale Control */}
      {/* {backgroundImage && (
        <div className="mb-2 flex flex-col items-start">
          <div className="flex justify-start items-center gap-9 w-full mb-4">
            <label
              htmlFor="image-scale"
              className="text-lg font-medium text-darkGreen"
            >
              Image Scaling: {imageScale}
            </label>
            {showWarning && (
              <span className="text-red-500 text-sm font-bold">
                ⚠️ QR Code may not scan, please test!
              </span>
            )}
          </div>

          <input
            type="range"
            min="20"
            max="120"
            value={imageScale}
            onChange={(e) => {
              const value = parseInt(e.target.value);
              setImageScale(value);
              localStorage.setItem("imageScale", value);
            }}
            className="w-96 accent-mainGreen mb-2"
          />

          <button
            onClick={() => {
              setImageScale(80);
              localStorage.setItem("imageScale", 80);
            }}
            className="text-md text-mainGreen hover:underline"
          >
            Reset Image Scale
          </button>
        </div>
      )} */}
    </div>
  );
};

export default ImageToQRDesign;
