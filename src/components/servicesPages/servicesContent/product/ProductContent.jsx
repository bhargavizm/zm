"use client";
import React, { useState } from "react";
import Image from "next/image";
import useServicesContext from "@/components/hooks/useServiceContext";

const ProductContent = () => {
  const { productData, setProductData, setProductImage } = useServicesContext();

  const handleChange = (e) => {
    const { id, value, type, files } = e.target;

    if (type === "file") {
      const file = files[0];
      if (file && id === "productImage") {
        setProductImage(URL.createObjectURL(file));
      } else if (file && id === "manual") {
        setProductData((prev) => ({ ...prev, manual: file }));
      }
    } else {
      setProductData((prev) => ({ ...prev, [id]: value }));
    }
  };

  const selectTemplate = (index) => {
    setProductData((prev) => ({ ...prev, selectedTemplate: index }));
  };

  return (
    <div>

      <div className="grid grid-cols-1  gap-10">
        {/* Form Section */}
        <div className="bg-white shadow-xl rounded-xl p-6 space-y-6">
          <div>
            <label className="block mb-2 font-semibold">
              Product Image (500×500)
            </label>
            <input
              type="file"
              id="productImage"
              accept="image/*"
              onChange={handleChange}
              className="w-full border p-2 rounded focus:ring-teal-500 focus:outline-none"
            />
          </div>

          {/* Template Selector */}
          <div>
            <label className="block mb-2 font-semibold">
              Select a Template
            </label>
            <div className="grid grid-cols-4 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  onClick={() => selectTemplate(i)}
                  className={`p-3 border rounded-lg cursor-pointer transition
                    ${
                      productData.selectedTemplate === i
                        ? "border-teal-600  teal-400 ring-2"
                        : "border-gray-300"
                    } hover:border-teal-500`}
                >
                  <Image
                    src={`/templates/template${i}.png`}
                    alt={`Template ${i}`}
                    width={80}
                    height={80}
                    className="rounded-md object-cover"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Input Fields */}
          {[
            { id: "heading", placeholder: "Product Heading" },
            {
              id: "description",
              placeholder: "Product Description",
              isTextArea: true,
            },
            { id: "pageUrl", placeholder: "Product Page URL", type: "url" },
            { id: "videoUrl", placeholder: "Product Video URL", type: "url" },
            { id: "email", placeholder: "Contact Email", type: "email" },
            { id: "phone", placeholder: "Contact Phone Number", type: "tel" },
            {
              id: "password",
              placeholder: "QR Code Password",
              type: "password",
            },
          ].map((field) =>
            field.isTextArea ? (
              <textarea
                key={field.id}
                id={field.id}
                value={productData[field.id]}
                onChange={handleChange}
                placeholder={field.placeholder}
                rows={4}
                className="w-full border p-2 rounded focus:ring-teal-500 focus:outline-none"
              />
            ) : (
              <input
                key={field.id}
                id={field.id}
                type={field.type || "text"}
                value={productData[field.id]}
                onChange={handleChange}
                placeholder={field.placeholder}
                className="w-full border p-2 rounded focus:ring-teal-500 focus:outline-none"
              />
            )
          )}

          <div>
            <label className="block mb-2 font-semibold">
              Product Manual (PDF)
            </label>
            <input
              type="file"
              id="manual"
              accept=".pdf"
              onChange={handleChange}
              className="w-full border p-2 rounded focus:ring-teal-500 focus:outline-none"
            />
          </div>

          <button className="w-full bg-teal-600 text-white py-2 rounded hover:bg-teal-700 transition">
            Generate QR Code
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductContent;
