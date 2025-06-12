"use client";
import React, { useState } from "react";
import Image from "next/image";
import BusinessPreview from "./businessPreview";
import useServicesContext from "@/components/hooks/useServiceContext";

const BusinessContent = () => {
    const {
        businessForm,
        setBusinessForm,
        profileImage,
        setProfileImage,
    } = useServicesContext();

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

    return (
        <>
            <div>

                <div className="grid grid-cols-1 gap-10">
                    {/* Form Section */}
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
                                        className={`border-2 rounded-md p-2 cursor-pointer transition hover:shadow-lg ${
                                            businessForm.selectedTemplate === filename
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
                            {/* <div>
                                <label className="block mb-1 font-medium">Brand Logo</label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => handleImageUpload(e, setBrandLogo)}
                                    className="w-full text-sm"
                                />
                            </div> */}
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
        </>
    );
};

export default BusinessContent;
