"use client";
import React from "react";
import useServicesContext from "@/components/hooks/useServiceContext";
import useDesignContext from "@/components/hooks/useDesignContext";

const KidsSafetyPreview = () => {
  const { kidsSafetyFormData, kidsImage } = useServicesContext();
  const { bgDesign } = useDesignContext();

  const isVideo = bgDesign?.endsWith(".mp4");
  const isImage = bgDesign && !isVideo;

  return (
    <div className="max-w-[300px] mx-auto border-[16px] border-black rounded-[40px] overflow-hidden shadow-lg relative">
      
      {/* 🔳 Background */}
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
          <source src="/services-service/kids-safety.mp4" type="video/mp4" />
        </video>
      )}

      {/* 🧊 White overlay */}
      {/* <div className="absolute inset-0 bg-white/90 backdrop-blur-sm z-10" /> */}

      {/* ⬛ Top bar like iPhone notch */}
      <div className="w-full h-[30px] bg-black absolute top-0 left-0 right-0 rounded-t-[24px] z-20"></div>

      {/* 📱 Content */}
      <div className="relative z-20 h-[600px] overflow-y-auto px-4 pt-6 pb-4">
        <h2 className="text-center text-lg font-semibold mb-2 text-[#008080]">
          Kids Safety Profile
        </h2>

        {/* 👦 Child's Image */}
        {kidsImage && (
          <div className="flex justify-center mb-4">
            <img
              src={kidsImage}
              alt="Child Profile"
              className="w-24 h-24 rounded-full object-cover border-2 border-[#008080]"
            />
          </div>
        )}

        {/* 📝 Information */}
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
