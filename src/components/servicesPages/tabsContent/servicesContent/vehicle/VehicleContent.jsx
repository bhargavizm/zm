"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Eye, EyeOff, MapPin, X, Check } from "lucide-react";
import NFCModal from "@/components/modalPopUps/nfcModal";
import useServicesContext from "@/components/hooks/useServiceContext";
import { setVehicleServices } from "@/redux/slices/servicesSlice";
import { useDispatch } from "react-redux";
import { useParams } from "next/navigation";
import useDesignContext from "@/components/hooks/useDesignContext";

const VehicleContent = () => {
  const { dynamicForms, updateDynamicForm } = useServicesContext();
  const vehicleInfo = dynamicForms.vehicle;
  const vehicleTemplate = dynamicForms.vehicleTemplate;
  const dispatch = useDispatch();
   const { slug } = useParams();

    const { setActiveTab } = useDesignContext();
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [totalFileSize, setTotalFileSize] = useState(0);

  // Constants for file size limits
  const MAX_SINGLE_FILE_SIZE = 2 * 1024 * 1024; // 2MB
  const MAX_TOTAL_FILE_SIZE = 30 * 1024 * 1024; // 30MB

  // Calculate total file size whenever media changes
  useEffect(() => {
    let totalSize = 0;
    
    // Single files
    ['vehicleImage', 'licenseFront', 'licenseBack', 'rcFront', 'rcBack'].forEach(field => {
      if (vehicleInfo.media[field]?.size) {
        totalSize += vehicleInfo.media[field].size;
      }
    });

    // Gallery images
    if (vehicleInfo.media.galleryImages?.length > 0) {
      vehicleInfo.media.galleryImages.forEach(file => {
        if (file?.size) totalSize += file.size;
      });
    }

    setTotalFileSize(totalSize);
  }, [vehicleInfo.media]);

  // Validate form fields
  const validateForm = () => {
    const newErrors = {};
    
    
    
    
    
    if (!vehicleInfo.media.vehicleImage) {
      newErrors.vehicleImage = 'Vehicle image is required';
    }
    
    
    
    // Check file sizes
    if (totalFileSize > MAX_TOTAL_FILE_SIZE) {
      newErrors.fileSize = `Total file size exceeds ${MAX_TOTAL_FILE_SIZE / (1024 * 1024)}MB limit`;
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Check file size before adding
  const validateFileSize = (file) => {
    if (file.size > MAX_SINGLE_FILE_SIZE) {
      toast.error(`File ${file.name} exceeds ${MAX_SINGLE_FILE_SIZE / (1024 * 1024)}MB limit`);
      return false;
    }
    return true;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error("Please fix the errors in the form");
      return;
    }
    
    setShowConfirmation(true);
  };

  // Confirm submission
  const confirmSubmission = async () => {
    setShowConfirmation(false);
    setIsSubmitting(true);
    
    try {
      const formData = new FormData();
      
      // Add all text fields
      formData.append('selectedTemplate', vehicleTemplate.selectedTemplate || '');
      formData.append('vehicleModel', vehicleInfo.general.vehicleModel || '');
      formData.append('vehicleType', vehicleInfo.general.vehicleType || '');
      formData.append('description', vehicleInfo.general.description || '');
      formData.append('rcNumber', vehicleInfo.registration.rcNumber || '');
      formData.append('driverName', vehicleInfo.registration.driverName || '');
      formData.append('contact', vehicleInfo.contact.contact || '');
      formData.append('ownerName', vehicleInfo.registration.ownerName || '');
      formData.append('altContact', vehicleInfo.contact.altContact || '');
      formData.append('address', vehicleInfo.contact.address || '');
      formData.append('password', vehicleInfo.security.password || '');

      // Add single files
      if (vehicleInfo.media.vehicleImage) {
        formData.append('vehicleImage', vehicleInfo.media.vehicleImage);
      }
      if (vehicleInfo.media.licenseFront) {
        formData.append('licenseFront', vehicleInfo.media.licenseFront);
      }
      if (vehicleInfo.media.licenseBack) {
        formData.append('licenseBack', vehicleInfo.media.licenseBack);
      }
      if (vehicleInfo.media.rcFront) {
        formData.append('rcFront', vehicleInfo.media.rcFront);
      }
      if (vehicleInfo.media.rcBack) {
        formData.append('rcBack', vehicleInfo.media.rcBack);
      }

      // Add gallery images
      if (vehicleInfo.media.galleryImages?.length > 0) {
        vehicleInfo.media.galleryImages.forEach((file) => {
          formData.append('galleryImages', file);
        });
      }

      // Submit to backend
      const response = await axios.post('/api/services/vehicle', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

     

      dispatch(setVehicleServices(response.data));
      toast.success('Vehicle details saved successfully!');

       setActiveTab(slug, "QR Code");
      
      // Reset form after successful submission
      resetForm();

    } catch (error) {
      console.error('Error submitting vehicle:', error);
      const errorMessage = error.response?.data?.error || 
                         error.response?.data?.message || 
                         'Failed to save vehicle details';
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Reset all form fields
  const resetForm = () => {
    updateDynamicForm('vehicle', null, null, {
      general: {
        vehicleModel: '',
        vehicleType: '',
        description: ''
      },
      registration: {
        rcNumber: '',
        driverName: '',
        ownerName: ''
      },
      contact: {
        contact: '',
        altContact: '',
        address: ''
      },
      media: {
        vehicleImage: null,
        licenseFront: null,
        licenseBack: null,
        rcFront: null,
        rcBack: null,
        galleryImages: []
      },
      security: {
        password: ''
      },
    });
    updateDynamicForm('vehicleTemplate', null, 'selectedTemplate', '');
  };

  // Handle form field changes
  const handleChange = (formKey, sectionKey, fieldKey, value) => {
    updateDynamicForm(formKey, sectionKey, fieldKey, value);
    // Clear error when field is edited
    if (errors[fieldKey]) {
      setErrors(prev => ({ ...prev, [fieldKey]: undefined }));
    }
  };

  // Handle single file upload with size validation
  const handleFileChange = (section, field, files) => {
    const file = files[0] || null;
    if (file && !validateFileSize(file)) return;
    handleChange("vehicle", section, field, file);
  };

  // Handle multiple file uploads with size validation
  const handleGalleryFileChange = (section, field, files) => {
    const newFiles = Array.from(files).filter(file => {
      if (!validateFileSize(file)) return false;
      return true;
    });
    
    const currentFiles = vehicleInfo[section][field] || [];
    const combinedFiles = [...currentFiles, ...newFiles];
    
    // Check total size
    const newTotalSize = totalFileSize + newFiles.reduce((sum, file) => sum + file.size, 0);
    if (newTotalSize > MAX_TOTAL_FILE_SIZE) {
      toast.error(`Total file size exceeds ${MAX_TOTAL_FILE_SIZE / (1024 * 1024)}MB limit`);
      return;
    }
    
    handleChange("vehicle", section, field, combinedFiles);
  };

  // Remove a single file
  const handleRemoveFile = (section, field) => {
    handleChange("vehicle", section, field, null);
  };

  // Remove an image from gallery
  const handleRemoveGalleryImage = (section, field, indexToRemove) => {
    const currentFiles = vehicleInfo[section][field] || [];
    const updatedFiles = currentFiles.filter((_, index) => index !== indexToRemove);
    handleChange("vehicle", section, field, updatedFiles);
  };

  // Handle template selection
  const handleTemplateSelect = (templateName) => {
    handleChange("vehicleTemplate", null, "selectedTemplate", templateName);
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
        const response = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=18&addressdetails=1`
        );
        const data = await response.json();
        const fullAddress = data.display_name || "Address not found";

        handleChange("vehicle", "contact", "address", fullAddress);
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
    const fileSize = file ? `(${(file.size / (1024 * 1024)).toFixed(2)} MB)` : '';
    const error = errors[field];

    return (
      <div className="space-y-2">
        <label className="block text-base font-medium text-gray-700">
          {label} {required && <span className="text-red-500">*</span>}
          <span className="block text-xs text-gray-500 mt-1">
            Max single file: 2MB 
          </span>
        </label>
        <div className="flex flex-col sm:flex-row sm:items-center gap-3">
          <div className="flex-1 min-w-0">
            <input
              type="file"
              accept={accept}
              className={`w-full text-gray-700 file:mr-4 file:py-2 sm:file:py-3 file:px-4 sm:file:px-6 file:rounded-full file:border-0 file:text-xs sm:file:text-sm file:font-semibold file:bg-teal-600 file:text-white hover:file:bg-teal-700 file:transition-colors file:duration-200 cursor-pointer border ${
                error ? 'border-red-500' : 'border-gray-300'
              } rounded-lg py-2 truncate`}
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

  // Confirmation Modal
  const ConfirmationModal = () => {
    if (!showConfirmation) return null;

    return (
      <div className="fixed inset-0  bg-opacity-50 flex items-center justify-center z-50 p-4  bg-black/10 backdrop-blur-sm">
        <div className="bg-white rounded-xl shadow-xl p-6 max-w-md w-full">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            Confirm Submission
          </h3>
          <p className="text-gray-600 mb-6">
            Are you sure you want to submit? Please review all details before confirming.
          </p>
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={() => setShowConfirmation(false)}
              className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 transition-colors duration-200 flex items-center"
            >
              <X className="mr-2 w-4 h-4" />
              Cancel
            </button>
            <button
              type="button"
              onClick={confirmSubmission}
              className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors duration-200 flex items-center"
            >
              <Check className="mr-2 w-4 h-4" />
              Confirm & Submit
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="space-y-8 p-4 md:p-8 lg:p-12 bg-gray-50 rounded-xl shadow-lg overflow-auto hide-scrollbar h-150">
          <div className="p-4 sm:p-6 bg-white rounded-xl shadow-md border border-gray-100 transition-all duration-300 hover:shadow-lg">
          <h3 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-4 sm:mb-6 border-b pb-2 sm:pb-3 border-gray-200">
            Vehicle Profile Template
          </h3>
          <div className="space-y-5">
            <label className="block text-base font-medium text-gray-700 mb-2">
              Choose a Template:
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-6">
  {['templateV1', 'templateV2', 'templateV3', 'templateV4'].map((template) => (
    <div
      key={template}
      className={`relative cursor-pointer rounded-lg overflow-hidden border-2 ${
        vehicleTemplate.selectedTemplate === template
          ? "border-teal-500 ring-2 ring-teal-300"
          : "border-gray-300 hover:border-gray-400"
      } transition-all duration-200 shadow-sm hover:shadow-md`}
      onClick={() => handleTemplateSelect(template)}
    >
      <img
        src={`/images/background/${template.replace('template', '').toLowerCase()}bg.webp`}
        alt={`${template} Vehicle Card`}
        className="w-full h-auto object-cover"
      />
    </div>
  ))}
</div>

          </div>
        </div>

        {/* General Vehicle Information */}
        <div className="p-4 sm:p-6 bg-white rounded-xl shadow-md border border-gray-100 transition-all duration-300 hover:shadow-lg">
          <h3 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-4 sm:mb-6 border-b pb-2 sm:pb-3 border-gray-200">
            General Vehicle Information
          </h3>
          <div className="space-y-4 sm:space-y-5">
            {renderFileInput("media", "vehicleImage", "Vehicle Image", "image/*", true)}
            
            <div>
              <input
                type="text"
                placeholder="Vehicle Name *"
                className={`w-full px-4 sm:px-5 py-2 sm:py-3 border ${
                  errors.vehicleModel ? 'border-red-500' : 'border-gray-300'
                } rounded-lg text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-teal-200 focus:border-teal-500 transition-all duration-200`}
                value={vehicleInfo.general.vehicleModel || ""}
                onChange={(e) =>
                  handleChange("vehicle", "general", "vehicleModel", e.target.value)
                }
              />
              {errors.vehicleModel && (
                <p className="text-red-500 text-sm mt-1">{errors.vehicleModel}</p>
              )}
            </div>

            <input
              type="text"
              placeholder="Vehicle Type (e.g., Sedan, SUV, Motorcycle)"
              className="w-full px-4 sm:px-5 py-2 sm:py-3 border border-gray-300 rounded-lg text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-teal-200 focus:border-teal-500 transition-all duration-200"
              value={vehicleInfo.general.vehicleType || ""}
              onChange={(e) =>
                handleChange("vehicle", "general", "vehicleType", e.target.value)
              }
            />

            <textarea
              placeholder="Vehicle Description (e.g., color, features, condition)"
              rows={4}
              className="w-full px-4 sm:px-5 py-2 sm:py-3 border border-gray-300 rounded-lg text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-teal-200 focus:border-teal-500 transition-all duration-200 resize-y"
              value={vehicleInfo.general.description || ""}
              onChange={(e) =>
                handleChange("vehicle", "general", "description", e.target.value)
              }
            />
          </div>
        </div>

        {/* Registration Details */}
        <div className="p-4 sm:p-6 bg-white rounded-xl shadow-md border border-gray-100 transition-all duration-300 hover:shadow-lg">
          <h3 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-4 sm:mb-6 border-b pb-2 sm:pb-3 border-gray-200">
            Registration Details
          </h3>
          <div className="space-y-4 sm:space-y-5">
            <div>
              <input
                type="text"
                placeholder="RC Number *"
                className={`w-full px-4 sm:px-5 py-2 sm:py-3 border ${
                  errors.rcNumber ? 'border-red-500' : 'border-gray-300'
                } rounded-lg text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-teal-200 focus:border-teal-500 transition-all duration-200`}
                value={vehicleInfo.registration.rcNumber || ""}
                onChange={(e) =>
                  handleChange("vehicle", "registration", "rcNumber", e.target.value)
                }
              />
              {errors.rcNumber && (
                <p className="text-red-500 text-sm mt-1">{errors.rcNumber}</p>
              )}
            </div>

            <input
              type="text"
              placeholder="Driver Name"
              className="w-full px-4 sm:px-5 py-2 sm:py-3 border border-gray-300 rounded-lg text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-teal-200 focus:border-teal-500 transition-all duration-200"
              value={vehicleInfo.registration.driverName || ""}
              onChange={(e) =>
                handleChange("vehicle", "registration", "driverName", e.target.value)
              }
            />

            <input
              type="text"
              placeholder="Driver Contact Number"
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
                handleChange("vehicle", "registration", "ownerName", e.target.value)
              }
            />

            <input
              type="text"
              placeholder="Owner Contact Number"
              className="w-full px-4 sm:px-5 py-2 sm:py-3 border border-gray-300 rounded-lg text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-teal-200 focus:border-teal-500 transition-all duration-200"
              value={vehicleInfo.contact.altContact || ""}
              onChange={(e) =>
                handleChange("vehicle", "contact", "altContact", e.target.value)
              }
            />
          </div>  
        </div>

        {/* Location Information */}
        <div className="p-4 sm:p-6 bg-white rounded-xl shadow-md border border-gray-100 transition-all duration-300 hover:shadow-lg">
          <h3 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-4 sm:mb-6 border-b pb-2 sm:pb-3 border-gray-200">
            Location Information
          </h3>
          <div className="space-y-2">
            <textarea
              placeholder="Full Address (e.g., owner's address or parking location)"
              rows={3}
              className="w-full px-4 sm:px-5 py-2 sm:py-3 border border-gray-300 rounded-lg text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-teal-200 focus:border-teal-500 transition-all duration-200 resize-y"
              value={vehicleInfo.contact.address || ""}
              onChange={(e) =>
                handleChange("vehicle", "contact", "address", e.target.value)
              }
            />
            <button
              type="button"
              onClick={fetchCurrentLocation}
              className="flex items-center justify-center w-full py-2 px-3 bg-gray-100 hover:bg-gray-300 text-gray-700 text-sm rounded-lg transition-colors duration-200 cursor-pointer"
            >
              <MapPin className="mr-2 w-4 h-4" />
              Use Current Location
            </button>
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
            {renderFileInput("media", "rcFront", "RC Front Image", "image/*")}
            {renderFileInput("media", "rcBack", "RC Back Image", "image/*")}

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
              placeholder="Password *"
              className={`w-full px-4 sm:px-5 py-2 sm:py-3 border ${
                errors.password ? 'border-red-500' : 'border-gray-300'
              } rounded-lg text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-teal-200 focus:border-teal-500 pr-12 transition-all duration-200`}
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
              {showPassword ? <Eye size={18} className="sm:w-5 sm:h-5 w-4 h-4" /> : <EyeOff size={18} className="sm:w-5 sm:h-5 w-4 h-4" />}
            </button>
          </div>
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">{errors.password}</p>
          )}
        </div>

        {/* NFC Section */}
        <div className="p-4 sm:p-6 bg-white rounded-xl shadow-md border border-gray-100 transition-all duration-300 hover:shadow-lg">
          <NFCModal/>
        </div>
        </div>

        <button 
          type="submit"
          disabled={isSubmitting}
          className={`w-full py-3 cursor-pointer bg-[#008080] text-white font-semibold rounded-lg hover:bg-[#006666] transition-all duration-200 mt-6 ${
            isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
          }`}
        >
          {isSubmitting ? 'Submitting...' : 'Submit Vehicle Details'}
        </button>
      </form>

      <ConfirmationModal />
    </>
  );
};

export default VehicleContent;