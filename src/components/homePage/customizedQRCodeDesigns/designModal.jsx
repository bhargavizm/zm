"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import QRShapes from "./designTabs/qrShapes/qrshapes";
import Stickers from "./designTabs/stickers/stickers";
import Colors from "./designTabs/colors/colors";
import Shapes from "./designTabs/shapes/shapes";
import Logos from "./designTabs/logos/logos";
import AnimatedButton from "@/components/animatedButton/animatedButton";
import { FaLongArrowAltDown } from "react-icons/fa";
import PreviewPanel from "./previewPanel";
import useDesignContext from "@/components/hooks/useDesignContext";
import ImageToQR from "./designTabs/ImageToQR";

const tabs = ["QR Shapes", "Stickers", "Colors", "Shapes", "Logos", "Personalised Image"];

const DesignModal = ({ setIsModalOpen, activeTab, setActiveTab }) => {
  const { setSelectedQRShape, setSelectedLogo, setSelectedSticker } =
    useDesignContext();

  useEffect(() => {
    const savedShape = localStorage.getItem("selectedQRShape");
    const savedLogo = localStorage.getItem("selectedLogo");
    const savedSticker = localStorage.getItem("selectedSticker");
    if (savedShape) setSelectedQRShape(savedShape);
    if (savedLogo) setSelectedLogo(savedLogo);
    if (savedSticker) setSelectedSticker(savedSticker);
  }, []);

  const handleImageSelect = (imagePath) => {
    if (imagePath.includes("qrshapes")) {
      setSelectedQRShape(imagePath);
      localStorage.setItem("selectedQRShape", imagePath);
    } else if (imagePath.includes("stickers")) {
      setSelectedSticker(imagePath);
      localStorage.setItem("selectedSticker", imagePath);
    } else {
      setSelectedLogo(imagePath);
      localStorage.setItem("selectedLogo", imagePath);
    }
  };

  const tabComponents = {
    "QR Shapes": () => <QRShapes onSelectImage={handleImageSelect} />,
    Stickers: () => <Stickers onSelectImage={handleImageSelect} />,
    Colors: () => <Colors onSelectImage={handleImageSelect} />,
    Shapes: () => <Shapes onSelectImage={handleImageSelect} />,
    Logos: () => <Logos onSelectImage={handleImageSelect} />,
    "Create QR Using Image": () => <ImageToQR  />,
  };

  const ActiveComponent = tabComponents[activeTab];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-md bg-black/30 px-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-6xl h-[95vh] relative px-6 py-6 o overflow-y-auto scrollbar-hide">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-darkGreen">
            Customize QR Code
          </h2>
          <button
            className="text-xl cursor-pointer font-bold"
            onClick={() => setIsModalOpen(false)}
            aria-label="Close modal"
          >
            &#10005;
          </button>
        </div>
        <hr className="border-slate-300 mb-2" />

        {/* Modal Tabs */}
        <div className="flex flex-wrap gap-4 mb-4">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 text-md rounded-xl cursor-pointer ${
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

        {/* Modal Body */}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">

          {/* Tab content */}
          <div className="w-full col-span-6 lg:col-span-7 overflow-y-auto px-4 py-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <ActiveComponent />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Preview Panel */}
          <div className="col-span-6 lg:col-span-5 rounded-xl border border-slate-100 shadow-lg p-4 pb-9 flex  flex-col ">

              <PreviewPanel />
              <div className="pt-9 ">
                <AnimatedButton className="mx-auto flex justify-center gap-2">
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


