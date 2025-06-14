'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Lock, Wifi, Eye, EyeOff, Shield } from 'lucide-react';
import useServicesContext from '@/components/hooks/useServiceContext';

const WifiContent =() => {
const {wifiFormData, setWifiFormData} = useServicesContext()

  const [showPassword, setShowPassword] = useState(false);
    const [nfcEnabled, setNfcEnabled] = useState(false);
    const [showNfcModal, setShowNfcModal] = useState(false);
  const router = useRouter();

  const handleChange = (index, field, value) => {
    const updatedData = [...wifiFormData];
    updatedData[index][field] = value;
    setWifiFormData(updatedData);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = wifiFormData[0];
    const query = new URLSearchParams(formData).toString();
    router.push(`/preview?${query}`);
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
    <div className="flex items-center justify-center py-8">
      <div className="bg-white rounded-2xl shadow-xl p-8 space-y-6 w-full ">
    
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="text-sm font-medium text-gray-600 mb-1 block">WiFi SSID</label>
            <div className="relative">
              <input
                type="text"
                value={wifiFormData[0].ssid}
                onChange={(e) => handleChange(0, 'ssid', e.target.value)}
                placeholder="Enter WiFi name"
                className="w-full pl-10 pr-4 py-2 border rounded-lg text-sm border-gray-300 focus:ring-2 focus:ring-teal-500 focus:outline-none"
              />
              <Wifi className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-600 mb-1 block">Password</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={wifiFormData[0].password}
                onChange={(e) => handleChange(0, 'password', e.target.value)}
                placeholder="Enter password"
                className="w-full pl-10 pr-10 py-2 border rounded-lg text-sm border-gray-300 focus:ring-2 focus:ring-teal-500 focus:outline-none"
              />
              <Lock className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-2.5"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-600 mb-1 block">Security Type</label>
            <div className="relative">
              <select
                value={wifiFormData[0].security}
                onChange={(e) => handleChange(0, 'security', e.target.value)}
                className="w-full pl-10 pr-4 py-2 border rounded-lg text-sm border-gray-300 bg-white focus:ring-2 focus:ring-teal-500"
              >
                <option value="WPA">WPA/WPA2</option>
                <option value="WEP">WEP</option>
                <option value="nopass">No Password</option>
              </select>
              <Shield className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
            </div>
          </div>

            {/* nfc */}
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
            className="w-full bg-teal-600 hover:bg-teal-700 text-white font-semibold py-2 rounded-lg text-sm"
          >
            Generate QR Code
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
  );
}

export default WifiContent