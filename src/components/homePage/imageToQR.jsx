
"use client";

import React from "react";
import Image from "next/image";


const ImageToQR = () => {
  return (
    <section
      style={{
        backgroundImage:
          "conic-gradient(from 18deg at right, #3BDEDE 22%, #0F5353 98%)",
      }}
      className="py-20 padding-lr  min-h-screen flex flex-col items-center justify-center"
    >
      <h2 className="text-white text-4xl font-bold mb-6">Image to QR Code</h2>
      <p className="text-slate-400 text-lg text-center">
        Turn your logo into a QR Code that grabs attention! In just about 5
        minutes, you’ll master the process and create stunning QR Codes that
        even professionals would admire.
      </p>
      {/* <div className="flex  gap-6 pb-6 items-center">
        <div className="lg:col-span-4">
          <Image
            src="/images/image-qr.png"
            alt="Image to QR Code"
            width={900} // increased from 700
            height={900} // keep aspect ratio similar
            className="max-w-[800px] h-auto rounded-lg "
          />
        </div>
        <div className="lg:col-span-3">
          <Image
            src="/images/image-qr-1.png"
            alt="Image to QR Code"
            width={700} // increased from 500
            height={700}
            className="max-w-[450px] h-auto rounded-lg"
          />
        </div>
      </div> */}

      <div className="flex flex-col lg:flex-row gap-6 pb-6 items-center justify-center">
  <div className="flex-1 max-w-full lg:max-w-[800px]">
    <Image
      src="/images/image-qr.png"
      alt="Image to QR Code"
      width={900}
      height={900}
      className="w-full h-auto rounded-lg"
    />
  </div>
  <div className="flex-1 max-w-full lg:max-w-[450px]">
    <Image
      src="/images/image-qr-1.png"
      alt="Image to QR Code"
      width={700}
      height={700}
      className="w-full h-auto rounded-lg"
    />
  </div>
</div>


      <div className="grid lg:grid-cols-5 md:grid-cols-3 pt-6 sm-grid-cols-2  gap-16">
        <div>
          <Image
            src="/images/image-qr-2.png"
            alt="Image to QR Code"
            width={700} // increased from 500
            height={700}
            className="max-w-[200px] h-auto rounded-lg shadow-lg border-8 border-amber-700 border-double"
          />
        </div>

        <div className="animated-border-wrapper">
          <div className="animated-border-inner">
            <Image
              src="/images/image-qr-3.png"
              alt="Image to QR Code"
              width={200}
              height={200}
              className="rounded-full shadow-lg"
            />
          </div>
        </div>

        {/* <div>
          <Image
            src="/images/image-qr-3.png"
            alt="Image to QR Code"
            width={700} // increased from 500
            height={700}
            className="max-w-[200px] h-auto rounded-lg shadow-lg"
          />
        </div> */}

                <div className="animated-border">
          <div className="animated-border-inner">
            <Image
              src="/images/image-qr-4.png"
              alt="Image to QR Code"
              width={200}
              height={200}
              className="rounded-full shadow-lg"
            />
          </div>
        </div>

        {/* <div>
          <Image
            src="/images/image-qr-4.png"
            alt="Image to QR Code"
            width={1200} // increased from 900
            height={700} // keep aspect ratio similar
            className="max-w-[200px] h-auto rounded-lg shadow-lg"
          />
        </div> */}

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

        {/* <div>
          <Image
            src="/images/scan.png"
            alt="Image to QR Code"
            width={700} // increased from 500
            height={700}
            className="max-w-[200px] h-auto rounded-lg shadow-lg"
          />
        </div> */}

        {/* <div className="animated-border-wrapper">
          <div className="animated-border-inner">
            <Image
              src="/images/image-qr-5.png"
              alt="Image to QR Code"
              width={200}
              height={200}
              className="rounded-full shadow-lg"
            />
          </div>
        </div> */}

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
