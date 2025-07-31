"use client";

import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import BgDesignRenderer from "./bgDesignRender";

const GalleryPreview = ({ data = {} }) => {
  const { title = "", description = "", files = [], bgDesign } = data;
  const defaultBg = "/services-service/image-gallery.webp";

  const [imagePreviews, setImagePreviews] = useState([]);

  useEffect(() => {
    if (!files || files.length === 0) {
      setImagePreviews([]);
      return;
    }

    const previews = files.map((file) => {
      const isLocal = file instanceof File;
      return {
        url: isLocal ? URL.createObjectURL(file) : file.url || "",
        name: file.name || file.fileName || "Image",
        local: isLocal,
      };
    });

    setImagePreviews(previews);

    return () => {
      previews.forEach((img) => {
        if (img.local) URL.revokeObjectURL(img.url);
      });
    };
  }, [files]);

  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
     arrows: true,         // Manual click arrows
  autoplay: true,       // Automatic slide
  autoplaySpeed: 3000,  // Time between slides (in ms)
  pauseOnHover: true, 
  };

  return (
    <div>
      <div>
        {/* Background */}
        <div className="absolute inset-0 z-0">
          <BgDesignRenderer bgDesign={bgDesign} defaultBg={defaultBg} />
        </div>

        {/* Foreground Content */}
        <div className="relative z-10 p-9 m-2 flex flex-col  space-y-4 text-black text-center bg-white/50 ">
          {title && (
            <div className="flex gap-2">
              <p className="text-xl font-semibold">Title:</p>
              <p className="text-xl font-bold">{title}</p>
            </div>
          )}
          {description && (
            <div className="flex gap-2">
              <p className="text-xl font-semibold">Description:</p>
              <p className="text-xl font-medium whitespace-pre-wrap">
                {description}
              </p>
            </div>
          )}

          <div className="mb-2 text-center w-full">
            <p className="text-md font-medium">
              Images 
            </p>

            {imagePreviews.length > 0 ? (
              <div className="mt-4 w-full max-w-md mx-auto">
                <Slider {...sliderSettings}>
                  {imagePreviews.map((img, idx) => (
                    <div key={idx} className="px-2">
                      <img
                        src={img.url}
                        alt={img.name}
                        className="rounded-lg object-cover w-full h-64 mx-auto"
                      />
                    </div>
                  ))}
                </Slider>
              </div>
            ) : (
              <p className="text-sm text-white/70">No images selected</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GalleryPreview;
