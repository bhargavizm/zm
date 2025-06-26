"use client";
import Image from "next/image";
import useServicesContext from "@/components/hooks/useServiceContext";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import NFCModal from "@/components/modalPopUps/nfcModal";
import React, { useState, useRef } from "react";
import { MapPin } from "lucide-react";

const BusinessContent = () => {
  const { businessForm, setBusinessForm, profileImage, setProfileImage } =
    useServicesContext();

  const [showPassword, setShowPassword] = useState(false);

  const fileInputRef = useRef(null); // Add this line

  const templateImages = ["bc.webp", "bc2.webp", "bc3.webp", "bc4.webp"];

  // const handleInputChange = (e) => {
  //   setBusinessForm({ ...businessForm, [e.target.id]: e.target.value });
  // };

  const handleInputChange = (idOrEvent, value = null) => {
    if (typeof idOrEvent === "string") {
      setBusinessForm({ ...businessForm, [idOrEvent]: value });
    } else {
      const e = idOrEvent;
      setBusinessForm({ ...businessForm, [e.target.id]: e.target.value });
    }
  };
const fetchCurrentLocation = async () => {
  if (navigator.geolocation) {
    try {
      const pos = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(
          resolve,
          reject,
          {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 0,
          }
        );
      });

      const { latitude, longitude } = pos.coords;

      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=18&addressdetails=1`
      );
      const data = await response.json();
      const fullAddress = data.display_name || "Address not found";

      handleInputChange("address", fullAddress);
    } catch (err) {
      console.error("Error fetching current location:", err.message);
      alert("Failed to fetch location. Please check permissions.");
    }
  } else {
    alert("Geolocation not supported in your browser.");
  }
};

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfileImage(imageUrl);
    }
  };

  const handleImageRemove = () => {
    setProfileImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = ""; // <-- reset input value
    }
  };

  return (
    <>
      <div>
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
                    className={`rounded-md p-2 cursor-pointer transition hover:shadow-lg ${
                      businessForm.selectedTemplate === filename
                        ? "border-2 border-[#008080]"
                        : "border border-gray-300"
                    }`}
                    onClick={() =>
                      setBusinessForm({
                        ...businessForm,
                        selectedTemplate: filename,
                      })
                    }
                  >
                    <Image
                      src={`/business-card-templates/${filename}`}
                      alt={`Template ${idx + 1}`}
                      width={100}
                      height={120}
                      className="object-cover rounded"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Image Uploads */}
            <div className="grid grid-cols-2 gap-4 items-start">
              <div className="mb-4">
                <label className="block mb-1 font-medium text-sm">
                  Brand Logo
                </label>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="block w-full text-sm text-gray-700
      file:mr-4 file:py-2 file:px-2
      file:rounded-full file:border-0
      file:text-sm file:font-semibold
      file:bg-[#008080] file:text-white
      hover:file:bg-[#006666]
      transition duration-200 cursor-pointer"
                />

                {profileImage && (
                  <div className="mt-4 relative w-[90px] sm:w-[100px]">
                    <Image
                      src={profileImage}
                      alt="Uploaded Logo"
                      width={100}
                      height={100}
                      className="w-full h-auto rounded border object-contain"
                    />
                    <button
                      onClick={handleImageRemove}
                      className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center hover:bg-red-700"
                      title="Remove image"
                    >
                      ❌
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Form Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { id: "name", placeholder: "Name" },
                { id: "subheading", placeholder: "Company" },
                { id: "mobile", placeholder: "Mobile Number", type: "tel" },
                { id: "designation", placeholder: "Designation" },

                { id: "mapLink", placeholder: "Map Link", type: "url" },
                { id: "email", placeholder: "Email", type: "email" },
                { id: "socialLink", placeholder: "Social Media Link" },
                { id: "socialLink2", placeholder: "Social Media Link2" },
                { id: "address", placeholder: "Address" },
                {
                  id: "password",
                  placeholder: "QR Password",
                  type: "password",
                },
              ].map(({ id, placeholder, type = "text" }) => {
                if (id === "password") {
                  return (
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
                          <AiOutlineEye size={20} />
                        ) : (
                          <AiOutlineEyeInvisible size={20} />
                        )}
                      </button>
                    </div>
                  );
                }

                if (id === "address") {
                  return (
                    <div
                      key="address"
                      className="space-y-2 col-span-1 md:col-span-2"
                    >
                      <textarea
                        id="address"
                        value={businessForm.address || ""}
                        onChange={handleInputChange}
                        placeholder="Address"
                        rows={3}
                        className="border p-2 rounded w-full shadow-sm focus:outline-none focus:ring-2 focus:ring-[#008080] resize-none"
                      />
                      <button
                        type="button"
                        onClick={fetchCurrentLocation}
                        className="flex items-center justify-center w-full py-2 px-3 bg-gray-100 hover:bg-gray-300 text-gray-700 text-sm rounded-lg transition-colors duration-200 cursor-pointer"
                      >
                        <MapPin size={16} className="mr-2" />
                        Use Current Location
                      </button>
                    </div>
                  );
                }

                return (
                  <input
                    key={id}
                    id={id}
                    type={type}
                    value={businessForm[id] || ""}
                    onChange={handleInputChange}
                    placeholder={placeholder}
                    className="border p-2 rounded w-full shadow-sm focus:outline-none focus:ring-2 focus:ring-[#008080]"
                  />
                );
              })}
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
      </div>
    </>
  );
};

export default BusinessContent;
