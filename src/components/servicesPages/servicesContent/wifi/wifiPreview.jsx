'use client';

import React from 'react';
import useServicesContext from '@/components/hooks/useServiceContext';

const WifiPreview = () => {
  const { wifiFormData } = useServicesContext();

  const { ssid, password, security } = wifiFormData[0] || {};

  return (
    <div className=" flex items-center justify-center">
      <div className="w-[280px] h-[580px] bg-black rounded-[2rem] border-[12px] border-black shadow-2xl relative">
        <div className="absolute top-1 left-1/2 transform -translate-x-1/2 w-16 h-1.5 bg-gray-400 rounded-full"></div>
        <div className="absolute top-3 left-[calc(50%-28px)] w-14 h-3 bg-gray-200 rounded-xl z-10"></div>
        <div className="bg-white h-full w-full rounded-[1.8rem] p-4 overflow-y-auto no-scrollbar flex flex-col items-center text-center pt-9">
       

          {ssid && (
            <div className="w-full mb-3">
              <p className="text-xs text-gray-500 font-medium mb-1">SSID</p>
              <p className="text-sm text-gray-800 font-semibold">{ssid}</p>
            </div>
          )}

          {security && (
            <div className="w-full mb-3">
              <p className="text-xs text-gray-500 font-medium mb-1">Security</p>
              <p className="text-sm text-gray-700">{security}</p>
            </div>
          )}

          {password && (
            <div className="w-full mb-3">
              <p className="text-xs text-gray-500 font-medium mb-1">Password</p>
              <p className="text-gray-700">••••••••</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WifiPreview;
