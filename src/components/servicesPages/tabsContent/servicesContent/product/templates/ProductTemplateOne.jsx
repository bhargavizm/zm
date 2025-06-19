"use client";
import React from "react";
import Image from "next/image";
import useServicesContext from "@/components/hooks/useServiceContext";

const ProductTemplateOne = () => {
  const { productData, productImage } = useServicesContext();

  // Form data with defaults
  const {
    heading = "Pear House",
    description = "A cozy vacation rental in Cartagena, Colombia, perfect for beach lovers and city explorers.",
    pageUrl = "https://pearhouse-rentals.com",
    videoUrl = "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    email = "contact@pearhouse.com",
    phone = "+57 300 123 4567",
  } = productData || {};

  const imageUrl = productImage || "/demo-images/pear-house.webp";

  return (
    <div className="relative w-full max-w-sm mx-auto rounded-3xl overflow-hidden shadow-2xl phone-frame">
      <div className="relative bg-gradient-to-br from-purple-800/70 to-purple-600/70 p-4">
        {/* Top nav */}
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center bg-white/70 bg-opacity-20 rounded-full px-3 py-1 text-white text-sm">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            Buscar
          </div>
          <div className="bg-white bg-opacity-20 rounded-lg p-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </div>
        </div>

        {/* Greeting */}
        <div className="text-white text-lg mb-2">Hi there!</div>
        <div className="text-white font-bold text-2xl mb-6">{heading}</div>

        {/* Product Info Section */}
        <div className="bg-white h-[50vh] rounded-xl overflow-hidden shadow-md">
          {/* <Image
            src={imageUrl}
            alt="Product"
            width={400}
            height={300}
            className="w-full h-48 object-cover"
          /> */}
          <div className="p-4 space-y-2">
            <h3 className="text-lg font-semibold text-gray-800">{heading}</h3>
            <p className="text-gray-600">{description}</p>
            {pageUrl && (
              <a
                href={pageUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-sm text-[#008080] underline"
              >
                Visit Product Page
              </a>
            )}
            {videoUrl && (
              <a
                href={videoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-sm text-[#008080] underline"
              >
                Watch Video
              </a>
            )}
            {email && <p className="text-sm text-gray-500">Email: {email}</p>}
            {phone && <p className="text-sm text-gray-500">Call: {phone}</p>}
          </div>
        </div>

        {/* Orange cards section (optional) */}
        {/* 
        <div className="flex space-x-3 justify-center mt-6">
          <div className="bg-orange-500 rounded-lg p-4 text-center w-1/3 flex flex-col items-center">
            <Image src="/icons/bed.svg" alt="Rent House" width={40} height={40} className="mb-2" />
            <div className="text-white text-sm">Rentar Casa</div>
          </div>
          <div className="bg-orange-500 rounded-lg p-4 text-center w-1/3 flex flex-col items-center">
            <Image src="/icons/building.svg" alt="Apartamentos" width={40} height={40} className="mb-2" />
            <div className="text-white text-sm">Apartamentos</div>
          </div>
          <div className="bg-orange-500 rounded-lg p-4 text-center w-1/3 flex flex-col items-center">
            <Image src="/icons/couch.svg" alt="Compartido" width={40} height={40} className="mb-2" />
            <div className="text-white text-sm">Compartido</div>
          </div>
        </div>
        */}
      </div>
    </div>
  );
};

export default ProductTemplateOne;
