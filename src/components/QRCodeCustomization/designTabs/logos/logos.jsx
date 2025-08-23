"use client";

 "use client";

import useDesignContext from "@/components/hooks/useDesignContext";
import Image from "next/image";
import React, { useRef, useEffect } from "react";
import { logos } from "./logoImages";

const Logos = () => {
  const {
    selectedLogo,
    setSelectedLogo,
    setLogoSize,
    setCompanyLogoSize,
    customLogo,
    setCustomLogo,
  } = useDesignContext();

  const ref = useRef(null);

  useEffect(() => {
    const scroll = localStorage.getItem("logosScroll");
    if (ref.current && scroll) {
      ref.current.scrollTop = parseInt(scroll, 10);
    }

    // Set default logo size (used for selected logo inside QR)
    const defaultLogoSize = 35;
    setLogoSize(defaultLogoSize);
    localStorage.setItem("selectedLogoSize", defaultLogoSize);

    // Set default company logo size (used for your branding)
    const defaultCompanySize = 105;
    setCompanyLogoSize(defaultCompanySize);
    localStorage.setItem("companyLogoSize", defaultCompanySize);
  }, []);

  const handleLogoClick = (src) => {
    setSelectedLogo(src);
    localStorage.setItem("selectedLogo", src);
  };

  return (
    <section className="my-4 px-4">
      {/* Logos Grid */}
      <div
        ref={ref}
        className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-7 gap-5 pr-2"
      >
        {[...logos, ...(customLogo ? [customLogo] : [])].map((src, i) => {
          const isSelected = selectedLogo === src;
          return (
            <div key={i} className="relative">
              <Image
                src={src}
                alt={`Logo ${i + 1}`}
                width={50}
                height={50}
                className={`aspect-square object-fit rounded-xl border-4 cursor-pointer transition-transform p-1 duration-200 ${
                  isSelected
                    ? "border-mainGreen scale-105 shadow-md"
                    : "border-transparent hover:border-gray-300"
                }`}
                onClick={() => handleLogoClick(src)}
              />

              {isSelected && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedLogo(null);
                    setCustomLogo(null);
                    localStorage.removeItem("selectedLogo");
                    localStorage.removeItem("customLogo");
                  }}
                  className="absolute top-[-10px] right-[3px] bg-mainGreen text-white rounded-full w-6 h-6 flex items-center justify-center text-sm shadow-md cursor-pointer"
                  title="Remove logo"
                >
                  ×
                </button>
              )}
            </div>
          );
        })}
      </div>

      {/* Upload Custom Logo */}
      <div className="my-6">
        <label className="block mb-2 text-sm font-medium text-gray-700">
          Add Your Own Logo
        </label>

        <div className="relative inline-block">
          <button
            type="button"
            onClick={() =>
              document.getElementById("custom-logo-upload").click()
            }
            className="px-4 py-2 bg-mainGreen text-white rounded-xl text-md font-bold"
          >
            Add Own Logo
          </button>

          <input
            id="custom-logo-upload"
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (!file) return;

              const reader = new FileReader();
              reader.onloadend = () => {
                const base64 = reader.result;
                setCustomLogo(base64);
                setSelectedLogo(base64);
                localStorage.setItem("customLogo", base64);
                localStorage.setItem("selectedLogo", base64);
              };
              reader.readAsDataURL(file);
            }}
            className="hidden"
          />
        </div>
      </div>
    </section>
  );
};

export default Logos;

