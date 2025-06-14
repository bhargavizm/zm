'use client';

import React from 'react';
import Image from 'next/image';

const Template3 = ({ data }) => {
  if (!data) return null;
  const days = data.days ?? [];

  return (
    <div
      className="relative w-full bg-cover bg-center rounded-xl overflow-hidden shadow-lg p-6 flex flex-col items-center justify-center text-white text-center"
      style={{
        backgroundImage: `url('https://via.placeholder.com/400x600/8b5e3c/FFFFFF?text=Pet+Shop+Background')`,
        minHeight: '300px',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Overlay for readability */}
      <div className="absolute inset-0 bg-[#3b2316] opacity-50 z-0"></div>

      {/* Top Info */}
      <div className="relative z-10 flex justify-between w-full px-2 text-xs font-medium mb-4">
        <button className="bg-white bg-opacity-20 backdrop-filter backdrop-blur-sm px-3 py-1 rounded-full text-black">
          {data.aboutUsLink || 'about us'}
        </button>
        <span className="bg-white bg-opacity-20 backdrop-filter backdrop-blur-sm px-3 py-1 rounded-full text-black">
          {data.siteLink || '@petcare'}
        </span>
      </div>

      {/* Heading */}
      <h3 className="relative z-10 text-4xl font-serif italic mb-4 leading-tight text-[#fffcf5]">
        {data.title || 'PET SHOP'}
      </h3>

      {/* Subheading */}
      <p className="relative z-10 text-md font-semibold text-[#fffaf0] tracking-widest mb-4">
        {data.subtitle || 'PET FOOD & VETERINARIAN'}
      </p>

      {/* Dog Image */}
      <div className="py-10 z-30 w-36 h-36 mx-auto mb-4">
        <Image
          src="/images/normal/dogTemp.png"
          alt="Pet"
          layout="fill"
          objectFit="contain"
          priority
        />
      </div>

      {/* Timings */}
      <div className="relative z-10 w-full max-h-[160px] overflow-y-auto hide-scrollbar space-y-2">
        {days.length > 0 ? (
          days.map((day, idx) => (
            <div
              key={idx}
              className="flex justify-between items-center text-sm bg-[#ffffff22] backdrop-blur-md rounded-full px-5 py-2.5 text-white font-medium"
            >
              <span className="flex-1 text-left">{day.day || 'DAY'}</span>
              <span className="text-right">{day.time || 'TIME'}</span>
            </div>
          ))
        ) : (
          <p className="text-white text-sm italic">No timing info provided</p>
        )}
      </div>

      {/* Footer */}
      <div className="relative z-10 w-full mt-4 text-[#ffefdb] bg-[#3b2316]/80 py-3 rounded-lg font-semibold tracking-wide">
        {data.footerText || 'OPEN EVERY DAY: 07 AM - 07 PM'}
      </div>
    </div>
  );
};

export default Template3;
