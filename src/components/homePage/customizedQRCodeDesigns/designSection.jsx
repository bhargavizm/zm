"use client";

import React from "react";
import { TiBusinessCard } from "react-icons/ti";
import { MdPets, MdArrowForwardIos } from "react-icons/md";
import Link from "next/link";
import { useParams, useSearchParams  } from "next/navigation";
import clsx from "clsx";
import { FaCar, FaVideo } from "react-icons/fa";
import { ImHeadphones } from "react-icons/im";
import { GrGallery } from "react-icons/gr";
import { FaHandsHoldingChild } from "react-icons/fa6";
import { FiArrowLeft } from "react-icons/fi";

const tabLinks = [
  {
    href: "/services/business-shops",
    label: "Business Shop",
    icon: <TiBusinessCard size={28} />,
  },
  {
    href: "/services/Pet-ID-tags",
    label: "Pet ID Tag",
    icon: <MdPets size={28} />,
  },
  { href: "/services/vehicles", label: "Vehicles", icon: <FaCar size={28} /> },
  {
    href: "/services/kids-safety-qr-tags",
    label: "Kids Safety",
    icon: <FaHandsHoldingChild size={28} />,
  },
  {
    href: "/services/audios",
    label: "Audio",
    icon: <ImHeadphones size={28} />,
  },
  { href: "/services/videos", label: "video", icon: <FaVideo size={28} /> },
  {
    href: "/services/gallery",
    label: "Gallery",
    icon: <GrGallery size={28} />,
  },
  { href: "/services", label: "More", icon: <MdArrowForwardIos size={28} /> },
];

const DesignSection = () => {
  const { slug } = useParams();
  const searchParams = useSearchParams();
const from = searchParams.get("from");

  return (
    <>
      <div>
     <Link
  href={`/services#${from || slug}`}
  className="text-white underline flex items-center text-lg px-9 pt-9 gap-2 hover:text-darkGreen"
>
  <FiArrowLeft />
  Back to services
</Link>
      </div>

      <div className="px-4 sm:px-8 md:px-14 py-6 mx-auto">
        <div className="flex lg:justify-center w-full overflow-x-auto gap-x-6 border-b   border-white/40 pb-9">
          {tabLinks.map(({ href, label, icon }) => {
            const isActive = href.includes(slug);

            return (
              <Link
                key={label}
                href={href}
                className={clsx(
                  "flex-shrink-0 flex flex-col items-center justify-center min-w-[80px] group transition-all duration-300",
                  isActive && "font-bold text-darkGreen"
                )}
              >
                <div
                  className={clsx(
                    "w-14 h-14 flex items-center justify-center rounded-full transition-all duration-300",
                    isActive
                      ? "bg-white text-darkGreen pb-2"
                      : "bg-transparent group-hover:bg-white"
                  )}
                >
                  {React.cloneElement(icon, {
                    className: clsx(
                      "transition-all duration-300",
                      isActive
                        ? "text-darkGreen"
                        : "text-white group-hover:text-darkGreen"
                    ),
                  })}
                </div>
                <p
                  className={clsx(
                    "text-sm text-center transition-colors duration-300",
                    isActive
                      ? "text-darkGreen font-bold"
                      : "text-white group-hover:text-darkGreen"
                  )}
                >
                  {label}
                </p>
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default DesignSection;
