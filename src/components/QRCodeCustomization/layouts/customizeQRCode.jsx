
'use client';

import React from "react";
import DesignSection from "./designSection";
import DecorateQRCode from "./decorateQRCode";


const CustomizeQRCode = () => {
  return (
    <>
      <section className="bg-mainGreen xl:px-40 px-4  pt-30 pb-20">
        <div className="bg-[#35aeae] rounded-3xl mx-auto max-w-7xl shadow-2xl pb-20">
          <DesignSection />
          <DecorateQRCode/>
        </div>
      </section>
    </>
  );
};

export default CustomizeQRCode;
