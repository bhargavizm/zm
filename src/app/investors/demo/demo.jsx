

"use client";

import Image from "next/image";
import React, { useState } from "react";
import DemoForm from "./demoForm/demoForm";

const ScheduleDemo = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <section
        className="relative overflow-hidden w-full text-white bg-scroll-contained bg-cover bg-center"
        style={{
          backgroundImage: "url('/images/home/bg-demo-image.png')",
        }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 items-center gap-8 bg-[rgba(0,128,128,0.6)] padding-lr py-10">
          {/* Image Column */}
          <div className="col-span-12 lg:col-span-2 flex justify-center lg:justify-start">
            <Image
              src="/images/home/demo.webp"
              alt="QR Demo"
              width={250}
              height={250}
              className="rounded-full"
            />
          </div>

          {/* Text + Button Column */}
          <div className="col-span-12 lg:col-span-6 text-center lg:text-left">
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-4 leading-snug text-darkGreen">
              vbkwjlvbkjergiuqervbkjerqgvhnalized demo tailored to your use case with one of our QR code experts.
            </h2>

            <button
              onClick={() => setIsOpen(true)}
              className="w-full max-w-xs mx-auto lg:mx-0px-6 py-2 cursor-pointer text-xl text-white font-bold rounded-lg flex justify-center items-center gap-2 bg-[linear-gradient(to_right,#008080,#001a1a)]"
            >
              Schedule a Demo
            </button>
          </div>
        </div>
      </section>

      {isOpen && <DemoForm onClose={() => setIsOpen(false)} />}
    </>
  );
};

export default ScheduleDemo;
