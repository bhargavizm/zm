"use client";
import React, { useState, useEffect, useCallback } from "react";
import { MdEmail } from "react-icons/md";
import { FaPhoneVolume, FaAddressCard } from "react-icons/fa6";
import Link from "next/link";
import { HiOutlineLocationMarker } from "react-icons/hi";

const ProductTemplateThree = ({ items, productData, productLogo, productImage, bgDesign }) => {
  const {
    brandName = "Your Brand Name",
    email = "contact@example.com",
    phone = "+91 00000 00000",
    address = "India",
    mapLink = "",
  } = productData || {};

  const [currentSlide, setCurrentSlide] = useState(0);

  const handleNext = useCallback(() => {
    setCurrentSlide((prev) => (prev === items.length - 1 ? 0 : prev + 1));
  }, [items]);

  useEffect(() => {
    if (items && items.length > 1) {
      const interval = setInterval(handleNext, 3000);
      return () => clearInterval(interval);
    }
  }, [items, handleNext]);

  const currentItem = productData?.items?.[currentSlide];

  return (
    <div className="w-full min-h-full bg-[#4c2707] px-4 py-6 rounded-lg shadow-inner flex flex-col gap-6">
      
      {/* Brand Section */}
      <div className="text-center text-white space-y-2">
        {productData?.productLogo && (
           <img
            src={productLogo.preview || productLogo}
            alt="Brand Logo"
            className="mx-auto h-20 w-auto object-contain mb-2"
          />
        )}
        <h1 className="text-2xl font-bold">{brandName}</h1>
        <p className="text-sm opacity-90">Quality products for your everyday needs.</p>
      </div>

      {/* Product Card */}
      {currentItem ? (
        <div className="bg-white rounded-xl shadow-md p-4 space-y-3 border border-purple-200 transition-all duration-300 ease-in-out text-center">
          {currentItem.productImage && (
           <img
              src={currentItem.productImage.preview || currentItem.productImage}
              alt={`Product ${currentSlide + 1}`}
              className="w-full max-h-[400px] object-contain rounded-md border border-gray-100 mx-auto"
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
              className="text-sm text-purple-700 underline hover:text-purple-900 transition"
            >
              View Product Details
            </a>
          )}<br></br>
          {currentItem.videoUrl && (
            <a
              href={currentItem.videoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-purple-700 underline hover:text-purple-900 transition"
            >
              Watch Promo
            </a>
          )}
        </div>
      ) : (
        <p className="text-center text-white opacity-80 py-8">
          No products added yet. Start adding from the form!
        </p>
      )}

      {/* Pagination Dots */}
      {items?.length > 1 && (
        <div className="flex justify-center gap-2">
          {items.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`h-2 w-2 rounded-full ${
                idx === currentSlide ? "bg-white" : "bg-purple-300"
              } hover:bg-white transition-all`}
              aria-label={`Slide ${idx + 1}`}
            ></button>
          ))}
        </div>
      )}

      {/* Contact Info */}
      <div className="bg-white rounded-xl shadow-md p-4 space-y-3 border border-purple-200 text-gray-800">
        <h3 className="text-lg font-semibold">Connect With Us</h3>
        {email && (
          <div>
            <h4 className="font-medium">Email</h4>
            <p className="text-sm flex items-center gap-2">
              <MdEmail /> {email}
            </p>
          </div>
        )}
        {phone && (
          <div>
            <h4 className="font-medium">Phone No.</h4>
            <p className="text-sm flex items-center gap-2">
              <FaPhoneVolume /> {phone}
            </p>
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

        {productData.pageUrl && (
          <a
            href={productData.pageUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-purple-700 underline hover:text-purple-900 transition"
          >
            Visit Our Main Site
          </a>
        )}
      </div>
    </div>
  );
};

export default ProductTemplateThree;
