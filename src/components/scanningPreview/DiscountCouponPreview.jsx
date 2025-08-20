"use client";

import React, { useEffect, useState } from "react";
import useServicesContext from "@/components/hooks/useServiceContext";
import BgDesignRenderer from "./bgDesignRender";

const DiscountCouponPreview = ({ data = {} }) => {
  const { dynamicForms } = useServicesContext();
  const couponData = data || dynamicForms.discountCoupon || {};

  const defaultBg = "/services-service/discount.webp"; // fallback
  const [bgDesign, setBgDesign] = useState(defaultBg);

  useEffect(() => {
    setBgDesign(couponData?.bgDesign || defaultBg);
  }, [couponData?.bgDesign]);

  const {
    nameOfBusiness,
    brandLogo,
    code,
    couponImage,
    value,
    type,
    discountPercent,
    description,
    minPurchase,
    expiryDate,
  } = couponData;


  const getImageSrc = (img) => {
    if (!img) return null;
    return typeof img === "string" ? img : URL.createObjectURL(img);
  };

  return (
    <div className="w-full px-6">
      <div className="relative">
        {/* Background */}
        <BgDesignRenderer bgDesign={bgDesign} defaultBg={defaultBg} />

        {/* Main Card */}
        <div className="relative flex-1 bg-white/70 m-2 rounded-xl overflow-y-auto pt-6 pb-3 px-3 z-20 max-h-full">
          <div className="space-y-6">
            {brandLogo && (
              <div className="mb-4 text-center">
                <div className="w-full h-40 overflow-hidden rounded-md shadow-md mx-auto">
                  <img
                    src={getImageSrc(brandLogo)}
                    alt="Brand Logo"
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>
            )}

            {nameOfBusiness && (
              <h2 className="text-xl font-bold text-center text-gray-800 mb-4">
                {nameOfBusiness}
              </h2>
            )}

            <h2 className="text-xl font-bold text-center text-gray-800 mb-4">
              Your Discount Coupon
            </h2>

            {/* Coupon Card */}
            <div className="bg-gradient-to-r from-teal-500 to-teal-600 rounded-xl shadow-lg overflow-hidden border border-teal-700 p-6 relative">
              <div className="absolute inset-0 border-4 border-dashed border-white opacity-20 rounded-xl"></div>

              {couponImage && (
                <div className="mb-4 text-center">
                  <div className="w-full h-40 overflow-hidden rounded-md shadow-md mx-auto">
                    <img
                      src={getImageSrc(couponImage)}
                      alt="Coupon Visual"
                      className="w-full h-full object-contain"
                    />
                  </div>
                </div>
              )}

              <div className="relative z-10 text-center text-white">
                <p className="text-sm font-semibold mb-1 uppercase tracking-wider opacity-90">
                  Use Code:
                </p>
                <h3 className="text-4xl font-extrabold mb-3 bg-white text-teal-700 py-2 px-4 rounded-lg inline-block shadow-inner tracking-wider">
                  {code || "COUPON 2025"}
                </h3>
                 
              </div>
               <div className="relative z-10 text-center text-white">
                <h3 className="text-4xl font-extrabold mb-3 bg-white text-teal-700 py-2 px-4 rounded-lg inline-block shadow-inner tracking-wider">
                  {discountPercent || "-"} % Off
                </h3>
                 
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiscountCouponPreview;
