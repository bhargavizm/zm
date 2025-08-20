import React from "react";
import Image from "next/image";

const BusinessCardTemplateThree = ({ businessForm }) => {
  const {
    name,
    subheading,
    mobile,
    designation,
    email,
    address,
    mapLink,
    socialLink,
    socialLink2
  } = businessForm;

  // Shared class for buttons
  const buttonClass =
    "w-full py-3 px-4 rounded border border-gray-400 text-gray-800 font-semibold bg-white hover:bg-gray-50 transition text-center break-words";

  return (
    <div
      className="w-full mx-auto rounded-xl bg-[#efeae6]/70 shadow-lg overflow-y-auto scrollbar-hide text-center relative"
      style={{ fontFamily: "Playfair Display, Arial, serif" }}
    >
      {/* Profile Picture */}
      <div className="flex justify-center mt-18">
        <div className="w-[120px] h-[120px] rounded-xl border-2 overflow-hidden border-gray-200 bg-white">
          <Image
            src={businessForm.previewImageUrl || "/default-user.webp"}
            alt=""
            width={120}
            height={120}
            className="object-center w-full h-full"
          />
        </div>
      </div>

      {/* Name, Subheading */}
      <h2 className="text-2xl font-semibold mt-4 text-gray-800">
        {name || "JULIA SILVA"}
      </h2>
      {subheading && (
        <p className="text-sm text-gray-500 mb-6">{subheading}</p>
      )}

      {/* Action Buttons */}
      <div className="flex flex-col gap-3 px-8 mb-6">
        <a href={designation || "#"} target="_blank" rel="noopener noreferrer" className={buttonClass}>
          {designation || "DESIGNATION"}
        </a>
        <a href={`tel:${mobile}` || "#"} className={buttonClass}>
          {mobile || "MOBILE"}
        </a>
        <a href={`mailto:${email}` || "#"} className={buttonClass}>
          {email || "EMAIL"}
        </a>
        <a href={mapLink || "#"} target="_blank" rel="noopener noreferrer" className={`${buttonClass} break-all`}>
          {mapLink || "MAP LINK"}
        </a>
        <a href={socialLink || "#"} target="_blank" rel="noopener noreferrer" className={`${buttonClass} break-all`}>
          {socialLink || "SOCIAL LINK"}
        </a>
        <a href={socialLink2 || "#"} target="_blank" rel="noopener noreferrer" className={`${buttonClass} break-all`}>
          {socialLink2 || "SOCIAL LINK2"}
        </a>
       <a
  href={
    address
      ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`
      : "#"
  }
  target="_blank"
  rel="noopener noreferrer"
  className={buttonClass}
>
  {address || "ADDRESS"}
</a>

      </div>
    </div>
  );
};

export default BusinessCardTemplateThree;
