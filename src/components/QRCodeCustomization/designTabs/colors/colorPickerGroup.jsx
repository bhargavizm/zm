"use client";

import { HexColorPicker } from "react-colorful";

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
  activePicker,
  setActivePicker,
}) => {
  const pickerKey = (type) => `${label}_${type}`;
  const isPickerOpen = (type) => activePicker === pickerKey(type);
  const togglePicker = (type) => {
    const key = pickerKey(type);
    setActivePicker((prev) => (prev === key ? null : key));
  };

  const ColorSwatch = ({ color, onClick }) => (
    <div
      onClick={onClick}
      className="w-10 h-10 rounded border cursor-pointer"
      style={{ background: color }}
    />
  );

  return (
    <div className="p-4 rounded-lg bg-white shadow-md w-full max-w">
      {/* Accordion Header */}
      <div
        className="flex justify-between items-center mb-3 cursor-pointer"
        onClick={() => setIsEnabled((prev) => !prev)}
      >
        <h4 className="font-bold text-mainGreen text-lg">{label}</h4>
        <span className="text-mainGreen font-bold text-xl">
          {isEnabled ? "−" : "+"}
        </span>
      </div>

      {/* Accordion Body */}
      {isEnabled && (
        <>
          <div>
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
                  <ColorSwatch
                    color={singleColor}
                    onClick={() => togglePicker("single")}
                  />
                  <p className="px-2 py-1 bg-gray-50 text-md text-black w-full">
                    {singleColor}
                  </p>
                </div>

                {isPickerOpen("single") && (
                  <div className="absolute z-10 mt-2">
                    <HexColorPicker
                      color={singleColor}
                      onChange={setSingleColor}
                    />
                    <button
                      onClick={() => setActivePicker(null)}
                      className="mt-2 px-3 py-1 bg-mainGreen text-white text-sm rounded"
                    >
                      Close
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex gap-6">
                {/* Start Color */}
                <div className="relative">
                  <label className="text-sm block mb-1">Start</label>
                  <div className="flex items-center gap-2">
                    <ColorSwatch
                      color={startColor}
                      onClick={() => togglePicker("start")}
                    />
                    <p className="px-2 py-1 bg-gray-50 text-md text-gray-800 w-full">
                      {startColor}
                    </p>
                  </div>
                  {isPickerOpen("start") && (
                    <div className="absolute z-10 mt-2">
                      <HexColorPicker
                        color={startColor}
                        onChange={setStartColor}
                      />
                      <button
                        onClick={() => setActivePicker(null)}
                        className="mt-2 px-3 py-1 bg-mainGreen text-white text-sm rounded"
                      >
                        Close
                      </button>
                    </div>
                  )}
                </div>

                {/* End Color */}
                <div className="relative">
                  <label className="text-sm block mb-1">End</label>
                  <div className="flex items-center gap-2">
                    <ColorSwatch
                      color={endColor}
                      onClick={() => togglePicker("end")}
                    />
                    <p className="px-2 py-1 bg-gray-50 text-md text-gray-800 w-full">
                      {endColor}
                    </p>
                  </div>
                  {isPickerOpen("end") && (
                    <div className="absolute z-10 mt-2">
                      <HexColorPicker
                        color={endColor}
                        onChange={setEndColor}
                      />
                      <button
                        onClick={() => setActivePicker(null)}
                        className="mt-2 px-3 py-1 bg-mainGreen text-sm text-white rounded"
                      >
                        Close
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};
