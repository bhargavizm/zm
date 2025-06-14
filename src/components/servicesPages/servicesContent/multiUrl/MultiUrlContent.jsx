"use client";

import React, { useState } from "react";
import useServicesContext from "@/components/hooks/useServiceContext";
import { FaYoutube, FaInstagram, FaTwitter, FaLinkedin } from "react-icons/fa";
import { MdOutlineArrowDropDown } from "react-icons/md";

const platformIcons = {
  youtube: <FaYoutube className="text-red-600" />,
  instagram: <FaInstagram className="text-pink-500" />,
  twitter: (
    <svg
      className="w-5 h-5 text-black"
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M17.53 3H21L13.62 10.88L22.36 21H15.87L10.78 14.88L4.94 21H1.49L9.34 12.58L1 3H7.65L12.24 8.7L17.53 3ZM16.35 19H18.19L7.72 5H5.76L16.35 19Z" />
    </svg>
  ),
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
      <div>

        <input type="text" placeholder="custom link"/>
      </div>
      <button>Submit</button>

      
    </div>
  );
};

export default MultiUrlContent;
