"use client";
import React, { useState } from "react";
import Image from "next/image";
import useServicesContext from "@/components/hooks/useServiceContext";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

const VehicleContent = () => {
    const {
        vehicleForm,
        setVehicleForm,
        vehicleImage,
        setVehicleImage,
    } = useServicesContext();

    const templateImages = [
        "car.webp",
        "lorry.webp",
        "bike.webp",
        "scooty.webp",
    ];

      const [showPassword, setShowPassword] = useState(false);
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


    const handleInputChange = (e) => {
        setVehicleForm({ ...vehicleForm, [e.target.id]: e.target.value });
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            setVehicleImage(URL.createObjectURL(file));
        }
    };

    return (
        <>
    
        <div>
            <h1 className="text-3xl font-bold pb-6 text-[#008080]">
                QR Code Generator for Vehicle's
            </h1>
            <div className="bg-white shadow-xl rounded-xl p-6 space-y-6">
                {/* Template Selection */}
                <div>
                    <h2 className="text-xl font-semibold mb-4">
                        Vehicle Templates (click to select)
                    </h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {templateImages.map((filename, idx) => (
                            <div
                                key={idx}
                                className={`border-2 rounded-md p-2 cursor-pointer transition hover:shadow-lg ${vehicleForm.selectedTemplate === filename ? "border-[#008080]" : "border-gray-300"}`}
                                onClick={() =>
                                    setVehicleForm({
                                        ...vehicleForm,
                                        selectedTemplate: filename,
                                    })
                                }
                            >
                                <Image
                                    src={`/images/normal/${filename}`}
                                    alt={`Template ${idx + 1}`}
                                    width={100}
                                    height={120}
                                    className="object-cover rounded"
                                />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Image Upload */}
                <div>
                    <label className="block mb-1 font-medium">Add Maximum 1 Vehicle Image</label>
                    <input type="file" accept="image/*" onChange={handleImageUpload} className="w-full text-sm" />
                </div>

                {/* Input Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {[
        { id: "vehicleModel", placeholder: "Vehicle Model Name" },
        { id: "vehicleType", placeholder: "Type Of Vehicle" },
        { id: "buyDate", placeholder: "Date Of Buying" },
        { id: "description", placeholder: "Description of Vehicle" },
        { id: "rcNumber", placeholder: "RC Number" },
        { id: "driverName", placeholder: "Driver Name" },
        { id: "ownerName", placeholder: "Owner Name" },
        { id: "contact", placeholder: "Contact Number" },
        { id: "altContact", placeholder: "Alternate Contact Number" },
        { id: "address", placeholder: "Owner/Driver Address" },
        { id: "mapLink", placeholder: "Owner/Driver Map Link" },
        { id: "password", placeholder: "Password" },
      ].map(({ id, placeholder }) => (
        id === "password" ? (
          <div key={id} className="relative">
            <input
              id={id}
              type={showPassword ? "text" : "password"}
              value={vehicleForm[id] || ""}
              onChange={handleInputChange}
              placeholder={placeholder}
              className="border p-2 pr-10 rounded w-full shadow-sm focus:outline-none focus:ring-2 focus:ring-[#008080]"
            />
            <div
              className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500 cursor-pointer"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? <AiFillEyeInvisible size={20} /> : <AiFillEye size={20} />}
            </div>
          </div>
        ) : (
          <input
            key={id}
            id={id}
            type="text"
            value={vehicleForm[id] || ""}
            onChange={handleInputChange}
            placeholder={placeholder}
            className="border p-2 rounded w-full shadow-sm focus:outline-none focus:ring-2 focus:ring-[#008080]"
          />
        )
      ))}
    </div>

    {/* nfc */}
    
          <div className="flex items-center gap-4 px-4 mt-2">
                    <span className="text-sm font-medium text-gray-700">
                      NFC
                    </span>
                    <button
                      type="button"
                      onClick={handleNfcToggle}
                      className={`relative cursor-pointer inline-flex h-8 w-16 items-center rounded-full transition-colors duration-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#008080] ${
                        nfcEnabled ? "bg-[#008080]" : "bg-gray-300"
                      }`}
                    >
                      <span
                        className={`absolute left-1 top-1 inline-flex h-6 w-6 items-center justify-center rounded-full bg-white shadow-md transition-all duration-300 ${
                          nfcEnabled ? "translate-x-8" : "translate-x-0"
                        }`}
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

export default VehicleContent;
