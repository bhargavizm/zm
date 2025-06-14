'use client';

import React, { useState } from 'react';
import useServicesContext from '@/components/hooks/useServiceContext';

const TextMessageContent = () => {
  const { textMessageForm, setTextMessageForm } = useServicesContext();

   const [nfcEnabled, setNfcEnabled] = useState(false);
      const [showNfcModal, setShowNfcModal] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTextMessageForm({ ...textMessageForm, [name]: value });
  };


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
    <div className="space-y-6">
      <h1 className="text-3xl font-bold pb-6 text-[#008080]">QR Code for Text Message</h1>

      <div className="grid grid-cols-1 gap-4">
        <input
          type="text"
          name="sender"
          placeholder="Sender Name"
          value={textMessageForm.sender}
          onChange={handleChange}
          className="border p-2 rounded shadow-sm w-full"
        />
        <textarea
          name="message"
          placeholder="Enter your message here..."
          value={textMessageForm.message}
          onChange={handleChange}
          rows={4}
          className="border p-2 rounded shadow-sm w-full"
        />
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
  );
};

export default TextMessageContent;
