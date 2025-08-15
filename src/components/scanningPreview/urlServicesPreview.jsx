// "use client";
// import { useEffect } from "react";

// const UrlServicePreview = ({ data }) => {
//   console.log(data);
//   useEffect(() => {
//     if (data?.url) {
//       const newTab = window.open(data.url, "_blank", "noopener,noreferrer");
//       if (newTab) newTab.opener = null; // extra safety
//     }
//   }, [data?.url]);

//   return null;
// };

// export default UrlServicePreview;



"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { HiArrowRight } from "react-icons/hi";

const UrlServicePreview = ({ data }) => {
  return (
    <>
        <nav className="bg-mainGreen h-[10vh] py-2 text-white fixed top-0 left-0 right-0 w-full z-50">
        {/* Logo */}
        <Link href="#" className="flex items-center gap-3">
          <div className="w-full h-auto">
            <Image
              src="/logos/zm-full.webp"
              alt="logo"
              width={170}
              height={50}
              priority
            />
          </div>
        </Link>
    
        </nav>
    <div className="flex justify-center items-center h-screen bg-mainGreen p-4">
      <a
        href={data?.url}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2  border-white border-4 border-double  p-4 text-white font-bold underline text-xl hover:text-blue-500 transition-all duration-200 rounded-2xl shadow-xl"
      >
        Go to Link <HiArrowRight size={22} />
      </a>
    </div>
    </>
  );
};

export default UrlServicePreview;


