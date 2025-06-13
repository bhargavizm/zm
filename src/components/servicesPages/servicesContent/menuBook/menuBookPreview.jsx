'use client'

import React from 'react'
import Image from 'next/image' // Make sure Image component is used correctly if paths are absolute or external
import Slider from 'react-slick'
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import useServicesContext from '@/components/hooks/useServiceContext'

const MenuBookPreview = () => {
  // Destructure menuBookFormData from the context
  const { menuBookFormData } = useServicesContext() // setMenuBookFormData is not needed for preview

  // Define sliderSettings here as it's used within this component
  const sliderSettings = {
    dots: true,
    infinite: false, // Set to true if you want continuous looping
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false
  }
console.log(menuBookFormData)
  return (
    <>
      <section>
        {/* Right iPhone Preview */}
        <div className="">
          <div className="w-[320px] h-[640px] bg-black rounded-[40px] border-[12px] border-gray-900 shadow-xl relative">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-6 bg-black rounded-b-xl z-30" />
            <div className="absolute inset-0 bg-white overflow-y-auto p-4 text-black rounded-[28px] scrollbar-hidden space-y-4">
              {/* Use menuBookFormData.restaurantName */}
              <h3 className="text-lg font-bold text-[#008080]">{menuBookFormData.restaurantName}</h3>

              {/* Slider for Images */}
              {/* Use menuBookFormData.menuItems */}
              {menuBookFormData.menuItems.filter(i => i.visible !== false && i.image).length > 0 && (
                <Slider {...sliderSettings}>
                  {console.log('qwqre',menuBookFormData.menuItem)}
                  {menuBookFormData.menuItems.filter(i => i.visible !== false && i.image).map((item, i) => (
                    <div key={i} className="pb-2 mt-2">
                      {console.log('gfdfd',item)}
                      {/* Using img tag directly for now. If item.image is a relative path or local import,
                          you might need to use Next.js <Image /> component. If it's a URL from createObjectURL,
                          img tag is appropriate. */}
                      <img src={item.image} alt={menu-`${i}`} className="w-full h-[180px] object-cover rounded" />
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
              {/* Use menuBookFormData.extras */}
             {menuBookFormData.extras.filter(i => i.visible && i.value?.trim()).map((field, i) => (
  <div key={i}>
    {field.type === 'link' && (
      <a
        href={field.value}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-500 text-sm underline"
      >
        {field.value}
      </a>
    )}

    {field.type === 'form' && field.value && (
      <iframe
        src={field.value}
        title={form-`${i}`}
        className="w-full h-40 mt-2 border rounded"
      />
    )}

    {field.type === 'video' && field.value && (
      <video controls className="w-full rounded mt-2">
        <source src={field.value} />
      </video>
    )}

    {['phone', 'email'].includes(field.type) && (
      <p className="text-sm">{field.label}: {field.value}</p>
    )}
  </div>
))}

            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default MenuBookPreview