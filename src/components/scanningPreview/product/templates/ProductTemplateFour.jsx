

"use client";
import React, { useState, useCallback } from "react";
import { MdEmail, MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { FaPhoneVolume, FaAddressCard } from "react-icons/fa6";

const ProductTemplateFour = ({ items, productData, productLogo, productImage, bgDesign }) => {
  const {
    brandName = "Your Brand Name",
    email = "contact@example.com",
    phone = "+91 00000 00000",
    address = "India"
  } = productData || {};

  const [currentSlide, setCurrentSlide] = useState(0);

  const goToNextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev === items.length - 1 ? 0 : prev + 1));
  }, [items]);

  const goToPreviousSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev === 0 ? items.length - 1 : prev - 1));
  }, [items]);

  const currentItem = productData?.items?.length ? productData.items[currentSlide] : null;

  return (
    <div className="min-h-full w-full bg-gradient-to-br from-[#c82222] to-[#d70823] px-4 py-6 space-y-6 rounded-lg shadow-inner">
      {/* Header */}
      <div className="text-center text-white">
        {productData?.productLogo && (
          <img
            src={productLogo.preview || productLogo}
            alt="Brand Logo"
            className="mx-auto h-20 w-auto object-contain mb-2"
          />
        )}
        <h1 className="text-2xl font-bold">{brandName}</h1>
        <p className="mt-1 text-sm">Innovating products for a better tomorrow!</p>
      </div>

      {/* Product Carousel */}
      {currentItem ? (
        <div className="relative">
          <div
            key={currentSlide}
            className="bg-white rounded-xl shadow-md p-4 space-y-2 border border-gray-200 transition-all duration-300 ease-in-out"
          >
            {/* Image logic from Template One */}
            {currentItem.productImage && (
             <img
              src={currentItem.productImage.preview || currentItem.productImage}
              alt={`Product ${currentSlide + 1}`}
              className="w-full max-h-[400px] object-contain rounded-md border border-gray-100 mx-auto"
            />
            )}

            {currentItem.heading && (
              <h2 className="text-lg font-semibold">{currentItem.heading}</h2>
            )}
            {currentItem.description && (
              <p className="mt-2 text-sm">{currentItem.description}</p>
            )}
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

          {/* Arrows */}
          {productData.items.length > 1 && (
            <div className="absolute inset-y-0 left-0 right-0 flex items-center justify-between px-2">
              <button
                onClick={goToPreviousSlide}
                className="bg-black bg-opacity-50 text-white p-1 rounded-full hover:bg-opacity-75"
                aria-label="Previous slide"
              >
                <MdKeyboardArrowLeft size={24} />
              </button>
              <button
                onClick={goToNextSlide}
                className="bg-black bg-opacity-50 text-white p-1 rounded-full hover:bg-opacity-75"
                aria-label="Next slide"
              >
                <MdKeyboardArrowRight size={24} />
              </button>
            </div>
          )}
        </div>
      ) : (
        <p className="text-center text-white opacity-80 py-8">
          No products added yet. Start adding from the form!
        </p>
      )}

      {/* Contact */}
      <div className="bg-white rounded-xl shadow-md p-4 space-y-2 border border-gray-200">
        <h3 className="text-lg font-semibold ">Contact Us</h3>
        {email && (
          <div>
            <h1 className="font-medium">Email</h1>
            <p className=" text-sm flex items-center">
              <span className="mr-2"><MdEmail /></span> {email}
            </p>
          </div>
        )}
        {phone && (
          <div>
            <h1 className="font-medium">Phone No.</h1>
            <p className=" text-sm flex items-center">
              <span className="mr-2"><FaPhoneVolume /></span> {phone}
            </p>
          </div>
        )}
        {address && (
  <div className="flex items-center gap-2 text-sm">
    <FaAddressCard className="text-blue-600" />
    <a
      href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`}
      target="_blank"
      rel="noopener noreferrer"
      className="underline text-[#008080] hover:text-[#005f5f]"
    >
      {address}
    </a>
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

export default ProductTemplateFour;
