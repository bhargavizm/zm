import React from "react";
import Image from "next/image";

const BusinessCardTemplateFour = ({ businessForm }) => {
  const {
    name,
    subheading,
    mobile,
    designation,
    email,
    address,
    mapLink,
    socialLink,
    socialLink2,
  } = businessForm;

  const buttonClass =
    "py-3 px-4 rounded border border-gray-400 text-gray-900 font-semibold bg-white hover:bg-gray-100 transition break-words text-center";

  return (
    <div
      className="w-full mx-auto rounded-xl bg-[#f9f7f3]/70 shadow-lg overflow-y-auto scrollbar-hide text-center relative"
      style={{
        fontFamily: "Dancing Script, cursive, Arial, sans-serif",
      }}
    >
      {/* Profile Image */}
      <div className="flex justify-center mt-18">
        <div className="w-[120px] h-[120px] rounded-xl overflow-hidden border-4 border-white shadow">
          <Image
            src={businessForm.previewImageUrl || "/default-user.webp"}
            alt=""
            width={120}
            height={120}
            className="object-center w-full h-full"
          />
        </div>
      </div>

      {/* Name */}
      <h2 className="text-2xl italic font-bold mt-3 px-6 text-gray-800">
        {name || "Margaret Lopes"}
      </h2>

      {subheading && (
        <p
          className="text-sm text-gray-400 mb-6"
          style={{ fontFamily: "Montserrat, sans-serif" }}
        >
          {subheading}
        </p>
      )}

      {/* Action Buttons */}
      <div className="flex flex-col gap-3 px-6 pb-2">
        <a href={designation || "#"} target="_blank" rel="noopener noreferrer" className={buttonClass}>
          {designation || "DESIGNATION"}
        </a>
        <a href={`tel:${mobile}` || "#"} className={buttonClass}>
          {mobile || "MOBILE"}
        </a>
        <a href={`mailto:${email}` || "#"} className={buttonClass}>
          {email || "EMAIL"}
        </a>
        <a href={mapLink || "#"} target="_blank" rel="noopener noreferrer" className={buttonClass}>
          {mapLink || "MAP LINK"}
        </a>
        <a href={socialLink || "#"} target="_blank" rel="noopener noreferrer" className={buttonClass}>
          {socialLink || "SOCIAL LINK"}
        </a>
        <a href={socialLink2 || "#"} target="_blank" rel="noopener noreferrer" className={buttonClass}>
          {socialLink2 || "SOCIAL LINK2"}
        </a>
        <a href={address || "#"} target="_blank" rel="noopener noreferrer" className={buttonClass}>
          {address || "ADDRESS"}
        </a>
      </div>
    </div>
  );
};

export default BusinessCardTemplateFour;
