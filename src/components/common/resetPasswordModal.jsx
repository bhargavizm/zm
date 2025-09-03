"use client";
import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const ResetPasswordModal = ({ onClose, serviceData, servicesDataLoading, setServicesDataLoading }) => {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setError("");

    if (!password.trim()) {
      setError("Password is required");
      return;
    }

    setServicesDataLoading(true);
    try {
      const res = await axios.post(
        `/api/${serviceData.serviceName}/${serviceData.userId}/${serviceData.serviceId}/reset-password`,
        { password }
      );

      if (res.data.success) {
        toast.success(res.data.message || "Password reset successfully");
        onClose();
      } else {
        toast.error(res.data.error || "Failed to reset password");
      }
    } catch (err) {
      console.error(err);
      toast.error(err?.response?.data?.error || "Something went wrong!");
    } finally {
      setServicesDataLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-md bg-black/30">
      <div className="bg-white rounded-xl shadow-xl p-6 max-w-xl w-full relative">
        <button onClick={onClose} className="absolute top-3 right-3 text-gray-500 hover:text-red-500 cursor-pointer">❌</button>

        <h2 className="text-2xl font-bold text-center text-mainGreen my-4">🔐 Reset Password</h2>

        <form onSubmit={handleResetPassword} className="space-y-6 p-4">
          <div className="relative">
            <label className="block mb-2 font-semibold">New Password:</label>
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter new password"
              className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-mainGreen"
              disabled={servicesDataLoading}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-[45px] text-gray-500 hover:text-mainGreen"
            >
              {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
            </button>
          </div>

          <div className="flex justify-center items-center my-4">
            <button
              type="submit"
              className="bg-mainGreen text-white font-bold py-2 px-4 text-xl rounded-lg transition-effects"
              disabled={servicesDataLoading}
            >
              {servicesDataLoading ? "Submitting..." : "Submit"}
            </button>
          </div>
        </form>

        {error && <p className="text-red-500 text-lg mt-3">{error}</p>}
      </div>
    </div>
  );
};


export default ResetPasswordModal;
