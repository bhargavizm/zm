'use client';
import React from 'react';
import Image from 'next/image';

const OfferScrolling = () => {
  return (
    <div className=" w-full fixed top-0 z-80 overflow-hidden mt-[10vh] bg-white cursor-pointer ">
      <div className="marquee flex items-center whitespace-nowrap space-x-16">
        {[...Array(3)].map((_, index) => (
          <div
            key={index}
            className="scroll-text text-3xl tracking-wide text-mainGreen flex items-center space-x-4 px-4"
          >
            <Image
              src="/logos/ZM LOGO.webp"
              alt="ZM QR Code Offer"
              width={90}
              height={90}
              className="inline-block"
            />
            <span>
              ✨ Start your journey with ZM and enjoy unlimited scans free for the first 90 days. No limits. No charges up to 5 qr codes ✨
            </span>
          </div>
        ))}
      </div>

      {/* Embedded CSS */}
      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@700&display=swap');

        .scroll-text {
          font-family: sans;
        }

        .marquee {
          animation: marquee 30s linear infinite;
        }

        .marquee:hover {
          animation-play-state: paused;
        }

        @keyframes marquee {
          0% {
            transform: translateX(100%);
          }
          100% {
            transform: translateX(-100%);
          }
        }
      `}</style>
    </div>
  );
};

export default OfferScrolling;
