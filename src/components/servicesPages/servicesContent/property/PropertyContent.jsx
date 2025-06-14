"use client";

import React, { useState } from "react";
import useServicesContext from "@/components/hooks/useServiceContext";
import { FiTrash2 } from "react-icons/fi";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";

const PropertyContent = () => {
  const {
    dynamicForms,
    updateDynamicForm,
    addTemplateField,
    removeTemplateField,
    setDynamicForms,
    showPassword,
    setShowPassword,
  } = useServicesContext();

  const [nfcEnabled, setNfcEnabled] = useState(false);
  const [showNfcModal, setShowNfcModal] = useState(false);

  const propertyData = dynamicForms.propertyDetails || {
    basicInfo: {},
    addressInfo: {},
    pricingInfo: {},
    images: {},
    password: "",
  };

  const sections = {
    basicInfo: ["propertyName", "propertyType", "ownerName", "contactNumber"],
    addressInfo: ["address", "mapLink"],
    pricingInfo: ["price", "area", "amenities"],
    images: ["mainImage", "galleryImages"],
  };

  const [deletedFields, setDeletedFields] = useState({
    basicInfo: [],
    addressInfo: [],
    pricingInfo: [],
    images: [],
  });

  const handleChange = (section, key, value) => {
    updateDynamicForm("propertyDetails", section, key, value);
  };

  const handleAddField = (section, key) => {
    addTemplateField("propertyDetails", section, key, "");
    setDeletedFields((prev) => ({
      ...prev,
      [section]: prev[section].filter((item) => item !== key),
    }));
  };

  const handleRemoveField = (section, key) => {
    removeTemplateField("propertyDetails", section, key);
    setDeletedFields((prev) => ({
      ...prev,
      [section]: [...prev[section], key],
    }));
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setDynamicForms((prev) => ({
      ...prev,
      propertyDetails: {
        ...prev.propertyDetails,
        password: value,
      },
    }));
  };

  const handleImageChange = (section, key, files) => {
    updateDynamicForm("propertyDetails", section, key, files);
  };

  const handleNfcToggle = () => {
    if (!nfcEnabled) {
      setShowNfcModal(true);
    } else {
      setNfcEnabled(false);
    }
  };

  const confirmNfc = () => {
    setNfcEnabled(true);
    setShowNfcModal(false);
  };

  const cancelNfc = () => {
    setShowNfcModal(false);
  };

  return (
    <>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold pb-6 text-[#008080]">
          Property QR Code
        </h1>

        {Object.entries(sections).map(([section, fields]) => (
          <div key={section} className="border rounded p-4 shadow-sm space-y-4">
            <h3 className="text-xl font-semibold capitalize text-[#008080]">
              {section.replace(/([A-Z])/g, " $1")}
            </h3>

            {fields
              .filter((key) => propertyData[section]?.[key] !== undefined)
              .map((key) => (
                <div key={key} className="flex items-center space-x-2">
                  {key === "mainImage" ? (
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) =>
                        handleImageChange(section, key, e.target.files[0])
                      }
                      className="border p-2 rounded flex-1"
                    />
                  ) : key === "galleryImages" ? (
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={(e) =>
                        handleImageChange(
                          section,
                          key,
                          Array.from(e.target.files)
                        )
                      }
                      className="border p-2 rounded flex-1"
                    />
                  ) : (
                    <input
                      type="text"
                      name={key}
                      placeholder={key.replace(/([A-Z])/g, " $1")}
                      value={propertyData[section][key]}
                      onChange={(e) =>
                        handleChange(section, key, e.target.value)
                      }
                      className="border p-2 rounded flex-1"
                    />
                  )}

                  <button
                    type="button"
                    onClick={() => handleRemoveField(section, key)}
                    className="hover:bg-red-200"
                  >
                    <FiTrash2 className="text-red-700" />
                  </button>
                </div>
              ))}

            {/* Dropdown to Add Deleted Fields */}
            {deletedFields[section].length > 0 && (
              <div className="flex items-center space-x-2">
                <select
                  onChange={(e) => {
                    const key = e.target.value;
                    if (key) handleAddField(section, key);
                    e.target.selectedIndex = 0;
                  }}
                  className="border p-2 rounded"
                >
                  <option value="">Add field</option>
                  {deletedFields[section].map((field) => (
                    <option key={field} value={field}>
                      {field.replace(/([A-Z])/g, " $1")}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>
        ))}

        {/* Password Field with Eye Icon */}
        <div className="relative w-full">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password (optional)"
            value={propertyData.password || ""}
            onChange={handlePasswordChange}
            className="border p-2 pr-10 rounded w-full"
          />
          <span
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-500 hover:text-[#008080]"
          >
            {showPassword ? (
              <IoEyeOffOutline size={20} />
            ) : (
              <IoEyeOutline size={20} />
            )}
          </span>
        </div>

        {/* nfc */}
        <div className="flex items-center gap-4 px-4 mt-2">
          <span className="text-sm font-medium text-gray-700">NFC</span>
          <button
            type="button"
            onClick={handleNfcToggle}
            className={`relative inline-flex h-8 w-16 items-center rounded-full transition-colors duration-500 cursor-pointer
                    focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#008080]
                    ${nfcEnabled ? "bg-[#008080]" : "bg-gray-300"}`}
          >
            <span
              className={`absolute left-1 top-1 inline-flex h-6 w-6 items-center justify-center rounded-full bg-white shadow-md transition-all duration-300
                    ${nfcEnabled ? "translate-x-8" : "translate-x-0"}`}
            >
              {nfcEnabled ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 text-[#008080]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 text-gray-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              )}
            </span>
          </button>
        </div>

        <button
          type="submit"
          className="mt-4 w-full bg-[#008080] text-white font-semibold py-2 rounded hover:bg-[#006666] transition"
        >
          Submit
        </button>
      </div>

      {/* ✅ NFC Modal */}
      {showNfcModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-md bg-black/30">
          <div className="bg-white rounded-xl shadow-xl p-6 max-w-sm w-full border border-teal-200 relative">
            {/* Close Button */}
            <button
              onClick={cancelNfc}
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 text-xl"
            >
              &times;
            </button>

            <h2 className="text-xl font-bold text-[#008080] mb-2">
              NFC Activated
            </h2>
            <p className="text-sm text-gray-700">
              You're trying to enable <strong>NFC</strong> features.
              <br />
              This is a <strong>premium service</strong>.
              <br />
              <span className="text-[#008080] font-semibold">
                Cost: ₹499/year
              </span>
            </p>

            <div className="flex justify-end mt-5 space-x-3">
              <button
                onClick={cancelNfc}
                className="px-4 py-2 cursor-pointer rounded border border-gray-400 text-gray-600 hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={confirmNfc}
                className="px-4 py-2 cursor-pointer bg-[#008080] text-white rounded hover:bg-[#006666] transition"
              >
                Accept
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PropertyContent;
