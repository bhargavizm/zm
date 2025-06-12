"use client";

import Image from "next/image";
import React from "react";

const CreateLogo = () => {
  return (
    <>
      <section className="bg-white padding-lr py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-8">
            <h2 className="text-mainGreen font-bold text-4xl mb-3 ">
              Create Branded QR Codes with Your Logo
            </h2>

            <h4 className="mb-5 weight text-slate-500">
              Attract, Impress, and Convert with ZM QR Code Services
            </h4>

            <p className="text-md">
              ZM QR Code Services lets you design QR codes featuring your
              brand’s logo, enhancing recognition and improving customer
              interaction. Seamlessly aligned with your visual identity, our
              custom QR codes stand out in both digital formats and printed
              materials, giving your marketing a unique and professional flair.
            </p>

            <p className="text-md my-6">
              Our user-friendly platform enables you to produce top-quality,
              highly customizable QR codes that are both attractive and
              functional. Whether you're linking to your homepage, product
              listings, social channels, or special promotions, ZM QR Code
              Services turns each QR code into a strategic marketing asset.
              Enjoy advanced design flexibility, comprehensive engagement
              analytics, and high-resolution output for smooth scanning across
              all devices.
            </p>

            <p className="text-md">
              With ZM QR Code Services, every scan opens up opportunities —
              helping you connect with your audience, strengthen your brand, and
              drive conversions effectively.
            </p>
          </div>
          {/* <div className="lg:col-span-4 ">
           <Image src='/images/qr-code.jpg' alt="create-branded-logo" fill   className="max-w-full h-auto"/>
          </div> */}
           <div className="lg:col-span-4">
          <div className="relative w-full h-64 md:h-80 lg:h-96">
            <Image
              src="/images/brand-logo.jpg"
              alt="create-branded-logo"
              width={400}
height={400}
              className="object-contain"
              //sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 400px"
              priority
            />
          </div>
        </div>
        </div>
      </section>
    </>
  );
};

export default CreateLogo;
