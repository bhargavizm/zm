import useServicesContext from '@/components/hooks/useServiceContext'
import React from 'react'
import { FiMessageSquare, FiUser, FiCalendar, FiLock, FiSmartphone } from 'react-icons/fi' // Added necessary imports

const SmsPreview = () => {
  const { smsFormData, setSmsFormData } = useServicesContext() // Changed to smsFormData

  // Assuming showPassword is managed elsewhere or needs to be passed down if truly dynamic in preview
  // For now, let's assume it's true for demonstration purposes in the preview if a password exists.
  // In a real application, you might pass showPassword from a parent or manage it in a shared state.
  const showPassword = true; // Placeholder, adjust as needed

  const hasMessageInfo = smsFormData.genderName || smsFormData.messageType || smsFormData.textMessage
  const hasDate = smsFormData.date
  const hasPassword = smsFormData.password

  return (
    <>
      <section>

        {/* iPhone Preview Section */}
        <div className=" flex items-center justify-center p-4 overflow-y-auto no-scrollbar">
          <div className="relative w-[300px]  bg-white rounded-[40px] border-[14px] border-gray-800 overflow-hidden shadow-xl flex flex-col">
            {/* iPhone notch */}
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-1/3 bg-gray-800 rounded-b-xl z-10"></div>

            {/* Screen content */}
            <div className="flex-1 overflow-y-auto no-scrollbar pt-6 pb-4 px-4">
              {hasMessageInfo || hasDate || hasPassword ? (
                <div className="space-y-4">
                  <h2 className="text-xl font-bold text-center text-[#008080]">SMS QR Code</h2>

                  {(smsFormData.genderName || smsFormData.messageType) && (
                    <div className="bg-[#008080]/10 p-3 rounded-lg border border-[#008080]/20">
                      <div className="flex items-center text-[#008080] mb-1">
                        <FiUser className="mr-2" />
                        <span className="font-medium">Recipient</span>
                      </div>
                      {smsFormData.genderName && <p>{smsFormData.genderName}</p>}
                      {smsFormData.messageType && <p>Type: {smsFormData.messageType}</p>}
                    </div>
                  )}

                  {smsFormData.textMessage && (
                    <div className="bg-[#008080]/10 p-3 rounded-lg border border-[#008080]/20">
                      <div className="flex items-center text-[#008080] mb-1">
                        <FiMessageSquare className="mr-2" />
                        <span className="font-medium">Message</span>
                      </div>
                      <p>{smsFormData.textMessage}</p>
                    </div>
                  )}

                  {smsFormData.date && (
                    <div className="bg-gray-100 p-3 rounded-lg">
                      <div className="flex items-center text-gray-700 mb-1">
                        <FiCalendar className="mr-2" />
                        <span className="font-medium">Date</span>
                      </div>
                      <p>{new Date(smsFormData.date).toLocaleDateString('en-GB')}</p>
                    </div>
                  )}

                  {smsFormData.password && (
                    <div className="bg-gray-100 p-3 rounded-lg">
                      <div className="flex items-center text-gray-700 mb-1">
                        <FiLock className="mr-2" />
                        <span className="font-medium">Password Protected</span>
                      </div>
                      <p>{showPassword ? smsFormData.password : '●●●●●●●●'}</p>
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
      </section>
    </>
  )
}

export default SmsPreview