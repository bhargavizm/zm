import React, { useState } from "react";
import DesignModal from "./designModal";
import { IoIosArrowForward } from "react-icons/io";
import { FaLongArrowAltDown } from "react-icons/fa";
import AnimatedButton from "@/components/animatedButton/animatedButton";

const DecorateQRCode = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <>
      <section>
        <div className="grid grid-cols-12 gap-4 mx-4 sm:mx-6 md:mx-9">
          <div className="col-span-12 lg:col-span-8 bg-white px-4 sm:px-6 lg:px-6 py-8 sm:py-10 rounded-3xl shadow-lg">
            <h2 className="text-darkGreen font-bold text-xl sm:text-2xl mb-4">
              QR Code Generator With Logo
            </h2>

            <hr className="my-2 border-gray-300" />

            {/* 1st Accordion */}
            <div className="max-w-full sm:max-w-xl mx-auto mt-6">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full px-4 sm:px-6 py-3 sm:py-4 text-left bg-green-100 focus:outline-none flex justify-between items-center cursor-pointer rounded-md"
              >
                <span className="font-bold text-darkGreen text-base sm:text-lg">
                  Basic Information
                </span>
                <svg
                  className={`w-5 h-5 text-gray-600 transform transition-transform duration-300 ${
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
              )}
            </div>

            {/* 2nd Accordion - opens modal */}
            <div className="max-w-full sm:max-w-xl mx-auto mt-6">
              <button
                onClick={() => setIsModalOpen(true)}
                className="w-full px-4 sm:px-6 py-3 sm:py-4 text-left bg-green-100 focus:outline-none flex justify-between items-center cursor-pointer rounded-md"
              >
                <span className="font-bold text-base sm:text-lg text-darkGreen">
                  Customize, Style, and Design Your QR Code
                </span>
                <svg
                  className="w-5 h-5 text-gray-600"
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

            <div className="mt-8 max-w-xl mx-auto">
              <AnimatedButton className="w-full flex justify-center items-center gap-2">
                Save QR Code <IoIosArrowForward />
              </AnimatedButton>
            </div>
          </div>

          <div className="col-span-12 lg:col-span-4 bg-white rounded-3xl shadow-lg px-6 py-9 mt-6 lg:mt-0">
            <AnimatedButton className="w-full flex justify-center items-center gap-2">
              Download Large Files <FaLongArrowAltDown />
            </AnimatedButton>
          </div>
        </div>
      </section>

      {/* Modal */}
      {isModalOpen && <DesignModal setIsModalOpen={setIsModalOpen} />}
    </>
  );
};

export default DecorateQRCode;
