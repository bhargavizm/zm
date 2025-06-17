"use client";
import React, { useState } from "react";
import Image from "next/image";
import useServicesContext from "@/components/hooks/useServiceContext";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import NFCModal from "@/components/modalPopUps/nfcModal";

const ProductContent = () => {
    const { productData, setProductData, setProductImage } = useServicesContext();

    const [productImages, setProductImages] = useState([]);
      const [showPassword, setShowPassword] = useState(false);

    const templateImages = ["temp1.webp", "temp2.webp", "temp3.webp", "temp4.webp"];

       const selectTemplate = (index) => {
        setProductData((prev) => ({ ...prev, selectedTemplate: index }));
    };


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

 

    return (
        <>
            <div>
                <h1 className="text-3xl font-bold text-teal-700 mb-6">
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
                                        className={`border-2 rounded-md p-1 cursor-pointer transition hover:shadow-lg ${productData.selectedTemplate === idx
                                                ? "border-[#008080]"
                                                : "border-gray-300"
                                            }`}
                                        onClick={() => selectTemplate(idx)}
                                    >
                                        <Image
                                            src={`/product-templates/${filename}`}
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
                                onChange={handleFileUpload}
                                className="w-full text-sm"
                            />
                            {productImages.length > 0 && (
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-2">
                                    {productImages.map((src, idx) => (
                                        <img
                                            key={idx}
                                            src={src}
                                            alt={`Uploaded ${idx}`}
                                            className="rounded object-cover w-24 h-24 border border-gray-300"
                                        />
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Manual Upload */}
                        <div>
                            <label className="block mb-1 font-medium">Product Manual (PDF)</label>
                            <input
                                type="file"
                                accept=".pdf"
                                onChange={handleManualUpload}
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
      ].map(({ id, placeholder, type = "text" }) =>
        id === "password" ? (
          <div key={id} className="relative w-full">
            <input
              id={id}
              type={showPassword ? "text" : "password"}
              value={productData[id] || ""}
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
            value={productData[id] || ""}
            onChange={handleInputChange}
            placeholder={placeholder}
            className="border p-2 rounded w-full shadow-sm focus:outline-none focus:ring-2 focus:ring-[#008080]"
          />
        )
      )}
                        </div>

                  <NFCModal/>

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

export default ProductContent;