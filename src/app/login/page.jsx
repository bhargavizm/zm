'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { FcGoogle } from 'react-icons/fc';


export default function LoginPage() {
    const router = useRouter();
    const [active, setActive] = useState('new');
    return (
        <div className="min-h-screen flex flex-col md:flex-row bg-black text-white">
            {/* Left Section */}
            <div className="bg-loginBlue md:w-1/2 w-full flex flex-col justify-center items-center text-white p-6 md:rounded-l-2xl">
                <Image src="/logo.svg" alt="logo" width={200} height={200} className="m-5" />
                <h1 className="text-2xl font-semibold text-center px-4">
                    World's No.1 QR Code Generating and Managing Platform
                </h1>
                <Image src="/lock.jpg" alt="lock" width={200} height={200} className="m-5" />
                {/* Placeholder for animated beam */}
                <h4 className="text-md font-thin text-center px-4">
                    Trusted by the World's Top Brands.
                </h4>
            </div>

            {/* Right Section */}
            <div className="md:w-1/2 w-full flex flex-col justify-center items-center bg-white text-[#001a1a] p-6 md:rounded-r-2xl">
                <h1 className="text-3xl text-loginBlue font-semibold text-center">Welcome Back!</h1>
                <h4 className="font-light text-sm text-loginBlue text-center mt-1">Sign in to your ZM QR Code account</h4>

                <form className="flex flex-col items-center mt-6 w-full max-w-sm">
                    {/* Buttons Row */}
                    <div className="flex justify-between w-full gap-2 mb-4">
                        <button
                            onClick={() => {
                                setActive('new');
                                router.push('/signup');
                            }}
                            type="button"
                            className={`flex-1 text-sm bg-[#e6e6e6] text-[#001a1a] px-4 py-2 rounded-sm hover:bg-[#d4d4d4] transition-all duration-300 ${active === 'new' ? 'border-b-4 border-[#008080]' : 'border-b-4 border-transparent'
                                }`}
                        >
                            I'm a new user
                        </button>
                        <button
                            onClick={() => setActive('existing', router.push('/login'))}
                            type="button"
                            className={`flex-1 text-sm bg-[#e6e6e6] text-[#001a1a] px-4 py-2 rounded-sm hover:bg-[#c0c0c0] transition-all duration-300 ${active === 'existing' ? 'border-b-4 border-[#008080]' : 'border-b-4 border-transparent'
                                }`}
                        >
                            I'm an existing user
                        </button>
                    </div>

                    {/* Email */}
                    <div className="relative w-full mb-4">
                        <input
                            type="text"
                            id="email"
                            placeholder=" "
                            className="peer w-full border-2 border-gray-300 rounded-sm px-2 pt-4 pb-2 text-gray-800 focus:outline-none focus:border-[#008080]"
                        />
                        <label
                            htmlFor="email"
                            className="absolute left-2 top-1 text-sm text-gray-500 transition-all 
                            peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 
                            peer-focus:top-1 peer-focus:text-sm peer-focus:text-[#001a1a] peer-focus:bg-white bg-white px-1"
                        >
                            Official Email / Login ID*
                        </label>
                    </div>

                    {/* Password */}
                    <div className="relative w-full mb-4">
                        <input
                            type="password"
                            id="password"
                            placeholder=" "
                            className="peer w-full border-2 border-gray-300 rounded-sm px-2 pt-4 pb-2 text-gray-800 focus:outline-none focus:border-[#008080]"
                        />
                        <label
                            htmlFor="password"
                            className="absolute left-2 top-1 text-sm text-gray-500 transition-all 
              peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 
              peer-focus:top-1 peer-focus:text-sm peer-focus:text-[#001a1a] peer-focus:bg-white bg-white px-1"
                        >
                            Password*
                        </label>
                    </div>

                    {/* Remember Me */}
                    <div className="flex items-center w-full mb-4">
                        <input type="checkbox" id="remember" className="mr-2" />
                        <label htmlFor="remember" className="text-sm text-[#001a1a]">
                            Remember me on this browser
                        </label>
                    </div>

                    {/* Submit */}
                    <button
                        type="submit"
                        className="w-full relative overflow-hidden text-white font-medium px-6 py-2 rounded-sm transition duration-300 bg-[#008080] hover:bg-[#DF8788] group"
                    >
                        <span className="relative z-10">Done</span>
                        <span
                            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent 
               translate-x-[-100%] group-hover:translate-x-[100%] 
               transition-transform duration-[1200ms] ease-in-out"
                        />
                    </button>

                    {/* Alternative login */}
                    <p className="text-sm text-[#001a1a] mt-4">or</p>
                    <div className="flex gap-4 mt-2">
                        <FcGoogle size={30} className="cursor-pointer hover:scale-105 transition" />
                        <Image
                            src="/microsoft-logo.jpeg"
                            alt="ms-logo"
                            width={30}
                            height={30}
                            className="rounded-full cursor-pointer hover:scale-105 transition"
                        />
                    </div>
                </form>
            </div>
        </div>
    );
}
