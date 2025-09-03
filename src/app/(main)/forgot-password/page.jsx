'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { toast } from 'react-hot-toast';

export default function ForgotPassword() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [emailError, setEmailError] = useState("");

  // ✅ Email Validation
  const validateEmail = (value) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(value);
  };

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      setEmailError("Please enter a valid email address.");
      return;
    }
    setEmailError("");
    setLoading(true);

    try {
      const res = await axios.post("/api/auth/forgot-password", { email });
      localStorage.setItem("passwordToken", res.data.token);
      localStorage.setItem("otpFlow", "forgotpwd"); // ✅ mark this flow as forgot password
      toast.success(res.data.message);
      router.push("/verify-otp");
    } catch (err) {
      toast.error(err.response?.data?.error || "Failed to send OTP.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
      <div className="relative flex flex-col md:flex-row bg-white text-[#001a1a] rounded-2xl shadow-2xl w-full max-w-5xl">
        {/* Close Button */}
        <button
          onClick={() => router.push('/')}
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
          <Image src="/qr-image-login.webp" alt="qr-image" width={400} height={400} />
          <h4 className="text-md font-thin text-center px-4">
            India's No.1 QR Code Generating and Managing Platform
          </h4>
        </div>

        {/* Right Section */}
        <div className="w-full md:w-1/2 flex flex-col justify-center items-center p-6">
          <h1 className="text-3xl text-mainGreen font-semibold text-center">
            Forgot Password
          </h1>
          <h4 className="font-light text-sm text-mainGreen text-center mt-1">
            Enter your registered email address
          </h4>

          <form onSubmit={handleEmailSubmit} className="w-full mt-6 flex flex-col items-center gap-4">
            <input
              type="email"
              placeholder="Enter email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-3/4 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-mainGreen  text-lg"
            />
            {emailError && <p className="text-red-500 text-sm">{emailError}</p>}
            <button
              type="submit"
              disabled={loading}
              className="w-3/4 bg-mainGreen text-white rounded-lg px-4 py-2 font-semibold transition disabled:opacity-50"
            >
              {loading ? "Sending OTP..." : "Send OTP"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
