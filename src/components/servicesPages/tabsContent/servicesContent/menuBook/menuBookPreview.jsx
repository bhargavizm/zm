"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import useServicesContext from "@/components/hooks/useServiceContext";
import useDesignContext from "@/components/hooks/useDesignContext";

// ✅ Custom Arrows
const CustomPrevArrow = ({ onClick }) => (
  <button
    onClick={onClick}
    className="absolute left-1 top-1/2 z-30 -translate-y-1/2 bg-white text-mainGreen w-8 h-8 rounded-full shadow flex items-center justify-center cursor-pointer"
    aria-label="Previous"
  >
    <span className="text-4xl leading-[1]">‹</span>
  </button>
);

const CustomNextArrow = ({ onClick }) => (
  <button
    onClick={onClick}
    className="absolute right-1 top-1/2 z-30 -translate-y-1/2 bg-white text-mainGreen w-8 h-8 rounded-full shadow flex items-center justify-center cursor-pointer"
    aria-label="Next"
  >
    <span className="text-4xl leading-[1]">›</span>
  </button>
);


const MenuBookPreview = () => {
  const { bgDesign, setBgDesign, isLoading, setIsLoading } = useDesignContext();
  const { menuBookFormData } = useServicesContext();

  const [isMounted, setIsMounted] = useState(false);
  const defaultBg = "/services-service/menu.webp";

  useEffect(() => {
    setIsMounted(true);
    setIsLoading(true);
    setBgDesign(defaultBg);
    const timeout = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timeout);
  }, []);

  const isVideo = bgDesign?.endsWith(".mp4") || bgDesign?.endsWith(".webm");
  const isImage = bgDesign && !isVideo;

  const sliderSettings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
  };

  return (
    <section className="flex justify-center items-start ">
      <div className="relative w-[350px] h-[600px] rounded-[40px] border-[14px] sm:border-[12px] border-gray-900 sm:rounded-[40px] shadow-xl overflow-hidden bg-white">
        {/* Background */}
        {isImage ? (
          <img
            src={bgDesign}
            alt="Background"
            onLoad={() => setTimeout(() => setIsLoading(false), 300)}
            className="absolute top-0 left-0 w-full h-full object-cover z-0"
          />
        ) : isVideo ? (
          <video
            src={bgDesign}
            autoPlay
            loop
            muted
            playsInline
            onLoadedData={() => setTimeout(() => setIsLoading(false), 300)}
            className="absolute top-0 left-0 w-full h-full object-cover z-0"
          />
        ) : (
          <img
            src={defaultBg}
            alt="Default Background"
            onLoad={() => setTimeout(() => setIsLoading(false), 300)}
            className="absolute top-0 left-0 w-full h-full object-cover z-0"
          />
        )}

        {/* Loader */}
        {isLoading && (
          <div className="absolute inset-0 z-50 bg-mainGreen backdrop-blur-sm flex justify-center items-center">
            <Image
              src="/logos/ZM LOGO.webp"
              alt="Loading"
              width={100}
              height={100}
              className="w-20 h-20 animate-bounce"
            />
          </div>
        )}

        {/* Foreground Content */}
        <div className="absolute inset-0 p-4 z-20 bg-white/70 m-2 pt-12 text-black overflow-y-auto scrollbar-hidden space-y-4 rounded-[28px]">
          {/* Restaurant Name */}
          {menuBookFormData.restaurantName && (
            <h2 className="text-xl pb-6 font-bold text-center text-[#004d4d]">
              {menuBookFormData.restaurantName}
            </h2>
          )}

          {/* Menu Slider */}
          {isMounted && menuBookFormData.menuItems?.length > 0 && (
            <div className="relative min-h-[220px]">
              <Slider {...sliderSettings}>
                {menuBookFormData.menuItems.map((item, idx) => (
                  <div key={idx} className="px-4">
                    <img
                      src={item.image || "/fallback-image.webp"}
                      alt={`Menu ${idx}`}
                      className="w-full h-52 object-center rounded-md border border-gray-300 shadow"
                    />
                  </div>
                ))}
              </Slider>
            </div>
          )}

          {/* Contact Info */}
          <div className="text-lg space-y-1 mt-3">
            {menuBookFormData.phone && (
              <p>📞 <span>{menuBookFormData.phone}</span></p>
            )}
            {menuBookFormData.email && (
              <p>📧 <span>{menuBookFormData.email}</span></p>
            )}
            {menuBookFormData.link && (
             <p>
  🔗{" "}
  <a
    href={menuBookFormData.link}
    target="_blank"
    rel="noopener noreferrer"
    className="text-blue-600 underline break-all"
  >
    {menuBookFormData.link}
  </a>
</p>

            )}
          </div>
        </div>

        {/* Notch */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-5 bg-black rounded-b-xl z-30 sm:w-24 sm:h-6" />
      </div>
    </section>
  );
};

export default MenuBookPreview;
