'use client';

import React from 'react';
import Slider from 'react-slick';
import { useRouter } from 'next/navigation';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { ChevronLeft, ChevronRight } from 'lucide-react';

// Custom Arrows
const NextArrow = ({ onClick }) => (
  <div
    onClick={onClick}
    className="absolute top-1/2 -right-4 z-10 transform -translate-y-1/2 cursor-pointer bg-gradient-to-br from-[#008080] to-[#00b3b3] p-2 rounded-full shadow-md hover:from-[#006666] hover:to-[#009999] transition"
  >
    <ChevronRight className="text-white" />
  </div>
);

const PrevArrow = ({ onClick }) => (
  <div
    onClick={onClick}
    className="absolute top-1/2 -left-4 z-10 transform -translate-y-1/2 cursor-pointer bg-gradient-to-br from-[#008080] to-[#00b3b3] p-2 rounded-full shadow-md hover:from-[#006666] hover:to-[#009999] transition"
  >
    <ChevronLeft className="text-white" />
  </div>
);

const Carousel = ({ items = [] }) => {
  const router = useRouter();

  const handleCardClick = (role) => {
    const query = new URLSearchParams();
    query.append('role', role);
    router.push(`/career/jobs?${query.toString()}`);
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 768, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <div className="relative px-4">
      <Slider {...settings}>
        {items.map((job, idx) => (
          <div key={idx} className="p-4">
            <div
              onClick={() => handleCardClick(job.title)}
              className="bg-white border border-gray-200 shadow-md rounded-xl flex flex-col items-center justify-center p-6 h-64 hover:shadow-xl transition duration-300 cursor-pointer"
            >
              <img
                src={job.icon || '/placeholder.webp'}
                alt={job.title}
                className="w-full h-40 mb-4 object-contain rounded-md"
              />
              <p className="text-lg font-semibold text-center text-gray-800">
                {job.title}
              </p>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Carousel;
