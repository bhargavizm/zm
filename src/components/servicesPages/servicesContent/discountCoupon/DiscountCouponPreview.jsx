// src/components/DiscountCouponPreview.jsx
'use client';

import React from 'react';
import useServicesContext from '@/components/hooks/useServiceContext';

const DiscountCouponPreview = () => {
  const { dynamicForms } = useServicesContext();
  const discountCoupon = dynamicForms.discountCoupon || {};

  // Check if there's any data to display
  const hasData =
    discountCoupon.code ||
    discountCoupon.value ||
    discountCoupon.description ||
    discountCoupon.couponImage;

  if (!hasData) {
    return (
      <div className="flex justify-center items-center h-48 text-gray-500 text-lg font-medium">
        Start entering coupon details to see a live preview!
      </div>
    );
  }

  // Format discount value
  const formattedDiscountValue =
    discountCoupon.value !== ""
      ? discountCoupon.type === 'percentage'
        ? `${discountCoupon.value}% OFF`
        : `₹ ${parseFloat(discountCoupon.value).toFixed(2)} OFF`
      : 'N/A';

  // Format expiry date
  const formattedExpiryDate = discountCoupon.expiryDate
    ? new Date(discountCoupon.expiryDate).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      })
    : 'No Expiry';

  return (
    <div className="flex justify-center items-center mt-10">
      <div className="relative bg-gradient-to-br from-gray-900 to-gray-800 p-3 rounded-[3rem] w-[390px] h-[640px] shadow-2xl border-4 border-gray-700 overflow-y-auto">
        {/* iPhone Notch */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-gray-900 rounded-b-xl z-20 flex items-center justify-center space-x-1">
          <div className="w-1.5 h-1.5 bg-gray-600 rounded-full"></div>
          <div className="w-12 h-3 bg-gray-700 rounded-full"></div>
        </div>

        {/* iPhone Screen */}
        <div className="bg-white h-full w-full rounded-[2.5rem] overflow-hidden flex flex-col">
          {/* Status Bar */}
          <div className="flex justify-between items-center px-6 pt-4 text-xs font-semibold text-gray-700">
            <span>9:41</span>
            <div className="flex items-center space-x-1">
              <span>🔋</span>
              <span>📶</span>
              <span>5G</span>
            </div>
          </div>

          {/* Scrollable Content */}
          <div className="flex-grow w-full overflow-y-scroll hide-scrollbar p-4 text-gray-800">
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-center text-gray-800 mb-4">Your Discount Coupon</h2>

              {/* Discount Coupon Card */}
              <div className="bg-gradient-to-r from-teal-500 to-teal-600 rounded-xl shadow-lg overflow-hidden border border-teal-700 p-6 relative">
                {/* Decorative border or pattern */}
                <div className="absolute inset-0 border-4 border-dashed border-white opacity-20 rounded-xl"></div>

                {/* Coupon Image */}
                {discountCoupon.couponImage && (
                  <div className="mb-4 text-center">
                    <img
                      src={URL.createObjectURL(discountCoupon.couponImage)}
                      alt="Coupon Visual"
                      className="w-full max-h-40 object-cover rounded-md shadow-md mx-auto"
                    />
                  </div>
                )}

                <div className="relative z-10 text-white text-center">
                  {discountCoupon.code && (
                    <p className="text-sm font-semibold mb-1 uppercase tracking-wider opacity-90">Use Code:</p>
                  )}
                  <h3 className="text-4xl font-extrabold mb-3 bg-white text-teal-700 py-2 px-4 rounded-lg inline-block shadow-inner tracking-wider">
                    {discountCoupon.code || 'COUPONCODE'}
                  </h3>

                  <p className="text-3xl font-bold mt-4 mb-2">
                    {formattedDiscountValue}
                  </p>

                  {discountCoupon.description && (
                    <p className="text-sm italic mb-4 opacity-90">
                      {discountCoupon.description}
                    </p>
                  )}

                  <div className="flex justify-between items-center bg-teal-700 px-4 py-2 rounded-lg text-xs font-semibold">
                    <p>Min. Purchase: {discountCoupon.minPurchase ? `₹ ${parseFloat(discountCoupon.minPurchase).toFixed(2)}` : 'None'}</p>
                    <p>Expires: {formattedExpiryDate}</p>
                  </div>

                  <p className={`mt-4 text-sm font-bold ${discountCoupon.isActive ? 'text-green-200' : 'text-red-200'}`}>
                    {discountCoupon.isActive ? 'ACTIVE' : 'INACTIVE'}
                  </p>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiscountCouponPreview;
