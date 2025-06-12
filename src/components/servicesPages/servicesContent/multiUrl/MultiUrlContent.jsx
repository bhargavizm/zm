"use client";

import React, { useState } from "react";
import useServicesContext from "@/components/hooks/useServiceContext";
import { FaYoutube, FaInstagram, FaTwitter, FaLinkedin } from "react-icons/fa";
import { MdOutlineArrowDropDown } from "react-icons/md";

const platformIcons = {
  youtube: <FaYoutube className="text-red-600" />,
  instagram: <FaInstagram className="text-pink-500" />,
  twitter: <FaTwitter className="text-blue-400" />,
  linkedin: <FaLinkedin className="text-blue-700" />,
};

const MultiUrlContent = () => {
  const {
    dynamicForms,
    updateDynamicForm,
    addTemplateField,
    removeTemplateField,
  } = useServicesContext();

  const [selectedPlatform, setSelectedPlatform] = useState("");
  const [customLabel, setCustomLabel] = useState("");
  const [customUrl, setCustomUrl] = useState("");

  const socialLinks = dynamicForms?.multiUrl?.socialLinks || {};
  const customLinks = dynamicForms?.multiUrl?.customLinks || [];

  const handleAddCustomLink = () => {
    if (customLabel && customUrl) {
      addTemplateField("multiUrl", "customLinks", "", {
        label: customLabel,
        url: customUrl,
      });
      setCustomLabel("");
      setCustomUrl("");
    }
  };

  const handleCustomLinkChange = (index, key, value) => {
    const updatedLinks = [...customLinks];
    updatedLinks[index][key] = value;
    updateDynamicForm("multiUrl", "customLinks", index, updatedLinks[index]);
  };

  return (
    <div className="space-y-6">
      <div className="p-4 border rounded-lg">
        <h2 className="text-lg font-semibold mb-2">Social Media Links</h2>

        <div className="relative w-full max-w-sm mb-4">
          <select
            className="w-full p-2 border rounded appearance-none"
            value={selectedPlatform}
            onChange={(e) => setSelectedPlatform(e.target.value)}
          >
            <option value="">Select Platform</option>
            <option value="youtube">YouTube</option>
            <option value="instagram">Instagram</option>
            <option value="twitter">Twitter (X)</option>
            <option value="linkedin">LinkedIn</option>
          </select>
          <MdOutlineArrowDropDown className="absolute top-2.5 right-3 text-xl pointer-events-none" />
        </div>

        {selectedPlatform && (
          <div className="flex items-center space-x-2">
            <span>{platformIcons[selectedPlatform]}</span>
            <input
              type="text"
              className="w-full p-2 border rounded"
              placeholder={`Enter ${selectedPlatform} URL`}
              value={socialLinks[selectedPlatform]}
              onChange={(e) =>
                updateDynamicForm(
                  "multiUrl",
                  "socialLinks",
                  selectedPlatform,
                  e.target.value
                )
              }
            />
          </div>
        )}

        {/* Render existing social links */}
        <div className="mt-4 space-y-2">
          {Object.entries(socialLinks).map(
            ([platform, url]) =>
              url && (
                <div key={platform} className="flex items-center space-x-2">
                  <span>{platformIcons[platform]}</span>
                  <span className="text-sm">{url}</span>
                </div>
              )
          )}
        </div>
      </div>

      <div className="p-4 border rounded-lg">
        <h2 className="text-lg font-semibold mb-2">Custom Links</h2>

        {customLinks.map((link, index) => (
          <div key={index} className="mb-3 space-y-1">
            <input
              type="text"
              className="w-full p-2 border rounded"
              placeholder="Label"
              value={link.label}
              onChange={(e) =>
                handleCustomLinkChange(index, "label", e.target.value)
              }
            />
            <input
              type="text"
              className="w-full p-2 border rounded"
              placeholder="URL"
              value={link.url}
              onChange={(e) =>
                handleCustomLinkChange(index, "url", e.target.value)
              }
            />
            <button
              className="text-red-500 text-sm underline"
              onClick={() => removeTemplateField("multiUrl", "customLinks", "", index)}
            >
              Remove
            </button>
          </div>
        ))}

        <div className="flex flex-col space-y-2 mt-4">
          <input
            type="text"
            className="p-2 border rounded"
            placeholder="New Custom Label"
            value={customLabel}
            onChange={(e) => setCustomLabel(e.target.value)}
          />
          <input
            type="text"
            className="p-2 border rounded"
            placeholder="New Custom URL"
            value={customUrl}
            onChange={(e) => setCustomUrl(e.target.value)}
          />
          <button
            onClick={handleAddCustomLink}
            className="bg-[#137e7e] text-white px-4 py-2 rounded hover:bg-[#008080]"
          >
            Add Custom Link
          </button>
        </div>
      </div>
    </div>
  );
};

export default MultiUrlContent;
