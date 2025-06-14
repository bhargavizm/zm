// src/components/DiscountCouponContent.jsx
'use client';

import React, { useState } from 'react';
import useServicesContext from '@/components/hooks/useServiceContext'; // Adjust path if necessary
import { Eye, EyeOff } from 'lucide-react'; // Assuming lucide-react is installed

const DiscountCouponContent = () => {
  const { dynamicForms, updateDynamicForm } = useServicesContext();
  const discountCoupon = dynamicForms.discountCoupon;
  const [showPassword, setShowPassword] = useState(false);

  // Consolidated handleChange for discountCoupon form
  const handleChange = (fieldKey, value) => {
    updateDynamicForm('discountCoupon', null, fieldKey, value);
  };

  // Handler for file inputs
  const handleFileChange = (fieldKey, files) => {
    handleChange(fieldKey, files[0]); // For single file upload
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="space-y-8 p-4 md:p-8 lg:p-12 bg-gray-50 rounded-xl shadow-lg">

      {/* Coupon Details Section */}
      <div className="p-6 bg-white rounded-xl shadow-md border border-gray-100 transition-all duration-300 hover:shadow-lg">
        <h3 className="text-2xl font-semibold text-gray-800 mb-6 border-b pb-3 border-gray-200">Coupon Details</h3>
        <div className="space-y-5">
          {/* Coupon Code */}
          <input
            type="text"
            placeholder="Coupon Code (e.g., SAVE20)"
            className="w-full px-5 py-3 border border-gray-300 rounded-lg text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-teal-200 focus:border-teal-500 transition-all duration-200"
            value={discountCoupon.code || ''}
            onChange={(e) => handleChange('code', e.target.value)}
          />

          {/* Discount Type (Percentage/Fixed Amount) */}
          <div className="flex items-center space-x-4">
            <label className="text-gray-700 font-medium">Discount Type:</label>
            <div className="flex items-center space-x-2">
              <input
                type="radio"
                id="percentage"
                name="discountType"
                value="percentage"
                checked={discountCoupon.type === 'percentage'}
                onChange={() => handleChange('type', 'percentage')}
                className="form-radio text-teal-600 focus:ring-teal-500"
              />
              <label htmlFor="percentage" className="text-gray-700">Percentage</label>
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="radio"
                id="fixed"
                name="discountType"
                value="fixed"
                checked={discountCoupon.type === 'fixed'}
                onChange={() => handleChange('type', 'fixed')}
                className="form-radio text-teal-600 focus:ring-teal-500"
              />
              <label htmlFor="fixed" className="text-gray-700">Fixed Amount</label>
            </div>
          </div>

          {/* Discount Value */}
          <input
            type="number"
            placeholder={discountCoupon.type === 'percentage' ? "Discount Percentage (e.g., 20)" : "Fixed Discount Amount (e.g., 10.00)"}
            className="w-full px-5 py-3 border border-gray-300 rounded-lg text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-teal-200 focus:border-teal-500 transition-all duration-200"
            value={discountCoupon.value || ''}
            onChange={(e) => handleChange('value', e.target.value)}
          />

          {/* Minimum Purchase Amount */}
          <input
            type="number"
            placeholder="Minimum Purchase Amount (e.g., 50.00)"
            className="w-full px-5 py-3 border border-gray-300 rounded-lg text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-teal-200 focus:border-teal-500 transition-all duration-200"
            value={discountCoupon.minPurchase || ''}
            onChange={(e) => handleChange('minPurchase', e.target.value)}
          />

          {/* Expiry Date */}
          <div className="flex flex-col">
            <label htmlFor="expiryDate" className="text-sm font-medium text-gray-700 mb-2">Expiry Date</label>
            <input
              id="expiryDate"
              type="date"
              className="w-full px-5 py-3 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-4 focus:ring-teal-200 focus:border-teal-500 transition-all duration-200"
              value={discountCoupon.expiryDate || ''}
              onChange={(e) => handleChange('expiryDate', e.target.value)}
            />
          </div>

          {/* Description */}
          <textarea
            placeholder="Coupon Description (e.g., Valid on all items. Max discount $20.)"
            rows={3}
            className="w-full px-5 py-3 border border-gray-300 rounded-lg text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-teal-200 focus:border-teal-500 transition-all duration-200 resize-y"
            value={discountCoupon.description || ''}
            onChange={(e) => handleChange('description', e.target.value)}
          />

          {/* Coupon Image Upload */}
          <div className="space-y-2">
            <label className="block text-base font-medium text-gray-700">Coupon Image</label>
            <input
              type="file"
              accept="image/*"
              className="w-full text-gray-700 file:mr-4 file:py-3 file:px-6 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-teal-600 file:text-white hover:file:bg-teal-700 file:transition-colors file:duration-200 cursor-pointer border border-gray-300 rounded-lg py-2"
              onChange={(e) => handleFileChange('couponImage', e.target.files)}
            />
          </div>

          {/* Is Active Toggle */}
          <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg bg-gray-50">
            <label htmlFor="isActive" className="text-base font-medium text-gray-700 cursor-pointer">
              Coupon is Active
            </label>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                id="isActive"
                className="sr-only peer"
                checked={discountCoupon.isActive}
                onChange={(e) => handleChange('isActive', e.target.checked)}
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-teal-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border after:border-gray-300 after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal-600"></div>
            </label>
          </div>
        </div>
      </div>

      {/* Security Section (Optional, but included for consistency) */}
      <div className="p-6 bg-white rounded-xl shadow-md border border-gray-100 transition-all duration-300 hover:shadow-lg">
        <h3 className="text-2xl font-semibold text-gray-800 mb-6 border-b pb-3 border-gray-200">Security</h3>
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            className="w-full px-5 py-3 border border-gray-300 rounded-lg text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-teal-200 focus:border-teal-500 pr-12 transition-all duration-200"
            value={discountCoupon.password || ''}
            onChange={(e) => handleChange('password', e.target.value)}
          />
          <button
            type="button"
            className="absolute inset-y-0 right-0 pr-4 flex items-center text-teal-600 hover:text-teal-800 transition-colors duration-200"
            onClick={togglePasswordVisibility}
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DiscountCouponContent;
