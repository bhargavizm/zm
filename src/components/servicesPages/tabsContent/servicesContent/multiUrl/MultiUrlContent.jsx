"use client";

import React, { useState } from "react";
import useServicesContext from "@/components/hooks/useServiceContext";
import {
  FaYoutube,
  FaInstagram,
  FaTwitter,
  FaLinkedin,
  FaFacebook,
  FaEye,
  FaEyeSlash,
  FaLink,
} from "react-icons/fa";
import NFCModal from "@/components/modalPopUps/nfcModal";
import { useDispatch } from "react-redux";
import { setMultiUrlServices } from "@/redux/slices/servicesSlice";

const platformIcons = {
  youtube: <FaYoutube className="text-red-600" />,
  instagram: <FaInstagram className="text-pink-500" />,
  twitter: <FaTwitter className="text-blue-400" />,
  linkedin: <FaLinkedin className="text-blue-700" />,
  facebook: <FaFacebook className="text-blue-600" />,
  custom: <FaLink className="text-blue-600" />,
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

  const dispatch = useDispatch();

  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

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

  const handleSubmit = () => {
    // Just open the preview modal
    setShowPreviewModal(true);
  };

  const confirmSubmit = async () => {
    try {
      const payload = {
        socialLinks,
        customLinks,
        password,
      };

      const response = await fetch("/api/services/multiurl", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();
      console.log(response, result)
      dispatch(setMultiUrlServices(result?.multiUrldata))
      if (!response.ok) {
        
        alert(`Error: ${result.error}`);
        return;
      }

      setShowPreviewModal(false);
      setShowSuccessModal(true);
    } catch (error) {
      console.error("Submission failed", error);
      alert("An unexpected error occurred");
    }
  };

  return (
    <>
      <div className="space-y-6">
        {/* 🔗 Social Media Links */}
        <div className="p-4 border rounded-lg">
          <h2 className="text-lg font-semibold mb-4">Social Media Links</h2>

          {["youtube", "instagram", "twitter", "linkedin", "facebook", "custom"].map((platform) => (
            <div className="flex items-center space-x-2 mb-3" key={platform}>
              <span>{platformIcons[platform]}</span>
              <input
                type="text"
                className="w-full p-2 border rounded"
                placeholder={`Enter ${platform.charAt(0).toUpperCase() + platform.slice(1)} URL`}
                value={socialLinks[platform] || ""}
                onChange={(e) =>
                  updateDynamicForm("multiUrl", "socialLinks", platform, e.target.value)
                }
              />
            </div>
          ))}
        </div>

        {/* 🔗 Custom Links */}
        <div className="p-4 border rounded-lg">
          <h2 className="text-lg font-semibold mb-4">Custom Links</h2>
          {customLinks.map((link, index) => (
            <div className="flex gap-2 mb-2" key={index}>
              <input
                type="text"
                placeholder="Label"
                className="w-1/3 p-2 border rounded"
                value={link.label}
                onChange={(e) => handleCustomLinkChange(index, "label", e.target.value)}
              />
              <input
                type="text"
                placeholder="URL"
                className="w-2/3 p-2 border rounded"
                value={link.url}
                onChange={(e) => handleCustomLinkChange(index, "url", e.target.value)}
              />
            </div>
          ))}

          <div className="flex gap-2 mt-2">
            <input
              type="text"
              placeholder="Label"
              className="w-1/3 p-2 border rounded"
              value={customLabel}
              onChange={(e) => setCustomLabel(e.target.value)}
            />
            <input
              type="text"
              placeholder="URL"
              className="w-2/3 p-2 border rounded"
              value={customUrl}
              onChange={(e) => setCustomUrl(e.target.value)}
            />
            <button
              type="button"
              className="px-4 bg-green-600 text-white rounded"
              onClick={handleAddCustomLink}
            >
              Add
            </button>
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
              {showPassword ? <FaEye /> : <FaEyeSlash />}
            </button>
          </div>
        </div>

        {/* NFC Modal */}
        <NFCModal />

        {/* ✅ Submit Button */}
        <div className="text-center mt-4 w-full">
          <button
            type="button"
            className="mt-4 w-full bg-[#008080] text-white font-semibold py-2 rounded hover:bg-[#006666] transition"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      </div>

      {/* 🔍 Preview Modal */}
      {showPreviewModal && (
        <div
          className="fixed inset-0 z-50 bg-white/30 backdrop-blur-sm flex items-center justify-center"
          onClick={() => setShowPreviewModal(false)}
        >
          <div
            className="bg-white p-6 rounded-lg shadow-xl max-w-xl w-full overflow-y-auto max-h-[80vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-xl font-bold mb-4 text-blue-600">Preview Your Submission</h2>

            <div className="mb-4">
              <h3 className="font-semibold mb-2">Social Links:</h3>
              <ul className="text-sm space-y-1">
                {Object.entries(socialLinks).map(([platform, url]) => (
                  url && (
                    <li key={platform}>
                      <strong>{platform}:</strong> {url}
                    </li>
                  )
                ))}
              </ul>
            </div>

            <div className="mb-4">
              <h3 className="font-semibold mb-2">Custom Links:</h3>
              <ul className="text-sm space-y-1">
                {customLinks.map((link, index) => (
                  <li key={index}>
                    <strong>{link.label}:</strong> {link.url}
                  </li>
                ))}
              </ul>
            </div>

            {password && (
              <div className="mb-4">
                <h3 className="font-semibold mb-1">Password:</h3>
                <p className="text-sm">🔒 {password}</p>
              </div>
            )}

            <div className="flex justify-end gap-3">
              <button
                className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400 text-gray-800"
                onClick={() => setShowPreviewModal(false)}
              >
                Edit
              </button>
              <button
                className="px-4 py-2 rounded bg-[#008080] hover:bg-[#006666] text-white"
                onClick={confirmSubmit}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ✅ Success Popup */}
      {showSuccessModal && (
        <div
          className="fixed inset-0 z-50 bg-white/30 backdrop-blur-sm flex items-center justify-center"
          onClick={() => setShowSuccessModal(false)}
        >
          <div
            className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-xl font-bold mb-2 text-green-600">Success!</h2>
            <p className="mb-4">Your Multi URL content has been saved successfully.</p>
            <button
              onClick={() => setShowSuccessModal(false)}
              className="bg-[#008080] text-white px-4 py-2 rounded hover:bg-[#006666]"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default MultiUrlContent;
