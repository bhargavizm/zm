"use client";

import LoadingSpinner from "@/components/common/spinner";
import useDesignContext from "@/components/hooks/useDesignContext";
import useServicesContext from "@/components/hooks/useServiceContext";
import { setSmsServices } from "@/redux/slices/servicesSlice";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";
import {
  FiMessageSquare,
  FiUser,
  FiCalendar,
  FiLock,
  FiEye,
  FiEyeOff,
} from "react-icons/fi";
import { useDispatch } from "react-redux";

const SmsContent = () => {
  const {
    smsFormData,
    setSmsFormData,
    servicesDataLoading,
    setServicesDataLoading,
  } = useServicesContext();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const { setActiveTab, setText, setQrCodeUrl } = useDesignContext();
  const { slug } = useParams();
  const dispatch = useDispatch();
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSmsFormData({ ...smsFormData, [name]: value });
  };
  const handleInitialSubmit = (e) => {
    e.preventDefault();

    const { genderName, messageType, textMessage, password } = smsFormData;

    const isEmpty =
      !genderName.trim() &&
      !messageType.trim() &&
      !textMessage.trim() &&
      !password.trim();

    if (isEmpty) {
      toast.error(" Enter at least one field before submitting");
      return;
    }

    setShowConfirmModal(true);
  };

  const handleConfirmedSubmit = async () => {
    setActiveTab(slug, "Backdrop Designs");
    // const payload = {
    //   genderName: smsFormData.genderName,
    //   messageType: smsFormData.messageType,
    //   textMessage: smsFormData.textMessage,
    //   password: smsFormData.password,
    // };

    //setServicesDataLoading(true);

    // try {
    //   const response = await axios.post("/api/services/sms", payload, {
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //   });

    //   const { fileData, qrUrl } = response.data;

    //   if (fileData?._id && qrUrl) {
    //     setText(qrUrl); // ✅ from backend
    //     dispatch(setSmsServices(fileData));

    //     toast.success("Text submitted successfully!");

    //     setActiveTab(slug, "QR Code");
    //     setShowConfirmModal(false);

    //     setSmsFormData({
    //       genderName: "",
    //       messageType: "",
    //       textMessage: "",
    //       password: "",
    //     });
    //   } else {
    //     toast.error("Failed to create SMS service");
    //   }
    // } catch (error) {
    //   const errMsg = error?.response?.data?.error || "An unexpected error occurred.";
    //   toast.error(errMsg);
    //   console.error("Submit Error:", error);

    //   if (error.response?.status === 401) {
    //     window.location.href = "/login";
    //   }
    // } finally {
    //   setServicesDataLoading(false);
    // }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // These "has" variables are primarily for the preview, not strictly needed for the form itself,
  // but kept for now as they don't affect styling.
  const hasMessageInfo =
    smsFormData.genderName ||
    smsFormData.messageType ||
    smsFormData.textMessage;
  const hasDate = smsFormData.date;
  const hasPassword = smsFormData.password;

  return (
    <>
      {servicesDataLoading && <LoadingSpinner />}

      <div className="flex flex-col">
        {" "}
        {/* Removed h-screen and bg-gradient styles */}
        {/* Main Content Area - Removed fixed width/height classes */}
        <div className="flex ">
          {/* Form Section - Removed fixed width */}
          <div className="p- overflow-y-auto no-scrollbar flex-1">
            {" "}
            {/* Added flex-1 to allow it to grow */}
            <div className="h-full flex flex-col">
              {/* Changed text-white to text-[#008080] for better contrast */}

              <form className="flex-1 overflow-y-auto no-scrollbar">
                {/* Message Information */}
                <div className="bg-white/90 backdrop-blur-sm rounded-xl p-6 shadow-lg mb-6">
                  <h2 className="text-xl font-semibold mb-4 text-[#008080] flex items-center">
                    <FiMessageSquare className="mr-2" /> Message Information
                  </h2>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Name
                      </label>
                      <input
                        type="text"
                        name="genderName"
                        placeholder="Enter name"
                        value={smsFormData.genderName}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#008080] focus:border-[#008080]"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Type of Message
                      </label>
                      <input
                        type="text"
                        name="messageType"
                        placeholder="Enter message type"
                        value={smsFormData.messageType}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#008080] focus:border-[#008080]"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Text Message
                      </label>
                      <textarea
                        name="textMessage"
                        placeholder="Enter your message"
                        value={smsFormData.textMessage}
                        onChange={handleChange}
                        rows={3}
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#008080] focus:border-[#008080]"
                      />
                    </div>
                  </div>
                </div>

                {/* Date */}

                {/* Password */}
                <div className="bg-white/90 backdrop-blur-sm rounded-xl p-6 shadow-lg mb-6">
                  <h2 className="text-xl font-semibold mb-4 text-[#008080] flex items-center">
                    <FiLock className="mr-2" /> Password
                  </h2>
                  <div className="relative">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Enter Password
                    </label>
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      placeholder="Enter your password"
                      value={smsFormData.password}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#008080] focus:border-[#008080] pr-10"
                    />
                    <button
                      type="button"
                      onClick={togglePasswordVisibility}
                      className="absolute right-3 top-9 text-gray-500 hover:text-[#008080]"
                    >
                      {showPassword ? <FiEye /> : <FiEyeOff />}
                    </button>
                  </div>
                </div>

                {/* Submit Button */}
                <div className="flex justify-center items-center">
                  <button
                    type="button"
                    onClick={handleInitialSubmit}
                    className="font-bold px-4 cursor-pointer bg-[#008080] text-white py-2 rounded transition-effects text-lg"
                  >
                    Next →
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        {/* Add custom CSS to hide scrollbars */}
        <style jsx global>{`
          .no-scrollbar::-webkit-scrollbar {
            display: none;
          }
          .no-scrollbar {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
        `}</style>
        {showConfirmModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-md bg-black/30">
          <div className="bg-white relative rounded-xl shadow-xl p-6 w-full max-w-xl max-h-[90vh] border border-teal-200 mx-4 sm:mx-auto">
              <h2 className="text-lg font-semibold text-gray-800">
                Confirm Submission
              </h2>
              <div className="text-sm text-gray-700 space-y-2">
                {smsFormData.genderName && (
                  <p>
                    <strong>
                      <span className="font-semibold">genderName:</span>{" "}
                    </strong>
                    {smsFormData.genderName}
                  </p>
                )}
                {smsFormData.messageType && (
                  <p>
                    <strong>
                      <span className="font-semibold">messageType:</span>{" "}
                    </strong>
                    {smsFormData.messageType}
                  </p>
                )}
                {smsFormData.textMessage && (
                  <p>
                    <strong>
                      <span className="font-semibold">textMessage:</span>{" "}
                    </strong>
                    {smsFormData.textMessage}
                  </p>
                )}
                {smsFormData.password && (
                  <p>
                    <strong>
                      <span className="font-semibold">Password:</span>{" "}
                    </strong>
                    {smsFormData.password}
                  </p>
                )}
              </div>
              <div className="flex justify-end gap-4 pt-4">
                <button
                  onClick={() => setShowConfirmModal(false)}
                  className="px-4 py-2 rounded-lg text-gray-600 border border-gray-300 hover:bg-gray-100"
                >
                  Edit
                </button>
                <button
                  onClick={handleConfirmedSubmit}
                  className="px-4 py-2 rounded-lg bg-teal-600 text-white hover:bg-teal-700"
                >
                  Continue
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default SmsContent;
