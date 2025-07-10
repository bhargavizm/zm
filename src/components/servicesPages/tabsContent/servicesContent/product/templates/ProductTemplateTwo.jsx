"use client";
import React, { useState, useEffect, useCallback } from "react";
import { MdEmail } from "react-icons/md";
import { FaPhoneVolume, FaAddressCard } from "react-icons/fa6";

/**
 * ProductTemplateTwo component displays product information using a specific layout.
 * This version features an automatic sliding carousel only.
 *
 * @param {object} props - Component props.
 * @param {Array<object>} props.items - An array of product objects, each containing image, heading, description, etc.
 * @param {object} props.productData - Object containing common product data like email, phone, etc.
 * @param {string} [props.productLogo] - Optional brand logo URL for this product template.
 * @param {string} [props.productImage] - Optional main product image URL (though individual item images are preferred).
 * @param {string} [props.bgDesign] - Optional background design URL (image or video).
 */
const ProductTemplateTwo = ({ items, productData, productLogo, productImage, bgDesign }) => {
  const {
    brandName = "Your Brand Name",
    email = "contact@example.com",
    phone = "+91 00000 00000",
    address = "India"
  } = productData || {};

  const [currentSlide, setCurrentSlide] = useState(0);

  // Memoized callback to go to the next slide for automatic transition
  const handleNext = useCallback(() => {
    setCurrentSlide((prev) => (prev === items.length - 1 ? 0 : prev + 1));
  }, [items]);

  // Effect for auto-playing the carousel
  useEffect(() => {
    if (items && items.length > 1) { // Only auto-play if there's more than one item
      const interval = setInterval(() => {
        handleNext(); // Advance to the next slide using the memoized function
      }, 3000); // Change slide every 3 seconds

      // Cleanup function to clear the interval when the component unmounts
      // or when dependencies change.
      return () => clearInterval(interval);
    }
  }, [items, handleNext]);

  const currentItem = items && items.length > 0 ? items[currentSlide] : null;

  return (
    <div className="min-h-full w-full bg-gradient-to-br from-blue-600 to-blue-800 px-4 py-6 space-y-6 rounded-lg shadow-inner">
      {/* Header Section - Displays Brand Logo and Name */}
      <div className="text-center text-white">
        {productLogo && (
          <img
            src={productLogo}
            alt="Brand Logo"
            className="mx-auto h-20 w-auto object-contain mb-2"
          />
        )}
        <h1 className="text-2xl font-bold">{brandName}</h1>
        <p className="mt-1 text-sm opacity-90">Discover our latest innovations!</p>
      </div>

      {/* Product Carousel Section (Automatic Only) */}
      {items && items.length > 0 ? (
        <div className="relative">
          <div
            key={currentSlide}
            className="bg-white rounded-xl shadow-md p-4 space-y-2 border border-blue-200 transition-all duration-300 ease-in-out"
          >
            {currentItem.image && (
              <img
                src={currentItem.image}
                alt={`Product ${currentSlide + 1}`}
                className="w-full h-48 object-fit rounded-md border border-gray-100"
              />
            )}
            {currentItem.heading && (
              <h2 className="text-lg font-semibold text-gray-800">{currentItem.heading}</h2>
            )}
            {currentItem.description && (
              <p className="text-gray-600 text-sm">{currentItem.description}</p>
            )}
            {currentItem.pageUrl && (
              <a
                href={currentItem.pageUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-blue-700 underline block hover:text-blue-900 transition-colors"
              >
                Learn More
              </a>
            )}
            {currentItem.videoUrl && (
              <a
                href={currentItem.videoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-blue-700 underline block hover:text-blue-900 transition-colors"
              >
                Watch Video
              </a>
            )}
          </div>
          {/* No manual navigation elements (buttons or dots) */}
        </div>
      ) : (
        <p className="text-center text-white opacity-80 py-8">No products added yet. Start adding from the form!</p>
      )}

      {/* Contact Section */}
      <div className="bg-white rounded-xl shadow-md p-4 space-y-2 border border-blue-200">
        <h3 className="text-lg font-semibold text-gray-800">Get in Touch</h3>
        {email && (
          <div>
            <h1 className="font-medium">Email</h1>
            <p className="text-gray-700 text-sm flex items-center">
              <span className="mr-2"><MdEmail /></span> {email}
            </p>
          </div>
        )}
        {phone && (
          <div>
            <h1 className="font-medium">Phone No.</h1>
            <p className="text-gray-700 text-sm flex items-center">
              <span className="mr-2"><FaPhoneVolume /></span> {phone}
            </p>
          </div>
        )}
        {address && (
          <div>
            <h1 className="font-medium">Address</h1>
            <p className="text-gray-700 text-sm flex items-center">
              <span className="mr-2"><FaAddressCard /></span> {address}
            </p>
          </div>
        )}
        {productData.pageUrl && (
          <a
            href={productData.pageUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-blue-700 underline block hover:text-blue-900 transition-colors"
          >
            Visit Our Website
          </a>
        )}
      </div>
    </div>
  );
};

export default ProductTemplateTwo;