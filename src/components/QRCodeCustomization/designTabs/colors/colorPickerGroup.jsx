"use client";

import { HexColorPicker } from "react-colorful";
import { useState } from "react";

export const ColorPickerGroup = ({
  label,
  colorMode,
  setColorMode,
  singleColor,
  setSingleColor,
  startColor,
  setStartColor,
  endColor,
  setEndColor,
  isEnabled,
  setIsEnabled,
}) => {
  const [showPicker, setShowPicker] = useState(null); // 'single', 'start', 'end'

  const ColorSwatch = ({ color, onClick }) => (
    <div
      onClick={onClick}
      className="w-10 h-10 rounded border cursor-pointer"
      style={{ background: color }}
    />
  );

  return (
    <div className="p-4 border rounded-lg bg-white shadow-md w-full max-w">
      <div className="flex justify-between items-center mb-3">
        <h4 className="font-semibold">{label}</h4>
        {/* <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={isEnabled}
            onChange={(e) => setIsEnabled(e.target.checked)}
          />
          <span className="text-sm text-gray-700">Apply</span>
        </label> */}
      </div>

      <div className="flex items-center gap-4 mb-4">
        <label className="flex items-center gap-2">
          <input
            type="radio"
            value="single"
            checked={colorMode === "single"}
            onChange={() => setColorMode("single")}
          />
          <span>Single</span>
        </label>
        <label className="flex items-center gap-2">
          <input
            type="radio"
            value="gradient"
            checked={colorMode === "gradient"}
            onChange={() => setColorMode("gradient")}
          />
          <span>Gradient</span>
        </label>
      </div>

      {colorMode === "single" ? (
        <div className="relative">
          <div className="flex items-center gap-4">
            <ColorSwatch color={singleColor} onClick={() => setShowPicker("single")} />
            <input
              value={singleColor}
              onChange={(e) => setSingleColor(e.target.value)}
              className="border px-2 py-1 rounded w-full"
            />
          </div>
          {showPicker === "single" && (
            <div className="absolute z-10 mt-2">
              <HexColorPicker
                color={singleColor}
                onChange={setSingleColor}
              />
              <button
                onClick={() => setShowPicker(null)}
                className="mt-2 px-3 py-1 bg-gray-200 text-sm rounded"
              >
                Close
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="flex gap-6">
          <div className="relative">
            <label className="text-sm block mb-1">Start</label>
            <div className="flex items-center gap-2">
              <ColorSwatch color={startColor} onClick={() => setShowPicker("start")} />
              <input
                value={startColor}
                onChange={(e) => setStartColor(e.target.value)}
                className="border px-2 py-1 rounded w-full"
              />
            </div>
            {showPicker === "start" && (
              <div className="absolute z-10 mt-2">
                <HexColorPicker color={startColor} onChange={setStartColor} />
                <button
                  onClick={() => setShowPicker(null)}
                  className="mt-2 px-3 py-1 bg-gray-200 text-sm rounded"
                >
                  Close
                </button>
              </div>
            )}
          </div>
          <div className="relative">
            <label className="text-sm block mb-1">End</label>
            <div className="flex items-center gap-2">
              <ColorSwatch color={endColor} onClick={() => setShowPicker("end")} />
              <input
                value={endColor}
                onChange={(e) => setEndColor(e.target.value)}
                className="border px-2 py-1 rounded w-full"
              />
            </div>
            {showPicker === "end" && (
              <div className="absolute z-10 mt-2">
                <HexColorPicker color={endColor} onChange={setEndColor} />
                <button
                  onClick={() => setShowPicker(null)}
                  className="mt-2 px-3 py-1 bg-gray-200 text-sm rounded"
                >
                  Close
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};



