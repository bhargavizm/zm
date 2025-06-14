"use client";

import React from "react";
import useServicesContext from "@/components/hooks/useServiceContext";
import { FaYoutube, FaInstagram, FaTwitter, FaLinkedin, FaLink } from "react-icons/fa";

const MultiUrlPreview = () => {
  const { dynamicForms } = useServicesContext();

  const socialLinks = dynamicForms?.multiUrl?.socialLinks || {};
  const customLinks = Array.isArray(dynamicForms?.multiUrl?.customLinks)
    ? dynamicForms.multiUrl.customLinks
    : [];

  // Map platform names to their corresponding icons
  const getPlatformIcon = (platform) => {
    switch (platform) {
      case "youtube":
        return <FaYoutube className="w-5 h-5 text-red-600" />;
      case "instagram":
        return <FaInstagram className="w-5 h-5 text-pink-600" />;
      case "twitter":
  return (
    <svg
      className="w-5 h-5 text-black"
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M17.53 3H21L13.62 10.88L22.36 21H15.87L10.78 14.88L4.94 21H1.49L9.34 12.58L1 3H7.65L12.24 8.7L17.53 3ZM16.35 19H18.19L7.72 5H5.76L16.35 19Z" />
    </svg>
  );
      case "linkedin":
        return <FaLinkedin className="w-5 h-5 text-blue-700" />;
      default:
        return <FaLink className="w-5 h-5 text-gray-600" />;
    }
  };

  return (
    <div className="bg-white p-4 rounded shadow space-y-4">
      <h2 className="text-xl font-bold text-center text-[#008080]">
        Preview: Social & Custom Links
      </h2>

      {/* Social Links */}
      {Object.entries(socialLinks).map(([platform, url]) => (
        url && (
          <div
            key={platform}
            className="flex items-center gap-3 bg-gray-100 px-3 py-2 rounded"
          >
            {getPlatformIcon(platform)}
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-teal-600 underline break-all"
            >
              {url}
            </a>
          </div>
        )
      ))}

      {/* Custom Links */}
      {customLinks.map((link, index) => (
        link?.label && link?.url && (
          <div
            key={`custom-${index}`}
            className="flex items-center gap-3 bg-gray-100 px-3 py-2 rounded"
          >
            <FaLink className="w-5 h-5 text-gray-600" />
            <a
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-teal-600 underline break-all"
            >
              {link.label}: {link.url}
            </a>
          </div>
        )
      ))}
    </div>
  );
};

export default MultiUrlPreview;