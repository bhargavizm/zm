'use client';

import React from 'react';
import useServicesContext from '@/components/hooks/useServiceContext';
import useDesignContext from '@/components/hooks/useDesignContext';

const WifiPreview = () => {
  const { wifiFormData } = useServicesContext();
  const { bgDesign } = useDesignContext();

  const { ssid, password, security } = wifiFormData[0] || {};

  const isVideo = bgDesign?.endsWith(".mp4");
  const isImage = bgDesign && !isVideo;

  return (
    <div className="flex items-center justify-center py-10">
      <div className="relative w-[280px] h-[580px] border-[12px] border-black rounded-[2rem] shadow-2xl overflow-hidden">

        {/* Background layer */}
        <div className="absolute inset-0 z-0">
          {isImage && (
            <img
              src={bgDesign}
              alt="Background"
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
              className="w-full h-full object-cover"
            />
          )}
          {!bgDesign && (
            <img
              src="/services-service/wifi.jpg"
              alt="Default Background"
              className="w-full h-full object-cover"
            />
          )}
          {/* <div className="absolute inset-0 bg-white/80 backdrop-blur-sm" /> */}
        </div>

        {/* Indicators */}
        <div className="absolute top-1 left-1/2 transform -translate-x-1/2 w-16 h-1.5 bg-gray-400 rounded-full z-10"></div>
        <div className="absolute top-3 left-[calc(50%-28px)] w-14 h-3 bg-gray-200 rounded-xl z-10"></div>

        {/* Foreground content */}
        <div className="relative z-10 h-full w-full rounded-[1.8rem] p-4 overflow-y-auto no-scrollbar flex flex-col items-center text-center pt-9">

          {ssid && (
            <div className="w-full mb-3 bg-white/80 rounded p-2">
              <p className="text-xs text-gray-700 font-medium mb-1">SSID</p>
              <p className="text-sm text-gray-900 font-semibold">{ssid}</p>
            </div>
          )}

          {security && (
            <div className="w-full mb-3 bg-white/80 rounded p-2">
              <p className="text-xs text-gray-700 font-medium mb-1">Security</p>
              <p className="text-sm text-gray-800">{security}</p>
            </div>
          )}

          {password && (
            <div className="w-full mb-3 bg-white/80 rounded p-2">
              <p className="text-xs text-gray-700 font-medium mb-1">Password</p>
              <p className="text-gray-800">••••••••</p>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default WifiPreview;
