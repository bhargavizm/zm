/* "use client";
import React from "react";
import Image from "next/image";
import useServicesContext from "@/components/hooks/useServiceContext";



const BusinessPreview = () => {
  const { businessForm, profileImage, brandLogo } = useServicesContext()
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
          <h2 className="text-xl font-bold">{businessForm.name}</h2>
          <p className="text-sm text-gray-600">{businessForm.heading}</p>
          <p className="text-sm text-gray-600 italic">{businessForm.subheading}</p>
          <p className="text-sm mt-2">📱 {businessForm.mobile}</p>
          <p className="text-sm">🏢 {businessForm.businessName}</p>
          <p className="text-sm">🧑‍💼 {businessForm.designation}</p>
          <p className="text-sm">📍 {businessForm.address}</p>
          <a
            href={businessForm.mapLink}
            target="_blank"
            className="text-blue-500 text-sm"
            rel="noreferrer"
          >
            View on Map
          </a>
          <p className="text-sm">📧 {businessForm.email}</p>
          <a
            href={businessForm.socialLink}
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

export default BusinessPreview; */

import React from "react";
import Image from "next/image";
import useServicesContext from "@/components/hooks/useServiceContext";

// PROPS: Pass businessForm, profileImage, brandLogo etc from your context or parent component
const BusinessPreview = () => {
  const { businessForm, profileImage, brandLogo } = useServicesContext()
    // Destructure fields to use in JSX
    const {
        name,
        heading,         // e.g., Title ("Graphic Designer")
        subheading,      // e.g., Company Name
        mobile,
        businessName,
        designation,
        email,
        address,
        mapLink,
        socialLink,
    } = businessForm;

    return (
        <div className="max-w-xs mx-auto my-10 rounded-xl bg-black text-white overflow-hidden shadow-2xl relative" style={{ fontFamily: 'Montserrat, Arial, sans-serif' }}>
        
            {/* Top yellow bar and dots */}
            <div className="bg-yellow-500 h-16 flex items-center justify-between px-5 relative">
                <div className="grid grid-cols-2 gap-1">
                    <span className="w-2 h-2 bg-black rounded-full block" />
                    <span className="w-2 h-2 bg-black rounded-full block" />
                    <span className="w-2 h-2 bg-black rounded-full block" />
                    <span className="w-2 h-2 bg-black rounded-full block" />
                </div>
                <div className="grid grid-cols-2 gap-1">
                    <span className="w-2 h-2 bg-black rounded-full block" />
                    <span className="w-2 h-2 bg-black rounded-full block" />
                    <span className="w-2 h-2 bg-black rounded-full block" />
                    <span className="w-2 h-2 bg-black rounded-full block" />
                </div>
            </div>

            {/* Profile Photo */}
            <div className="flex justify-center -mt-12 mb-2">
                <div className="my-15 w-24 h-24 rounded-full border-4 border-yellow-500 overflow-hidden">
                    <Image
                        src={profileImage || "/default-user.png"}
                        alt={name || "Profile Photo"}
                        width={96}
                        height={96}
                        className="object-cover w-full h-full"
                    />
                </div>
            </div>
            {/* Name, Title, Company */}
            <div className="text-center px-6">
                <h2 className="text-xl font-bold text-yellow-500">{name || "Your Name"}</h2>
                <p className="text-sm font-medium mb-1">{heading || "Your Title"}</p>
                {subheading && (
                    <p className="text-xs text-gray-400 mb-4">{subheading}</p>
                )}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col items-center gap-3 px-8 mb-4">
                <a
                    href={`{businessName || ""}`}
                    className="w-full py-2 rounded font-semibold bg-yellow-500 text-black text-center shadow hover:bg-yellow-400 transition"
                >
                    {businessName || "BUSINESS NAME"}
                </a>
                <a
                    href={designation || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2 rounded font-semibold bg-white text-black text-center shadow hover:bg-gray-100 transition"
                >
                    {designation || "DESIGNATION"}
                </a>
                <a
                    href={`tel:${mobile}` || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2 rounded font-semibold bg-white text-black text-center shadow hover:bg-gray-100 transition"
                >
                    {mobile || "MOBILE"}
                </a>
                <a
                    href={`mailto:${email || ""}`}
                    className="w-full py-2 rounded font-semibold bg-white text-black text-center shadow hover:bg-gray-100 transition"
                >
                    {email || "EMAIL"}
                </a>
                <a
                    href={mapLink || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2 rounded font-semibold bg-white text-black text-center shadow hover:bg-gray-100 transition"
                >
                    {mapLink || "mapLink"}
                </a>
                <a
                    href={socialLink || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2 rounded font-semibold bg-white text-black text-center shadow hover:bg-gray-100 transition"
                >
                    {socialLink || "socialLink"}
                </a>
                
            </div>

            {/* Description/About */}
            {/* <div className="px-6 pb-6 text-center text-xs text-gray-300">
                {designation ||
                    "Experienced business professional. Add your description here to highlight your expertise, industry, or a personal tagline."}
            </div> */}

            {/* Bottom yellow bar */}
            <div className="w-full h-3 bg-yellow-500 absolute bottom-0 left-0" />
        </div>
    );
};

export default BusinessPreview;
