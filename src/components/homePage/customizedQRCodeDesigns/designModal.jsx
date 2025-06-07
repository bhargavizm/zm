"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import QRShapes from "./designTabs/qrshapes";
import Stickers from "./designTabs/stickers";
import Colors from "./designTabs/colors";
import Shapes from "./designTabs/shapes";
import Logos from "./designTabs/logos";
import AnimatedButton from "@/components/animatedButton/animatedButton";
import { FaLongArrowAltDown } from "react-icons/fa";


const tabs = ["QR Shapes", "Stickers", "Colors", "Shapes", "Logos"];

const tabComponents = {
  "QR Shapes": QRShapes,
  Stickers: Stickers,
  Colors: Colors,
  Shapes: Shapes,
  Logos: Logos,
};

const DesignModal = ({ setIsModalOpen }) => {
  const [activeTab, setActiveTab] = useState("QR Shapes");
  const ActiveComponent = tabComponents[activeTab];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-md bg-black/30 px-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-6xl h-[90vh] relative px-6 py-6 overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-darkGreen">Customize QR Code</h2>
          <button
            className="text-xl cursor-pointer font-bold"
            onClick={() => setIsModalOpen(false)}
            aria-label="Close modal"
          >
            &#10005;
          </button>
        </div>
        <hr className="border-slate-300 mb-2" />

        {/* Tabs */}
        <div className="flex flex-wrap gap-4 mb-4">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 cursor-pointer text-md rounded-xl transition-all duration-300 ${
                activeTab === tab
                  ? "bg-mainGreen text-white font-bold"
                  : "bg-white text-gray-800"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <hr className="border-slate-300 my-2" />

        {/* Tab Content */}
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-12 md:col-span-7 lg:col-span-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="min-h-[120px]"
              >
                <ActiveComponent />
              </motion.div>
            </AnimatePresence>
          </div>
          
       <div className="col-span-12 md:col-span-5 lg:col-span-4 bg-gray-100 rounded-xl min-h-[120px] p-4">
            <p className="text-gray-500">Preview / Options Panel</p>

              <div className="mt-9">
                <AnimatedButton className="w-full mx-auto">
                 Download Large Files 
                  <FaLongArrowAltDown />
                </AnimatedButton>
              </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default DesignModal;
