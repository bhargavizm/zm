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
import toast from "react-hot-toast";
import useDesignContext from "@/components/hooks/useDesignContext";
import { useParams } from "next/navigation";
import LoadingSpinner from "@/components/common/spinner";

const platformIcons = {
  youtube: <FaYoutube className="text-red-600" />,
  instagram: <FaInstagram className="text-pink-500" />,
  twitter: <FaTwitter className="text-blue-400" />,
  linkedin: <FaLinkedin className="text-blue-700" />,
  facebook: <FaFacebook className="text-blue-600" />,
  custom: <FaLink className="text-blue-600" />,
};

export default function MultiUrlContent() {
  const { dynamicForms, updateDynamicForm, servicesDataLoading } = useServicesContext();
  const { setActiveTab } = useDesignContext();
  const { slug } = useParams();
  const dispatch = useDispatch();

  const socialLinks = dynamicForms?.multiUrl?.socialLinks || {};
  const customLinks = Array.isArray(dynamicForms?.multiUrl?.customLinks)
    ? dynamicForms.multiUrl.customLinks
    : [];

  const [customLabel, setCustomLabel] = useState("");
  const [customUrl, setCustomUrl] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showPreviewModal, setShowPreviewModal] = useState(false);

  const [errors, setErrors] = useState({
    socialLinks: {},
    customLinks: [],
    addCustomLink: "",
  });

  /** Validate if the given string is a proper URL */
  const validateUrl = (url) => {
    if (!url.trim()) return false;
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  /** Live validation for social links */
  const handleSocialLinkChange = (platform, value) => {
    updateDynamicForm("multiUrl", "socialLinks", platform, value);
    setErrors((prev) => ({
      ...prev,
      socialLinks: {
        ...prev.socialLinks,
        [platform]: value.trim() && !validateUrl(value),
      },
    }));
  };

  /** Live validation for custom links */
  const handleCustomLinkChange = (index, key, value) => {
    const updatedLinks = [...customLinks];
    updatedLinks[index][key] = value;
    updateDynamicForm("multiUrl", null, "customLinks", updatedLinks);

    const newErrors = [...errors.customLinks];
    if (!updatedLinks[index].label.trim() || !updatedLinks[index].url.trim()) {
      newErrors[index] = "Both label and URL are required";
    } else if (!validateUrl(updatedLinks[index].url)) {
      newErrors[index] = "Invalid URL";
    } else {
      newErrors[index] = "";
    }
    setErrors((prev) => ({ ...prev, customLinks: newErrors }));
  };

  /** Add a new custom link */
  const handleAddCustomLink = () => {
    if (!customLabel.trim() || !customUrl.trim()) {
      setErrors((prev) => ({
        ...prev,
        addCustomLink: "Both Label and URL are required.",
      }));
      return;
    }
    if (!validateUrl(customUrl)) {
      setErrors((prev) => ({
        ...prev,
        addCustomLink: "Please enter a valid URL.",
      }));
      return;
    }

    const updatedLinks = [
      ...customLinks,
      { label: customLabel.trim(), url: customUrl.trim() },
    ];
    updateDynamicForm("multiUrl", null, "customLinks", updatedLinks);

    setCustomLabel("");
    setCustomUrl("");
    setErrors((prev) => ({
      ...prev,
      addCustomLink: "",
      customLinks: [...prev.customLinks, ""],
    }));
  };

  /** Handle submission */
  const handleSubmit = () => {
    const hasSocialLinks = Object.values(socialLinks).some((url) => url?.trim());
    const hasCustomLinks = customLinks.some(
      (link) => link.label?.trim() || link.url?.trim()
    );
    const hasPassword = password.trim().length > 0;

    const socialErrors = Object.values(errors.socialLinks).some(Boolean);
    const customErrors = errors.customLinks.some(Boolean);

    if (!hasSocialLinks && !hasCustomLinks && !hasPassword) {
      toast.error("Please fill at least one field before submitting.");
      return;
    }
    if (socialErrors || customErrors) {
      toast.error("Please fix errors before submitting.");
      return;
    }

    setShowPreviewModal(true);
  };

  const confirmSubmit = () => {
    setActiveTab(slug, "Backdrop Designs");
    updateDynamicForm("multiUrl", null, "password", password.trim());
  };

  return (
    <>
      {servicesDataLoading && <LoadingSpinner />}

      <div className="space-y-6">
        {/* Social Links */}
        <div className="p-4 border rounded-lg">
          <h2 className="text-lg font-semibold mb-4">Social Media Links</h2>
          {Object.keys(platformIcons).map((platform) => (
            <div className="mb-3" key={platform}>
              <div className="flex items-center space-x-2">
                <span>{platformIcons[platform]}</span>
                <input
                  type="text"
                  className={`w-full p-2 border rounded ${
                    errors.socialLinks[platform] ? "border-red-500" : ""
                  }`}
                  placeholder={`Enter ${platform} URL`}
                  value={socialLinks[platform] || ""}
                  onChange={(e) => handleSocialLinkChange(platform, e.target.value)}
                />
              </div>
              {errors.socialLinks[platform] && (
                <p className="text-red-500 text-sm mt-1">Invalid URL</p>
              )}
            </div>
          ))}
        </div>

        {/* Custom Links */}
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
                className={`w-2/3 p-2 border rounded ${
                  errors.customLinks[index] ? "border-red-500" : ""
                }`}
                value={link.url}
                onChange={(e) => handleCustomLinkChange(index, "url", e.target.value)}
              />
              {errors.customLinks[index] && (
                <p className="text-red-500 text-sm mt-1">{errors.customLinks[index]}</p>
              )}
            </div>
          ))}

          {/* Add Custom Link */}
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
              className={`w-2/3 p-2 border rounded ${
                errors.addCustomLink ? "border-red-500" : ""
              }`}
              value={customUrl}
              onChange={(e) => setCustomUrl(e.target.value)}
            />
            <button
              type="button"
              className="px-4 bg-[#008080] text-white rounded"
              onClick={handleAddCustomLink}
            >
              Add
            </button>
          </div>
          {errors.addCustomLink && (
            <p className="text-red-500 text-sm mt-1">{errors.addCustomLink}</p>
          )}
        </div>

        {/* Password Protection */}
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
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? <FaEye /> : <FaEyeSlash />}
            </button>
          </div>
        </div>

        <NFCModal />

        {/* Submit */}
        <div className="text-center mt-4">
          <button
            type="button"
            className="font-bold px-4  cursor-pointer py-2 bg-[#008080] text-white rounded text-lg"
            onClick={handleSubmit}
          >
            Next →
          </button>
        </div>
      </div>

      {showPreviewModal && (
  <div
    className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm flex items-center justify-center"
    onClick={() => setShowPreviewModal(false)}
  >
    <div
      className="bg-white p-6 rounded-lg shadow-xl max-w-xl w-full overflow-y-auto max-h-[80vh]"
      onClick={(e) => e.stopPropagation()}
    >
      <h2 className="text-xl font-bold mb-4 text-[#008080]">Preview Your Submission</h2>

      {/* Social Links */}
      {Object.values(socialLinks).some((url) => url) && (
        <div className="mb-4">
          <h3 className="font-semibold mb-2">Social Links:</h3>
          <ul className="text-sm space-y-1">
            {Object.entries(socialLinks).map(
              ([platform, url]) =>
                url && (
                  <li key={platform}>
                    <strong>{platform}:</strong>{" "}
                    <a
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      {url}
                    </a>
                  </li>
                )
            )}
          </ul>
        </div>
      )}

      {/* Custom Links */}
      {customLinks.length > 0 && (
        <div className="mb-4">
          <h3 className="font-semibold mb-2">Custom Links:</h3>
          <ul className="text-sm space-y-1">
            {customLinks.map((link, index) => (
              <li key={index}>
                <strong>{link.label || "No Label"}:</strong>{" "}
                {link.url ? (
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    {link.url}
                  </a>
                ) : (
                  "No URL"
                )}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Password */}
      {password && (
        <div className="mb-4">
          <h3 className="font-semibold mb-1">Password:</h3>
          <p className="text-sm">🔒 {password}</p>
        </div>
      )}

      {/* Actions */}
      <div className="flex justify-end gap-3">
        <button
          className="px-4 py-2 rounded bg-gray-300 cursor-pointer hover:bg-gray-400 text-gray-800"
          onClick={() => setShowPreviewModal(false)}
        >
          Edit
        </button>
        <button
          className="px-4 py-2 rounded bg-[#008080] cursor-pointer hover:bg-[#006666] text-white"
          onClick={() => {
            setShowPreviewModal(false);
            confirmSubmit();
          }}
        >
          Continue
        </button>
      </div>
    </div>
  </div>
)}

    </>
  );
}
