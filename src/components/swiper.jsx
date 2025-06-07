// 'use client';

// import React from 'react';
// import { Swiper, SwiperSlide } from 'swiper/react';
// import { Navigation, EffectCoverflow } from 'swiper/modules';
// import 'swiper/css';
// import 'swiper/css/navigation';
// import 'swiper/css/effect-coverflow';
// import { EffectCoverflow, Navigation, Pagination } from 'swiper/modules';

// import { ChevronLeft, ChevronRight } from 'lucide-react'; // Optional: Lucide icons

// const slides = [
//   '/images/bg-demo-image.png',
//   '/images/bg-demo.png',
//   '/images/logo.svg',
//   '/images/scan.png',
//   '/images/stickers.png',
// ];

// const CoverflowSwiper = () => {
//   return (
//     <div className="relative max-w-5xl mx-auto py-12">
//       {/* Swiper Container */}
//       <Swiper
//   effect="coverflow"
//   grabCursor={true}
//   centeredSlides={true}
//   slidesPerView="auto"
//   loop={true}
//   coverflowEffect={{
//     rotate: 50,
//     stretch: 0,
//     depth: 100,
//     modifier: 1,
//     slideShadows: true,
//   }}
//   navigation={true}
//   pagination={{ clickable: true }}
//   modules={[EffectCoverflow, Navigation, Pagination]}
//   className="mySwiper"
// >
//   {images.map((image, index) => (
//     <SwiperSlide key={index}>
//       <img src={image} alt={`Slide ${index}`} />
//     </SwiperSlide>
//   ))}
// </Swiper>

//     </div>
//   );
// };

// export default CoverflowSwiper;

'use client';

import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/navigation';

import { ChevronLeft, ChevronRight } from 'lucide-react';


const slides = [
    '/images/bg-demo-image.png',
    '/images/bg-demo.png',
    '/images/logo.svg',
    '/images/scan.png',
    '/images/stickers.png',
];

const CoverflowSwiper = () => {
    return (
        <div className="relative max-w-6xl mx-auto py-10 px-4">
            <Swiper
                modules={[EffectCoverflow, Navigation]}
                effect="coverflow"
                grabCursor
                centeredSlides
                slidesPerView="auto"
                loop
                navigation={{
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                }}
                coverflowEffect={{
                    rotate: 50,
                    stretch: 0,
                    depth: 100,
                    modifier: 1,
                    slideShadows: true,
                }}
                className="mySwiper"
            >
                {slides.map((src, index) => (
                    <SwiperSlide key={index} className="w-[250px]">
                        <img
                            src={src}
                            alt={`Slide ${index}`}
                            className="rounded-lg shadow-lg object-cover w-full h-[300px]"
                        />
                    </SwiperSlide>
                ))}

                {/* Custom Arrows */}
                <div className="swiper-button-prev absolute left-0 top-1/2 -translate-y-1/2 z-10 text-white bg-black/40 p-2 rounded-full">
                    <ChevronLeft size={28} />
                </div>
                <div className="swiper-button-next absolute right-0 top-1/2 -translate-y-1/2 z-10 text-white bg-black/40 p-2 rounded-full">
                    <ChevronRight size={28} />
                </div>
            </Swiper>
        </div>
    );
};

export default CoverflowSwiper;
