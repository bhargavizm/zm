"use client";

import React from "react";
import useDesignContext from "@/components/hooks/useDesignContext";

const Colors = () => {
  const {
    qrColor,
    setQrColor,
    qrGradient,
    setQrGradient,
    gradientType,
    setGradientType,
    qrMode,
    setQrMode,
  } = useDesignContext();

  const handleSingleColorChange = (value) => setQrColor(value);

  const handleGradientChange = (index, value) => {
    const newGradient = [...(qrGradient || ["#0eb424", "#df0808"])];
    newGradient[index] = value;
    setQrGradient(newGradient);
  };

  const gradientOptions = ["Linear Gradient", "Radial Gradient"];

  return (
    <div className="p-4 w-full bg-[#f5f6ff] rounded-md">
      <h2 className="text-base font-semibold mb-4">Choose QR Code Body Colour</h2>

      {/* Radio Buttons */}
      <div className="flex gap-6 mb-6">
        <label className="flex items-center gap-2">
          <input
            type="radio"
            value="single"
            checked={qrMode === "single"}
            onChange={() => setQrMode("single")}
          />
          <span className="text-sm font-medium">Single Color</span>
        </label>
        <label className="flex items-center gap-2">
          <input
            type="radio"
            value="gradient"
            checked={qrMode === "gradient"}
            onChange={() => setQrMode("gradient")}
          />
          <span className="text-sm font-medium">Gradient Color</span>
        </label>
      </div>

      {/* Single Color */}
      {qrMode === "single" ? (
        <div className="flex items-center gap-3">
          <input
            type="color"
            value={qrColor}
            onChange={(e) => handleSingleColorChange(e.target.value)}
            className="w-10 h-10 border rounded"
          />
          <input
            type="text"
            value={qrColor}
            onChange={(e) => handleSingleColorChange(e.target.value)}
            className="border px-3 py-1 rounded w-36"
          />
        </div>
      ) : (
        <div className="flex flex-wrap items-center gap-4">
          {/* Start Color */}
          <div className="flex items-center gap-2">
            <input
              type="color"
              value={qrGradient?.[0] || "#0eb424"}
              onChange={(e) => handleGradientChange(0, e.target.value)}
              className="w-10 h-10 border rounded"
            />
            <input
              type="text"
              value={qrGradient?.[0] || "#0eb424"}
              onChange={(e) => handleGradientChange(0, e.target.value)}
              className="border px-3 py-1 rounded w-36"
            />
          </div>

          {/* End Color */}
          <div className="flex items-center gap-2">
            <input
              type="color"
              value={qrGradient?.[1] || "#df0808"}
              onChange={(e) => handleGradientChange(1, e.target.value)}
              className="w-10 h-10 border rounded"
            />
            <input
              type="text"
              value={qrGradient?.[1] || "#df0808"}
              onChange={(e) => handleGradientChange(1, e.target.value)}
              className="border px-3 py-1 rounded w-36"
            />
          </div>

          {/* Gradient Type Dropdown */}
          <select
            value={gradientType}
            onChange={(e) => setGradientType(e.target.value)}
            className="border px-3 py-1 rounded w-48"
          >
            {gradientOptions.map((opt) => (
              <option key={opt} value={opt.toLowerCase().replace(" ", "-")}>
                {opt}
              </option>
            ))}
          </select>
        </div>
      )}
    </div>
  );
};

export default Colors;
