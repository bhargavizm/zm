// src/components/templates/Template2.jsx
import React from 'react';

const Template4 = ({ data }) => {
  if (!data) return null;

  return (
    <div className="w-full h-auto rounded-xl overflow-hidden shadow-lg border border-gray-100 relative">
      {/* Background image container */}
      <div 
        className="absolute inset-0 z-0"
         style={{
        backgroundImage: `url('/images/normal/template4Shop.jpg')`,
        minHeight: '300px',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
      ></div>
      
      {/* Content container */}
      <div className="relative z-10 p-4 pb-6">
        {/* Logo area */}
        <div className="relative h-40 flex items-start justify-between">
          <div className="bg-white p-2 rounded-full shadow-md flex items-center space-x-2 text-gray-700 text-sm font-semibold">
            <span className="text-xl">⚪</span>
            <span>{data.logoText || 'GIGGLING PLATYPUS'}</span>
          </div>
        </div>

        {/* Main content */}
        <div className="text-center px-4 -mt-8">
          <h3 className="text-4xl font-extrabold text-white mb-2 leading-none">
            {data.mainHeading || "WE'RE OPEN"}
          </h3>
          <p className="text-lg font-semibold text-gray-700 mb-4 bg-white rounded-2xl">
            {data.subHeading || "TUESDAY TO SUNDAY"}
          </p>

          <div className="bg-gray-800 text-white rounded-xl px-6 py-3 inline-block shadow-md mb-4">
            <span className="text-2xl font-bold tracking-wide">{data.timeRange || "12 AM - 10 PM"}</span>
          </div>

          <p className="text-base text-gray-600 mb-6">{data.closedDay || "CLOSED MONDAY"}</p>

          <div className="border-t border-b border-gray-200 py-4 mb-4 space-y-1 bg-white bg-opacity-70 rounded-lg">
            <p className="w-6 h-6 mx-auto mb-2">🏠</p>
            <p className="text-sm text-gray-700">{data.addressLine1 || "123 Anywhere St., Any City, ST 12345"}</p>
            <p className="text-sm text-gray-700">{data.addressLine2 || "123 Anywhere St., Any City"}</p>
          </div>

          <div className="flex items-center justify-center text-sm text-blue-600 hover:underline">
            <p className="w-4 h-4 mr-1">🌐</p>
            <a href={`https://${data.website}`} target="_blank" rel="noopener noreferrer">
              {data.website || "www.reallygreatsite.com"}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Template4;