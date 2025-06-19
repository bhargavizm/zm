
'use client';

import React from "react";
import DesignSection from "./designSection";
import DecorateQRCode from "./decorateQRCode";
import OfferScrolling from "../offerScrolling";

const CustomizeQRCode = () => {
  return (
    <>
      <section className="bg-mainGreen lg:px-40 px-2  pt-30 pb-20">
        <div className="bg-[#35aeae] rounded-3xl mx-auto max-w-7xl shadow-2xl pb-20 px-2">
          <DesignSection />
          <OfferScrolling />
          <DecorateQRCode/>
        </div>
      </section>
    </>
  );
};

export default CustomizeQRCode;
