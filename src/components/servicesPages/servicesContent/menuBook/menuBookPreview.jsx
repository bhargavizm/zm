'use client'

import React from 'react'
import Image from 'next/image'
import Slider from 'react-slick'
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import useServicesContext from '@/components/hooks/useServiceContext'

const MenuBookPreview = () => {
  const { menuBookFormData } = useServicesContext()
  const { restaurantName = '', menuItems = [], extras = [] } = menuBookFormData || {}

  const sliderSettings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false
  }

  return (
    <>
      <style jsx>{`
        .bg-image-overlay {
          position: relative;
          overflow: hidden;
          border-radius: 1.5rem;
        }

        .bg-image-overlay::before {
          content: "";
          position: absolute;
          inset: 0;
          background-image: url("/services-service/menu.webp");
          background-size: cover;
          background-position: center;
          opacity: 0.2;
          z-index: 0;
          border-radius: 1.5rem;
        }

        .bg-image-overlay > * {
          position: relative;
          z-index: 1;
        }

        .scroll-container::-webkit-scrollbar {
          width: 6px;
        }

        .scroll-container::-webkit-scrollbar-thumb {
          background-color: #888;
          border-radius: 6px;
        }

        .scroll-container::-webkit-scrollbar-thumb:hover {
          background-color: #555;
        }
      `}</style>

      <section className="flex justify-center items-start">
        <div className="w-[320px] h-[640px] bg-black rounded-[40px] border-[12px] border-gray-900 shadow-xl relative">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-6 bg-black rounded-b-xl z-30" />

          <div className="absolute inset-0 bg-white text-black rounded-[28px] scroll-container overflow-y-auto p-4 space-y-4 bg-image-overlay">
            <h3 className="text-lg font-bold text-[#008080] text-center">{restaurantName}</h3>

            {/* Slider */}
            {menuItems.filter(i => i.visible !== false && i.image).length > 0 && (
              <Slider {...sliderSettings}>
                {menuItems
                  .filter(i => i.visible !== false && i.image)
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
                        <p className="text-sm text-[#008080] font-bold">₹{item.price}</p>
                      </div>
                    </div>
                  ))}
              </Slider>
            )}

            {/* Extras */}
            {extras.filter(i => i.visible).map((field, i) => (
              <div key={i} className="mt-3">
                {field.type === 'link' ? (
                  <a
                    href={field.value}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 text-sm underline block"
                  >
                    {field.label || 'Link'}: {field.value}
                  </a>
                ) : field.type === 'form' ? (
                  <iframe
                    src={field.value}
                    title={`form-${i}`}
                    className="w-full h-40 border rounded"
                  />
                ) : field.type === 'video' ? (
                  <video controls className="w-full rounded">
                    <source src={field.value} />
                  </video>
                ) : (
                  <p className="text-sm">
                    {field.label}: {field.value}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

export default MenuBookPreview
