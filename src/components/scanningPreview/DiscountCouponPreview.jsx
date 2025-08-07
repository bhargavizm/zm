"use client";

import React, { useEffect, useState } from "react";
import useDesignContext from "@/components/hooks/useDesignContext";
import BgDesignRenderer from "./bgDesignRender";

const DiscountCouponPreview = ({ data = {} }) => {
    const { bgDesign, setBgDesign } = useDesignContext();
    const [isMounted, setIsMounted] = useState(false);
    const defaultBg = "/services-service/discount.webp"; // Use your own fallback image

    useEffect(() => {
        setIsMounted(true);
        if (data?.bg) {
            setBgDesign(data.bg);
        } else {
            setBgDesign(defaultBg);
        }
    }, [data]);

    const {
        nameOfBusiness,
        brandLogo,
        code,
        couponImage,
        qrCodeDetails = {},
    } = data;

    const { phone, email, link, location = {} } = qrCodeDetails;

    return (
        <section className="flex justify-center items-start">
            <div>
                {/* Background */}
                <BgDesignRenderer bgDesign={bgDesign} defaultBg={defaultBg} />

                {/* Foreground */}
                <div className="absolute inset-0 p-4 z-20 bg-white/80 m-2 pt-10 text-black overflow-y-auto scrollbar-hidden space-y-4 rounded-[28px]">
                    {nameOfBusiness && (
                        <h2 className="text-2xl font-bold text-center text-[#004d4d]">
                            {nameOfBusiness}
                        </h2>
                    )}

                    {/* Brand Logo */}
                    {brandLogo && (
                        <div className="flex justify-center">
                            <img
                                src={brandLogo}
                                alt="Brand Logo"
                                className="w-24 h-24 rounded-full shadow-md object-center border border-gray-300"
                            />
                        </div>
                    )}

                    {/* Coupon Image */}
                    {couponImage && (
                        <div className="flex justify-center">
                            <img
                                src={couponImage}
                                alt="Coupon"
                                className="w-full max-w-xs rounded-lg shadow-md border border-gray-300"
                            />
                        </div>
                    )}

                    {/* Code */}
                    {code && (
                        <p className="text-center text-xl font-semibold mt-4">
                            🏷 Coupon Code: <span className="text-[#006666]">{code}</span>
                        </p>
                    )}

                    {/* Location */}
                    {(location?.address || location?.latitude || location?.longitude) && (
                        <div className="text-sm mt-3 text-center">
                            <p>📍 <strong>Location:</strong></p>
                            <p>{location.address || "Address not provided"}</p>
                            {location.latitude && location.longitude && (
                                <p>
                                    Lat: {location.latitude}, Lng: {location.longitude}
                                </p>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default DiscountCouponPreview;
