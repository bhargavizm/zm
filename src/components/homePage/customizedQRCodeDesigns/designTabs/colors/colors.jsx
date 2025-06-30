"use client";

import React, { useState } from "react";
import { HexColorPicker } from "react-colorful";
import { Paintbrush2 } from "lucide-react"; // 🎨 Paint icon
import useDesignContext from "@/components/hooks/useDesignContext";
import { FaPaintbrush } from "react-icons/fa6";

const Colors = () => {
  const { qrColor, setQrColor } = useDesignContext();
  const [showPicker, setShowPicker] = useState(false);

  const togglePicker = () => setShowPicker((prev) => !prev);

  const handleChange = (color) => {
    setQrColor(color);
  };

  return (
    <div className="p-4 w-full">
      <h2 className="text-lg font-semibold mb-4">Choose QR Code Body Color</h2>

      {/* 🎨 Icon with color bubble */}
      <button
        onClick={togglePicker}
        className="flex items-center gap-3 px-4 py-4 bg-white border border-gray-300 rounded-lg shadow-sm hover:shadow-md transition cursor-pointer"
      >
        {/* Colored Circle */}
        <div className="w-6 h-6 rounded-full border border-gray-300" style={{ backgroundColor: qrColor }} />

        {/* Paint Icon */}
        <FaPaintbrush  className="text-gray-700 w-5 h-5" />

        <span className="text-sm text-gray-600">Pick Color</span>
      </button>

      {/* Color Picker */}
      {showPicker && (
        <div className="mt-4 max-w-xs">
          <HexColorPicker color={qrColor} onChange={handleChange} />
        </div>
      )}
    </div>
  );
};

export default Colors;
