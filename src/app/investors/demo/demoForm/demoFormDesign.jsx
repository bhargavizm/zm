'use client';

import Image from "next/image";
import React from "react";

const DemoFormDesign = () => {
  return (
    <>
      <section className="p-6 pt-14 flex justify-center items-center flex-col">
        <h2 className="text-xl text-center font-bold mb-4 leading-snug text-white py-4 pb-9">
          Book a personalized demo tailored to your use case with one of our QR
          code experts.
        </h2>

        <Image
          src="/images/normal/customerCare2.png"
          alt="imag"
          width={250}
          height={200}
          className="rounded mx-auto mb-6"
        />
   

        <hr className="my-6 w-full border-mainGreen" />

      </section>
    </>
  );
};

export default DemoFormDesign;
