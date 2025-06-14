"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { FiSearch } from "react-icons/fi";

const ServicesPage = () => {
  const [services, setServices] = useState([]);
  const [filteredServices, setFilteredServices] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [expanded, setExpanded] = useState({});

  useEffect(() => {
    import("../data/services.jsx")
      .then((module) => {
        const data = module.default;
        if (Array.isArray(data)) {
          setServices(data);
          setFilteredServices(data);
        } else {
          console.error("services.jsx did not return an array.");
        }
      })
      .catch((err) => {
        console.error("Error loading services.jsx:", err);
      });
  }, []);

  useEffect(() => {
    const query = searchQuery.toLowerCase();
    const filtered = services.filter(
      (service) =>
        service.serviceName.toLowerCase().includes(query) ||
        service.description.toLowerCase().includes(query)
    );
    setFilteredServices(filtered);
  }, [searchQuery, services]);

  const toggleExpand = (slug) => {
    setExpanded((prev) => ({
      ...prev,
      [slug]: !prev[slug],
    }));
  };

  return (
    <div className="py-12 bg-[rgb(0,128,128)]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 ">
        {/* Search Bar */}
        <div className="mb-10 flex justify-end pt-20">
          <div className="relative w-full max-w-sm transition-all duration-300 group shadow-2xl">
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-mainGreen text-lg pointer-events-none group-focus-within:text-mainGreen" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search services..."
              className="w-full pl-12 pr-4 py-3 rounded-lg bg-white text-darkGreen font-bold placeholder:text-teal-800 border border-white/20 focus:outline-none focus:ring-2 focus:ring-teal-300 focus:border-teal-900 shadow-md"
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

                {/* Description with Read More */}
                <div>
                  <p
                    className={`text-xs text-gray-600 transition-all duration-300 ${
                      expanded[service.slug] ? "" : "line-clamp-3"
                    }`}
                  >
                    {service.description}
                  </p>
                  <div className="text-right">
                  {service.description.length > 100 && (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault(); // Prevents Link navigation
                        toggleExpand(service.slug);
                      }}
                      className="text-xs  text-teal-600 my-2 underline"
                    >
                      {expanded[service.slug] ? "Show less" : "Read more"}
                    </button>
                  )}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

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