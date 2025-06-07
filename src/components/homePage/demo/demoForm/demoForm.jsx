"use client";

import React from "react";
import { IoMdClose } from "react-icons/io";
import DemoFormDesign from "./demoFormDesign";
import DemoFormPage from "./demoFormPage";


const DemoForm = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-md bg-black/30">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-5xl max-h-[90vh] relative flex flex-col">
        <div className="absolute top-4 right-4 z-10">
          <IoMdClose
            onClick={onClose}
            className="text-red-600 text-3xl cursor-pointer"
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2  gap-4">
          <div className=" bg-skyBlue">
            <DemoFormDesign />
          </div>
          <div className="overflow-y-auto scrollbar-hide max-h-[90vh] pr-2">
            <DemoFormPage />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DemoForm;
