"use client";

import React from "react";
import useServicesContext from "@/components/hooks/useServiceContext";
import useDesignContext from "@/components/hooks/useDesignContext";
import Image from "next/image";

const VehiclePreview = () => {
  const { vehicleForm, vehicleImage } = useServicesContext();
  const { bgDesign } = useDesignContext();

  const {
    vehicleModel,
    vehicleType,
    buyDate,
    description,
    rcNumber,
    driverName,
    ownerName,
    contact,
    altContact,
    address,
    mapLink,
    password,
    selectedTemplate,
  } = vehicleForm;

  const templateImagePath = selectedTemplate
    ? `/images/normal/${selectedTemplate}`
    : null;

  const isVideo = bgDesign?.endsWith(".mp4");
  const isImage = bgDesign && !isVideo;

  return (
    <div className="relative min-h-screen">
      {/* 🔳 Background Layer */}
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
          <source src="/services-service/vehicle-info.mp4" type="video/mp4" />
        </video>
      )}

      {/* 🧊 White overlay */}
      {/* <div className="absolute inset-0 bg-white/90 backdrop-blur-sm z-10" /> */}

      {/* 📱 Content */}
      <div className="relative z-20 p-6">
        <div className="max-w-3xl mx-auto space-y-6">

          {/* Title */}
          <h2 className="text-3xl font-bold text-center text-[#008080]">
            Vehicle QR Code Preview
          </h2>

          {/* Section 1: Vehicle Info */}
          <div className="bg-white/90 backdrop-blur-md p-5 rounded-xl shadow-md">
            <h3 className="text-xl font-semibold mb-4 text-gray-800">
              Vehicle Information
            </h3>
            <div className="text-sm text-gray-700 space-y-2">
              {vehicleModel && <p><strong>Model:</strong> {vehicleModel}</p>}
              {vehicleType && <p><strong>Type:</strong> {vehicleType}</p>}
              {buyDate && <p><strong>Buy Date:</strong> {buyDate}</p>}
              {description && <p><strong>Description:</strong> {description}</p>}
            </div>
          </div>

          {/* Section 2: Vehicle & RC Images */}
          <div className="bg-white/90 backdrop-blur-md p-5 rounded-xl shadow-md space-y-4">
            <h3 className="text-xl font-semibold text-gray-800">
              Vehicle & RC Details
            </h3>

            {vehicleImage && (
              <div>
                <p className="font-semibold text-gray-700">Uploaded Vehicle Image:</p>
                <Image
                  src={vehicleImage}
                  alt="Vehicle"
                  width={300}
                  height={200}
                  className="rounded-lg mt-2"
                />
              </div>
            )}

            <div className="text-sm text-gray-700 space-y-2">
              {rcNumber && <p><strong>RC Number:</strong> {rcNumber}</p>}
              {driverName && <p><strong>Driver Name:</strong> {driverName}</p>}
              {ownerName && <p><strong>Owner Name:</strong> {ownerName}</p>}
            </div>
          </div>

          {/* Section 3: Contact & Location */}
          <div className="bg-white/90 backdrop-blur-md p-5 rounded-xl shadow-md">
            <h3 className="text-xl font-semibold mb-4 text-gray-800">
              Contact & Location
            </h3>
            <div className="text-sm text-gray-700 space-y-2">
              {contact && <p><strong>Contact:</strong> {contact}</p>}
              {altContact && <p><strong>Alternate Contact:</strong> {altContact}</p>}
              {address && <p><strong>Address:</strong> {address}</p>}
              {mapLink && (
                <p>
                  <strong>Map:</strong>{" "}
                  <a
                    href={mapLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 underline"
                  >
                    View Location
                  </a>
                </p>
              )}
              {password && <p><strong>Password Protected</strong></p>}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default VehiclePreview;
