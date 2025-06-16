// src/components/services/VehiclePreview.jsx
"use client";

import React from "react";
import useServicesContext from "@/components/hooks/useServiceContext";
import useDesignContext from "@/components/hooks/useDesignContext";

// Section Component
const PreviewSection = ({ title, children, condition }) => {
  if (!condition) return null;

  const validChildren = React.Children.toArray(children).filter((child) => {
    if (React.isValidElement(child)) {
      if (child.props?.src) return true;
      if (child.props?.children) {
        const inner = React.Children.toArray(child.props.children);
        return inner.some((c) =>
          typeof c === "string" ? c.trim() : React.isValidElement(c)
        );
      }
      return true;
    }
    return typeof child === "string" && child.trim() !== "";
  });

  if (validChildren.length === 0) return null;

  return (
    <div className="mb-6 pb-2 border-b border-gray-200 last:border-b-0 last:pb-0">
      <h2 className="text-lg font-bold text-gray-800 mb-3">{title}</h2>
      <div className="space-y-1.5 text-gray-700 text-sm">{validChildren}</div>
    </div>
  );
};

const VehiclePreview = () => {
  const { dynamicForms } = useServicesContext();
  const { bgDesign } = useDesignContext();
  const vehicle = dynamicForms.vehicle || {};

  const {
    vehicleModel = "",
    vehicleType = "",
    buyDate = "",
    description = "",
    rcNumber = "",
    driverName = "",
    ownerName = "",
    contact = "",
    altContact = [],
    address = "",
    mapLink = "",
    vehicleFrontImage = null,
    vehicleSideImage = null,
    rcImage = null,
    licenseImage = null,
    ownerImage = null,
  } = vehicle;

  const isVideo = bgDesign?.endsWith(".mp4");
  const isImage = bgDesign && !isVideo;

  const hasData =
    vehicleModel ||
    vehicleType ||
    buyDate ||
    description ||
    rcNumber ||
    driverName ||
    ownerName ||
    contact ||
    altContact.some((v) => v?.trim()) ||
    address ||
    mapLink ||
    vehicleFrontImage ||
    vehicleSideImage ||
    rcImage ||
    licenseImage ||
    ownerImage;

  return (
    <div className="flex justify-center items-center mt-10">
      <div className="relative bg-gradient-to-br from-gray-900 to-gray-800 p-3 rounded-[3rem] w-[390px] h-[640px] shadow-2xl border-4 border-gray-700 overflow-hidden">
        {/* Background Media */}
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

        {/* iPhone Notch */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-gray-900 rounded-b-xl z-20 flex items-center justify-center space-x-1">
          <div className="w-1.5 h-1.5 bg-gray-600 rounded-full"></div>
          <div className="w-12 h-3 bg-gray-700 rounded-full"></div>
        </div>

        {/* Screen */}
        <div className="bg-white h-full w-full rounded-[2.5rem] overflow-hidden flex flex-col relative z-10">
          {/* Status Bar */}
          <div className="flex justify-between items-center px-6 pt-4 text-xs font-semibold text-gray-700">
            <span>9:41</span>
            <div className="flex items-center space-x-1">
              <span>🔋</span>
              <span>📶</span>
              <span>5G</span>
            </div>
          </div>

          {/* Scrollable Content */}
          <div className="flex-grow w-full overflow-y-scroll hide-scrollbar p-6 pt-2 text-gray-800">
            {!hasData ? (
              <div className="flex justify-center items-center h-full text-gray-500 text-base font-medium text-center px-4">
                Start entering Vehicle details to see a live preview!
              </div>
            ) : (
              <div className="space-y-6">
                <PreviewSection
                  title="Vehicle Information"
                  condition={vehicleModel || vehicleType || buyDate || description}
                >
                  {vehicleModel && <p><strong>Model:</strong> <span className="font-normal">{vehicleModel}</span></p>}
                  {vehicleType && <p><strong>Type:</strong> <span className="font-normal">{vehicleType}</span></p>}
                  {buyDate && <p><strong>Purchase Date:</strong> <span className="font-normal">{buyDate}</span></p>}
                  {description && <p><strong>Description:</strong> <span className="font-normal">{description}</span></p>}
                </PreviewSection>

                <PreviewSection
                  title="Vehicle & Document Images"
                  condition={vehicleFrontImage || vehicleSideImage || rcImage || licenseImage || ownerImage}
                >
                  {(vehicleFrontImage || vehicleSideImage) && (
                    <div>
                      <p className="font-semibold text-gray-700 mb-2">Vehicle Views:</p>
                      <div className="grid grid-cols-2 gap-3 mb-4">
                        {vehicleFrontImage && (
                          <img
                            src={URL.createObjectURL(vehicleFrontImage)}
                            alt="Vehicle Front"
                            className="w-full h-28 object-cover rounded-lg border border-gray-200 shadow-sm"
                          />
                        )}
                        {vehicleSideImage && (
                          <img
                            src={URL.createObjectURL(vehicleSideImage)}
                            alt="Vehicle Side"
                            className="w-full h-28 object-cover rounded-lg border border-gray-200 shadow-sm"
                          />
                        )}
                      </div>
                    </div>
                  )}
                  {(rcImage || licenseImage) && (
                    <div>
                      <p className="font-semibold text-gray-700 mb-2">Documents:</p>
                      <div className="grid grid-cols-2 gap-3 mb-4">
                        {rcImage && (
                          <img
                            src={URL.createObjectURL(rcImage)}
                            alt="RC Document"
                            className="w-full h-28 object-cover rounded-lg border border-gray-200 shadow-sm"
                          />
                        )}
                        {licenseImage && (
                          <img
                            src={URL.createObjectURL(licenseImage)}
                            alt="Driving License"
                            className="w-full h-28 object-cover rounded-lg border border-gray-200 shadow-sm"
                          />
                        )}
                      </div>
                    </div>
                  )}
                  {ownerImage && (
                    <div>
                      <p className="font-semibold text-gray-700 mb-2">Owner Photo:</p>
                      <div className="flex justify-center">
                        <img
                          src={URL.createObjectURL(ownerImage)}
                          alt="Owner"
                          className="w-24 h-24 object-cover rounded-full shadow-md border-2 border-gray-300"
                        />
                      </div>
                    </div>
                  )}
                </PreviewSection>

                <PreviewSection
                  title="Driver & Owner Info"
                  condition={rcNumber || driverName || ownerName}
                >
                  {rcNumber && <p><strong>RC Number:</strong> <span className="font-normal">{rcNumber}</span></p>}
                  {driverName && <p><strong>Driver Name:</strong> <span className="font-normal">{driverName}</span></p>}
                  {ownerName && <p><strong>Owner Name:</strong> <span className="font-normal">{ownerName}</span></p>}
                </PreviewSection>

                <PreviewSection
                  title="Contact & Location"
                  condition={contact || altContact.length > 0 || address || mapLink}
                >
                  {contact && <p><strong>Contact:</strong> <span className="font-normal">{contact}</span></p>}
                  {altContact.filter(Boolean).length > 0 && (
                    <div>
                      <p><strong>Alternate Contacts:</strong></p>
                      <ul className="list-disc list-inside ml-4">
                        {altContact.filter(Boolean).map((alt, idx) => (
                          <li key={idx}><span className="font-normal">{alt}</span></li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {address && <p><strong>Address:</strong> <span className="font-normal">{address}</span></p>}
                  {mapLink && (
                    <p>
                      <strong>Map:</strong>{" "}
                      <a
                        href={mapLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline font-normal"
                      >
                        View Location
                      </a>
                    </p>
                  )}
                </PreviewSection>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VehiclePreview;
