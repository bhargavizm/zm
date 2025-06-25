"use client";

import React, { useState } from "react";
import useServicesContext from "@/components/hooks/useServiceContext";
import NFCModal from "@/components/modalPopUps/nfcModal";
import { FiEye, FiEyeOff } from "react-icons/fi";

const TextMessageContent = () => {
  const { textMessageForm, setTextMessageForm } = useServicesContext();
    const [showPassword, setShowPassword] = useState(false);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setTextMessageForm({ ...textMessageForm, [name]: value });
  };

  return (
    <>
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
          {/* Password Field with Eye Icon */}
                    <div>
                      {/* <label className="block text-sm font-semibold text-gray-700 mb-1">
                        Password
                      </label> */}
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
                          {showPassword ?   <FiEye size={18} /> : <FiEyeOff size={18} />}
                        </button>
                      </div>
                    </div>
        </div>

        <NFCModal />

        <button
          type="submit"
          className="mt-4 w-full bg-[#008080] text-white font-semibold py-2 rounded hover:bg-[#006666] transition"
        >
          Submit
        </button>
      </div>
    </>
  );
};

export default TextMessageContent;
