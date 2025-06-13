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
      className="py-20 padding-lr  min-h-screen flex flex-col items-center justify-center"
    >
      {/* <h2 className="text-white text-4xl font-bold mb-6">Image to QR Code</h2> */}
      <h2 className="text-white text-4xl font-bold mb-6">{dictionary.imageQR.heading}</h2>
      {/* <p className="text-slate-400 text-lg text-center">
        Turn your logo into a QR Code that grabs attention! In just about 5
        minutes, you’ll master the process and create stunning QR Codes that
        even professionals would admire.
      </p> */}
      <p className="text-slate-400 text-lg text-center">
        {dictionary.imageQR.paragraph}
      </p>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 pb-6">
  {/* Main large image */}
  <div className="md:col-span-8">
    <Image
      src="/images/home/image-qr.png"
      alt="Main QR Code"
      width={1000}
      height={1000}
      className="lg:max-w-[700px]  h-auto rounded-lg object-contain"
    />
  </div>

  {/* Side image */}
  <div className="md:col-span-4">
    <Image
      src="/images/home/image-qr-1.png"
      alt="Secondary QR Code"
      width={500}
      height={500}
      className="lg:max-w-[400px] h-auto rounded-lg object-contain"
    />
  </div>
</div>


      <div className="grid lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-2 pt-6 sm-grid-cols-2  gap-16">
        <div>
          <Image
            src="/images/home/image-qr-2.png"
            alt="Image to QR Code"
            width={700} // increased from 500
            height={700}
            className="max-w-[200px] h-auto rounded-lg shadow-lg border-8 border-amber-700 border-double"
          />
        </div>

        <div className="animated-border-wrapper">
          <div className="animated-border-inner">
            <Image
              src="/images/home/image-qr-3.png"
              alt="Image to QR Code"
              width={200}
              height={200}
              className="rounded-full shadow-lg"
            />
          </div>
        </div>

        <div className="animated-border">
          <div className="animated-border-inner">
            <Image
              src="/images/home/image-qr-4.png"
              alt="Image to QR Code"
              width={200}
              height={200}
              className="rounded-full shadow-lg"
            />
          </div>
        </div>

        <div className="animated-borders">
          <div className="animated-border-outer">
            <Image
              src="/images/scan.png"
              alt="Image to QR Code"
              width={200}
              height={200}
              className="rounded-full shadow-lg"
            />
          </div>
        </div>

        <div>
          <Image
            src="/images/image-qr-5.png"
            alt="Image to QR Code"
            width={700} // increased from 500
            height={700}
            className="max-w-[200px] h-auto rounded-lg shadow-lg  border-8 animated"
          />
        </div>
      </div>
    </section>
  );
};

export default ImageToQR;
