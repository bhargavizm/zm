'use client';

import Image from "next/image";
import React from "react";

const DemoFormDesign = () => {
  return (
    <>
      <section className="p-6 pt-14 flex justify-center items-center flex-col">
        <h2 className="text-xl text-center font-bold mb-4 leading-snug text-darkGreen py-4">
          Book a personalized demo tailored to your use case with one of our QR
          code experts.
        </h2>

        <Image
          src="/images/home/demo-form.webp"
          alt="QR Demo"
          width={150}
          height={150}
          className="rounded- mx-auto mb-6"
        />

        <hr className="my-6 w-full border-mainGreen" />

      </section>
    </>
  );
};

export default DemoFormDesign;
