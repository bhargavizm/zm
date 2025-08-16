// components/templates/BusinessCardTemplate.jsx
import React from "react";
import Image from "next/image";

const CardsTemplate = ({ businessForm, styles = {} }) => {
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
    profileImageUrl,
  } = businessForm;

  return (
    <div
      className={`w-full mx-auto rounded-xl shadow-lg overflow-y-auto scrollbar-hide text-center relative ${styles.containerBg}`}
      style={{ fontFamily: styles.fontFamily || "Arial, sans-serif" }}
    >
      {/* Profile Image */}
      <div className="flex justify-center mt-6">
        <div
          className={`w-28 h-28 rounded-xl overflow-hidden border-4 shadow ${styles.profileBorder}`}
        >
          <Image
            src={profileImageUrl || "/default-user.webp"}
            alt=""
            width={112}
            height={112}
            className="object-center w-full h-full"
          />
        </div>
      </div>

      {/* Name & Subheading */}
      <h2 className={`text-2xl font-bold mt-3 ${styles.nameColor}`}>
        {name || "Your Name"}
      </h2>
      {subheading && (
        <p className={`text-sm mb-4 ${styles.subheadingColor}`}>{subheading}</p>
      )}

      {/* Info Buttons */}
      <div className="flex flex-col gap-3 px-8 pb-4">
        {/* Designation (just text) */}
        {designation && (
          <div
            className={`py-2 rounded font-semibold text-center ${styles.button}`}
          >
            {designation}
          </div>
        )}

        {/* Mobile (tel link) */}
        {mobile && (
          <a
            href={`tel:${mobile}`}
            className={`py-2 rounded font-semibold text-center transition ${styles.button}`}
          >
            {mobile}
          </a>
        )}

        {/* Email (mailto link) */}
        {email && (
          <a
            href={`mailto:${email}`}
            className={`py-2 rounded font-semibold text-center transition ${styles.button}`}
          >
            {email}
          </a>
        )}

        {/* Map Link */}
        {mapLink && (
          <a
            href={mapLink}
            target="_blank"
            rel="noopener noreferrer"
            className={`py-2 rounded font-semibold text-center transition ${styles.button}`}
          >
           {mapLink}
          </a>
        )}

        {/* Social Links */}
        {[socialLink, socialLink2].map(
          (link, index) =>
            link && (
              <a
                key={index}
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className={`py-2 rounded font-semibold text-center transition ${styles.button}`}
              >
                {link}
              </a>
            )
        )}

        {/* Address (just text) */}
        {address && (
          <div
            className={`py-2 rounded font-semibold text-center ${styles.button}`}
          >
            {address}
          </div>
        )}
      </div>
    </div>
  );
};

export default CardsTemplate;
