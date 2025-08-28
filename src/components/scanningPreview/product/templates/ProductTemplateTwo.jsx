"use client";
import React, { useState, useEffect, useCallback } from "react";
import { MdEmail } from "react-icons/md";
import { FaPhoneVolume, FaAddressCard } from "react-icons/fa6";

const ProductTemplateTwo = ({
  productData = {},
  productLogo,
  items = [],
}) => {
  const {
    brandName = "Your Brand Name",
    email = "contact@example.com",
    phone = "+91 00000 00000",
    address = "India",
    mapLink = "",
    pageUrl,
  } = productData;

  const [currentSlide, setCurrentSlide] = useState(0);

  const handleNext = useCallback(() => {
    setCurrentSlide((prev) => (prev === items.length - 1 ? 0 : prev + 1));
  }, [items]);

  useEffect(() => {
    if (items.length > 1) {
      const interval = setInterval(() => {
        handleNext();
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [items, handleNext]);

  const currentItem = items[currentSlide];

  return (
    <div className="min-h-full w-full bg-gradient-to-br from-blue-600 to-blue-800 px-4 py-6 space-y-6 rounded-lg shadow-inner text-white">
      {/* Header */}
      <div className="text-center">
        {productLogo && (
          <img
            src={productLogo?.preview || productLogo}
            alt="Product Logo"
            className="mx-auto h-20 w-20 object-center rounded-full border shadow mb-2"
          />
        )}
        <h1 className="text-2xl font-bold">{brandName}</h1>
        <p className="mt-1 text-sm opacity-80">Discover our latest innovations!</p>
      </div>

      {/* Carousel */}
      {items.length > 0 ? (
        <div className="relative">
          <div
            key={currentSlide}
            className="bg-white text-gray-800 rounded-xl shadow-md p-4 space-y-2 border border-blue-200 transition-all duration-300 ease-in-out"
          >
            {currentItem.productImage && (
              <img
              src={currentItem.productImage.preview || currentItem.productImage}
              alt={`Product ${currentSlide + 1}`}
              className="w-full max-h-[400px] object-contain rounded-md border border-gray-100 mx-auto"
            />
            )}
            {currentItem.heading && (
              <h2 className="text-lg font-semibold text-center">{currentItem.heading}</h2>
            )}
            {currentItem.description && (
              <p className="text-sm text-gray-600 text-center">{currentItem.description}</p>
            )}
            {currentItem.pageUrl && (
              <a
                href={currentItem.pageUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-[#008080] underline block hover:text-[#005f5f] text-center"
              >
                Visit Product Page
              </a>
            )}
            {currentItem?.videoUrl && (
              <a
                href={currentItem.videoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-[#008080] underline block hover:text-[#005f5f] text-center"
              >
                Watch Video
              </a>
            )}
          </div>
        </div>
      ) : (
        <p className="text-center text-white opacity-80 py-8">No products added yet.</p>
      )}

      {/* Contact Info */}
      <div className="bg-white text-gray-800 rounded-xl shadow-md p-4 space-y-3 border border-blue-200">
        <h3 className="text-lg font-semibold">Get in Touch</h3>
        {email && (
          <div className="flex items-center gap-2 text-sm">
            <MdEmail className="text-blue-600" />
            <span>{email}</span>
          </div>
        )}
        {phone && (
          <div className="flex items-center gap-2 text-sm">
            <FaPhoneVolume className="text-blue-600" />
            <span>{phone}</span>
          </div>
        )}
       {address && (
  <div className="flex items-center gap-2 text-sm">
    <FaAddressCard className="text-blue-600" />
    <span>Address:</span>
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

 {mapLink && (
   <div className="mt-2 flex items-center gap-1 flex-wrap">
     <HiOutlineLocationMarker className="w-5 h-5" />
     <span>Map Link:</span>
     <Link
       href={mapLink}
       target="_blank"
       className="text-blue-600 underline break-all"
     >
        View location
     </Link>
   </div>
 )}

        {pageUrl && (
          <a
            href={pageUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-blue-700 underline block hover:text-blue-900"
          >
            Visit Our Website
          </a>
        )}
      </div>
    </div>
  );
};

export default ProductTemplateTwo;
