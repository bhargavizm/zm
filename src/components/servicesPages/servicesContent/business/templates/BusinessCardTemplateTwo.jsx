import React from "react";
import Image from "next/image";

const BusinessCardTemplateTwo = ({
    businessForm,
    profileImage,
}) => {
    const {
        name,
        heading,
        mobile,
        email,
        address,
    } = businessForm;

    return (
        <div className="max-w-xs mx-auto my-10 rounded-2xl bg-pink-50 shadow-lg overflow-hidden text-center" style={{ fontFamily: 'Lato, Arial, sans-serif' }}>
            {/* Profile image */}
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
            <h2 className="text-2xl font-serif text-gray-700">{name || "HELENE PAQUET"}</h2>
            <div className="uppercase tracking-widest text-pink-500 text-base mt-1 mb-6">{heading || "Interior Designer"}</div>
            {/* Phone button */}
            <div className="flex flex-col items-center gap-4">
                <div className="flex items-center justify-center gap-2 w-4/5 mx-auto rounded-3xl bg-pink-200 py-3">
                    <span className="material-icons text-pink-500">call</span>
                    <span className="text-gray-700 text-lg">{mobile || "+123-456-7890"}</span>
                </div>
                {/* Email button */}
                <div className="flex items-center justify-center gap-2 w-4/5 mx-auto rounded-3xl bg-pink-100 py-3">
                    <span className="material-icons text-pink-400">email</span>
                    <span className="text-gray-600 text-base">{email || "hello@reallygreatsite.com"}</span>
                </div>
            </div>
            {/* Address */}
            <div className="mt-5 text-pink-700 text-base font-serif">
                {address || "123 Anywhere St. Any City, ST 12345"}
            </div>
            <div className="mt-2 pb-8 tracking-widest text-gray-400 text-xs">www.reallygreatsite.com</div>
        </div>
    );
};

export default BusinessCardTemplateTwo;