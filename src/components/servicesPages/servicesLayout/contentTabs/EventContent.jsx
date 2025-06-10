'use client'

import React, { useState } from 'react'
import { FiCalendar, FiMapPin, FiUser, FiMail, FiPhone, FiGlobe, FiPlus, FiX } from 'react-icons/fi'

export default function EventForm() {
  const [formData, setFormData] = useState({
    organizer: '',
    title: '',
    summary: '',
    buttonLabel: 'Buy Tickets',
    buttonLink: 'www.YourWebsite.com',
    fromDate: '',
    toDate: '',
    venue: '',
    address: '',
    about: '',
    contactName: '',
    contactEmail: '',
    contactPhone: '',
    webLabel: 'My Website',
    webUrl: 'www.yourweburl.com'
  })

  const [showLocationOptions, setShowLocationOptions] = useState(false)
  const [isLoadingLocation, setIsLoadingLocation] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleGetCurrentLocation = () => {
    setIsLoadingLocation(true)
    setShowLocationOptions(false)
    
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords
          // Reverse geocode to get address - in a real app you'd use a geocoding service
          setFormData(prev => ({
            ...prev,
            address: `Latitude: ${latitude.toFixed(4)}, Longitude: ${longitude.toFixed(4)}`
          }))
          setIsLoadingLocation(false)
        },
        (error) => {
          console.error("Error getting location:", error)
          setIsLoadingLocation(false)
        }
      )
    } else {
      alert("Geolocation is not supported by this browser.")
      setIsLoadingLocation(false)
    }
  }

  const hasBasicInfo = formData.title || formData.organizer || formData.summary
  const hasSchedule = formData.fromDate || formData.toDate
  const hasLocation = formData.venue || formData.address
  const hasContact = formData.contactName || formData.contactEmail || formData.contactPhone

  return (
    <div className="flex h-screen overflow-hidden bg-gradient-to-br from-[#6cc5c5] to-[#0e7b7b]">
      {/* Form Section */}
      <div className="w-1/2 p-8 overflow-y-auto">
        <h1 className="text-3xl font-bold text-[#012d2d] mb-6">Create Your Event</h1>
        
        <form className="space-y-8">
          {/* Basic Info */}
          <div className="bg-white rounded-xl p-6 shadow-md">
            <h2 className="text-xl font-semibold mb-4 text-[#0a5e5e] flex items-center">
              <FiUser className="mr-2" /> Basic Information
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Host Name</label>
                <input 
                  type="text" 
                  name="organizer" 
                  placeholder="Enter host/organizer name" 
                  value={formData.organizer} 
                  onChange={handleChange} 
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#59c1c1] focus:border-[#226161]" 
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Event Name</label>
                <input 
                  type="text" 
                  name="title" 
                  placeholder="Enter event name" 
                  value={formData.title} 
                  onChange={handleChange} 
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#59c1c1] focus:border-[#226161]" 
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Event Summary</label>
                <textarea 
                  name="summary" 
                  placeholder="A short summary about the event" 
                  value={formData.summary} 
                  onChange={handleChange} 
                  rows={3}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#59c1c1] focus:border-[#226161]" 
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Button Label</label>
                  <input 
                    type="text" 
                    name="buttonLabel" 
                    placeholder="Button Label" 
                    value={formData.buttonLabel} 
                    onChange={handleChange} 
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#59c1c1] focus:border-[#226161]" 
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Button Link</label>
                  <input 
                    type="text" 
                    name="buttonLink" 
                    placeholder="Button Link" 
                    value={formData.buttonLink} 
                    onChange={handleChange} 
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#59c1c1] focus:border-[#226161]" 
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Schedule */}
          <div className="bg-white rounded-xl p-6 shadow-md">
            <h2 className="text-xl font-semibold mb-4 text-[#0e7b7b] flex items-center">
              <FiCalendar className="mr-2" /> Schedule
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Start Date & Time</label>
                <input 
                  type="datetime-local" 
                  name="fromDate" 
                  value={formData.fromDate} 
                  onChange={handleChange} 
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#59c1c1] focus:border-[#226161]" 
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">End Date & Time</label>
                <input 
                  type="datetime-local" 
                  name="toDate" 
                  value={formData.toDate} 
                  onChange={handleChange} 
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#59c1c1] focus:border-[#226161]" 
                />
              </div>
            </div>
          </div>

          {/* Location */}
          <div className="bg-white rounded-xl p-6 shadow-md">
            <h2 className="text-xl font-semibold mb-4 text-[#0e7b7b] flex items-center">
              <FiMapPin className="mr-2" /> Location
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Venue Name</label>
                <input 
                  type="text" 
                  name="venue" 
                  placeholder="Enter venue name" 
                  value={formData.venue} 
                  onChange={handleChange} 
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#59c1c1] focus:border-[#226161]" 
                />
              </div>
              
              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                <div className="flex">
                  <textarea 
                    name="address" 
                    placeholder="Enter address" 
                    value={formData.address} 
                    onChange={handleChange} 
                    rows={2}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#59c1c1] focus:border-[#226161]" 
                  />
                  <button 
                    type="button" 
                    onClick={() => setShowLocationOptions(!showLocationOptions)}
                    className="ml-2 p-2 bg-indigo-100 text-[#0e7b7b] rounded-lg hover:bg-indigo-200 transition-colors"
                  >
                    <FiMapPin />
                  </button>
                </div>
                
                {showLocationOptions && (
                  <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 z-10 p-3">
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="font-medium">Location Options</h3>
                      <button onClick={() => setShowLocationOptions(false)} className="text-gray-500 hover:text-gray-700">
                        <FiX />
                      </button>
                    </div>
                    <button
                      onClick={handleGetCurrentLocation}
                      disabled={isLoadingLocation}
                      className="w-full flex items-center justify-center px-4 py-2 bg-[#0e7b7b] text-white rounded-lg hover:bg-indigo-700 transition-colors mb-2"
                    >
                      {isLoadingLocation ? 'Detecting...' : 'Use Current Location'}
                    </button>
                    <button
                      onClick={() => {
                        setShowLocationOptions(false)
                        document.getElementsByName('address')[0].focus()
                      }}
                      className="w-full flex items-center justify-center px-4 py-2 bg-gray-100 text-gray-800 rounded-lg hover:bg-gray-200 transition-colors"
                    >
                      Enter Manually
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* About */}
          <div className="bg-white rounded-xl p-6 shadow-md">
            <h2 className="text-xl font-semibold mb-4 text-[#0e7b7b]">About Event</h2>
            <textarea 
              name="about" 
              placeholder="Enter detailed information about your event" 
              value={formData.about} 
              onChange={handleChange} 
              rows={4}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500" 
            />
          </div>

          {/* Contact */}
          <div className="bg-white rounded-xl p-6 shadow-md">
            <h2 className="text-xl font-semibold mb-4 text-[#0e7b7b] flex items-center">
              <FiUser className="mr-2" /> Contact Information
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Contact Person</label>
                <input 
                  type="text" 
                  name="contactName" 
                  placeholder="Enter contact person name" 
                  value={formData.contactName} 
                  onChange={handleChange} 
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500" 
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input 
                  type="email" 
                  name="contactEmail" 
                  placeholder="Enter email address" 
                  value={formData.contactEmail} 
                  onChange={handleChange} 
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500" 
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                <input 
                  type="tel" 
                  name="contactPhone" 
                  placeholder="Enter phone number" 
                  value={formData.contactPhone} 
                  onChange={handleChange} 
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500" 
                />
              </div>
            </div>
          </div>

          {/* Web Links */}
          <div className="bg-white rounded-xl p-6 shadow-md">
            <h2 className="text-xl font-semibold mb-4 text-[#0e7b7b] flex items-center">
              <FiGlobe className="mr-2" /> Web Links
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Link Label</label>
                <input 
                  type="text" 
                  name="webLabel" 
                  placeholder="Enter link label" 
                  value={formData.webLabel} 
                  onChange={handleChange} 
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500" 
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Link URL</label>
                <input 
                  type="text" 
                  name="webUrl" 
                  placeholder="Enter URL (e.g., www.example.com)" 
                  value={formData.webUrl} 
                  onChange={handleChange} 
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500" 
                />
              </div>
            </div>
          </div>
        </form>
      </div>

      {/* iPhone Preview Section */}
      <div className="w-1/2 flex items-center justify-center fixed right-0 h-screen p-8">
        <div className="relative w-[300px] h-[600px] bg-white rounded-[40px] border-[14px] border-gray-800 overflow-hidden shadow-2xl">
          {/* iPhone notch */}
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-1/3 h-6 bg-gray-800 rounded-b-xl z-10"></div>
          
          {/* Screen content */}
          <div className="h-full overflow-y-auto pt-2 pb-6 px-4">
            {hasBasicInfo || hasSchedule || hasLocation || hasContact ? (
              <div className="space-y-4 text-sm">
                {formData.title && (
                  <h2 className="text-xl font-bold text-center mt-2">{formData.title}</h2>
                )}
                
                {formData.organizer && (
                  <p className="text-gray-500 text-center">
                    Hosted by <span className="font-medium">{formData.organizer}</span>
                  </p>
                )}
                
                {formData.summary && (
                  <div className="bg-blue-50 p-3 rounded-lg">
                    <p className="text-blue-800">{formData.summary}</p>
                  </div>
                )}
                
                {(formData.fromDate || formData.toDate) && (
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <div className="flex items-center text-gray-700 mb-1">
                      <FiCalendar className="mr-2" />
                      <span className="font-medium">When</span>
                    </div>
                    {formData.fromDate && (
                      <p><span className="font-medium">From:</span> {new Date(formData.fromDate).toLocaleString()}</p>
                    )}
                    {formData.toDate && (
                      <p><span className="font-medium">To:</span> {new Date(formData.toDate).toLocaleString()}</p>
                    )}
                  </div>
                )}
                
                {(formData.venue || formData.address) && (
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <div className="flex items-center text-gray-700 mb-1">
                      <FiMapPin className="mr-2" />
                      <span className="font-medium">Where</span>
                    </div>
                    {formData.venue && <p className="font-medium">{formData.venue}</p>}
                    {formData.address && <p className="text-gray-600">{formData.address}</p>}
                  </div>
                )}
                
                {formData.about && (
                  <div>
                    <h3 className="font-medium mb-1">About</h3>
                    <p className="text-gray-600">{formData.about}</p>
                  </div>
                )}
                
                {(formData.contactName || formData.contactEmail || formData.contactPhone) && (
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <div className="flex items-center text-gray-700 mb-1">
                      <FiUser className="mr-2" />
                      <span className="font-medium">Contact</span>
                    </div>
                    {formData.contactName && <p>{formData.contactName}</p>}
                    {formData.contactEmail && (
                      <p className="flex items-center">
                        <FiMail className="mr-2" /> {formData.contactEmail}
                      </p>
                    )}
                    {formData.contactPhone && (
                      <p className="flex items-center">
                        <FiPhone className="mr-2" /> {formData.contactPhone}
                      </p>
                    )}
                  </div>
                )}
                
                {formData.buttonLink && (
                  <a 
                    href={`https://${formData.buttonLink}`} 
                    target="_blank" 
                    rel="noreferrer"
                    className="block"
                  >
                    <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors">
                      {formData.buttonLabel || 'Get Tickets'}
                    </button>
                  </a>
                )}
                
                {formData.webUrl && (
                  <a 
                    href={`https://${formData.webUrl}`} 
                    className="flex items-center justify-center text-blue-600 hover:text-blue-800 mt-3"
                    target="_blank" 
                    rel="noreferrer"
                  >
                    <FiGlobe className="mr-2" />
                    {formData.webLabel || 'Website'}
                  </a>
                )}
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 text-gray-400">
                <FiPlus className="text-4xl mb-4" />
                <h3 className="text-lg font-medium">Event Preview</h3>
                <p className="mt-2">Start filling the form to see your event preview here</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}