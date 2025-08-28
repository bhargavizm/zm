"use client";

import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Eye, EyeOff, MapPin, X, Check } from "lucide-react";
import NFCModal from "@/components/modalPopUps/nfcModal";
import useServicesContext from "@/components/hooks/useServiceContext";
import { setVehicleServices } from "@/redux/slices/servicesSlice";
import { useDispatch } from "react-redux";
import { useParams } from "next/navigation";
import useDesignContext from "@/components/hooks/useDesignContext";
import { MdCancel } from "react-icons/md";
import LoadingSpinner from "@/components/common/spinner";

const VehicleContent = () => {
  const {
    dynamicForms,
    updateDynamicForm,
    servicesDataLoading,
    setServicesDataLoading,
  } = useServicesContext();
  const vehicleInfo = dynamicForms.vehicle;
  const vehicleTemplate = dynamicForms.vehicle.vehicleTemplate;
  const dispatch = useDispatch();
  const { slug } = useParams();

  const fileInputRefs = useRef({
    vehicleImage: null,
    licenseFront: null,
    licenseBack: null,
    rcFront: null,
    rcBack: null,
    pollution: null,
    galleryImages: null,
    insurance: null,
  });

  const { setActiveTab, setText, setQrcodeUrl } = useDesignContext();
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const [showConfirmation, setShowConfirmation] = useState(false);

  // Validate form fields
  const validateForm = () => {
    const newErrors = {};

    // Required fields validation
    if (!vehicleInfo.media.vehicleImage) {
      newErrors.vehicleImage = "Vehicle image is required";
    }

    if (!vehicleInfo.registration.rcNumber?.trim()) {
      newErrors.rcNumber = "RC number is required";
    }

    // if (vehicleInfo.contact.contact?.trim() && !/^\d{10,15}$/.test(vehicleInfo.contact.contact)) {
    //   newErrors.contact = 'Invalid contact number';
    // }
    // if (vehicleInfo.contact.altContact?.trim() && !/^\d{10,15}$/.test(vehicleInfo.contact.altContact)) {
    //   newErrors.altContact = 'Invalid alternate contact number';
    // }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Check file size before adding
  const validateFileSize = (file) => {
    if (file.size > MAX_SINGLE_FILE_SIZE) {
      toast.error(
        `File ${file.name} exceeds ${
          MAX_SINGLE_FILE_SIZE / (1024 * 1024)
        }MB limit`
      );
      return false;
    }
    return true;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error("Please enter the necessary form details.");
      setShowConfirmation(false); // make sure modal stays hidden
      return;
    }

    setShowConfirmation(true);
  };

  // Confirm submission
  const confirmSubmission = async () => {
    setActiveTab(slug, "Backdrop Designs");
  };

  // Handle form field changes
  const handleChange = (formKey, sectionKey, fieldKey, value) => {
    updateDynamicForm(formKey, sectionKey, fieldKey, value);
    // Clear error when field is edited
    if (errors[fieldKey]) {
      setErrors((prev) => ({ ...prev, [fieldKey]: undefined }));
    }

    // Live validation for phone numbers
    if (fieldKey === "contact" || fieldKey === "altContact") {
      if (value.trim() && !/^\d{10,15}$/.test(value)) {
        setErrors((prev) => ({
          ...prev,
          [fieldKey]: "Phone number must 10 to 15 digits",
        }));
      } else {
        setErrors((prev) => ({ ...prev, [fieldKey]: undefined }));
      }
    } else if (errors[fieldKey]) {
      // Clear other field errors when user types
      setErrors((prev) => ({ ...prev, [fieldKey]: undefined }));
    }
  };

  // Handle single file upload with size validation

  const MAX_TOTAL_FILE_SIZE = 30 * 1024 * 1024; // 30MB

  // Utility: calculate total size of all uploaded files
  const calculateTotalSize = (media) => {
    let total = 0;
    Object.values(media).forEach((value) => {
      if (!value) return;
      if (Array.isArray(value)) {
        value.forEach((file) => {
          if (file instanceof File) total += file.size;
        });
      } else if (value instanceof File) {
        total += value.size;
      }
    });
    return total;
  };

  // Check before adding new files
  const canAddFiles = (newFiles) => {
    const currentSize = calculateTotalSize(vehicleInfo.media);
    const newSize = newFiles.reduce((sum, f) => sum + f.size, 0);
    if (currentSize + newSize > MAX_TOTAL_FILE_SIZE) {
      toast.error(
        `Total file size must be under ${MAX_TOTAL_FILE_SIZE / (1024 * 1024)}MB`
      );
      return false;
    }
    return true;
  };

  // Single file handler
  const handleFileChange = (section, field, files) => {
    const file = files[0] || null;
    if (file && !canAddFiles([file])) return;
    handleChange("vehicle", section, field, file);
  };

  // Multiple files handler
  const handleGalleryFileChange = (section, field, files) => {
    const newFiles = Array.from(files);
    if (!canAddFiles(newFiles)) return;
    const currentFiles = vehicleInfo[section][field] || [];
    const combinedFiles = [...currentFiles, ...newFiles];
    handleChange("vehicle", section, field, combinedFiles);
  };

  // Remove a single file
  const handleRemoveFile = (section, field) => {
    handleChange("vehicle", section, field, null);
    if (fileInputRefs.current[field]) {
      fileInputRefs.current[field].value = "";
    }
  };

  // Remove an image from gallery
  const handleRemoveGalleryImage = (section, field, indexToRemove) => {
    const currentFiles = vehicleInfo[section][field] || [];
    const updatedFiles = currentFiles.filter(
      (_, index) => index !== indexToRemove
    );
    handleChange("vehicle", section, field, updatedFiles);
    if (fileInputRefs.current[field] && updatedFiles.length === 0) {
      fileInputRefs.current[field].value = "";
    }
  };

  // Handle template selection
  const handleTemplateSelect = (templateName) => {
    updateDynamicForm("vehicle", null, "vehicleTemplate", templateName);
  };
  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Fetch current location
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

        // ✅ Direct Google Maps link
        const mapLink = `https://www.google.com/maps?q=${latitude},${longitude}`;

        handleChange("vehicle", "contact", "mapLink", mapLink);
      } catch (err) {
        console.error("Error fetching location:", err.message);
        toast.error("Failed to fetch location. Please check permissions.");
      }
    } else {
      toast.error("Geolocation not supported in your browser.");
    }
  };

  // Render file input with preview and size info
  const renderFileInput = (section, field, label, accept, required = false) => {
    const file = vehicleInfo[section][field];
    const fileName = file ? file.name : "No file chosen";
    const fileSize = file
      ? `(${(file.size / (1024 * 1024)).toFixed(2)} MB)`
      : "";
    const error = errors[field];

    return (
      <>
        <div className="space-y-2">
          <label className="block text-base font-medium text-gray-700">
            {label} {required && <span className="text-red-500">*</span>}

          </label>
          <div className="flex flex-col sm:flex-row sm:items-center gap-3">
            <div className="flex-1 min-w-0">
              <input
                type="file"
                accept={accept}
                ref={(el) => (fileInputRefs.current[field] = el)}
                className={`w-full text-gray-700 file:mr-4 file:py-2 sm:file:py-3 file:px-4 sm:file:px-6 file:rounded-full file:border-0 file:text-xs sm:file:text-sm file:font-semibold file:bg-teal-600 file:text-white hover:file:bg-teal-700 file:transition-colors file:duration-200 cursor-pointer border ${
                  error ? "border-red-500" : "border-gray-300"
                } rounded-lg py-2 truncate`}
                onChange={(e) =>
                  handleFileChange(section, field, e.target.files)
                }
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
          {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
          {file && (
            <div className="mt-2 flex flex-col items-start space-y-2">
              <span className="text-sm text-gray-600 truncate w-full">
                Selected: {fileName} {fileSize}
              </span>
              {file.type.startsWith("image/") && (
                <img
                  src={URL.createObjectURL(file)}
                  alt="Preview"
                  className="w-50 h-32 object-center rounded-lg border border-gray-300 shadow-sm"
                />
              )}
              {file.type.startsWith("video/") && (
                <video
                  src={URL.createObjectURL(file)}
                  controls
                  className="w-full max-h-48 object-center rounded-lg border border-gray-300 shadow-sm"
                />
              )}
            </div>
          )}
        </div>
      </>
    );
  };

  // Confirmation Modal
  const ConfirmationModal = () => {
    if (!showConfirmation) return null;

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-md bg-black/30">
        <div className="bg-white relative rounded-xl shadow-xl p-6 w-full max-w-xl max-h-[90vh] border border-teal-200 mx-4 sm:mx-auto">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            Confirm Submission
          </h3>
          <p className="text-gray-600 mb-6">
            Are you sure you want to submit? Please review all details before
            confirming.
          </p>
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={() => setShowConfirmation(false)}
              className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 transition-colors duration-200 flex items-center"
            >
              Back
            </button>
            <button
              type="button"
              onClick={confirmSubmission}
              className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors duration-200 flex items-center"
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      {servicesDataLoading && <LoadingSpinner />}

      <form onSubmit={handleSubmit}>
        <div className="space-y-8 p-4 bg-gray-50 rounded-xl  overflow-auto hide-scrollbar ">
          {/* Vehicle Profile Template Section */}
          <div className="p-4 sm:p-6 bg-white rounded-xl shadow-md border border-gray-100 transition-all duration-300 hover:shadow-md">
            <h3 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-4 sm:mb-6 border-b pb-2 sm:pb-3 border-gray-200">
              Choose a Template (click to select)
            </h3>
            <div className="space-y-5">
              <label className="block text-base font-medium text-gray-700 mb-2">
                Choose a Template:
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-6">
                {["templateV1", "templateV2", "templateV3", "templateV4"].map(
                  (template) => (
                    <div
                      key={template}
                      className={`relative cursor-pointer rounded-lg overflow-hidden border-2 ${
                        dynamicForms.vehicle.vehicleTemplate === template
                          ? "border-teal-500 ring-2 ring-teal-300"
                          : "border-gray-300 hover:border-gray-400"
                      }`}
                      onClick={() => handleTemplateSelect(template)}
                    >
                      <img
                        src={`/images/background/${template
                          .replace("template", "")
                          .toLowerCase()}bg.webp`}
                        alt={`${template} Vehicle Card`}
                        className="w-full h-auto object-center"
                      />
                    </div>
                  )
                )}
              </div>
            </div>
          </div>

          {/* General Vehicle Information */}
          <div className="p-4 sm:p-6 bg-white rounded-xl shadow-md border border-gray-100 transition-all duration-300 hover:shadow-md">
            <h3 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-4 sm:mb-6 border-b pb-2 sm:pb-3 border-gray-200">
              General Vehicle Information
            </h3>
            <div className="space-y-4 sm:space-y-5">
              {renderFileInput(
                "media",
                "vehicleImage",
                "Vehicle Image",
                "image/*",
                true
              )}

              <div>
                <label className="block text-base font-medium text-gray-700 mb-1">
                  Vehicle Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Vehicle Name *"
                  className={`w-full px-4 sm:px-5 py-2 sm:py-3 border ${
                    errors.vehicleModel ? "border-red-500" : "border-gray-300"
                  } rounded-lg text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-teal-200 focus:border-teal-500 transition-all duration-200`}
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
                {errors.vehicleModel && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.vehicleModel}
                  </p>
                )}
              </div>

              <label className="block text-base font-medium text-gray-700 mb-1">
                Vehicle Type
              </label>
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

              <label className="block text-base font-medium text-gray-700 mb-1">
                Vehicle Number
              </label>
              <input
                type="text"
                placeholder="Vehicle Number"
                className="w-full px-4 sm:px-5 py-2 sm:py-3 border border-gray-300 rounded-lg text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-teal-200 focus:border-teal-500 transition-all duration-200"
                value={vehicleInfo.general.vehicleNumber || ""}
                onChange={(e) =>
                  handleChange(
                    "vehicle",
                    "general",
                    "vehicleNumber",
                    e.target.value
                  )
                }
              />

              <label className="block text-base font-medium text-gray-700 mb-1">
                Vehicle Description
              </label>
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

          {/* Registration Details */}
          <div className="p-4 sm:p-6 bg-white rounded-xl shadow-md border border-gray-100 transition-all duration-300 hover:shadow-md">
            <h3 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-4 sm:mb-6 border-b pb-2 sm:pb-3 border-gray-200">
              Registration Details
            </h3>
            <div className="space-y-4 sm:space-y-5">
              <div>
                <label className="block text-base font-medium text-gray-700 mb-1">
                  RC Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="RC Number *"
                  className={`w-full px-4 sm:px-5 py-2 sm:py-3 border ${
                    errors.rcNumber ? "border-red-500" : "border-gray-300"
                  } rounded-lg text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-teal-200 focus:border-teal-500 transition-all duration-200`}
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
                {errors.rcNumber && (
                  <p className="text-red-500 text-sm mt-1">{errors.rcNumber}</p>
                )}
              </div>

              <label className="block text-base font-medium text-gray-700 mb-1">
                Driver Name
              </label>
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

              <div>
                <label className="block text-base font-medium text-gray-700 mb-1">
                  Driver Contact Number
                </label>
                <input
                  type="text"
                  placeholder="Driver Contact Number"
                  className={`w-full px-4 sm:px-5 py-2 sm:py-3 border ${
                    errors.contact ? "border-red-500" : "border-gray-300"
                  } rounded-lg text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-teal-200 focus:border-teal-500 transition-all duration-200`}
                  value={vehicleInfo.contact.contact || ""}
                  onChange={(e) =>
                    handleChange(
                      "vehicle",
                      "contact",
                      "contact",
                      e.target.value
                    )
                  }
                />
                {errors.contact && (
                  <p className="text-red-500 text-sm mt-1">{errors.contact}</p>
                )}
              </div>

              <label className="block text-base font-medium text-gray-700 mb-1">
                Owner Name
              </label>
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

              <div>
                <label className="block text-base font-medium text-gray-700 mb-1">
                  Owner Contact Number
                </label>
                <input
                  type="text"
                  placeholder="Owner Contact Number"
                  className={`w-full px-4 sm:px-5 py-2 sm:py-3 border ${
                    errors.altContact ? "border-red-500" : "border-gray-300"
                  } rounded-lg text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-teal-200 focus:border-teal-500 transition-all duration-200`}
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
                {errors.altContact && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.altContact}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Location Information */}
          <div className="p-4 sm:p-6 bg-white rounded-xl shadow-md border border-gray-100 transition-all duration-300 hover:shadow-md">
            <h3 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-4 sm:mb-6 border-b pb-2 sm:pb-3 border-gray-200">
              Location Information
            </h3>
            <div className="space-y-2">
              <label htmlFor="">Address:</label>
              <textarea
                placeholder="Full Address (e.g., owner's address or parking location)"
                rows={3}
                className="w-full px-4 sm:px-5 py-2 sm:py-3 border border-gray-300 rounded-lg text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-teal-200 focus:border-teal-500 transition-all duration-200 resize-y"
                value={vehicleInfo.contact.address || ""}
                onChange={(e) =>
                  handleChange("vehicle", "contact", "address", e.target.value)
                }
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="">Map Link:</label>
              <textarea
                placeholder="Map Link"
                rows={3}
                className="w-full px-4 sm:px-5 py-2 sm:py-3 border border-gray-300 rounded-lg text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-teal-200 focus:border-teal-500 transition-all duration-200 resize-y"
                value={vehicleInfo.contact.mapLink || ""}
                onChange={(e) =>
                  handleChange("vehicle", "contact", "mapLink", e.target.value)
                }
              />
              <button
                type="button"
                onClick={fetchCurrentLocation}
                className="flex items-center justify-center w-full py-2 px-3 bg-mainGreen text-white text-sm rounded-lg transition-colors duration-200 cursor-pointer"
              >
                <MapPin className="mr-2 w-4 h-4" />
                Use Current Location
              </button>
            </div>
          </div>

          {/* Media Section */}
          <div className="p-4 sm:p-6 bg-white rounded-xl shadow-md border border-gray-100 transition-all duration-300 hover:shadow-md">
            <h3 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-4 sm:mb-6 border-b pb-2 sm:pb-3 border-gray-200">
              Media
            </h3>
            <div className="space-y-4 sm:space-y-6">
              {renderFileInput(
                "media",
                "licenseFront",
                "License Front Image",
                "image/*"
              )}
              {renderFileInput(
                "media",
                "licenseBack",
                "License Back Image",
                "image/*"
              )}
              {renderFileInput("media", "rcFront", "RC Front Image", "image/*")}
              {renderFileInput("media", "rcBack", "RC Back Image", "image/*")}
              {renderFileInput(
                "media",
                "pollution",
                "Pollution Image",
                "image/*"
              )}

              {/* Media Section */}
              <div className="p-6 bg-white rounded-xl shadow-md border border-gray-100 transition-all duration-300 hover:shadow-md">
                <h3 className="text-2xl font-semibold text-gray-800 mb-6 border-b pb-3 border-gray-200">
                  Media
                </h3>

                <div className="space-y-6">
                  {/* Gallery Images */}
                  {/* Gallery Images Upload */}
                  <div className="space-y-2 mt-6 ">
                    <div className="flex items-center justify-start gap-6 pb-4">
                      <label className="block text-base  font-medium text-gray-700">
                        Gallery Images
                      </label>

                      {/* Upload Count Display */}
                      <p className="text-sm text-gray-600">
                        {vehicleInfo.media.galleryImages?.length > 0
                          ? `${vehicleInfo.media.galleryImages.length} file(s) selected`
                          : "No files chosen"}
                      </p>
                    </div>

                    <label className="bg-teal-700  text-white px-4 py-2  rounded cursor-pointer">
                      Choose Files
                      <input
                        type="file"
                        multiple
                        onChange={(e) =>
                          handleGalleryFileChange(
                            "media",
                            "galleryImages",
                            e.target.files,
                            true
                          )
                        }
                        className="hidden"
                      />
                    </label>

                    {/* Display Selected Images */}

                    <div className="flex flex-wrap gap-4 mt-6">
                      {Array.isArray(vehicleInfo.media.galleryImages) &&
                        vehicleInfo.media.galleryImages.map((file, index) => (
                          <div key={index} className="relative">
                            <img
                              src={
                                typeof file === "string"
                                  ? file
                                  : URL.createObjectURL(file)
                              }
                              alt={`Gallery ${index}`}
                              className="h-20 w-20 object-center rounded-lg"
                            />
                            <button
                              onClick={() =>
                                handleRemoveGalleryImage(
                                  "media",
                                  "galleryImages",
                                  index
                                )
                              }
                              className="absolute -top-2 -right-2 bg-red-500 text-white cursor-pointer rounded-full p-1 hover:bg-red-600"
                            >
                              <MdCancel />
                            </button>
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Media Section */}
              <div className="p-6 bg-white rounded-xl shadow-md border border-gray-100 transition-all duration-300 hover:shadow-md">
                <h3 className="text-2xl font-semibold text-gray-800 mb-6 border-b pb-3 border-gray-200">
                  Media
                </h3>

                <div className="space-y-6">
                  {/* Gallery Images */}
                  {/* Gallery Images Upload */}
                  <div className="space-y-2 mt-6 ">
                    <div className="flex items-center justify-start gap-6 pb-4">
                      <label className="block text-base  font-medium text-gray-700">
                        Insurance
                      </label>

                      {/* Upload Count Display */}
                      <p className="text-sm text-gray-600">
                        {vehicleInfo.media.insurance?.length > 0
                          ? `${vehicleInfo.media.insurance.length} file(s) selected`
                          : "No files chosen"}
                      </p>
                    </div>

                    <label className="bg-teal-700  text-white px-4 py-2  rounded cursor-pointer">
                      Choose Files
                      <input
                        type="file"
                        multiple
                        onChange={(e) =>
                          handleGalleryFileChange(
                            "media",
                            "insurance",
                            e.target.files,
                            true
                          )
                        }
                        className="hidden"
                      />
                    </label>

                    {/* Display Selected Images */}

                    <div className="flex flex-wrap gap-4 mt-6">
                      {Array.isArray(vehicleInfo.media.insurance) &&
                        vehicleInfo.media.insurance.map((file, index) => (
                          <div key={index} className="relative">
                            <img
                              src={
                                typeof file === "string"
                                  ? file
                                  : URL.createObjectURL(file)
                              }
                              alt={`Gallery ${index}`}
                              className="h-20 w-20 object-center rounded-lg"
                            />
                            <button
                              onClick={() =>
                                handleRemoveGalleryImage(
                                  "media",
                                  "insurance",
                                  index
                                )
                              }
                              className="absolute -top-2 -right-2 bg-red-500 text-white cursor-pointer rounded-full p-1 hover:bg-red-600"
                            >
                              <MdCancel />
                            </button>
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Security Section */}
          <div className="p-4 sm:p-6 bg-white rounded-xl shadow-md border border-gray-100 transition-all duration-300 hover:shadow-md">
            <h3 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-4 sm:mb-6 border-b pb-2 sm:pb-3 border-gray-200">
              Security
            </h3>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password *"
                className={`w-full px-4 sm:px-5 py-2 sm:py-3 border ${
                  errors.password ? "border-red-500" : "border-gray-300"
                } rounded-lg text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-teal-200 focus:border-teal-500 pr-12 transition-all duration-200`}
                value={vehicleInfo.password || ""}
                onChange={(e) =>
                  handleChange("vehicle", null, "password", e.target.value)
                }
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 sm:pr-4 flex items-center text-teal-600 hover:text-teal-800 transition-colors duration-200"
                onClick={togglePasswordVisibility}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <Eye size={18} className="sm:w-5 sm:h-5 w-4 h-4" />
                ) : (
                  <EyeOff size={18} className="sm:w-5 sm:h-5 w-4 h-4" />
                )}
              </button>
            </div>
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password}</p>
            )}
          </div>

          <div className="flex justify-center items-center">
            <button
              type="submit"
              className="font-bold px-4 cursor-pointer bg-[#008080] text-white py-2 rounded transition-effects text-lg"
            >
              Next →
            </button>
          </div>
        </div>
      </form>

      <ConfirmationModal />
    </>
  );
};

export default VehicleContent;
