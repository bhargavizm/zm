"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import useServicesContext from "@/components/hooks/useServiceContext";
import useDesignContext from "@/components/hooks/useDesignContext";

const Section = ({ title, children, condition }) => {
  if (!condition) return null;
  return (
    <div className="mb-4">
      <div className="bg-white/90 rounded-lg shadow-sm p-4 backdrop-blur-sm">
        <h2 className="text-lg font-semibold mb-2 text-[#008080]">{title}</h2>
        <div className="space-y-2 text-sm text-gray-800">{children}</div>
      </div>
    </div>
  );
};

const BusinessShopPreview = () => {
  const { dynamicForms } = useServicesContext();
  const { bgDesign, setBgDesign, isLoading, setIsLoading } = useDesignContext();

  const {
    businessInfo = {},
    shopTimingsTemplate = {}
  } = dynamicForms;

  const {
    general = {},
    contact = {},
    media = {},
    security = {}
  } = businessInfo;

  // Get the selected template number (1-4)
  const templateNum = shopTimingsTemplate.selectedTemplate?.replace('template', '') || '1';
  const backgroundImageUrl = `/images/templates/businessShop${templateNum}.webp`;

  const isVideo = bgDesign?.endsWith(".mp4") || bgDesign?.endsWith(".webm");
  const isImage = bgDesign && !isVideo;
  const gallery = Array.isArray(media.galleryImages) ? media.galleryImages : [];

  const getMediaSrc = (fileOrUrl) => {
    if (!fileOrUrl) return "";
    return typeof fileOrUrl === "string" ? fileOrUrl : URL.createObjectURL(fileOrUrl);
  };

  const hasData =
    general.businessName || general.businessType || general.description || 
    general.establishedDate || general.shopTimings || general.discount ||
    contact.phone || contact.altPhone || contact.email || contact.address ||
    media.logo || media.video || gallery.length > 0 ||
    security.password;

  useEffect(() => {
    setBgDesign(null);
    setIsLoading(false);
  }, []);

  return (
    <div className="flex justify-center items-center w-full">
      <div className="relative w-[350px] h-[650px] border-[14px] border-gray-800 rounded-[36px] overflow-hidden shadow-2xl">

        {/* Background Layer - Template Image */}
        <div 
          className="absolute inset-0 w-full h-full z-0"
          style={{
            backgroundImage: `url(${backgroundImageUrl})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            filter: 'brightness(0.9)'
          }}
        >
          {/* Overlay for better readability */}
          <div className="absolute inset-0 bg-black/10 backdrop-blur-[1px]"></div>
        </div>

        {/* Loading */}
        {isLoading && (
          <div className="absolute inset-0 z-50 bg-mainGreen backdrop-blur-sm flex justify-center items-center">
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
        <div className="relative z-10 h-full overflow-y-auto scrollbar-hide pt-8 pb-4 px-4">
          {!hasData ? (
            <div className="flex items-center justify-center h-full text-center text-gray-500 text-lg font-medium">
              Start entering business details to see a live preview!
            </div>
          ) : (
            <>
              {/* Logo Section */}
              <div className="flex flex-col items-center justify-center mb-6">
                {media.logo && (
                  <div className="relative w-32 h-32 rounded-full shadow-lg overflow-hidden border-2 border-teal-100 bg-white/90 backdrop-blur-sm">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <img
                        src={getMediaSrc(media.logo)}
                        alt="Business Logo"
                        className="min-w-full min-h-full object-cover"
                        style={{
                          borderRadius: '50%',
                          aspectRatio: '1/1'
                        }}
                      />
                    </div>
                  </div>
                )}
                {general.businessName && (
                  <div className="bg-white/90 mt-5 rounded-2xl pb-2 px-2 backdrop-blur-sm">
                    <h1 className="text-xl font-bold mt-3 text-center text-[#008080]">
                      {general.businessName}
                    </h1>
                  </div>
                )}
              </div>

              {/* Info Sections */}
              <Section
                title="Business Info"
                condition={general.businessType || general.description || general.establishedDate || general.shopTimings}
              >
                {general.businessType && <p><strong>Type:</strong> {general.businessType}</p>}
                {general.description && <p><strong>Description:</strong> {general.description}</p>}
                {general.establishedDate && <p><strong>Established:</strong> {general.establishedDate}</p>}
                {general.shopTimings && <p><strong>Timings:</strong> {general.shopTimings}</p>}
                {general.discount && <p className="text-red-600 font-medium"><strong>Special Offer:</strong> {general.discount}</p>}
              </Section>

              <Section
                title="Contact Info"
                condition={contact.owner || contact.phone || contact.altPhone || contact.email || contact.address}
              >
                {contact.owner && <p><strong>Owner:</strong> {contact.owner}</p>}
                {contact.phone && <p><strong>Phone:</strong> {contact.phone}</p>}
                {contact.altPhone && <p><strong>Alternate Phone:</strong> {contact.altPhone}</p>}
                {contact.email && <p><strong>Email:</strong> {contact.email}</p>}
                {contact.address && <p><strong>Address:</strong> {contact.address}</p>}
              </Section>

              <Section
                title="Media Gallery"
                condition={media.video || gallery.length > 0}
              >
                {media.video && (
                  <div className="mb-4">
                    <p className="font-medium">Promotional Video:</p>
                    <video
                      src={getMediaSrc(media.video)}
                      controls
                      className="w-full rounded-lg border mt-2"
                    />
                  </div>
                )}
                {gallery.length > 0 && (
                  <div>
                    <p className="font-medium mb-2">Photo Gallery:</p>
                    <div className="grid grid-cols-2 gap-2">
                      {gallery.map((img, idx) => (
                        <div key={idx} className="aspect-square overflow-hidden rounded-lg border">
                          <img
                            src={getMediaSrc(img)}
                            alt={`Gallery ${idx + 1}`}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </Section>
            </>
          )}
        </div>

        {/* Footer */}
        <div className="relative z-10 border-t border-gray-200 text-center text-xs text-gray-500 py-2 bg-white/90 backdrop-blur-sm">
          <p>Scan for Business Info</p>
          <p className="mt-1">v1.0.0</p>
        </div>
      </div>
    </div>
  );
};

export default BusinessShopPreview;