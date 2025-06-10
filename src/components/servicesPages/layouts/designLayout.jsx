"use client";
import React, { useState } from "react";
import PreviewPanel from "@/components/homePage/customizedQRCodeDesigns/previewPanel";
import QRCodeTab from "../servicesContent/qrcodeTabs/qrcodeTab";
import { IoEyeOutline } from "react-icons/io5";
import { MdQrCodeScanner } from "react-icons/md";
import AnimatedButton from "@/components/animatedButton/animatedButton";
import { FaLongArrowAltDown } from "react-icons/fa";

const tabs = ["Content", "QR Code"];

const DesignLayout = ({ ContentTabComponent, PreviewTabComponent }) => {
  const [activeTab, setActiveTab] = useState("Content");
  const [activePreview, setActivePreview] = useState("eye");

  return (
    <section className="pt-8">
      <div className="grid grid-cols-12 gap-4 mx-4 sm:mx-6 md:mx-9">
        {/* Left Panel */}
        <div className="col-span-12 lg:col-span-7 bg-white rounded-3xl shadow-lg">
          {/* <h1 className="text-2xl font-bold py-4 px-6">
            Service Configuration
          </h1> */}

          {/* Tabs */}
          <div className="flex gap-6 justify-center bg-[#58b8b8] mt-9 shadow-lg py-2 mb-4">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 text-xl rounded-xl cursor-pointer ${
                  activeTab === tab
                    ? "bg-white text-mainGreen font-bold"
                    : "text-darkGreen"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="px-6 pb-6 min-h-[500px]">
            {activeTab === "Content" && <ContentTabComponent />}

            {activeTab === "QR Code" && <QRCodeTab />}
          </div>
        </div>

        {/* Right Preview Panel */}
        <div className="col-span-12 lg:col-span-5 bg-white rounded-3xl shadow-lg py-8  lg:mt-0">
          <div className="flex gap-4 px-4 mb-4 bg-[#58b8b8] shadow-lg py-2 mt- ">
            <div
              onClick={() => setActivePreview("scan")}
              className={`p-3 rounded-full cursor-pointer ${
                activePreview === "scan"
                  ? "bg-white text-green-600 shadow-md"
                  : "text-gray-600 hover:bg-white hover:text-green-600"
              }`}
            >
              <MdQrCodeScanner size={24} />
            </div>
            <div
              onClick={() => setActivePreview("eye")}
              className={`p-3 rounded-full cursor-pointer ${
                activePreview === "eye"
                  ? "bg-white text-mainGreen shadow-md"
                  : "text-gray-600 hover:bg-white hover:text-green-600"
              }`}
            >
              <IoEyeOutline size={24} />
            </div>
          </div>

          <div className="px-4">
            {activePreview === "scan" && (
              <>
                <PreviewPanel />

                <AnimatedButton className="w-full flex justify-center items-center gap-2">
                  Download Large Files <FaLongArrowAltDown />
                </AnimatedButton>
              </>
            )}
            {activePreview === "eye" && (
              <div className="flex justify-center items-center p-4 rounded-xl">
               
                  {/* Top Notch */}
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-5 bg-black rounded-b-2xl z-10"></div>

                  {/* Content Area */}
                  <div className="flex-1 w-full px-4 pt-8 pb-6 overflow-auto">
                    <PreviewTabComponent />
                  </div>
                </div>
           
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default DesignLayout;
