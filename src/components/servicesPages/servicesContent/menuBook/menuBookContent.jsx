'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import Slider from 'react-slick'
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import useServicesContext from '@/components/hooks/useServiceContext'

const Toggle = ({ checked, onChange }) => (
  <label className="inline-flex items-center cursor-pointer ml-2">
    <input type="checkbox" className="sr-only peer" checked={checked} onChange={onChange} />
    <div className="w-11 h-6 bg-gray-300 rounded-full peer peer-checked:bg-green-500 relative transition-all">
      <div className="absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform peer-checked:translate-x-5" />
    </div>
  </label>
)

const MenuBookContent = () => {
  // Destructure menuBookFormData and setMenuBookFormData from the context
  const { menuBookFormData, setMenuBookFormData } = useServicesContext()

  const [extraOpenIndex, setExtraOpenIndex] = useState(null)

  const handleToggleChange = (index) => {
    // Use menuBookFormData here
    const updated = [...menuBookFormData.extras]
    updated[index].visible = !updated[index].visible
    setMenuBookFormData({ ...menuBookFormData, extras: updated })
  }

  const handleExtraChange = (index, field, value) => {
    // Use menuBookFormData here
    const updated = [...menuBookFormData.extras]
    updated[index][field] = value
    setMenuBookFormData({ ...menuBookFormData, extras: updated })
  }

  const handleMenuChange = (index, field, value) => {
    // Use menuBookFormData here
    const updated = [...menuBookFormData.menuItems]
    updated[index][field] = value
    setMenuBookFormData({ ...menuBookFormData, menuItems: updated })
  }

  const handleFileUpload = (e, index) => {
    const file = e.target.files[0]
    if (!file) return
    const fileURL = URL.createObjectURL(file)
    // Use menuBookFormData here
    const updated = [...menuBookFormData.menuItems]
    updated[index].image = `${fileURL}?t=${Date.now()}`
    setMenuBookFormData({ ...menuBookFormData, menuItems: updated })
  }

  const handleVideoUpload = (e, index) => {
    const file = e.target.files[0]
    if (!file) return
    const fileURL = URL.createObjectURL(file)
    // Use menuBookFormData here
    const updated = [...menuBookFormData.extras]
    updated[index].value = `${fileURL}?t=${Date.now()}`
    setMenuBookFormData({ ...menuBookFormData, extras: updated })
  }

  const sliderSettings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false
  }

  return (
    <div className=" text-black font-sans">


      <div className="flex flex-col md:flex-row pt-6 pb-12 gap-4">
        {/* Left Form */}
        <div className="w-full top-24">
          <div className="bg-white p-6 rounded-lg shadow-md h-full overflow-y-auto space-y-6 scrollbar-hidden">
            <h2 className="text-2xl font-bold text-[#008080]">Create QR Menu</h2>
            {/* Use menuBookFormData here */}
            <input value={menuBookFormData.restaurantName} onChange={(e) => setMenuBookFormData({ ...menuBookFormData, restaurantName: e.target.value })} placeholder="Restaurant Name" className="w-full border px-4 py-2 rounded" />

            {/* Menu Items */}
            <div>
              <h3 className="text-xl font-semibold text-[#008080]">Menu Items</h3>
              {/* Use menuBookFormData here */}
              {menuBookFormData.menuItems.map((item, index) => (
                <div key={index} className={`mt-4 flex ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'} items-start gap-4`}>
                  <div className="w-full space-y-2 border p-4 rounded bg-[#f0fdfd] relative">
                    <input placeholder="Name" value={item.name} onChange={(e) => handleMenuChange(index, 'name', e.target.value)} className="w-full border px-4 py-2 rounded" />
                    <textarea placeholder="Description" value={item.description} onChange={(e) => handleMenuChange(index, 'description', e.target.value)} className="w-full border px-4 py-2 rounded" />
                    <input placeholder="Price" value={item.price} onChange={(e) => handleMenuChange(index, 'price', e.target.value)} className="w-full border px-4 py-2 rounded" />
                    <input type="file" accept="image/*" onChange={(e) => handleFileUpload(e, index)} />
                    {/* Use menuBookFormData here */}
                    {menuBookFormData.menuItems.length > 1 && (
                      <button onClick={() => {
                        const updated = [...menuBookFormData.menuItems]
                        updated.splice(index, 1)
                        setMenuBookFormData({ ...menuBookFormData, menuItems: updated })
                      }} className="absolute top-2 right-2 text-red-600 text-sm">❌</button>
                    )}
                  </div>
                </div>
              ))}
              {/* Use menuBookFormData here */}
              <button onClick={() => setMenuBookFormData(prev => ({ ...prev, menuItems: [...prev.menuItems, { name: '', description: '', price: '', image: '', visible: true }] }))} className="mt-2 px-3 py-1 bg-[#004d4d] text-white rounded">Add Item</button>
            </div>

            {/* Extra Fields Dropdown */}
            <div className="pt-6 border-t border-gray-300 space-y-3">
              <h3 className="text-xl font-semibold text-[#008080]">Additional Info</h3>
              {/* Use menuBookFormData here */}
              {menuBookFormData.extras.map((field, i) => (
                <div key={i} className="border p-3 bg-gray-50 rounded">
                  <div className="flex justify-between items-center cursor-pointer" onClick={() => setExtraOpenIndex(extraOpenIndex === i ? null : i)}>
                    <span className="text-[#004d4d] font-semibold">{field.label}</span>
                    <Toggle checked={field.visible} onChange={() => handleToggleChange(i)} />
                  </div>
                  {extraOpenIndex === i && (
                    <div className="mt-2">
                      {field.type === 'video' ? (
                        <input type="file" accept="video/*" onChange={(e) => handleVideoUpload(e, i)} className="w-full" />
                      ) : (
                        <input value={field.value} onChange={(e) => handleExtraChange(i, 'value', e.target.value)} placeholder={field.placeholder} className="w-full border px-3 py-2 mt-2 rounded" />
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>


      </div>

      {/* Footer */}
      {/* <footer className="bg-[#003333] text-white text-center py-4 mt-4">
        <p>&copy; {new Date().getFullYear()} ZM QR Code Services. All rights reserved.</p>
      </footer> */}
    </div>
  )
}

export default MenuBookContent