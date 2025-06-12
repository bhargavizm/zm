"use client";
import React from "react";
import Image from "next/image";
import useServicesContext from "@/components/hooks/useServiceContext";

const ProductTemplateThree = () => {
    const { productData, productImage } = useServicesContext();

    // Mapping productData to elements in temp3.webp (Uber Eats UI)
    const userName = productData.email ? productData.email.split('@')[0] : "Jane Cooper"; // Use email for username
    const foodName = productData.heading || "The special hot burger";
    const offerPrice = productData.phone ? `$${productData.phone}` : "$10.00"; // Use phone for price
    const mainFoodImage = productImage || "/placeholder-burger.webp"; // Using a generic placeholder image

    return (
        <div className="relative w-full max-w-sm mx-auto bg-black rounded-3xl overflow-hidden shadow-2xl phone-frame">
            <div className="bg-white min-h-[600px] flex flex-col">
                <div className="p-6 flex justify-between items-center">
                    <div>
                        <div className="text-xl font-semibold text-gray-800">Welcome</div>
                        <div className="text-gray-600 text-sm">{userName}</div>
                    </div>
                    <div className="flex space-x-4">
                        <button className="p-2 rounded-full bg-gray-100 text-gray-600">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                            </svg>
                        </button>
                        <button className="p-2 rounded-full bg-gray-100 text-gray-600">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                            </svg>
                        </button>
                    </div>
                </div>

                <div className="px-6 pb-6">
                    <div className="bg-yellow-50 rounded-xl p-4 flex items-center shadow-sm">
                        <div className="flex-grow pr-4">
                            <div className="text-gray-800 font-bold text-lg mb-2">{foodName}</div>
                            <button className="bg-black text-white px-4 py-2 rounded-full text-sm">Order now</button>
                        </div>
                        <Image src={mainFoodImage} alt="Special Hot Burger" width={150} height={100} className="rounded-md object-cover" />
                    </div>
                </div>

                <div className="px-6 py-4 flex-grow">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-semibold text-gray-800">Best offers</h2>
                        <span className="text-sm text-gray-500">View all</span>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-green-100 rounded-xl p-4 h-32 flex items-end justify-center">
                            <div className="text-center">
                                <div className="text-gray-800 font-semibold mb-1">{productData.description || "data ->"}</div> {/* Using description for generic data */}
                                <div className="text-lg font-bold text-gray-900">{offerPrice}</div>
                            </div>
                        </div>
                        {/* More offer cards can be added here if you had more productData points to map */}
                        <div className="bg-blue-100 rounded-xl p-4 h-32 flex items-end justify-center">
                            <div className="text-center">
                                <div className="text-gray-800 font-semibold mb-1">Another Offer</div>
                                <div className="text-lg font-bold text-gray-900">$12.50</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Navigation */}
                <div className="bg-white border-t border-gray-200 py-3 px-6 flex justify-around items-center">
                    <div className="flex flex-col items-center text-teal-600">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-4.418 0-8 3.582-8 8s3.582 8 8 8 8-3.582 8-8-3.582-8-8-8zm0 14c-3.313 0-6-2.687-6-6s2.687-6 6-6 6 2.687 6 6-2.687 6-6 6z"/></svg>
                        <span className="text-xs mt-1">Home</span>
                    </div>
                    <div className="flex flex-col items-center text-gray-500">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
                        <span className="text-xs mt-1">Search</span>
                    </div>
                    <div className="flex flex-col items-center text-gray-500">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M17 17h.01"/></svg>
                        <span className="text-xs mt-1">Order</span>
                    </div>
                    <div className="flex flex-col items-center text-gray-500">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg>
                        <span className="text-xs mt-1">Profile</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductTemplateThree;