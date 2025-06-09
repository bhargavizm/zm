"use client";
import React from "react";
import Image from "next/image";

const BusinessPreview = () => {
  return (
    <>
      <div className="flex justify-center items-start">
        <div className="w-[320px] h-[570px] border-4 border-[#001a1a] rounded-3xl p-4 shadow-2xl bg-white flex flex-col items-center space-y-3">
          {profileImage && (
            <Image
              src={profileImage}
              alt="Profile"
              width={200}
              height={200}
              className="rounded-xl object-cover"
            />
          )}
          {brandLogo && (
            <Image
              src={brandLogo}
              alt="Logo"
              width={120}
              height={60}
              className="object-contain"
            />
          )}
          <h2 className="text-xl font-bold">{form.name}</h2>
          <p className="text-sm text-gray-600">{form.heading}</p>
          <p className="text-sm text-gray-600 italic">{form.subheading}</p>
          <p className="text-sm mt-2">📱 {form.mobile}</p>
          <p className="text-sm">🏢 {form.businessName}</p>
          <p className="text-sm">🧑‍💼 {form.designation}</p>
          <p className="text-sm">📍 {form.address}</p>
          <a
            href={form.mapLink}
            target="_blank"
            className="text-blue-500 text-sm"
            rel="noreferrer"
          >
            View on Map
          </a>
          <p className="text-sm">📧 {form.email}</p>
          <a
            href={form.socialLink}
            target="_blank"
            className="text-sm text-[#008080]"
            rel="noreferrer"
          >
            🔗 Social
          </a>
        </div>
      </div>
    </>
  );
};

export default BusinessPreview;
