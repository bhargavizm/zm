"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { FiSearch } from "react-icons/fi";

const ServicesPage = () => {
  const [services, setServices] = useState([]);
  const [filteredServices, setFilteredServices] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    import("../data/services.jsx")
      .then((module) => {
        const data = module.default;
        if (Array.isArray(data)) {
          setServices(data);
          setFilteredServices(data); // Initially show all
        } else {
          console.error("services.jsx did not return an array.");
        }
      })
      .catch((err) => {
        console.error("Error loading services.jsx:", err);
      });
  }, []);

  // Filter services when search query changes
  useEffect(() => {
    const query = searchQuery.toLowerCase();
    const filtered = services.filter(
      (service) =>
        service.serviceName.toLowerCase().includes(query) ||
        service.description.toLowerCase().includes(query)
    );
    setFilteredServices(filtered);
  }, [searchQuery, services]);

  return (
    <div className="py-12 bg-[rgb(0,128,128)] ">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Search Bar */}

        <div className="mb-10 my-18 flex justify-end ">
          <div className="relative w-full max-w-sm focus-within:max-w-md transition-all duration-300 flex justify-end group shadow-2xl">
            {/* Search Icon */}
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-teal-200 text-lg pointer-events-none transition-colors duration-300 group-focus-within:text-white" />

            {/* Input Field */}
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search services..."
              className="w-full pl-12 pr-4 py-3 rounded-lg bg-teal-700/60 text-white placeholder:text-teal-200 border border-white/20 focus:outline-none focus:ring-2 focus:ring-teal-300 focus:border-teal-300 shadow-md transition-all duration-300"
            />
          </div>
        </div>
        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {filteredServices.map((service, index) => (
            <Link key={index} href={`/services/${service.slug}`}>
              <div className="bg-white rounded-xl shadow-lg transition duration-200 overflow-hidden p-6 hover:-translate-y-1 cursor-pointer h-85">
                <div className="flex items-start mb-3">
                  <span className="text-2xl text-teal-600 mr-2">
                    {service.icon}
                  </span>
                  <h2 className="text-xl font-bold text-gray-900">
                    {service.serviceName}
                  </h2>
                </div>

                {(service.image || service.qrLabel) && (
                  <div className="flex justify-between items-center space-x-4 mb-4">
                    {service.image && (
                      <div className="w-full flex justify-center">
                        <Image
                          src={service.image}
                          alt={service.serviceName}
                          width={160}
                          height={160}
                          className="object-contain"
                        />
                      </div>
                    )}
                    {service.qrLabel && (
                      <div className="w-full flex justify-center">
                        <Image
                          src={service.qrLabel}
                          alt="QR Code"
                          width={64}
                          height={64}
                          className="object-contain"
                        />
                      </div>
                    )}
                  </div>
                )}

                <p className="text-xs text-gray-600">{service.description}</p>
              </div>
            </Link>
          ))}
        </div>

        {/* No Results Message */}
        {filteredServices.length === 0 && (
          <p className="text-center text-white mt-10 text-lg">
            No services found.
          </p>
        )}
      </div>
    </div>
  );
};

export default ServicesPage;
