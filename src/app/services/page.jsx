"use client";

import React, { useEffect, useState } from "react";

const ServicesPage = () => {
    const [services, setServices] = useState([]);

    useEffect(() => {
        import("../data/services.jsx")
            .then((module) => {
                const data = module.default;
                if (Array.isArray(data)) {
                    setServices(data);
                } else {
                    console.error("services.jsx did not return an array.");
                }
            })
            .catch((err) => {
                console.error("Error loading services.jsx:", err);
            });
    }, []);

    return (
        <div className="py-12 bg-[#9af6f6]">
            <div className="max-w-7xl mx-auto px-4 py-20 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 ">
                    {services.map((service, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-xl shadow-lg transition duration-200 overflow-hidden  p-6  hover:-translate-y-1 cursor-pointer"
                        >
                            <div className="flex items-start mb-3 ">
                                <span className="text-2xl text-teal-600 mr-2">{service.icon}</span>
                                <h2 className="text-xl font-bold text-gray-900">{service.serviceName}</h2>
                            </div>

                            {/* Image + QR Group */}
                            {service.image && (
                                <div className="flex justify-end items-center space-x-4 mb-4">
                                    <img
                                        src={service.image}
                                        alt={service.serviceName}
                                        className="w-64 h-64 object-contain"
                                    />
                                </div>
                            )}

                            {/* Description */}
                            <p className="text-sm text-gray-600">{service.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ServicesPage;