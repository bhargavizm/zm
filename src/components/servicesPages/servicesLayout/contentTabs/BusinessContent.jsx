"use client";
import React, { useState } from "react";
import Image from "next/image";

const BusinessContent = () => {
    const [form, setForm] = useState({
        name: "",
        heading: "",
        subheading: "",
        businessName: "",
        mobile: "",
        designation: "",
        address: "",
        mapLink: "",
        email: "",
        password: "",
        socialLink: "",
    });
    const [profileImage, setProfileImage] = useState(null);
    const [brandLogo, setBrandLogo] = useState(null);
    const handleInputChange = (e) => {
        setForm({ ...form, [e.target.id]: e.target.value });
    };
    const handleImageUpload = (e, setter) => {
        const file = e.target.files[0];
        if (file) {
            setter(URL.createObjectURL(file));
        }
    };
    return (
        <div className="min-h-screen bg-[#f8f9fa] p-6">
            <h1 className="text-3xl font-bold text-center text-[#008080] mb-8">
                Digital Business Cards
            </h1>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                {/* Left Side - Form */}
                <div className="bg-white shadow-xl rounded-xl p-6 space-y-6">
                    {/* Templates */}
                    <div>
                        <h2 className="text-xl font-semibold mb-4">
                            Page Templates (click to select)
                        </h2>
                        <div className="grid grid-cols-4 gap-2">
                            {[1, 2, 3, 4].map((i) => (
                                <div
                                    key={i}
                                    className="border rounded-md p-2 hover:shadow-lg transition cursor-pointer"
                                >
                                    <Image
                                        src={`/templates/template${i}.png`}
                                        alt={`Template ${i}`}
                                        width={80}
                                        height={100}
                                        className="object-cover rounded"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Image Uploads */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block mb-1 font-medium">Profile Photo</label>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => handleImageUpload(e, setProfileImage)}
                                className="w-full text-sm"
                            />
                        </div>
                        <div>
                            <label className="block mb-1 font-medium">Brand Logo</label>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => handleImageUpload(e, setBrandLogo)}
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
                                value={form[id]}
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

                {/* Right Side - Preview */}
                <div className="flex justify-center items-start">
                    <div className="w-[320px] h-[570px] border-4 border-[#001a1a] rounded-3xl p-4 shadow-2xl bg-white flex flex-col items-center space-y-3">
                        {profileImage && (
                            <Image
                                src={profileImage}
                                alt="Profile"
                                width={200}
                                height={200}
                                className="rounded-xl object-cover"
                            />
                        )}
                        {brandLogo && (
                            <Image
                                src={brandLogo}
                                alt="Logo"
                                width={120}
                                height={60}
                                className="object-contain"
                            />
                        )}
                        <h2 className="text-xl font-bold">{form.name}</h2>
                        <p className="text-sm text-gray-600">{form.heading}</p>
                        <p className="text-sm text-gray-600 italic">{form.subheading}</p>
                        <p className="text-sm mt-2">📱 {form.mobile}</p>
                        <p className="text-sm">🏢 {form.businessName}</p>
                        <p className="text-sm">🧑‍💼 {form.designation}</p>
                        <p className="text-sm">📍 {form.address}</p>
                        <a
                            href={form.mapLink}
                            target="_blank"
                            className="text-blue-500 text-sm"
                            rel="noreferrer"
                        >
                            View on Map
                        </a>
                        <p className="text-sm">📧 {form.email}</p>
                        <a
                            href={form.socialLink}
                            target="_blank"
                            className="text-sm text-[#008080]"
                            rel="noreferrer"
                        >
                            🔗 Social
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BusinessContent;
