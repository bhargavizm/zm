'use client';

import React from 'react';
import { FiLock } from 'react-icons/fi';
import useServicesContext from '@/components/hooks/useServiceContext';
import useDesignContext from '@/components/hooks/useDesignContext';

const formatLabel = (key) =>
  key.replace(/([A-Z])/g, ' $1').replace(/^./, (s) => s.toUpperCase());

const MedicalAlertPreview = () => {
  const { dynamicForms, showPassword } = useServicesContext();
  const { bgDesign } = useDesignContext();
  const medicalAlert = dynamicForms.medicalAlert;

  const hasData = Object.entries(medicalAlert).some(
    ([section, fields]) =>
      section !== 'password' &&
      typeof fields === 'object' &&
      Object.values(fields).some((value) => value?.toString().trim() !== '')
  );

  const isVideo = bgDesign?.endsWith('.mp4');
  const isImage = bgDesign && !isVideo;

  return (
    <div className='flex justify-center'>
    <div className="relative w-[300px] h-[600px] rounded-[40px] border-[14px] border-gray-800 shadow-xl overflow-hidden flex flex-col">

      {/* Background layer */}
      {isImage && (
        <img
          src={bgDesign}
          alt="Background"
          className="absolute inset-0 w-full h-full object-cover z-0"
        />
      )}
      {isVideo && (
        <video
          src={bgDesign}
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover z-0"
        />
      )}
      {!bgDesign && (
        <div className="absolute inset-0 bg-gradient-to-b from-[#d1f0f0] to-white z-0" />
      )}

      {/* Overlay for readability */}
      {/* <div className="absolute inset-0 bg-white/80 backdrop-blur-sm z-0" /> */}

      {/* Top Bar */}
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-1/3 h-6 bg-gray-800 rounded-b-xl z-10" />

      {/* Content */}
      <div className="relative z-10 flex-1 overflow-y-auto no-scrollbar pt-8 pb-4 px-4">
        {hasData ? (
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-center text-[#008080]">
              Medical Alert
            </h2>

            {Object.entries(medicalAlert).map(([section, fields]) => {
              if (section === 'password') return null;

              return (
                typeof fields === 'object' && (
                  <div
                    key={section}
                    className="bg-[#008080]/10 p-3 rounded border border-[#008080]/20 space-y-2"
                  >
                    {Object.entries(fields).map(([key, value]) => {
                      if (!value) return null;
                      return (
                        <div key={key} className="text-sm">
                          <span className="font-medium text-[#008080]">
                            {formatLabel(key)}:
                          </span>{' '}
                          <span className="text-gray-700">{value}</span>
                        </div>
                      );
                    })}
                  </div>
                )
              );
            })}

            {/* Password (if present) */}
            {medicalAlert.password && (
              <div className="bg-gray-100 p-3 rounded">
                <div className="flex items-center text-gray-700 mb-1">
                  <FiLock className="mr-2" />
                  <span className="font-medium">Password Protected</span>
                </div>
                <p>{showPassword ? medicalAlert.password : '●●●●●●●●'}</p>
              </div>
            )}
          </div>
        ) : (
          <div className="h-full flex flex-col items-center justify-center text-center text-gray-400">
            <FiLock className="text-4xl mb-4 text-[#008080]" />
            <h3 className="text-lg font-medium">Medical Alert Preview</h3>
            <p className="mt-2">Fill the form to see the preview</p>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="relative z-10 border-t border-gray-200 text-center text-xs text-gray-500 py-2 bg-white/70">
        <p>Scan for Medical Info</p>
        <p className="mt-1">v1.0.0</p>
      </div>
    </div>
    </div>
  );
};

export default MedicalAlertPreview;
