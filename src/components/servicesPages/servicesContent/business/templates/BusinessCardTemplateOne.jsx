import React from "react";
import Image from "next/image";
import useServicesContext from "@/components/hooks/useServiceContext";

// PROPS: Pass businessForm, profileImage, brandLogo etc from your context or parent component
const BusinessCardTemplateOne = ({ businessForm, profileImage, brandLogo }) => {
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
        <div className="w-full mx-auto my-10 rounded-xl bg-black text-white overflow-hidden shadow-2xl relative" style={{ fontFamily: 'Montserrat, Arial, sans-serif' }}>
        
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
                        alt={name || "Profile"}
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
                    {mapLink || "MapLink"}
                </a>
                <a
                    href={socialLink || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2 rounded font-semibold bg-white text-black text-center shadow hover:bg-gray-100 transition"
                >
                    {socialLink || "SocialLink"}
                </a>
                <a
                    href={address || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2 rounded font-semibold bg-white text-black text-center shadow hover:bg-gray-100 transition"
                >
                    {address || "Address"}
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

export default BusinessCardTemplateOne;
