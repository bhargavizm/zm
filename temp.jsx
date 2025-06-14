// components/smsContent/SmsContent.jsx
'use client'

import React from 'react'
import useServicesContext from "@/components/hooks/useServiceContext";
import { FiEye, FiEyeOff, FiLock, FiCalendar, FiMessageSquare } from 'react-icons/fi'

const SmsContent = () => {
  const { smsFormData, setSmsFormData } = useServicesContext()
  const [showPassword, setShowPassword] = useState(false)
  const [nfcEnabled, setNfcEnabled] = useState(false);
  const [showNfcModal, setShowNfcModal] = useState(false);
  const [pendingToggle, setPendingToggle] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target
    setSmsForm({ ...smsForm, [name]: value })
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  const handleNfcToggle = () => {
    if (!nfcEnabled) {
      setShowNfcModal(true);
      setPendingToggle(true);
    } else {
      setNfcEnabled(false);
    }
  };

  const confirmNfc = () => {
    setNfcEnabled(true);
    setShowNfcModal(false);
    setPendingToggle(false);
  };

  const cancelNfc = () => {
    setPendingToggle(false);
    setShowNfcModal(false);
  };

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
                <div className="flex items-center gap-4 mt-2 justify-end">
                  <span className="text-sm font-medium text-gray-700">NFC</span>
                  <button
                    type="button"
                    onClick={handleNfcToggle}
                    className={`relative inline-flex h-8 w-16 items-center rounded-full transition-colors duration-500
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
      {showNfcModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-transparent">
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
                className="px-4 py-2 rounded border border-gray-400 text-gray-600 hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={confirmNfc}
                className="px-4 py-2 bg-[#008080] text-white rounded hover:bg-[#006666] transition"
              >
                Accept
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default SmsContent
