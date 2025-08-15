


// "use client";

// import React, { useEffect, useState } from "react";
// import useDesignContext from "@/components/hooks/useDesignContext";
// import BgDesignRenderer from "./bgDesignRender";

// const DiscountCouponPreview = ({ data = {} }) => {
//   const { bgDesign, setBgDesign, isLoading, setIsLoading } = useDesignContext();
//   const [isMounted, setIsMounted] = useState(false);

//   const defaultBg = "/services-service/discount.webp"; // fallback background

//   useEffect(() => {
//     setIsMounted(true);
//     setIsLoading(true);

//     // Set user-selected bgDesign if available, otherwise default
//     if (data?.bgDesign) setBgDesign(data.bgDesign);
//     else setBgDesign(defaultBg);
//   }, [data]);

//   const {
//     nameOfBusiness,
//     brandLogo,
//     code,
//     couponImage,
//     value,
//     type,
//     description,
//     minPurchase,
//     expiryDate,
//     isActive,
//     qrCodeDetails = {},
//   } = data;

//   const formattedDiscountValue =
//     value !== ""
//       ? type === "percentage"
//         ? `${value}% OFF`
//         : `₹ ${parseFloat(value).toFixed(2)} OFF`
//       : "25% OFF";

//   const formattedExpiryDate = expiryDate
//     ? new Date(expiryDate).toLocaleDateString("en-US", {
//         year: "numeric",
//         month: "short",
//         day: "numeric",
//       })
//     : "Dec 31, 2025";

//   const getImageSrc = (img) => {
//     if (!img) return null;
//     return typeof img === "string" ? img : URL.createObjectURL(img);
//   };

//   return (
//     <div className="flex justify-center mt-10">
//       <div className="relative w-[350px] h-[650px] rounded-[40px] border-[14px] border-gray-800 shadow-xl flex flex-col">
//         {/* 🔳 Background using BgDesignRenderer */}
//          <BgDesignRenderer bgDesign={bgDesign} defaultBg={defaultBg} isLoading={isLoading} setIsLoading={setIsLoading} />

//         {/* iPhone Notch */}
//         <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-gray-900 rounded-b-xl z-20 flex items-center justify-center space-x-1">
//           <div className="w-1.5 h-1.5 bg-gray-600 rounded-full"></div>
//           <div className="w-12 h-3 bg-gray-700 rounded-full"></div>
//         </div>

//         {/* iPhone Screen */}
//         <div className="bg-white-70 w-full rounded-[2.5rem] overflow-hidden flex flex-col relative z-10">
//           {/* Status Bar */}
          

//           {/* Content */}
//           <div className="flex-grow w-full overflow-y-auto scrollbar-hide p-4 text-gray-800">
//             <div className="space-y-6">
//               {/* Brand Logo */}
//               {brandLogo && (
//                 <div className="mb-4 text-center">
//                   <div className="w-full h-40 overflow-hidden rounded-md shadow-md mx-auto">
//                     <img
//                       src={getImageSrc(brandLogo)}
//                       alt="Brand Logo"
//                       className="w-full h-full object-contain"
//                     />
//                   </div>
//                 </div>
//               )}

//               {/* Business Name */}
//               {nameOfBusiness && (
//                 <h2 className="text-xl font-bold text-center text-gray-800 mb-4">
//                   {nameOfBusiness}
//                 </h2>
//               )}

//               <h2 className="text-xl font-bold text-center text-gray-800 mb-4">
//                 Your Discount Coupon
//               </h2>

//               {/* Coupon Card */}
//               <div className="bg-gradient-to-r from-teal-500 to-teal-600 rounded-xl shadow-lg overflow-hidden border border-teal-700 p-6 relative">
//                 <div className="absolute inset-0 border-4 border-dashed border-white opacity-20 rounded-xl"></div>

//                 {/* Coupon Image */}
//                 {couponImage && (
//                   <div className="mb-4 text-center">
//                     <div className="w-full h-40 overflow-hidden rounded-md shadow-md mx-auto">
//                       <img
//                         src={getImageSrc(couponImage)}
//                         alt="Coupon Visual"
//                         className="w-full h-full object-contain"
//                       />
//                     </div>
//                   </div>
//                 )}

//                 {/* Coupon Text */}
//                 <div className="relative z-10 text-center text-white">
//                   <p className="text-sm font-semibold mb-1 uppercase tracking-wider opacity-90">
//                     Use Code:
//                   </p>
//                   <h3 className="text-4xl font-extrabold mb-3 bg-white text-teal-700 py-2 px-4 rounded-lg inline-block shadow-inner tracking-wider">
//                     {code || "COUPON 2025"}
//                   </h3>
//                 </div>
//               </div>

              
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DiscountCouponPreview;


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
    description,
    minPurchase,
    expiryDate,
  } = couponData;

  const formattedDiscountValue =
    value !== ""
      ? type === "percentage"
        ? `${value}% OFF`
        : `₹ ${parseFloat(value).toFixed(2)} OFF`
      : "25% OFF";

  const formattedExpiryDate = expiryDate
    ? new Date(expiryDate).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : "Dec 31, 2025";

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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiscountCouponPreview;
