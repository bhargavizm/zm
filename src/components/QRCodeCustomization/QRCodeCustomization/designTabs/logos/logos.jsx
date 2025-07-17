"use client";

import useDesignContext from "@/components/hooks/useDesignContext";
import Image from "next/image";
import React, { useRef, useEffect, useState } from "react";
import { logos } from "./logoImages";

const Logos = () => {
  const {
    selectedLogo,
    setSelectedLogo,
    logoSize,
    setLogoSize,
    companyLogoSize,
    setCompanyLogoSize,
  } = useDesignContext();

  const ref = useRef(null);
  const [localLogoSize, setLocalLogoSize] = useState(logoSize || 40);
  const [localCompanySize, setLocalCompanySize] = useState(
    companyLogoSize || 80
  );

  // Load scroll + saved sizes
  useEffect(() => {
    const scroll = localStorage.getItem("logosScroll");
    if (ref.current && scroll) {
      ref.current.scrollTop = parseInt(scroll, 10);
    }

    const savedLogoSize = localStorage.getItem("selectedLogoSize");
    const savedCompanySize = localStorage.getItem("companyLogoSize");

    if (savedLogoSize) {
      setLocalLogoSize(parseInt(savedLogoSize));
      setLogoSize(parseInt(savedLogoSize));
    }
    if (savedCompanySize) {
      setLocalCompanySize(parseInt(savedCompanySize));
      setCompanyLogoSize(parseInt(savedCompanySize));
    }
  }, []);

  useEffect(() => {
    const savedSize = localStorage.getItem("selectedLogoSize");
    if (savedSize) {
      const parsed = parseInt(savedSize);
      setLocalLogoSize(parsed);
      setLogoSize(parsed);
    }
  }, []); // ✅ empty dependency array

  const handleLogoClick = (src) => {
    setSelectedLogo(src);
    localStorage.setItem("selectedLogo", src);
  };

  const handleLogoSizeChange = (e) => {
    const size = parseInt(e.target.value, 10);
    setLocalLogoSize(size);
    setLogoSize(size);
    localStorage.setItem("selectedLogoSize", size);
  };

  const handleCompanySizeChange = (e) => {
    const size = parseInt(e.target.value, 10);
    setLocalCompanySize(size);
    setCompanyLogoSize(size);
    localStorage.setItem("companyLogoSize", size);
  };

  return (
    <section className="my-4 px-4">
      {/* Logos */}
      <div
        ref={ref}
        className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-7 gap-5 pr-2"
      >
        {logos.map((src, i) => (
          <Image
            key={i}
            src={src}
            alt={`Logo ${i + 1}`}
            width={40}
            height={40}
            className={`w-full aspect-square rounded-xl border-4 cursor-pointer transition-transform duration-200 ${
              selectedLogo === src
                ? "border-mainGreen scale-105 shadow-md"
                : "border-transparent hover:border-gray-300"
            }`}
            onClick={() => handleLogoClick(src)}
          />
        ))}
      </div>

            {/* Outer Company Logo Size */}
      <div className="mb-4 flex flex-col items-start gap-1 my-6">
        <label
          htmlFor="companyLogoSize"
          className="text-sm font-medium text-gray-700"
        >
          Adjust Company Logo Size
        </label>
        <input
          id="companyLogoSize"
          type="range"
          min={40}
          max={300}
          step={1}
          value={localCompanySize}
          onChange={(e) => {
            const size = Number(e.target.value);
            setLocalCompanySize(size);
            setCompanyLogoSize(size);
            localStorage.setItem("companyLogoSize", size);
          }}
       className="w-full accent-mainGreen"
        />

        <span className="text-xs text-gray-500">
          Company Logo Size: {localCompanySize}px
        </span>
      </div>

      {/* Inner Logo Size */}
      <div className="mb-4 flex flex-col items-start gap-1">
        <label htmlFor="logoSize" className="text-sm font-medium text-gray-700">
          Adjust Logo Size (Inside)
        </label>
        <input
          id="logoSize"
          type="range"
          min={10}
          max={300}
          step={1}
          value={localLogoSize}
          onChange={(e) => {
            const size = Number(e.target.value);
            setLocalLogoSize(size); // Update local state
            setLogoSize(size); // Update context
            localStorage.setItem("selectedLogoSize", size); // Persist
          }}
          className="w-full accent-mainGreen"
        />

        <span className="text-xs text-gray-500">
          Logo Size: {localLogoSize}px
        </span>
      </div>
    </section>
  );
};

export default Logos;
