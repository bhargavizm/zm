'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { toast } from 'react-hot-toast';

export default function VerifyOtp() {
  const router = useRouter();
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [signupToken, setSignupToken] = useState('');
  const [resendLoading, setResendLoading] = useState(false);
  const [timer, setTimer] = useState(100); // 600 seconds = 10 minutes

  // ✅ Grab token from localStorage on mount
  useEffect(() => {
    const token = localStorage.getItem("signupToken");
    if (!token) {
      toast.error("Session expired. Please signup again.");
      router.push("/signup"); // redirect if no token
    } else {
      setSignupToken(token);
    }
  }, [router]);

  // ✅ Countdown timer effect
  useEffect(() => {
    if (timer > 0) {
      const countdown = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(countdown);
    }
  }, [timer]);

  // ✅ Format timer into mm:ss
  const formatTime = (timeInSec) => {
    const minutes = String(Math.floor(timeInSec / 60)).padStart(2, '0');
    const seconds = String(timeInSec % 60).padStart(2, '0');
    return `${minutes}:${seconds}`;
  };

  // ✅ Submit handler (Verify OTP)
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!otp) {
      toast.error('Please enter OTP');
      return;
    }
    try {
      setLoading(true);
      const res = await axios.post(
        '/api/auth/verify-otp',
        { otp },
        {
          headers: {
            Authorization: `Bearer ${signupToken}`,
          },
        }
      );

     if (res.data.success) {
  toast.success("OTP verified successfully 🎉");

  const flowType = localStorage.getItem("otpFlow"); // ✅ check flow

  if (flowType === "signup") {
    router.push("/login"); // after signup OTP → go login
  } else if (flowType === "forgotpwd") {
    router.push("/reset-password"); // after forgot password OTP → go create password
  } else {
    router.push("/"); // fallback
  }
}

    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.error || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  // ✅ Resend OTP handler
  const handleResendOtp = async () => {
    try {
      setResendLoading(true);
      const res = await axios.post(
        '/api/auth/resend-otp',
        {},
        {
          headers: {
            Authorization: `Bearer ${signupToken}`,
          },
        }
      );

      if (res.data.success) {
        toast.success(res.data.message || 'New OTP sent!');
        setTimer(600); // reset 10min timer
      } else {
        toast.error(res.data.error || 'Failed to resend OTP');
      }
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.error || 'Something went wrong');
    } finally {
      setResendLoading(false);
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

        {/* Right Section (Form) */}
        <div className="w-full md:w-1/2 flex flex-col justify-center items-center p-6">
          <h1 className="text-3xl text-loginBlue font-semibold text-center">
            Verify OTP
          </h1>
          <h4 className="font-light text-sm text-loginBlue text-center mt-1">
            Enter the OTP sent to your email
          </h4>

          <form onSubmit={handleSubmit} className="w-full mt-6 flex flex-col items-center gap-4">
            <input
              type="text"
              placeholder="Enter 6-digit OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              maxLength={6}
              className="w-3/4 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-mainGreen text-center text-lg tracking-widest"
            />
            <button
              type="submit"
              disabled={loading}
              className="w-3/4 bg-mainGreen text-white rounded-lg px-4 py-2 font-semibold  transition disabled:opacity-50"
            >
              {loading ? 'Verifying...' : 'Verify OTP'}
            </button>
          </form>

          <p className="text-md text-gray-600 mt-6">
            {timer > 0 ? (
              <>Resend OTP available in <span className="font-semibold">{formatTime(timer)}</span></>
            ) : (
              <button
                type="button"
                className="text-mainGreen font-semibold hover:underline"
                onClick={handleResendOtp}
                disabled={resendLoading}
              >
                {resendLoading ? 'Resending...' : 'Resend OTP'}
              </button>
            )}
          </p>
        </div>
      </div>
    </div>
  );
}
