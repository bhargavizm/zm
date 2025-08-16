"use client";

import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import useDesignContext from "@/components/hooks/useDesignContext";
import BgDesignRenderer from "./bgDesignRender";

// Custom Arrows
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

const MenuBookPreview = ({ data = {} }) => {
  const { bgDesign, setBgDesign } = useDesignContext();
  const [isMounted, setIsMounted] = useState(false);
  const defaultBg = "/services-service/menu.webp";

  useEffect(() => {
    setIsMounted(true);

    if (data?.bgDesign) {
      setBgDesign(data.bgDesign);
    } else {
      setBgDesign(defaultBg);
    }
  }, [data]);

  const sliderSettings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 3000,
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
  };

  const { restaurantName, images = [], phone, email, link } = data;

  return (
    <section className="flex justify-center items-start">
      <div>
        {/* Background */}
        <BgDesignRenderer bgDesign={bgDesign} defaultBg={defaultBg} />
        {/* Foreground Content */}
        <div className="absolute inset-0 p-4 z-20 bg-white/70 m-2 pt-12 text-black overflow-y-auto scrollbar-hidden space-y-4 rounded-[28px]">
          {restaurantName && (
            <h2 className="text-xl pb-6 font-bold text-center text-[#004d4d]">
              {restaurantName}
            </h2>
          )}

          {isMounted && images.length > 0 && (
            <div className="relative ">
              <Slider {...sliderSettings}>
                {images.map((img, idx) => (
                  <div key={idx} className="px-4">
                    <img
                      src={img.url}
                      alt={img.name || `Image ${idx + 1}`}
                      className="rounded-lg object-center w-full h-[300px] mx-auto"
                    />
                  </div>
                ))}
              </Slider>
            </div>
          )}

          <div className="text-lg space-y-1 mt-3">
            {phone && (
              <p>
                📞 <span>{phone}</span>
              </p>
            )}
            {email && (
              <p>
                📧 <span>{email}</span>
              </p>
            )}
            {link && (
              <p>
                🔗{" "}
                <a
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline"
                >
                  {link}
                </a>
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MenuBookPreview;
