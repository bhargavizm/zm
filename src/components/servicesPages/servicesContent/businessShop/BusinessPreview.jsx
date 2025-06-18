'use client';

import React from 'react';
import useServicesContext from '@/components/hooks/useServiceContext';
import Template1 from '@/components/servicesPages/tabsContent/servicesContent/businessShop/templates/Template1';
import Template2 from '@/components/servicesPages/tabsContent/servicesContent/businessShop/templates/Template2';
import Template3 from '@/components/servicesPages/tabsContent/servicesContent/businessShop/templates/Template3';
import Template4 from '@/components/servicesPages/tabsContent/servicesContent/businessShop/templates/Template4';
import useDesignContext from '@/components/hooks/useDesignContext';

const Section = ({ title, children, condition }) => {
  if (!condition) return null;
  return (
    <div className="mb-6">
      <h2 className="text-xl font-semibold mb-2 text-[#008080]">{title}</h2>
      <div className="space-y-1.5 text-sm text-gray-800">{children}</div>
    </div>
  );
};

const BusinessPreview = () => {
  const { dynamicForms } = useServicesContext();
  const { bgDesign } = useDesignContext();

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
    selectedTemplate = "none",
    template1Data = { days: [] },
    template2Data = {},
    template3Data = {},
     template4Data = {},
  } = shopTimingsTemplate;

  const hasData =
    general.businessName || general.businessType || general.description || general.establishedDate || general.shopTimings ||
    contact.phone || contact.email || contact.address ||
    media.logo || media.video || (media.galleryImages?.length > 0) ||
    security.password || selectedTemplate !== "none";

  const isVideo = bgDesign?.endsWith('.mp4');
  const isImage = bgDesign && !isVideo;

  return (
    <div className='flex justify-center'>
      <div className="relative w-[350px] h-[600px] rounded-[40px] border-[14px] border-gray-800 shadow-xl overflow-hidden flex flex-col text-gray-800 bg-white">

        {/* Background Layer */}
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
          <div className="absolute inset-0 bg-gradient-to-b from-[#d1f0f0] to-white z-0" />
        )}

        {/* Notch */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-1/3 h-6 bg-gray-800 rounded-b-xl z-10" />

        {/* Content */}
        <div className="relative z-10 flex-1 overflow-y-auto scrollbar-hide pt-8 pb-4 px-4">
          {!hasData ? (
            <div className="flex items-center justify-center h-full text-center text-gray-500 text-lg font-medium">
              Start entering business details to see a live preview!
            </div>
          ) : (
            <>
              <h2 className="text-center text-xl font-bold mb-4 text-[#008080]">Business Profile</h2>

              {/* Templates */}
              {selectedTemplate === "template1" && <Template1 data={template1Data} />}
              {selectedTemplate === "template2" && <Template2 data={template2Data} />}
              {selectedTemplate === "template3" && <Template3 data={template3Data} />}
               {selectedTemplate === "template4" && <Template4 data={template4Data} />}

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

              <Section title="Security" condition={security.password}>
                <p><strong>Password:</strong> ********</p>
              </Section>
            </>
          )}
        </div>

        {/* Footer */}
        <div className="relative z-10 border-t border-gray-200 text-center text-xs text-gray-500 py-2 bg-white/70">
          <p>Scan for Business Info</p>
          <p className="mt-1">v1.0.0</p>
        </div>
      </div>
    </div>
  );
};

export default BusinessPreview;
