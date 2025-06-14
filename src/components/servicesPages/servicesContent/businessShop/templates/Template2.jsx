// src/components/templates/Template2.jsx
import React from 'react';

const Template2 = ({ data }) => {
  if (!data) return null; // Ensure data is provided

  return (
    <div className="relative w-full h-auto bg-white rounded-xl overflow-hidden shadow-lg border border-gray-100 pb-4">
      {/* Background image area */}
      <div
        className="relative bg-gray-200 h-40 bg-cover bg-center flex items-start justify-between p-4"
        style={{ backgroundImage: `url('https://via.placeholder.com/400x160/EEEEEE/333333?text=Shop+Interior')`, backgroundSize: 'cover', backgroundPosition: 'center' }} // Placeholder
      >
        <div className="bg-white p-2 rounded-full shadow-md flex items-center space-x-2 text-gray-700 text-sm font-semibold">
          {/* Placeholder for logo icon - replace with actual icon if desired */}
          <span className="text-xl">⚪</span> {/* Or <YourIconComponent /> */}
          <span>{data.logoText || 'GIGGLING PLATYPUS'}</span>
        </div>
      </div>

      <div className="text-center px-4 -mt-8 relative z-10">
        <h3 className="text-4xl font-extrabold text-gray-900 mb-2 leading-none">
          {data.mainHeading || "WE'RE OPEN"}
        </h3>
        <p className="text-lg font-semibold text-gray-700 mb-4">
          {data.subHeading || "TUESDAY TO SUNDAY"}
        </p>

        <div className="bg-gray-800 text-white rounded-xl px-6 py-3 inline-block shadow-md mb-4">
          <span className="text-2xl font-bold tracking-wide">{data.timeRange || "12 AM - 10 PM"}</span>
        </div>

        <p className="text-base text-gray-600 mb-6">{data.closedDay || "CLOSED MONDAY"}</p>

        <div className="border-t border-b border-gray-200 py-4 mb-4 space-y-1">
          {/* Placeholder for house icon - replace with actual icon if desired */}
          <img src="https://via.placeholder.com/24x24/CCCCCC/333333?text=🏠" alt="address" className="w-6 h-6 mx-auto mb-2" />
          <p className="text-sm text-gray-700">{data.addressLine1 || "123 Anywhere St., Any City, ST 12345"}</p>
          <p className="text-sm text-gray-700">{data.addressLine2 || "123 Anywhere St., Any City"}</p>
        </div>

        <div className="flex items-center justify-center text-sm text-blue-600 hover:underline">
          {/* Placeholder for website icon - replace with actual icon if desired */}
          <img src="https://via.placeholder.com/16x16/CCCCCC/333333?text=🌐" alt="website" className="w-4 h-4 mr-1" />
          <a href={`https://${data.website}`} target="_blank" rel="noopener noreferrer">
            {data.website || "www.reallygreatsite.com"}
          </a>
        </div>
      </div>
    </div>
  );
};

export default Template2;