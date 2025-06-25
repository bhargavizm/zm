"use client";

import React, { useRef, useState } from "react";
import useServicesContext from "@/components/hooks/useServiceContext";
import { Eye, EyeOff, PlusCircle, MinusCircle, MapPin } from "lucide-react";
import NFCModal from "@/components/modalPopUps/nfcModal";

const KidsSafetyContent = () => {
  const { dynamicForms, updateDynamicForm } = useServicesContext();
  const kidsSafety = dynamicForms.kidsSafety || {};

  const imageInputRef = useRef(null);

  const primaryFields = [
    {
      key: "childName",
      placeholder: "Child's Full Name",
      type: "text",
      section: "Child Information",
    },
    {
      key: "dob",
      placeholder: "Date of Birth",
      type: "date",
      section: "Child Information",
    },
    {
      key: "classGrade",
      placeholder: "Class / Grade",
      type: "text",
      section: "Child Information",
      optional: true,
    },
    {
      key: "schoolName",
      placeholder: "School Name",
      type: "text",
      section: "School Information",
    },
    {
      key: "schoolAddress",
      placeholder: "School Full Address",
      type: "textarea",
      section: "School Information",
    },
    {
      key: "schoolContact",
      placeholder: "School Phone Number",
      type: "tel",
      section: "School Information",
    },
    {
      key: "parentName",
      placeholder: "Parent / Guardian Name",
      type: "text",
      section: "Parent Contacts",
    },
    {
      key: "contact",
      placeholder: "Primary Contact Number",
      type: "tel",
      section: "Parent Contacts",
    },
    {
      key: "contact2",
      placeholder: "Secondary Contact Number",
      type: "tel",
      section: "Parent Contacts",
    },
    {
      key: "homeAddress",
      placeholder: "Home Full Address",
      type: "textarea",
      section: "Home Location",
    },
    {
      key: "mapLink",
      placeholder: "Google Maps Link (Optional)",
      type: "url",
      section: "Home Location",
      optional: true,
    },
    {
      key: "password",
      placeholder: "Set Password",
      type: "password",
      section: "Security",
    },
  ];

  const [removedOptionalFields, setRemovedOptionalFields] = useState(() => {
    const initialRemoved = {};
    primaryFields.forEach((field) => {
      if (
        field.optional &&
        (kidsSafety[field.key] === undefined ||
          kidsSafety[field.key] === null ||
          kidsSafety[field.key] === "")
      ) {
        const sectionName = field.section;
        if (!initialRemoved[sectionName]) {
          initialRemoved[sectionName] = [];
        }
        initialRemoved[sectionName].push(field.key);
      }
    });
    return initialRemoved;
  });

  const [showPassword, setShowPassword] = useState(false);

  const formatLabel = (key) => {
    return key
      .replace(/([A-Z])/g, " $1")
      .replace(/^./, (str) => str.toUpperCase());
  };

  const handleInputChange = (fieldKey, value) => {
    updateDynamicForm("kidsSafety", null, fieldKey, value);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      updateDynamicForm("kidsSafety", null, "kidsImage", file);
    }
  };

  const addAltContact = () => {
    const currentAltContacts = kidsSafety.altContact || [];
    updateDynamicForm("kidsSafety", null, "altContact", [
      ...currentAltContacts,
      "",
    ]);
  };

  const handleAltContactChange = (index, value) => {
    const currentAltContacts = [...(kidsSafety.altContact || [])];
    currentAltContacts[index] = value;
    updateDynamicForm("kidsSafety", null, "altContact", currentAltContacts);
  };

  const removeAltContact = (index) => {
    const currentAltContacts = [...(kidsSafety.altContact || [])];
    currentAltContacts.splice(index, 1);
    updateDynamicForm("kidsSafety", null, "altContact", currentAltContacts);
  };

  const handleAddField = (sectionName, fieldKey) => {
    handleInputChange(fieldKey, "");
    setRemovedOptionalFields((prev) => ({
      ...prev,
      [sectionName]: prev[sectionName].filter((item) => item !== fieldKey),
    }));
  };

  const handleRemoveField = (sectionName, fieldKey) => {
    handleInputChange(fieldKey, undefined);
    setRemovedOptionalFields((prev) => ({
      ...prev,
      [sectionName]: [...prev[sectionName], fieldKey],
    }));
  };

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

        handleInputChange("homeAddress", fullAddress);
      } catch (err) {
        console.error("Error fetching current location:", err.message);
        alert(
          "Failed to fetch current location. Please enter it manually or check permissions."
        );
      }
    } else {
      console.warn("Geolocation is not supported by this browser.");
      alert(
        "Geolocation is not supported by your browser. Please enter address manually."
      );
    }
  };

  return (
    <div className="space-y-8 p-4 md:p-8 lg:p-12 bg-gray-50 rounded-xl shadow-lg overflow-auto hide-scrollbar">
      <div className="p-6 bg-white rounded-xl shadow-md border border-gray-100 transition-all duration-300 hover:shadow-lg">
        <h3 className="text-2xl font-semibold text-gray-800 mb-6 border-b pb-3 border-gray-200">
          Child's Profile Image
        </h3>
        <div className="space-y-2">
          <label className="block text-base font-medium text-gray-700">
            Upload Child's Photo
          </label>
  <input
  ref={imageInputRef}
  type="file"
  accept="image/*"
  onChange={handleImageChange}
  className="w-full text-gray-700 file:mr-4 file:py-3 file:px-6 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-teal-600 file:text-white hover:file:bg-teal-700 file:transition-colors file:duration-200 cursor-pointer border border-gray-300 rounded-lg py-2"
/>

{kidsSafety.kidsImage && (
  <div className="relative mt-4 w-fit">
    <p className="text-sm text-gray-600 mb-2">Current Image Preview:</p>
    <img
      src={
        kidsSafety.kidsImage instanceof File
          ? URL.createObjectURL(kidsSafety.kidsImage)
          : kidsSafety.kidsImage
      }
      alt="Child Profile"
      className="w-24 h-24 object-cover rounded-2xl shadow-inner border border-gray-200"
    />
    <button
      onClick={() => {
        updateDynamicForm("kidsSafety", null, "kidsImage", null);
        if (imageInputRef.current) imageInputRef.current.value = '';
      }}
      className="absolute top-5 right-10 bg-white text-red-600 rounded-full p-1 shadow cursor-pointer"
      aria-label="Remove image"
    >
      ❌
    </button>
  </div>
)}

        </div>
      </div>

      {Object.entries(primaryFields.reduce((acc, field) => {
        (acc[field.section] = acc[field.section] || []).push(field);
        return acc;
      }, {})).map(([sectionName, fields]) => (
        <div
          key={sectionName}
          className="p-6 bg-white rounded-xl shadow-md border border-gray-100 transition-all duration-300 hover:shadow-lg"
        >
          <h3 className="text-2xl font-semibold text-gray-800 mb-6 border-b pb-3 border-gray-200 capitalize">
            {sectionName}
          </h3>
          <div className="space-y-5">
            {fields
              .filter(
                (field) =>
                  !removedOptionalFields[sectionName]?.includes(field.key)
              )
              .map((field) => (
                <div key={field.key} className="flex items-center space-x-3">
                  {field.type === "textarea" ? (
                    <textarea
                      id={field.key}
                      placeholder={field.placeholder}
                      value={kidsSafety[field.key] || ""}
                      onChange={(e) =>
                        handleInputChange(field.key, e.target.value)
                      }
                      rows={3}
                      className="w-full px-5 py-3 border border-gray-300 rounded-lg text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-teal-200 focus:border-teal-500 transition-all duration-200 resize-y"
                    />
                  ) : field.type === "date" ? (
                    <div className="flex-1">
                      <label
                        htmlFor={field.key}
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        {formatLabel(field.key)}
                      </label>
                      <input
                        id={field.key}
                        type="date"
                        value={kidsSafety[field.key] || ""}
                        onChange={(e) =>
                          handleInputChange(field.key, e.target.value)
                        }
                        className="w-full px-5 py-3 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-4 focus:ring-teal-200 focus:border-teal-500 transition-all duration-200"
                      />
                    </div>
                  ) : field.type === "password" ? (
                    <div className="relative flex-1">
                      <input
                        id={field.key}
                        type={showPassword ? "text" : "password"}
                        placeholder={field.placeholder}
                        value={kidsSafety[field.key] || ""}
                        onChange={(e) =>
                          handleInputChange(field.key, e.target.value)
                        }
                        className="w-full px-5 py-3 border border-gray-300 rounded-lg text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-teal-200 focus:border-teal-500 pr-12 transition-all duration-200"
                      />
                      <span
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-600 hover:text-teal-600"
                      >
                        {showPassword ? <Eye size={18} /> :  <EyeOff size={18} />}
                      </span>
                    </div>
                  ) : (
                    <input
                      id={field.key}
                      type={field.type}
                      placeholder={field.placeholder}
                      value={kidsSafety[field.key] || ""}
                      onChange={(e) =>
                        handleInputChange(field.key, e.target.value)
                      }
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

            {sectionName === "Parent Contacts" && (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium text-gray-700">
                    School Contact Numbers
                  </h4>
                  <button
                    type="button"
                    onClick={addAltContact}
                    className="flex items-center text-teal-600 hover:text-teal-700 text-sm font-medium"
                  >
                    <PlusCircle size={16} className="mr-1" />
                    School Contact Number
                  </button>
                </div>
                {kidsSafety.altContact?.map((contact, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <input
                      type="tel"
                      placeholder={`School Contact ${index + 1}`}
                      value={contact || ""}
                      onChange={(e) =>
                        handleAltContactChange(index, e.target.value)
                      }
                      className="flex-1 px-5 py-3 border border-gray-300 rounded-lg text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-teal-200 focus:border-teal-500 transition-all duration-200"
                    />
                    <button
                      type="button"
                      onClick={() => removeAltContact(index)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-full transition-colors duration-200"
                    >
                      <MinusCircle size={20} />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {sectionName === "Home Location" && (
              <button
                type="button"
                onClick={fetchCurrentLocation}
                className="flex items-center justify-center w-full py-3 px-4 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors duration-200"
              >
                <MapPin size={16} className="mr-2" />
                Use Current Location
              </button>
            )}
          </div>
        </div>
      ))}

      <div className="p-6 bg-white rounded-xl shadow-md border border-gray-100 transition-all duration-300 hover:shadow-lg">
        <h3 className="text-2xl font-semibold text-gray-800 mb-6 border-b pb-3 border-gray-200">
          NFC Functionality
        </h3>
        <NFCModal />
      </div>

      <div className="p-6 pt-0 bg-gray-50 flex justify-center">
        <button
          type="submit"
          className="w-full bg-teal-600 hover:bg-teal-700 text-white py-2 rounded-lg font-semibold text-sm transition"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default KidsSafetyContent;