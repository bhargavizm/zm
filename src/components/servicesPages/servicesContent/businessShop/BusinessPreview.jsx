'use client';

import React from 'react';
import useServicesContext from '@/components/hooks/useServiceContext';

const Section = ({ title, children, condition }) => {
  if (!condition) return null;
  return (
    <div className="mb-6">
      <h2 className="text-xl font-semibold mb-2">{title}</h2>
      {children}
    </div>
  );
};

const BusinessPreview = () => {
  const { dynamicForms } = useServicesContext();
  const businessInfo = dynamicForms.businessInfo;

  const { general, contact, media, security } = businessInfo;

  return (
    <div className="p-4 border rounded shadow space-y-6 bg-white text-gray-800">

      <Section title="Business Info" condition={
        general.businessName || general.businessType || general.description || general.establishedDate || general.shopTimings
      }>
        {general.businessName && <p><strong>Name:</strong> {general.businessName}</p>}
        {general.businessType && <p><strong>Type:</strong> {general.businessType}</p>}
        {general.description && <p><strong>Description:</strong> {general.description}</p>}
        {general.establishedDate && <p><strong>Established:</strong> {general.establishedDate}</p>}
        {general.shopTimings && <p><strong>Timings:</strong> {general.shopTimings}</p>}
      </Section>

      <Section title="Contact Info" condition={
        contact.phone || contact.email || contact.address
      }>
        {contact.phone && <p><strong>Phone:</strong> {contact.phone}</p>}
        {contact.email && <p><strong>Email:</strong> {contact.email}</p>}
        {contact.address && <p><strong>Address:</strong> {contact.address}</p>}
      </Section>

      <Section title="Media" condition={
        media.logo || media.video || (media.galleryImages?.length > 0)
      }>
        {media.logo && (
          <div className="mb-2">
            <p className="font-medium">Logo:</p>
            <img src={URL.createObjectURL(media.logo)} alt="Logo" className="w-32 h-32 object-cover rounded border" />
          </div>
        )}
        {media.video && (
          <div className="mb-2">
            <p className="font-medium">Video:</p>
            <video src={URL.createObjectURL(media.video)} controls className="w-full max-w-md rounded border" />
          </div>
        )}
        {media.galleryImages?.length > 0 && (
          <div>
            <p className="font-medium mb-1">Gallery:</p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {media.galleryImages.map((img, idx) => (
                <img key={idx} src={URL.createObjectURL(img)} alt={`Gallery ${idx + 1}`}
                  className="w-full h-32 object-cover border rounded" />
              ))}
            </div>
          </div>
        )}
      </Section>

      <Section title="Security" condition={security.password}>
        <p><strong>Password:</strong> ********</p>
      </Section>
    </div>
  );
};

export default BusinessPreview;
