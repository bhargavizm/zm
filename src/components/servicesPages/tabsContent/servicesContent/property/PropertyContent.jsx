"use client";

import React, { useState } from "react";
import useServicesContext from "@/components/hooks/useServiceContext";
import { FiTrash2 } from "react-icons/fi";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import NFCModal from "@/components/modalPopUps/nfcModal";

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

  const propertyData = dynamicForms.propertyDetails || {
    basicInfo: {},
    addressInfo: {},
    pricingInfo: {},
    images: {},
    password: "",
  };

  const sections = {
    basicInfo: ["propertyName", "propertyType", "ownerName", "contactNumber", "alternateNumber", "propertyDescription"],
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
                      className="w-full text-gray-700 file:mr-4 file:py-3 file:px-6 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-teal-600 file:text-white hover:file:bg-teal-700 file:transition-colors file:duration-200 cursor-pointer border border-gray-300 rounded-lg py-2"
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
                      className="w-full text-gray-700 file:mr-4 file:py-3 file:px-6 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-teal-600 file:text-white hover:file:bg-teal-700 file:transition-colors file:duration-200 cursor-pointer border border-gray-300 rounded-lg py-2"
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
            placeholder="Password"
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

        <NFCModal />

        <button
          type="submit"
          className="mt-4 w-full bg-[#008080] text-white font-semibold py-2 rounded hover:bg-[#006666] transition"
        >
          Submit
        </button>
      </div>
    </>
  );
};

export default PropertyContent;
