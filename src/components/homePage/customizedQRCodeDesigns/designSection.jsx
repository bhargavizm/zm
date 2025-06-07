"use client";

import React from "react";

import DecorateQRCode from "./decorateQRCode";

const DesignSection = () => {


  return (
    <>
      <section className="bg-mainGreen lg:px-40 pt-30 pb-20">
        <div className="bg-green-50 rounded-3xl mx-auto max-w-6xl shadow-2xl pb-20">
          <div className=" px-9 py-8 ">
            <p>
            services icons and names
            </p>
          </div>

          <DecorateQRCode/>
        </div>


      </section>
    </>
  );
};

export default DesignSection;
