"use client";
import React, { useState, useEffect, useCallback } from "react";
import { MdEmail } from "react-icons/md";
import { FaPhoneVolume, FaAddressCard } from "react-icons/fa6";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md"; // Import arrow icons


const ProductTemplateOne = ({ items, productData, productLogo, productImage, bgDesign }) => {
  const {
    brandName = "Your Brand Name",
    email = "contact@example.com",
    phone = "+91 00000 00000",
    address = "India",
    mapLink = "",
  } = productData || {};

  const [currentSlide, setCurrentSlide] = useState(0);

  // Function to go to the next slide (manual click)
  const goToNextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev === items.length - 1 ? 0 : prev + 1));
  }, [items]);

  // Function to go to the previous slide (manual click)
  const goToPreviousSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev === 0 ? items.length - 1 : prev - 1));
  }, [items]);

  // No useEffect for auto-play in this template

  const currentItem = productData?.items && productData?.items.length > 0 ? productData?.items[currentSlide] : null;

  return (
    <div className="min-h-full w-full bg-gradient-to-br from-[#008080] to-[#00a6a6] px-4 py-6 space-y-6 rounded-lg shadow-inner">
      {/* Header Section - Displays Brand Logo and Name */}
      <div className="text-center text-white">
        {productData?.productLogo && (
          <img
            src={productData?.productLogo?.preview}
            alt="Brand Logo"
            className="mx-auto h-20 w-auto object-contain mb-2"
          />
        )}
        <h1 className="text-2xl font-bold">{brandName}</h1>
        <p className="mt-1 text-sm">Innovating products for a better tomorrow!</p>
      </div>

      {/* Product Carousel Section */}
      {productData?.items && productData?.items.length > 0 ? (
        <div className="relative">
          <div
            key={currentSlide} // Key helps React re-render/animate the slide content
            className="bg-white rounded-xl shadow-md p-4 space-y-2 border border-gray-200 transition-all duration-300 ease-in-out"
          >
            {/* Product Image */}
            {currentItem?.productImage && (
              <img
                src={currentItem?.productImage?.preview}
                alt={`Product ${currentSlide + 1}`}
                className="w-full h-48 object-fit rounded-md border border-gray-100"
              />
            )}
            {/* Product Heading */}
            {currentItem.heading && (
              <h2 className="text-lg font-semibold text-gray-800">{currentItem.heading}</h2>
            )}
            {/* Product Description */}
            {currentItem.description && (
              <p className="text-gray-600 text-sm">{currentItem.description}</p>
            )}
            {/* Product Page URL Link */}
            {currentItem.pageUrl && (
              <a
                href={currentItem.pageUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-[#008080] underline block hover:text-[#005f5f] transition-colors"
              >
                Visit Product Page
              </a>
            )}
            {/* Product Video URL Link */}
            {currentItem.videoUrl && (
              <a
                href={currentItem.videoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-[#008080] underline block hover:text-[#005f5f] transition-colors"
              >
                Watch Video
              </a>
            )}
          </div>

          {/* Carousel Navigation Buttons */}
          {productData?.items.length > 1 && (
            <div className="absolute inset-y-0 left-0 right-0 flex items-center justify-between px-2">
              <button
                onClick={goToPreviousSlide}
                className="bg-black bg-opacity-50 text-white p-1 rounded-full hover:bg-opacity-75 transition-opacity duration-200"
                aria-label="Previous slide"
              >
                <MdKeyboardArrowLeft size={24} />
              </button>
              <button
                onClick={goToNextSlide}
                className="bg-black bg-opacity-50 text-white p-1 rounded-full hover:bg-opacity-75 transition-opacity duration-200"
                aria-label="Next slide"
              >
                <MdKeyboardArrowRight size={24} />
              </button>
            </div>
          )}
        </div>
      ) : (
        <p className="text-center text-white opacity-80 py-8">No products added yet. Start adding from the form!</p>
      )}

      {/* Contact Section */}
      <div className="bg-white rounded-xl shadow-md p-4 space-y-2 border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-800">Contact Us</h3>
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
      <span className="mr-2">
        <FaAddressCard />
      </span>
      <a
        href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`}
        target="_blank"
        rel="noopener noreferrer"
         className="text-blue-600 underline break-words max-w-[180px] inline-block"
      >
        {address}
      </a>
    </p>
  </div>
)}

    {mapLink && (
  <div>
    <h1 className="font-medium">Map Link</h1>
    <p className="text-gray-700 text-sm flex items-center">
      <span className="mr-2">
        <FaAddressCard />
      </span>
      <a
        href={mapLink}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 underline break-words max-w-[180px] inline-block"
      >
        {mapLink}
      </a>
    </p>
  </div>
)}


        {productData.pageUrl && (
          <a
            href={productData.pageUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-[#008080] underline block hover:text-[#005f5f] transition-colors"
          >
            Visit Main Website
          </a>
        )}
      </div>
    </div>
  );
};

export default ProductTemplateOne;