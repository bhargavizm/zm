import React from "react";
import Image from "next/image";

const BusinessCardTemplateThree = ({ businessForm, profileImage, brandLogo }) => {
    const {
        name,
        heading,
        subheading,
        mobile,
        businessName,
        designation,
        email,
        address,
        mapLink,
        socialLink,
    } = businessForm;

    return (
        <div
            className="w-full mx-auto my-10 rounded-xl bg-[#efeae6] shadow-lg overflow-hidden text-center relative"
            style={{ fontFamily: 'Playfair Display, Arial, serif' }}
        >
            {/* Profile Picture */}
            <div className="flex justify-center mt-8">
                <div className="w-20 h-20 rounded-full border-2 overflow-hidden border-gray-200 bg-white">
                    <Image
                        src={profileImage || "/default-user.png"}
                        alt={name || "Profile"}
                        width={80}
                        height={80}
                        className="object-cover w-full h-full"
                    />
                </div>
            </div>

            {/* Name, Heading, Subheading */}
            <h2 className="text-2xl font-semibold mt-4 text-gray-800">{name || "JULIA SILVA"}</h2>
            <p className="text-lg text-gray-700">{heading || "Interior Designer"}</p>
            {subheading && (
                <p className="text-sm text-gray-500 mb-6">{subheading}</p>
            )}

            {/* Action Buttons */}
            <div className="flex flex-col gap-3 px-8 mb-6">
                <a
                    href={businessName || "#"}
                    className="py-3 rounded-full border border-gray-400 text-gray-800 font-semibold bg-white hover:bg-gray-50 transition"
                >
                    {businessName || "BUSINESS NAME"}
                </a>
                <a
                    href={designation || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-3 rounded-full border border-gray-400 text-gray-800 font-semibold bg-white hover:bg-gray-50 transition"
                >
                    {designation || "DESIGNATION"}
                </a>
                <a
                    href={`tel:${mobile}` || "#"}
                    className="py-3 rounded-full border border-gray-400 text-gray-800 font-semibold bg-white hover:bg-gray-50 transition"
                >
                    {mobile || "MOBILE"}
                </a>
                <a
                    href={`mailto:${email}` || "#"}
                    className="py-3 rounded-full border border-gray-400 text-gray-800 font-semibold bg-white hover:bg-gray-50 transition"
                >
                    {email || "EMAIL"}
                </a>
                <a
                    href={mapLink || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-3 rounded-full border border-gray-400 text-gray-800 font-semibold bg-white hover:bg-gray-50 transition"
                >
                    {mapLink || "MAP LINK"}
                </a>
                <a
                    href={socialLink || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-3 rounded-full border border-gray-400 text-gray-800 font-semibold bg-white hover:bg-gray-50 transition"
                >
                    {socialLink || "SOCIAL LINK"}
                </a>
                <a
                    href={address || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2 rounded-full font-semibold bg-white text-gray-800 shadow hover:bg-gray-50 transition text-center"
                >
                    {address || "Address"}
                </a>
            </div>

            {/* Footer Website Placeholder */}
            
        </div>
    );
};

export default BusinessCardTemplateThree;
