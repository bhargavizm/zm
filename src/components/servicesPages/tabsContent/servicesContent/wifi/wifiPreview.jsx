
'use client';

import React, { useEffect } from 'react';
import useServicesContext from '@/components/hooks/useServiceContext';
import useDesignContext from '@/components/hooks/useDesignContext';
import Image from 'next/image';

const WifiPreview = () => {
  const { wifiFormData } = useServicesContext();
   const { bgDesign, setBgDesign, isLoading, setIsLoading } = useDesignContext();

  const defaultBg = "/services-service/WIFI.webp"

  useEffect(() => {
    setIsLoading(true);
    setBgDesign(defaultBg);
  }, []);

  const { ssid, security } = wifiFormData || {};


const isVideo = bgDesign?.endsWith(".mp4") || bgDesign?.endsWith(".webm");
  const isImage = bgDesign && !isVideo;

  return (
    <div className="flex items-center justify-center">
      <div className="relative w-[350px] h-[650px] border-[12px] border-black rounded-[2rem] shadow-2xl overflow-hidden">

        {/* Background layer */}
        <div className="absolute inset-0 z-0">
          {isImage && (
            <img
              src={bgDesign}
              alt="Background"
               onLoad={() => setTimeout(() => setIsLoading(false), 300)}
              className="w-full h-full object-cover"
            />
          )}
          {isVideo && (
            <video
              src={bgDesign}
              autoPlay
              loop
              muted
              playsInline
               onLoadedData={() => setTimeout(() => setIsLoading(false), 300)}
              className="w-full h-full object-cover"
            />
          )}
          {!bgDesign && (
            <img
              src={defaultBg}
              alt="Default Background"
               onLoad={() => setTimeout(() => setIsLoading(false), 300)}
              className="w-full h-full object-cover"
            />
          )}
          {/* <div className="absolute inset-0 bg-white/80 backdrop-blur-sm" /> */}
        </div>

             {/* ⏳ Loader */}
                {isLoading && (
                  <div className="absolute inset-0 z-50 bg-mainGreen backdrop-blur-sm flex justify-center items-center">
                    <Image
                      src="/logos/ZM LOGO.webp"
                      alt="Loading"
                      width={100}
                      height={100}
                      className="w-20 h-20 animate-bounce"
                    />
                  </div>
                )}


        {/* Indicators */}
        <div className="absolute top-1 left-1/2 transform -translate-x-1/2 w-16 h-1.5 bg-gray-400 rounded-full z-10"></div>
        <div className="absolute top-3 left-[calc(50%-28px)] w-14 h-3 bg-gray-200 rounded-xl z-10"></div>

        {/* Foreground content */}
        <div className="relative z-10 w-full rounded-[1.8rem] p-4 overflow-y-auto no-scrollbar flex flex-col items-center text-center pt-9">

          {ssid && (
            <div className="w-full mb-3 bg-white/70 rounded p-2">
              <p className="text-xs text-gray-700 font-medium mb-1">SSID</p>
              <p className="text-sm text-gray-900 font-semibold">{ssid}</p>
            </div>
          )}

          {security && (
            <div className="w-full mb-3 bg-white/70 rounded p-2">
              <p className="text-xs text-gray-700 font-medium mb-1">Security</p>
              <p className="text-sm text-gray-800">{security}</p>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default WifiPreview;
