"use client";
import React, { useState } from "react";
import Image from "next/image";
import useServicesContext from "@/components/hooks/useServiceContext";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import NFCModal from "@/components/modalPopUps/nfcModal";

const PetTagContent = () => {
  const servicesContext = useServicesContext();

  if (!servicesContext) {
    return <div className="text-center p-6">Loading form...</div>;
  }

  const { petIDFormData, setPetIDFormData } = servicesContext;
  const [showPassword, setShowPassword] = useState(false);

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

  const clearImage = () => {
    setPetIDFormData((prev) => ({
      ...prev,
      mainImage: "",
    }));
    document.getElementById("imageInput").value = null;
  };

  return (
    <>
      <div className="bg-white shadow-md rounded-lg p-6 space-y-6">
        {/* Template Selector */}
        <div>
          <h2 className="text-xl font-semibold mb-2">Select a Pet Tag Template</h2>
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
                className={`border-2 cursor-pointer p-1  rounded-lg ${
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
        <div className="relative">
          <label className="block text-base mb-2 font-medium text-gray-700">
            Upload Pet Image
          </label>
          <input
            id="imageInput"
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="w-full text-gray-700 file:mr-4 file:py-3 file:px-6 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-teal-600 file:text-white hover:file:bg-teal-700 file:transition-colors file:duration-200 cursor-pointer border border-gray-300 rounded-lg py-2"
          />

          {petIDFormData.mainImage && (
            <div className="mt-3 relative w-max">
              <Image
                src={petIDFormData.mainImage}
                alt="Pet Preview"
                width={100}
                height={100}
                className="rounded"
              />
              <button
                onClick={clearImage}
                className="absolute top-[-8px] right-[-8px] bg-red-500 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center hover:bg-red-600"
                title="Remove Image"
              >
                ✕
              </button>
            </div>
          )}
        </div>

        {/* Tag Title */}
        

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
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              value={petIDFormData.ownerInfo.password}
              onChange={handleOwnerChange}
              placeholder="Password"
              className="border p-2 pr-10 rounded w-full"
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
            >
              {showPassword ? <AiFillEyeInvisible size={20} /> : <AiFillEye size={20} />}
            </button>
          </div>
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
              "color",
            ].map((field) => (
              <input
                key={field}
                type="text"
                id={field}
                value={petIDFormData.pet[field]}
                onChange={handlePetChange}
                placeholder={`Pet ${field.charAt(0).toUpperCase() + field.slice(1)}`}
                className="border p-2 rounded w-full"
              />
            ))}
          </div>
        </div>

        <NFCModal />

        <button className="w-full py-2 cursor-pointer bg-[#008080] text-white font-semibold rounded hover:bg-[#006666] transition">
          Submit
        </button>
      </div>
    </>
  );
};

export default PetTagContent;
