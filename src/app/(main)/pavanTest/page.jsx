'use client'

import React, { useState, useRef, useEffect } from 'react'
import QRCode from 'qrcode-generator'

const StickerQRGenerator = () => {
  // Configuration state
  const [qrData, setQrData] = useState('https://example.com')
  const [qrColor, setQrColor] = useState('#000000')
  const [bgOpacity, setBgOpacity] = useState(0.7)
  const [qrSizeRatio, setQrSizeRatio] = useState(0.3)
  const [qrPosition, setQrPosition] = useState({ x: 0.5, y: 0.5 })
  const [isDownloading, setIsDownloading] = useState(false)
  const [downloadFormat, setDownloadFormat] = useState('webp')
  const [error, setError] = useState(null)

  // Refs
  const canvasRef = useRef(null)
  const stickerImgRef = useRef(null)
  const qrCanvasRef = useRef(null)

  // Generate QR code
  const generateQRCode = () => {
    if (!qrCanvasRef.current) return

    const qr = QRCode(0, 'H')
    qr.addData(qrData)
    qr.make()

    const canvas = qrCanvasRef.current
    const ctx = canvas.getContext('2d')
    const cells = qr.getModuleCount()
    
    // Set canvas size to match QR code resolution
    canvas.width = cells
    canvas.height = cells
    
    // Clear and draw QR code
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    for (let row = 0; row < cells; row++) {
      for (let col = 0; col < cells; col++) {
        ctx.fillStyle = qr.isDark(row, col) ? qrColor : `rgba(255,255,255,${bgOpacity})`
        ctx.fillRect(col, row, 1, 1)
      }
    }
  }

  // Composite sticker and QR code
  const composeImage = () => {
    if (!canvasRef.current || !stickerImgRef.current || !qrCanvasRef.current) return

    const mainCanvas = canvasRef.current
    const mainCtx = mainCanvas.getContext('2d')
    const qrCanvas = qrCanvasRef.current

    // Set main canvas size (adjust as needed)
    mainCanvas.width = 1024
    mainCanvas.height = 1024

    // Clear and draw sticker
    mainCtx.clearRect(0, 0, mainCanvas.width, mainCanvas.height)
    mainCtx.drawImage(stickerImgRef.current, 0, 0, mainCanvas.width, mainCanvas.height)

    // Calculate QR code position and size
    const qrDisplaySize = Math.min(mainCanvas.width, mainCanvas.height) * qrSizeRatio
    const qrX = mainCanvas.width * qrPosition.x - qrDisplaySize / 2
    const qrY = mainCanvas.height * qrPosition.y - qrDisplaySize / 2

    // Draw QR code with smooth scaling
    mainCtx.imageSmoothingEnabled = true
    mainCtx.drawImage(
      qrCanvas,
      0, 0, qrCanvas.width, qrCanvas.height,
      qrX, qrY, qrDisplaySize, qrDisplaySize
    )
  }

  // Handle download
  const handleDownload = async () => {
    if (!canvasRef.current || isDownloading) return

    setIsDownloading(true)
    setError(null)

    try {
      const canvas = canvasRef.current
      let mimeType, extension

      switch (downloadFormat) {
        case 'png':
          mimeType = 'image/png'
          extension = 'png'
          break
        case 'jpg':
          mimeType = 'image/jpeg'
          extension = 'jpg'
          break
        case 'webp':
        default:
          mimeType = 'image/webp'
          extension = 'webp'
      }

      // For JPEG, we need to ensure opaque background
      if (downloadFormat === 'jpg') {
        const tempCanvas = document.createElement('canvas')
        tempCanvas.width = canvas.width
        tempCanvas.height = canvas.height
        const tempCtx = tempCanvas.getContext('2d')
        
        // Fill with white background
        tempCtx.fillStyle = '#ffffff'
        tempCtx.fillRect(0, 0, tempCanvas.width, tempCanvas.height)
        
        // Draw original content
        tempCtx.drawImage(canvas, 0, 0)
        
        // Use temp canvas for JPEG export
        const dataUrl = tempCanvas.toDataURL(mimeType, 0.92)
        triggerDownload(dataUrl, extension)
      } else {
        const dataUrl = canvas.toDataURL(mimeType)
        triggerDownload(dataUrl, extension)
      }
    } catch (err) {
      console.error('Download error:', err)
      setError('Failed to generate download. Please try again.')
    } finally {
      setIsDownloading(false)
    }
  }

  const triggerDownload = (dataUrl, extension) => {
    const link = document.createElement('a')
    link.download = `sticker-qr-${Date.now()}.${extension}`
    link.href = dataUrl
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  // Effects
  useEffect(() => {
    generateQRCode()
  }, [qrData, qrColor, bgOpacity])

  useEffect(() => {
    composeImage()
  }, [qrSizeRatio, qrPosition])

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <h1 className="text-3xl font-bold text-center mb-8">QR Code Sticker Generator</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Controls */}
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-1">QR Code Content</label>
            <input
              type="text"
              value={qrData}
              onChange={(e) => setQrData(e.target.value)}
              className="w-full px-3 py-2 border rounded-md"
              placeholder="Enter URL or text"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">QR Color</label>
              <input
                type="color"
                value={qrColor}
                onChange={(e) => setQrColor(e.target.value)}
                className="w-full h-10"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Background Opacity: {Math.round(bgOpacity * 100)}%
              </label>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={bgOpacity}
                onChange={(e) => setBgOpacity(parseFloat(e.target.value))}
                className="w-full"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                QR Size: {Math.round(qrSizeRatio * 100)}%
              </label>
              <input
                type="range"
                min="0.1"
                max="0.8"
                step="0.05"
                value={qrSizeRatio}
                onChange={(e) => setQrSizeRatio(parseFloat(e.target.value))}
                className="w-full"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Download Format</label>
              <select
                value={downloadFormat}
                onChange={(e) => setDownloadFormat(e.target.value)}
                className="w-full px-3 py-2 border rounded-md"
              >
                <option value="webp">WEBP</option>
                <option value="png">PNG</option>
                <option value="jpg">JPG</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">QR Position</label>
            <div className="relative h-48 bg-gray-100 rounded-md overflow-hidden">
              <div 
                className="absolute w-6 h-6 bg-blue-500 rounded-full cursor-move transform -translate-x-1/2 -translate-y-1/2"
                style={{
                  left: `${qrPosition.x * 100}%`,
                  top: `${qrPosition.y * 100}%`,
                }}
                onMouseDown={(e) => {
                  e.preventDefault()
                  const startPos = { x: e.clientX, y: e.clientY }
                  const startQrPos = { ...qrPosition }

                  const handleMouseMove = (moveEvent) => {
                    const container = e.target.parentElement.getBoundingClientRect()
                    const newX = Math.min(1, Math.max(0, 
                      startQrPos.x + (moveEvent.clientX - startPos.x) / container.width
                    ))
                    const newY = Math.min(1, Math.max(0, 
                      startQrPos.y + (moveEvent.clientY - startPos.y) / container.height
                    ))
                    setQrPosition({ x: newX, y: newY })
                  }

                  const handleMouseUp = () => {
                    document.removeEventListener('mousemove', handleMouseMove)
                    document.removeEventListener('mouseup', handleMouseUp)
                  }

                  document.addEventListener('mousemove', handleMouseMove)
                  document.addEventListener('mouseup', handleMouseUp)
                }}
              />
            </div>
          </div>

          <button
            onClick={handleDownload}
            disabled={isDownloading}
            className={`w-full py-3 px-4 rounded-md font-medium ${isDownloading 
              ? 'bg-gray-400 cursor-not-allowed' 
              : 'bg-blue-600 hover:bg-blue-700 text-white'}`}
          >
            {isDownloading ? 'Generating...' : 'Download Sticker'}
          </button>

          {error && (
            <div className="text-red-500 text-sm mt-2">{error}</div>
          )}
        </div>

        {/* Preview */}
        <div className="flex flex-col items-center">
          <div className="relative border border-gray-200 rounded-lg overflow-hidden">
            <canvas
              ref={canvasRef}
              width={800 }
              height={800}
              className="w-full max-w-full h-auto"
            />
          </div>
          <p className="text-sm text-gray-500 mt-2">
            Preview (drag the blue dot to reposition QR code)
          </p>
        </div>
      </div>

      {/* Hidden elements */}
      <img
        ref={stickerImgRef}
        src=   "/images/stickers/tea.webp"
        alt="Sticker base"
        className="hidden"
        onLoad={composeImage}
      />
      <canvas ref={qrCanvasRef} className="hidden" />
    </div>
  )
}

export default StickerQRGenerator