// src/components/services/KidsSafetyPreview.jsx
'use client';

import React from 'react';
import useServicesContext from '@/components/hooks/useServiceContext';
import useDesignContext from '@/components/hooks/useDesignContext';

const PreviewSection = ({ title, children, condition }) => {
  if (!condition) return null;

  const filteredChildren = React.Children.toArray(children).filter((child) => {
    if (React.isValidElement(child)) {
      if (child.props.children) {
        return React.Children.toArray(child.props.children).some(
          (grandchild) =>
            (typeof grandchild === 'string' && grandchild.trim() !== '') ||
            (React.isValidElement(grandchild) && (grandchild.props.children || grandchild.props.src))
        );
      }
      return !!child.props.src;
    }
    return typeof child === 'string' && child.trim() !== '';
  });

  if (filteredChildren.length === 0) return null;

  return (
    <div className="mb-6 pb-2 border-b border-gray-200 last:border-b-0 last:pb-0">
      <h2 className="text-lg font-bold text-gray-800 mb-3">{title}</h2>
      <div className="space-y-1.5 text-gray-700 text-sm">{filteredChildren}</div>
    </div>
  );
};

const KidsSafetyPreview = () => {
  const { dynamicForms } = useServicesContext();
  const { bgDesign } = useDesignContext();

  const kidsSafety = dynamicForms.kidsSafety || {};

  const {
    childName = '',
    dob = '',
    classGrade = '',
    schoolName = '',
    schoolAddress = '',
    parentName = '',
    contact = '',
    altContact = [],
    homeAddress = '',
    mapLink = '',
    kidsImage = null,
  } = kidsSafety;

  const hasData =
    childName ||
    dob ||
    classGrade ||
    schoolName ||
    schoolAddress ||
    parentName ||
    contact ||
    altContact.some((v) => v?.trim() !== '') ||
    homeAddress ||
    mapLink ||
    kidsImage;

  const isVideo = bgDesign?.endsWith('.mp4');
  const isImage = bgDesign && !isVideo;

  return (
    <div className="flex justify-center">
      <div className="relative w-[300px] h-[600px] rounded-[40px] border-[14px] border-gray-800 shadow-xl overflow-hidden flex flex-col">
        {/* Background */}
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

        {/* iPhone Top Notch */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-1/3 h-6 bg-gray-800 rounded-b-xl z-10" />

        {/* Content */}
        <div className="relative z-10 flex-1 overflow-y-auto no-scrollbar pt-8 pb-4 px-4 bg-white/90">
          {hasData ? (
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-center text-[#008080]">Kid's Safety Info</h2>

              {/* Profile Image */}
              <PreviewSection title="Child Profile" condition={!!kidsImage}>
                {kidsImage && (
                  <div className="flex justify-center py-2">
                    <img
                      src={URL.createObjectURL(kidsImage)}
                      alt="Child"
                      className="w-28 h-28 object-cover rounded-full shadow-md border-2 border-[#008080]"
                    />
                  </div>
                )}
              </PreviewSection>

              {/* Child Details */}
              <PreviewSection title="Child Details" condition={childName || dob || classGrade}>
                {childName && <p><strong>Name:</strong> {childName}</p>}
                {dob && <p><strong>DOB:</strong> {dob}</p>}
                {classGrade && <p><strong>Class/Grade:</strong> {classGrade}</p>}
              </PreviewSection>

              {/* School Info */}
              <PreviewSection title="School Information" condition={schoolName || schoolAddress}>
                {schoolName && <p><strong>School:</strong> {schoolName}</p>}
                {schoolAddress && <p><strong>Address:</strong> {schoolAddress}</p>}
              </PreviewSection>

              {/* Parent Contact */}
              <PreviewSection title="Parent & Emergency Contact" condition={parentName || contact || altContact.length > 0}>
                {parentName && <p><strong>Parent:</strong> {parentName}</p>}
                {contact && <p><strong>Primary Contact:</strong> {contact}</p>}
                {altContact && altContact.filter(Boolean).length > 0 && (
                  <ul className="list-disc ml-4">
                    {altContact.filter(Boolean).map((num, i) => (
                      <li key={i}>{num}</li>
                    ))}
                  </ul>
                )}
              </PreviewSection>

              {/* Address & Map */}
              <PreviewSection title="Home Location" condition={homeAddress || mapLink}>
                {homeAddress && <p><strong>Address:</strong> {homeAddress}</p>}
                {mapLink && (
                  <p>
                    <strong>Map:</strong>{' '}
                    <a
                      href={mapLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 underline"
                    >
                      View
                    </a>
                  </p>
                )}
              </PreviewSection>
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-center text-gray-400">
              <h3 className="text-lg font-medium">Kids Safety Preview</h3>
              <p className="mt-2">Start filling the form to see preview</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="relative z-10 border-t border-gray-200 text-center text-xs text-gray-500 py-2 bg-white/70">
          <p>Scan for Child Info</p>
          <p className="mt-1">v1.0.0</p>
        </div>
      </div>
    </div>
  );
};

export default KidsSafetyPreview;
