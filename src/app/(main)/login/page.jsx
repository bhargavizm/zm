'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { FcGoogle } from 'react-icons/fc';
import { FaFacebook } from 'react-icons/fa';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import { useDispatch } from 'react-redux';
import { setUserData } from '@/redux/slices/authSlice';
import { signIn } from 'next-auth/react';
import toast from 'react-hot-toast';
import Link from 'next/link';

export default function LoginPage() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [active, setActive] = useState('existing');
  const modalRef = useRef(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        router.push('/');
      }
    };

    const handleEscapeKey = (event) => {
      if (event.key === 'Escape') {
        router.push('/');
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscapeKey);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [router]);

  // Email validation function
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    
    // Clear error when user starts typing
    if (emailError && value) {
      setEmailError('');
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    
    // Validate email before submitting
    if (!validateEmail(email)) {
      setEmailError('Please enter a valid email address');
      return;
    }
    
    // Clear any previous errors
    setEmailError('');

    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
        credentials: "include", 
      });

      const data = await res.json();

      if (res.ok) {
        dispatch(setUserData(data.user));
        toast.success(data.message);
        // 👇 Redirect to saved path if available
          const redirectFromServices = localStorage.getItem("redirectAfterLoginFromServices");
        const redirectPath = sessionStorage.getItem("redirectAfterLogin");
        if (redirectFromServices) {
        localStorage.removeItem("redirectAfterLoginFromServices");
        router.push(redirectFromServices);
      } else if (redirectPath) {
        sessionStorage.removeItem("redirectAfterLogin");
        router.push(redirectPath);
      } else {
        router.push('/'); // ✅ default fallback
      }
      } else {
        toast.error(data.error);
      }
    } catch (error) {
      console.error('Fetch error:', error.message);
      toast.error('Server error. Please try again later.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
      <div
        ref={modalRef}
        className="relative flex flex-col md:flex-row bg-white text-[#001a1a] rounded-2xl shadow-2xl w-full max-w-4xl"
      >
        {/* Close Button */}
        <button
          onClick={() => router.push('/')}
          className="absolute top-4 right-4 text-2xl text-[#001a1a] font-bold cursor-pointer hover:text-gray-700 z-10"
          aria-label="Close"
        >
          &times;
        </button>

        {/* Left Section */}
        <div className="hidden md:flex bg-mainGreen md:w-1/2 flex-col justify-center items-center text-white p-6 rounded-l-2xl">
          <Image
            src="/logos/zm-full.webp"
            alt="ZM Logo"
            width={100}
            height={100}
            className="m-4 w-24 md:w-32"
          />
          <h1 className="text-lg md:text-xl font-semibold text-center px-4 animate-bounce">
            🔐 Trust us with your data. It's not just secure — it's encrypted 🔐
          </h1>
          <Image
            src="/qr-image-login.webp"
            alt="QR Login"
            width={300}
            height={300}
            className="m-4 w-60 md:w-80 h-auto"
          />
          <h4 className="text-sm font-thin text-center px-4">
            India's No.1 QR Code Generating and Managing Platform
          </h4>
        </div>

        {/* Right Section */}
        <div className="w-full md:w-1/2 flex flex-col justify-center items-center bg-white text-[#001a1a] p-6 rounded-2xl md:rounded-r-2xl">
          <h1 className="text-2xl md:text-3xl text-loginBlue font-semibold text-center">
            Welcome Back!
          </h1>
          <h4 className="font-light text-sm md:text-base text-loginBlue text-center mt-1">
            Sign in to your ZM QR Code account
          </h4>

          <form
            onSubmit={handleLogin}
            className="flex flex-col items-center mt-6 w-full max-w-sm"
          >
            {/* Toggle Buttons */}
            <div className="flex flex-col sm:flex-row justify-between w-full gap-2 mb-4">
              <button
                type="button"
                onClick={() => {
                  setActive('new');
                  router.push('/signup');
                }}
                className={`flex-1 text-sm bg-[#e6e6e6] text-[#001a1a] px-4 py-2 rounded-sm hover:bg-[#d4d4d4] transition-all duration-300 ${active === 'new'
                  ? 'border-b-4 border-[#008080]'
                  : 'border-b-4 border-transparent cursor-pointer'
                  }`}
              >
                I'm a new user
              </button>
              <button
                type="button"
                onClick={() => setActive('existing')}
                className={`flex-1 text-sm bg-[#e6e6e6] text-[#001a1a] px-4 py-2 rounded-sm hover:bg-[#c0c0c0] transition-all duration-300 ${active === 'existing'
                  ? 'border-b-4 border-[#008080]'
                  : 'border-b-4 border-transparent cursor-pointer'
                  }`}
              >
                I'm an existing user
              </button>
            </div>

            {/* Email Input */}
            <div className="relative w-full mt-3">
              <input
                type="text"
                id="email"
                value={email}
                onChange={handleEmailChange}
                onBlur={() => {
                  if (email && !validateEmail(email)) {
                    setEmailError('Please enter a valid email address');
                  }
                }}
                placeholder=" "
                required
                className={`peer w-full border-2 rounded-sm px-2 pt-4 pb-2 text-gray-800 focus:outline-none ${
                  emailError ? 'border-red-500' : 'border-gray-300 focus:border-[#008080]'
                }`}
              />
              <label
                htmlFor="email"
                className="absolute left-3 -top-2 bg-white px-1 text-sm text-gray-500 transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-2 peer-focus:text-sm peer-focus:text-[#001a1a] peer-focus:bg-white"
              >
                Registered Email ID*
              </label>
              
              {/* Email Error Message */}
              {emailError && (
                <p className="text-red-500 text-xs mt-1">{emailError}</p>
              )}
            </div>

            {/* Password Input */}
            <div className="relative w-full mt-3">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder=" "
                required
                className="peer w-full border-2 border-gray-300 rounded-sm px-2 pr-10 pt-4 pb-2 text-gray-800 focus:outline-none focus:border-[#008080]"
              />
              <label
                htmlFor="password"
                className="absolute left-3 -top-2 bg-white px-1 text-sm text-gray-500 transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-2 peer-focus:text-sm peer-focus:text-[#001a1a] peer-focus:bg-white"
              >
                Password*
              </label>
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 focus:outline-none"
              >
                {showPassword ? <FiEye size={18} /> : <FiEyeOff size={18} />}
              </button>
            </div>
            
            <div className="w-full flex justify-end mt-4">
              <Link
                href="/forgot-password"
                className="text-md text-[#008080] hover:underline hover:text-[#006666] transition-colors duration-200"
              >
                Forgot Password ?
              </Link>
            </div>

            {/* Terms Checkbox */}
            <div className="flex items-start mt-3 w-full gap-2 text-sm">
              <input
                type="checkbox"
                id="agree"
                defaultChecked
                className="mt-1 accent-[#008080]"
              />
              <label htmlFor="agree">
                I agree to{' '}
                <a href="/terms-conditions" target="_blank" className="text-mainGreen underline">
                  terms
                </a>{' '}
                and{' '}
                <a href="/privacy-policies" target="_blank" className="text-mainGreen underline">
                  privacy
                </a>{' '}
                policy
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full my-4 relative overflow-hidden text-white font-medium px-6 py-2 rounded-sm transition duration-300 bg-[#008080] hover:bg-[#DF8788] group cursor-pointer"
            >
              <span className="relative z-10">Done</span>
              <span
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent 
                translate-x-[-100%] group-hover:translate-x-[100%] 
                transition-transform duration-[1200ms] ease-in-out"
              />
            </button>

            {/* Social Login */}
            <p className="text-sm text-[#001a1a] mt-4">or</p>
            <div className="flex gap-4 mt-2">
              <button
                onClick={() => signIn('google', { callbackUrl: '/' })}
                className="flex items-center justify-center gap-3 rounded-md hover:bg-gray-100 transition cursor-pointer"
              >
                <FcGoogle size={30} />
              </button>

              <button
                onClick={() => signIn('facebook', { callbackUrl: '/' })}
                className="flex items-center justify-center gap-3 rounded-md hover:bg-gray-100 transition cursor-pointer"
              >
                <FaFacebook size={30} color="#1877F2" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}