import React from "react";
import Image from "next/image";

const BusinessCardTemplateTwo = ({ businessForm, profileImage, brandLogo }) => {
    const {
        name,
        heading,       // e.g., Title ("Graphic Designer")
        subheading,    // e.g., Company Name
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
            className="w-full mx-auto my-10 rounded-2xl bg-[#fce7e0] shadow-lg overflow-hidden text-center"
            style={{ fontFamily: "Lato, Arial, sans-serif" }}
        >
            {/* Profile Photo */}
            <div className="flex justify-center mt-8 mb-3">
                <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-pink-200">
                    <Image
                        src={profileImage || "/default-user.png"}
                        alt={name || "Profile"}
                        width={112}
                        height={112}
                        className="object-cover w-full h-full"
                    />
                </div>
            </div>

            {/* Name, Heading, Subheading */}
            <h2 className="text-2xl font-bold text-pink-600">{name || "Your Name"}</h2>
            <p className="text-base text-gray-700 mt-1">{heading || "Your Title"}</p>
            {subheading && (
                <p className="text-sm text-gray-500 mt-1 mb-4">{subheading}</p>
            )}

            {/* Buttons Section */}
            <div className="flex flex-col items-center gap-3 px-8 mb-6">
                <a
                    href={businessName || "#"}
                    className="w-full py-2 rounded-full font-semibold bg-pink-200 text-pink-700 shadow hover:bg-pink-300 transition text-center"
                >
                    {businessName || "BUSINESS NAME"}
                </a>
                <a
                    href={designation || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2 rounded-full font-semibold bg-white text-pink-600 shadow hover:bg-gray-50 transition text-center"
                >
                    {designation || "DESIGNATION"}
                </a>
                <a
                    href={`tel:${mobile}` || "#"}
                    className="w-full py-2 rounded-full font-semibold bg-white text-pink-600 shadow hover:bg-gray-50 transition text-center"
                >
                    {mobile || "MOBILE"}
                </a>
                <a
                    href={`mailto:${email}` || "#"}
                    className="w-full py-2 rounded-full font-semibold bg-white text-pink-600 shadow hover:bg-gray-50 transition text-center"
                >
                    {email || "EMAIL"}
                </a>
                <a
                    href={mapLink || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2 rounded-full font-semibold bg-white text-pink-600 shadow hover:bg-gray-50 transition text-center"
                >
                    {mapLink || "MAP LINK"}
                </a>
                <a
                    href={socialLink || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2 rounded-full font-semibold bg-white text-pink-600 shadow hover:bg-gray-50 transition text-center"
                >
                    {socialLink || "SOCIAL LINK"}
                </a>
                <a
                    href={address || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2 rounded-full font-semibold bg-white text-pink-600 shadow hover:bg-gray-50 transition text-center"
                >
                    {address || "Address"}
                </a>
            </div>

            {/* Optional Footer Section */}
            {/* <div className="text-xs text-gray-500 pb-4">
        Add a custom tagline or short description here.
      </div> */}
        </div>
    );
};

export default BusinessCardTemplateTwo;
