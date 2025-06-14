// src/components/templates/Template1.jsx
import React from 'react';

const Template1 = ({ data }) => {
  // Ensure data exists, otherwise return null (or a placeholder)
  if (!data) return null;

  // Use nullish coalescing operator (?? []) to ensure 'days' is always an array
  // If data.days is null or undefined, it will default to an empty array.
  const daysToRender = data.days ?? [];

  return (
    <div
      className="relative w-full h-auto bg-cover bg-center rounded-xl overflow-hidden shadow-lg p-6 flex flex-col items-center justify-center text-white text-center"
      style={{ backgroundImage: `url('https://via.placeholder.com/400x600/333333/FFFFFF?text=Background+Image+Here')`, minHeight: '300px', backgroundSize: 'cover', backgroundPosition: 'center' }}
    >
      {/* Overlay to make text readable */}
      <div className="absolute inset-0 bg-black opacity-40 z-0"></div>

      <div className="relative z-10 flex justify-between w-full px-2 text-xs font-medium mb-4">
        <button className="bg-white bg-opacity-20 backdrop-filter backdrop-blur-sm px-3 py-1 rounded-full text-black">{data.aboutUsLink || 'about us'}</button>
        <span className="bg-white bg-opacity-20 backdrop-filter backdrop-blur-sm px-3 py-1 rounded-full text-black">{data.siteLink || '@reallygreatsite'}</span>
      </div>

      <h3 className="relative z-10 text-4xl font-serif italic mb-6 leading-tight" style={{ fontFamily: 'Georgia, serif' }}>
        {data.title || 'Opening Hours'}
      </h3>

      <div className="relative z-10 w-full space-y-3">
        {/* Use the safely destructured daysToRender */}
        {daysToRender.map((dayData, index) => (
          <div key={index} className="flex justify-between items-center text-sm bg-[#222424] bg-opacity-15 backdrop-filter backdrop-blur-sm rounded-full px-5 py-2.5 text-white font-medium">
            <span className="flex-1 text-left">{dayData.day || 'DAY'}</span>
            <span className="text-right">{dayData.time || 'TIME'}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Template1;