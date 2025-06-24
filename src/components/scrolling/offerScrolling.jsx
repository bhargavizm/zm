"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";

const OfferScrolling = () => {
  const [speed, setSpeed] = useState(15); // Default desktop speed

  useEffect(() => {
    // Only runs on client
    const mobile = window.innerWidth < 768;
    setSpeed(mobile ? 10 : 15);
  }, []);

  return (
    <div className="w-full z-80 overflow-hidden bg-white cursor-pointer mb-4">
      <div
        className="marquee flex items-center whitespace-nowrap space-x-56"
        style={{ animationDuration: `${speed}s` }}
      >
        {[...Array(3)].map((_, index) => (
          <div
            key={index}
            className="scroll-text text-2xl tracking-wide text-mainGreen flex items-center space-x-4 px-4"
          >
            <span className="flex items-center gap-2 text-2xl leading-tight">
              <img
                src="/videos/free.gif"
                alt="Free Trial Gif"
                className="w-24 h-18 object-contain"
              />
              <span className="text-[#d80208]">
                New to ZM? Enjoy 90 Days of Unlimited Scans + 5 QR Codes
              </span>
              -
              <span className="font-medium text-red-700 relative">
                <span className="animate-bounce">Absolutely Free Trial!</span>
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

      <style jsx>{`
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
