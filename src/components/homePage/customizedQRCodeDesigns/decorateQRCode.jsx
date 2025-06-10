import React, { useState } from "react";
import DesignModal from "./designModal";
import { IoIosArrowForward } from "react-icons/io";
import { FaLongArrowAltDown } from "react-icons/fa";
import AnimatedButton from "@/components/animatedButton/animatedButton";
import PreviewPanel from "./previewPanel";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

const tabs = ["Stickers", "Colors", "Shapes", "Logos"];

const DecorateQRCode = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [activeTab, setActiveTab] = useState("QR Shapes");
  return (
    <>
      <section>
        <div className="grid grid-cols-12 gap-4 mx-4 sm:mx-6 md:mx-9">
          <div className="col-span-12 lg:col-span-7 bg-white px-4 sm:px-6 lg:px-6 py-8 sm:py-10 rounded-3xl shadow-lg">
            <h2 className="text-darkGreen font-bold text-xl sm:text-2xl mb-4">
              QR Code Generator With Logo
            </h2>

            <hr className="my-2 border-gray-300" />

            {/* 1st Accordion */}

            <div className="max-w-full sm:max-w-xl mx-auto mt-6">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full px-4 sm:px-6 py-3 sm:py-4 text-left bg-[#35aeae] focus:outline-none flex justify-between items-center cursor-pointer rounded-md"
              >
                <span className="font-bold text-white text-base sm:text-lg">
                  Service Name
                </span>
                <svg
                  className={`w-5 h-5 text-white transform transition-transform duration-300 ${
                    isOpen ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              {isOpen && (
                <div className="px-4 sm:px-6 py-4 bg-white text-gray-700 border border-gray-200 rounded-b-md">
                  <div className="pb-5 relative">
                    <input
                      required
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      autoComplete="off"
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent pr-10"
                      placeholder="service name"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* 2st Accordion */}

            <div className="max-w-full sm:max-w-xl mx-auto mt-6">
              <div className="w-full px-4 sm:px-6 py-3 sm:py-4 text-left bg-[#35aeae] flex justify-between items-center rounded-t-md">
                <span className="font-bold text-white text-base sm:text-lg">
                  Basic Information
                </span>
              </div>
              <div className="px-4 sm:px-6 py-4 bg-white text-gray-700 border border-gray-200 rounded-b-md">
                <div className="pb-5">
                  <label
                    htmlFor="lastName"
                    className="block text-sm font-semibold text-gray-700 pb-2"
                  >
                    Website or Page URL :
                  </label>
                  <input
                    required
                    id="lastName"
                    name="lastName"
                    type="text"
                    autoComplete="off"
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent"
                    placeholder="https://yourSite.com"
                  />
                </div>
              </div>
            </div>

            {/* 3st Accordion */}
            <div className="max-w-full sm:max-w-xl mx-auto mt-6">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full px-4 sm:px-6 py-3 sm:py-4 text-left bg-[#35aeae] focus:outline-none flex justify-between items-center cursor-pointer rounded-md"
              >
                <span className="font-bold text-white text-base sm:text-lg">
                  Password
                </span>
                <svg
                  className={`w-5 h-5 text-white transform transition-transform duration-300 ${
                    isOpen ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              {isOpen && (
                <div className="px-4 sm:px-6 py-4 bg-white text-gray-700 border border-gray-200 rounded-b-md">
                  <div className="pb-5 relative">
                    <input
                      required
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      autoComplete="off"
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent pr-10"
                      placeholder="Password"
                    />
                    <div
                      className="absolute top-1/3 right-3 transform -translate-y-1/2 text-gray-500 cursor-pointer"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <AiFillEyeInvisible size={20} />
                      ) : (
                        <AiFillEye size={20} />
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* 3nd Accordion - opens modal */}
            <div className="max-w-full sm:max-w-xl mx-auto mt-6">
              <button
                onClick={() => setIsModalOpen(true)}
                className="w-full px-4 sm:px-6 py-3 sm:py-4 text-left bg-[#35aeae] focus:outline-none flex justify-between items-center cursor-pointer rounded-md"
              >
                <span className="font-bold text-base sm:text-lg text-white">
                  Customize QR Code
                </span>
                <svg
                  className="w-5 h-5 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
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

            <div className="mt-8 max-w-xl mx-auto flex justify-center items-center">
              <AnimatedButton className=" flex justify-center items-center gap-2">
                Save QR Code <IoIosArrowForward />
              </AnimatedButton>
            </div>
          </div>

          {/* Preview Panel */}
          <div className="col-span-12 lg:col-span-5 bg-white rounded-3xl shadow-lg px-6 py-9 mt-6 lg:mt-0">
            <PreviewPanel />

            <hr className="my-6 border border-slate-200" />

            <div className="flex justify-center flex-wrap mb-4">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => {
                    setActiveTab(tab); // set clicked tab as active
                    setIsModalOpen(true); // open modal
                  }}
                  className={`px-2 py-2 cursor-pointer text-mainGreen hover:text-darkGreen hover:font-bold transition-effects  text-lg rounded-xl transition-all duration-300
                 
              
              `}
                >
                  {tab}
                </button>
              ))}
            </div>

            <AnimatedButton className="w-full flex justify-center items-center gap-2">
              Download Large Files <FaLongArrowAltDown />
            </AnimatedButton>
          </div>
        </div>
      </section>

      {/* Modal */}
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
