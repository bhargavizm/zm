'use client'

import useServicesContext from '@/components/hooks/useServiceContext'
import React, { useState } from 'react'
import { FiMessageSquare, FiUser, FiCalendar, FiLock, FiEye, FiEyeOff } from 'react-icons/fi'

const SmsContent = () => {
  const { smsFormData, setSmsFormData } = useServicesContext()
  const [showPassword, setShowPassword] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setSmsFormData({ ...smsFormData, [name]: value })
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  // These "has" variables are primarily for the preview, not strictly needed for the form itself,
  // but kept for now as they don't affect styling.
  const hasMessageInfo = smsFormData.genderName || smsFormData.messageType || smsFormData.textMessage
  const hasDate = smsFormData.date
  const hasPassword = smsFormData.password

  return (
    <div className="flex flex-col"> {/* Removed h-screen and bg-gradient styles */}
      {/* Main Content Area - Removed fixed width/height classes */}
      <div className="flex ">
        {/* Form Section - Removed fixed width */}
        <div className="p- overflow-y-auto no-scrollbar flex-1"> {/* Added flex-1 to allow it to grow */}
          <div className="h-full flex flex-col">
 {/* Changed text-white to text-[#008080] for better contrast */}

            <form className="flex-1 overflow-y-auto no-scrollbar">
              {/* Message Information */}
              <div className="bg-white/90 backdrop-blur-sm rounded-xl p-6 shadow-lg mb-6">
                <h2 className="text-xl font-semibold mb-4 text-[#008080] flex items-center">
                  <FiMessageSquare className="mr-2" /> Message Information
                </h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                    <input
                      type="text"
                      name="genderName"
                      placeholder="Enter name"
                      value={smsFormData.genderName}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#008080] focus:border-[#008080]"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Type of Message</label>
                    <input
                      type="text"
                      name="messageType"
                      placeholder="Enter message type"
                      value={smsFormData.messageType}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#008080] focus:border-[#008080]"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Text Message</label>
                    <textarea
                      name="textMessage"
                      placeholder="Enter your message"
                      value={smsFormData.textMessage}
                      onChange={handleChange}
                      rows={3}
                      className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#008080] focus:border-[#008080]"
                    />
                  </div>
                </div>
              </div>

              {/* Date */}
              <div className="bg-white/90 backdrop-blur-sm rounded-xl p-6 shadow-lg mb-6">
                <h2 className="text-xl font-semibold mb-4 text-[#008080] flex items-center">
                  <FiCalendar className="mr-2" /> Date and Time
                </h2>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date (dd-mm-yyyy)</label>
                  <input
                    type="date"
                    name="date"
                    value={smsFormData.date}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#008080] focus:border-[#008080]"
                  />
                </div>
              </div>

              {/* Password */}
              <div className="bg-white/90 backdrop-blur-sm rounded-xl p-6 shadow-lg mb-6">
                <h2 className="text-xl font-semibold mb-4 text-[#008080] flex items-center">
                  <FiLock className="mr-2" /> Password
                </h2>
                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Enter Password</label>
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Enter your password"
                    value={smsFormData.password}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#008080] focus:border-[#008080] pr-10"
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute right-3 top-9 text-gray-500 hover:text-[#008080]"
                  >
                    {showPassword ? <FiEyeOff /> : <FiEye />}
                  </button>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-[#008080] hover:bg-[#006666] text-white py-3 rounded-lg font-medium transition-colors shadow-lg"
              >
                Generate QR Code
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Add custom CSS to hide scrollbars */}
      <style jsx global>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  )
}

export default SmsContent