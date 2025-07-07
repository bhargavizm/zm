'use client';

import React, { useRef, useState } from 'react';
import useServicesContext from '@/components/hooks/useServiceContext';
import { Eye, EyeOff, X } from 'lucide-react';
import NFCModal from '@/components/modalPopUps/nfcModal';
import { useDispatch } from 'react-redux';
import { setDiscountServices } from '@/redux/slices/servicesSlice';
import axios from 'axios';
import CryptoJS from 'crypto-js';

const DiscountCouponContent = () => {
  const { dynamicForms, updateDynamicForm } = useServicesContext();
  const discountCoupon = dynamicForms.discountCoupon || {};
  const [showPassword, setShowPassword] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [fileSizeError, setFileSizeError] = useState(false); // NEW STATE
  const dispatch = useDispatch();

  const brandLogoInputRef = useRef(null);
  const couponImageInputRef = useRef(null);

  const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB

  const handleChange = (fieldKey, value) => {
    updateDynamicForm('discountCoupon', null, fieldKey, value);
  };

  const handleFileChange = (fieldKey, files) => {
    if (files && files[0]) {
      const file = files[0];
      if (file.size > MAX_FILE_SIZE) {
        setFileSizeError(true); // Show modal instead of alert
        return;
      }
      handleChange(fieldKey, file);
    }
  };

  const removeImage = (fieldKey) => {
    handleChange(fieldKey, null);
    if (fieldKey === 'brandLogo' && brandLogoInputRef.current) {
      brandLogoInputRef.current.value = '';
    }
    if (fieldKey === 'couponImage' && couponImageInputRef.current) {
      couponImageInputRef.current.value = '';
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const getPreviewUrl = (fileOrUrl) => {
    if (!fileOrUrl) return null;
    if (fileOrUrl instanceof File) return URL.createObjectURL(fileOrUrl);
    if (typeof fileOrUrl === 'string') return fileOrUrl;
    return null;  
  };

  const fileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      if (!file) return resolve(null);
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const handleSubmit = () => {
    setShowPreview(true);
  };

  const handleConfirm = async () => {
    const brandLogoBase64 = await fileToBase64(discountCoupon.brandLogo);
    const couponImageBase64 = await fileToBase64(discountCoupon.couponImage);

    const encryptedPassword = discountCoupon.password
      ? CryptoJS.AES.encrypt(discountCoupon.password, 'secret-key').toString()
      : '';

    const payload = {
      nameOfBusiness: discountCoupon.nameOfBusiness,
      code: discountCoupon.code,
      password: encryptedPassword,
      brandLogo: brandLogoBase64,
      couponImage: couponImageBase64,
    };

    try {
      const response = await axios.post('/api/services/discount', payload, {
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.data?.success) {
        dispatch(setDiscountServices(response.data.data));
        setShowPreview(false);
        setShowSuccessPopup(true);
      } else {
        alert(response.data.message || 'Failed to save coupon');
      }
    } catch (error) {
      console.error('Request failed:', error);
      alert('Something went wrong');
    }
  };

  return (
    <div className="relative">
      {/* Main Form UI */}
      <div className="space-y-8 p-4 md:p-8 lg:p-12 bg-gray-50 rounded-xl shadow-lg">

        {/* Brand Logo Upload */}
        <div className="space-y-2">
          <label className="block text-base font-medium text-gray-700 mb-1">Brand Logo *</label>
          <p className="text-xs text-gray-500 mb-2">
            Max single file: 2MB | Total max: 30MB | Current total: {(discountCoupon.brandLogo?.size || 0) / (1024 * 1024) < 0.01 ? '0.00' : ((discountCoupon.brandLogo?.size || 0) / (1024 * 1024)).toFixed(2)}MB
          </p>

          <input
            ref={brandLogoInputRef}
            type="file"
            accept="image/*"
            onChange={(e) => handleFileChange('brandLogo', e.target.files)}
            className="w-full text-gray-700 file:mr-4 file:py-3 file:px-6 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-teal-600 file:text-white hover:file:bg-teal-700 file:transition-colors file:duration-200 cursor-pointer border border-gray-300 rounded-lg py-2"
          />
          {discountCoupon.brandLogo && (
            <div className="relative w-32 mt-2">
              <img
                src={getPreviewUrl(discountCoupon.brandLogo)}
                alt="Brand Logo Preview"
                className="rounded shadow border"
              />
              <button
                onClick={() => removeImage('brandLogo')}
                className="absolute top-0 right-0 bg-white text-red-600 rounded-full p-1 shadow"
              >
                <X size={18} />
              </button>
            </div>
          )}
        </div>

        {/* Coupon Info */}
        <div className="p-6 bg-white rounded-xl shadow-md border border-gray-100">
          <h3 className="text-2xl font-semibold text-gray-800 mb-6 border-b pb-3 border-gray-200">Coupon Details</h3>
          <div className="space-y-5">
            <input
              type="text"
              placeholder="Name of Business"
              className="w-full px-5 py-3 border border-gray-300 rounded-lg"
              value={discountCoupon.nameOfBusiness || ''}
              onChange={(e) => handleChange('nameOfBusiness', e.target.value)}
            />
            <input
              type="text"
              placeholder="Coupon Code (e.g., SAVE20)"
              className="w-full px-5 py-3 border border-gray-300 rounded-lg"
              value={discountCoupon.code || ''}
              onChange={(e) => handleChange('code', e.target.value)}
            />

            {/* Coupon Image Upload */}
            <div className="space-y-2">
              <label className="block text-base font-medium text-gray-700 mb-1">Coupon Image *</label>
              <p className="text-xs text-gray-500 mb-2">
                Max single file: 2MB | Total max: 30MB | Current total: {(discountCoupon.couponImage?.size || 0) / (1024 * 1024) < 0.01 ? '0.00' : ((discountCoupon.couponImage?.size || 0) / (1024 * 1024)).toFixed(2)}MB
              </p>
              <input
                ref={couponImageInputRef}
                type="file"
                accept="image/*"
                onChange={(e) => handleFileChange('couponImage', e.target.files)}
                className="w-full text-gray-700 file:mr-4 file:py-3 file:px-6 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-teal-600 file:text-white hover:file:bg-teal-700 file:transition-colors file:duration-200 cursor-pointer border border-gray-300 rounded-lg py-2"
              />
              {discountCoupon.couponImage && (
                <div className="relative w-32 mt-2">
                  <img
                    src={getPreviewUrl(discountCoupon.couponImage)}
                    alt="Coupon Preview"
                    className="rounded shadow border"
                  />
                  <button
                    onClick={() => removeImage('couponImage')}
                    className="absolute top-0 right-0 bg-white text-red-600 rounded-full p-1 shadow"
                  >
                    <X size={18} />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Password Field */}
        <div className="p-6 bg-white rounded-xl shadow-md border border-gray-100">
          <h3 className="text-2xl font-semibold text-gray-800 mb-6 border-b pb-3 border-gray-200">Security</h3>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              className="w-full px-5 py-3 border border-gray-300 rounded-lg pr-12"
              value={discountCoupon.password || ''}
              onChange={(e) => handleChange('password', e.target.value)}
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 pr-4 flex items-center text-teal-600"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
            </button>
          </div>
        </div>

        <NFCModal />

        <div className="text-center my-6">
          <button
            type="button"
            className="w-full bg-[#008080] hover:bg-[#006666] text-white py-3 rounded-lg font-medium shadow-lg transition-colors"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      </div>

      {/* Preview Modal */}
      {showPreview && (
        <div className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-lg space-y-4">
            <h2 className="text-xl font-semibold text-gray-800">Preview Coupon</h2>
            <div className="space-y-2 text-sm text-gray-700">
              <p><strong>Name of Business:</strong> {discountCoupon.nameOfBusiness || 'N/A'}</p>
              <p><strong>Coupon Code:</strong> {discountCoupon.code || 'N/A'}</p>
              <p><strong>Password:</strong> {discountCoupon.password ? '••••••' : 'N/A'}</p>
              {discountCoupon.brandLogo && (
                <div>
                  <p className="font-semibold mt-2">Brand Logo:</p>
                  <img src={getPreviewUrl(discountCoupon.brandLogo)} alt="Brand Logo" className="w-32 max-h-32 rounded border shadow" />
                </div>
              )}
      <div className="flex justify-end gap-4 mt-6">
        <button
          className="px-4 py-2 border border-gray-300 rounded-md text-gray-600 hover:bg-gray-100"
          onClick={() => setShowPreview(false)}
        >
          Edit
        </button>
        <button
          className="px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700"
          onClick={handleConfirm}
        >
          Confirm & Submit
        </button>
      </div>
    </div>
  </div>
)}

              {discountCoupon.couponImage && (
                <div>
                  <p className="font-semibold mt-2">Coupon Image:</p>
                  <img src={getPreviewUrl(discountCoupon.couponImage)} alt="Coupon" className="w-32 max-h-32 rounded border shadow" />
                </div>
              )}
            </div>
            <div className="flex justify-end gap-4 mt-6">
              <button className="px-4 py-2 border border-gray-300 rounded-md text-gray-600 hover:bg-gray-100" onClick={() => setShowPreview(false)}>Edit</button>
              <button className="px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700" onClick={handleConfirm}>Confirm</button>
            </div>
          </div>
        </div>
      )}

      {/* Success Modal */}
      {showSuccessPopup && (
        <div className="fixed inset-0 z-50 backdrop-blur-sm flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-xl text-center">
            <h3 className="text-xl font-semibold text-teal-700 mb-4">Coupon saved successfully!</h3>
            <button
              onClick={() => setShowSuccessPopup(false)}
              className="mt-4 px-6 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* File Size Error Modal */}
      {fileSizeError && (
        <div className="fixed inset-0 z-50 backdrop-blur-sm flex items-center justify-center bg-black/40">
          <div className="bg-white p-6 rounded-lg shadow-xl text-center max-w-sm w-full">
            <h3 className="text-lg font-semibold text-red-600 mb-2">File Too Large</h3>
            <p className="text-gray-700 mb-4">Please upload an image smaller than 2MB.</p>
            <button
              onClick={() => setFileSizeError(false)}
              className="px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DiscountCouponContent;
