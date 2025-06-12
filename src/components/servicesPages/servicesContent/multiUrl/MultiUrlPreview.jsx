"use client";

import React from "react";
import useServicesContext from "@/components/hooks/useServiceContext";

const linkIcons = {
  youtube: "/icons/youtube.png",
  instagram: "/icons/instagram.png",
  twitter: "/icons/twitter.png",
  linkedin: "/icons/linkedin.png",
  custom: "/icons/link.png",
};

const MultiUrlPreview = () => {
  const { dynamicForms } = useServicesContext();

  const socialLinks = dynamicForms?.multiUrl?.socialLinks || {};
  const customLinks = Array.isArray(dynamicForms?.multiUrl?.customLinks)
    ? dynamicForms.multiUrl.customLinks
    : [];

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
            <img
              src={linkIcons[platform] || linkIcons.custom}
              alt={platform}
              className="w-5 h-5"
            />
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline break-all"
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
            <img
              src={linkIcons.custom}
              alt="custom"
              className="w-5 h-5"
            />
            <a
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline break-all"
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
