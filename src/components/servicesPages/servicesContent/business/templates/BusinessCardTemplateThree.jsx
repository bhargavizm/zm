import React from "react";
import Image from "next/image";

const BusinessCardTemplateThree = ({
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
    } = businessForm;

    return (
        <div className="max-w-xs mx-auto my-10 rounded-xl bg-[#efeae6] shadow-lg overflow-hidden text-center relative" style={{ fontFamily: 'Playfair Display, Arial, serif' }}>
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
            <h2 className="text-2xl font-semibold mt-4 text-gray-800">{name || "JULIA SILVA"}</h2>
            <p className="text-lg mb-7 text-gray-700">{heading || "Interior Designer"}</p>
            <div className="flex flex-col gap-3 px-8 mb-5">
                <a href={aboutLink || "#"} className="py-3 rounded-full border border-gray-400 text-gray-800 font-semibold bg-white hover:bg-gray-50 transition">ABOUT ME</a>
                <a href={guideLink || "#"} className="py-3 rounded-full border border-gray-400 text-gray-800 font-semibold bg-white hover:bg-gray-50 transition">GET MY GUIDE</a>
                <a href={portfolioLink || "#"} className="py-3 rounded-full border border-gray-400 text-gray-800 font-semibold bg-white hover:bg-gray-50 transition">PORTFOLIO</a>
                <a href={contactLink || "#"} className="py-3 rounded-full border border-gray-400 text-gray-800 font-semibold bg-white hover:bg-gray-50 transition">CONTACT ME</a>
                <a href={reviewLink || "#"} className="py-3 rounded-full border border-gray-400 text-gray-800 font-semibold bg-white hover:bg-gray-50 transition">REVIEWS</a>
            </div>
            <div className="pb-5 text-xs tracking-wider text-gray-500 mt-6">reallygreatsite.com</div>
        </div>
    );
};

export default BusinessCardTemplateThree;