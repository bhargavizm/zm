// 'use client';

// import React, { useEffect, useState } from 'react';

// const ServicesPage = () => {
//     const [services, setServices] = useState([]);

//     useEffect(() => {
//         import('../data/services.jsx')
//             .then((module) => {
//                 const data = module.default;
//                 if (Array.isArray(data)) {
//                     setServices(data);
//                 } else {
//                     console.error('services.jsx did not return an array.');
//                 }
//             })
//             .catch((err) => {
//                 console.error('Error loading services.jsx:', err);
//             });
//     }, []);

//     return (
//         <div className="py-16 bg-green-400">
//             <div className=" mx-auto px-4 sm:px-6 lg:px-28">
//                 {/* Cards */}
//                 <div className="grid grid-cols-1 my-2 sm:grid-cols-2 lg:grid-cols-3 gap-8 py-12">
//                     {services.map((service, index) => (
//                         <div
//                             key={index}
//                             className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 cursor-pointer "
//                         >
//                             <div className="p-6 flex-1 flex flex-col">
//                                 {/* Header + Image */}
//                                 <div className="flex justify-between items-start mb-3">
//                                     <div className="flex flex-col z-10">
//                                         <span className="text-3xl text-[#028989] mb-1">{service.icon}</span>
//                                         <h2 className="text-lg font-bold text-gray-900 leading-snug">
//                                             {service.serviceName}
//                                         </h2>
//                                     </div>

//                                     {/* Bigger Image */}
//                                     {service.image && (
//                                         <div className="ml-4 -mt-4 -mr-4" style={{ width: '1000%' }}>
//                                             <div className="bg-gray-50 rounded-bl-xl rounded-tr-xl p-3  flex items-center justify-center">
//                                                 <img
//                                                     src={service.image}
//                                                     alt={service.serviceName}
//                                                     className="object-contain w-full h-full"
//                                                     style={{
//                                                         maxHeight: '200px',
//                                                         mixBlendMode: 'multiply',
//                                                         filter: 'contrast(1.1)',
//                                                     }}
//                                                 />
//                                             </div>
//                                         </div>
//                                     )}
//                                 </div>

//                                 {/* Smaller Text Description */}
//                                 <div className="mb-4 flex-grow pt-1">
//                                     <p className="text-sm text-gray-600 leading-tight">
//                                         {service.description}
//                                     </p>
//                                 </div>

//                                 {/* QR Section */}
//                                 {service.qrLabel && (
//                                     <div className="mt-auto pt-4 border-t border-gray-100">
//                                         <div className="flex justify-between items-center">
//                                             <div>
//                                                 <p className="text-xs font-medium text-gray-500 mb-1">Scan for details</p>
//                                                 <p className="text-xs text-gray-400">Quick access to resources</p>
//                                             </div>
//                                             <img
//                                                 src={service.qrLabel}
//                                                 alt="Scan Me"
//                                                 className="h-16 w-16 object-contain p-1 rounded-lg bg-gray-50 border border-gray-200"
//                                             />
//                                         </div>
//                                     </div>
//                                 )}
//                             </div>
//                         </div>
//                     ))}
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default ServicesPage;



"use client";

import Link from "next/link.js";
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
    <div className="py-12 bg-green-400">
      <div className="max-w-7xl mx-auto px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 ">
          {services.map((service, index) => (
              <Link key={index} href={`/services/${service.slug}`}>
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

                  {service.qrLabel && (
                    <div className="text-center">
                      <img
                        src={service.qrLabel}
                        alt="QR Code"
                        className="w-16 h-16 mx-auto"
                      />
                      <p className="text-xs text-gray-500 mt-1 font-medium">SCAN ME!</p>
                    </div>
                  )}
                </div>
              )}

              {/* Description */}
              <p className="text-sm text-gray-600">{service.description}</p>
            </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ServicesPage;
