"use client";

import Image from "next/image";
import React, { useState } from "react";
import DemoForm from "./demoForm/demoForm";
import { useLanguage } from '@/context/languageContext/LanguageContext';
import { useRouter } from "next/navigation";
import Link from "next/link";


const ScheduleDemo = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { dictionary } = useLanguage();
  const router = useRouter()

  const heading = dictionary?.demo?.heading || "Schedule a personalized demo with our QR experts.";
  const buttonText = dictionary?.demo?.button || "Schedule a Demo";

  return (
    <>
      <section
        className="relative overflow-hidden w-full text-white bg-scroll-contained bg-cover bg-center"
        style={{
          backgroundImage: "url('/images/home/bg-demo-image.png')",
        }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 items-center justify-center gap-8 bg-[rgba(0,128,128,0.6)] padding-lr py-10 text-center lg:text-left ">
          {/* Image Column */}
          <div className="col-span-12 lg:col-span-2 flex justify-center">
            <Image
              src="/images/home/demo.webp"
              alt="QR Demo"
              width={250}
              height={250}
              className="rounded-full"
            />
          </div>

          {/* Text + Button Column */}
          <div className="col-span-12 lg:col-span-6 flex flex-col items-center lg:items-start justify-center gap-4">
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold leading-snug text-white px-6">
              {heading}
            </h2>
            <Link href='/contactUs'
             // onClick={() => router.push('/contactUs')}
              className="px-6 py-2 text-xl text-white font-bold rounded-lg flex justify-center items-center gap-2 bg-[linear-gradient(to_right,#008080,#001a1a)] mx-6 cursor-pointer"
            >
              {buttonText}
            </Link>
          </div>
        </div>
      </section>

      {isOpen && <DemoForm onClose={() => setIsOpen(false)} />}
    </>
  );
};

export default ScheduleDemo;
