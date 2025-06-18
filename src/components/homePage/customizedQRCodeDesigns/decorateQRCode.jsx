import React, { useState } from "react";
import DesignModal from "./designModal";
import { IoIosArrowForward } from "react-icons/io";
import { FaLongArrowAltDown } from "react-icons/fa";
import PreviewPanel from "./previewTab/previewPanel";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { useParams } from "next/navigation";
import { RiShapesLine } from "react-icons/ri";
import Image from "next/image";
import { FaArrowRightArrowLeft } from "react-icons/fa6";
import ComingSoonModal from "@/components/modalPopUps/comingSoonModal";
import NFCModal from "@/components/modalPopUps/nfcModal";

const tabs = ["QR Shapes","Stickers", "Colors", "Shapes", "Logos","Personalized Image"];

const DecorateQRCode = () => {
  const { slug } = useParams();
  const [serviceOpen, setServiceOpen] = useState(false);
  const [basicInfoOpen, setBasicInfoOpen] = useState(true);
  const [passwordOpen, setPasswordOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [activeTab, setActiveTab] = useState("QR Shapes");

  const [showModal, setShowModal] = useState(false);

  const handleClick = () => setShowModal(true);

  return (
    <>
      <section>
        <div className="grid grid-cols-12 gap-4 mx-4 sm:mx-6 md:mx-9">
          {/* <div className="col-span-12 lg:col-span-7 bg-white px-4 sm:px-6 py-8 rounded-3xl shadow-lg"> */}
          <div className=" col-span-12 lg:col-span-7 bg-white px-4 sm:px-6 py-8 rounded-3xl shadow-lg">
            <h2 className="text-darkGreen font-bold text-xl sm:text-2xl mb-4">
              {slug
                ? slug
                    .split("-")
                    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                    .join(" ")
                : "Generate QR Code"}
            </h2>
            <hr className="my-2 border-gray-300" />

            {/* Service Name Accordion */}
            {/* <div className="max-w-full sm:max-w-xl mx-auto mt-6">
              <button
                onClick={() => setServiceOpen(!serviceOpen)}
                className="w-full px-4 py-3 text-left bg-[#35aeae] flex justify-between items-center cursor-pointer rounded-md"
              >
                <span className="font-bold text-white text-base sm:text-lg">
                  Service Name
                </span>
                <svg
                  className={`w-5 h-5 text-white transform transition-transform duration-300 ${
                    serviceOpen ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {serviceOpen && (
                <div className="px-4 py-4 bg-white text-gray-700 border border-gray-200 rounded-b-md">
                  <input
                    required
                    type="text"
                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                    placeholder="Service Name"
                  />
                </div>
              )}
            </div> */}

            {/* Basic Information Accordion */}
            <div className="max-w-full sm:max-w-xl mx-auto mt-6">
              <button
                onClick={() => setBasicInfoOpen(!basicInfoOpen)}
                className="w-full px-4 py-3 text-left bg-[#35aeae] flex justify-between items-center cursor-pointer rounded-md"
              >
                <span className="font-bold text-white text-base sm:text-lg">
                  Enter an URL
                </span>
                {/* <svg
                  className={`w-5 h-5 text-white transform transition-transform duration-300 ${
                    basicInfoOpen ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg> */}
              </button>

              {basicInfoOpen && (
                <>
                  <div className="px-4 py-4 bg-white text-gray-700 border border-gray-200 rounded-b-md">
                    <label className="block text-sm font-semibold pb-2">
                      Website or Page URL :
                    </label>
                    <input
                      required
                      type="text"
                      className="w-full border border-gray-300 rounded-md px-3 py-2"
                      placeholder="https://yourSite.com"
                    />
                  </div>

                  <NFCModal />
                </>
              )}
            </div>

            {/* Password Accordion */}
            <div className="max-w-full sm:max-w-xl mx-auto mt-6">
              <button
                onClick={() => setPasswordOpen(!passwordOpen)}
                className="w-full px-4 py-3 text-left bg-[#35aeae] flex justify-between items-center cursor-pointer rounded-md"
              >
                <span className="font-bold text-white text-base sm:text-lg">
                  Password
                </span>
                <svg
                  className={`w-5 h-5 text-white transform transition-transform duration-300 ${
                    passwordOpen ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              {passwordOpen && (
                <div className="px-4 py-4 bg-white text-gray-700 border border-gray-200 rounded-b-md relative">
                  <input
                    required
                    type={showPassword ? "text" : "password"}
                    className="w-full border border-gray-300 rounded-md px-4 py-2 pr-10"
                    placeholder="Password"
                  />
                  <div
                    className="absolute top-1/2 right-4 transform -translate-y-1/2 text-gray-500 cursor-pointer px-6"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <AiFillEyeInvisible size={20} />
                    ) : (
                      <AiFillEye size={20} />
                    )}
                  </div>
                </div>
              )}
            </div>

            <div
              onClick={handleClick}
              className="mt-8 max-w-xl mx-auto flex justify-center items-center"
            >
              <button className="px-6 py-2 cursor-pointer text-xl text-white font-bold rounded-lg flex justify-center items-center transition-effects gap-2 bg-[linear-gradient(to_right,#008080,#001a1a)]">
                Submit 
              </button>
            </div>

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

            <div
              onClick={handleClick}
              className="mt-8 max-w-xl mx-auto flex justify-center items-center"
            >
              <button className="px-6 py-2 cursor-pointer text-xl text-white font-bold rounded-lg flex justify-center transition-effects items-center gap-2 bg-[linear-gradient(to_right,#008080,#001a1a)]">
                Save QR Code <IoIosArrowForward />
              </button>
            </div>
          </div>

          {/* Preview Panel and Modal Tabs */}
          {/* <div className="col-span-12 lg:col-span-5 bg-white rounded-3xl shadow-lg px-6 py-9 mt-6 lg:mt-0"> */}
<<<<<<< HEAD
          <div className=" col-span-12 lg:col-span-5 bg-white rounded-3xl shadow-lg px-6 py-9 mt-0 ">

=======
          <div className="cursor-pointer col-span-12 lg:col-span-5 bg-white rounded-3xl shadow-lg px-6 py-9 mt-0 ">
<div className="flex justify-center">
>>>>>>> d012277da28460bcbff7e6d4fb874d1c6f390f6d
            <PreviewPanel />
</div>

            <hr className="my-2 border border-slate-200" />
            <div className="flex justify-center items-center gap-4 flex-wrap ">
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

            <hr className="mb-4 border border-slate-200" />

            {/* <div className="flex gap-9 pb-6 justify-center flex-wrap items-center">
              <Image
                src="/images/home/shapes-1.webp"
                alt="shapes-1"
                width={75}
                height={75}
                className="cursor-pointer hover:scale-110 transition-transform"
                priority
                onClick={() => {
                  setActiveTab("QR Shapes");
                  setIsModalOpen(true);
                }}
              />

              <Image
                src="/images/home/shapes-2.webp"
                alt="shapes-1"
                width={75}
                height={75}
                className="cursor-pointer hover:scale-110 transition-transform"
                priority
                onClick={() => {
                  setActiveTab("QR Shapes");
                  setIsModalOpen(true);
                }}
              />

              <Image
                src="/images/home/shapes-3.webp"
                alt="shapes-1"
                width={75}
                height={75}
                className="cursor-pointer hover:scale-110 transition-transform"
                priority
                onClick={() => {
                  setActiveTab("QR Shapes");
                  setIsModalOpen(true);
                }}
              />
            </div> */}
            {/* <p
              className="flex justify-center transition-effects items-center gap-2 py-4 text-mainGreen hover:font-bold text-2xl "
              onClick={() => {
                setActiveTab("QR Shapes");
                setIsModalOpen(true);
              }}
            >
              <span>
                <RiShapesLine />
              </span>
              <span>More Designs</span>
              <span>
                <FaArrowRightArrowLeft />
              </span>
            </p> */}

<<<<<<< HEAD
            <div className=" flex justify-center items-center gap-2">
              <button onClick={handleClick} className="px-6 py-2 cursor-pointer text-xl text-white font-bold rounded-lg flex justify-center items-center gap-2 bg-[linear-gradient(to_right,#008080,#001a1a)]">
=======
            <div className=" flex justify-center items-center gap-2 py-4">
              <button onClick={handleClick} className="px-6 py-2 cursor-pointer text-xl text-white font-bold rounded-lg flex justify-center items-center gap-2 bg-[linear-gradient(to_right,#008080,#001a1a)] transition-effects">
>>>>>>> d012277da28460bcbff7e6d4fb874d1c6f390f6d
                Download Large Files <FaLongArrowAltDown />
              </button>
            </div>
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

      {/*  */}
      {showModal && (
        <ComingSoonModal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
        />
      )}
    </>
  );
};

export default DecorateQRCode;