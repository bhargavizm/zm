"use client";

import React from "react";
import Image from "next/image";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import useServicesContext from "@/components/hooks/useServiceContext";
import useDesignContext from "@/components/hooks/useDesignContext";

const MenuBookPreview = () => {
  const { menuBookFormData } = useServicesContext();
  const { bgDesign } = useDesignContext();

  const isVideo = bgDesign?.endsWith(".mp4");
  const isImage = bgDesign && !isVideo;

  const sliderSettings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };

  return (
    <>
      <section className="flex justify-center items-start">
        <div className="relative w-[350px] h-[640px] border-[12px] border-gray-900 rounded-[40px] shadow-xl overflow-hidden">
          {/* Background */}
          {isImage ? (
            <img
              src={bgDesign}
              alt="Background"
              className="absolute top-0 left-0 w-full h-full object-cover z-0"
            />
          ) : isVideo ? (
            <video
              src={bgDesign}
              autoPlay
              loop
              muted
              playsInline
              className="absolute top-0 left-0 w-full h-full object-cover z-0"
            />
          ) : (
            <video
              autoPlay
              loop
              muted
              playsInline
              className="absolute top-0 left-0 w-full h-full object-cover z-0"
            >
              <source src="/services-service/menu-book.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          )}

          {/* Overlay */}
          {/* <div className="absolute inset-0 bg-white/90 backdrop-blur-sm z-10 rounded-[28px]" /> */}

          {/* Foreground content */}
          <div className="absolute inset-0 p-4 z-20 text-black overflow-y-auto scrollbar-hidden space-y-4 rounded-[28px]">
            <h3 className="text-lg font-bold text-[#008080]">
              {menuBookFormData.restaurantName}
            </h3>

            {menuBookFormData.menuItems.filter(
              (i) => i.visible !== false && i.image
            ).length > 0 && (
              <Slider {...sliderSettings}>
                {menuBookFormData.menuItems
                  .filter((i) => i.visible !== false && i.image)
                  .map((item, i) => (
                    <div key={i} className="pb-2 mt-2">
                      <img
                        src={item.image}
                        alt={`menu-${i}`}
                        className="w-full h-[180px] object-cover rounded"
                      />
                      <div className="pt-2">
                        <h4 className="font-semibold">{item.name}</h4>
                        <p className="text-sm">{item.description}</p>
                        <p className="text-sm text-[#008080] font-bold">
                          ₹{item.price}
                        </p>
                      </div>
                    </div>
                  ))}
              </Slider>
            )}

            {menuBookFormData.extras
              .filter((i) => i.visible && i.value?.trim())
              .map((field, i) => (
                <div key={i}>
                  {field.type === "link" && (
                    <a
                      href={field.value}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 text-sm underline"
                    >
                      {field.value}
                    </a>
                  )}

                  {field.type === "form" && field.value && (
                    <iframe
                      src={field.value}
                      title={`form-${i}`}
                      className="w-full h-40 mt-2 border rounded"
                    />
                  )}

                  {field.type === "video" && field.value && (
                    <video controls className="w-full rounded mt-2">
                      <source src={field.value} />
                    </video>
                  )}

                  {["phone", "email"].includes(field.type) && (
                    <p className="text-sm">
                      {field.label}: {field.value}
                    </p>
                  )}
                </div>
              ))}
          </div>

          {/* Notch */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-6 bg-black rounded-b-xl z-30" />
        </div>
      </section>
    </>
  );
};

export default MenuBookPreview;
