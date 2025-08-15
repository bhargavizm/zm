'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import BgDesignRenderer from './bgDesignRender';
import useDesignContext from '../hooks/useDesignContext';

export default function KidsSafetyPreview({ data }) {
 const { setBgDesign } = useDesignContext();


  if (!data) return <p>No data found.</p>;
  const defaultBg = '/services-service/kid-safety.webp';
  const {
    bgDesign ,
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

    if (data?.bgDesign) {
      setBgDesign(data.bgDesign);
    } else {
      setBgDesign(defaultBg);
    }
  }, [data]);

  return (
    <div >
      <div >
         <BgDesignRenderer bgDesign={bgDesign} defaultBg={defaultBg} />

        {/* 🔒 Safe content */}
        <div className="relative z-10 flex-1 overflow-y-auto scrollbar-hide p-6 pt-12 m-4 rounded-xl bg-white/60 space-y-4 text-md text-gray-800">
          <h2 className="text-lg font-bold text-center text-[#008080] mb-2">
            👶 Kid's Safety Info
          </h2>

          {kidsImage.length > 0 && (
            <div className="flex justify-center py-2">
              <img
                src={kidsImage[0]?.url}
                alt={kidsImage[0]?.name || 'Child'}
                className="w-24 h-24 rounded-xl object-center border-2 border-[#008080] shadow"
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
        </div>
      </div>
    </div>
  );
}
