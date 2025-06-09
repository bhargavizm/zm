'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import Slider from 'react-slick'
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"

const Toggle = ({ checked, onChange }) => (
  <label className="inline-flex items-center cursor-pointer ml-2">
    <input type="checkbox" className="sr-only peer" checked={checked} onChange={onChange} />
    <div className="w-11 h-6 bg-gray-300 rounded-full peer peer-checked:bg-green-500 relative transition-all">
      <div className="absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform peer-checked:translate-x-5" />
    </div>
  </label>
)

export default function MenuQRPage() {
  const [formData, setFormData] = useState({
    restaurantName: '',
    menuItems: [{ name: '', description: '', price: '', image: '', visible: true }],
    extras: [
      { type: 'phone', label: 'Phone', value: '', visible: true, placeholder: '+91-0000000000' },
      { type: 'email', label: 'Email', value: '', visible: true, placeholder: 'example@mail.com' },
      { type: 'link', label: 'Link', value: '', visible: true, placeholder: 'https://yourlink.com' },
      { type: 'form', label: 'Form', value: '', visible: true, placeholder: 'https://formurl.com' },
      { type: 'video', label: 'Video', value: '', visible: true, placeholder: 'upload' }
    ],
  })

  const [extraOpenIndex, setExtraOpenIndex] = useState(null)

  const handleToggleChange = (index) => {
    const updated = [...formData.extras]
    updated[index].visible = !updated[index].visible
    setFormData({ ...formData, extras: updated })
  }

  const handleExtraChange = (index, field, value) => {
    const updated = [...formData.extras]
    updated[index][field] = value
    setFormData({ ...formData, extras: updated })
  }

  const handleMenuChange = (index, field, value) => {
    const updated = [...formData.menuItems]
    updated[index][field] = value
    setFormData({ ...formData, menuItems: updated })
  }

  const handleFileUpload = (e, index) => {
    const file = e.target.files[0]
    if (!file) return
    const fileURL = URL.createObjectURL(file)
    const updated = [...formData.menuItems]
    updated[index].image = `${fileURL}?t=${Date.now()}`
    setFormData({ ...formData, menuItems: updated })
  }

  const handleVideoUpload = (e, index) => {
    const file = e.target.files[0]
    if (!file) return
    const fileURL = URL.createObjectURL(file)
    const updated = [...formData.extras]
    updated[index].value = `${fileURL}?t=${Date.now()}`
    setFormData({ ...formData, extras: updated })
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
    <div className="min-h-screen bg-gradient-to-br from-[#008080] to-[#004d4d] text-black font-sans">
      {/* Navbar */}
      <nav className="bg-[#004d4d] text-white py-4 px-6 sticky top-0 z-50 shadow-md">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <h1 className="text-xl font-bold">ZM QR Code Services</h1>
        </div>
      </nav>

      <div className="flex flex-col md:flex-row px-4 md:px-10 pt-6 pb-12 gap-4">
        {/* Left Form */}
        <div className="w-full md:w-[55%] h-[640px] sticky top-24">
          <div className="bg-white p-6 rounded-lg shadow-md h-full overflow-y-auto space-y-6 scrollbar-hidden">
            <h2 className="text-2xl font-bold text-[#008080]">Create QR Menu</h2>
            <input value={formData.restaurantName} onChange={(e) => setFormData({ ...formData, restaurantName: e.target.value })} placeholder="Restaurant Name" className="w-full border px-4 py-2 rounded" />

            {/* Menu Items */}
            <div>
              <h3 className="text-xl font-semibold text-[#008080]">Menu Items</h3>
              {formData.menuItems.map((item, index) => (
                <div key={index} className={`mt-4 flex ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'} items-start gap-4`}>
                  <div className="w-full space-y-2 border p-4 rounded bg-[#f0fdfd] relative">
                    <input placeholder="Name" value={item.name} onChange={(e) => handleMenuChange(index, 'name', e.target.value)} className="w-full border px-4 py-2 rounded" />
                    <textarea placeholder="Description" value={item.description} onChange={(e) => handleMenuChange(index, 'description', e.target.value)} className="w-full border px-4 py-2 rounded" />
                    <input placeholder="Price" value={item.price} onChange={(e) => handleMenuChange(index, 'price', e.target.value)} className="w-full border px-4 py-2 rounded" />
                    <input type="file" accept="image/*" onChange={(e) => handleFileUpload(e, index)} />
                    {formData.menuItems.length > 1 && (
                      <button onClick={() => {
                        const updated = [...formData.menuItems]
                        updated.splice(index, 1)
                        setFormData({ ...formData, menuItems: updated })
                      }} className="absolute top-2 right-2 text-red-600 text-sm">❌</button>
                    )}
                  </div>
                </div>
              ))}
              <button onClick={() => setFormData(prev => ({ ...prev, menuItems: [...prev.menuItems, { name: '', description: '', price: '', image: '', visible: true }] }))} className="mt-2 px-3 py-1 bg-[#004d4d] text-white rounded">Add Item</button>
            </div>

            {/* Extra Fields Dropdown */}
            <div className="pt-6 border-t border-gray-300 space-y-3">
              <h3 className="text-xl font-semibold text-[#008080]">Additional Info</h3>
              {formData.extras.map((field, i) => (
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

        {/* Right iPhone Preview */}
        <div className="hidden md:flex w-[45%] px-2 sticky top-24 h-fit">
          <div className="w-[320px] h-[640px] bg-black rounded-[40px] border-[12px] border-gray-900 shadow-xl relative">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-6 bg-black rounded-b-xl z-30" />
            <div className="absolute inset-0 bg-white overflow-y-auto p-4 text-black rounded-[28px] scrollbar-hidden space-y-4">
              <h3 className="text-lg font-bold text-[#008080]">{formData.restaurantName}</h3>

              {/* Slider for Images */}
              {formData.menuItems.filter(i => i.visible !== false && i.image).length > 0 && (
                <Slider {...sliderSettings}>
                  {formData.menuItems.filter(i => i.visible !== false && i.image).map((item, i) => (
                    <div key={i} className="pb-2 mt-2">
                      <img src={item.image} alt={`menu-${i}`} className="w-full h-[180px] object-cover rounded" />
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
              {formData.extras.filter(i => i.visible).map((field, i) => (
                <div key={i}>
                  {field.type === 'link' ? (
                    <a href={field.value} target="_blank" className="text-blue-500 text-sm underline">{field.value}</a>
                  ) : field.type === 'form' ? (
                    <iframe src={field.value} title={`form-${i}`} className="w-full h-40 mt-2 border rounded" />
                  ) : field.type === 'video' ? (
                    <video controls className="w-full rounded mt-2"><source src={field.value} /></video>
                  ) : (
                    <p className="text-sm">{field.label}: {field.value}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-[#003333] text-white text-center py-4 mt-4">
        <p>&copy; {new Date().getFullYear()} ZM QR Code Services. All rights reserved.</p>
      </footer>
    </div>
  )
}
