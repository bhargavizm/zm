"use client"
import React, { useState } from 'react';
import Image from 'next/image';
import { FcGoogle } from "react-icons/fc";
import { useRouter } from 'next/navigation';

const SignUpPage = () => {
    const router = useRouter();
    const [active, setActive] = useState('new');
    return (
        <div className="min-h-screen flex flex-col md:flex-row">
            {/* Left Side */}
            <div className="bg-loginBlue w-full md:w-1/2 flex flex-col justify-center items-center text-white p-6 md:rounded-l-2xl">
                <Image src="/logo.svg" alt="logo" width={200} height={200} className="m-5" />
                <h1 className="text-xl md:text-2xl font-semibold text-center max-w-[80%]">
                    World’s No.1 QR Code Generate and Managing Platform
                </h1>
                <Image src="/lock.jpg" alt="lock" width={200} height={200} className="m-5" />
                <h4 className="text-sm md:text-md font-thin text-center max-w-[80%]">
                    Trusted by the World's Top Brands.
                </h4>
            </div>

            {/* Right Side */}
            <div className="bg-white w-full md:w-1/2 flex flex-col justify-center items-center text-[#001a1a] p-6 md:rounded-r-2xl">
                <h1 className="text-3xl md:text-4xl font-semibold text-loginBlue">Welcome Back!</h1>
                <h4 className="text-sm font-light text-loginBlue text-center mt-1">Signup to your ZM QR Code account.</h4>

                <form className="flex flex-col items-center w-full mt-8 max-w-md">
                    {/* Buttons */}
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

                    {/* Inputs */}
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

                    {/* Shimmer Submit Button */}
                    <button
                        type="submit"
                        className=" my-2 w-full relative overflow-hidden text-white font-medium px-6 py-2 rounded-sm transition duration-300 bg-[#008080] hover:bg-[#DF8788] group"
                    >
                        <span className="relative z-10">Done</span>
                        <span
                            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent 
               translate-x-[-100%] group-hover:translate-x-[100%] 
               transition-transform duration-[1200ms] ease-in-out"
                        />
                    </button>

                    <p className="text-sm mt-5">or</p>

                    {/* Login with */}
                    <div className="flex gap-4 mt-3">
                        <FcGoogle size={30} className="shadow-md rounded-full cursor-pointer" />
                        <Image src="/microsoft-logo.jpeg" alt="ms-logo" width={30} height={30} className="shadow-md rounded-full cursor-pointer" />
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SignUpPage;
