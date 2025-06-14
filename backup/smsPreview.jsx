'use client'

import React from 'react'
import { FiUser, FiMessageSquare, FiCalendar, FiLock } from 'react-icons/fi'
import useServicesContext from "@/components/hooks/useServiceContext";
import useDesignContext from '@/components/hooks/useDesignContext';

const SmsPreview = () => {
  const { bgDesign } = useDesignContext();
  const { smsFormData, showPassword } = useServicesContext();

  const isVideo = bgDesign?.endsWith(".mp4");
  const isImage = bgDesign && !isVideo;

  const hasData =
    smsFormData.genderName ||
    smsFormData.messageType ||
    smsFormData.textMessage ||
    smsFormData.date ||
    smsFormData.password;

  return (
    <div className="bg-white rounded-[40px] border-[14px] border-gray-800 shadow-xl w-[300px] h-[600px] overflow-hidden flex flex-col relative">

      {/* 🔳 Background Layer */}
      {isImage && (
        <img
          src={bgDesign}
          alt="Background"
          className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none"
        />
      )}
      {isVideo && (
        <video
          src={bgDesign}
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none"
        />
      )}
      {!bgDesign && (
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none"
        >
          <source src="/services-service/vehicle-info.mp4" type="video/mp4" />
        </video>
      )}

      {/* iPhone Notch */}
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-1/3 h-6 bg-gray-800 rounded-b-xl z-10" />

      {/* 🔲 Foreground Content */}
      <div className="flex-1 overflow-y-auto no-scrollbar pt-8 pb-4 px-4 relative z-10">
        {hasData ? (
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-center text-[#008080]">SMS QR Code</h2>

            {/* Recipient */}
            {(smsFormData.genderName || smsFormData.messageType) && (
              <div className="bg-[#008080]/10 p-3 rounded border border-[#008080]/20 text-black">
                <div className="flex items-center text-[#008080] mb-1">
                  <FiUser className="mr-2" />
                  <span className="font-medium">Recipient</span>
                </div>
                {smsFormData.genderName && <p>{smsFormData.genderName}</p>}
                {smsFormData.messageType && <p>Type: {smsFormData.messageType}</p>}
              </div>
            )}

            {/* Message */}
            {smsFormData.textMessage && (
              <div className="bg-[#008080]/10 p-3 rounded border border-[#008080]/20 text-black">
                <div className="flex items-center text-[#008080] mb-1">
                  <FiMessageSquare className="mr-2" />
                  <span className="font-medium">Message</span>
                </div>
                <p>{smsFormData.textMessage}</p>
              </div>
            )}

            {/* Date */}
            {smsFormData.date && (
              <div className="bg-gray-100 p-3 rounded text-black">
                <div className="flex items-center text-gray-700 mb-1">
                  <FiCalendar className="mr-2" />
                  <span className="font-medium">Date</span>
                </div>
                <p>{new Date(smsFormData.date).toLocaleDateString('en-GB')}</p>
              </div>
            )}

            {/* Password */}
            {smsFormData.password && (
              <div className="bg-gray-100 p-3 rounded text-black">
                <div className="flex items-center text-gray-700 mb-1">
                  <FiLock className="mr-2" />
                  <span className="font-medium">Password Protected</span>
                </div>
                <p>{showPassword ? smsFormData.password : '●●●●●●●●'}</p>
              </div>
            )}
          </div>
        ) : (
          <div className="h-full flex flex-col items-center justify-center text-center text-gray-400">
            <FiMessageSquare className="text-4xl mb-4 text-[#008080]" />
            <h3 className="text-lg font-medium">SMS QR Preview</h3>
            <p className="mt-2">Fill the form to see your SMS QR code preview</p>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="border-t border-gray-200 text-center text-xs text-gray-500 py-2 relative z-10 bg-white">
        <p>Scan to send SMS</p>
        <p className="mt-1">v1.0.0</p>
      </div>
    </div>
  )
}

export default SmsPreview;
