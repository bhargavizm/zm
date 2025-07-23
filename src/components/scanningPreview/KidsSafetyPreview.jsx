"use client";
import React from 'react';
import Image from 'next/image';

const KidsSafetyPreview = ({ data }) => {
  if (!data) {
    return (
      <div className="text-center p-10 text-red-500">
        Data not available or QR code is invalid.
      </div>
    );
  }

  const {
    childName = "N/A",
    dob = "N/A",
    gender = "N/A",
    schoolName = "N/A",
    className = "N/A",
    contact = "N/A",
    contact2 = "N/A",
    schoolAddress = "N/A",
    kidsImage = [],
  } = data;

  const imageUrl = kidsImage?.[0]?.url || "";

  return (
    <div className="max-w-lg mx-auto bg-white shadow-lg rounded-lg p-6 mt-10">
      <h2 className="text-2xl font-bold mb-4 text-center">Kid’s Safety Info</h2>
      {imageUrl && (
        <div className="flex justify-center mb-4">
          <Image
            src={imageUrl}
            alt="Child Image"
            width={120}
            height={120}
            className="rounded-full object-cover"
          />
        </div>
      )}
      <div className="space-y-2 text-gray-700 text-sm">
        <p><strong>Name:</strong> {childName}</p>
        <p><strong>DOB:</strong> {new Date(dob).toLocaleDateString()}</p>
        <p><strong>Gender:</strong> {gender}</p>
        <p><strong>School:</strong> {schoolName}</p>
        <p><strong>Class:</strong> {className}</p>
        <p><strong>Emergency Contact 1:</strong> {contact}</p>
        <p><strong>Emergency Contact 2:</strong> {contact2}</p>
        <p><strong>Address:</strong> {schoolAddress}</p>
      </div>
    </div>
  );
};

export default KidsSafetyPreview;
