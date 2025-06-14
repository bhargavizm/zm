"use client";
import React, { useState } from "react";
import useServicesContext from "@/components/hooks/useServiceContext";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";

const KidsSafetyContent = () => {
  const { kidsSafetyFormData, setKidsSafetyFormData, kidsImage, setKidsImage } =
    useServicesContext();

  const [nfcEnabled, setNfcEnabled] = useState(false);
  const [showNfcModal, setShowNfcModal] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setKidsSafetyFormData({
      ...kidsSafetyFormData,
      [e.target.id]: e.target.value,
    });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setKidsImage(URL.createObjectURL(file));
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
      <div>
        <h1 className="text-3xl font-bold pb-6 text-[#008080]">
          QR Code Generator for Kids Safety
        </h1>

        <div className="bg-white shadow-xl rounded-xl p-6 space-y-6">
          {/* Image Upload */}
          <div>
            <label className="block mb-1 font-medium">
              Child Image For Profile
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="w-full text-sm"
            />
          </div>

          {/* Input Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { id: "childName", placeholder: "Enter the child's name" },
              { id: "dob", placeholder: "dd-mm-yyyy" },
              {
                id: "grade",
                placeholder: "Enter the class or grade of the child",
              },
              { id: "schoolName", placeholder: "Enter the School Name" },
              {
                id: "schoolAddress",
                placeholder: "Enter the full address of the school",
              },
              { id: "parentName", placeholder: "Enter the parent's name" },
              {
                id: "contact",
                placeholder: "Enter the parent's contact number",
              },
              {
                id: "altContact",
                placeholder: "Enter the Alternate Contact Number",
              },
              { id: "homeAddress", placeholder: "Enter the address" },
              {
                id: "mapLink",
                placeholder: "Enter a Google Maps link (optional)",
              },
              { id: "password", placeholder: "Enter the Password" },
            ].map(({ id, placeholder }) =>
              id === "password" ? (
                <div key={id} className="relative">
                  <input
                    id={id}
                    type={showPassword ? "text" : "password"}
                    value={kidsSafetyFormData[id] || ""}
                    onChange={handleChange}
                    placeholder={placeholder}
                    className="border p-2 pr-10 rounded w-full shadow-sm focus:outline-none focus:ring-2 focus:ring-[#008080]"
                  />
                  <span
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-600 hover:text-[#008080]"
                  >
                    {showPassword ? (
                      <IoEyeOffOutline size={18} />
                    ) : (
                      <IoEyeOutline size={18} />
                    )}
                  </span>
                </div>
              ) : (
                <input
                  key={id}
                  id={id}
                  type="text"
                  value={kidsSafetyFormData[id] || ""}
                  onChange={handleChange}
                  placeholder={placeholder}
                  className="border p-2 rounded w-full shadow-sm focus:outline-none focus:ring-2 focus:ring-[#008080]"
                />
              )
            )}
          </div>

          {/* nfc */}
          <div className="flex items-center gap-4 px-4 mt-2">
            <span className="text-sm font-medium text-gray-700">NFC</span>
            <button
              type="button"
              onClick={handleNfcToggle}
              className={`relative inline-flex h-8 w-16 items-center rounded-full transition-colors duration-500 cursor-pointer
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

          {/* Submit */}
          <button
            type="submit"
            className="mt-4 w-full bg-[#008080] text-white font-semibold py-2 rounded hover:bg-[#006666] transition"
          >
            Submit
          </button>
        </div>
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

export default KidsSafetyContent;
