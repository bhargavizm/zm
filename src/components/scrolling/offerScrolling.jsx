"use client";
import React from "react";
import Image from "next/image";

const OfferScrolling = () => {
  const speed = typeof window !== "undefined" && window.innerWidth < 768 ? 8 : 23;
  return (
    <div className=" w-full z-80 overflow-hidden bg-white cursor-pointer mb-4">
      <div className="marquee flex items-center whitespace-nowrap space-x-56 "   style={{ animationDuration: `${speed}s` }}>
        {[...Array(3)].map((_, index) => (
          <div
            key={index}
            className="scroll-text text-2xl tracking-wide text-mainGreen flex items-center space-x-4 px-4"
          >
            {/* <Image
              src="/logos/ZM LOGO.webp"
              alt="ZM QR Code Offer"
              width={90}
              height={90}
              className="inline-block"
            /> */}
            {/* <span>
              <img src="/videos/free.gif" alt="Funny gif" className="w-64 h-auto" />

              ✨<span className='inline  font-medium  py-2 px-4 rounded-2xl '> <span className='animate-ping text-red-600 [animation-duration:1s]'>Absolutely Free Trial!</span></span> - <span className='text-[#d80208]'>New to ZM? Enjoy 90 Days of Unlimited Scans + 5 QR Codes </span>– <span className='inline text-red-700 font-medium'><span className='animate-ping text-red-600 [animation-duration:1s]'>Absolutely Free Trial!</span></span> ✨
            </span> */}
            <span className="flex items-center gap-2 text-2xl leading-tight">
              <img
                src="/videos/free.gif"
                alt="Free Trial Gif"
                className="w-24 h-18 object-contain"
              />
              <span className="font-medium text-red-600 relative">
                {/* <span className="animate-bounce">
      Absolutely Free Trial! 
    </span> */}
                {/* <span className="opacity-0">Absolutely Free Trial!</span> */}
              </span>
              <span className="text-[#d80208]">
                New to ZM? Enjoy 90 Days of Unlimited Scans + 5 QR Codes
              </span>
              -
              <span className="font-medium text-red-700 relative">
                <span className="animate-bounce">Absolutely Free Trial!</span>
                {/* <span className="opacity-0">Absolutely Free Trial!</span> */}
              </span>
              <img
                src="/videos/free.gif"
                alt="Free Trial Gif"
                className="w-18 h-18 object-contain"
              />
            </span>
          </div>
        ))}
      </div>

      {/* Embedded CSS */}
      <style jsx>{`
        @import url("https://fonts.googleapis.com/css2?family=Dancing+Script:wght@700&display=swap");

        .scroll-text {
          font-family: sans;
        }

        .marquee {
          animation: marquee ${speed}s linear infinite;
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
