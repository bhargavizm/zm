"use client";

import React, { useState } from "react";
import useServicesContext from "@/components/hooks/useServiceContext";
import { FaYoutube, FaInstagram, FaTwitter, FaLinkedin, FaFacebook, FaEye, FaEyeSlash,FaLink } from "react-icons/fa";
import NFCModal from "@/components/modalPopUps/nfcModal";

const platformIcons = {
  youtube: <FaYoutube className="text-red-600" />,
  instagram: <FaInstagram className="text-pink-500" />,
  twitter: <FaTwitter className="text-blue-400" />,
  linkedin: <FaLinkedin className="text-blue-700" />,
  facebook: <FaFacebook className="text-blue-600" />,
  custom: <FaLink className="text-blue-600"/>
};

const MultiUrlContent = () => {
  const {
    dynamicForms,
    updateDynamicForm,
    addTemplateField,
    removeTemplateField,
  } = useServicesContext();

  const [customLabel, setCustomLabel] = useState("");
  const [customUrl, setCustomUrl] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const socialLinks = dynamicForms?.multiUrl?.socialLinks || {};
  const customLinks = dynamicForms?.multiUrl?.customLinks || [];

  const handleCustomLinkChange = (index, key, value) => {
    const updatedLinks = [...customLinks];
    updatedLinks[index][key] = value;
    updateDynamicForm("multiUrl", "customLinks", index, updatedLinks[index]);
  };

  const handleAddCustomLink = () => {
    if (!customLabel || !customUrl) return;
    const newLink = { label: customLabel, url: customUrl };
    addTemplateField("multiUrl", "customLinks", "", newLink);
    setCustomLabel("");
    setCustomUrl("");
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <div className="space-y-6">
        {/* 🔗 Social Media Links */}
        <div className="p-4 border rounded-lg">
          <h2 className="text-lg font-semibold mb-4">Social Media Links</h2>
          
          {/* YouTube */}
          <div className="flex items-center space-x-2 mb-3">
            <span>{platformIcons.youtube}</span>
            <input
              type="text"
              className="w-full p-2 border rounded"
              placeholder="Enter YouTube URL"
              value={socialLinks.youtube || ""}
              onChange={(e) =>
                updateDynamicForm(
                  "multiUrl",
                  "socialLinks",
                  "youtube",
                  e.target.value
                )
              }
            />
          </div>
          
          {/* Instagram */}
          <div className="flex items-center space-x-2 mb-3">
            <span>{platformIcons.instagram}</span>
            <input
              type="text"
              className="w-full p-2 border rounded"
              placeholder="Enter Instagram URL"
              value={socialLinks.instagram || ""}
              onChange={(e) =>
                updateDynamicForm(
                  "multiUrl",
                  "socialLinks",
                  "instagram",
                  e.target.value
                )
              }
            />
          </div>
          
          {/* Twitter */}
          <div className="flex items-center space-x-2 mb-3">
            <span>{platformIcons.twitter}</span>
            <input
              type="text"
              className="w-full p-2 border rounded"
              placeholder="Enter Twitter (X) URL"
              value={socialLinks.twitter || ""}
              onChange={(e) =>
                updateDynamicForm(
                  "multiUrl",
                  "socialLinks",
                  "twitter",
                  e.target.value
                )
              }
            />
          </div>
          
          {/* LinkedIn */}
          <div className="flex items-center space-x-2 mb-3">
            <span>{platformIcons.linkedin}</span>
            <input
              type="text"
              className="w-full p-2 border rounded"
              placeholder="Enter LinkedIn URL"
              value={socialLinks.linkedin || ""}
              onChange={(e) =>
                updateDynamicForm(
                  "multiUrl",
                  "socialLinks",
                  "linkedin",
                  e.target.value
                )
              }
            />
          </div>
          
          {/* Facebook */}
          <div className="flex items-center space-x-2 mb-3">
            <span>{platformIcons.facebook}</span>
            <input
              type="text"
              className="w-full p-2 border rounded"
              placeholder="Enter Facebook URL"
              value={socialLinks.facebook || ""}
              onChange={(e) =>
                updateDynamicForm(
                  "multiUrl",
                  "socialLinks",
                  "facebook",
                  e.target.value
                )
              }
            />
          </div>
          <div className="flex items-center space-x-2 mb-3">
            <span>{platformIcons.custom}</span>
            <input
              type="text"
              className="w-full p-2 border rounded"
              placeholder="Enter custom URL"
              value={socialLinks.custom || ""}
              onChange={(e) =>
                updateDynamicForm(
                  "multiUrl",
                  "socialLinks",
                  "custom",
                  e.target.value
                )
              }
            />
          </div>
        </div>


        {/* 🔒 Password Section */}
        <div className="p-4 border rounded-lg">
          <h2 className="text-lg font-semibold mb-4">Password Protection</h2>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              className="w-full p-2 border rounded pr-10"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              className="absolute right-3 top-3 text-gray-500"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? <FaEye /> :  <FaEyeSlash />}
            </button>
          </div>
        </div>

        <NFCModal />

        {/* ✅ Submit Button */}
        <div className="text-center mt-4 w-full">
          <button
            type="submit"
            className="mt-4 w-full bg-[#008080] text-white font-semibold py-2 rounded hover:bg-[#006666] transition"
          >
            Submit
          </button>
        </div>
      </div>
    </>
  );
};

export default MultiUrlContent;