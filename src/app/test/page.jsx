import React from "react";

const BackgroundVideo = () => {
  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Video Background */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
      >
        <source src="/videos/vecteezy_visual-representation-of-cloud-computing-technology-with_51092811.mov" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Overlay Content */}
      <div className="relative z-10 flex flex-col justify-center items-center h-full text-center px-4 bg-black/50">
        <h1 className="text-white text-4xl md:text-5xl font-bold">
          Welcome to ZM QR Code Services
        </h1>
        <p className="text-white text-lg md:text-xl mt-4">
          Scan | Store | Connect | Grow
        </p>
        <button className="mt-6 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-full text-lg transition">
          Get Started
        </button>
      </div>
    </div>
  );
};

export default BackgroundVideo;
