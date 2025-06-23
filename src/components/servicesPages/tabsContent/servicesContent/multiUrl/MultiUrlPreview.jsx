"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import useServicesContext from "@/components/hooks/useServiceContext";
import useDesignContext from "@/components/hooks/useDesignContext";
import {
  FaYoutube,
  FaInstagram,
  FaTwitter,
  FaLinkedin,
  FaLink,
} from "react-icons/fa";

const MultiUrlPreview = () => {
  const { dynamicForms } = useServicesContext();
  const { bgDesign, setBgDesign, isLoading, setIsLoading } = useDesignContext();

  const socialLinks = dynamicForms?.multiUrl?.socialLinks || {};
  const customLinks = Array.isArray(dynamicForms?.multiUrl?.customLinks)
    ? dynamicForms.multiUrl.customLinks
    : [];

  const hasLinks =
    Object.values(socialLinks).some(Boolean) ||
    customLinks.some((link) => link?.label && link?.url);

    const defaultBg = "/services-service/multi-url.webp"

  const isVideo = bgDesign?.endsWith(".mp4");
  const isImage = bgDesign && !isVideo;

  const platformIcons = {
    youtube: <FaYoutube className="text-red-600 w-5 h-5" />,
    instagram: <FaInstagram className="text-pink-500 w-5 h-5" />,
    twitter: <FaTwitter className="text-blue-400 w-5 h-5" />,
    linkedin: <FaLinkedin className="text-blue-700 w-5 h-5" />,
    custom: <FaLink className="text-gray-600 w-5 h-5" />,
  };

  useEffect(() => {
    setIsLoading(true);
    setBgDesign(defaultBg); // ❌ Do NOT set default video or image
    //setTimeout(() => setIsLoading(false), 300); // Optional fade-in delay
  }, []);

  return (
    <div className="flex justify-center items-center w-full">
      <div className="relative w-[350px] h-[650px] border-4 border-[#001a1a] rounded-3xl shadow-2xl overflow-hidden">

        {/* 🔄 Background Layer */}
        {isImage && (
          <img
            src={bgDesign}
            alt="Background"
            onLoad={() => setTimeout(() => setIsLoading(false), 300)}
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
            onLoadedData={() => setTimeout(() => setIsLoading(false), 300)}
            className="absolute inset-0 w-full h-full object-cover z-0"
          />
        )}
        {!bgDesign && (
          <div className="absolute inset-0 bg-white z-0" />
        )}

        {/* ⏳ Loader */}
        {isLoading && (
          <div className="absolute inset-0 z-50 bg-mainGreen backdrop-blur-sm flex justify-center items-center">
            <Image
              src="/logos/ZM LOGO.png"
              alt="Loading"
              width={100}
              height={100}
              className="w-20 h-20 animate-bounce"
            />
          </div>
        )}

        {/* 📄 Foreground Content */}
        <div className="relative z-10 w-full h-full p-4 flex flex-col items-center justify-center space-y-4 text-gray-800 text-center overflow-y-auto scrollbar-hide">
          <h2 className="text-lg font-bold text-[#008080]">Your Links</h2>

          {hasLinks ? (
            <>
              {/* Social Links */}
              {Object.entries(socialLinks).map(([platform, url]) =>
                url ? (
                  <div
                    key={platform}
                    className="flex items-center gap-2 bg-gray-100 px-3 py-2 rounded w-full max-w-[300px] justify-center"
                  >
                    {platformIcons[platform] || platformIcons.custom}
                    <a
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 underline break-all text-sm"
                    >
                      {url}
                    </a>
                  </div>
                ) : null
              )}

              {/* Custom Links */}
              {customLinks
                .filter((link) => link?.label && link?.url)
                .map((link, index) => (
                  <div
                    key={`custom-${index}`}
                    className="flex items-center gap-2 bg-gray-100 px-3 py-2 rounded w-full max-w-[300px] justify-center"
                  >
                    {platformIcons.custom}
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 underline break-all text-sm"
                    >
                      {link.label}: {link.url}
                    </a>
                  </div>
                ))}
            </>
          ) : (
            <div className="text-gray-400 mt-8">
              <p className="text-base font-medium">No links added</p>
              <p className="text-sm">Fill the form to see preview</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MultiUrlPreview;
