"use client";
import React from "react";
import Image from "next/image";
import useServicesContext from "@/components/hooks/useServiceContext";

const ProductTemplateTwo = () => {
    const { productData, productImage } = useServicesContext();

    // Mapping productData to elements in temp2.webp (IMetric App - E-commerce)
    const productName = productData.heading || "[name]";
    const productPrice = productData.phone ? `$${productData.phone}` : "$[1]"; // Using phone for price
    const mainImageUrl = productImage || "/placeholder-shoe.webp"; // Using a generic placeholder image

    return (
        <div className="relative w-full max-w-sm mx-auto bg-black rounded-3xl overflow-hidden shadow-2xl phone-frame">
            <div className="bg-gray-100 min-h-[600px] flex flex-col">
                <div className="bg-purple-700 py-4 px-6 flex justify-between items-center text-white">
                    <button>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>
                    <div className="flex items-center space-x-3">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                        </svg>
                        <Image src="/profile-avatar.webp" alt="User Profile" width={32} height={32} className="rounded-full" />
                    </div>
                </div>

                <div className="px-6 py-4 flex-grow">
                    <h1 className="text-2xl font-bold mb-4 text-purple-900">Brands</h1>
                    <div className="relative mb-6">
                        <input
                            type="text"
                            placeholder="Search"
                            className="w-full pl-10 pr-4 py-2 rounded-full bg-white shadow-sm border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-300"
                        />
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </div>

                    <div className="flex space-x-3 mb-6 overflow-x-auto pb-2 scrollbar-hide">
                        <span className="bg-purple-600 text-white px-4 py-2 rounded-full text-sm whitespace-nowrap">Nike</span>
                        <span className="bg-white text-gray-700 px-4 py-2 rounded-full text-sm whitespace-nowrap border">Adidas</span>
                        <span className="bg-white text-gray-700 px-4 py-2 rounded-full text-sm whitespace-nowrap border">Conversense</span>
                        <span className="bg-white text-gray-700 px-4 py-2 rounded-full text-sm whitespace-nowrap border">Vans</span>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-6">
                        <div className="bg-gradient-to-br from-pink-300 to-purple-400 rounded-lg p-4 h-48 flex flex-col justify-between shadow-md">
                            <div className="flex justify-end">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                </svg>
                            </div>
                            <div className="text-white">
                                <div className="font-semibold text-lg">{productName}</div>
                                <div className="text-sm">{productPrice}</div>
                                <div className="flex mt-2 space-x-2">
                                    <button className="bg-white bg-opacity-30 rounded-full p-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/></svg>
                                    </button>
                                    <button className="bg-white bg-opacity-30 rounded-full p-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 0a2 2 0 11-4 0 2 2 0 014 0z"/></svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="bg-gradient-to-br from-pink-300 to-purple-400 rounded-lg p-4 h-48 flex flex-col justify-between shadow-md">
                            <div className="flex justify-end">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                </svg>
                            </div>
                            <div className="text-white">
                                <div className="font-semibold text-lg">{productData.description || "[name]"}</div> {/* Using description for second product name */}
                                <div className="text-sm">{productPrice}</div>
                                <div className="flex mt-2 space-x-2">
                                    <button className="bg-white bg-opacity-30 rounded-full p-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/></svg>
                                    </button>
                                    <button className="bg-white bg-opacity-30 rounded-full p-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 0a2 2 0 11-4 0 2 2 0 014 0z"/></svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <h2 className="text-xl font-bold mb-4 text-purple-900">Most Popular</h2>
                    <div className="bg-purple-700 rounded-xl p-4 flex items-center justify-between text-white shadow-md">
                        <div className="bg-purple-500 w-16 h-16 rounded-full flex items-center justify-center mr-3">
                            {/* Product Image could go here if it's small/circular */}
                            {productImage && (
                                <Image src={productImage} alt="Product" width={40} height={40} className="rounded-full object-cover" />
                            )}
                        </div>
                        <div className="flex-grow">
                            <div className="font-semibold text-lg">{productName}</div>
                            <div className="text-sm">{productPrice}</div>
                        </div>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                        </svg>
                    </div>
                </div>

                {/* Bottom Navigation */}
                <div className="bg-white border-t border-gray-200 py-3 px-6 flex justify-around items-center">
                    <div className="flex flex-col items-center text-purple-700">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-4.418 0-8 3.582-8 8s3.582 8 8 8 8-3.582 8-8-3.582-8-8-8zm0 14c-3.313 0-6-2.687-6-6s2.687-6 6-6 6 2.687 6 6-2.687 6-6 6z"/></svg>
                    </div>
                    <div className="flex flex-col items-center text-gray-500">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 0a2 2 0 11-4 0 2 2 0 014 0z"/>
                        </svg>
                    </div>
                    <div className="flex flex-col items-center text-gray-500">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
                        </svg>
                    </div>
                    <div className="flex flex-col items-center text-gray-500">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                        </svg>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductTemplateTwo;