import React from "react";
import Image from "next/image";

const BusinessCardTemplateTwo = ({ businessForm }) => {
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

  // Shared button styles
  const buttonClass =
    "w-full py-2 px-4 rounded font-semibold bg-white text-pink-600 shadow hover:bg-gray-50 transition text-center break-words";

  return (
    <div
      className="w-full mx-auto rounded-xl bg-[#fce7e0]/70 shadow-lg overflow-y-auto scrollbar-hide text-center"
      style={{ fontFamily: "Lato, Arial, sans-serif" }}
    >
      {/* Profile Photo */}
      <div className="flex justify-center mt-18 mb-3">
        <div className="w-[120px] h-[120px] rounded-xl overflow-hidden border-4 border-pink-200">
          <Image
            src={businessForm.previewImageUrl || "/default-user.webp"}
            alt=""
            width={120}
            height={120}
            className="object-center w-full h-full"
          />
        </div>
      </div>

      {/* Name & Subheading */}
      <h2 className="text-2xl font-bold text-pink-600">
        {name || "Your Name"}
      </h2>
      {subheading && (
        <p className="text-sm text-gray-500 mt-1 mb-4">{subheading}</p>
      )}

      {/* Buttons Section */}
      <div className="flex flex-col items-center gap-3 px-8 mb-6">
        <a
          href={designation || "#"}
          target="_blank"
          rel="noopener noreferrer"
          className={buttonClass}
        >
          {designation || "DESIGNATION"}
        </a>
        <a href={`tel:${mobile}` || "#"} className={buttonClass}>
          {mobile || "MOBILE"}
        </a>
        <a href={`mailto:${email}` || "#"} className={buttonClass}>
          {email || "EMAIL"}
        </a>
        <a
          href={mapLink || "#"}
          target="_blank"
          rel="noopener noreferrer"
          className={`${buttonClass} break-all`}
        >
          {mapLink || "MAP LINK"}
        </a>
        <a
          href={socialLink || "#"}
          target="_blank"
          rel="noopener noreferrer"
          className={`${buttonClass} break-all`}
        >
          {socialLink || "SOCIAL LINK"}
        </a>
        <a
          href={socialLink2 || "#"}
          target="_blank"
          rel="noopener noreferrer"
          className={`${buttonClass} break-all`}
        >
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

export default BusinessCardTemplateTwo;
