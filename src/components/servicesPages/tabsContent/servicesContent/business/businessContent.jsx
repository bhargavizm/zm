"use client";
import React, { useState } from "react";
import Image from "next/image";
import useServicesContext from "@/components/hooks/useServiceContext";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import NFCModal from "@/components/modalPopUps/nfcModal";
import useDesignContext from "@/components/hooks/useDesignContext";

const BusinessContent = () => {
  const { businessForm, setBusinessForm, setProfileImage } =
    useServicesContext();
  const { setIsLoading, setBgDesign } = useDesignContext();
  const [showPassword, setShowPassword] = useState(false);

  const templateImages = ["bc.webp", "bc2.webp", "bc3.webp", "bc4.webp"];

  const handleInputChange = (e) => {
    setBusinessForm({ ...businessForm, [e.target.id]: e.target.value });
  };

  const handleImageUpload = (e, setter) => {
    const file = e.target.files[0];
    if (file) {
      setter(URL.createObjectURL(file));
    }
  };

  const handleTemplateSelect = (selectedTemplate) => {
    if (businessForm.selectedTemplate !== selectedTemplate) {
      setIsLoading(true);
      setBusinessForm((prev) => ({
        ...prev,
        selectedTemplate,
      }));
      setBgDesign(null); // Reset background
      setTimeout(() => setIsLoading(false), 300); // Optional simulated delay
    }
  };

  return (
    <div className="grid grid-cols-1 gap-10">
      <div className="bg-white shadow-xl rounded-xl p-6 space-y-6">
        {/* Templates */}
        <div>
          <h2 className="text-xl font-semibold mb-4">
            Page Templates (click to select)
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {templateImages.map((filename, idx) => (
              <div
                key={idx}
                onClick={() => handleTemplateSelect(filename)}
                className={`relative rounded-md border-2 cursor-pointer transition-all p-1 ${
                  businessForm.selectedTemplate === filename
                    ? "border-[#008080] ring-2 ring-[#008080]"
                    : "border-gray-300"
                }`}
              >
                <Image
                  src={`/business-card-templates/${filename}`}
                  alt={`Template ${idx + 1}`}
                  width={300}
                  height={180}
                  className="object-cover rounded w-full h-auto"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Brand Logo Upload */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 font-medium">Brand Logo</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleImageUpload(e, setProfileImage)}
              className="w-full text-sm text-gray-700
                  file:mr-4 file:py-2 file:px-4
                  file:rounded-full file:border-0
                  file:text-sm file:font-semibold
                  file:bg-[#008080] file:text-white
                  hover:file:bg-[#006666] transition duration-200 cursor-pointer"
            />
          </div>
        </div>

        {/* Form Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { id: "name", placeholder: "Name" },
            { id: "subheading", placeholder: "Company" },
            { id: "mobile", placeholder: "Mobile Number", type: "tel" },
            { id: "designation", placeholder: "Designation" },
            { id: "address", placeholder: "Address" },
            { id: "mapLink", placeholder: "Map Link", type: "url" },
            { id: "email", placeholder: "Email", type: "email" },
            { id: "socialLink", placeholder: "Social Media Link" },
            { id: "socialLink2", placeholder: "Social Media Link2" },
            {
              id: "password",
              placeholder: "QR Password",
              type: "password",
            },
          ].map(({ id, placeholder, type = "text" }) =>
            id === "password" ? (
              <div key={id} className="relative w-full">
                <input
                  id={id}
                  type={showPassword ? "text" : "password"}
                  value={businessForm[id] || ""}
                  onChange={handleInputChange}
                  placeholder={placeholder}
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
            ) : (
              <input
                key={id}
                id={id}
                type={type}
                value={businessForm[id] || ""}
                onChange={handleInputChange}
                placeholder={placeholder}
                className="border p-2 rounded w-full shadow-sm focus:outline-none focus:ring-2 focus:ring-[#008080]"
              />
            )
          )}
          <NFCModal />
        </div>

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

export default BusinessContent;
