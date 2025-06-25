// "use client";
// import React from "react";
// import Image from "next/image";
// import useServicesContext from "@/components/hooks/useServiceContext";

// const ProductTemplateOne = () => {
//   const { productData, productImage } = useServicesContext();

//   // Form data with defaults
//   const {
//     heading = "Pear House",
//     description = "A cozy vacation rental in Cartagena, Colombia, perfect for beach lovers and city explorers.",
//     pageUrl = "https://pearhouse-rentals.com",
//     videoUrl = "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
//     email = "contact@pearhouse.com",
//     phone = "+57 300 123 4567",
//   } = productData || {};

//   const imageUrl = productImage || "/demo-images/pear-house.webp";

//   return (
//     <div className="relative w-full max-w-sm mx-auto rounded-3xl overflow-hidden shadow-2xl phone-frame">
//       <div className="relative bg-gradient-to-br from-purple-800/70 to-purple-600/70 p-4">
//         {/* Top nav */}
//         <div className="flex justify-between items-center mb-4">
//           <div className="flex items-center bg-white/70 bg-opacity-20 rounded-full px-3 py-1 text-white text-sm">
//             <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
//             </svg>
//             Buscar
//           </div>
//           <div className="bg-white bg-opacity-20 rounded-lg p-2">
//             <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
//             </svg>
//           </div>
//         </div>

//         {/* Greeting */}
//         <div className="text-white text-lg mb-2">Hi there!</div>
//         <div className="text-white font-bold text-2xl mb-6">{heading}</div>

//         {/* Product Info Section */}
//         <div className="bg-white h-[50vh] rounded-xl overflow-hidden shadow-md">
//           {/* <Image
//             src={imageUrl}
//             alt="Product"
//             width={400}
//             height={300}
//             className="w-full h-48 object-cover"
//           /> */}
//           <div className="p-4 space-y-2">
//             <h3 className="text-lg font-semibold text-gray-800">{heading}</h3>
//             <p className="text-gray-600">{description}</p>
//             {pageUrl && (
//               <a
//                 href={pageUrl}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="block text-sm text-[#008080] underline"
//               >
//                 Visit Product Page
//               </a>
//             )}
//             {videoUrl && (
//               <a
//                 href={videoUrl}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="block text-sm text-[#008080] underline"
//               >
//                 Watch Video
//               </a>
//             )}
//             {email && <p className="text-sm text-gray-500">Email: {email}</p>}
//             {phone && <p className="text-sm text-gray-500">Call: {phone}</p>}
//           </div>
//         </div>

//         {/* Orange cards section (optional) */}
//         {/* 
//         <div className="flex space-x-3 justify-center mt-6">
//           <div className="bg-orange-500 rounded-lg p-4 text-center w-1/3 flex flex-col items-center">
//             <Image src="/icons/bed.svg" alt="Rent House" width={40} height={40} className="mb-2" />
//             <div className="text-white text-sm">Rentar Casa</div>
//           </div>
//           <div className="bg-orange-500 rounded-lg p-4 text-center w-1/3 flex flex-col items-center">
//             <Image src="/icons/building.svg" alt="Apartamentos" width={40} height={40} className="mb-2" />
//             <div className="text-white text-sm">Apartamentos</div>
//           </div>
//           <div className="bg-orange-500 rounded-lg p-4 text-center w-1/3 flex flex-col items-center">
//             <Image src="/icons/couch.svg" alt="Compartido" width={40} height={40} className="mb-2" />
//             <div className="text-white text-sm">Compartido</div>
//           </div>
//         </div>
//         */}
//       </div>
//     </div>
//   );
// };


"use client";
import React, { useState, useEffect, useCallback } from "react";
import { MdEmail } from "react-icons/md";
import { FaPhoneVolume, FaAddressCard } from "react-icons/fa6";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md"; // Import arrow icons

/**
 * ProductTemplateOne component displays product information using a specific layout.
 * This version features a carousel navigable by click buttons only.
 *
 * @param {object} props - Component props.
 * @param {Array<object>} props.items - An array of product objects, each containing image, heading, description, etc.
 * @param {object} props.productData - Object containing common product data like email, phone, etc.
 * @param {string} [props.productLogo] - Optional brand logo URL for this product template.
 * @param {string} [props.productImage] - Optional main product image URL (though individual item images are preferred).
 * @param {string} [props.bgDesign] - Optional background design URL (image or video).
 */
const ProductTemplateOne = ({ items, productData, productLogo, productImage, bgDesign }) => {
  const {
    brandName = "Your Brand Name",
    email = "contact@example.com",
    phone = "+91 00000 00000",
    address = "India"
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

  const currentItem = items && items.length > 0 ? items[currentSlide] : null;

  return (
    <div className="min-h-full w-full bg-gradient-to-br from-[#008080] to-[#00a6a6] px-4 py-6 space-y-6 rounded-lg shadow-inner">
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
        <p className="mt-1 text-sm">Innovating products for a better tomorrow!</p>
      </div>

      {/* Product Carousel Section */}
      {items && items.length > 0 ? (
        <div className="relative">
          <div
            key={currentSlide} // Key helps React re-render/animate the slide content
            className="bg-white rounded-xl shadow-md p-4 space-y-2 border border-gray-200 transition-all duration-300 ease-in-out"
          >
            {/* Product Image */}
            {currentItem.image && (
              <img
                src={currentItem.image}
                alt={`Product ${currentSlide + 1}`}
                className="w-full h-48 object-cover rounded-md border border-gray-100"
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
          {items.length > 1 && (
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
              <span className="mr-2"><FaAddressCard /></span> {address}
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