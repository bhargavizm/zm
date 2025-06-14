// components/EventContent.jsx
'use client'

import useServicesContext from '@/components/hooks/useServiceContext'
import React, { useState } from 'react'
import { FiCalendar, FiMapPin, FiUser, FiMail, FiPhone, FiGlobe, FiPlus, FiX } from 'react-icons/fi'

const EventContent = () => {
  const { eventsFormData, setEventsFormData } = useServicesContext()

  const [showLocationOptions, setShowLocationOptions] = useState(false)
  const [isLoadingLocation, setIsLoadingLocation] = useState(false)
   const [nfcEnabled, setNfcEnabled] = useState(false);
      const [showNfcModal, setShowNfcModal] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target
    setEventsFormData({ ...eventsFormData, [name]: value })
  }

  const handleGetCurrentLocation = () => {
    setIsLoadingLocation(true)
    setShowLocationOptions(false)

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords
          // Reverse geocode to get address - in a real app you'd use a geocoding service
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

  // These "has" variables are primarily for the preview, but don't hurt here.
  const hasBasicInfo = eventsFormData.title || eventsFormData.organizer || eventsFormData.summary
  const hasSchedule = eventsFormData.fromDate || eventsFormData.toDate
  const hasLocation = eventsFormData.venue || eventsFormData.address
  const hasContact = eventsFormData.contactName || eventsFormData.contactEmail || eventsFormData.contactPhone

    const handleNfcToggle = () => {
    if (!nfcEnabled) {
      setShowNfcModal(true);
    } else {
      setNfcEnabled(false);
    }
  };

  const confirmNfc = () => {
    setNfcEnabled(true);
    setShowNfcModal(false);
  };

  const cancelNfc = () => {
    setShowNfcModal(false);
  };


  return (
    <>
    <div className="flex flex-col lg:flex-row"> {/* Changed to flex-col and lg:flex-row for responsiveness */}
      {/* Form Section */}
      {/* Removed w-1/2 and overflow-y-auto to allow fluid width and height */}
      <div className="p-8 flex-1"> {/* flex-1 allows it to take available space */}


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
                  value={eventsFormData.organizer}
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
                  value={eventsFormData.title}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#59c1c1] focus:border-[#226161]"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Event Summary</label>
                <textarea
                  name="summary"
                  placeholder="A short summary about the event"
                  value={eventsFormData.summary}
                  onChange={handleChange}
                  rows={3}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#59c1c1] focus:border-[#226161]"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4"> {/* Added responsiveness */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Button Label</label>
                  <input
                    type="text"
                    name="buttonLabel"
                    placeholder="Button Label"
                    value={eventsFormData.buttonLabel}
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
                    value={eventsFormData.buttonLink}
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4"> {/* Added responsiveness */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Start Date & Time</label>
                <input
                  type="datetime-local"
                  name="fromDate"
                  value={eventsFormData.fromDate}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#59c1c1] focus:border-[#226161]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">End Date & Time</label>
                <input
                  type="datetime-local"
                  name="toDate"
                  value={eventsFormData.toDate}
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
                  value={eventsFormData.venue}
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
                    value={eventsFormData.address}
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
              value={eventsFormData.about}
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
                  value={eventsFormData.contactName}
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
                  value={eventsFormData.contactEmail}
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
                  value={eventsFormData.contactPhone}
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4"> {/* Added responsiveness */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Link Label</label>
                <input
                  type="text"
                  name="webLabel"
                  placeholder="Enter link label"
                  value={eventsFormData.webLabel}
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
                  value={eventsFormData.webUrl}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
            </div>
          </div>

            <div className="flex items-center gap-4 px-4 mt-2">
          <span className="text-sm font-medium text-gray-700">NFC</span>
          <button
            type="button"
            onClick={handleNfcToggle}
            className={`relative inline-flex h-8 w-16 items-center rounded-full transition-colors duration-500 cursor-pointer
                    focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#008080]
                    ${nfcEnabled ? "bg-[#008080]" : "bg-gray-300"}`}
          >
            <span
              className={`absolute left-1 top-1 inline-flex h-6 w-6 items-center justify-center rounded-full bg-white shadow-md transition-all duration-300
                    ${nfcEnabled ? "translate-x-8" : "translate-x-0"}`}
            >
              {nfcEnabled ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 text-[#008080]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 text-gray-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              )}
            </span>
          </button>
        </div>

          <button
        type="submit"
        className="mt-4 w-full bg-[#008080] text-white font-semibold py-2 rounded hover:bg-[#006666] transition"
      >
        Submit
      </button>

        </form>
      </div>
    </div>


  {/* ✅ NFC Modal */}
      {showNfcModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-md bg-black/30">
          <div className="bg-white rounded-xl shadow-xl p-6 max-w-sm w-full border border-teal-200 relative">
            {/* Close Button */}
            <button
              onClick={cancelNfc}
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 text-xl"
            >
              &times;
            </button>

            <h2 className="text-xl font-bold text-[#008080] mb-2">
              NFC Activated
            </h2>
            <p className="text-sm text-gray-700">
              You're trying to enable <strong>NFC</strong> features.
              <br />
              This is a <strong>premium service</strong>.
              <br />
              <span className="text-[#008080] font-semibold">
                Cost: ₹499/year
              </span>
            </p>

            <div className="flex justify-end mt-5 space-x-3">
              <button
                onClick={cancelNfc}
                className="px-4 py-2 cursor-pointer rounded border border-gray-400 text-gray-600 hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={confirmNfc}
                className="px-4 py-2 cursor-pointer bg-[#008080] text-white rounded hover:bg-[#006666] transition"
              >
                Accept
              </button>
            </div>
          </div>
        </div>
      )}
      </>
  )
}

export default EventContent