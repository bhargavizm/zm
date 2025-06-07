"use client";

import PreviewPanel from "@/components/homePage/customizedQRCodeDesigns/previewPanel";
import React, { useState } from "react";
import { IoEyeOutline } from "react-icons/io5";
import { MdQrCodeScanner } from "react-icons/md";
import QRCodeTab from "./qrcodeTabs/qrcodeTab";

const tabs = ["Content", "QR Code"];

const DesignLayout = () => {
  const [activeTab, setActiveTab] = useState("Content");
  const [activePreview, setActivePreview] = useState("scan"); // "scan" or "eye"

  return (
    <section>
      <div className="grid grid-cols-12 gap-4 mx-4 sm:mx-6 md:mx-9">
        {/* Left Section */}
        <div className="col-span-12 lg:col-span-8 bg-white rounded-3xl shadow-lg">
          <h1 className="text-2xl font-bold py-4 px-6">Service Name</h1>

          {/* Tabs */}
          <div className="flex flex-wrap gap-6 mb-4 bg-green-100 shadow-lg justify-center items-center py-2 cursor-pointer">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 text-xl rounded-xl ${
                  activeTab === tab
                    ? "bg-mainGreen text-white font-bold"
                    : "text-gray-800"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="px-6 pb-6">
            {activeTab === "Content" && (
              <div className="bg-slate-50 p-4 rounded-xl shadow">
                {/* Replace this with your actual content inputs/components */}
                <p className="text-lg text-gray-700">
                  Here is the Content tab view.
                </p>
              </div>
            )}
            {activeTab === "QR Code" && (
             
                <QRCodeTab/>
              
            )}
          </div>
        </div>

        <div className="col-span-12 lg:col-span-4 bg-white rounded-3xl shadow-lg py-8 mt-6 lg:mt-0">
          {/* Icon Buttons */}
          <div className="flex gap-4 px-4 mb-4 bg-green-100 shadow-lg py-2 mt-8 rounded-xl ">
            {/* Scan Icon */}
            <div
              onClick={() => setActivePreview("scan")}
              className={`p-3 rounded-full cursor-pointer transition-all duration-200 ${
                activePreview === "scan"
                  ? "bg-white text-green-600 shadow-md"
                  : "text-gray-600 hover:bg-white hover:text-green-600"
              }`}
            >
              <MdQrCodeScanner size={24} />
            </div>

            {/* Eye Icon */}
            <div
              onClick={() => setActivePreview("eye")}
              className={`p-3 rounded-full cursor-pointer transition-all duration-200 ${
                activePreview === "eye"
                  ? "bg-white text-green-600 shadow-md"
                  : "text-gray-600 hover:bg-white hover:text-green-600"
              }`}
            >
              <IoEyeOutline size={24} />
            </div>
          </div>

          {/* Conditional Rendering */}
          <div className="px-4">
            {activePreview === "scan" && <PreviewPanel />}
            {activePreview === "eye" && (
              <div className="text-center text-blue-500 font-semibold p-4">
                👁️ Eye preview content (or leave empty)
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default DesignLayout;
