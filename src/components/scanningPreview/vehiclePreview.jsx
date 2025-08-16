'use client';
import React, { useEffect } from 'react';
import Image from 'next/image';
import { FiUser, FiPhone, FiTruck } from 'react-icons/fi';
import useDesignContext from '../hooks/useDesignContext';
import BgDesignRenderer from './bgDesignRender';

const resolveImageUrl = (image) => {
  if (image instanceof File) return URL.createObjectURL(image);
  if (typeof image === 'string') return image;
  return null;
};

const Section = ({ title, children, condition }) => {
  if (!condition) return null;
  return (
    <div className="mb-4 px-4">
      <div className="bg-white/80 backdrop-blur-md rounded-xl shadow-md p-4">
        <h2 className="text-xl font-semibold mb-2 text-[#008080]">{title}</h2>
        <div className="space-y-1.5 text-sm text-gray-800">{children}</div>
      </div>
    </div>
  );
};

const VehiclePreview = ({ data }) => {
  const {
    general = {},
    registration = {},
    contact = {},
    media = {},
    createdAt,
    password = '',
    vehicleTemplate = 'none',
    bgDesign: incomingBgDesign,
  } = data || {};

  const { bgDesign, setBgDesign, isLoading, setIsLoading } = useDesignContext();

  const templateBgMap = {
    templateV1: "/images/back/bgcar.webp",
    templateV2: "/images/back/bgauto.webp",
    templateV3: "/images/back/bglorry.webp",
    templateV4: "/images/back/bgbike.webp",
  };

  const templateBackground = templateBgMap[vehicleTemplate] || null;
  const useTemplateBg = vehicleTemplate !== 'none' && templateBackground;

  const isVideo = bgDesign?.endsWith('.mp4') || bgDesign?.endsWith('.webm');
  const isImage = bgDesign && !isVideo;

  useEffect(() => {
    setBgDesign(incomingBgDesign || templateBackground || null);
    setIsLoading(false);
  }, [incomingBgDesign, templateBackground]);

  const hasData =
    general.vehicleModel ||
    general.vehicleType ||
    general.vehicleNumber ||
    general.description ||
    registration.rcNumber ||
    registration.driverName ||
    registration.ownerName ||
    contact.contact ||
    contact.altContact ||
    contact.address ||
    contact.mapLink ||
    media.vehicleImage ||
    media.licenseFront ||
    media.licenseBack ||
    media.rcFront ||
    media.rcBack ||
    media.pollution ||
    (media.galleryImages?.length > 0) ||
    (media.insurance?.length > 0) ||
    password;

  return (
    <div >
      <div >

        {/* Background Layer */}
        {/* {isVideo && (
          <video
            src={bgDesign}
            autoPlay
            loop
            muted
            playsInline
            onLoadedData={() => setTimeout(() => setIsLoading(false), 300)}
            className="absolute inset-0 w-full h-full object-center z-0"
          />
        )}
        {isImage && (
          <img
            src={bgDesign}
            alt="Background Design"
            onLoad={() => setTimeout(() => setIsLoading(false), 300)}
            className="absolute inset-0 w-full h-full object-center z-0"
          />
        )} */}
        <BgDesignRenderer bgDesign={bgDesign} />
        {useTemplateBg && (
          <img
            src={templateBackground}
            alt="Template Background"
            className="absolute inset-0 w-full h-full opacity-70 object-cover z-10 p-2 pointer-events-none"
          />
        )}
        {!isVideo && !isImage && !useTemplateBg && (
          <div className="absolute inset-0 bg-gradient-to-b from-[#d1f0f0] to-white z-0" />
        )}


        {/* Content */}
        <div className="relative z-10 flex-1 overflow-y-auto scrollbar-hide pt-8 pb-4">
          {!hasData ? (
            <div className="flex items-center justify-center h-full text-center text-gray-500 text-lg font-medium px-4">
              Start entering vehicle details to see a live preview!
            </div>
          ) : (
            <div>
              {/* Vehicle Image */}
              {resolveImageUrl(media.vehicleImage) && (
                <div className="flex justify-center mb-4 px-4">
                  <div className="bg-white/70 backdrop-blur-md rounded-xl shadow-md p-2 w-40 h-40 flex items-center justify-center overflow-hidden">
                    <img
                      src={resolveImageUrl(media.vehicleImage)}
                      alt="Main Vehicle"
                      className="w-full h-full object-center "
                    />
                  </div>
                </div>
              )}

              <h2 className="text-center text-xl font-bold mb-4 text-[#008080]">
                Vehicle Profile
              </h2>

              <Section
                title="General Information"
                condition={
                  general.vehicleModel ||
                  general.vehicleType ||
                  general.vehicleNumber ||
                  general.description
                }
              >
                {general.vehicleModel && (
                  <p><strong>Name:</strong> {general.vehicleModel}</p>
                )}
                {general.vehicleType && (
                  <p><strong>Type:</strong> {general.vehicleType}</p>
                )}
                {general.vehicleNumber && (
                  <p><strong>Vehicle Number:</strong> {general.vehicleNumber}</p>
                )}
                {general.description && (
                  <p><strong>Description:</strong> {general.description}</p>
                )}
              </Section>

              <Section
                title="Registration Details"
                condition={
                  registration.rcNumber ||
                  registration.driverName ||
                  registration.ownerName
                }
              >
                {registration.rcNumber && (
                  <p><strong>RC Number:</strong> {registration.rcNumber}</p>
                )}
                {registration.driverName && (
                  <p><strong>Driver Name:</strong> {registration.driverName}</p>
                )}
                {registration.ownerName && (
                  <p><strong>Owner Name:</strong> {registration.ownerName}</p>
                )}
              </Section>

              <Section
                title="Contact Information"
                condition={
                  contact.contact ||
                  contact.altContact ||
                  contact.address ||
                  contact.mapLink
                }
              >
                {contact.contact && (
                  <p><strong>Contact:</strong> {contact.contact}</p>
                )}
                {contact.altContact && (
                  <p><strong>Alt. Contact:</strong> {contact.altContact}</p>
                )}
                {contact.address && (
                  <p><strong>Address:</strong> {contact.address}</p>
                )}
                {contact.mapLink && (
                  <p>
                    <strong>Map Link:</strong>{" "}
                    <a
                      href={contact.mapLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      {contact.mapLink}
                    </a>
                  </p>
                )}
              </Section>

              <Section
                title="Additional Images"
                condition={
                  media.licenseFront ||
                  media.licenseBack ||
                  media.rcFront ||
                  media.rcBack ||
                  media.pollution ||
                  media.galleryImages?.length > 0 ||
                  media.insurance?.length > 0
                }
              >
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                  {resolveImageUrl(media.licenseFront) && (
                    <div>
                      <p className="font-medium text-lg mb-3">License Front:</p>
                      <img src={resolveImageUrl(media.licenseFront)} alt="License Front" className="w-50 h-50 object-center" />
                    </div>
                  )}
                  {resolveImageUrl(media.licenseBack) && (
                    <div>
                      <p className="font-medium text-lg mb-3">License Back:</p>
                      <img src={resolveImageUrl(media.licenseBack)} alt="License Back" className="w-50 h-50 object-center" />
                    </div>
                  )}
                  {resolveImageUrl(media.rcFront) && (
                    <div>
                      <p className="font-medium text-lg mb-3">RC Front:</p>
                      <img src={resolveImageUrl(media.rcFront)} alt="RC Front" className="w-50 h-50 object-center" />
                    </div>
                  )}
                  {resolveImageUrl(media.rcBack) && (
                    <div>
                      <p className="font-medium text-lg mb-3">RC Back:</p>
                      <img src={resolveImageUrl(media.rcBack)} alt="RC Back" className="w-50 h-50 object-center" />
                    </div>
                  )}
                  {resolveImageUrl(media.pollution) && (
                    <div>
                      <p className="font-medium text-lg mb-3">Pollution:</p>
                      <img src={resolveImageUrl(media.pollution)} alt="Pollution" className="w-50 h-50 object-center" />
                    </div>
                  )}
                  {media.galleryImages?.map((img, idx) => {
                    const src = resolveImageUrl(img);
                    return src ? (
                      <div key={idx}>
                        <p className="font-medium text-lg mb-3">Gallery {idx + 1}:</p>
                        <img src={src} alt={`Gallery ${idx + 1}`} className="w-50 h-50 object-center" />
                      </div>
                    ) : null;
                  })}
                  {media.insurance?.map((img, idx) => {
                    const src = resolveImageUrl(img);
                    return src ? (
                      <div key={idx}>
                        <p className="font-medium text-lg mb-3">Insurance {idx + 1}:</p>
                        <img src={src} alt={`Insurance ${idx + 1}`} className="w-50 h-50 object-center" />
                      </div>
                    ) : null;
                  })}
                </div>
              </Section>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default VehiclePreview;
