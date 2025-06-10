import React from "react";
import Image from "next/image";

const BusinessCardTemplateFour = ({
    businessForm,
    profileImage,
}) => {
    const {
        name,
        heading,
        aboutLink,
        guideLink,
        portfolioLink,
        contactLink,
        reviewLink,
        email,
    } = businessForm;

    return (
        <div className="max-w-xs mx-auto my-10 rounded-xl bg-[#f9f7f3] shadow-lg overflow-hidden text-center relative" style={{ fontFamily: 'Dancing Script, cursive, Arial, sans-serif' }}>
            {/* Profile image */}
            <div className="flex justify-center mt-10">
                <div className="w-20 h-20 rounded-full  overflow-hidden border-4 border-white shadow">
                    <Image
                        src={profileImage || "/default-user.png"}
                        alt={name || "Profile"}
                        width={80}
                        height={80}
                        className="object-cover w-full h-full"
                    />
                </div>
            </div>
            <h2 className="text-2xl italic font-bold mt-3 text-gray-800">{name || "Margaret Lopes"}</h2>
            <p className="mb-8 text-md uppercase tracking-wider text-gray-500" style={{ fontFamily: 'Montserrat, Arial, sans-serif' }}>
                {heading || "Content Marketer"}
            </p>
            <div className="flex flex-col gap-3 px-8 pb-2">
                <a href={aboutLink || "#"} className="py-3 rounded-full border border-gray-400 text-gray-900 font-semibold bg-white hover:bg-gray-100 transition">ABOUT ME</a>
                <a href={guideLink || "#"} className="py-3 rounded-full border border-gray-400 text-gray-900 font-semibold bg-white hover:bg-gray-100 transition">GET MY GUIDE</a>
                <a href={portfolioLink || "#"} className="py-3 rounded-full border border-gray-400 text-gray-900 font-semibold bg-white hover:bg-gray-100 transition">PORTFOLIO</a>
                <a href={contactLink || "#"} className="py-3 rounded-full border border-gray-400 text-gray-900 font-semibold bg-white hover:bg-gray-100 transition">CONTACT ME</a>
                <a href={reviewLink || "#"} className="py-3 rounded-full border border-gray-400 text-gray-900 font-semibold bg-white hover:bg-gray-100 transition">REVIEWS</a>
            </div>
            {/* Email at the bottom */}
            <div className="pb-6 pt-1 text-sm flex items-center justify-center gap-2 text-gray-500 font-light tracking-wide">
                <span className="material-icons text-gray-400">email</span>
                {email || "@reallygreatsite.com"}
            </div>
        </div>
    );
};

export default BusinessCardTemplateFour;