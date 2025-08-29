"use client";

import React, { useEffect } from "react";
import useServicesContext from "@/components/hooks/useServiceContext";
import useDesignContext from "@/components/hooks/useDesignContext";
import Image from "next/image";

const DiscountCouponPreview = () => {
  const { dynamicForms } = useServicesContext();
  const discountCoupon = dynamicForms.discountCoupon || {};

  const { bgDesign, setBgDesign, isLoading, setIsLoading } = useDesignContext();

  const defaultBg = "/services-service/discount.webp"

  useEffect(() => {
    setIsLoading(true);
    setBgDesign(defaultBg);
  }, []);

  const isVideo = bgDesign?.endsWith(".mp4") || bgDesign?.endsWith(".webm");
  const isImage = bgDesign && !isVideo;

  const showImage = !!discountCoupon.couponImage;
  const showBrandLogo = !!discountCoupon.brandLogo;

  return (
    // <div className="flex justify-center items-center mt-10">
    <div className="flex justify-center">
      {/* <div className="relative bg-gradient-to-br from-gray-900 to-gray-800 p-3 rounded-[40px] w-[350px] h-[650px] shadow-2xl border-4 border-gray-700 overflow-y-auto scrollbar-hide"> */}
      <div className="relative w-[350px] h-[650px] rounded-[40px] border-[14px] border-gray-800 shadow-xl  flex flex-col">
        {/* 🔳 Background */}
        {isImage && (
          <img
            src={bgDesign}
            alt="Background"
            onLoad={() => setTimeout(() => setIsLoading(false), 300)}
            className="absolute inset-0 w-full h-full object-cover z-0"
          />
        )}
        {isVideo && (
          <video
            src={bgDesign}
            autoPlay
            loop
            muted
            playsInline
            onLoadedData={() => setTimeout(() => setIsLoading(false), 300)}
            className="absolute inset-0 w-full h-full object-cover z-0"
          />
        )}
        {!bgDesign && (
          <img
            src={defaultBg}
            alt="Background"
            onLoad={() => setTimeout(() => setIsLoading(false), 300)}
            className="absolute inset-0 w-full h-full object-cover z-0"
          />
        )}

        {/* ⏳ Loader */}
        {isLoading && (
          <div className="absolute inset-0 z-50 bg-mainGreen backdrop-blur-sm flex justify-center items-center">
            <Image
              src="/logos/ZM LOGO.webp"
              alt="Loading"
              width={100}
              height={100}
              className="w-20 h-20 animate-bounce"
            />
          </div>
        )}

        {/* iPhone Notch */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-gray-900 rounded-b-xl z-20 flex items-center justify-center space-x-1">
          <div className="w-1.5 h-1.5 bg-gray-600 rounded-full"></div>
          <div className="w-12 h-3 bg-gray-700 rounded-full"></div>
        </div>

        {/* iPhone Screen */}
        <div className="bg-white-70  w-full rounded-[2.5rem] overflow-hidden flex flex-col relative z-10">
          {/* Status Bar */}
          <div className="flex justify-between items-center px-6 pt-4 text-xs font-semibold text-gray-700">
            <span>9:41</span>
            <div className="flex items-center space-x-1">
              <span>🔋</span>
              <span>📶</span>
              <span>5G</span>
            </div>
          </div>

          {/* Content */}
          <div className="flex-grow w-full overflow-y-auto scrollbar-hide p-4 text-gray-800">
            <div className="space-y-6">
              {showBrandLogo && (
                <div className="mb-4 text-center">
                  <div className="w-full h-40 overflow-hidden rounded-md shadow-md mx-auto">
                    <img
                      src={URL.createObjectURL(discountCoupon.brandLogo)}
                      alt="brand logo"
                      className="w-full h-full object-contain"
                    />
                  </div>

                </div>
              )}
              <h2 className="text-xl font-bold text-center text-gray-800 mb-4 ">
                {discountCoupon.nameOfBusiness || "Name of Business"}
              </h2>
              <h2 className="text-xl font-bold text-center text-gray-800 mb-4">
                Your Discount Coupon
              </h2>

              {/* Coupon Card */}
              <div className="bg-gradient-to-r from-teal-500 to-teal-600 rounded-xl shadow-lg overflow-hidden border border-teal-700 p-6 relative">
                {/* Decorative dashed border */}
                <div className="absolute inset-0 border-4 border-dashed border-white opacity-20 rounded-xl"></div>

                {/* Coupon Image */}
                {showImage && (
                  <div className="mb-4 text-center">
                    <div className="w-full h-40 overflow-hidden rounded-md shadow-md mx-auto">
                      <img
                        src={URL.createObjectURL(discountCoupon.couponImage)}
                        alt="Coupon Visual"
                        className="w-full h-full object-contain"
                      />
                    </div>

                  </div>
                )}

                {/* Coupon Text */}
                <div className="relative z-10 text-white text-center">
                  <p className="text-sm font-semibold mb-1 uppercase tracking-wider opacity-90">
                    Use Code:
                  </p>
                  <h3 className="text-4xl font-extrabold mb-3 bg-white text-teal-700 py-2 px-4 rounded-lg inline-block shadow-inner tracking-wider">
                    {discountCoupon.code || "COUPON CODE"}
                  </h3>
                   <h3 className="text-4xl font-extrabold mb-3 bg-white text-teal-700 py-2 px-4 rounded-lg inline-block shadow-inner tracking-wider">
                    {discountCoupon.discountPercent || "-"}% Off
                  </h3>
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
