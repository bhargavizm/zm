// src/components/VehicleContent.jsx
"use client";

import React, { useState } from "react";
import useServicesContext from "@/components/hooks/useServiceContext"; // Adjust path as needed
import { Eye, EyeOff } from "lucide-react"; // Assuming lucide-react is installed
import NFCModal from "@/components/modalPopUps/nfcModal";

const VehicleContent = () => {
  const { dynamicForms, updateDynamicForm } = useServicesContext();
  const vehicleInfo = dynamicForms.vehicle;
  const vehicleTemplate = dynamicForms.vehicleTemplate;

  const [showPassword, setShowPassword] = useState(false);

  // Consolidated handleChange for all dynamic forms
  const handleChange = (formKey, sectionKey, fieldKey, value) => {
    updateDynamicForm(formKey, sectionKey, fieldKey, value);
  };

  // Handler for single file upload
  const handleFileChange = (section, field, files) => {
    const file = files[0] || null; // Get the first file or null if none
    updateDynamicForm("vehicle", section, field, file);
  };

  // Handler to remove a single file
  const handleRemoveFile = (section, field) => {
    updateDynamicForm("vehicle", section, field, null);
  };

  // Handler for multiple file uploads (gallery)
  const handleGalleryFileChange = (section, field, files) => {
    const newFiles = Array.from(files);
    // Append new files to existing ones
    const currentFiles = vehicleInfo[section][field] || [];
    updateDynamicForm("vehicle", section, field, [...currentFiles, ...newFiles]);
  };

  // Handler to remove an individual image from the gallery
  const handleRemoveGalleryImage = (section, field, indexToRemove) => {
    const currentFiles = vehicleInfo[section][field] || [];
    const updatedFiles = currentFiles.filter((_, index) => index !== indexToRemove);
    updateDynamicForm("vehicle", section, field, updatedFiles);
  };

  // Handler for template selection
  const handleTemplateSelect = (templateName) => {
    updateDynamicForm(
      "vehicleTemplate",
      null, // No nested section for selectedTemplate
      "selectedTemplate",
      templateName
    );
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Helper function to render file input with preview and remove button
  const renderFileInput = (section, field, label, accept) => {
    const file = vehicleInfo[section][field];
    const fileName = file ? file.name : "No file chosen";

    return (
      <div className="space-y-2">
        <label className="block text-base font-medium text-gray-700">
          {label}
        </label>
        <div className="flex flex-col sm:flex-row sm:items-center gap-3">
          <div className="flex-1 min-w-0">
            <input
              type="file"
              accept={accept}
              className="w-full text-gray-700 file:mr-4 file:py-2 sm:file:py-3 file:px-4 sm:file:px-6 file:rounded-full file:border-0 file:text-xs sm:file:text-sm file:font-semibold file:bg-teal-600 file:text-white hover:file:bg-teal-700 file:transition-colors file:duration-200 cursor-pointer border border-gray-300 rounded-lg py-2 truncate"
              onChange={(e) => handleFileChange(section, field, e.target.files)}
            />
          </div>
          {file && (
            <button
              type="button"
              onClick={() => handleRemoveFile(section, field)}
              className="px-3 sm:px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-200 text-sm font-semibold whitespace-nowrap"
            >
              Remove
            </button>
          )}
        </div>
        {file && (
          <div className="mt-2 flex flex-col items-start space-y-2">
            <span className="text-sm text-gray-600 truncate w-full">Selected: {fileName}</span>
            {file.type.startsWith("image/") && (
              <img
                src={URL.createObjectURL(file)}
                alt="Preview"
                className="w-32 h-32 object-cover rounded-lg border border-gray-300 shadow-sm"
              />
            )}
            {file.type.startsWith("video/") && (
              <video
                src={URL.createObjectURL(file)}
                controls
                className="w-full max-h-48 object-cover rounded-lg border border-gray-300 shadow-sm"
              />
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <>
      <div className="space-y-8 p-4 md:p-8 lg:p-12 bg-gray-50 rounded-xl shadow-lg overflow-auto hide-scrollbar h-150">
        {/* Vehicle Template Selection and Editing Section */}
        <div className="p-4 sm:p-6 bg-white rounded-xl shadow-md border border-gray-100 transition-all duration-300 hover:shadow-lg">
          <h3 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-4 sm:mb-6 border-b pb-2 sm:pb-3 border-gray-200">
            Vehicle Profile Template
          </h3>

          <div className="space-y-5">
            <label className="block text-base font-medium text-gray-700 mb-2">
              Choose a Template:
            </label>

            {/* Template Image/Video Selection Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-6">
                {/* Template V2 Image */}
              <div
                className={`relative cursor-pointer rounded-lg overflow-hidden border-2 
                  ${vehicleTemplate.selectedTemplate === "templateV1"
                    ? "border-teal-500 ring-2 ring-teal-300"
                    : "border-gray-300 hover:border-gray-400"
                  }`}
                 
                onClick={() => handleTemplateSelect("templateV1")}
              >
                <img
                  src="/images/background/carbg.png"
                  alt="Template V1: Modern Vehicle Card"
                  className="w-full h-auto object-cover"
                />
                
              </div>
              {/* Template V2 Image */}
              <div
                className={`relative cursor-pointer rounded-lg overflow-hidden border-2 ${vehicleTemplate.selectedTemplate === "templateV2"
                    ? "border-teal-500 ring-2 ring-teal-300"
                    : "border-gray-300 hover:border-gray-400"
                  } transition-all duration-200 shadow-sm hover:shadow-md`}
                onClick={() => handleTemplateSelect("templateV2")}
              >
                <img
                  src="/images/background/autobg.png"
                  alt="Template V2: Modern Vehicle Card"
                  className="w-full h-auto object-cover"
                />

              </div>

              {/* Template V2 Image */}
              <div
                className={`relative cursor-pointer rounded-lg overflow-hidden border-2 ${vehicleTemplate.selectedTemplate === "templateV3"
                    ? "border-teal-500 ring-2 ring-teal-300"
                    : "border-gray-300 hover:border-gray-400"
                  } transition-all duration-200 shadow-sm hover:shadow-md`}
                onClick={() => handleTemplateSelect("templateV3")}
              >
                <img
                 src="/images/background/lorrybg.png"
                  alt="Template V2: Modern Vehicle Card"
                  className="w-full h-auto object-cover"
                />

              </div>

              {/* Template V2 Image */}
              <div
                className={`relative cursor-pointer rounded-lg overflow-hidden border-2 ${vehicleTemplate.selectedTemplate === "templateV4"
                    ? "border-teal-500 ring-2 ring-teal-300"
                    : "border-gray-300 hover:border-gray-400"
                  } transition-all duration-200 shadow-sm hover:shadow-md`}
                onClick={() => handleTemplateSelect("templateV4")}
              >
                <img
                  src="/images/background/bikebg.png"
                  alt="Template V1: Modern Vehicle Card"
                  className="w-full h-auto object-cover"
                />

              </div>

              {/* Add more templates here if needed */}
              {/* Clear Selection / No Template Option */}
              <div
                className={`relative cursor-pointer rounded-lg overflow-hidden border-2 ${vehicleTemplate.selectedTemplate === "none"
                    ? "border-teal-500 ring-2 ring-teal-300"
                    : "border-gray-300 hover:border-gray-400"
                  } transition-all duration-200 shadow-sm hover:shadow-md`}
                onClick={() => handleTemplateSelect("none")}
              >
                <div className="w-full h-auto object-cover flex items-center justify-center bg-gray-100 py-6">
                  <span className="text-gray-500 text-sm font-semibold">Manual Input</span>
                </div>
                <div className="absolute inset-0 flex items-center justify-center text-center text-xs font-semibold text-gray-800 bg-white bg-opacity-70 opacity-0 hover:opacity-100 transition-opacity duration-200">
                  Manual Input
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* General Section */}
        <div className="p-4 sm:p-6 bg-white rounded-xl shadow-md border border-gray-100 transition-all duration-300 hover:shadow-lg">
          <h3 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-4 sm:mb-6 border-b pb-2 sm:pb-3 border-gray-200">
            General Vehicle Information
          </h3>
          <div className="space-y-4 sm:space-y-5">
            {/* Vehicle Image - Moved to top and made the main image */}
            {renderFileInput("media", "vehicleImage", "Vehicle Image", "image/*")}

            <input
              type="text"
              placeholder="Vehicle Name"
              className="w-full px-4 sm:px-5 py-2 sm:py-3 border border-gray-300 rounded-lg text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-teal-200 focus:border-teal-500 transition-all duration-200"
              value={vehicleInfo.general.vehicleModel || ""}
              onChange={(e) =>
                handleChange(
                  "vehicle",
                  "general",
                  "vehicleModel",
                  e.target.value
                )
              }
            />

            <input
              type="text"
              placeholder="Vehicle Type (e.g., Sedan, SUV, Motorcycle)"
              className="w-full px-4 sm:px-5 py-2 sm:py-3 border border-gray-300 rounded-lg text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-teal-200 focus:border-teal-500 transition-all duration-200"
              value={vehicleInfo.general.vehicleType || ""}
              onChange={(e) =>
                handleChange(
                  "vehicle",
                  "general",
                  "vehicleType",
                  e.target.value
                )
              }
            />

            <textarea
              placeholder="Vehicle Description (e.g., color, features, condition)"
              rows={4}
              className="w-full px-4 sm:px-5 py-2 sm:py-3 border border-gray-300 rounded-lg text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-teal-200 focus:border-teal-500 transition-all duration-200 resize-y"
              value={vehicleInfo.general.description || ""}
              onChange={(e) =>
                handleChange(
                  "vehicle",
                  "general",
                  "description",
                  e.target.value
                )
              }
            />
          </div>
        </div>

        {/* Registration Section */}
        <div className="p-4 sm:p-6 bg-white rounded-xl shadow-md border border-gray-100 transition-all duration-300 hover:shadow-lg">
          <h3 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-4 sm:mb-6 border-b pb-2 sm:pb-3 border-gray-200">
            Registration Details
          </h3>
          <div className="space-y-4 sm:space-y-5">
            <input
              type="text"
              placeholder="RC Number"
              className="w-full px-4 sm:px-5 py-2 sm:py-3 border border-gray-300 rounded-lg text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-teal-200 focus:border-teal-500 transition-all duration-200"
              value={vehicleInfo.registration.rcNumber || ""}
              onChange={(e) =>
                handleChange(
                  "vehicle",
                  "registration",
                  "rcNumber",
                  e.target.value
                )
              }
            />

            <input
              type="text"
              placeholder="Driver Name"
              className="w-full px-4 sm:px-5 py-2 sm:py-3 border border-gray-300 rounded-lg text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-teal-200 focus:border-teal-500 transition-all duration-200"
              value={vehicleInfo.registration.driverName || ""}
              onChange={(e) =>
                handleChange(
                  "vehicle",
                  "registration",
                  "driverName",
                  e.target.value
                )
              }
            />

             <input
              type="text"
              placeholder=" Driver Contact Number"
              className="w-full px-4 sm:px-5 py-2 sm:py-3 border border-gray-300 rounded-lg text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-teal-200 focus:border-teal-500 transition-all duration-200"
              value={vehicleInfo.contact.contact || ""}
              onChange={(e) =>
                handleChange("vehicle", "contact", "contact", e.target.value)
              }
            />

            <input
              type="text"
              placeholder="Owner Name"
              className="w-full px-4 sm:px-5 py-2 sm:py-3 border border-gray-300 rounded-lg text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-teal-200 focus:border-teal-500 transition-all duration-200"
              value={vehicleInfo.registration.ownerName || ""}
              onChange={(e) =>
                handleChange(
                  "vehicle",
                  "registration",
                  "ownerName",
                  e.target.value
                )
              }
            />

             <input
              type="text"
              placeholder="Owner Contact Number"
              className="w-full px-4 sm:px-5 py-2 sm:py-3 border border-gray-300 rounded-lg text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-teal-200 focus:border-teal-500 transition-all duration-200"
              value={vehicleInfo.contact.altContact || ""}
              onChange={(e) =>
                handleChange(
                  "vehicle",
                  "contact",
                  "altContact",
                  e.target.value
                )
              }
            />
          </div>
        </div>

        {/* Contact Section */}
        <div className="p-4 sm:p-6 bg-white rounded-xl shadow-md border border-gray-100 transition-all duration-300 hover:shadow-lg">
          <h3 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-4 sm:mb-6 border-b pb-2 sm:pb-3 border-gray-200">
            Location Information
          </h3>
          <div className="space-y-4 sm:space-y-5">
            <textarea
              placeholder="Full Address (e.g., owner's address or parking location)"
              rows={3}
              className="w-full px-4 sm:px-5 py-2 sm:py-3 border border-gray-300 rounded-lg text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-teal-200 focus:border-teal-500 transition-all duration-200 resize-y"
              value={vehicleInfo.contact.address || ""}
              onChange={(e) =>
                handleChange("vehicle", "contact", "address", e.target.value)
              }
            />
            <input
              type="text"
              placeholder="Map Link (Google Maps, etc.)"
              className="w-full px-4 sm:px-5 py-2 sm:py-3 border border-gray-300 rounded-lg text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-teal-200 focus:border-teal-500 transition-all duration-200"
              value={vehicleInfo.contact.mapLink || ""}
              onChange={(e) =>
                handleChange("vehicle", "contact", "mapLink", e.target.value)
              }
            />
          </div>
        </div>

        {/* Media Section */}
        <div className="p-4 sm:p-6 bg-white rounded-xl shadow-md border border-gray-100 transition-all duration-300 hover:shadow-lg">
          <h3 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-4 sm:mb-6 border-b pb-2 sm:pb-3 border-gray-200">
            Media
          </h3>
          <div className="space-y-4 sm:space-y-6">
            {renderFileInput("media", "licenseFront", "License Front Image", "image/*")}
            {renderFileInput("media", "licenseBack", "License Back Image", "image/*")}
            {renderFileInput("media", "rcFront", "Rc Front Image", "image/*")}
            {renderFileInput("media", "rcBack", "Rc Back Image", "image/*")}

            <div className="space-y-2">
              <label className="block text-base font-medium text-gray-700">
                Vehicle Gallery Images (Multiple)
              </label>
              <input
                type="file"
                accept="image/*"
                multiple
                className="w-full text-gray-700 file:mr-4 file:py-2 sm:file:py-3 file:px-4 sm:file:px-6 file:rounded-full file:border-0 file:text-xs sm:file:text-sm file:font-semibold file:bg-teal-600 file:text-white hover:file:bg-teal-700 file:transition-colors file:duration-200 cursor-pointer border border-gray-300 rounded-lg py-2"
                onChange={(e) =>
                  handleGalleryFileChange("media", "galleryImages", e.target.files)
                }
              />
              {(vehicleInfo.media.galleryImages || []).length > 0 && (
                <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4">
                  {(vehicleInfo.media.galleryImages || []).map((file, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={URL.createObjectURL(file)}
                        alt={`Gallery Image ${index + 1}`}
                        className="w-full h-20 sm:h-24 object-cover rounded-lg border border-gray-300 shadow-sm"
                      />
                      <button
                        type="button"
                        onClick={() =>
                          handleRemoveGalleryImage("media", "galleryImages", index)
                        }
                        className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                        aria-label="Remove image"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 sm:h-4 sm:w-4" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Security Section */}
        <div className="p-4 sm:p-6 bg-white rounded-xl shadow-md border border-gray-100 transition-all duration-300 hover:shadow-lg">
          <h3 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-4 sm:mb-6 border-b pb-2 sm:pb-3 border-gray-200">
            Security
          </h3>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="w-full px-4 sm:px-5 py-2 sm:py-3 border border-gray-300 rounded-lg text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-teal-200 focus:border-teal-500 pr-12 transition-all duration-200"
              value={vehicleInfo.security.password || ""}
              onChange={(e) =>
                handleChange("vehicle", "security", "password", e.target.value)
              }
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 pr-3 sm:pr-4 flex items-center text-teal-600 hover:text-teal-800 transition-colors duration-200"
              onClick={togglePasswordVisibility}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeOff size={18} className="sm:w-5 sm:h-5 w-4 h-4" /> : <Eye size={18} className="sm:w-5 sm:h-5 w-4 h-4" />}
            </button>
          </div>
        </div>

        <div className="p-4 sm:p-6 bg-white rounded-xl shadow-md border border-gray-100 transition-all duration-300 hover:shadow-lg">
          <NFCModal/>
        </div>
      </div>


      <button className="w-full py-3 cursor-pointer bg-[#008080] text-white font-semibold rounded-lg hover:bg-[#006666] transition-all duration-200 mt-6">
        Submit Vehicle Details
      </button>
    </>
  );
};

export default VehicleContent;