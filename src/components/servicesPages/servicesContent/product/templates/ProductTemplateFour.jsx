"use client";
import React from "react";
import Image from "next/image";
import useServicesContext from "@/components/hooks/useServiceContext";

const ProductTemplateFour = () => {
    const { productData, productImage } = useServicesContext();

    // Mapping productData to elements in temp4.webp (Teladoc UI - Medical App)
    const userName = productData.email ? productData.email.split('@')[0] : "StackOne"; // Using email for username
    const mainHeading = productData.heading || "WE CARE ABOUT YOUR HEALTH";
    const subText = productData.description || "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed diam nonummy nibh euismod tincidunt.";
    const contactNumber = productData.phone || "0123-456-789";
    const productCategory = productData.videoUrl || "Medicine"; // Using videoUrl for category, very loose
    const mainProductImage = productImage || "/placeholder-medicine.webp"; // Using a generic placeholder image

    return (
        <div className="relative w-full max-w-sm mx-auto bg-black rounded-3xl overflow-hidden shadow-2xl phone-frame">
            <div className="bg-white min-h-[600px] flex flex-col">
                <div className="px-6 py-4 flex justify-between items-center">
                    <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden">
                            {productImage && (
                                <Image src={productImage} alt="User Avatar" width={40} height={40} className="object-cover" />
                            )}
                            {!productImage && (
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                            )}
                        </div>
                        <div>
                            <div className="text-sm text-gray-600">Hello {userName},</div>
                            <div className="font-semibold text-gray-900">What Do You Want</div>
                        </div>
                    </div>
                    <button className="p-2 rounded-full bg-white text-gray-600">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                        </svg>
                    </button>
                </div>

                <div className="px-6 mb-6">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search Product"
                            className="w-full pl-10 pr-4 py-2 rounded-full bg-gray-100 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-300"
                        />
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </div>
                </div>

                <div className="px-6 mb-6">
                    <div className="relative w-full h-36 bg-blue-100 rounded-xl overflow-hidden shadow-md flex items-center justify-between p-4">
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-400 opacity-80 rounded-xl"></div>
                        <div className="relative z-10 flex-grow pr-4">
                            <div className="text-white text-xs font-semibold mb-1">#1 Medical Center</div>
                            <div className="text-white font-bold text-xl leading-tight mb-2">{mainHeading}</div>
                            <div className="text-white text-xs mb-3">{subText}</div>
                            <button className="bg-white text-blue-700 px-4 py-1 rounded-full text-xs font-semibold hover:bg-gray-100">
                                Book your appointment now
                            </button>
                            <div className="text-white text-sm font-semibold mt-2">{contactNumber}</div>
                        </div>
                        <div className="relative z-10">
                            <Image src="/doctor.webp" alt="Doctor" width={100} height={100} className="rounded-full object-cover border-4 border-white" />
                        </div>
                    </div>
                </div>

                <div className="px-6 py-4 flex-grow">
                    <h2 className="text-xl font-semibold mb-4 text-gray-800">Categories</h2>
                    <div className="flex space-x-3 overflow-x-auto pb-2 scrollbar-hide mb-6">
                        <div className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full flex items-center text-sm whitespace-nowrap">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10m-8-4l8 4m0-10l8-4m-8 4l-8-4" />
                            </svg>
                            {productCategory}
                        </div>
                        <div className="bg-gray-100 text-gray-700 px-4 py-2 rounded-full flex items-center text-sm whitespace-nowrap">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10m-8-4l8 4m0-10l8-4m-8 4l-8-4" />
                            </svg>
                            Suppliments
                        </div>
                        <div className="bg-gray-100 text-gray-700 px-4 py-2 rounded-full flex items-center text-sm whitespace-nowrap">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10m-8-4l8 4m0-10l8-4m-8 4l-8-4" />
                            </svg>
                            Bal
                        </div>
                    </div>

                    <h2 className="text-xl font-semibold mb-4 text-gray-800">Popular Products</h2>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-white rounded-lg shadow-sm p-3 border border-gray-200">
                            <div className="w-full h-24 flex items-center justify-center bg-gray-50 rounded-md mb-2 overflow-hidden">
                                <Image src={mainProductImage} alt="Product" width={80} height={80} className="object-contain" />
                            </div>
                            <div className="text-sm font-semibold text-gray-700 mb-1">[{productData.pageUrl || "Category"}]</div> {/* Using pageUrl for category */}
                            <div className="text-base font-bold text-gray-900 mb-1">{productData.heading || "[name]"}</div>
                            <div className="text-xs text-gray-500 mb-2">{productData.description || "[Description]"}</div>
                            <div className="text-lg font-bold text-gray-900">{productData.password ? `$${productData.password}` : "Price"}</div> {/* Using password for price */}
                        </div>
                        <div className="bg-white rounded-lg shadow-sm p-3 border border-gray-200">
                            <div className="w-full h-24 flex items-center justify-center bg-gray-50 rounded-md mb-2 overflow-hidden">
                                <Image src="/placeholder-medicine-2.webp" alt="Product" width={80} height={80} className="object-contain" />
                            </div>
                            <div className="text-sm font-semibold text-gray-700 mb-1">[Category]</div>
                            <div className="text-base font-bold text-gray-900 mb-1">[name]</div>
                            <div className="text-xs text-gray-500 mb-2">[Description]</div>
                            <div className="text-lg font-bold text-gray-900">Price</div>
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
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 0a2 2 0 11-4 0 2 2 0 014 0z"/></svg>
                        <span className="text-xs mt-1">Orders</span>
                    </div>
                    <div className="flex flex-col items-center text-gray-500">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                        <span className="text-xs mt-1">Medications</span>
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

export default ProductTemplateFour;