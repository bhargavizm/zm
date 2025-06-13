'use client';
import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { FcGoogle } from 'react-icons/fc';

export default function LoginPage() {
    const router = useRouter();
    const [active, setActive] = useState('new');
    const modalRef = useRef(null);

    // Optional: Close modal on outside click
    useEffect(() => {
        function handleClickOutside(event) {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                router.push('/'); // Redirect to home or any other page
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [router]);

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
            <div
                ref={modalRef}
                className="relative flex flex-col md:flex-row bg-white text-[#001a1a] rounded-2xl shadow-2xl w-full max-w-4xl"
            >
                {/* Close Button */}
                <button
                    onClick={() => router.push('/')}
                    className="absolute top-4 right-4 text-2xl text-gray-400 hover:text-gray-700 z-10"
                    aria-label="Close"
                >
                    &times;
                </button>

                {/* Left Section
                <div className="bg-mainGreen md:w-1/2 w-full flex flex-col justify-center items-center text-white p-6 md:rounded-l-2xl">
                    <Image src="/logo.svg" alt="logo" width={120} height={120} className="m-5" />
                    <h1 className="text-xl font-semibold text-center px-4">
                        World's No.1 QR Code Generating and Managing Platform
                    </h1>
                    <Image src="/qr-image-login.png" alt="qr-image" width={400} height={400} className="m-5" />
                    <h4 className="text-md font-thin text-center px-4">
                        Trusted by the World's Top Brands.
                    </h4>
                </div> */}
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
                                }}
                                type="button"
                                className={`flex-1 text-sm bg-[#e6e6e6] text-[#001a1a] px-4 py-2 rounded-sm hover:bg-[#d4d4d4] transition-all duration-300 ${active === 'new' ? 'border-b-4 border-[#008080]' : 'border-b-4 border-transparent cursor-pointer'
                                    }`}
                            >
                                I'm a new user
                            </button>
                            <button
                                onClick={() => {
                                    setActive('existing');
                                    router.push('/login')
                                    }}
                                type="button"
                                className={`flex-1 text-sm bg-[#e6e6e6] text-[#001a1a] px-4 py-2 rounded-sm hover:bg-[#c0c0c0] transition-all duration-300 ${active === 'existing' ? 'border-b-4 border-[#008080]' : 'border-b-4 border-transparent cursor-pointer'
                                    }`}
                            >
                                I'm an existing user
                            </button>
                        </div>

                        {[
                            { id: 'name', label: 'Name*', type: 'text' },
                            { id: 'email', label: 'Official Email / Login ID*', type: 'text' },
                            { id: 'password', label: 'Password*', type: 'password' },
                            { id: 'cpassword', label: 'Confirm password*', type: 'password' }
                        ].map((input) => (
                            <div className="relative w-full mt-3" key={input.id}>
                                <input
                                    type={input.type}
                                    id={input.id}
                                    placeholder=" "
                                    className="peer w-full border-2 border-gray-300 rounded-sm px-2 pt-4 pb-2 text-gray-800 focus:outline-none focus:border-[#008080]"
                                />
                                <label
                                    htmlFor={input.id}
                                    className="absolute left-3 -top-2 bg-white px-1 text-sm text-gray-500 transition-all 
                  peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 
                  peer-focus:-top-2 peer-focus:text-sm peer-focus:text-[#001a1a] peer-focus:bg-white"
                                >
                                    {input.label}
                                </label>
                            </div>
                        ))}

                        {/* Checkboxes */}
                        <div className="flex items-start mt-3 w-full gap-2 text-sm">
                            <input type="checkbox" className="border-2 border-mainGreen mt-1" />
                            <label>I agree to <span className="text-mainGreen">terms</span> and <span className="text-mainGreen">privacy</span> policy</label>
                        </div>
                        <div className="flex items-start mt-2 w-full gap-2 text-sm">
                            <input type="checkbox" className="border-2 border-mainGreen mt-1" />
                            <label>Remember me on this browser</label>
                        </div>
                        {/* Submit */}
                        <button
                            type="submit"
                            className="w-full my-2 relative overflow-hidden text-white font-medium px-6 py-2 rounded-sm transition duration-300 bg-[#008080] hover:bg-[#DF8788] group"
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

                {/* Left Section */}
                <div className="bg-mainGreen md:w-1/2 w-full flex flex-col justify-center items-center text-white p-6 md:rounded-r-2xl">
                    <Image src="/logo.svg" alt="logo" width={120} height={120} className="m-5" />
                    <h1 className="text-xl font-semibold text-center px-4">
                        World's No.1 QR Code Generating and Managing Platform
                    </h1>
                    <Image src="/qr-image-login.png" alt="qr-image" width={400} height={400} className="m-5" />
                    <h4 className="text-md font-thin text-center px-4">
                        Trusted by the World's Top Brands.
                    </h4>
                </div>
            </div>
        </div>
    );
}
