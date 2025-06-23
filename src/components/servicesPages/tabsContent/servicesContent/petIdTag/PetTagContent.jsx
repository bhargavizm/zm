"use client";
import React, { useState } from "react";
import Image from "next/image";
import useServicesContext from "@/components/hooks/useServiceContext";
import useDesignContext from "@/components/hooks/useDesignContext";
import NFCModal from "@/components/modalPopUps/nfcModal";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const PetTagContent = () => {
  const { petIDFormData, setPetIDFormData } = useServicesContext();
  const { setIsLoading, setBgDesign } = useDesignContext();

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

  const handleTemplateSelect = (selectedTemplate) => {
    if (petIDFormData.selectedTemplate !== selectedTemplate) {
      setIsLoading(true);
      setPetIDFormData((prev) => ({
        ...prev,
        selectedTemplate,
      }));
      setBgDesign(null);
      setTimeout(() => setIsLoading(false), 300);
    }
  };

  return (
    <div className="grid grid-cols-1 gap-10">
      <div className="bg-white shadow-xl rounded-xl p-6 space-y-6">
        {/* Templates */}
        <div>
          <h2 className="text-xl font-semibold mb-4">
            Pet Tag Templates (click to select)
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {templateImages.map((filename, idx) => (
              <div
                key={idx}
                onClick={() => handleTemplateSelect(filename)}
                className={`relative rounded-md border-2 cursor-pointer transition-all p-1 ${
                  petIDFormData.selectedTemplate === filename
                    ? "border-[#008080] ring-2 ring-[#008080]"
                    : "border-gray-300"
                }`}
              >
                <Image
                  src={`/pet-id/${filename}`}
                  alt={`Template ${idx + 1}`}
                  width={300}
                  height={180}
                  className="object-cover rounded w-full h-auto"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Pet Image Upload */}
        <div>
          <label className="block mb-1 font-medium">Upload Pet Image</label>
          <input
            id="imageInput"
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="w-full text-sm text-gray-700
              file:mr-4 file:py-2 file:px-4
              file:rounded-full file:border-0
              file:text-sm file:font-semibold
              file:bg-[#008080] file:text-white
              hover:file:bg-[#006666] transition duration-200 cursor-pointer"
          />
          {petIDFormData.mainImage && (
            <div className="mt-3 relative w-max">
              <Image
                src={petIDFormData.mainImage}
                alt="Pet"
                width={100}
                height={100}
                className="rounded"
              />
              <button
                onClick={clearImage}
                className="absolute top-[-8px] right-[-8px] bg-red-500 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center hover:bg-red-600"
              >
                ✕
              </button>
            </div>
          )}
        </div>

        {/* Owner Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            id="name"
            value={petIDFormData.ownerInfo.name}
            onChange={handleOwnerChange}
            placeholder="Owner Name"
            className="border p-2 rounded w-full shadow-sm focus:outline-none focus:ring-2 focus:ring-[#008080]"
          />
          <input
            type="tel"
            id="phone"
            value={petIDFormData.ownerInfo.phone}
            onChange={handleOwnerChange}
            placeholder="Phone Number"
            className="border p-2 rounded w-full shadow-sm focus:outline-none focus:ring-2 focus:ring-[#008080]"
          />
          <input
            type="email"
            id="email"
            value={petIDFormData.ownerInfo.email}
            onChange={handleOwnerChange}
            placeholder="Email Address"
            className="border p-2 rounded w-full shadow-sm focus:outline-none focus:ring-2 focus:ring-[#008080]"
          />
          <div className="relative w-full">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              value={petIDFormData.ownerInfo.password}
              onChange={handleOwnerChange}
              placeholder="QR Password"
              className="border p-2 pr-10 rounded w-full shadow-sm focus:outline-none focus:ring-2 focus:ring-[#008080]"
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600"
            >
              {showPassword ? (
                <AiOutlineEyeInvisible size={20} />
              ) : (
                <AiOutlineEye size={20} />
              )}
            </button>
          </div>
          <input
            type="text"
            id="address"
            value={petIDFormData.ownerInfo.address}
            onChange={handleOwnerChange}
            placeholder="Address"
            className="border p-2 rounded w-full shadow-sm focus:outline-none focus:ring-2 focus:ring-[#008080]"
          />
        </div>

        {/* Pet Info */}
        <div>
          <h3 className="text-lg font-medium text-gray-800 mt-4 mb-2">
            Pet Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {["name", "breed", "color"].map((field) => (
              <input
                key={field}
                type="text"
                id={field}
                value={petIDFormData.pet[field]}
                onChange={handlePetChange}
                placeholder={`Pet ${field.charAt(0).toUpperCase() + field.slice(1)}`}
                className="border p-2 rounded w-full shadow-sm focus:outline-none focus:ring-2 focus:ring-[#008080]"
              />
            ))}
          </div>
        </div>

        <NFCModal />

        <button
          type="submit"
          className="mt-4 w-full bg-[#008080] text-white font-semibold py-2 rounded hover:bg-[#006666] transition"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default PetTagContent;
