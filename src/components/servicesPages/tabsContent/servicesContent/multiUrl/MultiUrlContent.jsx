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
import CryptoJS from "crypto-js";
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

const MultiUrlContent = () => {
  const {
    dynamicForms,
    updateDynamicForm,
    addTemplateField,
    removeTemplateField,servicesDataLoading, setServicesDataLoading
  } = useServicesContext();

  const [customLabel, setCustomLabel] = useState("");
  const [customUrl, setCustomUrl] = useState("");
  const { setActiveTab } = useDesignContext();
  const { slug } = useParams();

  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch();

  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const socialLinks = dynamicForms?.multiUrl?.socialLinks || {};

  const rawCustomLinks = dynamicForms?.multiUrl?.customLinks;
  const customLinks = Array.isArray(rawCustomLinks) ? rawCustomLinks : [];

  const handleCustomLinkChange = (index, key, value) => {
    const updatedLinks = [...customLinks];
    updatedLinks[index][key] = value;
    updateDynamicForm("multiUrl", null, "customLinks", updatedLinks);
  };

  const handleAddCustomLink = () => {
    if (!customLabel || !customUrl) return;

    const newLink = { label: customLabel, url: customUrl };
    const updatedLinks = [...customLinks, newLink];
    updateDynamicForm("multiUrl", null, "customLinks", updatedLinks);

    setCustomLabel("");
    setCustomUrl("");
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

// const handleSubmit = () => {
  
//   const hasSocialLinks = Object.values(socialLinks || {}).some(
//     (url) => typeof url === "string" && url.trim().length > 0
//   );

//   const hasCustomLinks = Array.isArray(customLinks) && customLinks
//     .filter(link => link && (link.label || link.url))
//     .some(
//       (link) =>
//         (typeof link.label === "string" && link.label.trim().length > 0) ||
//         (typeof link.url === "string" && link.url.trim().length > 0)
//     );

//   const hasPassword = typeof password === "string" && password.trim().length > 0;

//   if (!hasSocialLinks && !hasCustomLinks && !hasPassword) {
//     toast.error("Please fill at least one field before submitting.");
//     return;
//   }

//   setShowPreviewModal(true);
// };

const isValidUrl = (url) => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

const handleSubmit = () => {
  const socialPlatforms = ["youtube", "instagram", "twitter", "linkedin", "facebook", "custom"];

  // ✅ Check empty form
  const hasSocialLinks = Object.values(socialLinks || {}).some(
    (url) => typeof url === "string" && url.trim().length > 0
  );

  const hasCustomLinks = Array.isArray(customLinks) && customLinks
    .filter(link => link && (link.label || link.url))
    .some(
      (link) =>
        (typeof link.label === "string" && link.label.trim().length > 0) ||
        (typeof link.url === "string" && link.url.trim().length > 0)
    );

  const hasPassword = typeof password === "string" && password.trim().length > 0;

  if (!hasSocialLinks && !hasCustomLinks && !hasPassword) {
    toast.error("Please fill at least one field before submitting.");
    return;
  }

  // ✅ Social link URL validation
  for (const platform of socialPlatforms) {
    const url = socialLinks[platform];
    if (url && !isValidUrl(url)) {
      toast.error(`Invalid URL for ${platform}`);
      return;
    }
  }

  // ✅ Custom links validation
  for (const link of customLinks) {
    if (!link.label || !link.url) {
      toast.error("Each custom link must have both a label and URL");
      return;
    }
    if (!isValidUrl(link.url)) {
      toast.error(`Invalid URL for custom link "${link.label}"`);
      return;
    }
  }

  // ✅ All good — open preview modal
  setShowPreviewModal(true);
};

  const confirmSubmit = async () => {
    setActiveTab(slug, "Backdrop Designs");
    updateDynamicForm("multiUrl", null,  "password", password.trim()); // ✅ Save into context
    //   setServicesDataLoading(true);
    // try {
    //   const encryptedPassword = password
    //     ? CryptoJS.AES.encrypt(password, "secret-key").toString()
    //     : "";

    //   const payload = {
    //     socialLinks,
    //     customLinks,
    //     password: encryptedPassword,
    //   };

    //   const response = await fetch("/api/services/multiurl", {
    //     method: "POST",
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify(payload),
    //   });

    //   const result = await response.json();

    //   if (!response.ok) {
    //     alert(`Error: ${result.message || result.error}`);
    //     return;
    //   }

    //   // ✅ success actions
    //   toast.success("Multi URL data successfully submitted");
    //   setActiveTab(slug, "QR Code")
    //   dispatch(setMultiUrlServices(result.multiUrldata));
    //   setShowPreviewModal(false);
    //   setShowSuccessModal(true);

    //   // ✅ reset form data
    //   updateDynamicForm("multiUrl", null, null, {});
    //   setCustomLabel("");
    //   setCustomUrl("");
    //   setPassword("");
    // } catch (error) {
    //   console.error("Submission failed", error);
    //  toast.error(error?.response?.data?.error || "Something went wrong!");
    //  if (error.response?.status === 401) {
    //     window.location.href = "/login"; // ✅ Auto logout on expiry
    //     return;
    //   }
    // } finally {
    //   setServicesDataLoading(false); // ✅ End loader
    // }
  };


  return (
    <>
     {servicesDataLoading && <LoadingSpinner />}

      <div className="space-y-6">
        {/* Social Media Links */}
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
              className="px-4 bg-[#008080] text-white rounded"
              onClick={handleAddCustomLink}
            >
              Add
            </button>
          </div>
        </div>

        {/* Password Section */}
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

        <NFCModal />

        {/* Submit Button */}
        <div className="text-center mt-4 w-full">
          <button
            type="button"
            className="font-bold px-4 cursor-pointer bg-[#008080] text-white py-2 rounded transition-effects text-lg"
            onClick={handleSubmit}
          >
            Next → 
          </button>
        </div>
      </div>

      {/* Preview Modal */}
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

            {Object.values(socialLinks).some(url => url) && (
              <div className="mb-4">
                <h3 className="font-semibold mb-2">Social Links:</h3>
                <ul className="text-sm space-y-1">
                  {Object.entries(socialLinks).map(([platform, url]) =>
                    url ? (
                      <li key={platform}>
                        <strong>{platform}:</strong> {url}
                      </li>
                    ) : null
                  )}
                </ul>
              </div>
            )}


            {customLinks.length > 0 && (
              <div className="mb-4">
                <h3 className="font-semibold mb-2">Custom Links:</h3>
                <ul className="text-sm space-y-1">
                  {customLinks.map((link, index) => (
                    <li key={index}>
                      <strong>{link.label || "No Label"}:</strong> {link.url || "No URL"}
                    </li>
                  ))}
                </ul>
              </div>
            )}

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
                Back
              </button>
              <button
                className="px-4 py-2 rounded bg-[#008080] hover:bg-[#006666] text-white"
                onClick={() => {
                  setShowPreviewModal(false),
                    confirmSubmit()
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
};

export default MultiUrlContent;
