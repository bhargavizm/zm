"use client";
import React, { useState } from "react";
import Image from "next/image";
import useServicesContext from "@/components/hooks/useServiceContext";

const ProductContent = () => {
<<<<<<< HEAD
    const {
        productData,
        setProductData,
        setProductImage,
    } = useServicesContext();
=======
  const { productData, setProductData, setProductImage } = useServicesContext();
   
>>>>>>> b92d8796050a92e8c6926f7472477e8d963598df

    const [productImages, setProductImages] = useState([]);
    const [nfcEnabled, setNfcEnabled] = useState(false);
    const [showNfcModal, setShowNfcModal] = useState(false);
    const [pendingToggle, setPendingToggle] = useState(false);

    const templateImages = ["temp1.webp", "temp2.webp", "temp3.webp", "temp4.webp"];

    const handleInputChange = (e) => {
        const { id, value, type, checked } = e.target;
        const newValue = type === "checkbox" ? checked : value;
        setProductData((prev) => ({ ...prev, [id]: newValue }));
    };

    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setProductImage(imageUrl);
            setProductImages((prev) => [...prev, imageUrl]);
        }
    };

    const handleManualUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            setProductData((prev) => ({ ...prev, manual: file }));
        }
    };

    const selectTemplate = (index) => {
        setProductData((prev) => ({ ...prev, selectedTemplate: index }));
    };

    const handleNfcToggle = () => {
        if (!nfcEnabled) {
            setShowNfcModal(true);
            setPendingToggle(true);
        } else {
            setNfcEnabled(false);
        }
    };

    const confirmNfc = () => {
        setNfcEnabled(true);
        setShowNfcModal(false);
        setPendingToggle(false);
    };

    const cancelNfc = () => {
        setPendingToggle(false);
        setShowNfcModal(false);
    };

    return (
<<<<<<< HEAD
        <>
            <div>
                <div className="grid grid-cols-1 gap-10">
                    <div className="bg-white shadow-xl rounded-xl p-6 space-y-6">
                        <div>
                            <h2 className="text-xl font-semibold mb-4">
                                Select a Template (click to choose)
                            </h2>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                {templateImages.map((filename, idx) => (
                                    <div
=======
        <div >
            <h1 className="text-3xl font-bold  text-teal-700 mb-6">
                Product QR Code Generator
            </h1>

            <div className="grid grid-cols-1 gap-10">
                <div className="bg-white shadow-xl rounded-xl p-6 space-y-6">
                    {/* Templates */}
                    <div>
                        <h2 className="text-xl font-semibold mb-4">
                            Select a Template (click to choose)
                        </h2>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {templateImages.map((filename, idx) => (
                                <div
                                    key={idx}
                                    className={`border-2 rounded-md p-1 cursor-pointer transition hover:shadow-lg ${productImages.selectedTemplate === idx
                                        ? "border-[#008080]"
                                        : "border-gray-300"
                                        }`}
                                    onClick={() => setProductImages({ ...productImages, selectedTemplate: idx })}
                                >
                                    <Image
                                        src={`/product-templates/${filename}`} // ✅ this path refers to /public/product-templates/
                                        alt={`Template ${filename}`}
                                        width={100}
                                        height={120}
                                        className="object-cover rounded"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Product Image Upload */}
                    <div>
                        <label className="block mb-1 font-medium">Product Image (500x500)</label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleChange}
                            className="w-full text-sm"
                        />
                        {productImages.length > 0 && (
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-2">
                                {productImages.map((src, idx) => (
                                    <img
>>>>>>> b92d8796050a92e8c6926f7472477e8d963598df
                                        key={idx}
                                        className={`border-2 rounded-md p-2 cursor-pointer transition hover:shadow-lg ${productData.selectedTemplate === idx
                                                ? "border-[#008080]"
                                                : "border-gray-300"
                                            }`}
                                        onClick={() => selectTemplate(idx)}
                                    >
                                        <Image
                                            src={`/product-templates/${filename}`}
                                            alt={`Template ${idx + 1}`}
                                            width={100}
                                            height={120}
                                            className="object-cover rounded"
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>

                    {/* Manual Upload */}
                    <div>
                        <label className="block mb-1 font-medium">Product Manual (PDF)</label>
                        <input
                            type="file"
                            accept=".pdf"
                            onChange={handleChange}
                            className="w-full text-sm"
                        />
                    </div>

                    {/* Form Fields */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {[ 
                            { id: "heading", placeholder: "Product Heading" },
                            { id: "description", placeholder: "Product Description" },
                            { id: "pageUrl", placeholder: "Product Page URL", type: "url" },
                            { id: "videoUrl", placeholder: "Product Video URL", type: "url" },
                            { id: "email", placeholder: "Contact Email", type: "email" },
                            { id: "phone", placeholder: "Phone Number", type: "tel" },
                            { id: "password", placeholder: "QR Code Password", type: "password" },
                        ].map(({ id, placeholder, type = "text" }) => (
                            <input
                                key={id}
                                id={id}
                                type={type}
                                value={productData[id]}
                                onChange={handleChange}
                                placeholder={placeholder}
                                className="border p-2 rounded w-full shadow-sm focus:outline-none focus:ring-2 focus:ring-[#008080]"
                            />
                            {productImages.length > 0 && (
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-2">
                                    {productImages.map((src, idx) => (
                                        <img
                                            key={idx}
                                            src={src}
                                            alt={`Uploaded ${idx}`}
                                            width={100}
                                            height={100}
                                            className="rounded object-cover"
                                        />
                                    ))}
                                </div>
                            )}
                        </div>

                        <div>
                            <label className="block mb-1 font-medium">
                                Product Manual (PDF)
                            </label>
                            <input
                                type="file"
                                accept=".pdf"
                                onChange={handleManualUpload}
                                className="w-full text-sm"
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {[
                                { id: "heading", placeholder: "Product Heading" },
                                { id: "description", placeholder: "Product Description" },
                                { id: "pageUrl", placeholder: "Product Page URL", type: "url" },
                                { id: "videoUrl", placeholder: "Product Video URL", type: "url" },
                                { id: "email", placeholder: "Contact Email", type: "email" },
                                { id: "phone", placeholder: "Phone Number", type: "tel" },
                                { id: "password", placeholder: "QR Code Password", type: "password" },
                            ].map(({ id, placeholder, type = "text" }) => (
                                <input
                                    key={id}
                                    id={id}
                                    type={type}
                                    value={productData[id] || ""}
                                    onChange={handleInputChange}
                                    placeholder={placeholder}
                                    className="border p-2 rounded w-full shadow-sm focus:outline-none focus:ring-2 focus:ring-[#008080]"
                                />
                            ))}
                        </div>

                        <div className="flex items-center gap-4 mt-2">
                            <span className="text-sm font-medium text-gray-700">NFC</span>
                            <button
                                type="button"
                                onClick={handleNfcToggle}
                                className={`relative inline-flex h-8 w-16 items-center rounded-full transition-colors duration-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#008080] ${nfcEnabled ? "bg-[#008080]" : "bg-gray-300"}`}
                            >
                                <span
                                    className={`absolute left-1 top-1 inline-flex h-6 w-6 items-center justify-center rounded-full bg-white shadow-md transition-all duration-300 ${nfcEnabled ? "translate-x-8" : "translate-x-0"}`}
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
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
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
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    )}
                                </span>
                            </button>
                        </div>

                        <button
                            type="submit"
                            className="mt-4 w-full bg-[#008080] text-white font-semibold py-2 rounded hover:bg-[#006666] transition"
                        >
                            Generate QR Code
                        </button>
                    </div>
                </div>
            </div>

            {/* NFC Modal */}
            {showNfcModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-transparent">
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

export default ProductContent;
