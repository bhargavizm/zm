// src/components/services/VehicleContent.jsx
"use client";

import React, { useState } from "react";
import useServicesContext from "@/components/hooks/useServiceContext";

import { Eye, EyeOff,  PlusCircle } from 'lucide-react'; // Using Lucide for password icons
import { FiMapPin, FiPlus, FiTrash2, FiUpload, FiX } from "react-icons/fi";


const VehicleContent = () => {
  const { dynamicForms, updateDynamicForm } = useServicesContext();
  // Access vehicle data from dynamicForms, ensuring it's an object
  const vehicle = dynamicForms.vehicle || {};

  // Local UI state for password visibility and NFC
  const [showPassword, setShowPassword] = useState(false);
  const [nfcEnabled, setNfcEnabled] = useState(false);
  const [showNfcModal, setShowNfcModal] = useState(false);
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);

  // Define all primary fields for the form, including their types and sections
  // 'optional: true' indicates fields that can be dynamically removed/added by the user.
  const fieldsConfig = [
    { key: "vehicleModel", label: "Vehicle Model", type: "text", section: "Vehicle Information" },
    { key: "vehicleType", label: "Vehicle Type", type: "text", section: "Vehicle Information" },
    { key: "buyDate", label: "Purchase Date", type: "date", section: "Vehicle Information" },
    { key: "description", label: "Vehicle Description", type: "textarea", section: "Vehicle Information" },
    { key: "rcNumber", label: "RC Number", type: "text", section: "Documents & Details" },
    { key: "driverName", label: "Driver Name", type: "text", section: "Driver & Owner Info" },
    { key: "ownerName", label: "Owner Name", type: "text", section: "Driver & Owner Info" },
    { key: "contact", label: "Contact Number", type: "tel", section: "Contact & Location" },
    // altContact is an array, handled separately for dynamic adding/removing elements.
    { key: "address", label: "Address", type: "textarea", section: "Contact & Location" },
    { key: "mapLink", label: "Map Link", type: "url", section: "Contact & Location", optional: true },
    { key: "password", label: "Password", type: "password", section: "Security" },
    // selectedTemplate is handled via image selection logic, not a direct input field.
  ];

  // Define image fields
  const imageFieldsConfig = [
    { key: "vehicleFrontImage", label: "Vehicle Front View" },
    { key: "vehicleSideImage", label: "Vehicle Side View" },
    { key: "rcImage", label: "RC Document Image" },
    { key: "licenseImage", label: "Driving License Image" },
    { key: "ownerImage", label: "Owner Photo" },
  ];

  // Group fields by their conceptual section for rendering
  const groupedFields = fieldsConfig.reduce((acc, field) => {
    (acc[field.section] = acc[field.section] || []).push(field);
    return acc;
  }, {});

  // State to track fields that have been "removed" or are not currently displayed (optional fields)
  const [removedOptionalFields, setRemovedOptionalFields] = useState(() => {
    const initialRemoved = {};
    fieldsConfig.forEach(field => {
      if (field.optional && (vehicle[field.key] === undefined || vehicle[field.key] === null || vehicle[field.key] === '')) {
        const sectionName = field.section;
        if (!initialRemoved[sectionName]) {
          initialRemoved[sectionName] = [];
        }
        initialRemoved[sectionName].push(field.key);
      }
    });
    return initialRemoved;
  });

  // Helper to format field keys into readable labels
  const formatLabel = (key) => {
    return key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
  };

  // Generic handler for input changes (for all fields directly under vehicle)
  const handleInputChange = (fieldKey, value) => {
    // For direct properties of 'vehicle', sectionKey is null
    updateDynamicForm('vehicle', null, fieldKey, value);
  };

  // Handler for image file selection: stores the File object
  const handleImageUpload = (fieldKey, file) => {
    if (file) {
      updateDynamicForm('vehicle', null, fieldKey, file); // Store the File object
    } else {
      updateDynamicForm('vehicle', null, fieldKey, null); // Clear the image if no file
    }
  };

  // Handle adding an alternate contact input field (altContact is an array)
  const addAltContact = () => {
    const currentAltContacts = vehicle.altContact || [];
    updateDynamicForm('vehicle', null, 'altContact', [...currentAltContacts, ""]);
  };

  // Handle changes to an individual alternate contact value
  const handleAltContactChange = (index, value) => {
    const currentAltContacts = [...(vehicle.altContact || [])];
    currentAltContacts[index] = value;
    updateDynamicForm('vehicle', null, 'altContact', currentAltContacts);
  };

  // Handle removing an alternate contact input field
  const removeAltContact = (index) => {
    const currentAltContacts = [...(vehicle.altContact || [])];
    currentAltContacts.splice(index, 1);
    updateDynamicForm('vehicle', null, 'altContact', currentAltContacts);
  };

  // Add an optional field back to the form
  const handleAddField = (sectionName, fieldKey) => {
    handleInputChange(fieldKey, ''); // Initialize the field in state with empty string
    setRemovedOptionalFields(prev => ({
      ...prev,
      [sectionName]: prev[sectionName].filter(item => item !== fieldKey),
    }));
  };

  // Remove an optional field from the form
  const handleRemoveField = (sectionName, fieldKey) => {
    handleInputChange(fieldKey, undefined); // Set to undefined to effectively remove from state
    setRemovedOptionalFields(prev => ({
      ...prev,
      [sectionName]: [...prev[sectionName], fieldKey],
    }));
  };

  // Fetch current GPS location and populate the address and mapLink fields
  const handleGetCurrentLocation = async () => {
    setIsLoadingLocation(true);
    if (navigator.geolocation) {
      try {
        const pos = await new Promise((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject);
        });
        const { latitude, longitude } = pos.coords;

        // Use OpenStreetMap's Nominatim for reverse geocoding
        const response = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=18&addressdetails=1`
        );
        const data = await response.json();
        const fullAddress = data.display_name || "Address not found";
        const googleMapsLink = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;

        handleInputChange('address', fullAddress);
        handleInputChange('mapLink', googleMapsLink);
        console.log("Fetched Address:", fullAddress);
        console.log("Generated Map Link:", googleMapsLink);
      } catch (err) {
        console.error("Error getting location:", err);
        // Use a custom modal/toast for error feedback instead of alert()
        alert("Failed to fetch current location. Please enter it manually."); // Temporary: replace with custom UI
      } finally {
        setIsLoadingLocation(false);
      }
    } else {
      console.warn("Geolocation is not supported by this browser.");
      alert("Geolocation is not supported by your browser. Please enter location manually."); // Temporary: replace with custom UI
      setIsLoadingLocation(false);
    }
  };

  // NFC Toggle logic
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
    <div className="space-y-8 p-4 md:p-8 lg:p-12 bg-gray-50 rounded-xl shadow-lg h-[750px] overflow-auto hide-scrollbar">
      <h1 className="text-4xl font-extrabold text-teal-800 text-center pb-4 border-b-2 border-teal-200">
        Vehicle QR Code Generator
      </h1>

      {/* Primary Input Sections */}
      {Object.entries(groupedFields).map(([sectionName, fields]) => (
        <div key={sectionName} className="p-6 bg-white rounded-xl shadow-md border border-gray-100 transition-all duration-300 hover:shadow-lg">
          <h3 className="text-2xl font-semibold text-gray-800 mb-6 border-b pb-3 border-gray-200 capitalize">
            {sectionName}
          </h3>
          <div className="space-y-5">
            {fields
              .filter(field => !removedOptionalFields[sectionName]?.includes(field.key))
              .map(field => (
                <div key={field.key} className="relative flex items-center space-x-3">
                  {field.type === "textarea" ? (
                    <textarea
                      id={field.key}
                      placeholder={field.placeholder}
                      value={vehicle[field.key] || ""}
                      onChange={(e) => handleInputChange(field.key, e.target.value)}
                      rows={3}
                      className="w-full px-5 py-3 border border-gray-300 rounded-lg text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-teal-200 focus:border-teal-500 transition-all duration-200 resize-y"
                    />
                  ) : field.type === "date" ? (
                    <div className="flex-1">
                      <label htmlFor={field.key} className="block text-sm font-medium text-gray-700 mb-1">{formatLabel(field.key)}</label>
                      <input
                        id={field.key}
                        type="date"
                        value={vehicle[field.key] || ""}
                        onChange={(e) => handleInputChange(field.key, e.target.value)}
                        className="w-full px-5 py-3 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-4 focus:ring-teal-200 focus:border-teal-500 transition-all duration-200"
                      />
                    </div>
                  ) : field.type === "password" ? (
                    <div className="relative flex-1">
                      <input
                        id={field.key}
                        type={showPassword ? "text" : "password"}
                        placeholder={field.placeholder}
                        value={vehicle[field.key] || ""}
                        onChange={(e) => handleInputChange(field.key, e.target.value)}
                        className="w-full px-5 py-3 border border-gray-300 rounded-lg text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-teal-200 focus:border-teal-500 pr-12 transition-all duration-200"
                      />
                      <span
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-600 hover:text-teal-600"
                      >
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </span>
                    </div>
                  ) : (
                    <input
                      id={field.key}
                      type={field.type}
                      placeholder={field.placeholder}
                      value={vehicle[field.key] || ""}
                      onChange={(e) => handleInputChange(field.key, e.target.value)}
                      className="w-full px-5 py-3 border border-gray-300 rounded-lg text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-teal-200 focus:border-teal-500 transition-all duration-200"
                    />
                  )}
                  {field.optional && (
                    <button
                      type="button"
                      onClick={() => handleRemoveField(sectionName, field.key)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-full transition-colors duration-200"
                      title={`Remove ${formatLabel(field.key)}`}
                    >
                      <MinusCircle size={20} />
                    </button>
                  )}
                </div>
              ))}

            {/* Alternate Contact Section (Special Handling for dynamic array) */}
            {sectionName === 'Contact & Location' && (
              <>
                <label className="block text-base font-medium text-gray-700 mt-4">Alternate Contacts</label>
                {(vehicle.altContact || []).map((contactNum, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <input
                      type="tel"
                      placeholder={`Alternate Contact ${index + 1}`}
                      value={contactNum || ''}
                      onChange={(e) => handleAltContactChange(index, e.target.value)}
                      className="w-full px-5 py-3 border border-gray-300 rounded-lg text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-teal-200 focus:border-teal-500 transition-all duration-200"
                    />
                    <button
                      type="button"
                      onClick={() => removeAltContact(index)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-full transition-colors duration-200"
                      title="Remove alternate contact"
                    >
                      <MinusCircle size={20} />
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addAltContact}
                  className="flex items-center justify-center px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors duration-200 text-sm font-semibold shadow-md"
                >
                  <PlusCircle size={18} className="mr-2" /> Add Alternate Contact
                </button>
              </>
            )}

            {/* "Add Field" Dropdown for optional fields within this section */}
            {removedOptionalFields[sectionName]?.length > 0 && (
              <div className="mt-4">
                <label htmlFor={`add-field-${sectionName}`} className="block text-sm font-medium text-gray-700 mb-1">Add missing fields:</label>
                <select
                  id={`add-field-${sectionName}`}
                  onChange={(e) => {
                    const fieldToAdd = fieldsConfig.find(f => f.key === e.target.value && f.section === sectionName);
                    if (fieldToAdd) {
                      handleAddField(sectionName, fieldToAdd.key);
                      e.target.value = ''; // Reset select
                    }
                  }}
                  className="w-full px-5 py-3 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-4 focus:ring-teal-200 focus:border-teal-500 transition-all duration-200"
                >
                  <option value="">Select a field to add</option>
                  {removedOptionalFields[sectionName].map(fieldKey => {
                    const field = fieldsConfig.find(f => f.key === fieldKey && f.section === sectionName);
                    return field ? (
                        <option key={field.key} value={field.key}>
                            {formatLabel(field.key)}
                        </option>
                    ) : null;
                  })}
                </select>
              </div>
            )}
          </div>
        </div>
      ))}

      {/* Image Uploads Section */}
      <div className="p-6 bg-white rounded-xl shadow-md border border-gray-100 transition-all duration-300 hover:shadow-lg">
        <h3 className="text-2xl font-semibold text-gray-800 mb-6 border-b pb-3 border-gray-200">Vehicle Documents & Images</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {imageFieldsConfig.map(field => (
            <div key={field.key} className="relative group">
              <label className="block text-base font-medium text-gray-700 mb-2">
                {field.label}
              </label>
              {vehicle[field.key] ? ( // Check if a File object exists
                <div className="relative w-full h-40 bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center overflow-hidden">
                  {/* Display image preview using URL.createObjectURL */}
                  <img
                    src={URL.createObjectURL(vehicle[field.key])}
                    alt={field.label}
                    className="object-cover w-full h-full"
                  />
                  <button
                    type="button"
                    onClick={() => handleImageUpload(field.key, null)} // Pass null to clear image
                    className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors duration-200"
                    title={`Remove ${field.label}`}
                  >
                    <FiTrash2 size={16} />
                  </button>
                </div>
              ) : (
                <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors duration-200">
                  <FiUpload className="w-10 h-10 mb-3 text-gray-400" />
                  <p className="text-sm text-gray-500">Click to upload {field.label.toLowerCase()}</p>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageUpload(field.key, e.target.files[0])} // Store File object
                    className="hidden"
                  />
                </label>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Location Actions (Use Current Location Button) */}
      <div className="p-6 bg-white rounded-xl shadow-md border border-gray-100 transition-all duration-300 hover:shadow-lg">
        <h3 className="text-2xl font-semibold text-gray-800 mb-6 border-b pb-3 border-gray-200">Location Actions</h3>
        <button
          type="button"
          onClick={handleGetCurrentLocation}
          disabled={isLoadingLocation}
          className="flex items-center justify-center w-full px-6 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors duration-200 text-base font-semibold shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoadingLocation ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Detecting Location...
            </>
          ) : (
            <>
              <FiMapPin size={20} className="mr-2" /> Use My Current Location
            </>
          )}
        </button>
      </div>

      {/* NFC Toggle Section */}
      <div className="p-6 bg-white rounded-xl shadow-md border border-gray-100 transition-all duration-300 hover:shadow-lg">
        <h3 className="text-2xl font-semibold text-gray-800 mb-6 border-b pb-3 border-gray-200">NFC Functionality</h3>
        <div className="flex items-center justify-between">
          <label htmlFor="nfcToggle" className="text-base font-medium text-gray-700 cursor-pointer">
            Enable NFC Tag for Vehicle Device
          </label>
          <button
            type="button"
            id="nfcToggle"
            onClick={handleNfcToggle}
            className={`relative inline-flex h-7 w-14 items-center rounded-full transition-colors duration-300
                      focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500
                      ${nfcEnabled ? "bg-teal-600" : "bg-gray-300"}`}
          >
            <span
              className={`absolute left-1 top-1 inline-flex h-5 w-5 items-center justify-center rounded-full bg-white shadow-md transition-transform duration-300
                        ${nfcEnabled ? "translate-x-7" : "translate-x-0"}`}
            >
              {nfcEnabled ? (
                <svg className="h-4 w-4 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              ) : (
                <svg className="h-4 w-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </span>
          </button>
        </div>
      </div>

      {/* Submit Button */}
      <div className="p-6 pt-0 bg-gray-50 flex justify-center">
        <button
          type="submit" // Consider changing to "button" if not part of a formal <form> submission
          className="w-full max-w-sm bg-teal-600 text-white font-semibold py-3 rounded-lg hover:bg-teal-700 transition-colors duration-200 shadow-lg text-lg"
        >
          Save Vehicle Profile
        </button>
      </div>

      {/* NFC Modal */}
      {showNfcModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/40 p-4">
          <div className="bg-white rounded-xl shadow-2xl p-6 max-w-sm w-full border-2 border-teal-400 relative transform transition-all scale-100 ease-out duration-300">
            {/* Close Button */}
            <button
              onClick={cancelNfc}
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 text-2xl"
              aria-label="Close NFC modal"
            >
              &times;
            </button>

            <div className="text-center">
                <PlusCircle className="text-teal-500 mx-auto mb-4" size={48} />
                <h2 className="text-2xl font-bold text-teal-700 mb-3">NFC Activation</h2>
                <p className="text-base text-gray-700 leading-relaxed">
                    You're enabling **NFC** features. This is a **premium service**.
                    <br />
                    <span className="text-teal-600 font-extrabold text-lg mt-2 inline-block">
                        Cost: ₹499/year
                    </span>
                </p>
            </div>

            <div className="flex justify-center mt-6 space-x-4">
              <button
                onClick={cancelNfc}
                className="px-6 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 transition-colors duration-200 font-medium shadow-sm"
              >
                Cancel
              </button>
              <button
                onClick={confirmNfc}
                className="px-6 py-2 rounded-lg bg-teal-600 text-white hover:bg-teal-700 transition-colors duration-200 font-medium shadow-md"
              >
                Accept & Enable
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VehicleContent;
