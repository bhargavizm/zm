'use client'

import Image from 'next/image'

export default function VehicleCard() {
  return (
    <div className="relative w-full min-h-screen flex flex-col items-center justify-center bg-gray-100 overflow-hidden">

      {/* Background Image */}
      <Image
        src="/images/templates/bike.png" // ✅ Corrected path
        alt="Background Bike"
        layout="fill"
        objectFit="cover"
        className="z-0 opacity-50"
      />

      {/* Yellow Bike Overlay */}
      <div className="relative z-10 mt-10">
        <div className="rounded-full bg-yellow-500 p-4 shadow-lg">
          <Image
            src="/yellow-bike.png"
            alt="Yellow Bike"
            width={160}
            height={160}
            className="rounded-full object-contain"
          />
        </div>
      </div>

      {/* Vehicle Details */}
      <div className="relative z-10 mt-6 bg-white/70 p-6 rounded-lg backdrop-blur-md max-w-md w-[90%] shadow-xl text-sm sm:text-base">
        <p><strong>Name:</strong> A.krishna teja</p>
        <p><strong>Vehicle model:</strong> </p>
        <p><strong>Vehicle type:</strong> </p>
        <p><strong>Buy date:</strong> 11-11-1111</p>
        <p><strong>Vehicle description:</strong> </p>
        <p><strong>RC number:</strong> </p>
        <p><strong>Contact Number:</strong> </p>
        <p><strong>Location:</strong> </p>
        <p><strong>Address:</strong> </p>
      </div>

      {/* Driver License */}
      <div className="relative z-10 mt-10 w-[300px] bg-blue-100 rounded-lg shadow-lg p-4 text-center">
        <h2 className="text-blue-600 text-xl font-bold mb-2">DRIVER LICENSE</h2>
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 bg-blue-300 rounded-full"></div>
          <div className="text-left text-sm">
            <p>Name: _________</p>
            <p>DOB: __________</p>
            <p>License No: ___</p>
          </div>
        </div>
      </div>
    </div>
  )
}
