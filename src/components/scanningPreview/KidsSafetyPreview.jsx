'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';

export default function KidsSafetyPreview({ data }) {
  const [isLoading, setIsLoading] = useState(true);

  if (!data) return <p>No data found.</p>;

  const {
    bgDesign = '/services-service/kid-safety.webp',
    childName,
    dob,
    schoolName,
    schoolAddress,
    schoolContact,
    parentName,
    contact,
    contact2,
    altContact = [],
    homeAddress,
    kidsImage = [],
    qrCodeDetails = {},
  } = data;

  const isVideo = bgDesign?.endsWith('.mp4') || bgDesign?.endsWith('.webm');
  const isImage = bgDesign && !isVideo;

  useEffect(() => {
    setIsLoading(true);
  }, [bgDesign]);

  return (
    <div className="flex justify-center">
      <div className="relative w-[350px] h-[600px]  shadow-xl overflow-hidden">
        {/* 🖼 Background */}
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

        {/* 🔄 Loader */}
        {isLoading && (
          <div className="absolute inset-0 bg-mainGreen/70 backdrop-blur-sm z-50 flex justify-center items-center">
            <Image
              src="/logos/ZM LOGO.webp"
              alt="Loading"
              width={80}
              height={80}
              className="animate-bounce"
            />
          </div>
        )}

        {/* 📱 Top notch */}
        <div className="" />

        {/* 🔒 Safe content */}
        <div className="relative z-10 flex-1 overflow-y-auto scrollbar-hide p-6 pt-12 m-4 rounded-xl bg-white/70 space-y-4 text-sm text-gray-800">
          <h2 className="text-lg font-bold text-center text-[#008080] mb-2">
            👶 Kid's Safety Info
          </h2>

          {kidsImage.length > 0 && (
            <div className="flex justify-center py-2">
              <img
                src={kidsImage[0]?.url}
                alt={kidsImage[0]?.name || 'Child'}
                className="w-24 h-24 rounded-full object-cover border-2 border-[#008080] shadow"
              />
            </div>
          )}

          {childName && <p><strong>Name:</strong> {childName}</p>}
          {dob && <p><strong>DOB:</strong> {new Date(dob).toLocaleDateString()}</p>}

          {(schoolName || schoolAddress || schoolContact) && (
            <>
              {schoolName && <p><strong>School:</strong> {schoolName}</p>}
              {schoolAddress && <p><strong>Address:</strong> {schoolAddress}</p>}
              {schoolContact && <p><strong>Contact:</strong> {schoolContact}</p>}
            </>
          )}

          {(parentName || contact || contact2) && (
            <>
              {parentName && <p><strong>Parent:</strong> {parentName}</p>}
              {contact && <p><strong>Primary Contact:</strong> {contact}</p>}
              {contact2 && <p><strong>Secondary Contact:</strong> {contact2}</p>}
            </>
          )}

          {altContact.length > 0 && (
            <div>
              <p><strong>Alternate Contacts:</strong></p>
              <ul className="list-disc list-inside">
                {altContact.map((num, i) => (
                  <li key={i}>{num}</li>
                ))}
              </ul>
            </div>
          )}

          {homeAddress && (
            <p><strong>Home Address:</strong> {homeAddress}</p>
          )}

          {(qrCodeDetails.status || qrCodeDetails.scanCount || qrCodeDetails.renewalDate) && (
            <>
              {qrCodeDetails.status && <p><strong>Status:</strong> {qrCodeDetails.status}</p>}
              {typeof qrCodeDetails.scanCount === 'number' && (
                <p><strong>Scan Count:</strong> {qrCodeDetails.scanCount}</p>
              )}
              {qrCodeDetails.renewalDate && (
                <p>
                  <strong>Renewal Date:</strong>{' '}
                  {new Date(qrCodeDetails.renewalDate).toLocaleDateString()}
                </p>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
