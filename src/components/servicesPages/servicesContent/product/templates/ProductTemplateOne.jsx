"use client";
import React from "react";
import Image from "next/image";
import useServicesContext from "@/components/hooks/useServiceContext";

const ProductTemplateOne = () => {
    const { productData, productImage } = useServicesContext();

    // Mapping productData to elements in temp1.webp (Real Estate App)
    const propertyName = productData.heading || "Pear House";
    const propertyLocation = productData.description || "Cartagena, Colombia";
    const price = productData.phone ? `$${productData.phone}` : "$1150"; // Using phone for price, very loose mapping
    const imageUrl = productImage || "/placeholder-house.webp"; // Placeholder if no image

    return (
        <div className="relative w-full max-w-sm mx-auto bg-black rounded-3xl overflow-hidden shadow-2xl phone-frame">
            <div className="relative bg-gradient-to-br from-purple-800 to-purple-600 p-4">
                <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center bg-white bg-opacity-20 rounded-full px-3 py-1 text-white text-sm">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                        Buscar
                    </div>
                    <div className="bg-white bg-opacity-20 rounded-lg p-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </div>
                </div>
                <div className="text-white text-lg mb-2">Hola, Byron Canga</div>
                <div className="text-white font-bold text-2xl mb-6">Qué estás buscando ?</div>

                <div className="flex space-x-3 justify-center mb-6">
                    <div className="bg-orange-500 rounded-lg p-4 text-center w-1/3 flex flex-col items-center">
                        <Image src="/icons/bed.svg" alt="Rent House" width={40} height={40} className="mb-2" />
                        <div className="text-white text-sm">Rentar Casa</div>
                    </div>
                    <div className="bg-orange-500 rounded-lg p-4 text-center w-1/3 flex flex-col items-center">
                        <Image src="/icons/building.svg" alt="Apartamentos" width={40} height={40} className="mb-2" />
                        <div className="text-white text-sm">Apartamentos</div>
                    </div>
                    <div className="bg-orange-500 rounded-lg p-4 text-center w-1/3 flex flex-col items-center">
                        <Image src="/icons/couch.svg" alt="Compartido" width={40} height={40} className="mb-2" />
                        <div className="text-white text-sm">Compartido</div>
                    </div>
                </div>
            </div>

            <div className="bg-gray-100 p-4 min-h-[400px]">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-semibold text-gray-800">Justo para ti</h2>
                    <span className="text-sm text-gray-500">Ver más</span>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white rounded-lg shadow-md overflow-hidden">
                        <div className="relative">
                            <Image src={imageUrl} alt="Property" width={200} height={150} className="w-full h-36 object-cover" />
                            <div className="absolute top-2 left-2 bg-yellow-500 text-white text-xs px-2 py-1 rounded-md flex items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="currentColor" viewBox="0 0 24 24"><path d="M12 .587l3.642 7.377 8.128 1.18-5.88 5.733 1.39 8.093L12 18.895l-7.28 3.83 1.39-8.093-5.88-5.733 8.128-1.18L12 .587z"/></svg>
                                4.5
                            </div>
                            <div className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-sm">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/></svg>
                            </div>
                        </div>
                        <div className="p-3">
                            <h3 className="font-semibold text-gray-900 text-base mb-1">{propertyName}</h3>
                            <div className="flex items-center text-gray-500 text-xs mb-2">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5s2.5 1.12 2.5 2.5S13.38 11.5 12 11.5z"/></svg>
                                {propertyLocation}
                            </div>
                            <div className="text-right text-lg font-bold text-gray-900 mb-2">{price}</div>
                            <div className="flex justify-around text-gray-600 text-xs mt-2">
                                <div className="flex items-center">
                                    <Image src="/icons/bed.svg" alt="Bedrooms" width={16} height={16} className="mr-1" />
                                    3 habitaciones
                                </div>
                                <div className="flex items-center">
                                    <Image src="/icons/wifi.svg" alt="Wifi" width={16} height={16} className="mr-1" />
                                    Wifi
                                </div>
                                <div className="flex items-center">
                                    <Image src="/icons/garage.svg" alt="Garage" width={16} height={16} className="mr-1" />
                                    Garage
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Placeholder for second item if productData.pageUrl existed, for example */}
                    <div className="bg-white rounded-lg shadow-md overflow-hidden">
                        <div className="relative">
                            <Image src="/placeholder-house-2.webp" alt="Property" width={200} height={150} className="w-full h-36 object-cover" />
                            <div className="absolute top-2 left-2 bg-yellow-500 text-white text-xs px-2 py-1 rounded-md flex items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="currentColor" viewBox="0 0 24 24"><path d="M12 .587l3.642 7.377 8.128 1.18-5.88 5.733 1.39 8.093L12 18.895l-7.28 3.83 1.39-8.093-5.88-5.733 8.128-1.18L12 .587z"/></svg>
                                4.7
                            </div>
                        </div>
                        <div className="p-3">
                            <h3 className="font-semibold text-gray-900 text-base mb-1">Doral</h3>
                            <div className="flex items-center text-gray-500 text-xs mb-2">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5s2.5 1.12 2.5 2.5S13.38 11.5 12 11.5z"/></svg>
                                Quito, Ecuador
                            </div>
                            <div className="flex justify-around text-gray-600 text-xs mt-2">
                                <div className="flex items-center">
                                    <Image src="/icons/bed.svg" alt="Bedrooms" width={16} height={16} className="mr-1" />
                                    4 habitaciones
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <h2 className="text-lg font-semibold text-gray-800 mt-6 mb-4">Populares</h2>
                <div className="bg-white rounded-lg shadow-md overflow-hidden flex items-center p-3">
                    <Image src="/placeholder-house-3.webp" alt="Plaza Sol" width={80} height={80} className="rounded-lg object-cover mr-3" />
                    <div className="flex-grow">
                        <h3 className="font-semibold text-gray-900 text-base mb-1">Plaza Sol</h3>
                        <div className="flex items-center text-gray-500 text-xs mb-1">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5s2.5 1.12 2.5 2.5S13.38 11.5 12 11.5z"/></svg>
                            Santo Domingo, Ecuador
                        </div>
                        <div className="font-bold text-gray-900 text-lg">{productData.email ? `$${productData.email}` : "$980"}</div> {/* Using email for price */}
                        <div className="flex text-gray-600 text-xs mt-1">
                            <div className="flex items-center mr-3">
                                <Image src="/icons/bed.svg" alt="Bedrooms" width={14} height={14} className="mr-1" />
                                2 Habitaciones
                            </div>
                            <div className="flex items-center mr-3">
                                <Image src="/icons/wifi.svg" alt="Wifi" width={14} height={14} className="mr-1" />
                                Wifi
                            </div>
                            <div className="flex items-center">
                                <Image src="/icons/garage.svg" alt="Garage" width={14} height={14} className="mr-1" />
                                Garage
                            </div>
                        </div>
                    </div>
                    <div className="bg-white rounded-full p-1 shadow-sm self-start">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/></svg>
                    </div>
                </div>
            </div>

            {/* Bottom Navigation */}
            <div className="absolute bottom-0 w-full bg-white border-t border-gray-200 py-3 px-6 flex justify-around items-center">
                <div className="flex flex-col items-center text-teal-600">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-4.418 0-8 3.582-8 8s3.582 8 8 8 8-3.582 8-8-3.582-8-8-8zm0 14c-3.313 0-6-2.687-6-6s2.687-6 6-6 6 2.687 6 6-2.687 6-6 6z"/></svg>
                    <span className="text-xs mt-1">Home</span>
                </div>
                <div className="flex flex-col items-center text-gray-500">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5s2.5 1.12 2.5 2.5S13.38 11.5 12 11.5z"/></svg>
                    <span className="text-xs mt-1">Map</span>
                </div>
                <div className="flex flex-col items-center text-gray-500">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l-10 10h20l-10-10zm-1 16h2v-8h-2v8zm-2 0h2v-8h-2v8zm4 0h2v-8h-2v8z"/></svg>
                    <span className="text-xs mt-1">Saved</span>
                </div>
                <div className="flex flex-col items-center text-gray-500">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2c-4.418 0-8 3.582-8 8s3.582 8 8 8 8-3.582 8-8-3.582-8-8-8zm0 14c-3.313 0-6-2.687-6-6s2.687-6 6-6 6 2.687 6 6-2.687 6-6 6z"/></svg>
                    <span className="text-xs mt-1">Profile</span>
                </div>
            </div>
        </div>
    );
};

export default ProductTemplateOne;