
'use client';

import React from "react";
import DesignSection from "./designSection";
import DecorateQRCode from "./decorateQRCode";

const CustomizeQRCode = () => {
  return (
    <>
      <section className="bg-mainGreen lg:0px-40 pt-30 pb-20">
        <div className="bg-[#35aeae] rounded-3xl mx-auto max-w-6xl shadow-2xl pb-20">
          <DesignSection />
          <DecorateQRCode/>
        </div>
      </section>
    </>
  );
};

export default CustomizeQRCode;
