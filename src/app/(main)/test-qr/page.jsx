'use client'

import React, { useEffect, useState, useRef } from 'react'
import QRCode from 'qrcode-generator'

// SVG Path definitions for modules
const heartModulePath = `
  M 0 -4
  C 0 -6, 3 -6, 3 -4
  C 3 -2, 0 0, 0 2
  C 0 0, -3 -2, -3 -4
  C -3 -6, 0 -6, 0 -4
  Z
`
const leafModulePath = `
  M 0 -5
  C 2 -4, 4 -2, 5 0
  C 4 2, 2 4, 0 5
  C -2 4, -4 2, -5 0
  C -4 -2, -2 -4, 0 -5
  Z
`
const diamondModulePath = `
  M 0 -5
  L 5 0
  L 0 5
  L -5 0
  Z
`

const eyeFrames = {
    square: (x, y, size, color) => (
        <rect x={x} y={y} width={size} height={size} fill="white" stroke={color} strokeWidth="3" />
    ),
    circle: (x, y, size, color) => (
        <circle cx={x + size / 2} cy={y + size / 2} r={size / 2} fill="white" stroke={color} strokeWidth="3" />
    ),
    rounded: (x, y, size, color) => (
        <rect x={x} y={y} rx={size / 4} ry={size / 4} width={size} height={size} fill="white" stroke={color} strokeWidth="3" />
    ),
    diamond: (x, y, size, color) => {
        const half = size / 2
        return (
            <polygon
                points={`${x + half},${y} ${x + size},${y + half} ${x + half},${y + size} ${x},${y + half}`}
                fill="white"
                stroke={color}
                strokeWidth="3"
            />
        )
    },
    hexagon: (x, y, size, color) => {
        const half = size / 2
        const quarter = size / 4
        return (
            <polygon
                points={` 
          ${x + quarter},${y}
          ${x + size - quarter},${y}
          ${x + size},${y + half}
          ${x + size - quarter},${y + size}
          ${x + quarter},${y + size}
          ${x},${y + half}
        `}
                fill="white"
                stroke={color}
                strokeWidth="3"
            />
        )
    },
}

const eyeballShapes = {
    circle: (x, y, size, color) => (
        <circle cx={x + size / 2} cy={y + size / 2} r={size / 2} fill={color} />
    ),
    square: (x, y, size, color) => (
        <rect x={x} y={y} width={size} height={size} fill={color} />
    ),
    diamond: (x, y, size, color) => {
        const half = size / 2
        return (
            <polygon
                points={`${x + half},${y} ${x + size},${y + half} ${x + half},${y + size} ${x},${y + half}`}
                fill={color}
            />
        )
    },
    cross: (x, y, size, color) => (
        <g>
            <rect x={x} y={y + size / 3} width={size} height={size / 3} fill={color} />
            <rect x={x + size / 3} y={y} width={size / 3} height={size} fill={color} />
        </g>
    ),
    heart: (x, y, size, color) => {
        const scale = size / 8
        return (
            <path
                d={` 
          M${x + size / 2},${y + size / 3 + scale}
          C${x + size / 2 - scale},${y + size / 3 - scale / 2}
          ${x + size / 2 - scale * 2},${y + size / 3 + scale / 2}
          ${x + size / 2},${y + size / 3 + scale * 2.5}
          C${x + size / 2 + scale * 2},${y + size / 3 + scale / 2}
          ${x + size / 2 + scale},${y + size / 3 - scale / 2}
          ${x + size / 2},${y + size / 3 + scale}
          Z
        `}
                fill={color}
            />
        )
    },
}

const moduleShapes = {
    heart: heartModulePath,
    leaf: leafModulePath,
    diamond: diamondModulePath,
    circle: 'M 0 -4 A 4 4 0 0 1 0 4 A 4 4 0 0 1 0 -4 Z',
    square: 'M -4 -4 L 4 -4 L 4 4 L -4 4 Z',
}

const generateQRMatrix = (text, typeNumber = 0, errorCorrectionLevel = 'H') => {
    const qr = QRCode(typeNumber, errorCorrectionLevel)
    qr.addData(text)
    qr.make()
    const size = qr.getModuleCount()
    const matrix = []
    for (let row = 0; row < size; row++) {
        const rowData = []
        for (let col = 0; col < size; col++) {
            rowData.push(qr.isDark(row, col) ? 1 : 0)
        }
        matrix.push(rowData)
    }
    return matrix
}

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
    car: (size) => `
  M465.725,174.758
  c-1.853-4.834-6.493-8.026-11.672-8.026h-26.768l-34.321-80.676
  c-1.962-4.612-6.49-7.606-11.502-7.606h-37.824
  c-0.192-0.005-0.386-0.005-0.58,0h-203.62
  c-0.194-0.005-0.387-0.005-0.58,0h-37.824
  c-5.012,0-9.54,2.994-11.502,7.606l-34.321,80.676H28.443
  c-5.178,0-9.819,3.192-11.672,8.026L0.828,216.356
  c-1.473,3.843-0.96,8.165,1.372,11.556
  c2.332,3.392,6.184,5.417,10.3,5.417h0.748l-9,40.756
  c-0.327,1.482-0.382,3.012-0.161,4.512l9.951,67.733
  c0.901,6.136,6.166,10.683,12.367,10.683h4.67v34.536
  c0,6.903,5.596,12.5,12.5,12.5h74.934
  c6.904,0,12.5-5.597,12.5-12.5v-34.534h220.478v34.534
  c0,6.903,5.596,12.5,12.5,12.5h74.935
  c6.904,0,12.5-5.597,12.5-12.5v-34.534h4.669
  c6.202,0,11.466-4.547,12.367-10.683l9.951-67.733
  c0.221-1.5,0.166-3.029-0.161-4.512l-9-40.756h0.748
  c4.116,0,7.968-2.026,10.3-5.417s2.845-7.713,1.372-11.556
  L465.725,174.758z
`,
    ice: (size) => `
  M ${size * (15 / 24)}, ${size * (17 / 24)} 
  H ${size * (19 / 24)} 
  V ${size * (8 / 24)} 
  C ${size * (19 / 24)}, ${size * (4.13401 / 24)} ${size * (15.866 / 24)}, ${size * (1 / 24)} ${size * (12 / 24)}, ${size * (1 / 24)} 
  C ${size * (8.13401 / 24)}, ${size * (1 / 24)} ${size * (5 / 24)}, ${size * (4.13401 / 24)} ${size * (5 / 24)}, ${size * (8 / 24)} 
  V ${size * (17 / 24)} 
  H ${size * (9 / 24)} 
  V ${size * (20 / 24)} 
  C ${size * (9 / 24)}, ${size * (21.6569 / 24)} ${size * (10.3431 / 24)}, ${size * (23 / 24)} ${size * (12 / 24)}, ${size * (23 / 24)} 
  C ${size * (13.6569 / 24)}, ${size * (23 / 24)} ${size * (15 / 24)}, ${size * (21.6569 / 24)} ${size * (15 / 24)}, ${size * (20 / 24)} 
  V ${size * (17 / 24)} 
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
    star: (size) => {
        const spikes = 5
        const outerRadius = size / 2
        const innerRadius = outerRadius * 0.4
        let path = `M ${size / 2}, ${size / 2 - outerRadius} `
        for (let i = 1; i <= spikes; i++) {
            const angle = Math.PI * 2 / spikes * i
            path += `L ${size / 2 + Math.sin(angle - Math.PI / spikes) * innerRadius}, ${size / 2 - Math.cos(angle - Math.PI / spikes) * innerRadius} `
            path += `L ${size / 2 + Math.sin(angle) * outerRadius}, ${size / 2 - Math.cos(angle) * outerRadius} `
        }
        path += 'Z'
        return path
    }
}

const FullCustomQR = () => {
    const [matrix, setMatrix] = useState([])
    const [text, setText] = useState('www.zmqrcode.in')
    const [eyeFrameType, setEyeFrameType] = useState('rounded')
    const [eyeballType, setEyeballType] = useState('circle')
    const [moduleShape, setModuleShape] = useState('heart')
    const [bgColor, setBgColor] = useState('#ffffff')
    const [fgColor, setFgColor] = useState('#111111')
    const [noiseDensity, setNoiseDensity] = useState(0.3)
    const [containerShape, setContainerShape] = useState('heart')
    const [strokeWidth, setStrokeWidth] = useState(12)
    const [isDownloading, setIsDownloading] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')

    const svgRef = useRef(null)
    const moduleSize = 8 // Base size for QR modules
    const padding = 2 // Padding around the QR code matrix
    const svgDisplaySize = 512 // Size for on-screen SVG display
    const downloadResolution = 1024 // Resolution for downloaded images

    // Get the actual QR code matrix size after generation
    const qrSize = matrix.length
    // Calculate the full size including padding in terms of modules
    const fullSizeModules = qrSize + padding * 2

    useEffect(() => {
        const qrMatrix = generateQRMatrix(text)
        setMatrix(qrMatrix)
    }, [text])

    // Helper function to determine if a module is part of an eye pattern
    const isEye = (row, col) => {
        const eyeSize = 7 // Size of the eye pattern in modules
        const positions = [
            [0, 0], // Top-left eye
            [0, qrSize - eyeSize], // Top-right eye
            [qrSize - eyeSize, 0], // Bottom-left eye
        ]
        return positions.some(
            ([ey, ex]) =>
                row >= padding + ey &&
                row < padding + ey + eyeSize &&
                col >= padding + ex &&
                col < padding + ex + eyeSize,
        )
    }

    // Helper function to check if a module is within the QR code's actual data bounds
    const isInQRBounds = (row, col) => {
        return (
            row >= padding &&
            col >= padding &&
            row < padding + qrSize &&
            col < padding + qrSize
        )
    }

    // Generates random noise elements outside the main QR code area
    const generateNoiseElements = () => {
        const elements = []
        // Calculate number of noise elements based on density
        const numElements = Math.floor(fullSizeModules * fullSizeModules * noiseDensity)
        const modulePath = moduleShapes[moduleShape] || heartModulePath

        // Calculate QR code boundaries in SVG display coordinates
        const qrWidthDisplay = fullSizeModules * moduleSize * qrScale
        const qrHeightDisplay = fullSizeModules * moduleSize * qrScale
        const qrXDisplay = (svgDisplaySize - qrWidthDisplay) / 2
        const qrYDisplay = (svgDisplaySize - qrHeightDisplay) / 2

        // Function to get a random point outside the QR code area but within the container shape
        const getRandomPointOutsideQR = () => {
            const margin = svgDisplaySize * 0.002 // Small margin from edges
            let x, y
            let attempts = 0
            const maxAttempts = 200 // Max attempts to find a suitable spot

            do {
                attempts++
                if (attempts > maxAttempts) {
                    // Fallback to random position outside QR if too many attempts
                    if (Math.random() > 0.5) {
                        // Left or right of QR
                        x = Math.random() > 0.5
                            ? qrXDisplay + qrWidthDisplay + Math.random() * (svgDisplaySize - (qrXDisplay + qrWidthDisplay) - margin)
                            : margin + Math.random() * (qrXDisplay - margin)
                        y = margin + Math.random() * (svgDisplaySize - 2 * margin)
                    } else {
                        // Above or below QR
                        x = margin + Math.random() * (svgDisplaySize - 2 * margin)
                        y = Math.random() > 0.5
                            ? qrYDisplay + qrHeightDisplay + Math.random() * (svgDisplaySize - (qrYDisplay + qrHeightDisplay) - margin)
                            : margin + Math.random() * (qrYDisplay - margin)
                    }
                    break
                }

                // Generate random point within the general bounds of the container shape
                switch (containerShape) {
                    case 'circle':
                        const angle = Math.random() * Math.PI * 2
                        const radius = margin + Math.random() * (svgDisplaySize / 2 - margin)
                        x = svgDisplaySize / 2 + Math.cos(angle) * radius
                        y = svgDisplaySize / 2 + Math.sin(angle) * radius
                        break
                    case 'heart':
                        // Simple bounding box for heart, more complex check needed for true "inside heart"
                        x = svgDisplaySize / 2 - svgDisplaySize * 0.4 + Math.random() * svgDisplaySize * 0.8
                        y = svgDisplaySize / 2 - svgDisplaySize * 0.3 + Math.random() * svgDisplaySize * 0.6
                        break
                    default: // For square, diamond, star, car, ice, just use full canvas bounds
                        x = margin + Math.random() * (svgDisplaySize - 2 * margin)
                        y = margin + Math.random() * (svgDisplaySize - 2 * margin)
                }

                // Check if point is outside QR code area
                const isOutsideQR = x < qrXDisplay || x > (qrXDisplay + qrWidthDisplay) || y < qrYDisplay || y > (qrYDisplay + qrHeightDisplay)
                if (!isOutsideQR) {
                    x = y = null // Force retry if inside QR area
                }
            } while (x === null || y === null)

            return { x, y }
        }

        for (let i = 0; i < numElements; i++) {
            const { x, y } = getRandomPointOutsideQR()
            const size = 0.8 + Math.random() * 0.4 // Random size for noise elements
            const rotation = Math.random() * 360 // Random rotation

            elements.push(
                <path
                    key={`noise-${i}`}
                    d={modulePath}
                    transform={`translate(${x}, ${y}) scale(${size}) rotate(${rotation})`}
                    fill={fgColor}
                    opacity={0.8 + Math.random() * 0.2} // Slightly varied opacity
                />
            )
        }

        return elements
    }

    // Renders the three eye patterns of the QR code
    const renderEyes = () => {
        if (matrix.length < 7) return null // QR code must be large enough to have eyes

        const eyeSize = 7 // Size of eye in modules
        const eyeModuleSize = eyeSize * moduleSize // Pixel size of eye
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
        ]

        const EyeFrameComponent = eyeFrames[eyeFrameType]
        const EyeballComponent = eyeballShapes[eyeballType]

        return eyes.map((eye, index) => (
            <g key={`eye-${index}`}>
                {EyeFrameComponent(eye.x, eye.y, eyeModuleSize, fgColor)}
                {EyeballComponent(
                    eye.x + eyeModuleSize / 4,
                    eye.y + eyeModuleSize / 4,
                    eyeModuleSize / 2,
                    fgColor,
                )}
            </g>
        ))
    }

    const modulePath = moduleShapes[moduleShape] || heartModulePath

    // Calculate the optimal scale for the QR code to fit within the SVG display size
    const calculateQRScale = () => {
        const qrWidthInPixels = fullSizeModules * moduleSize
        const maxWidth = svgDisplaySize * 0.8 // Leave some margin within the SVG
        return Math.min(maxWidth / qrWidthInPixels, 1)
    }

    const qrScale = calculateQRScale()
    const qrWidth = fullSizeModules * moduleSize * qrScale
    const qrHeight = fullSizeModules * moduleSize * qrScale
    const qrX = (svgDisplaySize - qrWidth) / 2
    const qrY = (svgDisplaySize - qrHeight) / 2

    // Handles downloading the QR code in various formats
    const downloadQRCode = async (format) => {
        if (!svgRef.current || isDownloading) return;

        setIsDownloading(true);
        setErrorMessage('');

        try {
            const svgElement = svgRef.current.cloneNode(true);

            // Ensure all external references are properly included
            const styles = document.createElement('style');
            styles.textContent = `
      text { font-family: Arial, sans-serif; }
      path, rect, circle, polygon { vector-effect: non-scaling-stroke; }
    `;
            svgElement.prepend(styles);

            // Serialize the cloned SVG
            const svgData = new XMLSerializer().serializeToString(svgElement);
            const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });

            if (format === 'svg') {
                const svgUrl = URL.createObjectURL(svgBlob);
                const downloadLink = document.createElement('a');
                downloadLink.href = svgUrl;
                downloadLink.download = `qr-code-${Date.now()}.svg`;
                document.body.appendChild(downloadLink);
                downloadLink.click();
                document.body.removeChild(downloadLink);
                URL.revokeObjectURL(svgUrl);
                return;
            }

            // For raster formats (PNG/JPG)
            const canvas = document.createElement('canvas');
            canvas.width = downloadResolution;
            canvas.height = downloadResolution;
            const ctx = canvas.getContext('2d');

            // Create an image to draw the SVG
            const img = new Image();
            const svgUrl = URL.createObjectURL(svgBlob);

            await new Promise((resolve, reject) => {
                img.onload = () => {
                    // Fill with white background first
                    ctx.fillStyle = bgColor;
                    ctx.fillRect(0, 0, canvas.width, canvas.height);

                    // Draw the SVG
                    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
                    URL.revokeObjectURL(svgUrl);
                    resolve();
                };
                img.onerror = () => {
                    URL.revokeObjectURL(svgUrl);
                    reject(new Error('Failed to load SVG image for conversion.'));
                };
                img.src = svgUrl;
            });

            // Convert to requested format
            let mimeType, extension;
            if (format === 'png') {
                mimeType = 'image/png';
                extension = 'png';
            } else if (format === 'jpg' || format === 'jpeg') {
                mimeType = 'image/jpeg';
                extension = 'jpg';
                // For JPG, we need to fill the transparent areas with background color
                ctx.globalCompositeOperation = 'destination-over';
                ctx.fillStyle = bgColor;
                ctx.fillRect(0, 0, canvas.width, canvas.height);
            }

            const dataUrl = canvas.toDataURL(mimeType);
            const downloadLink = document.createElement('a');
            downloadLink.href = dataUrl;
            downloadLink.download = `qr-code-${Date.now()}.${extension}`;
            document.body.appendChild(downloadLink);
            downloadLink.click();
            document.body.removeChild(downloadLink);
        } catch (error) {
            console.error('Error downloading QR code:', error);
            setErrorMessage('Failed to download QR code. Please try again.');
        } finally {
            setIsDownloading(false);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4 font-inter" style={{ backgroundColor: bgColor }}>
            <h1 className="text-3xl font-bold mb-6" style={{ color: fgColor }}>Custom QR Code Generator</h1>

            <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-xl mb-6">
                <input
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Enter your URL or Text"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent mb-4 text-gray-800"
                    style={{ borderColor: fgColor + '30' }} // Light border based on foreground color

                />


                {errorMessage && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
                        <span className="block sm:inline">{errorMessage}</span>
                        <button
                            className="absolute top-0 bottom-0 right-0 px-4 py-3"
                            onClick={() => setErrorMessage('')}
                            aria-label="Close alert"
                        >
                            <svg className="fill-current h-6 w-6 text-red-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.697l-2.651 3.152a1.2 1.2 0 1 1-1.697-1.697l3.152-2.651-3.152-2.651a1.2 1.2 0 0 1 1.697-1.697L10 8.303l2.651-3.152a1.2 1.2 0 1 1 1.697 1.697L11.697 10l3.152 2.651a1.2 1.2 0 0 1 0 1.698z" /></svg>
                        </button>
                    </div>
                )}

                <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                        <label className="block text-sm font-medium mb-1 text-gray-700">Eye Frame Style</label>
                        <select
                            value={eyeFrameType}
                            onChange={(e) => setEyeFrameType(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                            {Object.keys(eyeFrames).map((style) => (
                                <option key={style} value={style}>
                                    {style.charAt(0).toUpperCase() + style.slice(1)}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1 text-gray-700">Eyeball Shape</label>
                        <select
                            value={eyeballType}
                            onChange={(e) => setEyeballType(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                            {Object.keys(eyeballShapes).map((shape) => (
                                <option key={shape} value={shape}>
                                    {shape.charAt(0).toUpperCase() + shape.slice(1)}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1 text-gray-700">Module Shape</label>
                        <select
                            value={moduleShape}
                            onChange={(e) => setModuleShape(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                            {Object.keys(moduleShapes).map((shape) => (
                                <option key={shape} value={shape}>
                                    {shape.charAt(0).toUpperCase() + shape.slice(1)}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1 text-gray-700">Container Shape</label>
                        <select
                            value={containerShape}
                            onChange={(e) => setContainerShape(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                            {Object.keys(shapeDefinitions).map((shape) => (
                                <option key={shape} value={shape}>
                                    {shape.charAt(0).toUpperCase() + shape.slice(1)}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1 text-gray-700">Background Color</label>
                        <input
                            type="color"
                            value={bgColor}
                            onChange={(e) => setBgColor(e.target.value)}
                            className="w-full h-10 border border-gray-300 rounded-md cursor-pointer"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1 text-gray-700">Foreground Color</label>
                        <input
                            type="color"
                            value={fgColor}
                            onChange={(e) => setFgColor(e.target.value)}
                            className="w-full h-10 border border-gray-300 rounded-md cursor-pointer"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1 text-gray-700">Noise Density</label>
                        <input
                            type="range"
                            min="0.0"
                            max="0.8"
                            step="0.05"
                            value={noiseDensity}
                            onChange={(e) => setNoiseDensity(parseFloat(e.target.value))}
                            className="w-full h-6 rounded-lg appearance-none cursor-pointer bg-gray-200 accent-blue-500"
                        />
                        <div className="text-xs text-gray-500 text-right">{Math.round(noiseDensity * 100)}%</div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1 text-gray-700">Border Width</label>
                        <input
                            type="range"
                            min="1"
                            max="20"
                            step="1"
                            value={strokeWidth}
                            onChange={(e) => setStrokeWidth(parseInt(e.target.value))}
                            className="w-full h-6 rounded-lg appearance-none cursor-pointer bg-gray-200 accent-blue-500"
                        />
                        <div className="text-xs text-gray-500 text-right">{strokeWidth}px</div>
                    </div>
                </div>

                {/* Download Buttons */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-4">
                    <button
                        onClick={() => downloadQRCode('svg')}
                        disabled={isDownloading}
                        className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors duration-200"
                    >
                        {isDownloading ? '...' : 'Download SVG'}
                    </button>
                    <button
                        onClick={() => downloadQRCode('png')}
                        disabled={isDownloading}
                        className="px-4 py-2 bg-green-600 text-white font-semibold rounded-md shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors duration-200"
                    >
                        {isDownloading ? '...' : 'Download PNG'}
                    </button>
                    <button
                        onClick={() => downloadQRCode('jpg')}
                        disabled={isDownloading}
                        className="px-4 py-2 bg-purple-600 text-white font-semibold rounded-md shadow-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors duration-200"
                    >
                        {isDownloading ? '...' : 'Download JPG'}
                    </button>
                    <button
                        onClick={() => downloadQRCode('jpeg')}
                        disabled={isDownloading}
                        className="px-4 py-2 bg-orange-600 text-white font-semibold rounded-md shadow-md hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors duration-200"
                    >
                        {isDownloading ? '...' : 'Download JPEG'}
                    </button>
                </div>
            </div>

            <img src="/images/stickers/design-rect.webp " className='z-0 absolute top-160' />

            <div className=" rounded-lg shadow-xl p-2 z-10" >
                <svg
                    ref={svgRef}
                    width={svgDisplaySize}
                    height={svgDisplaySize}
                    viewBox={`0 0 ${svgDisplaySize} ${svgDisplaySize}`}
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <defs>
                        <clipPath id="shape-clip">
                            <path d={shapeDefinitions[containerShape](svgDisplaySize)} />
                        </clipPath>
                    </defs>

                    <g clipPath="url(#shape-clip)">
                        <rect width={svgDisplaySize} height={svgDisplaySize} fill={bgColor} />
                        {generateNoiseElements()}

                        {/* Main QR Code Content - centered and scaled */}
                        <g transform={`translate(${qrX}, ${qrY}) scale(${qrScale})`}>
                            {Array.from({ length: fullSizeModules }).map((_, row) =>
                                Array.from({ length: fullSizeModules }).map((_, col) => {
                                    const isQRPixel = isInQRBounds(row, col) && matrix[row - padding]?.[col - padding] === 1
                                    const isEyeArea = isEye(row, col)
                                    if (!isQRPixel || isEyeArea) return null
                                    const x = col * moduleSize + moduleSize / 2
                                    const y = row * moduleSize + moduleSize / 2
                                    return (
                                        <path
                                            key={`qr-${row}-${col}`}
                                            d={modulePath}
                                            transform={`translate(${x}, ${y}) scale(1)`}
                                            fill={fgColor}
                                        />
                                    )
                                })
                            )}
                            {renderEyes()}
                        </g>
                    </g>

                    {/* Shape Outline */}
                    <path
                        d={shapeDefinitions[containerShape](svgDisplaySize)}
                        fill="none"
                        stroke={fgColor}
                        strokeWidth={strokeWidth}
                        strokeLinejoin="round"
                    />
                </svg>
            </div>
        </div>
    )
}

export default FullCustomQR