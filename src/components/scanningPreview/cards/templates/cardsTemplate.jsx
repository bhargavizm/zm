// components/templates/BusinessCardTemplate.jsx
import React from "react";
import Image from "next/image";

const CardsTemplate = ({ businessForm, profileImage, styles = {} }) => {
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

  return (
    <div
      className={`w-full mx-auto rounded-xl shadow-lg overflow-y-auto scrollbar-hide text-center relative ${styles.containerBg}`}
      style={{ fontFamily: styles.fontFamily || "Arial, sans-serif" }}
    >
      {/* Profile Image */}
      <div className="flex justify-center mt-6">
        <div
          className={`w-28 h-28 rounded-full overflow-hidden border-4 shadow ${styles.profileBorder}`}
        >
          <Image
            src={profileImage || "/default-user.webp"}
            alt=""
            width={112}
            height={112}
            className="object-cover w-full h-full"
          />
        </div>
      </div>

      {/* Name & Subheading */}
      <h2 className={`text-2xl font-bold mt-3 ${styles.nameColor}`}>
        {name || "Your Name"}
      </h2>
      {subheading && (
        <p className={`text-sm mb-4 ${styles.subheadingColor}`}>
          {subheading}
        </p>
      )}

      {/* Info Buttons */}
      <div className="flex flex-col gap-3 px-8 pb-4">
        {[designation, mobile, email, mapLink, socialLink, socialLink2, address].map(
          (val, i) => (
            <a
              key={i}
              href={val || "#"}
              target="_blank"
              rel="noopener noreferrer"
              className={`py-2 rounded font-semibold text-center transition ${styles.button}`}
            >
              {val || "Placeholder"}
            </a>
          )
        )}
      </div>
    </div>
  );
};

export default CardsTemplate;
