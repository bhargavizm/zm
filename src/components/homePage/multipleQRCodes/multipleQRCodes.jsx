"use client";

import React, { useState } from "react";
import MultipleQRCodesData from "./multipleQRCodesData";
import AnimatedButton from "@/components/animatedButton/animatedButton";

const MultipleQRCodes = () => {
  const [activeTab, setActiveTab] = useState(MultipleQRCodesData[0].id);

  const activeData = MultipleQRCodesData.find((tab) => tab.id === activeTab);
  return (
    <>
      <section className="bg-darkGreen padding-lr py-16">
        <h2 className="text-white text-center text-4xl font-bold mb-6">
          One Platform; Endless QR Code Applications
        </h2>
        <p className="text-slate-400 text-center text-md mb-2">
          Generate and manage multiple QR codes for different purposes, all in
          one place.
        </p>
        <p className="text-slate-400 text-center text-md">
          Get customized QR code solutions for your unique business needs—all in
          one place. Visit our QR Code Solutions page to learn more.
        </p>

        <div className="max-w-6xl mx-auto mt-10">
          {/* Tab buttons */}
          <div className="flex border-b border-gray-300 pb-4 overflow-x-auto scrollbar-hide">
            {MultipleQRCodesData.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;

              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-4 text-xl px-4 py-2 font-medium whitespace-nowrap border-b-2 cursor-pointer ${
                    isActive
                      ? "border-skyBlue text-white font-bold"
                      : "border-transparent text-mainGreen"
                  }`}
                >
                  <Icon />
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Content */}
          <div className="px-14 py-10 border  text-white rounded-2xl">
            {activeData && (
              <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-6 items-center">
                <img
                  src={activeData.scan}
                  alt="Image 2"
                  className="w-1/2 rounded shadow"
                />
                {/* <img src={...} className="w-full h-auto rounded shadow mb-4" /> */}

                <img
                  src={activeData.image}
                  alt="Image 1"
                  className="w-1/2 rounded shadow"
                />
                <div className="justify-center">
                  <h2 className="text-xl font-bold">{activeData.heading}</h2>
                  <p className="text-white">{activeData.paragraph}</p>
                  <AnimatedButton className="">
                    {activeData.buttonText}
                  </AnimatedButton>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default MultipleQRCodes;
