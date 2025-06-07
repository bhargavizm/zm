'use client';

import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { ChevronLeft, ChevronRight } from 'lucide-react';

// Custom Arrow Components
const NextArrow = (props) => {
  const { onClick } = props;
  return (
    <div
      className="absolute top-1/2 -right-4 z-10 transform -translate-y-1/2 cursor-pointer bg-[#15a6b6] p-2 rounded-full shadow-md hover:bg-[#128888] transition"
      onClick={onClick}
    >
      <ChevronRight className="text-white" />
    </div>
  );
};

const PrevArrow = (props) => {
  const { onClick } = props;
  return (
    <div
      className="absolute top-1/2 -left-4 z-10 transform -translate-y-1/2 cursor-pointer bg-[#15a6b6] p-2 rounded-full shadow-md hover:bg-[#128888] transition"
      onClick={onClick}
    >
      <ChevronLeft className="text-white" />
    </div>
  );
};

const Carousel = ({ items = [] }) => {
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
    <div className="relative">
      <Slider {...settings}>
        {items.map((job, idx) => (
          <div key={idx} className="p-4">
            <div className="bg-white border border-gray-200 shadow-md rounded-lg flex flex-col items-center p-6 h-60 justify-center hover:shadow-xl transition duration-300">
              <img
                src={job.icon || '/placeholder.png'}
                alt={job.title}
                className="w-20 h-20 mb-4 object-contain"
              />
              <p className="text-xl font-semibold text-center">{job.title}</p>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Carousel;
