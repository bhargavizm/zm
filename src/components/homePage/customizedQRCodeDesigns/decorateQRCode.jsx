import React, { useState } from "react";
import DesignModal from "./designModal";
import { IoIosArrowForward } from "react-icons/io";
import { FaLongArrowAltDown } from "react-icons/fa";
import AnimatedButton from "@/components/animatedButton/animatedButton";
import PreviewPanel from "./previewPanel";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { useParams } from "next/navigation";
import Image from "next/image";

const tabs = ["Stickers", "Colors", "Shapes", "Logos"];

const DecorateQRCode = () => {
  const { slug } = useParams();
  const [serviceOpen, setServiceOpen] = useState(false);
  const [basicInfoOpen, setBasicInfoOpen] = useState(true);
  const [passwordOpen, setPasswordOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [activeTab, setActiveTab] = useState("QR Shapes");
  const [nfcEnabled, setNfcEnabled] = useState(false);
  const [showNfcModal, setShowNfcModal] = useState(false);

  const handleNfcToggle = () => {
    if (!nfcEnabled) {
      setShowNfcModal(true);
    } else {
      setNfcEnabled(false);
    }
  };

  const confirmNfc = () => {
    setNfcEnabled(true);
    setShowNfcModal(false);
  };

  const cancelNfc = () => {
    setShowNfcModal(false);
  };

  return (
    <>
      <section>
        <div className="grid grid-cols-12 gap-4 mx-4 sm:mx-6 md:mx-9">
          <div className="col-span-12 lg:col-span-7 bg-white px-4 sm:px-6 py-8 rounded-3xl shadow-lg">
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

                  {/* NFC Accordion */}
                  <div className="flex items-center gap-4 px-4 mt-2">
                    <span className="text-sm font-medium text-gray-700">
                      NFC
                    </span>
                    <button
                      type="button"
                      onClick={handleNfcToggle}
                      className={`relative inline-flex h-8 w-16 items-center rounded-full transition-colors duration-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#008080] ${
                        nfcEnabled ? "bg-[#008080]" : "bg-gray-300"
                      }`}
                    >
                      <span
                        className={`absolute left-1 top-1 inline-flex h-6 w-6 items-center justify-center rounded-full bg-white shadow-md transition-all duration-300 ${
                          nfcEnabled ? "translate-x-8" : "translate-x-0"
                        }`}
                      >
                        {nfcEnabled ? (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4 text-[#008080]"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                        ) : (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4 text-gray-500"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M6 18L18 6M6 6l12 12"
                            />
                          </svg>
                        )}
                      </span>
                    </button>
                  </div>
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
                    className="w-full border border-gray-300 rounded-md px-3 py-2 pr-10"
                    placeholder="Password"
                  />
                  <div
                    className="absolute top-1/2 right-4 transform -translate-y-1/2 text-gray-500 cursor-pointer"
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

            <div className="mt-8 max-w-xl mx-auto flex justify-center items-center">
              <AnimatedButton className="flex justify-center items-center gap-2">
                Save QR Code <IoIosArrowForward />
              </AnimatedButton>
            </div>
          </div>

          {/* Preview Panel and Modal Tabs */}
          <div className="col-span-12 lg:col-span-5 bg-white rounded-3xl shadow-lg px-6 py-9 mt-6 lg:mt-0">
            <PreviewPanel />
            <hr className="my-2 border border-slate-200" />
            <div className="flex justify-center items-center gap-4 flex-wrap">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => {
                    setActiveTab(tab);
                    setIsModalOpen(true);
                  }}
                  className="px-2 py-2 text-mainGreen hover:text-darkGreen hover:font-bold transition-all text-lg rounded-xl"
                >
                  {tab}
                </button>
              ))}
            </div>

            <hr className="mb-4 border border-slate-200" />

            <div className="flex gap-9 pb-6 justify-center items-center">
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
            </div>

            <AnimatedButton className="w-full flex justify-center items-center gap-2">
              Download Large Files <FaLongArrowAltDown />
            </AnimatedButton>
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

      {/* NFC MODAL CODE */}
      {showNfcModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-md bg-black/30">
          <div className="bg-white rounded-xl shadow-xl p-6 max-w-sm w-full border border-teal-200 relative">
            {/* Close Button */}
            <button
              onClick={cancelNfc}
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 text-xl"
            >
              &times;
            </button>

            <h2 className="text-xl font-bold text-[#008080] mb-2">
              NFC Activated
            </h2>
            <p className="text-sm text-gray-700">
              You're trying to enable <strong>NFC</strong> features.
              <br />
              This is a <strong>premium service</strong>.
              <br />
              <span className="text-[#008080] font-semibold">
                Cost: ₹499/year
              </span>
            </p>

            <div className="flex justify-end mt-5 space-x-3">
              <button
                onClick={cancelNfc}
                className="px-4 py-2 rounded border border-gray-400 text-gray-600 hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={confirmNfc}
                className="px-4 py-2 bg-[#008080] text-white rounded hover:bg-[#006666] transition"
              >
                Accept
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DecorateQRCode;
