"use client";
import React, { useState } from "react";
import Image from "next/image";
import useServicesContext from "@/components/hooks/useServiceContext";

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
                        <input
                            key={id}
                            id={id}
                            type="text"
                            value={vehicleForm[id] || ""}
                            onChange={handleInputChange}
                            placeholder={placeholder}
                            className="border p-2 rounded w-full shadow-sm focus:outline-none focus:ring-2 focus:ring-[#008080]"
                        />
                    ))}
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
    );
};

export default VehicleContent;
