'use client'

import React, { useState } from 'react'
import { FiMessageSquare, FiUser, FiCalendar, FiLock, FiSmartphone, FiEye, FiEyeOff } from 'react-icons/fi'

export default function SmsContent() {
  const [formData, setFormData] = useState({
    genderName: '',
    messageType: '',
    textMessage: '',
    date: '',
    password: ''
  })
  const [showPassword, setShowPassword] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  const hasMessageInfo = formData.genderName || formData.messageType || formData.textMessage
  const hasDate = formData.date
  const hasPassword = formData.password

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-[#008080] to-[#004d4d]">
      {/* Main Content Area */}
      <div className="flex flex-1 min-h-0">
        {/* Form Section */}
        <div className="w-1/2 p-8 overflow-y-auto no-scrollbar">
          <div className="h-full flex flex-col">
            <h1 className="text-3xl font-bold text-white mb-6">QR Code Generator for SMS</h1>
            
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
                      value={formData.genderName} 
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
                      value={formData.messageType} 
                      onChange={handleChange} 
                      className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#008080] focus:border-[#008080]" 
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Text Message</label>
                    <textarea 
                      name="textMessage" 
                      placeholder="Enter your message" 
                      value={formData.textMessage} 
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
                    value={formData.date} 
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
                    value={formData.password} 
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

        {/* iPhone Preview Section */}
        <div className="w-1/2 flex items-center justify-center p-8 overflow-y-auto no-scrollbar">
          <div className="relative w-[300px] h-full max-h-[600px] bg-white rounded-[40px] border-[14px] border-gray-800 overflow-hidden shadow-2xl flex flex-col">
            {/* iPhone notch */}
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-1/3 h-6 bg-gray-800 rounded-b-xl z-10"></div>
            
            {/* Screen content */}
            <div className="flex-1 overflow-y-auto no-scrollbar pt-8 pb-4 px-4">
              {hasMessageInfo || hasDate || hasPassword ? (
                <div className="space-y-4">
                  <h2 className="text-xl font-bold text-center text-[#008080]">SMS QR Code</h2>
                  
                  {(formData.genderName || formData.messageType) && (
                    <div className="bg-[#008080]/10 p-3 rounded-lg border border-[#008080]/20">
                      <div className="flex items-center text-[#008080] mb-1">
                        <FiUser className="mr-2" />
                        <span className="font-medium">Recipient</span>
                      </div>
                      {formData.genderName && <p>{formData.genderName}</p>}
                      {formData.messageType && <p>Type: {formData.messageType}</p>}
                    </div>
                  )}
                  
                  {formData.textMessage && (
                    <div className="bg-[#008080]/10 p-3 rounded-lg border border-[#008080]/20">
                      <div className="flex items-center text-[#008080] mb-1">
                        <FiMessageSquare className="mr-2" />
                        <span className="font-medium">Message</span>
                      </div>
                      <p>{formData.textMessage}</p>
                    </div>
                  )}
                  
                  {formData.date && (
                    <div className="bg-gray-100 p-3 rounded-lg">
                      <div className="flex items-center text-gray-700 mb-1">
                        <FiCalendar className="mr-2" />
                        <span className="font-medium">Date</span>
                      </div>
                      <p>{new Date(formData.date).toLocaleDateString('en-GB')}</p>
                    </div>
                  )}
                  
                  {formData.password && (
                    <div className="bg-gray-100 p-3 rounded-lg">
                      <div className="flex items-center text-gray-700 mb-1">
                        <FiLock className="mr-2" />
                        <span className="font-medium">Password Protected</span>
                      </div>
                      <p>{showPassword ? formData.password : '●●●●●●●●'}</p>
                    </div>
                  )}

                  {/* QR Code Placeholder */}
                  <div className="mt-6 flex justify-center">
                    <div className="w-40 h-40 border-2 border-dashed border-[#008080] rounded-lg flex items-center justify-center text-[#008080]">
                      {hasMessageInfo ? "QR Code Preview" : "No message"}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-center p-6 text-gray-400">
                  <FiSmartphone className="text-4xl mb-4 text-[#008080]" />
                  <h3 className="text-lg font-medium">SMS QR Preview</h3>
                  <p className="mt-2">Fill the form to see your SMS QR code preview</p>
                </div>
              )}
            </div>

            {/* Footer in iPhone */}
            <div className="border-t border-gray-200 text-center text-xs text-gray-500 py-2">
              <p>Scan to send SMS</p>
              <p className="mt-1">v1.0.0</p>
            </div>
          </div>
        </div>
      </div>

      {/* Unified Footer */}
      
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