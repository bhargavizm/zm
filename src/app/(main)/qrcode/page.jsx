"use client";

import React, { useEffect, useRef, useState } from "react";
import QRCode from "qrcode-generator";

// SVG Path definitions for modules
const heartModulePath = `
  M 0 -4
  C 0 -6, 3 -6, 3 -4
  C 3 -2, 0 0, 0 2
  C 0 0, -3 -2, -3 -4
  C -3 -6, 0 -6, 0 -4
  Z
`;
const leafModulePath = `
  M 0 -5
  C 2 -4, 4 -2, 5 0
  C 4 2, 2 4, 0 5
  C -2 4, -4 2, -5 0
  C -4 -2, -2 -4, 0 -5
  Z
`;
const diamondModulePath = `
  M 0 -5
  L 5 0
  L 0 5
  L -5 0
  Z
`;

const eyeFrames = {
  square: (x, y, size, color) => (
    <rect
      x={x}
      y={y}
      width={size}
      height={size}
      fill="white"
      stroke={color}
      strokeWidth="3"
    />
  ),
  circle: (x, y, size, color) => (
    <circle
      cx={x + size / 2}
      cy={y + size / 2}
      r={size / 2}
      fill="white"
      stroke={color}
      strokeWidth="3"
    />
  ),
  rounded: (x, y, size, color) => (
    <rect
      x={x}
      y={y}
      rx={size / 4}
      ry={size / 4}
      width={size}
      height={size}
      fill="white"
      stroke={color}
      strokeWidth="3"
    />
  ),
};

const eyeballShapes = {
  circle: (x, y, size, color) => (
    <circle cx={x + size / 2} cy={y + size / 2} r={size / 2} fill={color} />
  ),
  square: (x, y, size, color) => (
    <rect x={x} y={y} width={size} height={size} fill={color} />
  ),
  cross: (x, y, size, color) => (
    <g>
      <rect
        x={x}
        y={y + size / 3}
        width={size}
        height={size / 3}
        fill={color}
      />
      <rect
        x={x + size / 3}
        y={y}
        width={size / 3}
        height={size}
        fill={color}
      />
    </g>
  ),
};

const moduleShapes = {
  heart: "  M 0 -4 C 0 -6, 3 -6, 3 -4 C 3 -2, 0 0, 0 2 C 0 0, -3 -2, -3 -4 C -3 -6, 0 -6, 0 -4 Z",
  leaf: "M 0 -5 C 2 -4, 4 -2, 5 0 C 4 2, 2 4, 0 5 C -2 4, -4 2, -5 0 C -4 -2, -2 -4, 0 -5 Z",
  diamond: " M 0 -5 L 5 0 L 0 5 L -5 0 Z",
  circle: "M 0 -4 A 4 4 0 0 1 0 4 A 4 4 0 0 1 0 -4 Z",
  square: "M -4 -4 L 4 -4 L 4 4 L -4 4 Z",
};

const generateQRMatrix = (text, typeNumber = 0, errorCorrectionLevel = "H") => {
  const qr = QRCode(typeNumber, errorCorrectionLevel);
  qr.addData(text);
  qr.make();
  const size = qr.getModuleCount();
  const matrix = [];
  for (let row = 0; row < size; row++) {
    const rowData = [];
    for (let col = 0; col < size; col++) {
      rowData.push(qr.isDark(row, col) ? 1 : 0);
    }
    matrix.push(rowData);
  }
  return matrix;
};

// Shape definitions for the outer container
const shapeDefinitions = {
  heart: (size) => `
    M ${size / 2}, ${size / 2 - size * 0.25}
    C ${size / 2 - size * 0.25}, ${size / 2 - size * 0.4} 
      ${size / 2 - size * 0.4}, ${size / 2 - size * 0.1} 
      ${size / 2 - size * 0.25}, ${size / 2 + size * 0.05}
    C ${size / 2 - size * 0.1}, ${size / 2 + size * 0.25} 
      ${size / 2}, ${size / 2 + size * 0.35} 
      ${size / 2}, ${size / 2 + size * 0.4}
    C ${size / 2}, ${size / 2 + size * 0.35} 
      ${size / 2 + size * 0.1}, ${size / 2 + size * 0.25} 
      ${size / 2 + size * 0.25}, ${size / 2 + size * 0.05}
    C ${size / 2 + size * 0.4}, ${size / 2 - size * 0.1} 
      ${size / 2 + size * 0.25}, ${size / 2 - size * 0.4} 
      ${size / 2}, ${size / 2 - size * 0.25}
    Z
  `,
  circle: (size) => `
    M ${size / 2}, ${size / 2 - size / 2}
    A ${size / 2}, ${size / 2} 0 1, 1 ${size / 2}, ${size / 2 + size / 2}
    A ${size / 2}, ${size / 2} 0 1, 1 ${size / 2}, ${size / 2 - size / 2}
    Z
  `,
  square: (size) => `
    M ${size * 0.1}, ${size * 0.1}
    L ${size * 0.9}, ${size * 0.1}
    L ${size * 0.9}, ${size * 0.9}
    L ${size * 0.1}, ${size * 0.9}
    Z
  `,
  diamond: (size) => `
    M ${size / 2}, ${size * 0.1}
    L ${size * 0.9}, ${size / 2}
    L ${size / 2}, ${size * 0.9}
    L ${size * 0.1}, ${size / 2}
    Z
  `,
};

const qrOffsets = {
  heart: { x: 1, y: -30, scale: 0.8 },
  circle: { x: 0, y: 0, scale: 1.2 },
  square: { x: 0, y: 0, scale: 1.2 },
  diamond: { x: 0, y: 0, scale: 0.85 },
  star: { x: 0, y: 10, scale: 0.35 },
  car: { x: -10, y: -30, scale: 0.5 },
  ice: { x: 0, y: -30, scale: 0.5 },
};

const FullCustomQR = () => {
  const [matrix, setMatrix] = useState([]);
  const [text, setText] = useState("https://www.zmqrcode.in/");
  const [eyeFrameType, setEyeFrameType] = useState("rounded");
  const [eyeballType, setEyeballType] = useState("circle");
  const [moduleShape, setModuleShape] = useState("heart");
  const [bgColor, setBgColor] = useState("#ffffff");
  const [fgColor, setFgColor] = useState("#111111");
  const [noiseDensity, setNoiseDensity] = useState(0.7);
  const [containerShape, setContainerShape] = useState("heart");
  const [strokeWidth, setStrokeWidth] = useState(12);
  const [logoImage, setLogoImage] = useState(null);

  const [logoPosition, setLogoPosition] = useState({ x: 0, y: 0 });
  const [badgeSize, setBadgeSize] = useState(200); // Ring default
  const [logoSize, setLogoSize] = useState(35); // Logo default

  const [platformBadge, setPlatformBadge] = useState("/logos/d-logo.png"); // default icon

  const [badgePosition, setBadgePosition] = useState({ x: 0, y: 0 }); // below the logo

  const [colorMode, setColorMode] = useState("single"); // "single" or "gradient"

  
  const [gradientStart, setGradientStart] = useState("#00bfff");
  const [gradientEnd, setGradientEnd] = useState("#8a2be2");

  const fileInputRef = useRef(null);
  // Handle logo position change
  const handleLogoPositionChange = (axis, value) => {
    setLogoPosition((prev) => ({
      ...prev,
      [axis]: value,
    }));
  };
  // Handle logo upload
  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setLogoImage(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Remove logo
  const removeLogo = () => {
    setLogoImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const moduleSize = 8;
  const padding = 2;
  const qrSize = matrix.length;
  const fullSize = qrSize + padding * 2;
  const canvasSize = 512;

  useEffect(() => {
    const qrMatrix = generateQRMatrix(text);
    setMatrix(qrMatrix);
  }, [text]);

  const isEye = (row, col) => {
    const eyeSize = 7;
    const positions = [
      [0, 0],
      [0, qrSize - eyeSize],
      [qrSize - eyeSize, 0],
    ];
    return positions.some(
      ([ey, ex]) =>
        row >= padding + ey &&
        row < padding + ey + eyeSize &&
        col >= padding + ex &&
        col < padding + ex + eyeSize
    );
  };

  const isInQRBounds = (row, col) => {
    return (
      row >= padding &&
      col >= padding &&
      row < padding + qrSize &&
      col < padding + qrSize
    );
  };

  const generateNoiseElements = () => {
    const elements = [];
    const numElements = Math.floor(fullSize * fullSize * noiseDensity);
    const modulePath = moduleShapes[moduleShape] || heartModulePath;

    // Calculate QR code boundaries in canvas coordinates
    const qrLeft = qrX;
    const qrRight = qrX + qrWidth;
    const qrTop = qrY;
    const qrBottom = qrY + qrHeight;

    const getRandomPointOutsideQR = () => {
      const margin = canvasSize * 0.002;
      let x, y;
      let attempts = 0;
      const maxAttempts = 100;

      do {
        attempts++;
        if (attempts > maxAttempts) {
          // Fallback to random position outside QR
          if (Math.random() > 0.5) {
            // Left or right of QR
            x =
              Math.random() > 0.5
                ? qrRight + Math.random() * (canvasSize - qrRight - margin)
                : margin + Math.random() * (qrLeft - margin);
            y = margin + Math.random() * (canvasSize - 2 * margin);
          } else {
            // Above or below QR
            x = margin + Math.random() * (canvasSize - 2 * margin);
            y =
              Math.random() > 0.5
                ? qrBottom + Math.random() * (canvasSize - qrBottom - margin)
                : margin + Math.random() * (qrTop - margin);
          }
          break;
        }

        // Generate random point in the container shape
        switch (containerShape) {
          case "circle":
            const angle = Math.random() * Math.PI * 2;
            const radius = margin + Math.random() * (canvasSize / 2 - margin);
            x = canvasSize / 2 + Math.cos(angle) * radius;
            y = canvasSize / 2 + Math.sin(angle) * radius;
            break;
          case "heart":
            x =
              canvasSize / 2 -
              canvasSize * 0.4 +
              Math.random() * canvasSize * 0.8;
            y =
              canvasSize / 2 -
              canvasSize * 0.3 +
              Math.random() * canvasSize * 0.6;
            break;
          default:
            x = margin + Math.random() * (canvasSize - 2 * margin);
            y = margin + Math.random() * (canvasSize - 2 * margin);
        }

        // Check if point is outside QR code area
        const isOutsideQR =
          x < qrLeft || x > qrRight || y < qrTop || y > qrBottom;
        if (!isOutsideQR) {
          x = y = null; // Force retry
        }
      } while (x === null || y === null);

      return { x, y };
    };

    for (let i = 0; i < numElements; i++) {
      const { x, y } = getRandomPointOutsideQR();
      const size = 0.8 + Math.random() * 0.4;
      const rotation = Math.random() * 360;

      elements.push(
        <path
          key={`noise-${i}`}
          d={modulePath}
          transform={`translate(${x}, ${y}) scale(${size}) rotate(${rotation})`}
          // fill={fgColor}
          fill={colorMode === "gradient" ? "url(#qrGradient)" : fgColor}

          opacity={0.8 + Math.random() * 0.2}
        />
      );
    }

    return elements;
  };

  const renderEyes = () => {
    if (matrix.length < 7) return null;

    const eyeSize = 7;
    const eyeModuleSize = eyeSize * moduleSize;
    const eyes = [
      { x: padding * moduleSize, y: padding * moduleSize },
      {
        x: (padding + qrSize - eyeSize) * moduleSize,
        y: padding * moduleSize,
      },
      {
        x: padding * moduleSize,
        y: (padding + qrSize - eyeSize) * moduleSize,
      },
    ];

    const EyeFrameComponent = eyeFrames[eyeFrameType];
    const EyeballComponent = eyeballShapes[eyeballType];

    return eyes.map((eye, index) => (
      <g key={`eye-${index}`}>
        {/* {EyeFrameComponent(eye.x, eye.y, eyeModuleSize, fgColor)}
        {EyeballComponent(
          eye.x + eyeModuleSize / 4,
          eye.y + eyeModuleSize / 4,
          eyeModuleSize / 2,
          fgColor
        )} */}
        {EyeFrameComponent(
  eye.x,
  eye.y,
  eyeModuleSize,
  colorMode === "gradient" ? "url(#qrGradient)" : fgColor
)}
{EyeballComponent(
  eye.x + eyeModuleSize / 4,
  eye.y + eyeModuleSize / 4,
  eyeModuleSize / 2,
  colorMode === "gradient" ? "url(#qrGradient)" : fgColor
)}
  
      </g>
    ));
  };

  const modulePath = moduleShapes[moduleShape] || heartModulePath;

  // Calculate the optimal scale for the QR code to fit within the shape
  const calculateQRScale = () => {
    const qrWidth = fullSize * moduleSize;
    const shapeOffset = qrOffsets[containerShape] || { scale: 1 };
    const shapeScaleLimit = shapeOffset.scale ?? 1;

    // Allow up to shapeScaleLimit, or reduce if QR is too big
    const maxWidth = canvasSize * shapeScaleLimit;
    const fitScale = maxWidth / qrWidth;

    return Math.min(fitScale, shapeScaleLimit);
  };

  const qrScale = calculateQRScale();
  const qrWidth = fullSize * moduleSize * qrScale;
  const qrHeight = fullSize * moduleSize * qrScale;
  const shapeOffset = qrOffsets[containerShape] || { x: 0, y: 0, scale: 0.2 };
  const qrX = (canvasSize - qrWidth) / 2 + shapeOffset.x;
  const qrY = (canvasSize - qrHeight) / 2 + shapeOffset.y;
 const qrCenterX = qrX + qrWidth / 2 + logoPosition.x;
const qrCenterY = qrY + qrHeight / 2 + logoPosition.y;
  return (
    <div className="mx-auto py-24  px-14" style={{ backgroundColor: bgColor }}>
      <h1 className="text-xl text-center font-semibold mb-4">
        Custom QR Code Generator
      </h1>

     <div className="grid md:grid-cols-2 gap-10 h-[calc(100vh-6rem)] overflow-hidden">

        <div className="w-full max-w-3xl pr-4 pb-28 overflow-y-auto">
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter your URL or Text"
            className="w-full px-4 py-2 border rounded mb-4"
          />
          <div className="mb-4 p-4 border rounded-lg bg-gray-50">
            <label className="block text-sm font-medium mb-2">
              Logo Customization
            </label>

            {/* Logo Upload/Remove */}
            <div className="flex gap-2 mb-4">
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleLogoUpload}
                accept="image/*"
                className="hidden"
                id="logo-upload"
              />
              <label
                htmlFor="logo-upload"
                className="px-4 py-2 bg-gray-200 rounded cursor-pointer hover:bg-gray-300"
              >
                {logoImage ? "Change Logo" : "Upload Logo"}
              </label>
              {logoImage && (
                <button
                  onClick={removeLogo}
                  className="px-4 py-2 bg-red-100 text-red-700 rounded hover:bg-red-200"
                >
                  Remove Logo
                </button>
              )}
            </div>

            <div className="mt-6 p-3 rounded border bg-gray-50">
              <label className="block text-sm font-semibold mb-2 text-gray-700">
                Uploaded Logo (Inside Ring)
              </label>

              <div className="mb-2">
                <label className="text-sm">Logo Size: {logoSize}px</label>
                <input
                  type="range"
                  min="20"
                  max="120"
                  value={logoSize}
                  onChange={(e) => setLogoSize(parseInt(e.target.value))}
                  className="w-full"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm">Logo X Offset</label>
                  <input
                    type="range"
                    min="-100"
                    max="100"
                    value={logoPosition.x}
                    onChange={(e) =>
                      setLogoPosition((prev) => ({
                        ...prev,
                        x: parseInt(e.target.value),
                      }))
                    }
                    className="w-full"
                  />
                </div>
                <div>
                  <label className="text-sm">Logo Y Offset</label>
                  <input
                    type="range"
                    min="-100"
                    max="100"
                    value={logoPosition.y}
                    onChange={(e) =>
                      setLogoPosition((prev) => ({
                        ...prev,
                        y: parseInt(e.target.value),
                      }))
                    }
                    className="w-full"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  QR Container Shape
                </label>
                <div className="flex gap-2 flex-wrap">
                  {Object.keys(shapeDefinitions).map((shape) => (
                    <div
                      key={shape}
                      onClick={() => setContainerShape(shape)}
                      className={`border rounded p-1 cursor-pointer ${
                        containerShape === shape
                          ? "border-mainGreen ring-2 ring-mainGreen"
                          : "border-gray-300"
                      }`}
                    >
                      <svg
                        width="40"
                        height="40"
                        viewBox={`0 0 ${canvasSize} ${canvasSize}`}
                      >
                        <path
                          d={shapeDefinitions[shape](canvasSize)}
                          fill="none"
                          stroke="#000"
                          strokeWidth="10"
                        />
                      </svg>
                      <p className="text-xs text-center">{shape}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Eye Frame Style
              </label>
              <div className="flex gap-2 flex-wrap">
                {Object.keys(eyeFrames).map((style) => (
                  <div
                    key={style}
                    onClick={() => setEyeFrameType(style)}
                    className={`border rounded p-1 cursor-pointer ${
                      eyeFrameType === style
                        ? "border-mainGreen ring-2 ring-mainGreen"
                        : "border-gray-300"
                    }`}
                  >
                    <svg width="40" height="40">
                      {eyeFrames[style](5, 5, 30, "#000")}
                    </svg>
                    <p className="text-xs text-center">{style}</p>
                  </div>
                ))}
              </div>
              <div></div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Eyeball Shape
              </label>
              <div className="flex gap-2 flex-wrap">
                {Object.keys(eyeballShapes).map((shape) => (
                  <div
                    key={shape}
                    onClick={() => setEyeballType(shape)}
                    className={`border rounded p-1 cursor-pointer ${
                      eyeballType === shape
                        ? "border-mainGreen ring-2 ring-mainGreen"
                        : "border-gray-300"
                    }`}
                  >
                    <svg width="40" height="40">
                      {eyeballShapes[shape](5, 5, 30, "#000")}
                    </svg>
                    <p className="text-xs text-center">{shape}</p>
                  </div>
                ))}
              </div>
              <div></div>
            </div>
            <div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Body Frame
                </label>
                <div className="flex gap-2 flex-wrap">
                  {Object.keys(moduleShapes).map((shape) => (
                    <div
                      key={shape}
                      onClick={() => setModuleShape(shape)}
                      className={`border rounded p-1 cursor-pointer ${
                        moduleShape === shape
                          ? "border-mainGreen ring-2 ring-mainGreen"
                          : "border-gray-300"
                      }`}
                    >
                      <svg width="40" height="40" viewBox="-8 -8 16 16">
                        <path d={moduleShapes[shape]} fill="#000" />
                      </svg>
                      <p className="text-xs text-center">{shape}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* <div>
            <label className="block text-sm font-medium mb-1">Background Color</label>
            <input
              type="color"
              value={bgColor}
              onChange={(e) => setBgColor(e.target.value)}
              className="w-full h-10"
            />
          </div> */}

          <div className="mb-4">
  <label className="block text-sm font-medium mb-1">QR Color Mode</label>
  <div className="flex items-center gap-6">
    <label className="flex items-center gap-2">
      <input
        type="radio"
        value="single"
        checked={colorMode === "single"}
        onChange={() => setColorMode("single")}
      />
      Single
    </label>
    <label className="flex items-center gap-2">
      <input
        type="radio"
        value="gradient"
        checked={colorMode === "gradient"}
        onChange={() => setColorMode("gradient")}
      />
      Gradient
    </label>
  </div>
</div>

{/* If Single color, show color picker */}
{/* {colorMode === "single" && (
  <div className="mb-4">
    <label className="block text-sm font-medium mb-1">Foreground Color</label>
    <input
      type="color"
      value={fgColor}
      onChange={(e) => setFgColor(e.target.value)}
      className="w-full h-10"
    />
  </div>
)} */}

{/* If Gradient, show two pickers */}
{colorMode === "gradient" && (
  <div className="mb-4">
    <label className="block text-sm font-medium mb-1">Gradient Colors</label>
    <div className="flex gap-2">
      <input
        type="color"
        value={gradientStart}
        onChange={(e) => setGradientStart(e.target.value)}
        className="h-10 w-full"
      />
      <input
        type="color"
        value={gradientEnd}
        onChange={(e) => setGradientEnd(e.target.value)}
        className="h-10 w-full"
      />
    </div>
  </div>
)}


            <div>
              <label className="block text-sm font-medium mb-1">
                Foreground Color
              </label>
              <input
                type="color"
                value={fgColor}
                onChange={(e) => setFgColor(e.target.value)}
                className="w-full h-10"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Noise Density
              </label>
              <input
                type="range"
                min="0.1" 
                max="0.8"
                step="0.05"
                value={noiseDensity}
                onChange={(e) => setNoiseDensity(parseFloat(e.target.value))}
                className="w-full"
              />
              <div className="text-xs text-gray-500">
                {Math.round(noiseDensity * 100)}%
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Border Width
              </label>
              <input
                type="range"
                min="1"
                max="20"
                step="1"
                value={strokeWidth}
                onChange={(e) => setStrokeWidth(parseInt(e.target.value))}
                className="w-full"
              />
              <div className="text-xs text-gray-500">{strokeWidth}px</div>
            </div>
          </div>
        </div>

        <div className="sticky top-0 h-full flex items-start justify-center">
          <svg
            width="500"
            height="500"
            viewBox={`0 0 ${canvasSize} ${canvasSize}`}
          >
            {/* <defs>
              <clipPath id="shape-clip">
                <path d={shapeDefinitions[containerShape](canvasSize)} />
              </clipPath>
            </defs> */}

            <defs>
  <clipPath id="shape-clip">
    <path d={shapeDefinitions[containerShape](canvasSize)} />
  </clipPath>

  {colorMode === "gradient" && (
    <linearGradient id="qrGradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stopColor={gradientStart} />
      <stop offset="100%" stopColor={gradientEnd} />
    </linearGradient>
  )}
</defs>


            <g clipPath="url(#shape-clip)">
              <rect width={canvasSize} height={canvasSize} fill={bgColor} />
              {generateNoiseElements()}

              {/* QR CODE GROUP */}
              <g transform={`translate(${qrX}, ${qrY}) scale(${qrScale})`}>
                {Array.from({ length: fullSize }).map((_, row) =>
                  Array.from({ length: fullSize }).map((_, col) => {
                    const isQRPixel =
                      isInQRBounds(row, col) &&
                      matrix[row - padding]?.[col - padding] === 1;
                    const isEyeArea = isEye(row, col);
                    if (!isQRPixel || isEyeArea) return null;
                    const x = col * moduleSize + moduleSize / 2;
                    const y = row * moduleSize + moduleSize / 2;
                    return (
                      <path
                        key={`qr-${row}-${col}`}
                        d={modulePath}
                        transform={`translate(${x}, ${y}) scale(1)`}
                        // fill={fgColor}
                        fill={colorMode === "gradient" ? "url(#qrGradient)" : fgColor}

                      />
                    );
                  })
                )}
                {renderEyes()}
              </g>

              {logoImage && (
                <>
                  {/* 🟢 Default ZM Ring (Background) */}
              

<image
  href={platformBadge}
  x={qrCenterX - badgeSize / 2}
  y={qrCenterY - badgeSize / 2}
  width={badgeSize}
  height={badgeSize}
  preserveAspectRatio="xMidYMid meet"
/>

<image
  href={logoImage}
  x={qrCenterX - logoSize / 2}
  y={qrCenterY - logoSize / 2}
  width={logoSize}
  height={logoSize}
  preserveAspectRatio="xMidYMid meet"
/>

                </>
              )}
            </g>

            {/* OUTLINE of the shape */}
            <path
              d={shapeDefinitions[containerShape](canvasSize)}
              fill="none"
             stroke={colorMode === "gradient" ? "url(#qrGradient)" : fgColor}

              strokeWidth={strokeWidth}
              strokeLinejoin="round"
            />
          </svg>
        </div>



      </div>
    </div>
  );
};

export default FullCustomQR;
