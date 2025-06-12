"use client";
import React from "react";
import useServicesContext from "@/components/hooks/useServiceContext";

const KidsSafetyPreview = () => {
  const { kidsSafetyFormData, kidsImage } = useServicesContext();

  return (
    <div className="max-w-[300px] mx-auto border-[16px] border-black rounded-[40px] overflow-hidden shadow-lg relative bg-white">
      <div className="w-full h-[30px] bg-black absolute top-0 left-0 right-0 rounded-t-[24px] z-10"></div>
      <div className="h-[600px] overflow-y-auto px-4 pt-6 pb-4 bg-white">
        <h2 className="text-center text-lg font-semibold mb-2 text-[#008080]">
          Kids Safety Profile
        </h2>

        {/* Image */}
        {kidsImage && (
          <div className="flex justify-center mb-4">
            <img
              src={kidsImage}
              alt="Child Profile"
              className="w-24 h-24 rounded-full object-cover border-2 border-[#008080]"
            />
          </div>
        )}

        {/* Info */}
        <div className="space-y-2 text-sm text-gray-800">
          <p><strong>Child Name:</strong> {kidsSafetyFormData.childName}</p>
          <p><strong>DOB:</strong> {kidsSafetyFormData.dob}</p>
          <p><strong>Grade/Class:</strong> {kidsSafetyFormData.classGrade}</p>
          <p><strong>School:</strong> {kidsSafetyFormData.schoolName}</p>
          <p><strong>School Address:</strong> {kidsSafetyFormData.schoolAddress}</p>
          <p><strong>Parent Name:</strong> {kidsSafetyFormData.parentName}</p>
          <p><strong>Contact:</strong> {kidsSafetyFormData.contact}</p>
          <p><strong>Alt Contact:</strong> {kidsSafetyFormData.altContact}</p>
          <p><strong>Home Address:</strong> {kidsSafetyFormData.homeAddress}</p>
          <p><strong>Map Link:</strong> {kidsSafetyFormData.mapLink}</p>
        </div>
      </div>
    </div>
  );
};

export default KidsSafetyPreview;
