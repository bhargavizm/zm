import React, { useState } from "react";
import DesignModal from "./designModal";
import { FaLongArrowAltDown } from "react-icons/fa";
import PreviewPanel from "../previewTab/previewPanel";
import URLServices from "@/components/servicesPages/tabsContent/servicesContent/urlServices/urlServices";

const tabs = [
  "QR Shapes",
  "Stickers",
  "Colors",
  "QR Frames",
  "Logos",
  "Personalized Image",
];

const DecorateQRCode = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
 
  const [activeTab, setActiveTab] = useState("QR Shapes");

  
  const [showModal, setShowModal] = useState(false);

  return (
    <>
    

      <section>
        <div className="grid grid-cols-12 gap-4 mx-4 sm:mx-6 md:mx-9">
          {/* <div className="col-span-12 lg:col-span-7 bg-white px-4 sm:px-6 py-8 rounded-3xl shadow-lg"> */}
          <div className=" col-span-12 lg:col-span-7 bg-white px-4 sm:px-6 py-8 rounded-3xl shadow-lg">
            {/* url services form */}

            <URLServices setIsModalOpen={setIsModalOpen}/>

            {/* Customize QR Button */}
            <div className="max-w-full sm:max-w-xl mx-auto mt-6">
              <button
                onClick={() => setIsModalOpen(true)}
                className="w-full px-4 py-3 text-left bg-[#35aeae] flex justify-between items-center cursor-pointer rounded-md"
              >
                <span className="font-bold text-white text-base sm:text-lg">
                  Customize QR Code
                </span>
                <svg
                  className="w-5 h-5 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>
          </div>

          {/* Preview Panel and Modal Tabs */}
          {/* <div className="col-span-12 lg:col-span-5 bg-white rounded-3xl shadow-lg px-6 py-9 mt-6 lg:mt-0"> */}
          <div className="cursor-pointer col-span-12 lg:col-span-5 bg-white rounded-3xl shadow-lg  py-9 mt-0 ">
            <div className="flex justify-center">
              <PreviewPanel />
            </div>

            <hr className="my-2 border border-slate-200" />
            <div className="flex justify-center items-center gap-3 flex-wrap ">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => {
                    setActiveTab(tab);
                    setIsModalOpen(true);
                  }}
                  className=" py-2 text-mainGreen hover:text-darkGreen hover:font-bold transition-all text-lg rounded-xl cursor-pointer"
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* <hr className="mb-4 border border-slate-200" />

            <div className=" flex justify-center items-center gap-2 py-4">
              <button className="px-6 py-2 cursor-pointer text-xl text-white font-bold rounded-lg flex justify-center items-center gap-2 bg-[linear-gradient(to_right,#008080,#001a1a)] transition-effects">
                Download <FaLongArrowAltDown />
              </button>
            </div> */}
          </div>
        </div>
      </section>

      {/* Design Modal */}
      {isModalOpen && (
        <DesignModal
          setIsModalOpen={setIsModalOpen}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
      )}

    </>
  );
};

export default DecorateQRCode;
