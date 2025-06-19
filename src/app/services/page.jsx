"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { FiSearch } from "react-icons/fi";

// Simple LockIcon component (replace with actual icon component)
function LockIcon({ className }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
      />
    </svg>
  );
}

const ServicesPage = () => {
  const [mainServices, setMainServices] = useState([]);
  const [specialServices, setSpecialServices] = useState([]);
  const [filteredMain, setFilteredMain] = useState([]);
  const [filteredSpecial, setFilteredSpecial] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [expanded, setExpanded] = useState({});

  useEffect(() => {
    import("../data/services.jsx")
      .then((module) => {
        const { services, encryptedServices } = module.default;
        setMainServices(services);
        setSpecialServices(encryptedServices);
        setFilteredMain(services);
        setFilteredSpecial(encryptedServices);
      })
      .catch((err) => console.error("Error loading services:", err));
  }, []);

  useEffect(() => {
    const query = searchQuery.toLowerCase();
    setFilteredMain(
      mainServices.filter(
        (s) =>
          s.serviceName.toLowerCase().includes(query) ||
          s.description.toLowerCase().includes(query)
      )
    );
    setFilteredSpecial(
      specialServices.filter(
        (s) =>
          s.serviceName.toLowerCase().includes(query) ||
          s.description.toLowerCase().includes(query)
      )
    );
  }, [searchQuery, mainServices, specialServices]);

  const toggleExpand = (slug) => {
    setExpanded((prev) => ({
      ...prev,
      [slug]: !prev[slug],
    }));
  };

  const renderServices = (services) => (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
      {services.map((service, index) => (
        <Link key={index} href={`/services/${service.slug}`}>
          <div className="bg-white rounded-xl shadow-lg transition duration-200 overflow-hidden p-6 hover:-translate-y-1 cursor-pointer h-85">
            <div className="flex items-start mb-3">
              <span className="text-2xl text-teal-600 mr-2">{service.icon}</span>
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
            <div>
              <p
                className={`text-xs text-gray-600 transition-all duration-300 ${
                  expanded[service.slug] ? "" : "line-clamp-3"
                }`}
              >
                {service.description}
              </p>
              {service.description?.trim().length > 100 && (
                <div className="text-right">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      toggleExpand(service.slug);
                    }}
                    className="text-xs text-teal-600 my-2 underline"
                  >
                    {expanded[service.slug] ? "Show less" : "Read more"}
                  </button>
                </div>
              )}
            </div>
          </div>
        </Link>
      ))}
    </div>
  );

  return (
    <div className="py-12 bg-[rgb(0,128,128)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Search */}
        <div className="mb-10 flex justify-end pt-36 pb-10">
          <div className="relative w-full max-w-sm group shadow-2xl">
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-mainGreen" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search services..."
              className="w-full pl-12 pr-4 py-3 rounded-lg bg-white text-darkGreen font-bold placeholder:text-teal-800 border border-white/20 focus:outline-none focus:ring-2 focus:ring-teal-300 focus:border-teal-900 shadow-md"
            />
          </div>
        </div>

        {/* Encrypted Services - hidden if no match during search */}
        {(searchQuery === "" || filteredSpecial.length > 0) && (
          <div>
            <div className="flex justify-center items-center mt-2">
              <div className="flex items-center justify-center gap- shadow-2xl px-4 py-2 rounded-xl border border-white">
                <Image
                  src="/logos/ZM LOGO.webp"
                  width={50}
                  height={50}
                  alt="Left Logo"
                  className="animate-bounce"
                />
                <h2 className="md:text-3xl text-2xl font-semibold text-white">
                  Encrypted Services
                </h2>
                <Image
                  src="/logos/ZM LOGO.webp"
                  width={50}
                  height={50}
                  alt="Right Logo"
                  className="animate-bounce"
                />
              </div>
            </div>

            <div className="py-6">
              <div className="border-4 lg:px-16 md:px-10 px-6 my-6 rounded-2xl border-double py-9 shadow-3xl border-white">
                {filteredSpecial.length > 0 ? (
                  renderServices(filteredSpecial)
                ) : (
                  <></>
                )}

                <p className="text-white text-center text-2xl animate-bounce px-4 mt-12">
                  🔐 Trust us with your data. It's not just secure — it's encrypted 🔒
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Secured Services */}
        <h2 className="text-3xl text-center py-6 font-semibold text-white">
          Secured Services
        </h2>
        {filteredMain.length > 0 ? (
          renderServices(filteredMain)
        ) : (
          <p className="text-white text-center">No services found.</p>
        )}
      </div>
    </div>
  );
};

export default ServicesPage;
