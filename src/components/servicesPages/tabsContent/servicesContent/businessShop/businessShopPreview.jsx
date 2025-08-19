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
  const { businessShopFormData } = useServicesContext();
  const { bgDesign, setBgDesign, isLoading, setIsLoading } = useDesignContext();

  const templateNum = businessShopFormData.selectedTemplate?.replace("template", "") || "1";
  const backgroundImageUrl = `/images/templates/businessShop${templateNum}.webp`;

  const isVideo = bgDesign?.endsWith(".mp4") || bgDesign?.endsWith(".webm");
  const isImage = bgDesign && !isVideo;
  const gallery = Array.isArray(businessShopFormData.shopImages) ? businessShopFormData.shopImages : [];

  const getMediaSrc = (fileOrUrl) => {
    if (!fileOrUrl) return "";
    return typeof fileOrUrl === "string" ? fileOrUrl : URL.createObjectURL(fileOrUrl);
  };

  useEffect(() => {
    setBgDesign(null);
    setIsLoading(false);
  }, []);

  return (
    <div className="flex justify-center items-center w-full">
      <div className="relative w-[350px] h-[650px] border-[10px] border-gray-800 rounded-[36px] overflow-hidden shadow-2xl bg-white">
        {/* Background Layer */}
        {isImage && (
          <img
            src={bgDesign}
            alt="Background"
            onLoad={() => setTimeout(() => setIsLoading(false), 300)}
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
            onLoadedData={() => setTimeout(() => setIsLoading(false), 300)}
            className="absolute inset-0 w-full h-full object-cover z-0"
          />
        )}
        {!bgDesign && (
          <img
            src={backgroundImageUrl}
            onLoad={() => setTimeout(() => setIsLoading(false), 300)}
            className="absolute inset-0 w-full h-full object-cover z-0"
          />
        )}

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/10 backdrop-blur-[1px] z-0" />

        {/* Loading Spinner */}
        {isLoading && (
          <div className="absolute inset-0 z-40 bg-mainGreen/50 backdrop-blur-sm flex justify-center items-center">
            <Image
              src="/logos/ZM LOGO.webp"
              alt="Loading"
              width={80}
              height={80}
              className="w-20 h-20 animate-bounce"
            />
          </div>
        )}

        {/* Content */}
        <div className="relative z-10 p-4 overflow-y-auto scrollbar-hide h-full">
          {/* Logo & Name */}
          <div className="flex flex-col items-center justify-center mb-6">
            {businessShopFormData.shopLogo && (
              <div className="relative w-28 h-28 rounded-xl overflow-hidden border-2 border-white bg-white/90 backdrop-blur-sm shadow">
                <img
                  src={getMediaSrc(businessShopFormData.shopLogo)}
                  alt="Business Logo"
                  className="w-full h-full object-center"
                />
              </div>
            )}
            {businessShopFormData.businessName && (
              <div className="bg-white/90 mt-3 rounded-xl px-2 py-1 backdrop-blur-sm">
                <h1 className="text-xl font-bold text-center text-[#008080]">
                  {businessShopFormData.businessName}
                </h1>
              </div>
            )}
          </div>

          {/* Business Info */}
          <Section
            title="Business Info"
            condition={
              businessShopFormData.businessType ||
              businessShopFormData.description ||
              businessShopFormData.shopTimings
            }
          >
            {businessShopFormData.businessType && (
              <p><strong>Type:</strong> {businessShopFormData.businessType}</p>
            )}
            {businessShopFormData.description && (
              <p><strong>Description:</strong> {businessShopFormData.description}</p>
            )}
            {businessShopFormData.shopTimings && (
              <p><strong>Timings:</strong> {businessShopFormData.shopTimings}</p>
            )}
            {businessShopFormData.discount && (
              <p className="text-red-600 font-medium"><strong>Offer:</strong> {businessShopFormData.discount}</p>
            )}
          </Section>

          {/* Contact Info */}
          <Section
            title="Contact Info"
            condition={
              businessShopFormData.contact?.ownerName ||
              businessShopFormData.contact?.phone ||
              businessShopFormData.contact?.altPhone ||
              businessShopFormData.contact?.email ||
              businessShopFormData.contact?.address
            }
          >
            {businessShopFormData.contact?.ownerName && (
              <p><strong>Owner:</strong> {businessShopFormData.contact.ownerName}</p>
            )}
            {businessShopFormData.contact?.phone && (
              <p><strong>Phone:</strong> {businessShopFormData.contact.phone}</p>
            )}
            {businessShopFormData.contact?.altPhone && (
              <p><strong>Alt Phone:</strong> {businessShopFormData.contact.altPhone}</p>
            )}
            {businessShopFormData.contact?.email && (
              <p><strong>Email:</strong> {businessShopFormData.contact.email}</p>
            )}
            {businessShopFormData.contact?.address && (
              <p><strong>Address:</strong> {businessShopFormData.contact.address}</p>
            )}
          </Section>

          {/* Media Gallery */}
          <Section title="Media Gallery" condition={gallery.length > 0}>
            <p className="font-medium mb-2">Photo Gallery:</p>
            <div className="grid grid-cols-2 gap-2">
             {gallery.map((img) => {
  const key = typeof img === "string" ? img : img.name || URL.createObjectURL(img);
  return (
    <div key={key} className="aspect-square overflow-hidden rounded-lg border">
      <img
        src={getMediaSrc(img)}
        alt="Gallery"
        className="w-full h-full object-center"
      />
    </div>
  );
})}

            </div>
          </Section>
        </div>
      </div>
    </div>
  );
};

export default BusinessShopPreview;
