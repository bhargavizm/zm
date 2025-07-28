"use client";
import React, { useEffect, useState } from "react";
import { FiUser, FiCalendar, FiPhone, FiMapPin, FiMail, FiImage, FiVideo } from "react-icons/fi";

const BusinessShopPreview = ({ data }) => {
    const defaultBg = "/images/templates/businessShop1.webp";
    const [bgDesign, setBgDesign] = useState(defaultBg);
    const [isLoading, setIsLoading] = useState(true);

    const isVideo = bgDesign?.endsWith(".mp4") || bgDesign?.endsWith(".webm");
    const isImage = bgDesign && !isVideo;

    useEffect(() => {
        if (data?.bgDesign) {
            setBgDesign(data.bgDesign);
        } else {
            setBgDesign(defaultBg);
        }
    }, [data]);

    const hasData =
        data?.businessName ||
        data?.businessType ||
        data?.description ||
        data?.establishedDate ||
        data?.shopTimings ||
        data?.discount ||
        data?.owner ||
        data?.phone ||
        data?.altPhone ||
        data?.email ||
        data?.address ||
        data?.logo ||
        data?.video ||
        (Array.isArray(data?.gallery) && data.gallery.length > 0);

    const getSrc = (input) =>
        typeof input === "string" ? input : URL.createObjectURL(input);

    return (
        <div className="flex justify-center">
            <div className="rounded-[40px] border-[14px] border-gray-800 shadow-xl w-[350px] h-[600px] overflow-hidden flex flex-col relative">

                {/* Background */}
                {isImage ? (
                    <img
                        src={bgDesign}
                        alt="Background"
                        onLoad={() => setTimeout(() => setIsLoading(false), 300)}
                        className="absolute top-0 left-0 w-full h-full object-cover z-0"
                    />
                ) : isVideo ? (
                    <video
                        src={bgDesign}
                        autoPlay
                        loop
                        muted
                        playsInline
                        onLoadedData={() => setTimeout(() => setIsLoading(false), 300)}
                        className="absolute top-0 left-0 w-full h-full object-cover z-0"
                    />
                ) : (
                    <img
                        src={defaultBg}
                        alt="Default Background"
                        onLoad={() => setTimeout(() => setIsLoading(false), 300)}
                        className="absolute top-0 left-0 w-full h-full object-cover z-0"
                    />
                )}

                {/* iPhone Notch */}
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-1/3 h-6 bg-gray-800 rounded-b-xl z-10" />

                {/* Main content */}
                <div className="flex-1 overflow-y-auto z-20 bg-white/80 pt-8 m-2 rounded-xl pb-4 px-4 w-full">
                    {hasData ? (
                        <div className="space-y-4">
                            <h2 className="text-xl font-bold text-center text-[#008080]">
                                Business QR Code
                            </h2>

                            {data.businessName && (
                                <div className="text-center">
                                    <h3 className="text-lg font-semibold">{data.businessName}</h3>
                                </div>
                            )}

                            {(data.businessType || data.description || data.establishedDate || data.shopTimings || data.discount) && (
                                <div className="bg-[#008080]/10 p-3 rounded border border-[#008080]/20 text-black">
                                    <div className="flex items-center text-[#008080] mb-1">
                                        <FiUser className="mr-2" />
                                        <span className="font-medium">Business Info</span>
                                    </div>
                                    {data.businessType && <p>Type: {data.businessType}</p>}
                                    {data.description && <p>{data.description}</p>}
                                    {data.establishedDate && (
                                        <p>Established: {new Date(data.establishedDate).toLocaleDateString("en-GB")}</p>
                                    )}
                                    {data.shopTimings && <p>Timings: {data.shopTimings}</p>}
                                    {data.discount && (
                                        <p className="text-red-600 font-medium">Offer: {data.discount}</p>
                                    )}
                                </div>
                            )}

                            {(data.owner || data.phone || data.altPhone || data.email || data.address) && (
                                <div className="bg-[#008080]/10 p-3 rounded border border-[#008080]/20 text-black">
                                    <div className="flex items-center text-[#008080] mb-1">
                                        <FiPhone className="mr-2" />
                                        <span className="font-medium">Contact</span>
                                    </div>
                                    {data.owner && <p>Owner: {data.owner}</p>}
                                    {data.phone && <p>Phone: {data.phone}</p>}
                                    {data.altPhone && <p>Alt Phone: {data.altPhone}</p>}
                                    {data.email && <p>Email: {data.email}</p>}
                                    {data.address && <p>Address: {data.address}</p>}
                                </div>
                            )}

                            {(data.logo || data.video || (data.gallery?.length > 0)) && (
                                <div className="bg-[#008080]/10 p-3 rounded border border-[#008080]/20 text-black space-y-3">
                                    <div className="flex items-center text-[#008080] mb-1">
                                        <FiImage className="mr-2" />
                                        <span className="font-medium">Media</span>
                                    </div>
                                    {data.logo && (
                                        <img
                                            src={getSrc(data.logo)}
                                            alt="Logo"
                                            className="w-20 h-20 object-cover rounded-full border mx-auto"
                                        />
                                    )}
                                    {data.video && (
                                        <div>
                                            <FiVideo className="inline mr-2" />
                                            <video
                                                src={getSrc(data.video)}
                                                controls
                                                className="w-full rounded"
                                            />
                                        </div>
                                    )}
                                    {data.gallery?.length > 0 && (
                                        <div className="grid grid-cols-2 gap-2">
                                            {data.gallery.map((img, idx) => (
                                                <img
                                                    key={idx}
                                                    src={getSrc(img)}
                                                    alt={`Gallery ${idx + 1}`}
                                                    className="rounded object-cover w-full h-24"
                                                />
                                            ))}
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="h-full flex flex-col items-center justify-center text-center text-gray-400">
                            <FiUser className="text-4xl mb-4 text-[#008080]" />
                            <h3 className="text-lg font-medium">Business Preview</h3>
                            <p className="mt-2">No business data provided.</p>
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="border-t border-gray-200 text-center text-xs text-gray-500 py-2 relative z-10 bg-white">
                    <p>Scan for Business Info</p>
                    <p className="mt-1">v1.0.0</p>
                </div>
            </div>
        </div>
    );
};

export default BusinessShopPreview;
