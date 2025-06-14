// components/EventPreview.jsx
'use client'

import useServicesContext from '@/components/hooks/useServiceContext'
import React from 'react'
import { FiCalendar, FiMapPin, FiUser, FiMail, FiPhone, FiGlobe, FiPlus } from 'react-icons/fi'

const EventPreview = () => {
  const { eventsFormData } = useServicesContext() // No need for setEventsFormData here

  // Determine if there's any data to display in the preview
  const hasBasicInfo = eventsFormData.title || eventsFormData.organizer || eventsFormData.summary
  const hasSchedule = eventsFormData.fromDate || eventsFormData.toDate
  const hasLocation = eventsFormData.venue || eventsFormData.address
  const hasContact = eventsFormData.contactName || eventsFormData.contactEmail || eventsFormData.contactPhone

  return (
    <>
      <section className="flex-1 p-8 flex items-center justify-center"> {/* flex-1 to take available space, center content */}
        {/* Removed h1 for "event preview" as it's not present in the original screenshot of the preview pane itself */}

        {/* iPhone Preview Section */}
        {/* Removed fixed, right-0, h-screen for fluid positioning */}
        {/* Changed w-[300px] h-[600px] to max-w and max-h for responsiveness while maintaining shape */}
        <div className="relative max-w-[300px] max-h-[600px] w-full h-full aspect-[3/6] bg-white rounded-[40px] border-[14px] border-gray-800 shadow-2xl flex flex-col">
          {/* iPhone notch */}
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-1/3 h-6 bg-gray-800 rounded-b-xl z-10"></div>

          {/* Screen content */}
          {/* Removed overflow-y-auto to allow content to naturally expand, if needed, scrollbar will appear on parent if it overflows */}
          <div className="flex-1 pt-2 pb-6 px-4 overflow-y-auto"> {/* Added overflow-y-auto here to allow content inside the phone to scroll */}
            {hasBasicInfo || hasSchedule || hasLocation || hasContact || eventsFormData.buttonLink || eventsFormData.webUrl ? (
              <div className="space-y-4 text-sm">
                {eventsFormData.title && (
                  <h2 className="text-xl font-bold text-center mt-2">{eventsFormData.title}</h2>
                )}

                {eventsFormData.organizer && (
                  <p className="text-gray-500 text-center my-20">
                    Hosted by <span className="font-medium">{eventsFormData.organizer}</span>
                  </p>
                )}

                {eventsFormData.summary && (
                  <div className="bg-blue-50 p-3 rounded-lg">
                    <p className="text-[#008080]">{eventsFormData.summary}</p>
                  </div>
                )}

                {(eventsFormData.fromDate || eventsFormData.toDate) && (
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <div className="flex items-center text-gray-700 mb-1">
                      <FiCalendar className="mr-2" />
                      <span className="font-medium">When</span>
                    </div>
                    {eventsFormData.fromDate && (
                      <p><span className="font-medium">From:</span> {new Date(eventsFormData.fromDate).toLocaleString()}</p>
                    )}
                    {eventsFormData.toDate && (
                      <p><span className="font-medium">To:</span> {new Date(eventsFormData.toDate).toLocaleString()}</p>
                    )}
                  </div>
                )}

                {(eventsFormData.venue || eventsFormData.address) && (
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <div className="flex items-center text-gray-700 mb-1">
                      <FiMapPin className="mr-2" />
                      <span className="font-medium">Where</span>
                    </div>
                    {eventsFormData.venue && <p className="font-medium">{eventsFormData.venue}</p>}
                    {eventsFormData.address && <p className="text-gray-600">{eventsFormData.address}</p>}
                  </div>
                )}

                {eventsFormData.about && (
                  <div>
                    <h3 className="font-medium mb-1">About</h3>
                    <p className="text-gray-600">{eventsFormData.about}</p>
                  </div>
                )}

                {(eventsFormData.contactName || eventsFormData.contactEmail || eventsFormData.contactPhone) && (
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <div className="flex items-center text-gray-700 mb-1">
                      <FiUser className="mr-2" />
                      <span className="font-medium">Contact</span>
                    </div>
                    {eventsFormData.contactName && <p>{eventsFormData.contactName}</p>}
                    {eventsFormData.contactEmail && (
                      <p className="flex items-center">
                        <FiMail className="mr-2" /> {eventsFormData.contactEmail}
                      </p>
                    )}
                    {eventsFormData.contactPhone && (
                      <p className="flex items-center">
                        <FiPhone className="mr-2" /> {eventsFormData.contactPhone}
                      </p>
                    )}
                  </div>
                )}

                {eventsFormData.buttonLink && (
                  <a
                    href={`https://${eventsFormData.buttonLink}`}
                    target="_blank"
                    rel="noreferrer"
                    className="block"
                  >
                    <button className="w-full bg-[#008080] text-white py-3 rounded-lg font-medium hover:bg-[#1c3333] transition-colors cursor-pointer">
                      {eventsFormData.buttonLabel || 'Get Tickets'}
                    </button>
                  </a>
                )}

                {eventsFormData.webUrl && (
                  <a
                    href={`https://${eventsFormData.webUrl}`}
                    className="flex items-center justify-center text-[#008080] hover:text-[#1c3333] mt-3"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <FiGlobe className="mr-2" />
                    {eventsFormData.webLabel || 'Website'}
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
      </section>
    </>
  )
}

export default EventPreview