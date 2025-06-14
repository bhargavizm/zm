'use client';

import React, { useState } from 'react';
import useServicesContext from '@/components/hooks/useServiceContext';
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";

const BusinessContent = () => {
  const { dynamicForms, updateDynamicForm } = useServicesContext();
  const businessInfo = dynamicForms.businessInfo;

    const [showPassword, setShowPassword] = useState(false);
    const [nfcEnabled, setNfcEnabled] = useState(false);
    const [showNfcModal, setShowNfcModal] = useState(false);

  const handleChange = (section, field, value) => {
    updateDynamicForm('businessInfo', section, field, value);
  };

  const handleFileChange = (section, field, files, isMultiple = false) => {
    const fileValue = isMultiple ? Array.from(files) : files[0];
    updateDynamicForm('businessInfo', section, field, fileValue);
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
    <div className="space-y-4">
      {/* General Section */}
      <input type="text" placeholder="Business Name" className="w-full border p-2 rounded"
        value={businessInfo.general.businessName}
        onChange={(e) => handleChange('general', 'businessName', e.target.value)} />

      <input type="text" placeholder="Business Type" className="w-full border p-2 rounded"
        value={businessInfo.general.businessType}
        onChange={(e) => handleChange('general', 'businessType', e.target.value)} />

      <textarea placeholder="Business Description" className="w-full border p-2 rounded"
        value={businessInfo.general.description}
        onChange={(e) => handleChange('general', 'description', e.target.value)} />

      <input type="date" className="w-full border p-2 rounded"
        value={businessInfo.general.establishedDate}
        onChange={(e) => handleChange('general', 'establishedDate', e.target.value)} />

      <input type="text" placeholder="Shop Timings" className="w-full border p-2 rounded"
        value={businessInfo.general.shopTimings}
        onChange={(e) => handleChange('general', 'shopTimings', e.target.value)} />

      {/* Contact Section */}
      <input type="text" placeholder="Phone" className="w-full border p-2 rounded"
        value={businessInfo.contact.phone}
        onChange={(e) => handleChange('contact', 'phone', e.target.value)} />

      <input type="email" placeholder="Email" className="w-full border p-2 rounded"
        value={businessInfo.contact.email}
        onChange={(e) => handleChange('contact', 'email', e.target.value)} />

      <textarea placeholder="Address" className="w-full border p-2 rounded"
        value={businessInfo.contact.address}
        onChange={(e) => handleChange('contact', 'address', e.target.value)} />

      {/* Media Section */}
      <div>
        <label>Upload Business Logo</label>
        <input type="file" accept="image/*" className="w-full border p-2 rounded"
          onChange={(e) => handleFileChange('media', 'logo', e.target.files)} />
      </div>

      <div>
        <label>Upload Business Video</label>
        <input type="file" accept="video/*" className="w-full border p-2 rounded"
          onChange={(e) => handleFileChange('media', 'video', e.target.files)} />
      </div>

      <div>
        <label>Upload Gallery Images</label>
        <input type="file" accept="image/*" multiple className="w-full border p-2 rounded"
          onChange={(e) => handleFileChange('media', 'galleryImages', e.target.files, true)} />
      </div>

      {/* Security */}
      {/* <input type="password" placeholder="Password" className="w-full border p-2 rounded"
        value={businessInfo.security.password}
        onChange={(e) => handleChange('security', 'password', e.target.value)} /> */}


       <div className="relative w-full">
      <input
        type={showPassword ? "text" : "password"}
        placeholder="Password"
        className="w-full border p-2 pr-10 rounded"
       value={businessInfo.security.password}
        onChange={(e) => handleChange('security', 'password', e.target.value)}
      />
      <span
        className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-500"
        onClick={() => setShowPassword((prev) => !prev)}
      >
        {showPassword ? <IoEyeOffOutline size={20} /> : <IoEyeOutline size={20} />}
      </span>
    </div>
    </div>

     {/* ✅ NFC Toggle with Icon */}
              <div className="flex items-center gap-4 my-9">
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


        <button className="w-full py-2 cursor-pointer bg-[#008080] text-white font-semibold rounded hover:bg-[#006666] transition">
          Submit
        </button>
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

export default BusinessContent;
