"use client";

import React from 'react';
import useServicesContext from '@/components/hooks/useServiceContext';
import useDesignContext from '@/components/hooks/useDesignContext';
import Image from 'next/image';

const PropertyPreview = () => {
  const { dynamicForms } = useServicesContext();
  const { bgDesign } = useDesignContext();
  const property = dynamicForms.propertyDetails;

  const hasBasicInfo = Object.values(property?.basicInfo || {}).some(Boolean);
  const hasAddressInfo = Object.values(property?.addressInfo || {}).some(Boolean);
  const hasPricingInfo = Object.values(property?.pricingInfo || {}).some(Boolean);
  const hasMainImage = !!property?.images?.mainImage;
  const hasGalleryImages = property?.images?.galleryImages?.length > 0;

  const isVideo = bgDesign?.endsWith('.mp4');
  const isImage = bgDesign && !isVideo;

  return (
    <div className="relative min-h-screen">
      {/* 🔳 Background Layer */}


      {/* 🧊 White overlay */}
      {/* <div className="absolute inset-0 bg-white/90 backdrop-blur-sm z-10" /> */}

      {/* 📱 Main Preview Content */}
      <div className="relative z-20 flex justify-center py-10">
        <div className="w-[375px] h-[667px] border-[12px] border-black rounded-[36px] bg-white shadow-xl overflow-hidden relative">
                {isImage && (
        <img
          src={bgDesign}
          alt="Background"
          className="absolute inset-0 w-full h-full object-cover z-0"
        />
      )}
      {isVideo && (
        <video
          src={bgDesign}
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover z-0"
        />
      )}
      {!bgDesign && (
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover z-0"
        >
          <source src="/services-service/property-info.mp4" type="video/mp4" />
        </video>
      )}
          <div className="h-full overflow-y-auto p-4 scrollbar-hide">
            <h1 className="text-2xl font-bold text-center text-[#008080] mb-6">🏡 Property Preview</h1>

            {/* Basic Info */}
            {hasBasicInfo && (
              <div className="border p-4 rounded shadow mb-4">
                <h2 className="text-lg font-semibold text-[#008080] mb-2">Basic Information</h2>
                {property.basicInfo.propertyName && <p><strong>Name:</strong> {property.basicInfo.propertyName}</p>}
                {property.basicInfo.propertyType && <p><strong>Type:</strong> {property.basicInfo.propertyType}</p>}
                {property.basicInfo.ownerName && <p><strong>Owner:</strong> {property.basicInfo.ownerName}</p>}
                {property.basicInfo.contactNumber && <p><strong>Contact:</strong> {property.basicInfo.contactNumber}</p>}
              </div>
            )}

            {/* Address Info */}
            {hasAddressInfo && (
              <div className="border p-4 rounded shadow mb-4">
                <h2 className="text-lg font-semibold text-[#008080] mb-2">Address Info</h2>
                {property.addressInfo.address && <p><strong>Address:</strong> {property.addressInfo.address}</p>}
                {property.addressInfo.mapLink && <p><strong>Map Link:</strong> {property.addressInfo.mapLink}</p>}
              </div>
            )}

            {/* Pricing Info */}
            {hasPricingInfo && (
              <div className="border p-4 rounded shadow mb-4">
                <h2 className="text-lg font-semibold text-[#008080] mb-2">Pricing Info</h2>
                {property.pricingInfo.price && <p><strong>Price:</strong> {property.pricingInfo.price}</p>}
                {property.pricingInfo.area && <p><strong>Area:</strong> {property.pricingInfo.area}</p>}
                {property.pricingInfo.amenities && <p><strong>Amenities:</strong> {property.pricingInfo.amenities}</p>}
              </div>
            )}

            {/* Main Image */}
            {hasMainImage && (
              <div className="border p-4 rounded shadow mb-4">
                <h2 className="text-lg font-semibold text-[#008080] mb-2">Main Image</h2>
                <Image
                  src={URL.createObjectURL(property.images.mainImage)}
                  alt="Main Property"
                  width={300}
                  height={200}
                  className="rounded w-full object-cover"
                />
              </div>
            )}

            {/* Gallery Images */}
            {hasGalleryImages && (
              <div className="border p-4 rounded shadow mb-4">
                <h2 className="text-lg font-semibold text-[#008080] mb-2">Gallery Images</h2>
                <div className="grid grid-cols-2 gap-3">
                  {property.images.galleryImages.map((img, index) => (
                    <Image
                      key={index}
                      src={URL.createObjectURL(img)}
                      alt={`Gallery ${index + 1}`}
                      width={150}
                      height={100}
                      className="rounded w-full object-cover"
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Password Message */}
            {property.password && (
              <p className="text-xs italic text-gray-500 text-center mb-2">
                🔒 Password Protected
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyPreview;
