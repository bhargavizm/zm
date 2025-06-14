// "use client";

// 'use client';

// import React from 'react';
// import { Swiper, SwiperSlide } from 'swiper/react';
// import { EffectCoverflow, Navigation } from 'swiper/modules';
// import 'swiper/css';
// import 'swiper/css/effect-coverflow';
// import 'swiper/css/navigation';
// import { ChevronLeft, ChevronRight } from 'lucide-react';
// import DesignCardsData from './designCardsData';
// import { useLanguage } from '@/context/languageContext/LanguageContext';


// const QRDesign = () => {
//     const { dictionary } = useLanguage();
//   return (
//     <>
//   <section className="bg-darkGreen py-18">
//     {/* <h2 className='text-white font-bold text-2xl md:text-4xl text-center pb-5'>A perfect combination of QR Design, Marketing and Management</h2> */}
//     <h2 className='text-white font-bold text-2xl md:text-4xl text-center pb-5'>{dictionary.qrDesignSection.heading}</h2>
//     {/* <p className='text-slate-500 pb-9 text-center text-lg'>Customize and create QR code with logo, color, and shape to attract more scans</p> */}
//     <p className='text-slate-500 pb-9 text-center text-lg'>{dictionary.qrDesignSection.paragraph}</p>
//   <div className="max-w-6xl  mx-auto relative px-4">
//     <Swiper
//       modules={[EffectCoverflow, Navigation]}
//       effect="coverflow"
//       grabCursor
//       centeredSlides
//       slidesPerView="auto"
//       loop
//       navigation={{
//         nextEl: '.swiper-button-next',
//         prevEl: '.swiper-button-prev',
//       }}
//       coverflowEffect={{
//         rotate: 50,
//         stretch: 0,
//         depth: 150,
//         modifier: 1,
//         slideShadows: true,
//       }}
//       className="mySwiper"
//     >
//       {DesignCardsData && DesignCardsData.map((card, index) => (
//         <SwiperSlide key={index} className="w-[300px] !h-auto">
//   <div className="bg-white rounded-xl shadow-xl p-5 flex flex-col h-full border-2 border-dashed border-darkGreen">
    
//     {/* Image Wrapper with fixed aspect ratio */}
//     <div className="w-full aspect-[4/3] overflow-hidden rounded-md">
//       <img
//         src={card.image}
//         alt={`Slide ${index}`}
//         className="w-full h-44 object-cover"
//       />
//     </div>
//       <section className="bg-darkGreen py-18">
//         <h2 className="text-white font-bold text-2xl md:text-4xl text-center pb-5">
//           A perfect combination of QR Design, Marketing and Management
//         </h2>
//         <p className="text-slate-500 pb-9 text-center text-lg">
//           Customize and create QR code with logo, color, and shape to attract
//           more scans
//         </p>
//         <div className="max-w-6xl  mx-auto relative px-4">
//           <Swiper
//             modules={[EffectCoverflow, Navigation]}
//             effect="coverflow"
//             grabCursor
//             centeredSlides
//             slidesPerView="auto"
//             loop
//             navigation={{
//               nextEl: ".swiper-button-next",
//               prevEl: ".swiper-button-prev",
//             }}
//             coverflowEffect={{
//               rotate: 50,
//               stretch: 0,
//               depth: 150,
//               modifier: 1,
//               slideShadows: true,
//             }}
//             className="mySwiper"
//           >
//             {DesignCardsData &&
//               DesignCardsData.map((card, index) => (
//                 <SwiperSlide key={index} className="w-[300px] !h-auto">
//                   <div className="bg-white rounded-xl shadow-xl p-5 flex flex-col h-full border-4 border-dashed border-mainGreen">
//                     {/* Image Wrapper with fixed aspect ratio */}
//                     <div className="w-full aspect-[4/3] overflow-hidden rounded-md">
//                       <img
//                         src={card.image}
//                         alt={`Slide ${index}`}
//                         className="w-full h-40 object-cover"
//                       />
//                     </div>

//                     {/* Title and Description */}
//                     <h3 className="text-2xl pb-4 font-bold text-mainGreen text-center">
//                       {card.title}
//                     </h3>
//                     <p className="text-sm text-gray-600 mt-2 text-center">
//                       {card.description}
//                     </p>
//                   </div>
//                 </SwiperSlide>
//               ))}

//             {/* Navigation Arrows */}
//             <div className="swiper-button-prev absolute left-0 top-1/2 -translate-y-1/2 z-10 text-white p-2 rounded-full">
//               <ChevronLeft size={28} />
//             </div>
//             <div className="swiper-button-next absolute right-0 top-1/2 -translate-y-1/2 z-10 text-white  p-2 rounded-full">
//               <ChevronRight size={28} />
//             </div>
//           </Swiper>
//         </div>
//       </section>
//     </>
//   );
// };

// export default QRDesign;



"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";
import DesignCardsData from "./designCardsData";
import { useLanguage } from '@/context/languageContext/LanguageContext';

const QRDesign = () => {
    const { dictionary } = useLanguage();

  return (
    <>
      <section className="bg-darkGreen py-18">
        {/* <h2 className="text-white font-bold text-2xl md:text-4xl text-center pb-5">
          A perfect combination of QR Design, Marketing and Management
        </h2> */}
      <h2 className='text-white font-bold text-2xl md:text-4xl text-center pb-5'>{dictionary.qrDesignSection.heading}</h2>
        {/* <p className="text-slate-500 pb-9 text-center text-lg">
          Customize and create QR code with logo, color, and shape to attract
          more scans
        </p> */}
        <p className='text-slate-500 pb-9 text-center text-lg'>{dictionary.qrDesignSection.paragraph}</p>
        <div className="max-w-6xl  mx-auto relative px-4">
          <Swiper
            modules={[EffectCoverflow, Navigation]}
            effect="coverflow"
            grabCursor
            centeredSlides
            slidesPerView="auto"
            loop
            navigation={{
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            }}
            coverflowEffect={{
              rotate: 50,
              stretch: 0,
              depth: 150,
              modifier: 1,
              slideShadows: true,
            }}
            className="mySwiper"
          >
            {DesignCardsData &&
              DesignCardsData.map((card, index) => (
                <SwiperSlide key={index} className="w-[300px] !h-auto">
                  <div className="bg-white rounded-xl shadow-xl p-5 flex flex-col h-full border-4 border-dashed border-mainGreen">
                    {/* Image Wrapper with fixed aspect ratio */}
                    <div className="w-full aspect-[4/3] overflow-hidden rounded-md pt-4">
                      <img
                        src={card.image}
                        alt={`Slide ${index}`}
                        className="w-full h-32 object-cover"
                      />
                    </div>

                    {/* Title and Description */}
                    <h3 className="text-2xl pb-4 font-bold text-mainGreen text-center">
                      {card.title}
                    </h3>
                    <p className="text-sm text-gray-600 mt-2 text-center">
                      {card.description}
                    </p>
                  </div>
                </SwiperSlide>
              ))}

            {/* Navigation Arrows */}
            <div className="swiper-button-prev absolute left-0 top-1/2 -translate-y-1/2 z-10 text-white p-2 rounded-full">
              <ChevronLeft size={28} />
            </div>
            <div className="swiper-button-next absolute right-0 top-1/2 -translate-y-1/2 z-10 text-white  p-2 rounded-full">
              <ChevronRight size={28} />
            </div>
          </Swiper>
        </div>
      </section>
    </>
  );
};

export default QRDesign;