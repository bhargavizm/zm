"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import useServicesContext from "@/components/hooks/useServiceContext";
import useDesignContext from "@/components/hooks/useDesignContext";
import BgDesignRenderer from "./bgDesignRender";
import { FiHome, FiUser, FiPhone, FiMapPin, FiImage } from "react-icons/fi";

const PropertyPreview = ({ data }) => {
  const defaultBg = "/services-service/property.webp";
  const { bgDesign, setBgDesign } = useDesignContext();
  const { propertyFormData } = useServicesContext();

  // Use passed data if available, else fallback to context data
  const filledData = data && Object.keys(data).length ? data : propertyFormData || {};

  // Extract fields
  const basicInfo = filledData.basicInfo || {};
  const addressInfo = filledData.addressInfo || {};
  const images = filledData.images || {};

  const {
    propertyName,
    propertyType,
    ownerName,
    contactNumber,
    alternateNumber,
  } = basicInfo;

  const { address, mapLink } = addressInfo;

  const galleryImages = Array.isArray(images.galleryImages)
    ? images.galleryImages.filter((img) => img?.trim() !== "")
    : [];

  const dataBgDesign = filledData.bgDesign;

  const hasData =
    propertyName ||
    propertyType ||
    ownerName ||
    contactNumber ||
    alternateNumber ||
    address ||
    mapLink ||
    galleryImages.length > 0;

  useEffect(() => {
    if (dataBgDesign) {
      setBgDesign(dataBgDesign);
    } else {
      setBgDesign(defaultBg);
    }
  }, [dataBgDesign, setBgDesign]);

  return (
     <div className="w-full px-6 min-h-screen">
      <div className="relative min-h-screen">
      <div>
        {/* Background */}
        <BgDesignRenderer bgDesign={bgDesign} defaultBg={defaultBg} />

        {/* Content */}
        <div className="relative flex-1 w-full bg-white/70 m-2 rounded-xl overflow-y-auto pt-6 pb-3 px-3 z-20 min-h-[250px]">
          {hasData ? (
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-center text-[#008080]">
                Property Details Preview
              </h2>

              {propertyName && (
                <PreviewCard icon={<FiHome />} label="Property Name" value={propertyName} />
              )}

              {propertyType && (
                <PreviewCard icon={<FiHome />} label="Property Type" value={propertyType} />
              )}

              {ownerName && (
                <PreviewCard icon={<FiUser />} label="Owner Name" value={ownerName} />
              )}

              {contactNumber && (
                <PreviewCard icon={<FiPhone />} label="Contact Number" value={contactNumber} />
              )}

              {alternateNumber && (
                <PreviewCard icon={<FiPhone />} label="Alternate Number" value={alternateNumber} />
              )}

              {address && (
                <PreviewCard icon={<FiMapPin />} label="Address" value={address} />
              )}

              {mapLink && (
                <PreviewCard
                  icon={<FiMapPin />}
                  label="Map Link"
                  value={
                    <a
                      href={mapLink}
                      target="_blank"
                      rel="noreferrer"
                      className="text-blue-600 underline break-all"
                    >
                      {mapLink}
                    </a>
                  }
                />
              )}

              {galleryImages.length > 0 && (
                <div className="bg-[#008080]/10 p-3 rounded border border-[#008080]/20">
                  <div className="flex items-center text-[#008080] mb-2">
                    <FiImage className="mr-2" />
                    <span className="font-medium">Gallery Images</span>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {galleryImages.map((img, idx) => (
                      <div key={idx} className="rounded overflow-hidden">
                        <Image
                          src={img}
                          alt={`property-image-${idx}`}
                          width={300}
                          height={200}
                          className="w-full h-auto object-cover rounded shadow"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-center text-gray-400">
              <FiHome className="text-4xl mb-4 text-[#008080]" />
              <h3 className="text-lg font-medium">Property Preview</h3>
              <p className="mt-2">No property data found.</p>
            </div>
          )}
        </div>
      </div>
    </div>
    </div>
  );
};

// Reusable preview field block
const PreviewCard = ({ icon, label, value }) => (
  <div className="bg-[#008080]/10 p-3 rounded border border-[#008080]/20">
    <div className="flex items-center text-[#008080] mb-1">
      <span className="mr-2">{icon}</span>
      <span className="font-medium">{label}</span>
    </div>
    <div className="break-words max-w-full whitespace-pre-wrap">{value}</div>
  </div>
);

export default PropertyPreview;
