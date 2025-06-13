"use client";
import React from "react";
import Accordion from "./accordion";
import Image from "next/image";
import { useLanguage } from '@/context/languageContext/LanguageContext';

const Security = () => {
  const { dictionary } = useLanguage();
  return (
    <>
      <section className="bg-mainGreen padding-lr py-20">
      {/*  <h2 className="text-white text-center font-bold text-4xl mb-6 ">
          Experience Superior Security with ZM QR Code Services
        </h2> */}
        <h2 className="text-white text-center font-bold text-4xl mb-6 ">
          {dictionary.security.heading}
        </h2>

        {/* <h4 className="mb-5 text-center text-lg text-slate-400 pb-4">
          Your peace of mind matters: we ensure data protection is integrated at
          every level of our system.
        </h4> */}
        <h4 className="mb-5 text-center text-lg text-slate-400 pb-4">
          {dictionary.security.subheading}
        </h4>

        <div className="grid gap-6 grid-cols-1 lg:grid-cols-2 items-start">
          <Accordion />

          <div className=" flex items-center justify-center flex-col gap-9 pt-9">
            <Image
              src="/logos/logo.webp"
              alt="logo"
              width={170}
              height={100}
              priority
              className="animate-bounce w-full max-w-xs h-auto rounded-lg"
            />
            <Image
              src="/images/home/certificates.webp"
              alt="Security Image"
              width={300} // reduced from 400
              height={300} // reduced from 400
              className="w-full max-w-md h-auto rounded-lg" // max-w-sm (~384px) for better control
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default Security;
