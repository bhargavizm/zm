'use client';
import Image from 'next/image';
import React from 'react';

export default function Template3() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#e7d6ce]">
      <div className="w-[375px] h-[812px] rounded-3xl shadow-lg overflow-hidden relative border border-gray-300 bg-[#e7d6ce]">
        {/* Top decorations */}
        <div className="absolute top-0 left-0 w-full flex justify-between px-6 pt-6">
          <div className="w-16 h-16 bg-[#d0bcb3] rounded-full opacity-50"></div>
          <div className="w-20 h-20 bg-[#d0bcb3] rounded-full opacity-50"></div>
        </div>

        {/* Content */}
        <div className="relative h-full flex flex-col items-center justify-between overflow-hidden">
          {/* Title */}
          <div className="text-center mt-12">
            <h1 className="text-4xl font-extrabold text-[#3b2316] tracking-wide">PET SHOP</h1>
            <p className="text-md mt-2 font-semibold text-[#3b2316] tracking-widest">
              PET FOOD & VETERINARIAN
            </p>
          </div>

          {/* Dog image */}
          <div className="flex-1 flex items-center justify-center relative mt-4">
            <Image
              src="/images/normal/dogTemp.png"
              alt="dog"
              width={300}
              height={500}
              className="object-contain"
              priority
            />
          </div>

          {/* Bottom cloud shape & time */}
          <div className="w-full text-center bg-[#d0bcb3] text-[#3b2316] py-4 mt-4">
            <p className="text-md font-semibold tracking-wide">OPEN EVERY DAY</p>
            <p className="text-2xl font-extrabold mt-1">07 AM - 07 PM</p>
          </div>
        </div>
      </div>
    </div>
  );
}
