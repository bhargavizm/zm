"use client";
import React, { useState } from "react";
import Image from "next/image";
import useServicesContext from "@/components/hooks/useServiceContext";

const BusinessContent = () => {
    const {
        businessForm,
        setBusinessForm,
        setProfileImage,
    } = useServicesContext();

    const [nfcEnabled, setNfcEnabled] = useState(false);
    const [showNfcModal, setShowNfcModal] = useState(false);


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

                <div className="grid grid-cols-1 gap-10">
                    <div className="bg-white shadow-xl rounded-xl p-6 space-y-6">
                        {/* Templates */}
                        <div>
                            <h2 className="text-xl font-semibold mb-4">
                                Page Templates (click to select)
                            </h2>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                {/* {templateImages.map((filename, idx) => (
                                    <div
                                        key={idx}
                                        className={`border-2 rounded-md p-2 cursor-pointer transition hover:shadow-lg ${businessForm.selectedTemplate === filename
                                                ? "border-[#008080]"
                                                : "border-gray-300"
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
                                ))} */}
                                {templateImages.map((filename, idx) => (
              <div
                key={idx}
                className={`border-2 rounded-md p-2 cursor-pointer transition hover:shadow-lg ${
                  businessForm.selectedTemplate === filename
                    ? "border-[#008080]"
                    : "border-gray-300"
                }`}
                onClick={() =>
                  setBusinessForm({ ...businessForm, selectedTemplate: filename })
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
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block mb-1 font-medium">Brand Logo</label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => handleImageUpload(e, setProfileImage)}
                                    className="w-full text-sm"
                                />
                            </div>
                        </div>

                        {/* Form Fields */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {[
                                { id: "name", placeholder: "Name" },
                                { id: "heading", placeholder: "Title" },
                                { id: "subheading", placeholder: "Company" },
                                { id: "businessName", placeholder: "Business Name" },
                                { id: "mobile", placeholder: "Mobile Number", type: "tel" },
                                { id: "designation", placeholder: "Designation" },
                                { id: "address", placeholder: "Address" },
                                { id: "mapLink", placeholder: "Map Link", type: "url" },
                                { id: "email", placeholder: "Email", type: "email" },
                                { id: "password", placeholder: "QR Password", type: "password" },
                                { id: "socialLink", placeholder: "Social Media Link" },
                            ].map(({ id, placeholder, type = "text" }) => (
                                <input
                                    key={id}
                                    id={id}
                                    type={type}
                                    value={businessForm[id]}
                                    onChange={handleInputChange}
                                    placeholder={placeholder}
                                    className="border p-2 rounded w-full shadow-sm focus:outline-none focus:ring-2 focus:ring-[#008080]"
                                />
                            ))}

                            {/* ✅ NFC Toggle with Icon */}
                            <div className="flex items-center gap-4 mt-2">
                                <span className="text-sm font-medium text-gray-700">NFC</span>
                                <button
                                    type="button"
                                    onClick={handleNfcToggle}
                                    className={`relative inline-flex h-8 w-16 items-center rounded-full transition-colors duration-500
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
                        </div>

                        <button
                            type="submit"
                            className="mt-4 w-full bg-[#008080] text-white font-semibold py-2 rounded hover:bg-[#006666] transition"
                        >
                            Submit
                        </button>
                    </div>
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
                                className="px-4 py-2 rounded border border-gray-400 text-gray-600 hover:bg-gray-100"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={confirmNfc}
                                className="px-4 py-2 bg-[#008080] text-white rounded hover:bg-[#006666] transition"
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

export default BusinessContent;
