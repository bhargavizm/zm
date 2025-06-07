"use client";

import Image from "next/image";
import React from "react";

const BulkQRGenerator = () => {
  return (
    <>
      <section className="bg-white padding-lr py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-8">
            <h2 className="text-mainGreen font-bold text-4xl mb-3 ">
              Bulk QR Code Generator
            </h2>

            <h4 className="mb-5 weight text-slate-500">
              The Best Solution for Generating Thousands of QR Codes or
              eBusiness Cards
            </h4>

            <p className="text-md">
              ZM QR Code Services lets you design QR codes featuring your
              brand’s logo, enhancing recognition and improving customer
              interaction. Seamlessly aligned with your visual identity, our
              custom QR codes stand out in both digital formats and printed
              materials, giving your marketing a unique and professional flair.
            </p>

            <p className="text-md my-6">
              Easily create thousands of QR codes or digital business cards in
              minutes with our highly acclaimed Bulk QR Code Generator. Simplify
              your workflow and save valuable time by automating the generation
              of multiple QR codes in one go. Just upload your Excel or CSV
              files, and our system will handle the rest. With our customizable
              QR generator, you can tailor every QR code to reflect your
              brand—modify colors, shapes, and sizes, and even insert your logo
              or images. The outcome Professionally branded, high-resolution QR
              codes that are fully compatible with all devices, including
              iPhones and Android smartphones. Sign up today to unlock the full
              potential of our Bulk QR Code Generator and elevate your brand
              visibility like never before!
            </p>
          </div>
          {/* <div className="lg:col-span-4 ">
           <Image src='/images/qr-code.jpg' alt="create-branded-logo" fill   className="max-w-full h-auto"/>
          </div> */}
          <div className="lg:col-span-4">
            <div className="relative w-full h-64 md:h-80 lg:h-96">
              <Image
                src="/images/image-qr-5.png"
                alt="create-branded-logo"
                fill
                className="object-contain"
                sizes="(max-width: 700px) 100vw, (max-width: 100px) 50vw, 100px"
                priority
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default BulkQRGenerator;
