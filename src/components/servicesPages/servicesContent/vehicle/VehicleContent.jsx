"use client";
import React, { useState } from "react";
import Image from "next/image";
import { FiMapPin, FiPlus, FiTrash2, FiUpload } from "react-icons/fi";
import useServicesContext from "@/components/hooks/useServiceContext";

const VehicleContent = () => {
  const {
    vehicleForm,
    setVehicleForm,
    vehicleImage,
    setVehicleImage,
  } = useServicesContext();

  const [showLocationOptions, setShowLocationOptions] = useState(false);
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);
  const [deletedFields, setDeletedFields] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setVehicleForm({ ...vehicleForm, [name]: value });
  };

  const handleImageUpload = (e, fieldName) => {
    const file = e.target.files[0];
    if (file) {
      setVehicleForm({
        ...vehicleForm,
        [fieldName]: URL.createObjectURL(file)
      });
    }
  };

  const handleGetCurrentLocation = () => {
    setIsLoadingLocation(true);
    setShowLocationOptions(false);

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setVehicleForm(prev => ({
            ...prev,
            mapLink: `Latitude: ${latitude.toFixed(4)}, Longitude: ${longitude.toFixed(4)}`
          }));
          setIsLoadingLocation(false);
        },
        (error) => {
          console.error("Error getting location:", error);
          setIsLoadingLocation(false);
        }
      );
    } else {
      alert("Geolocation is not supported by this browser.");
      setIsLoadingLocation(false);
    }
  };

  const removeField = (fieldName) => {
    setDeletedFields([...deletedFields, fieldName]);
    setVehicleForm(prev => {
      const newForm = {...prev};
      delete newForm[fieldName];
      return newForm;
    });
  };

  const restoreField = (fieldName) => {
    setDeletedFields(deletedFields.filter(f => f !== fieldName));
    setVehicleForm(prev => ({
      ...prev,
      [fieldName]: ""
    }));
  };

  const fields = [
    { name: "vehicleModel", label: "Vehicle Model", type: "text" },
    { name: "vehicleType", label: "Vehicle Type", type: "text" },
    { name: "buyDate", label: "Purchase Date", type: "date" },
    { name: "description", label: "Description", type: "textarea" },
    { name: "rcNumber", label: "RC Number", type: "text" },
    { name: "driverName", label: "Driver Name", type: "text" },
    { name: "ownerName", label: "Owner Name", type: "text" },
    { name: "contact", label: "Contact Number", type: "tel" },
    { name: "altContact", label: "Alternate Contact", type: "tel" },
    { name: "address", label: "Address", type: "textarea" },
    { name: "mapLink", label: "Location", type: "location" },
    { name: "password", label: "Password", type: "password" },
  ];

  const imageFields = [
    { name: "rcImage", label: "RC Document" },
    { name: "licenseImage", label: "Driving License" },
    { name: "vehicleFrontImage", label: "Vehicle Front View" },
    { name: "vehicleSideImage", label: "Vehicle Side View" },
    { name: "ownerImage", label: "Owner Photo" },
  ];

  return (
    <div className="flex flex-col lg:flex-row">
      <div className="p-8 flex-1">
        <form className="space-y-8">
          {/* Basic Vehicle Info */}
          <div className="bg-white rounded-xl p-6 shadow-md">
            <h2 className="text-xl font-semibold mb-4 text-[#0a5e5e]">
              Vehicle Information
            </h2>
            <div className="space-y-4">
              {fields
                .filter(field => !deletedFields.includes(field.name))
                .map(field => (
                  <div key={field.name} className="relative group">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {field.label}
                    </label>
                    {field.type === "textarea" ? (
                      <textarea
                        name={field.name}
                        placeholder={`Enter ${field.label.toLowerCase()}`}
                        value={vehicleForm[field.name] || ""}
                        onChange={handleChange}
                        rows={3}
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#59c1c1] focus:border-[#226161]"
                      />
                    ) : field.type === "location" ? (
                      <div className="relative">
                        <div className="flex">
                          <input
                            name={field.name}
                            placeholder="Enter location"
                            value={vehicleForm[field.name] || ""}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#59c1c1] focus:border-[#226161]"
                          />
                          <button
                            type="button"
                            onClick={() => setShowLocationOptions(!showLocationOptions)}
                            className="ml-2 p-2 bg-indigo-100 text-[#0e7b7b] rounded-lg hover:bg-indigo-200 transition-colors"
                          >
                            <FiMapPin />
                          </button>
                        </div>
                        {showLocationOptions && (
                          <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 z-10 p-3">
                            <div className="flex justify-between items-center mb-2">
                              <h3 className="font-medium">Location Options</h3>
                              <button onClick={() => setShowLocationOptions(false)} className="text-gray-500 hover:text-gray-700">
                                <FiX />
                              </button>
                            </div>
                            <button
                              onClick={handleGetCurrentLocation}
                              disabled={isLoadingLocation}
                              className="w-full flex items-center justify-center px-4 py-2 bg-[#0e7b7b] text-white rounded-lg hover:bg-indigo-700 transition-colors mb-2"
                            >
                              {isLoadingLocation ? 'Detecting...' : 'Use Current Location'}
                            </button>
                            <button
                              onClick={() => {
                                setShowLocationOptions(false);
                                document.getElementsByName('mapLink')[0].focus();
                              }}
                              className="w-full flex items-center justify-center px-4 py-2 bg-gray-100 text-gray-800 rounded-lg hover:bg-gray-200 transition-colors"
                            >
                              Enter Manually
                            </button>
                          </div>
                        )}
                      </div>
                    ) : (
                      <input
                        type={field.type}
                        name={field.name}
                        placeholder={`Enter ${field.label.toLowerCase()}`}
                        value={vehicleForm[field.name] || ""}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#59c1c1] focus:border-[#226161]"
                      />
                    )}
                    <button
                      type="button"
                      onClick={() => removeField(field.name)}
                      className="absolute right-2 top-8 p-1 text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <FiTrash2 />
                    </button>
                  </div>
                ))}
            </div>
          </div>

          {/* Image Uploads */}
          <div className="bg-white rounded-xl p-6 shadow-md">
            <h2 className="text-xl font-semibold mb-4 text-[#0e7b7b]">
              Vehicle Documents & Images
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {imageFields.map(field => (
                <div key={field.name} className="relative group">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {field.label}
                  </label>
                  <div className="flex items-center space-x-4">
                    {vehicleForm[field.name] ? (
                      <>
                        <div className="relative w-20 h-20 border rounded-lg overflow-hidden">
                          <Image
                            src={vehicleForm[field.name]}
                            alt={field.label}
                            layout="fill"
                            objectFit="cover"
                          />
                        </div>
                        <button
                          type="button"
                          onClick={() => setVehicleForm({...vehicleForm, [field.name]: null})}
                          className="text-red-500 hover:text-red-700"
                        >
                          <FiTrash2 />
                        </button>
                      </>
                    ) : (
                      <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                          <FiUpload className="w-8 h-8 mb-3 text-gray-400" />
                          <p className="text-sm text-gray-500">Click to upload</p>
                        </div>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleImageUpload(e, field.name)}
                          className="hidden"
                        />
                      </label>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Deleted Fields Dropdown */}
          {deletedFields.length > 0 && (
            <div className="bg-white rounded-xl p-6 shadow-md">
              <h2 className="text-xl font-semibold mb-4 text-[#0e7b7b]">
                Restore Deleted Fields
              </h2>
              <div className="flex items-center space-x-4">
                <select
                  onChange={(e) => restoreField(e.target.value)}
                  className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#59c1c1] focus:border-[#226161]"
                >
                  <option value="">Select field to restore</option>
                  {deletedFields.map(fieldName => {
                    const field = fields.find(f => f.name === fieldName);
                    return field ? (
                      <option key={fieldName} value={fieldName}>
                        {field.label}
                      </option>
                    ) : null;
                  })}
                </select>
                <button
                  type="button"
                  onClick={() => setDeletedFields([])}
                  className="px-4 py-2 bg-gray-100 text-gray-800 rounded-lg hover:bg-gray-200"
                >
                  Clear All
                </button>
              </div>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-[#0e7b7b] text-white font-semibold py-3 rounded-lg hover:bg-[#0a5e5e] transition-colors"
          >
            Generate Vehicle QR Code
          </button>
        </form>
      </div>
    </div>
  );
};

export default VehicleContent;