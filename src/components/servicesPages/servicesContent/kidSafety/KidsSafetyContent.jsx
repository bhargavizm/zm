// src/components/services/KidsSafetyContent.jsx
"use client";

import React, { useState } from "react";
import useServicesContext from "@/components/hooks/useServiceContext";
import { Eye, EyeOff, PlusCircle, MinusCircle, MapPin } from 'lucide-react';

const KidsSafetyContent = () => {
  const { dynamicForms, updateDynamicForm } = useServicesContext();

  // Ensure kidsSafety is always an object, even if dynamicForms.kidsSafety is initially undefined.
  const kidsSafety = dynamicForms.kidsSafety || {};

  // Define all primary fields directly under 'kidsSafety'
  const primaryFields = [
    { key: 'childName', placeholder: "Child's Full Name", type: 'text', section: 'Child Information' },
    { key: 'dob', placeholder: "Child's Date of Birth", type: 'date', section: 'Child Information' },
    { key: 'classGrade', placeholder: "Class / Grade", type: 'text', section: 'Child Information', optional: true },
    { key: 'schoolName', placeholder: "School Name", type: 'text', section: 'School Information' },
    { key: 'schoolAddress', placeholder: "School Full Address", type: 'textarea', section: 'School Information' },
    { key: 'parentName', placeholder: "Parent / Guardian Name", type: 'text', section: 'Parent & Emergency Contact' },
    { key: 'contact', placeholder: "Primary Contact Number", type: 'tel', section: 'Parent & Emergency Contact' },
    // altContact is handled separately as it's an array
    { key: 'homeAddress', placeholder: "Home Full Address", type: 'textarea', section: 'Home Location' },
    { key: 'mapLink', placeholder: "Google Maps Link (Optional)", type: 'url', section: 'Home Location', optional: true },
    { key: 'password', placeholder: "Set Password (Optional)", type: 'password', section: 'Security' },
    // selectedTemplate is not an input field in this component, so it's not listed here.
  ];

  // Group fields by their conceptual section for rendering
  const groupedFields = primaryFields.reduce((acc, field) => {
    (acc[field.section] = acc[field.section] || []).push(field);
    return acc;
  }, {});


  // State to manage which optional fields are currently 'removed' from display
  const [removedOptionalFields, setRemovedOptionalFields] = useState(() => {
    const initialRemoved = {};
    primaryFields.forEach(field => {
      if (field.optional && (kidsSafety[field.key] === undefined || kidsSafety[field.key] === null || kidsSafety[field.key] === '')) {
        const sectionName = field.section;
        if (!initialRemoved[sectionName]) {
          initialRemoved[sectionName] = [];
        }
        initialRemoved[sectionName].push(field.key);
      }
    });
    return initialRemoved;
  });

  // Local state for password visibility (UI concern)
  const [showPassword, setShowPassword] = useState(false);

  // Helper to format field keys into readable labels
  const formatLabel = (key) => {
    return key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
  };

  // Generic handler for input changes (for all fields directly under kidsSafety)
  const handleInputChange = (fieldKey, value) => {
    // For direct properties of kidsSafety, sectionKey is null
    updateDynamicForm('kidsSafety', null, fieldKey, value);
  };

  // Handler for the child's image file selection
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      updateDynamicForm('kidsSafety', null, 'kidsImage', file);
    }
  };

  // Handle adding a new alternate contact input field
  const addAltContact = () => {
    const currentAltContacts = kidsSafety.altContact || [];
    updateDynamicForm('kidsSafety', null, 'altContact', [...currentAltContacts, ""]);
  };

  // Handle changes to an individual alternate contact field
  const handleAltContactChange = (index, value) => {
    const currentAltContacts = [...(kidsSafety.altContact || [])];
    currentAltContacts[index] = value;
    updateDynamicForm('kidsSafety', null, 'altContact', currentAltContacts);
  };

  // Handle removing an alternate contact input field
  const removeAltContact = (index) => {
    const currentAltContacts = [...(kidsSafety.altContact || [])];
    currentAltContacts.splice(index, 1);
    updateDynamicForm('kidsSafety', null, 'altContact', currentAltContacts);
  };

  // Add an optional field back to the form
  const handleAddField = (sectionName, fieldKey) => {
    handleInputChange(fieldKey, ''); // Initialize the field in state
    setRemovedOptionalFields(prev => ({
      ...prev,
      [sectionName]: prev[sectionName].filter(item => item !== fieldKey),
    }));
  };

  // Remove an optional field from the form
  const handleRemoveField = (sectionName, fieldKey) => {
    handleInputChange(fieldKey, undefined); // Set to undefined to remove from state
    setRemovedOptionalFields(prev => ({
      ...prev,
      [sectionName]: [...prev[sectionName], fieldKey],
    }));
  };

  // Fetch current GPS location and populate the home address field
  const fetchCurrentLocation = async () => {
    if (navigator.geolocation) {
      try {
        const pos = await new Promise((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject);
        });
        const { latitude, longitude } = pos.coords;

        const response = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=18&addressdetails=1`
        );
        const data = await response.json();
        const fullAddress = data.display_name || "Address not found";

        handleInputChange('homeAddress', fullAddress); // Update 'homeAddress' field
        console.log("Fetched Location:", fullAddress);
      } catch (err) {
        console.error("Error fetching current location:", err.message);
        // Using alert() as a fallback, consider custom modal for better UX
        alert("Failed to fetch current location. Please enter it manually or check permissions.");
      }
    } else {
      console.warn("Geolocation is not supported by this browser.");
      alert("Geolocation is not supported by your browser. Please enter address manually.");
    }
  };

  // NFC Toggle state and handlers
  const [nfcEnabled, setNfcEnabled] = useState(false);
  const [showNfcModal, setShowNfcModal] = useState(false);

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
        Kids Safety QR Code Generator
      </h1>

      {/* Child Image Upload Section */}
      <div className="p-6 bg-white rounded-xl shadow-md border border-gray-100 transition-all duration-300 hover:shadow-lg">
        <h3 className="text-2xl font-semibold text-gray-800 mb-6 border-b pb-3 border-gray-200">Child's Profile Image</h3>
        <div className="space-y-2">
          <label className="block text-base font-medium text-gray-700">Upload Child's Photo</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full text-gray-700 file:mr-4 file:py-3 file:px-6 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-teal-600 file:text-white hover:file:bg-teal-700 file:transition-colors file:duration-200 cursor-pointer border border-gray-300 rounded-lg py-2"
          />
          {kidsSafety.kidsImage && (
            <div className="mt-4">
              <p className="text-sm text-gray-600 mb-2">Current Image Preview:</p>
              <img
                src={URL.createObjectURL(kidsSafety.kidsImage)}
                alt="Child Profile"
                className="w-24 h-24 object-cover rounded-full shadow-inner border border-gray-200"
              />
            </div>
          )}
        </div>
      </div>

      {/* Dynamic Sections for Content */}
      {Object.entries(groupedFields).map(([sectionName, fields]) => (
        <div key={sectionName} className="p-6 bg-white rounded-xl shadow-md border border-gray-100 transition-all duration-300 hover:shadow-lg">
          <h3 className="text-2xl font-semibold text-gray-800 mb-6 border-b pb-3 border-gray-200 capitalize">
            {sectionName}
          </h3>
          <div className="space-y-5">
            {fields
              .filter(field => !removedOptionalFields[sectionName]?.includes(field.key))
              .map(field => (
                <div key={field.key} className="flex items-center space-x-3">
                  {field.type === 'textarea' ? (
                    <textarea
                      id={field.key}
                      placeholder={field.placeholder}
                      value={kidsSafety[field.key] || ''} // Direct access
                      onChange={(e) => handleInputChange(field.key, e.target.value)} // Direct update
                      rows={3}
                      className="w-full px-5 py-3 border border-gray-300 rounded-lg text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-teal-200 focus:border-teal-500 transition-all duration-200 resize-y"
                    />
                  ) : field.type === 'date' ? (
                    <div className="flex-1">
                      <label htmlFor={field.key} className="block text-sm font-medium text-gray-700 mb-1">{formatLabel(field.key)}</label>
                      <input
                        id={field.key}
                        type="date"
                        value={kidsSafety[field.key] || ''} // Direct access
                        onChange={(e) => handleInputChange(field.key, e.target.value)} // Direct update
                        className="w-full px-5 py-3 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-4 focus:ring-teal-200 focus:border-teal-500 transition-all duration-200"
                      />
                    </div>
                  ) : field.type === 'password' ? (
                    <div className="relative flex-1">
                      <input
                        id={field.key}
                        type={showPassword ? "text" : "password"}
                        placeholder={field.placeholder}
                        value={kidsSafety[field.key] || ""} // Direct access
                        onChange={(e) => handleInputChange(field.key, e.target.value)} // Direct update
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
                      value={kidsSafety[field.key] || ''} // Direct access
                      onChange={(e) => handleInputChange(field.key, e.target.value)} // Direct update
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
            {sectionName === 'Parent & Emergency Contact' && (
              <>
                <label className="block text-base font-medium text-gray-700 mt-4">Alternate Contacts</label>
                {(kidsSafety.altContact || []).map((contact, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <input
                      type="tel"
                      placeholder={`Alternate Contact ${index + 1}`}
                      value={contact || ''}
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
                {/* Home Address Location Button (Moved outside sections loop for specific placement) */}

              </>
            )}

            {/* "Add Field" Dropdown for optional fields within this section */}
            {removedOptionalFields[sectionName]?.length > 0 && (
              <div className="mt-4">
                <button
                  type="button"
                  onClick={fetchCurrentLocation}
                  className="flex items-center justify-center w-full px-6 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors duration-200 text-base font-semibold shadow-md"
                >
                  <MapPin size={20} className="mr-2" /> Use My Current Location
                </button>
                <label htmlFor={`add-field-${sectionName}`} className="block text-sm py-5 font-medium text-gray-700 mb-1">Add missing fields:</label>
                <select
                  id={`add-field-${sectionName}`}
                  onChange={(e) => {
                    const fieldToAdd = primaryFields.find(f => f.key === e.target.value && f.section === sectionName);
                    if (fieldToAdd) {
                      handleAddField(sectionName, fieldToAdd.key);
                      e.target.value = ''; // Reset select
                    }
                  }}
                  className="w-full px-5 py-3 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-4 focus:ring-teal-200 focus:border-teal-500 transition-all duration-200"
                >
                  <option value="">Select a field to add</option>
                  {removedOptionalFields[sectionName].map(fieldKey => {
                    const field = primaryFields.find(f => f.key === fieldKey && f.section === sectionName);
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






      {/* NFC Toggle Section */}
      <div className="p-6 bg-white rounded-xl shadow-md border border-gray-100 transition-all duration-300 hover:shadow-lg">
        <h3 className="text-2xl font-semibold text-gray-800 mb-6 border-b pb-3 border-gray-200">NFC Functionality</h3>
        <div className="flex items-center justify-between">
          <label htmlFor="nfcToggle" className="text-base font-medium text-gray-700 cursor-pointer">
            Enable NFC Tag for Safety Device
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

      {/* Submit Button (example - you might connect this to your actual form submission) */}
      <div className="p-6 pt-0 bg-gray-50 flex justify-center">
        <button
          type="submit"
          className="w-full max-w-sm bg-teal-600 text-white font-semibold py-3 rounded-lg hover:bg-teal-700 transition-colors duration-200 shadow-lg text-lg"
        >
          Save Kids Safety Profile
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

export default KidsSafetyContent;
