'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Lock, Wifi, Eye, EyeOff, Shield } from 'lucide-react';
import useServicesContext from '@/components/hooks/useServiceContext';

const WifiContent =() => {
const {wifiFormData, setWifiFormData} = useServicesContext()

  const [showPassword, setShowPassword] = useState(false);
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

  return (
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

          <button
            type="submit"
            className="w-full bg-teal-600 hover:bg-teal-700 text-white font-semibold py-2 rounded-lg text-sm"
          >
            Generate QR Code
          </button>
        </form>
      </div>
    </div>
  );
}

export default WifiContent