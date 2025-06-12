import React from "react";
import Image from "next/image";

const BusinessCardTemplateFour = ({ businessForm, profileImage }) => {
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
            className="w-full mx-auto my-10 rounded-xl bg-[#f9f7f3] shadow-lg overflow-hidden text-center relative"
            style={{
                fontFamily: "Dancing Script, cursive, Arial, sans-serif",
            }}
        >
            {/* Profile Image */}
            <div className="flex justify-center mt-10">
                <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-white shadow">
                    <Image
                        src={profileImage || "/default-user.png"}
                        alt={name || "Profile"}
                        width={80}
                        height={80}
                        className="object-cover w-full h-full"
                    />
                </div>
            </div>

            {/* Name and Titles */}
            <h2 className="text-2xl italic font-bold mt-3 text-gray-800">
                {name || "Margaret Lopes"}
            </h2>
            <p
                className="text-md uppercase tracking-wider text-gray-500"
                style={{ fontFamily: "Montserrat, Arial, sans-serif" }}
            >
                {heading || "Content Marketer"}
            </p>
            {subheading && (
                <p className="text-sm text-gray-400 mb-6" style={{ fontFamily: "Montserrat, sans-serif" }}>
                    {subheading}
                </p>
            )}

            {/* Action Buttons */}
            <div className="flex flex-col gap-3 px-8 pb-2">
                <a
                    href={businessName || "#"}
                    className="py-3 rounded-full border border-gray-400 text-gray-900 font-semibold bg-white hover:bg-gray-100 transition"
                >
                    {businessName || "BUSINESS NAME"}
                </a>
                <a
                    href={designation || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-3 rounded-full border border-gray-400 text-gray-900 font-semibold bg-white hover:bg-gray-100 transition"
                >
                    {designation || "DESIGNATION"}
                </a>
                <a
                    href={`tel:${mobile}` || "#"}
                    className="py-3 rounded-full border border-gray-400 text-gray-900 font-semibold bg-white hover:bg-gray-100 transition"
                >
                    {mobile || "MOBILE"}
                </a>
                <a
                    href={`mailto:${email}` || "#"}
                    className="py-3 rounded-full border border-gray-400 text-gray-900 font-semibold bg-white hover:bg-gray-100 transition"
                >
                    {email || "EMAIL"}
                </a>
                <a
                    href={mapLink || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-3 rounded-full border border-gray-400 text-gray-900 font-semibold bg-white hover:bg-gray-100 transition"
                >
                    {mapLink || "MAP LINK"}
                </a>
                <a
                    href={socialLink || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-3 rounded-full border border-gray-400 text-gray-900 font-semibold bg-white hover:bg-gray-100 transition"
                >
                    {socialLink || "SOCIAL LINK"}
                </a>
                <a
                    href={address || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2 rounded-full font-semibold bg-white text-gray-900 shadow hover:bg-gray-50 transition text-center"
                >
                    {address || "Address"}
                </a>
            </div>

            {/* Footer Email */}
        
        </div>
    );
};

export default BusinessCardTemplateFour;
