import LoadingSpinner from "@/components/common/spinner";
import useServicesContext from "@/components/hooks/useServiceContext";
import NFCModal from "@/components/modalPopUps/nfcModal";
import { setURLServices } from "@/redux/slices/urlServicesSlice";
import { useParams } from "next/navigation";
import React, { useRef, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import axios from "axios";

const URLServices = ({ setIsModalOpen }) => {
  const dispatch = useDispatch();
  const { slug } = useParams();
  const urlInputRef = useRef(null);

  const { servicesDataLoading, setServicesDataLoading } = useServicesContext();

  const [formData, setFormData] = useState({
    url: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [basicInfoOpen, setBasicInfoOpen] = useState(true);
  const [passwordOpen, setPasswordOpen] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    if (!formData?.url.trim()) {
      toast.error("URL is required!");
      return;
    }

    setServicesDataLoading(true);
    try {
      const res = await axios.post(`/api/services/${slug}`, formData);

      if (res.data.success) {
        dispatch(setURLServices(res.data.URLServicesData));
        toast.success(res.data.message || "Data submitted successfully");
        setIsModalOpen(true);
        setFormData({ url: "", password: "" });
      } else {
        toast.error(res.data.error || "Failed to submit data");
      }
    } catch (error) {
      const errorMessage =
        error?.response?.data?.error || "Something went wrong";
      toast.error(errorMessage);
      console.error("❌ Submit error:", errorMessage);

      if (error.response?.status === 401) {
        window.location.href = "/login"; // ✅ Auto logout on expiry
        return;
      }
    } finally {
      setServicesDataLoading(false); // ✅ End loader
    }
  };
  return (
    <>
      {servicesDataLoading && <LoadingSpinner />}

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
      <form>
        <div className="max-w-full sm:max-w-xl mx-auto mt-6">
          <button
            type="button"
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
                  name="url"
                  ref={urlInputRef}
                  value={formData.url}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                  placeholder="https://yourSite.com"
                />
              </div>
            </>
          )}
        </div>

        {/* Password Accordion */}
        <div className="max-w-full sm:max-w-xl mx-auto my-9">
          <button
            type="button"
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
                name="password"
                type={showPassword ? "text" : "password"}
                className="w-full border border-gray-300 rounded-md px-4 py-2 pr-10"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
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

        <NFCModal />

        <div
          // onClick={handleClick}
          className="mt-8 max-w-xl mx-auto flex justify-center items-center"
        >
          <button
            onClick={(e) => {
              e.preventDefault();

              // ✅ Only proceed if valid input
              if (!urlInputRef.current.checkValidity()) {
                urlInputRef.current.reportValidity(); // Show native error
                return;
              }

              setShowConfirmModal(true);
            }}
            className="px-6 py-2 cursor-pointer text-xl text-white font-bold rounded-lg flex justify-center items-center transition-effects gap-2 bg-[linear-gradient(to_right,#008080,#001a1a)]"
          >
            submit
          </button>
        </div>
      </form>

      {showConfirmModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-md bg-black/30">
          <div className="bg-white relative rounded-xl shadow-xl p-6 w-full max-w-xl border border-teal-200 mx-4 sm:mx-auto">
            <button
              onClick={() => setShowConfirmModal(false)}
              className="text-xl absolute right-4 pb-6 text-gray-600 hover:text-red-600"
            >
              ❌
            </button>
            <h3 className="text-2xl sm:text-3xl text-center font-semibold text-mainGreen my-6">
              Confirm Submission
            </h3>

            <div className="space-y-4 md:text-xl text-lg text-gray-800 mb-8">
              {/* Conditional URL Row */}
              {formData?.url && (
                <div className="flex flex-col sm:flex-row sm:items-start sm:gap-3">
                  <div className="font-semibold min-w-fit">URL:</div>
                  <div className="break-words overflow-hidden">
                    <a
                      href={formData?.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 underline break-all"
                    >
                      {formData?.url}
                    </a>
                  </div>
                </div>
              )}

              {/* Conditional Password Row */}
              {formData?.password && (
                <div className="flex flex-col sm:flex-row sm:items-start sm:gap-3">
                  <div className="font-semibold min-w-fit">Password:</div>
                  <div>{formData?.password}</div>
                </div>
              )}
            </div>

            <div className="flex justify-end flex-wrap gap-4">
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
                Confirm & Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default URLServices;
