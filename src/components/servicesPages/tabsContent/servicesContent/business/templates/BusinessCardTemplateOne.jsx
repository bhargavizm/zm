import React from "react";
import Image from "next/image";

const BusinessCardTemplateOne = ({ businessForm }) => {
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

  // Shared button class for all links
  const buttonClass =
    "w-full py-2 px-4 rounded font-semibold bg-white text-black text-center shadow hover:bg-gray-100 transition break-words";

  return (
    <div
      className="w-full mx-auto rounded-xl bg-black/70 text-white overflow-y-auto scrollbar-hide shadow-2xl relative"
      style={{ fontFamily: "Montserrat, Arial, sans-serif" }}
    >
      {/* Top yellow bar */}
      <div className="bg-yellow-500 h-16 flex items-center justify-between px-5 relative">
        <div className="grid grid-cols-2 gap-1">
          {[...Array(4)].map((_, i) => (
            <span key={i} className="w-2 h-2 bg-black rounded block" />
          ))}
        </div>
        <div className="grid grid-cols-2 gap-1">
          {[...Array(4)].map((_, i) => (
            <span key={i} className="w-2 h-2 bg-black rounded block" />
          ))}
        </div>
      </div>

      {/* Profile Photo */}
      <div className="flex justify-center mt-12 mb-2">
        <div className="mb-6 w-[120px] h-[120px] rounded-xl border-4 border-yellow-500 overflow-hidden">
          <Image
            src={businessForm.previewImageUrl || "/default-user.webp"}
            alt=""
            width={120}
            height={120}
            className="object-center w-full h-full"
          />
        </div>
      </div>

      {/* Name & Company */}
      <div className="text-center px-6">
        <h2 className="text-xl font-bold text-yellow-500">
          {name || "Your Name"}
        </h2>
        {subheading && (
          <p className="text-xs text-gray-400 mb-4">{subheading}</p>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col items-center gap-3 px-8 mb-4">
        <a href={designation || "#"} target="_blank" rel="noopener noreferrer" className={buttonClass}>
          {designation || "DESIGNATION"}
        </a>
        <a href={`tel:${mobile}` || "#"} target="_blank" rel="noopener noreferrer" className={buttonClass}>
          {mobile || "MOBILE"}
        </a>
        <a href={`mailto:${email || ""}`} className={buttonClass}>
          {email || "EMAIL"}
        </a>
        <a href={mapLink || "#"} target="_blank" rel="noopener noreferrer" className={`${buttonClass} break-all`}>
          {mapLink || "MapLink"}
        </a>
        <a href={socialLink || "#"} target="_blank" rel="noopener noreferrer" className={`${buttonClass} break-all`}>
          {socialLink || "SocialLink"}
        </a>
        <a href={socialLink2 || "#"} target="_blank" rel="noopener noreferrer" className={`${buttonClass} break-all`}>
          {socialLink2 || "SocialLink2"}
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

      {/* Bottom yellow bar */}
      <div className="w-full h-3 bg-yellow-500 absolute bottom-0 left-0" />
    </div>
  );
};

export default BusinessCardTemplateOne;
