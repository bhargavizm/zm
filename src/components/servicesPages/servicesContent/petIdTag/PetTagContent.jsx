"use client";
import React, { useState } from "react";
import Image from "next/image";
import useServicesContext from "@/components/hooks/useServiceContext";

const PetTagContent = () => {
  const servicesContext = useServicesContext();

  if (!servicesContext) {
    return <div className="text-center p-6">Loading form...</div>;
  }

  const { petIDFormData, setPetIDFormData } = servicesContext;

  const [showNfcModal, setShowNfcModal] = useState(false);
  const [nfcEnabled, setNfcEnabled] = useState(false);
  const templateImages = ["pet1.webp", "pet2.webp", "pet3.webp", "pet4.webp"];

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setPetIDFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleOwnerChange = (e) => {
    const { id, value } = e.target;
    setPetIDFormData((prev) => ({
      ...prev,
      ownerInfo: {
        ...prev.ownerInfo,
        [id]: value,
      },
    }));
  };

  const handlePetChange = (e) => {
    const { id, value } = e.target;
    setPetIDFormData((prev) => ({
      ...prev,
      pet: {
        ...prev.pet,
        [id]: value,
      },
    }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPetIDFormData((prev) => ({
        ...prev,
        mainImage: URL.createObjectURL(file),
      }));
    }
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
      <div className="bg-white shadow-md rounded-lg p-6 space-y-6">
        {/* Template Selector */}
        <div>
          <h2 className="text-xl font-semibold mb-2">
            Select a Pet Tag Template
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {templateImages.map((img, idx) => (
              <div
                key={idx}
                onClick={() =>
                  setPetIDFormData((prev) => ({
                    ...prev,
                    selectedTemplate: img,
                  }))
                }
                className={`cursor-pointer p-1 border rounded-lg ${
                  petIDFormData.selectedTemplate === img
                    ? "border-[#008080]"
                    : "border-gray-300"
                }`}
              >
                <Image
                  src={`/pet-id/${img}`}
                  alt={`Template ${idx + 1}`}
                  width={120}
                  height={120}
                  className="rounded object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Pet Image Upload */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Upload Pet Image
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="block w-full text-sm"
          />
          {petIDFormData.mainImage && (
            <Image
              src={petIDFormData.mainImage}
              alt="Pet Preview"
              width={100}
              height={100}
              className="mt-2 rounded"
            />
          )}
        </div>

        {/* Tag Title */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Tag Title
          </label>
          <input
            type="text"
            id="tagTitle"
            value={petIDFormData.tagTitle}
            onChange={handleInputChange}
            placeholder="Enter tag title"
            className="w-full border p-2 rounded"
          />
        </div>

        {/* Owner Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            id="name"
            value={petIDFormData.ownerInfo.name}
            onChange={handleOwnerChange}
            placeholder="Owner Name"
            className="border p-2 rounded w-full"
          />
          <input
            type="tel"
            id="phone"
            value={petIDFormData.ownerInfo.phone}
            onChange={handleOwnerChange}
            placeholder="Phone Number"
            className="border p-2 rounded w-full"
          />
          <input
            type="email"
            id="email"
            value={petIDFormData.ownerInfo.email}
            onChange={handleOwnerChange}
            placeholder="Email Address"
            className="border p-2 rounded w-full"
          />
          <input
            type="password"
            id="password"
            value={petIDFormData.ownerInfo.password}
            onChange={handleOwnerChange}
            placeholder="Password"
            className="border p-2 rounded w-full"
          />
          <input
            type="text"
            id="address"
            value={petIDFormData.ownerInfo.address}
            onChange={handleOwnerChange}
            placeholder="Home Address"
            className="border p-2 rounded w-full"
          />
        </div>

        {/* Pet Info */}
        <div>
          <h3 className="text-lg font-medium text-gray-800 mt-4 mb-2">
            Pet Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              "name",
              "breed",
              "species",
              "gender",
              "birthDate",
              "color",
              "microchip",
              "specialNeeds",
              "vetInfo",
              "diet",
            ].map((field) => (
              <input
                key={field}
                type="text"
                id={field}
                value={petIDFormData.pet[field]}
                onChange={handlePetChange}
                placeholder={`Pet ${
                  field.charAt(0).toUpperCase() + field.slice(1)
                }`}
                className="border p-2 rounded w-full"
              />
            ))}
          </div>
        </div>

        {/* ✅ NFC Toggle with Icon */}
        <div className="flex items-center gap-4 mt-2">
          <span className="text-sm font-medium text-gray-700">NFC</span>
          <button
            type="button"
            onClick={handleNfcToggle}
            className={`relative cursor-pointer inline-flex h-8 w-16 items-center rounded-full transition-colors duration-500
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

        <button className="w-full py-2 cursor-pointer bg-[#008080] text-white font-semibold rounded hover:bg-[#006666] transition">
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

export default PetTagContent;
