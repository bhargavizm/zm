"use client";

import React, { useState } from "react";
import useServicesContext from "@/components/hooks/useServiceContext";
import NFCModal from "@/components/modalPopUps/nfcModal";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import { setTextMessageServices } from "@/redux/slices/servicesSlice";
import toast from "react-hot-toast";
import useDesignContext from "@/components/hooks/useDesignContext";
import LoadingSpinner from "@/components/common/spinner";

const TextMessageContent = () => {
  const { textMessageForm, setTextMessageForm ,servicesDataLoading, setServicesDataLoading} = useServicesContext();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const { setActiveTab, setText } = useDesignContext();
  const { slug } =useParams();
  const dispatch = useDispatch();
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTextMessageForm({ ...textMessageForm, [name]: value });
  };

  const handleInitialSubmit = (e) => {
    e.preventDefault();
     const { sender, message, password } = textMessageForm;

  const isEmpty =
    !sender.trim() &&
    !message.trim() &&
    !password.trim();

  if (isEmpty) {
    toast.error(" Enter at least one field before submitting");
    return;
  }

    setShowConfirmModal(true);
  };

  // ✅ Send raw JSON
  const handleConfirmedSubmit = async () => {

      setActiveTab(slug, "Backdrop Designs");

//     const payload = {
//       sender: textMessageForm.sender,
//       message: textMessageForm.message,
//       password: textMessageForm.password,
//     };
// setServicesDataLoading(true);
//     try {
//       const response = await axios.post("/api/services/textMessage", payload, {
//         headers: {
//           "Content-Type": "application/json",
//         },
//       });

//       const { fileData, qrUrl } = response.data;

//       if (fileData?._id && qrUrl) {

//         setText(qrUrl); // ✅ from backend
//         dispatch(setTextMessageServices(fileData));
//         toast.success("Text submitted successfully!");
//         setActiveTab(slug, "QR Code");
//         setShowConfirmModal(false);
//         setTextMessageForm({ sender: "", message: "", password: "" });
//       }
//     } catch (error) {
//       const errMsg = error?.response?.data?.error || "An unexpected error occurred.";
//       toast.error(`${errMsg}`);
//       console.error("Submit Error:", error);
//          if (error.response?.status === 401) {
//         window.location.href = "/login"; // ✅ Auto logout on expiry
//         return;
//       }
//     } finally {
//       setServicesDataLoading(false); // ✅ End loader
//     }
  };

  return (
    <>
      {servicesDataLoading && <LoadingSpinner />}

      <div className="space-y-6">
        <h1 className="text-3xl font-bold pb-6 text-[#008080]">
          QR Code for Text Message
        </h1>

        <div className="grid grid-cols-1 gap-4">
          <input
            type="text"
            name="sender"
            placeholder="Sender Name"
            value={textMessageForm.sender}
            onChange={handleChange}
            className="border p-2 rounded shadow-sm w-full"
          />

          <textarea
            name="message"
            placeholder="Enter your message here..."
            value={textMessageForm.message}
            onChange={handleChange}
            rows={4}
            className="border p-2 rounded shadow-sm w-full"
          />

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={textMessageForm.password}
              onChange={handleChange}
              placeholder="Enter password"
              className="border p-2 rounded shadow-sm w-full"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 focus:outline-none"
            >
              {showPassword ? <FiEye size={18} /> : <FiEyeOff size={18} />}
            </button>
          </div>
        </div>

        {/* <NFCModal /> */}
<div className="flex justify-center items-center">
        <button
          type="submit"
          onClick={handleInitialSubmit}
          className="font-bold px-4 cursor-pointer bg-[#008080] text-white py-2 rounded transition-effects text-lg"

        >
           Next → 
        </button>
        </div>
      </div>

      {showConfirmModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-md bg-black/30">
          <div className="bg-white rounded-xl shadow-xl p-6 max-w-sm w-full border border-teal-200 relative">
            <h2 className="text-lg font-semibold text-gray-800">Confirm Submission</h2>
            <div className="text-sm text-gray-700 space-y-2 gap-2">
              {textMessageForm.sender && (
                <p>
                  <strong>
                  <span className="font-semibold">Sender:</span> </strong>{textMessageForm.sender}
                </p>
              )}
              {textMessageForm.message && (
                <p>
                  <strong>
                  <span className="font-semibold">Message:</span> </strong>{textMessageForm.message}
                </p>
              )}
              {textMessageForm.password && (
                <p>
                  <strong>
                  <span className="font-semibold">Password:</span> </strong>{textMessageForm.password}
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
    </>
  );
};

export default TextMessageContent;
