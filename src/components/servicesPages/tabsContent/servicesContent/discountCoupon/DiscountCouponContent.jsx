'use client';

import React, { useRef, useState } from 'react';
import useServicesContext from '@/components/hooks/useServiceContext';
import { Eye, EyeOff, X } from 'lucide-react';
import NFCModal from '@/components/modalPopUps/nfcModal';
import { useDispatch } from 'react-redux';
import { setDiscountServices } from '@/redux/slices/servicesSlice';
import axios from 'axios';
import CryptoJS from 'crypto-js';
import useDesignContext from '@/components/hooks/useDesignContext';
import { useParams } from 'next/navigation';
import toast from 'react-hot-toast';
import LoadingSpinner from '@/components/common/spinner';

const DiscountCouponContent = () => {
  const { dynamicForms, updateDynamicForm, servicesDataLoading, setServicesDataLoading } = useServicesContext();
  const { setActiveTab } = useDesignContext();
  const { slug } = useParams();
  const discountCoupon = dynamicForms.discountCoupon || {};
  const [showPassword, setShowPassword] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const dispatch = useDispatch();

  const brandLogoInputRef = useRef(null);
  const couponImageInputRef = useRef(null);

  const handleChange = (fieldKey, value) => {
    updateDynamicForm('discountCoupon', null, fieldKey, value);
  };

  const handleFileChange = (fieldKey, files) => {
    if (files && files[0]) {
      if (files[0].size > 2 * 1024 * 1024) {
        toast.error('File size should not exceed 2MB');
        return;
      }
      handleChange(fieldKey, files[0]);
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

  const handleSubmit = () => {
    const hasAnyInput =
      !!discountCoupon.nameOfBusiness?.trim() ||
      !!discountCoupon.code?.trim() ||
      !!discountCoupon.password?.trim() ||
      !!discountCoupon.brandLogo ||
      !!discountCoupon.couponImage;

    if (!hasAnyInput) {
      toast.error('Please fill at least one field before submitting.');
      return;
    }

    setShowPreview(true); // Show the preview popup
  };

  const handleConfirm = async () => {
    setActiveTab(slug, "Backdrop Designs");
    // setServicesDataLoading(true);
    // try {
    //   const encryptedPassword = discountCoupon.password
    //     ? CryptoJS.AES.encrypt(discountCoupon.password, 'secret-key').toString()
    //     : '';

    //   const formData = new FormData();
    //   formData.append('nameOfBusiness', discountCoupon.nameOfBusiness || '');
    //   formData.append('code', discountCoupon.code || '');
    //   formData.append('password', encryptedPassword);

    //   if (discountCoupon.brandLogo instanceof File) {
    //     formData.append('brandLogo', discountCoupon.brandLogo);
    //   }
    //   if (discountCoupon.couponImage instanceof File) {
    //     formData.append('couponImage', discountCoupon.couponImage);
    //   }

    //   const response = await axios.post('/api/services/discounts', formData, {
    //     headers: {
    //       // Let Axios set the content-type boundary
    //     },
    //   });

    //   if (response && response.data && response.data.success) {
    //     toast.success("Discount coupon saved successfully.");
    //     setActiveTab(slug, "QR Code");
    //     dispatch(setDiscountServices(response.data.data));
    //     setShowPreview(false);
    //     setShowSuccessPopup(true);

    //     // Reset form
    //     updateDynamicForm('discountCoupon', null, 'nameOfBusiness', '');
    //     updateDynamicForm('discountCoupon', null, 'code', '');
    //     updateDynamicForm('discountCoupon', null, 'password', '');
    //     updateDynamicForm('discountCoupon', null, 'brandLogo', null);
    //     updateDynamicForm('discountCoupon', null, 'couponImage', null);

    //     if (brandLogoInputRef.current) brandLogoInputRef.current.value = '';
    //     if (couponImageInputRef.current) couponImageInputRef.current.value = '';

    //     setTimeout(() => setShowSuccessPopup(false), 1000);
    //   } else {
    //     console.warn('Unexpected response:', response);
    //     toast.error(response?.data?.message || 'Failed to save coupon.');
    //   }
    // } catch (error) {
    //   console.error('Error submitting coupon:', error);
    //   toast.error(error?.response?.data?.error || "Something went wrong!");

    //   if (error.response?.status === 401) {
    //     window.location.href = "/login";
    //     return;
    //   }
    // } finally {
    //   setServicesDataLoading(false);
    // }
  };

  return (
    <>
      {servicesDataLoading && <LoadingSpinner />}

      <div className="space-y-8 p-4 md:p-8 lg:p-12 bg-gray-50 rounded-xl shadow-lg">
        {/* Brand Logo */}
        <div className="space-y-2">
          <label className="block text-base font-medium text-gray-700">Brand Logo</label>
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

        {/* Coupon Details */}
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

            {/* Coupon Image */}
            <div className="space-y-2">
              <label className="block text-base font-medium text-gray-700">Coupon Image</label>
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

        {/* Security Section */}
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
              aria-label={showPassword ? 'Hide password' : 'Show password'}
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

        {/* Preview Modal */}
        {showPreview && (
          <div className="fixed inset-0 backdrop-blur-sm bg-black/30 flex justify-center items-center z-50 overflow-y-auto px-4">
            <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-lg space-y-4">
              <h2 className="text-xl font-semibold text-gray-800">Preview Coupon</h2>
              <div className="space-y-2 text-sm text-gray-700">
                {discountCoupon.nameOfBusiness && (
                  <p><strong>Name of Business:</strong> {discountCoupon.nameOfBusiness}</p>
                )}
                {discountCoupon.code && (
                  <p><strong>Coupon Code:</strong> {discountCoupon.code}</p>
                )}
                {discountCoupon.password && (
                  <p><strong>Password:</strong> ••••••</p>
                )}
                {discountCoupon.brandLogo && (
                  <div>
                    <p className="font-semibold mt-2">Brand Logo:</p>
                    <img src={getPreviewUrl(discountCoupon.brandLogo)} alt="Brand Logo" className="w-32 max-h-32 rounded border shadow" />
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
                  Confirm
                </button>
              </div>
            </div>
          </div>
        )}

        {showSuccessPopup && (
          <div className="fixed inset-0 backdrop-blur-sm bg-black/30 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-sm text-center space-y-4">
              <h2 className="text-xl font-semibold text-green-600">Success!</h2>
              <p className="text-gray-700">Coupon saved successfully.</p>
              <button onClick={() => setShowSuccessPopup(false)} className="mt-4 px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700">
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default DiscountCouponContent;
