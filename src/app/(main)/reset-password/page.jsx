"use client";
import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";

export default function ResetPassword() {
  const router = useRouter();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});

  // 🔹 Validate password while typing
  const validatePassword = (value) => {
    let err = {};
    if (value.length < 6) {
      err.length = "Password must be at least 6 characters";
    }
    if (!/[^A-Za-z0-9]/.test(value)) {
      err.special = "Password must contain at least one special character";
    }
    return err;
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    setErrors(validatePassword(value));
  };

  const handleConfirmChange = (e) => {
    const value = e.target.value;
    setConfirmPassword(value);
    if (password && value !== password) {
      setErrors((prev) => ({ ...prev, match: "Passwords do not match" }));
    } else {
      setErrors((prev) => {
        const { match, ...rest } = prev;
        return rest;
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const currentErrors = {
      ...validatePassword(password),
    };
    if (password !== confirmPassword) {
      currentErrors.match = "Passwords do not match";
    }

    if (Object.keys(currentErrors).length > 0) {
      setErrors(currentErrors);
      return;
    }

    try {
      const token = localStorage.getItem("passwordToken"); // 🔑 get token from storage
      if (!token) {
        toast.error("Invalid or expired reset link. Please try again.");
        return;
      }

      // ✅ Send both password + confirmPassword with token in headers
      const res = await axios.post(
        "/api/auth/reset-password",
        { password, confirmPassword },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success(res.data.message || "Password reset successfully!");

      // ✅ Clear token after reset
      localStorage.removeItem("passwordToken");

      router.push("/login");
    } catch (err) {
      toast.error(err.response?.data?.error || "Something went wrong");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
      <div className="relative flex flex-col md:flex-row bg-white text-[#001a1a] rounded-2xl shadow-2xl w-full max-w-5xl">
        {/* Close Button */}
        <button
          onClick={() => router.push("/")}
          className="absolute top-4 right-4 text-2xl text-[#001a1a] font-bold hover:text-gray-700"
        >
          &times;
        </button>

        {/* Left Section */}
        <div className="hidden md:flex bg-mainGreen md:w-1/2 flex-col justify-center items-center text-white p-6">
          <Image src="/logos/zm-full.webp" alt="logo" width={150} height={150} />
          <h1 className="text-xl font-semibold text-center px-4 animate-bounce">
            🔐 Trust us with your data. It's not just secure — it's encrypted 🔐
          </h1>
          <Image
            src="/qr-image-login.webp"
            alt="qr-image"
            width={400}
            height={400}
          />
          <h4 className="text-md font-thin text-center px-4">
            India's No.1 QR Code Generating and Managing Platform
          </h4>
        </div>

        {/* Right Section */}
        <div className="w-full md:w-1/2 flex flex-col justify-center items-center p-6">
          <h1 className="text-3xl text-loginBlue font-semibold text-center">
            Reset Password
          </h1>
          <h4 className="font-light text-sm text-loginBlue text-center mt-1">
            Enter new password
          </h4>

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="w-full max-w-sm mt-6 flex flex-col gap-4"
          >
            {/* Password */}
            <div>
              <input
                type="password"
                value={password}
                onChange={handlePasswordChange}
                placeholder="New Password"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-mainGreen"
              />
              {errors.length && (
                <p className="text-red-500 text-xs">{errors.length}</p>
              )}
              {errors.special && (
                <p className="text-red-500 text-xs">{errors.special}</p>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <input
                type="password"
                value={confirmPassword}
                onChange={handleConfirmChange}
                placeholder="Confirm Password"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-mainGreen"
              />
              {errors.match && (
                <p className="text-red-500 text-xs">{errors.match}</p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="bg-mainGreen text-white py-2 rounded-lg font-semibold  transition-effects"
            >
              Reset Password
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
