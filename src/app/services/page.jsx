"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import Image from "next/image"; // Make sure Image is imported

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
    <div className="py-12 bg-[rgb(0,128,128)]">
      <div className="max-w-6xl mx-auto px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <Link key={index} href={`/services/${service.slug}`}>
              {/* Added h-96 for fixed height and overflow-hidden */}
              <div className="bg-white rounded-xl shadow-lg transition duration-200 overflow-hidden p-6 hover:-translate-y-1 cursor-pointer h-85"> {/* Fixed Height Applied Here */}
                <div className="flex items-start mb-3">
                  {/* Ensure service.icon is rendering correctly, potentially requires a span or div */}
                  <span className="text-2xl text-teal-600 mr-2">{service.icon}</span>
                  <h2 className="text-xl font-bold text-gray-900">{service.serviceName}</h2>
                </div>

                {/* Image + QR Section */}
                {(service.image || service.qrLabel) && (
                  <div className="flex justify-between items-center space-x-4 mb-4">
                    {service.image && (
                      <div className="w-full flex justify-center"> {/* Added wrapper for centering */}
                        {/* Using next/image for optimization */}
                        <Image
                          src={service.image}
                          alt={service.serviceName}
                          width={160} // Set appropriate width
                          height={160} // Set appropriate height
                          className="object-contain"
                        />
                      </div>
                    )}
                    {service.qrLabel && (
                      <div className="w-full flex justify-center"> {/* Added wrapper for centering */}
                        {/* Using next/image for optimization */}
                        <Image
                          src={service.qrLabel}
                          alt="QR Code"
                          width={64} // Set appropriate width
                          height={64} // Set appropriate height
                          className="object-contain"
                        />
                      </div>
                    )}
                  </div>
                )}


                {/* Description */}
                <p className="text-xs text-gray-600">
                  {service.description}
                </p>

              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ServicesPage;