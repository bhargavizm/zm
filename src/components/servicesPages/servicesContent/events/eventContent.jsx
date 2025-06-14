// components/EventContent.jsx
'use client'

import useServicesContext from '@/components/hooks/useServiceContext'
import React, { useState } from 'react'
import { FiCalendar, FiMapPin, FiUser, FiMail, FiPhone, FiGlobe, FiPlus, FiX, FiEye, FiEyeOff } from 'react-icons/fi'

const EventContent = () => {
  const { eventsFormData, setEventsFormData } = useServicesContext()

  const [showPassword, setShowPassword] = useState(false)
  const [showLocationOptions, setShowLocationOptions] = useState(false)
  const [isLoadingLocation, setIsLoadingLocation] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setEventsFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleGetCurrentLocation = () => {
    setIsLoadingLocation(true)
    setShowLocationOptions(false)

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords
          setEventsFormData(prev => ({
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

  return (
    <div className="flex flex-col lg:flex-row">
      <div className="p-8 flex-1">
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
                  value={eventsFormData.organizer || ''}
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
                  value={eventsFormData.title || ''}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#59c1c1] focus:border-[#226161]"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Event Summary</label>
                <textarea
                  name="summary"
                  placeholder="A short summary about the event"
                  value={eventsFormData.summary || ''}
                  onChange={handleChange}
                  rows={3}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#59c1c1] focus:border-[#226161]"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Button Label</label>
                  <input
                    type="text"
                    name="buttonLabel"
                    placeholder="Button Label"
                    value={eventsFormData.buttonLabel || ''}
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
                    value={eventsFormData.buttonLink || ''}
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Start Date & Time</label>
                <input
                  type="datetime-local"
                  name="fromDate"
                  value={eventsFormData.fromDate || ''}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#59c1c1] focus:border-[#226161]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">End Date & Time</label>
                <input
                  type="datetime-local"
                  name="toDate"
                  value={eventsFormData.toDate || ''}
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
                  value={eventsFormData.venue || ''}
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
                    value={eventsFormData.address || ''}
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
                      <button 
                        onClick={() => setShowLocationOptions(false)} 
                        className="text-gray-500 hover:text-gray-700"
                      >
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
              value={eventsFormData.about || ''}
              onChange={handleChange}
              rows={4}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#59c1c1] focus:border-[#226161]"
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
                  value={eventsFormData.contactName || ''}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#59c1c1] focus:border-[#226161]"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  name="contactEmail"
                  placeholder="Enter email address"
                  value={eventsFormData.contactEmail || ''}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#59c1c1] focus:border-[#226161]"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                <input
                  type="tel"
                  name="contactPhone"
                  placeholder="Enter phone number"
                  value={eventsFormData.contactPhone || ''}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#59c1c1] focus:border-[#226161]"
                />
              </div>
            </div>
          </div>

          {/* Web Links */}
          <div className="bg-white rounded-xl p-6 shadow-md">
            <h2 className="text-xl font-semibold mb-4 text-[#0e7b7b] flex items-center">
              <FiGlobe className="mr-2" /> Web Links
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Link Label</label>
                <input
                  type="text"
                  name="webLabel"
                  placeholder="Enter link label"
                  value={eventsFormData.webLabel || ''}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#59c1c1] focus:border-[#226161]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Link URL</label>
                <input
                  type="text"
                  name="webUrl"
                  placeholder="Enter URL (e.g., www.example.com)"
                  value={eventsFormData.webUrl || ''}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#59c1c1] focus:border-[#226161]"
                />
              </div>
            </div>
          </div>

          {/* Password Field */}
          <div className="bg-white rounded-xl p-6 shadow-md">
            <h2 className="text-xl font-semibold mb-4 text-[#0e7b7b]">Security</h2>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={eventsFormData.password || ''}
                  onChange={handleChange}
                  placeholder="Enter password"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#59c1c1] focus:border-[#226161]"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                >
                  {showPassword ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default EventContent