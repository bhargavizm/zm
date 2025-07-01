"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import useServicesContext from "@/components/hooks/useServiceContext";
import useDesignContext from "@/components/hooks/useDesignContext";
import Template1 from "@/components/servicesPages/tabsContent/servicesContent/businessShop/templates/Template1";
import Template2 from "@/components/servicesPages/tabsContent/servicesContent/businessShop/templates/Template2";
import Template3 from "@/components/servicesPages/tabsContent/servicesContent/businessShop/templates/Template3";
import Template4 from "@/components/servicesPages/tabsContent/servicesContent/businessShop/templates/Template4";

const Section = ({ title, children, condition }) => {
  if (!condition) return null;
  return (
    <div className="mb-4">
      <div className="bg-white rounded-lg shadow-sm p-4">
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

  const {
    selectedTemplate = "template1",
    template1Data = { days: [] },
    template2Data = {},
    template3Data = {},
    template4Data = {},
  } = shopTimingsTemplate;

 const isVideo = bgDesign?.endsWith(".mp4") || bgDesign?.endsWith(".webm");
  const isImage = bgDesign && !isVideo;

  const hasData =
    general.businessName || general.businessType || general.description || general.establishedDate || general.shopTimings ||
    contact.phone || contact.altPhone || contact.email || contact.address ||
    media.logo || media.video || (media.galleryImages?.length > 0) ||
    security.password || selectedTemplate;

  // 🔄 Reset bg and stop loader on mount
  useEffect(() => {
    setBgDesign(null);
    setIsLoading(false);
  }, []);

  // 📌 Render selected template
  const renderSelectedTemplate = () => {
    switch (selectedTemplate) {
      case "template2":
        return <Template2 data={template2Data} />;
      case "template3":
        return <Template3 data={template3Data} />;
      case "template4":
        return <Template4 data={template4Data} />;
      default:
        return <Template1 data={template1Data} />;
    }
  };

  return (
    <div className="flex justify-center items-center w-full">
      <div className="relative w-[350px] h-[650px] border-[14px] border-gray-800 rounded-[36px] overflow-hidden shadow-2xl bg-white">

        {/* 🌄 Background Layer */}
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
        {!bgDesign && <div className="absolute inset-0 bg-white z-0" />}

        {/* ⏳ Loading */}
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

        {/* 🧾 Content */}
        <div className="relative z-10 h-full  overflow-y-auto scrollbar-hide pt-8 pb-4 px-4">
          {!hasData ? (
            <div className="flex items-center justify-center h-full text-center text-gray-500 text-lg font-medium">
              Start entering business details to see a live preview!
            </div>
          ) : (
            <>
              <div className="bg-white rounded-lg shadow-sm p-4">
                <h2 className="text-center text-xl font-bold mb-2 text-[#008080]">Business Profile</h2>
              </div>

              {/* Templates */}
              {selectedTemplate === "template1" && (
                <div className="bg-white/70 rounded-lg shadow-sm p-4">
                  <Template1 data={template1Data} />
                </div>
              )}
              {selectedTemplate === "template2" && (
                <div className="bg-white/70 rounded-lg shadow-sm p-4">
                  <Template2 data={template2Data} />
                </div>
              )}
              {selectedTemplate === "template3" && (
                <div className="bg-white/70 rounded-lg shadow-sm p-4">
                  <Template3 data={template3Data} />
                </div>
              )}
              {selectedTemplate === "template4" && (
                <div className="bg-white/70 rounded-lg shadow-sm p-4">
                  <Template4 data={template2Data} />
                </div>
              )}

              {/* Info Sections */}
              <Section
                title="Business Info"
                condition={general.businessName || general.businessType || general.description || general.establishedDate || general.shopTimings}
              >
                {general.businessName && <p><strong>Name:</strong> {general.businessName}</p>}
                {general.businessType && <p><strong>Type:</strong> {general.businessType}</p>}
                {general.description && <p><strong>Description:</strong> {general.description}</p>}
                {general.establishedDate && <p><strong>Established:</strong> {general.establishedDate}</p>}
                {general.shopTimings && <p><strong>Timings:</strong> {general.shopTimings}</p>}
              </Section>

              <Section
                title="Contact Info"
                condition={contact.phone || contact.email || contact.address}
              >
                {contact.phone && <p><strong>Phone:</strong> {contact.phone}</p>}
                {contact.altPhone && <p><strong>Alternate Phone:</strong> {contact.altPhone}</p>}
                {contact.email && <p><strong>Email:</strong> {contact.email}</p>}
                {contact.address && <p><strong>Address:</strong> {contact.address}</p>}
              </Section>

              <Section
                title="Media"
                condition={media.logo || media.video || (media.galleryImages?.length > 0)}
              >
                {media.logo && (
                  <div className="mb-2">
                    <p className="font-medium">Logo:</p>
                    <img
                      src={URL.createObjectURL(media.logo)}
                      alt="Logo"
                      className="w-20 h-20 object-cover rounded border"
                    />
                  </div>
                )}
                {media.video && (
                  <div className="mb-2">
                    <p className="font-medium">Video:</p>
                    <video
                      src={URL.createObjectURL(media.video)}
                      controls
                      className="w-full rounded border"
                    />
                  </div>
                )}
                {media.galleryImages?.length > 0 && (
                  <div>
                    <p className="font-medium mb-1">Gallery:</p>
                    <div className="grid grid-cols-2 gap-2">
                      {media.galleryImages.map((img, idx) => (
                        <img
                          key={idx}
                          src={URL.createObjectURL(img)}
                          alt={`Gallery ${idx + 1}`}
                          className="w-full h-20 object-cover border rounded"
                        />
                      ))}
                    </div>
                  </div>
                )}
              </Section>

             
            </>
          )}
        </div>

        {/* Footer */}
        <div className="relative z-10 border-t border-gray-200 text-center text-xs text-gray-500 py-2 bg-white/90">
          <p>Scan for Business Info</p>
          <p className="mt-1">v1.0.0</p>
        </div>
      </div>
    </div>
  );
};

export default BusinessShopPreview;
