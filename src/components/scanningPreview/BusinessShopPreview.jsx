"use client";
import React, { useEffect, useState } from "react";
import {
  FiUser,
  FiPhone,
  FiImage,
  FiVideo,
} from "react-icons/fi";

const BusinessShopPreview = ({ data }) => {
  const defaultBg = "/images/templates/businessShop1.webp";
  const [bgDesign, setBgDesign] = useState(defaultBg);
  const [isLoading, setIsLoading] = useState(true);

  const isVideo = bgDesign?.endsWith(".mp4") || bgDesign?.endsWith(".webm");
  const isImage = bgDesign && !isVideo;

  // Flatten businessInfo data
  const general = data?.businessInfo?.general || {};
  const contact = data?.businessInfo?.contact || {};
  const media = data?.businessInfo?.media || {};
  const security = data?.businessInfo?.security || {};
  const user = data?.user || {};

  const mergedData = {
    ...general,
    ...contact,
    ...media,
    ...security,
    owner: user?.name || "",
  };

  useEffect(() => {
    if (data?.bgDesign) {
      setBgDesign(data.bgDesign);
    } else {
      setBgDesign(defaultBg);
    }
  }, [data]);

  const hasData =
    mergedData.businessName ||
    mergedData.businessType ||
    mergedData.description ||
    mergedData.establishedDate ||
    mergedData.shopTimings ||
    mergedData.discount ||
    mergedData.owner ||
    mergedData.phone ||
    mergedData.altPhone ||
    mergedData.email ||
    mergedData.address ||
    mergedData.logo ||
    mergedData.video ||
    (Array.isArray(mergedData.gallery) && mergedData.gallery.length > 0);

  const getSrc = (input) =>
    typeof input === "string" ? input : URL.createObjectURL(input);

  return (
    <div className="flex justify-center">
      <div className="rounded-[40px] border-[14px] border-gray-800 shadow-xl w-[350px] h-[600px] overflow-hidden flex flex-col relative">
        {/* Background */}
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

        {/* iPhone Notch */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-1/3 h-6 bg-gray-800 rounded-b-xl z-10" />

        {/* Business Logo on top center */}
        {mergedData.logo && (
          <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-30">
            <img
              src={getSrc(mergedData.logo)}
              alt="Business Logo"
              className="w-20 h-20 object-cover rounded-full border-4 border-white shadow-lg"
            />
          </div>
        )}

        {/* Main content */}
        <div className="flex-1 overflow-y-auto z-20 bg-white/80 pt-28 m-2 rounded-xl pb-4 px-4 w-full">
          {hasData ? (
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-center text-[#008080]">
                Business QR Code
              </h2>

              {mergedData.businessName && (
                <div className="text-center">
                  <h3 className="text-lg font-semibold">{mergedData.businessName}</h3>
                </div>
              )}

              {(mergedData.businessType ||
                mergedData.description ||
                mergedData.establishedDate ||
                mergedData.shopTimings ||
                mergedData.discount) && (
                <div className="bg-[#008080]/10 p-3 rounded border border-[#008080]/20 text-black">
                  <div className="flex items-center text-[#008080] mb-1">
                    <FiUser className="mr-2" />
                    <span className="font-medium">Business Info</span>
                  </div>
                  {mergedData.businessType && <p>Type: {mergedData.businessType}</p>}
                  {mergedData.description && <p>{mergedData.description}</p>}
                  {mergedData.establishedDate && (
                    <p>
                      Established:{" "}
                      {new Date(mergedData.establishedDate).toLocaleDateString("en-GB")}
                    </p>
                  )}
                  {mergedData.shopTimings && <p>Timings: {mergedData.shopTimings}</p>}
                  {mergedData.discount && (
                    <p className="text-red-600 font-medium">Offer: {mergedData.discount}</p>
                  )}
                </div>
              )}

              {(mergedData.owner ||
                mergedData.phone ||
                mergedData.altPhone ||
                mergedData.email ||
                mergedData.address) && (
                <div className="bg-[#008080]/10 p-3 rounded border border-[#008080]/20 text-black">
                  <div className="flex items-center text-[#008080] mb-1">
                    <FiPhone className="mr-2" />
                    <span className="font-medium">Contact</span>
                  </div>
                  {mergedData.owner && <p>Owner: {mergedData.owner}</p>}
                  {mergedData.phone && <p>Phone: {mergedData.phone}</p>}
                  {mergedData.altPhone && <p>Alt Phone: {mergedData.altPhone}</p>}
                  {mergedData.email && <p>Email: {mergedData.email}</p>}
                  {mergedData.address && <p>Address: {mergedData.address}</p>}
                </div>
              )}

              {(mergedData.video ||
                (mergedData.gallery?.length > 0)) && (
                <div className="bg-[#008080]/10 p-3 rounded border border-[#008080]/20 text-black space-y-3">
                  <div className="flex items-center text-[#008080] mb-1">
                    <FiImage className="mr-2" />
                    <span className="font-medium">Media</span>
                  </div>
                  {mergedData.video && (
                    <div>
                      <FiVideo className="inline mr-2" />
                      <video
                        src={getSrc(mergedData.video)}
                        controls
                        className="w-full rounded"
                      />
                    </div>
                  )}
                  {mergedData.gallery?.length > 0 && (
                    <div className="grid grid-cols-2 gap-2">
                      {mergedData.gallery.map((img, idx) => (
                        <img
                          key={idx}
                          src={getSrc(img)}
                          alt={`Gallery ${idx + 1}`}
                          className="rounded object-cover w-full h-24"
                        />
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-center text-gray-400">
              <FiUser className="text-4xl mb-4 text-[#008080]" />
              <h3 className="text-lg font-medium">Business Preview</h3>
              <p className="mt-2">No business data provided.</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-gray-200 text-center text-xs text-gray-500 py-2 relative z-10 bg-white">
          <p>Scan for Business Info</p>
          <p className="mt-1">v1.0.0</p>
        </div>
      </div>
    </div>
  );
};

export default BusinessShopPreview;
