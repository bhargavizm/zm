
"use client";

import useDesignContext from "@/components/hooks/useDesignContext";
import Image from "next/image";
import React from "react";

const PreviewPanel = () => {
  const { selectedQRShape, selectedLogo, selectedSticker, logoSize } = useDesignContext();

  return (
    <>
      {selectedSticker && (
        <div className="relative w-[350px] h-[350px] mx-auto mb-4">

          {/* Sticker Background (base layer) */}
          <Image
            src={selectedSticker}
            alt="Sticker"
            fill
            className="object-contain rounded-lg z-10"
          />

          {/* QR Shape (middle layer, centered) */}
          {selectedQRShape && (
            <Image
              src={selectedQRShape}
              alt="QR Shape"
              width={190}
              height={150}
              className="absolute pt-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20"
            />
          )}

          {/* Logo (top layer, centered) */}
          {selectedLogo && (
            <Image
              src={selectedLogo}
              alt="Logo"
              width={logoSize}
              height={logoSize}
              className="absolute top-1/2 pt-12 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-30"
            />
          )}

        </div>
      )}
    </>
  );
};

export default PreviewPanel;
