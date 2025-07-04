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
import toast from "react-hot-toast";
import axios from "axios";
import { setURLServices } from "@/redux/slices/urlServicesSlice";
import { useDispatch } from "react-redux";

const tabs = [
  "QR Shapes",
  "Stickers",
  "Colors",
  "QR Frames",
  "Logos",
  "Personalized Image",
];

const DecorateQRCode = () => {
  const { slug } = useParams();
  const [url, setUrl] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [basicInfoOpen, setBasicInfoOpen] = useState(true);
  const [passwordOpen, setPasswordOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [activeTab, setActiveTab] = useState("QR Shapes");

  const [showModal, setShowModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const dispatch = useDispatch();

  const handleClick = () => setShowModal(true);
  const handleSubmit = async () => {
    if (!url.trim()) {
      toast.error("URL is required!");
      return;
    }

    try {
      setIsLoading(true);

      const res = await axios.post(`/api/services/${slug}`, {
        url,
        password,
      });

      if (res.data.success) {
        dispatch(setURLServices(res.data.URLServicesData));
        toast.success(res.data.message || "Data submitted successfully");
        setUrl("");
        setPassword("");
      } else {
        toast.error(res.data.error || "Failed to submit data");
      }
    } catch (error) {
      const errorMessage =
        error?.response?.data?.error || "Something went wrong";
      toast.error(errorMessage);
      console.error("❌ Submit error:", errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

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

            {/* Basic Information Accordion */}
            <div className="max-w-full sm:max-w-xl mx-auto mt-6">
              <button
                onClick={() => setBasicInfoOpen(!basicInfoOpen)}
                className="w-full px-4 py-3 text-left bg-[#35aeae] flex justify-between items-center cursor-pointer rounded-md"
              >
                <span className="font-bold text-white text-base sm:text-lg">
                  Enter an URL
                </span>
                <svg
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
                </svg>
              </button>

              {basicInfoOpen && (
                <>
                  <div className="px-4 py-4 bg-white text-gray-700 border border-gray-200 rounded-b-md">
                    <label className="block text-sm font-semibold pb-2">
                      Website or Page URL :
                    </label>
                    <input
                      required
                      type="url"
                      value={url}
                      onChange={(e) => setUrl(e.target.value)}
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
                    
                    type={showPassword ? "text" : "password"}
                    className="w-full border border-gray-300 rounded-md px-4 py-2 pr-10"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <div
                    className="absolute top-1/2 right-4 transform -translate-y-1/2 text-gray-500 cursor-pointer px-6"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <AiFillEye size={20} />
                    ) : (
                      <AiFillEyeInvisible size={20} />
                    )}
                  </div>
                </div>
              )}
            </div>

            <div
              // onClick={handleClick}
              className="mt-8 max-w-xl mx-auto flex justify-center items-center"
            >
              <button
                onClick={() => setShowConfirmModal(true)}
                disabled={isLoading}
                className="px-6 py-2 cursor-pointer text-xl text-white font-bold rounded-lg flex justify-center items-center transition-effects gap-2 bg-[linear-gradient(to_right,#008080,#001a1a)]"
              >
                submit
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
          </div>

          {/* Preview Panel and Modal Tabs */}
          {/* <div className="col-span-12 lg:col-span-5 bg-white rounded-3xl shadow-lg px-6 py-9 mt-6 lg:mt-0"> */}
          <div className="cursor-pointer col-span-12 lg:col-span-5 bg-white rounded-3xl shadow-lg px-6 py-9 mt-0 ">
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

            <hr className="mb-4 border border-slate-200" />

            <div className=" flex justify-center items-center gap-2 py-4">
              <button className="px-6 py-2 cursor-pointer text-xl text-white font-bold rounded-lg flex justify-center items-center gap-2 bg-[linear-gradient(to_right,#008080,#001a1a)] transition-effects">
                Download <FaLongArrowAltDown />
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
      {showConfirmModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-md bg-black/30">
          <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-xl border border-teal-200 mx-4 sm:mx-auto">
            <h3 className="text-2xl sm:text-3xl font-semibold text-mainGreen mb-6">
              Confirm Submission
            </h3>

            <div className="space-y-4 md:text-xl text-lg text-gray-800 mb-8">
              {/* URL Row */}
              <div className="flex flex-col sm:flex-row sm:items-start sm:gap-3">
                <div className="font-semibold min-w-fit">URL:</div>
                <div className="break-words overflow-hidden">
                  <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 underline break-all"
                  >
                    {url}
                  </a>
                </div>
              </div>

              {/* Password Row */}
              <div className="flex flex-col sm:flex-row sm:items-start sm:gap-3">
                <div className="font-semibold min-w-fit">Password:</div>
                <div>
                  {password || (
                    <span className="italic text-gray-500">
                      No password set
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setShowConfirmModal(false)}
                className="px-4 py-2 cursor-pointer bg-gray-300 text-gray-800 rounded hover:bg-gray-400 transition"
              >
                Back
              </button>
              <button
                onClick={async () => {
                  await handleSubmit();
                  setShowConfirmModal(false);
                }}
                className="px-4 py-2 cursor-pointer bg-teal-700 text-white rounded hover:bg-teal-800 transition"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DecorateQRCode;
