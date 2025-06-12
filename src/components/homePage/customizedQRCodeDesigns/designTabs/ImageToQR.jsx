"use client";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import useDesignContext from "@/components/hooks/useDesignContext";

const ImageToQR = () => {
  const {backgroundImage, setBackgroundImage, scale, setScale  } = useDesignContext();
  const [showWarning, setShowWarning] = useState(false);
  const fileInputRef = useRef(null);
  const qrRef = useRef(null);

   useEffect(() => {
      setShowWarning(scale > 55); // Adjust threshold as needed
    }, [scale]);

const handleSliderChange = (e) => {
    const value = parseInt(e.target.value);
    setScale(value);
    localStorage.setItem("scale", value);
  };

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
   const handleResetValue = () => {
    setScale(55); // Default size
    localStorage.setItem("logoSize", 55);
  };

  const handleAddNew = () => {
    if (fileInputRef.current) fileInputRef.current.click();
  };

  return (
    <div className=" mx-auto">
      <h2 className="text-2xl font-bold text-darkGreen mb-6">Create QR Using Image</h2>

      {/* Upload Hidden Input */}
      <input
        type="file"
        accept="image/*"
        onChange={handleUpload}
        className="hidden"
        ref={fileInputRef}
      />

      {/* Buttons */}
      <div className="flex gap-3 mb-4">
        {!backgroundImage ? (
          <button
            className="px-4 py-2 bg-mainGreen font-bold text-white rounded"
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

      {/* Preview Section */}
      {backgroundImage && (
        <div className="relative w-[200px] h-[200px] border rounded shadow overflow-hidden">
          {/* Background Image */}
          <Image
            src={backgroundImage}
            alt="Uploaded"
            width={200}
        height={200}
            objectFit="cover"
          />

          {/* Overlay QR Code */}
          {/* <div
            ref={qrRef}
            className="absolute left-1/2 top-1/2 w-20 h-20 transform -translate-x-1/2 -translate-y-1/2"
          >
            <Image
              src="/qr-placeholder.png"
              alt="QR Code"
              layout="fill"
              objectFit="contain"
            />
          </div> */}
        </div>
      )}

      {
        backgroundImage && (
            <>
                  <div className="mb-2 flex flex-col items-start">
        <div className="flex justify-start items-center gap-9 w-full mb-4">
          <label htmlFor="logo-size" className="text-lg font-medium text-darkGreen">
            Image Scaling: {scale}
          </label>
          {showWarning && (
            <span className="text-red-500 text-sm font-bold">
              ⚠️ QR Code may not scan, please test!
            </span>
          )}
        </div>

        <input
          type="range"
          id="logo-size"
          min="20"
          max="120"
          step="5"
          value={scale}
          onChange={handleSliderChange}
          className="w-96 accent-mainGreen mb-2"
        />

          <button
            onClick={handleResetValue}
            className="text-md text-mainGreen hover:underline"
          >
            Reset Value
          </button>
      </div>
            </>
        )
      }

    </div>
  );
};

export default ImageToQR;
