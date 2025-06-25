"use client";

import React, { useState } from "react";
import useServicesContext from "@/components/hooks/useServiceContext";
import { FiTrash2 } from "react-icons/fi";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import NFCModal from "@/components/modalPopUps/nfcModal";
import { MapPin } from "lucide-react";


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

  const fetchCurrentLocation = async () => {
  if (navigator.geolocation) {
    try {
      const pos = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0,
        });
      });

      const { latitude, longitude } = pos.coords;

      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=18&addressdetails=1`
      );
      const data = await response.json();
      const fullAddress = data.display_name || "Address not found";

      updateDynamicForm("propertyDetails", "addressInfo", "address", fullAddress);
    } catch (err) {
      console.error("Error fetching current location:", err.message);
      alert("Failed to fetch location. Please check permissions.");
    }
  } else {
    alert("Geolocation not supported in your browser.");
  }
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
          <div key={key} className="flex items-start md:items-center space-x-2">
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
            ) : key === "address" ? (
              <div className="flex-1 space-y-2">
                <textarea
                  rows={3}
                  name={key}
                  placeholder="Address"
                  value={propertyData[section][key]}
                  onChange={(e) =>
                    handleChange(section, key, e.target.value)
                  }
                  className="border p-2 rounded w-full shadow-sm focus:outline-none focus:ring-2 focus:ring-[#008080] resize-none"
                />
                <button
                  type="button"
                  onClick={fetchCurrentLocation}
                  className="flex items-center justify-center w-full py-2 px-3 bg-gray-100 hover:bg-gray-300 text-gray-700 text-sm rounded-lg transition-colors duration-200 cursor-pointer"
                >
                  <MapPin size={16} className="mr-2" />
                  Use Current Location
                </button>
              </div>
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
              className="hover:bg-red-200 mt-1"
            >
              <FiTrash2 className="text-red-700" />
            </button>
          </div>
        ))}

      {/* Dropdown to Add Deleted Fields */}
      {/* {deletedFields[section].length > 0 && (
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
      )} */}
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
        <IoEyeOutline size={20} />
      ) : (
        <IoEyeOffOutline size={20} />
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
