"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import useServicesContext from "@/components/hooks/useServiceContext";

const PropertyPreview = () => {
  const { propertyDetails } = useServicesContext();

  const defaultBg = "/services-service/property.webp";
  const [bgDesign, setBgDesign] = useState(defaultBg);
  const [isLoading, setIsLoading] = useState(true);

  const property = propertyDetails || {};

  const hasBasicInfo = Object.values(property?.basicInfo || {}).some(Boolean);
  const hasAddressInfo = Object.values(property?.addressInfo || {}).some(Boolean);
  const hasPricingInfo = Object.values(property?.pricingInfo || {}).some(Boolean);
  const hasGalleryImages =
    Array.isArray(property?.images?.galleryImages) && property.images.galleryImages.length > 0;

  useEffect(() => {
    setIsLoading(true);
    setBgDesign(property?.bgDesign || defaultBg);
  }, [property?.bgDesign]);

  const isVideo = bgDesign?.endsWith(".mp4") || bgDesign?.endsWith(".webm");
  const isImage = bgDesign && !isVideo;

  const noData =
    !hasBasicInfo && !hasAddressInfo && !hasPricingInfo && !hasGalleryImages;

  return (
    <div className="flex justify-center p-4">
      <div className="relative w-[360px] rounded-xl shadow-lg overflow-hidden bg-white/90 backdrop-blur-md max-h-[620px] flex flex-col z-10">
        {/* Background */}
        {isImage ? (
          <img
            src={bgDesign}
            alt="Background"
            onLoad={() => setTimeout(() => setIsLoading(false), 300)}
            className="absolute inset-0 w-full h-full object-cover opacity-20 -z-10"
          />
        ) : isVideo ? (
          <video
            src={bgDesign}
            autoPlay
            loop
            muted
            playsInline
            onLoadedData={() => setTimeout(() => setIsLoading(false), 300)}
            className="absolute inset-0 w-full h-full object-cover opacity-20 -z-10"
          />
        ) : (
          <img
            src={defaultBg}
            alt="Default Background"
            onLoad={() => setTimeout(() => setIsLoading(false), 300)}
            className="absolute inset-0 w-full h-full object-cover opacity-20 -z-10"
          />
        )}

        {/* Loader */}
        {isLoading && (
          <div className="absolute inset-0 z-20 bg-mainGreen/80 backdrop-blur-sm flex justify-center items-center">
            <Image
              src="/logos/ZM LOGO.webp"
              alt="Loading"
              width={100}
              height={100}
              className="w-20 h-20 animate-bounce"
            />
          </div>
        )}

        {/* Content */}
        <div className="relative flex-1 overflow-y-auto p-5 space-y-5">
          <h2 className="text-2xl font-bold text-center text-teal-800">
            Property Preview
          </h2>

          {noData ? (
            <div className="flex flex-col items-center justify-center text-center text-gray-400 mt-10 space-y-2">
              <Image
                src="/icons/empty-box.png"
                alt="No Data"
                width={64}
                height={64}
                className="opacity-60"
              />
              <p>No property data found.</p>
            </div>
          ) : (
            <>
              {hasBasicInfo && (
                <section className="p-3 rounded border border-teal-300 bg-teal-50">
                  <h3 className="text-teal-700 font-semibold mb-2">Basic Information</h3>
                  {property.basicInfo.propertyName && (
                    <p><strong>Name:</strong> {property.basicInfo.propertyName}</p>
                  )}
                  {property.basicInfo.propertyType && (
                    <p><strong>Type:</strong> {property.basicInfo.propertyType}</p>
                  )}
                  {property.basicInfo.ownerName && (
                    <p><strong>Owner:</strong> {property.basicInfo.ownerName}</p>
                  )}
                  {property.basicInfo.contactNumber && (
                    <p><strong>Contact:</strong> {property.basicInfo.contactNumber}</p>
                  )}
                  {property.basicInfo.alternateNumber && (
                    <p><strong>Alt. Contact:</strong> {property.basicInfo.alternateNumber}</p>
                  )}
                  {property.basicInfo.propertyDescription && (
                    <p><strong>Description:</strong> {property.basicInfo.propertyDescription}</p>
                  )}
                </section>
              )}

              {hasAddressInfo && (
                <section className="p-3 rounded border border-teal-300 bg-teal-50">
                  <h3 className="text-teal-700 font-semibold mb-2">Address Information</h3>
                  {property.addressInfo.address && (
                    <p><strong>Address:</strong> {property.addressInfo.address}</p>
                  )}
                  {property.addressInfo.mapLink && (
                    <p>
                      <strong>Map Link:</strong>{" "}
                      <a
                        href={property.addressInfo.mapLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-teal-700 underline"
                      >
                        View Map
                      </a>
                    </p>
                  )}
                </section>
              )}

              {hasPricingInfo && (
                <section className="p-3 rounded border border-teal-300 bg-teal-50">
                  <h3 className="text-teal-700 font-semibold mb-2">Pricing Details</h3>
                  {property.pricingInfo.price && (
                    <p><strong>Price:</strong> {property.pricingInfo.price}</p>
                  )}
                  {property.pricingInfo.area && (
                    <p><strong>Area:</strong> {property.pricingInfo.area}</p>
                  )}
                  {property.pricingInfo.amenities && (
                    <p><strong>Amenities:</strong> {property.pricingInfo.amenities}</p>
                  )}
                </section>
              )}

              {hasGalleryImages && (
                <section className="p-3 rounded border border-teal-300 bg-teal-50">
                  <h3 className="text-teal-700 font-semibold mb-2">Gallery</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {property.images.galleryImages.map((img, i) => (
                      <div key={i} className="rounded overflow-hidden shadow-sm">
                        <img
                          src={typeof img === "object" ? URL.createObjectURL(img) : img}
                          alt={`Gallery Image ${i + 1}`}
                          className="w-full h-24 object-cover rounded"
                        />
                      </div>
                    ))}
                  </div>
                </section>
              )}
            </>
          )}
        </div>

        {/* Footer */}
        <div className="text-center text-xs text-teal-700 py-2 bg-white/80 backdrop-blur-sm border-t border-teal-200 select-none">
          <p>Scan to view property</p>
          <p className="mt-1">v1.0.0</p>
        </div>
      </div>
    </div>
  );
};

export default PropertyPreview;
