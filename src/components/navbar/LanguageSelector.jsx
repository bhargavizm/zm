"use client";

import React, { useState, useRef, useEffect } from "react";
import { useLanguage } from "@/context/languageContext/LanguageContext";
import { FaGlobe } from "react-icons/fa";
import { MdKeyboardArrowDown } from "react-icons/md";

const languageOptions = [
  { code: "en", label: "English - English" },
  { code: "hi", label: "Hindi - हिन्दी" },
  { code: "bn", label: "Bengali - বাংলা" },
  { code: "te", label: "Telugu - తెలుగు" },
  { code: "mr", label: "Marathi - मराठी" },
  { code: "ta", label: "Tamil - தமிழ்" },
  { code: "gu", label: "Gujarati - ગુજરાતી" },
  { code: "kn", label: "Kannada - ಕನ್ನಡ" },
  { code: "ml", label: "Malayalam - മലയാളം" },
  { code: "or", label: "Odia - ଓଡ଼ିଆ" },
  { code: "pa", label: "Punjabi - ਪੰਜਾਬੀ" },
  { code: "ur", label: "Urdu - اُردُو" },
];

const LanguageSelector = ({ isOpen }) => {
  const { setLanguage, language } = useLanguage();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleLanguageSelect = (langCode) => {
    setLanguage(langCode);
    localStorage.setItem("language", langCode);
    setDropdownOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        onClick={() => setDropdownOpen((prev) => !prev)}
        className={`${
          isOpen ? "text-mainGreen" : "text-white "
        } flex items-center gap-2  py-2 rounded transition`}
      >
        <FaGlobe className="text-xl" />
        <span className="text-xl font-medium">{language || "EN"}</span>
        <MdKeyboardArrowDown className="text-xl" />
      </button>

      {dropdownOpen && (
        <div className="absolute right-0 mt-2 w-60 bg-white border border-gray-200 rounded-md shadow-lg z-50 max-h-80 scrollbar-hide overflow-y-auto">
          {languageOptions.map(({ code, label }) => (
            <button
              key={code}
              onClick={() => handleLanguageSelect(code)}
              className={`w-full text-left px-4 py-2 text-mainGreen hover:bg-mainGreen hover:text-white text-xl ${
                language === code ? "bg-gray-100 font-semibold" : ""
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageSelector;
