"use client"
import React from 'react'
import { FcGoogle } from "react-icons/fc";
import Image from 'next/image';
import { useRouter } from 'next/navigation';
const LoginRight = () => {
    const router = useRouter();
    return (
        <div className='h-screen w-1/2 flex flex-col justify-center items-center text-white border-2 rounded-r-2xl'>
            <h1 className='text-4xl text-loginBlue font-semibold'>Welcome Back!</h1>
            <h4 className='font-light text-sm text-loginBlue'>Signin to your ZM QR Code account.</h4>
            <form action="" className="flex flex-col items-center mt-8">
                {/* Buttons Row */}
                <div className="flex w-[20rem] justify-between">
                    <button
                        onClick={() => router.push('/signup')}
                        type="button"
                        className="w-auto text-sm bg-[#e6e6e6] text-[#001a1a] px-6 py-2 rounded-sm transition duration-300 hover:bg-[#d4d4d4] cursor-pointer"
                    >
                        I'm a new user
                    </button>
                    <button
                        type="button"
                        className="w-auto text-sm bg-[#e6e6e6] text-[#001a1a] px-6 py-2 rounded-sm transition duration-300 hover:bg-[#c0c0c0] cursor-pointer"
                    >
                        I'm an existing user
                    </button>
                </div>

                {/* Input Row */}
                <div className="relative w-[20rem] mt-3">
                    <input
                        type="text"
                        id="email"
                        placeholder=" "
                        className="peer w-full border-2 border-gray-300 rounded-sm px-1 pt-2 pb-2 text-gray-800 focus:outline-none focus:border-[#008080]"
                    />
                    <label
                        htmlFor="email"
                        className="absolute left-3 -top-2 bg-white px-1 text-sm text-gray-500 transition-all 
                        peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 
                        peer-focus:-top-2 peer-focus:text-sm peer-focus:text-[#001a1a] peer-focus:bg-white"
                    >
                        Official Email / Login ID*
                    </label>
                </div>
                <div className="relative w-[20rem] mt-3">
                    <input
                        type="text"
                        id="email"
                        placeholder=" "
                        className="peer w-full border-2 border-gray-300 rounded-sm px-1 pt-2 pb-2 text-gray-800 focus:outline-none focus:border-[#008080]"
                    />
                    <label
                        htmlFor="password"
                        className="absolute left-3 -top-2 bg-white px-1 text-sm text-gray-500 transition-all 
                        peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 
                        peer-focus:-top-2 peer-focus:text-sm peer-focus:text-[#001a1a] peer-focus:bg-white"
                    >
                        Password*
                    </label>
                </div>
                <div className="relative w-[20rem] mt-3">
                    <input type="checkbox" className='border-2 border-mainGreen' />
                    <label className='text-sm text-[#001a1a] ml-2'>Remember me on this browser</label>
                </div>
                <button className='w-[20rem] bg-[#008080] text-white font-medium px-6 py-2 rounded-sm mt-5 transition duration-300 hover:bg-[#DF8788] cursor-pointer'>
                    Done
                </button>
                <p className='text-sm text-[#001a1a] mt-5'>or</p>
                <div className="login-through flex gap-[1rem]">
                    <FcGoogle size={30} className='my-2 shadow-md  rounded-full cursor-pointer' />
                    <Image src="/microsoft-logo.jpeg" alt="ms-logo" width={30} height={30} className='my-2 shadow-md rounded-full cursor-pointer' />
                </div>
            </form>
        </div>
    )
}

export default LoginRight
