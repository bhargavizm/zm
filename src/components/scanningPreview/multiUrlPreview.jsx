"use client";
import React, { useEffect } from "react";
import {
  FaYoutube,
  FaInstagram,
  FaTwitter,
  FaLinkedin,
  FaLink,
} from "react-icons/fa";
import { FiLink } from "react-icons/fi";
import useServicesContext from "@/components/hooks/useServiceContext";
import useDesignContext from "@/components/hooks/useDesignContext";
import BgDesignRenderer from "./bgDesignRender";

const MultiUrlPreview = ({ data }) => {
  const { bgDesign, setBgDesign } = useDesignContext();
  const defaultBg = "/services-service/multi-url.webp";

  const socialLinks = data?.socialLinks || {};
  const customLinks = Array.isArray(data?.customLinks) ? data.customLinks : [];

  const hasLinks =
    Object.values(socialLinks).some(Boolean) ||
    customLinks.some((link) => link?.label && link?.url);

  const platformIcons = {
    youtube: <FaYoutube className="text-red-600 w-5 h-5" />,
    instagram: <FaInstagram className="text-pink-500 w-5 h-5" />,
    twitter: <FaTwitter className="text-blue-400 w-5 h-5" />,
    linkedin: <FaLinkedin className="text-blue-700 w-5 h-5" />,
    custom: <FaLink className="text-gray-600 w-5 h-5" />,
  };

  useEffect(() => {
    if (data?.bgDesign) {
      setBgDesign(data.bgDesign);
    } else {
      setBgDesign(defaultBg);
    }
  }, [data]);

  return (
    <div className="w-full px-6">
      <div>
        <BgDesignRenderer bgDesign={bgDesign} defaultBg={defaultBg} />

        <div className="relative flex-1 w-full bg-white/70 m-2 rounded-xl overflow-y-auto pt-6 pb-3 px-3 z-20">
          {hasLinks ? (
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-center text-[#008080]">
                Multi-URL QR Code
              </h2>

              {/* Social Links */}
              {Object.entries(socialLinks).map(([platform, url]) =>
                url ? (
                  <div
                    key={platform}
                    className="bg-[#008080]/10 p-3 rounded border border-[#008080]/20 text-black"
                  >
                    <div className="flex items-center text-[#008080] mb-1">
                      {platformIcons[platform] || platformIcons.custom}
                      <span className="font-medium ml-2 capitalize">
                        {platform}
                      </span>
                    </div>
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
                    className="bg-[#008080]/10 p-3 rounded border border-[#008080]/20 text-black"
                  >
                    <div className="flex items-center text-[#008080] mb-1">
                      {platformIcons.custom}
                      <span className="font-medium ml-2">
                        {link.label}
                      </span>
                    </div>
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 underline break-all text-sm"
                    >
                      {link.url}
                    </a>
                  </div>
                ))}
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-center text-gray-400">
              <FiLink className="text-4xl mb-4 text-[#008080]" />
              <h3 className="text-lg font-medium">Multi-URL QR Preview</h3>
              <p className="mt-2">No links added yet.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MultiUrlPreview;
