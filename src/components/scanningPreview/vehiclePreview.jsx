'use client'
import React, { useEffect } from 'react';
import { FiUser, FiPhone, FiMapPin, FiTruck, FiCalendar } from 'react-icons/fi';
import useDesignContext from '../hooks/useDesignContext';

const VehiclePreview = ({ data }) => {
  const {
    user,
    general,
    registration,
    contact,
    media,
    createdAt,
  } = data;

  const defaultBg = '/services-service/vehicle-preview.webp';
  const { bgDesign, setBgDesign, isLoading, setIsLoading } = useDesignContext();

  const isVideo = defaultBg?.endsWith('.mp4') || defaultBg?.endsWith('.webm');
  const isImage = defaultBg && !isVideo;

  useEffect(() => {
    if (data?.bgDesign) {
      setBgDesign(data.bgDesign);
    } else {
      setBgDesign(defaultBg);
    }
  }, [data]);

  return (
    <div className="flex justify-center">
      <div className="border-gray-800 shadow-xl w-[350px] h-[600px] overflow-hidden p-2 pr-5 flex flex-col relative rounded-[30px] border-[12px]">
        
        {/* Background Layer */}
        {isImage ? (
          <img
            src={bgDesign}
            alt="Background"
            onLoad={() => setTimeout(() => setIsLoading(false), 300)}
            className="absolute top-0 left-0 w-full h-full object-cover z-0"
          />
        ) : isVideo ? (
          <video
            src={bgDesign}
            autoPlay
            loop
            muted
            playsInline
            onLoadedData={() => setTimeout(() => setIsLoading(false), 300)}
            className="absolute top-0 left-0 w-full h-full object-cover z-0"
          />
        ) : (
          <img
            src={defaultBg}
            alt="Default Background"
            onLoad={() => setTimeout(() => setIsLoading(false), 300)}
            className="absolute top-0 left-0 w-full h-full object-cover z-0"
          />
        )}

        {/* Content */}
        <div className="flex-1 overflow-y-auto z-20 bg-white/80 pt-8 m-2 rounded-xl pb-4 px-4 w-full">
          <h2 className="text-xl font-bold text-center text-[#008080] mb-4">Vehicle QR Info</h2>

          <div className="space-y-4 text-black">
            {/* General Info */}
            {(general?.vehicleModel || general?.vehicleType || general?.description) && (
              <div className="bg-[#008080]/10 p-3 rounded border border-[#008080]/20">
                <div className="flex items-center text-[#008080] mb-1">
                  <FiTruck className="mr-2" />
                  <span className="font-medium">General Info</span>
                </div>
                <p><strong>Model:</strong> {general?.vehicleModel || "N/A"}</p>
                <p><strong>Type:</strong> {general?.vehicleType || "N/A"}</p>
                <p><strong>Description:</strong> {general?.description || "N/A"}</p>
              </div>
            )}

            {/* Registration Info */}
            {(registration?.rcNumber || registration?.ownerName || registration?.driverName) && (
              <div className="bg-[#008080]/10 p-3 rounded border border-[#008080]/20">
                <div className="flex items-center text-[#008080] mb-1">
                  <FiUser className="mr-2" />
                  <span className="font-medium">Registration</span>
                </div>
                <p><strong>RC:</strong> {registration?.rcNumber || "N/A"}</p>
                <p><strong>Owner:</strong> {registration?.ownerName || "N/A"}</p>
                <p><strong>Driver:</strong> {registration?.driverName || "N/A"}</p>
              </div>
            )}

            {/* Contact Info */}
            {(contact?.contact || contact?.altContact || contact?.address) && (
              <div className="bg-[#008080]/10 p-3 rounded border border-[#008080]/20">
                <div className="flex items-center text-[#008080] mb-1">
                  <FiPhone className="mr-2" />
                  <span className="font-medium">Contact Info</span>
                </div>
                <p><strong>Phone:</strong> {contact?.contact || "N/A"}</p>
                <p><strong>Alt:</strong> {contact?.altContact || "N/A"}</p>
                <p><strong>Address:</strong> {contact?.address || "N/A"}</p>
              </div>
            )}

            {/* Media Images */}
            {(media?.vehicleImage || media?.licenseFront || media?.licenseBack) && (
              <div className="space-y-2">
                {media?.vehicleImage && (
                  <img src={media.vehicleImage} alt="Vehicle" className="rounded w-full object-cover" />
                )}
                {media?.licenseFront && (
                  <img src={media.licenseFront} alt="License Front" className="rounded w-full object-cover" />
                )}
                {media?.licenseBack && (
                  <img src={media.licenseBack} alt="License Back" className="rounded w-full object-cover" />
                )}
              </div>
            )}

            {/* Created Info */}
            <div className="text-sm text-gray-600">
              <p><strong>User:</strong> {user?.name || "Unknown"}</p>
              <p><strong>Date:</strong> {new Date(createdAt).toLocaleDateString('en-GB')}</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-gray-200 text-center text-xs text-gray-500 py-2 relative z-10 bg-white">
          <p>Scan for vehicle info</p>
          <p className="mt-1">v1.0.0</p>
        </div>
      </div>
    </div>
  );
};

export default VehiclePreview;
