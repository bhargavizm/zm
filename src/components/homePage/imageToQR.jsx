// "use client";

// import React from "react";
// import Image from "next/image";
// import { useLanguage } from '@/context/languageContext/LanguageContext';

// const ImageToQR = () => {
//     const { dictionary } = useLanguage();
//   return (
//     <section
//       style={{
//         backgroundImage:
//           "conic-gradient(from 18deg at right, #3BDEDE 22%, #0F5353 98%)",
//       }}
//       className="py-20 padding-lr  min-h-screen flex flex-col items-center justify-center"
//     >
//       {/* <h2 className="text-white text-4xl font-bold mb-6">Image to QR Code</h2> */}
//       <h2 className="text-white text-4xl font-bold mb-6">{dictionary.imageQR.heading}</h2>
//       {/* <p className="text-slate-400 text-lg text-center">
//         Turn your logo into a QR Code that grabs attention! In just about 5
//         minutes, you’ll master the process and create stunning QR Codes that
//         even professionals would admire.
//       </p> */}
//       <p className="text-slate-400 text-lg text-center">
//         {dictionary.imageQR.paragraph}
//       </p>

//       <div className="grid grid-cols-1 md:grid-cols-12 gap-6 pb-6">
//   {/* Main large image */}
//   <div className="md:col-span-8">
//     <Image
//       src="/images/home/image-qr.png"
//       alt="Main QR Code"
//       width={1000}
//       height={1000}
//       className="lg:max-w-[700px]  h-auto rounded-lg object-contain"
//     />
//   </div>

//   {/* Side image */}
//   <div className="md:col-span-4">
//     <Image
//       src="/images/home/image-qr-1.png"
//       alt="Secondary QR Code"
//       width={500}
//       height={500}
//       className="lg:max-w-[400px] h-auto rounded-lg object-contain"
//     />
//   </div>
// </div>


//       <div className="grid lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-2 pt-6 sm-grid-cols-2  gap-16">
//         <div>
//           <Image
//             src="/images/home/image-qr-2.png"
//             alt="Image to QR Code"
//             width={700} // increased from 500
//             height={700}
//             className="max-w-[200px] h-auto rounded-lg shadow-lg border-8 border-amber-700 border-double"
//           />
//         </div>

//         <div className="animated-border-wrapper">
//           <div className="animated-border-inner">
//             <Image
//               src="/images/home/image-qr-3.png"
//               alt="Image to QR Code"
//               width={200}
//               height={200}
//               className="rounded-full shadow-lg"
//             />
//           </div>
//         </div>

//         <div className="animated-border">
//           <div className="animated-border-inner">
//             <Image
//               src="/images/home/image-qr-4.png"
//               alt="Image to QR Code"
//               width={200}
//               height={200}
//               className="rounded-full shadow-lg"
//             />
//           </div>
//         </div>

//         <div className="animated-borders">
//           <div className="animated-border-outer">
//             <Image
//               src="/images/home/scan.png"
//               alt="Image to QR Code"
//               width={200}
//               height={200}
//               className="rounded-xl shadow-lg"
//             />
//           </div>
//         </div>

//         <div>
//           <Image
//             src="/images/home/image-qr-5.png"
//             alt="Image to QR Code"
//             width={700} // increased from 500
//             height={700}
//             className="max-w-[200px] h-auto rounded-lg shadow-lg  border-8 animated"
//           />
//         </div>
//       </div>
//     </section>
//   );
// };

// export default ImageToQR;
"use client";

import React from "react";
import Image from "next/image";
import { useLanguage } from '@/context/languageContext/LanguageContext';

const ImageToQR = () => {
  const { dictionary } = useLanguage();

  return (
    <section
      style={{
        backgroundImage:
          "conic-gradient(from 18deg at right, #3BDEDE 22%, #0F5353 98%)",
      }}
      className="py-20 px-4 sm:px-8 lg:px-16 min-h-screen flex flex-col items-center justify-center"
    >
      <h2 className="text-white text-3xl sm:text-4xl font-bold mb-4 text-center">
        {dictionary.imageQR.heading}
      </h2>
      <p className="text-slate-200 text-base sm:text-lg text-center max-w-2xl mb-10">
        {dictionary.imageQR.paragraph}
      </p>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 w-full max-w-7xl">
        <div className="md:col-span-8 flex justify-center">
          <Image
            src="/images/home/image-qr.png"
            alt="Main QR Code"
            width={1000}
            height={1000}
            className="w-full max-w-[700px] h-auto rounded-lg object-contain"
          />
        </div>
        <div className="md:col-span-4 flex justify-center">
          <Image
            src="/images/home/image-qr-1.png"
            alt="Secondary QR Code"
            width={500}
            height={500}
            className="w-full max-w-[400px] h-auto rounded-lg object-contain"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-8 mt-12 w-full max-w-6xl">
        {/* Pulse glow */}
        <div className="flex justify-center items-center">
          <div className="relative">
            <div className="absolute -inset-2 rounded-lg bg-amber-700 blur-lg opacity-75 animate-pulse"></div>
            <Image
              src="/images/home/image-qr-2.png"
              alt="Image to QR Code"
              width={200}
              height={200}
              className="relative rounded-lg shadow-lg border-4 border-amber-700"
            />
          </div>
        </div>

        {/* Floating tiles */}
        <div className="flex justify-center items-center">
          <div className="relative floating-tiles-animation rounded-xl">
            <Image
              src="/images/home/image-qr-3.png"
              alt="Floating QR"
              width={200}
              height={200}
              className="rounded-xl shadow-lg relative z-10"
            />
            <div className="absolute inset-0 rounded-xl border-4 border-amber-700 opacity-0 floating-tile-1"></div>
            <div className="absolute inset-0 rounded-xl border-4 border-yellow-500 opacity-0 floating-tile-2"></div>
            <div className="absolute inset-0 rounded-xl border-4 border-amber-700 opacity-0 floating-tile-3"></div>
          </div>
        </div>

        {/* Gentle pulse */}
        <div className="flex justify-center items-center animate-pulse-gentle">
          <Image
            src="/images/home/image-qr-4.png"
            alt="Pulsing QR"
            width={200}
            height={200}
            className="rounded-xl shadow-lg"
          />
        </div>

        {/* Bounce animation */}
        <div className="flex justify-center items-center">
          <div className="animate-bounce-slow">
            <Image
              src="/images/home/scan.png"
              alt="Bounce QR"
              width={200}
              height={200}
              className="rounded-xl shadow-lg"
            />
          </div>
        </div>

        {/* Gradient border */}
        <div className="flex justify-center items-center">
          <div className="p-1 rounded-lg bg-gradient-to-r from-amber-700 via-yellow-500 to-amber-700 bg-size-200 animate-gradient-border">
            <Image
              src="/images/home/image-qr-5.png"
              alt="Gradient QR"
              width={200}
              height={200}
              className="rounded-lg shadow-lg"
            />
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes spin-slow {
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }

        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
        .animate-bounce-slow {
          animation: bounce-slow 3s ease-in-out infinite;
        }

        @keyframes gradient-border {
          0% { background-position: 0% 50%; }
          100% { background-position: 200% 50%; }
        }
        .animate-gradient-border {
          background-size: 200% auto;
          animation: gradient-border 3s linear infinite;
        }

        @keyframes pulse-gentle {
          0%, 100% {
            transform: scale(1);
            box-shadow: 0 0 0 0 rgba(251, 191, 36, 0.7);
          }
          50% {
            transform: scale(1.03);
            box-shadow: 0 0 0 10px rgba(251, 191, 36, 0);
          }
        }
        .animate-pulse-gentle {
          animation: pulse-gentle 3s ease-in-out infinite;
        }

        @keyframes float-tile {
          0%, 100% {
            opacity: 0;
            transform: translate(0, 0) scale(1);
          }
          25% {
            opacity: 1;
            transform: translate(-8px, -8px) scale(1.05);
          }
          50% {
            opacity: 0.7;
            transform: translate(8px, 8px) scale(1.1);
          }
          75% {
            opacity: 0.4;
            transform: translate(0, 0) scale(1.05);
          }
        }
        .floating-tile-1 {
          animation: float-tile 4s ease-in-out infinite 0.3s;
        }
        .floating-tile-2 {
          animation: float-tile 4s ease-in-out infinite 0.6s;
        }
        .floating-tile-3 {
          animation: float-tile 4s ease-in-out infinite 0.9s;
        }
      `}</style>
    </section>
  );
};

export default ImageToQR;
