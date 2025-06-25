// 'use client';
// import React, { useState, useRef, useEffect } from 'react';
// import Image from 'next/image';
// import { useRouter } from 'next/navigation';
// import { FcGoogle } from 'react-icons/fc';
// import { FiEye, FiEyeOff } from "react-icons/fi";

// export default function LoginPage() {
//     const router = useRouter();
//     const [active, setActive] = useState('existing');
//     const modalRef = useRef(null);
//     const [showPassword, setShowPassword] = useState(false);

//     useEffect(() => {
//         function handleClickOutside(event) {
//             if (modalRef.current && !modalRef.current.contains(event.target)) {
//                 router.push('/');
//             }
//         }
//         document.addEventListener('mousedown', handleClickOutside);
//         return () => document.removeEventListener('mousedown', handleClickOutside);
//     }, [router]);

//     return (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
//             <div
//                 ref={modalRef}
//                 className="relative flex flex-col md:flex-row bg-white text-[#001a1a] rounded-2xl shadow-2xl w-full max-w-4xl"
//             >
//                 {/* Close Button */}
//                 <button
//                     onClick={() => router.push('/')}
//                     className="absolute top-4 right-4 text-2xl text-[#001a1a] font-bold cursor-pointer hover:text-gray-700 z-10"
//                     aria-label="Close"
//                 >
//                     &times;
//                 </button>

//                 {/* Left Section */}
//                 <div className="bg-mainGreen md:w-1/2 w-full flex flex-col justify-center items-center text-white p-6 rounded-t-2xl md:rounded-l-2xl md:rounded-tr-none">
//                     <Image src="/logo.svg" alt="logo" width={100} height={100} className="m-4 w-24 md:w-32" />
//                     <h1 className="text-lg md:text-xl font-semibold text-center px-4 animate-bounce">
//                         🔐 Trust us with your data. It's not just secure — it's encrypted 🔐
//                     </h1>
//                     <Image
//                         src="/qr-image-login.png"
//                         alt="qr-image"
//                         width={300}
//                         height={300}
//                         className="m-4 w-60 md:w-80 h-auto"
//                     />
//                     <h4 className="text-sm font-thin text-center px-4">
//                         India's No.1 QR Code Generating and Managing Platform
//                     </h4>
//                 </div>

//                 {/* Right Section */}
//                 <div className="md:w-1/2 w-full flex flex-col justify-center items-center bg-white text-[#001a1a] p-6 rounded-b-2xl md:rounded-r-2xl md:rounded-bl-none">
//                     <h1 className="text-2xl md:text-3xl text-loginBlue font-semibold text-center">Welcome Back!</h1>
//                     <h4 className="font-light text-sm md:text-base text-loginBlue text-center mt-1">
//                         Sign in to your ZM QR Code account
//                     </h4>

//                     <form className="flex flex-col items-center mt-6 w-full max-w-sm">
//                         {/* Buttons Row */}
//                         <div className="flex flex-col sm:flex-row justify-between w-full gap-2 mb-4">
//                             <button
//                                 onClick={() => {
//                                     setActive('new');
//                                     router.push('/signup');
//                                 }}
//                                 type="button"
//                                 className={`flex-1 text-sm bg-[#e6e6e6] text-[#001a1a] px-4 py-2 rounded-sm hover:bg-[#d4d4d4] transition-all duration-300 ${
//                                     active === 'new' ? 'border-b-4 border-[#008080]' : 'border-b-4 border-transparent'
//                                 }`}
//                             >
//                                 I'm a new user
//                             </button>
//                             <button
//                                 onClick={() => setActive('existing')}
//                                 type="button"
//                                 className={`flex-1 text-sm bg-[#e6e6e6] text-[#001a1a] px-4 py-2 rounded-sm hover:bg-[#c0c0c0] transition-all duration-300 ${
//                                     active === 'existing' ? 'border-b-4 border-[#008080]' : 'border-b-4 border-transparent'
//                                 }`}
//                             >
//                                 I'm an existing user
//                             </button>
//                         </div>

//                         {/* Input Fields */}
//                         {[
//                             { id: 'email', label: 'Official Email / Login ID*', type: 'text' },
//                             { id: 'password', label: 'Password*', type: 'password' }
//                         ].map((input) => (
//                             <div className="relative w-full mt-3" key={input.id}>
//                                 <input
//                                     type={input.type === 'password' && showPassword ? 'text' : input.type}
//                                     id={input.id}
//                                     placeholder=" "
//                                     className="peer w-full border-2 border-gray-300 rounded-sm px-2 pt-4 pb-2 text-gray-800 focus:outline-none focus:border-[#008080]"
//                                 />
//                                 <label
//                                     htmlFor={input.id}
//                                     className="absolute left-3 -top-2 bg-white px-1 text-sm text-gray-500 transition-all 
//                                         peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 
//                                         peer-focus:-top-2 peer-focus:text-sm peer-focus:text-[#001a1a] peer-focus:bg-white"
//                                 >
//                                     {input.label}
//                                 </label>

//                                 {input.type === 'password' && (
//                                     <button
//                                         type="button"
//                                         onClick={() => setShowPassword((prev) => !prev)}
//                                         className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 focus:outline-none"
//                                     >
//                                         {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
//                                     </button>
//                                 )}
//                             </div>
//                         ))}

//                         {/* Checkboxes */}
//                         <div className="flex items-start mt-3 w-full gap-2 text-sm">
//                             <input type="checkbox" className="border-2 border-mainGreen mt-1" />
//                             <label>
//                                 I agree to <span className="text-mainGreen">terms</span> and{' '}
//                                 <span className="text-mainGreen">privacy</span> policy
//                             </label>
//                         </div>
//                         <div className="flex items-start mt-2 w-full gap-2 text-sm">
//                             <input type="checkbox" className="border-2 border-mainGreen mt-1" />
//                             <label>Remember me on this browser</label>
//                         </div>

//                         {/* Submit */}
//                         <button
//                             type="submit"
//                             className="w-full my-4 relative overflow-hidden text-white font-medium px-6 py-2 rounded-sm transition duration-300 bg-[#008080] hover:bg-[#DF8788] group"
//                         >
//                             <span className="relative z-10">Done</span>
//                             <span
//                                 className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent 
//                                 translate-x-[-100%] group-hover:translate-x-[100%] 
//                                 transition-transform duration-[1200ms] ease-in-out"
//                             />
//                         </button>

//                         {/* Alternative login */}
//                         <p className="text-sm text-[#001a1a] mt-4">or</p>
//                         <div className="flex gap-4 mt-2">
//                             <FcGoogle size={30} className="cursor-pointer hover:scale-105 transition" />
//                             <Image
//                                 src="/microsoft-logo.jpeg"
//                                 alt="ms-logo"
//                                 width={30}
//                                 height={30}
//                                 className="rounded-full cursor-pointer hover:scale-105 transition"
//                             />
//                         </div>
//                     </form>
//                 </div>
//             </div>
//         </div>
//     );
// }


'use client';
import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { FcGoogle } from 'react-icons/fc';
import { FiEye, FiEyeOff } from "react-icons/fi";

export default function LoginPage() {
    const router = useRouter();
    const [active, setActive] = useState('existing');
    const modalRef = useRef(null);
    const [showPassword, setShowPassword] = useState(false);

    // useEffect(() => {
    //     function handleClickOutside(event) {
    //         if (modalRef.current && !modalRef.current.contains(event.target)) {
    //             router.push('/');
    //         }
    //     }
    //     document.addEventListener('mousedown', handleClickOutside);
    //     return () => document.removeEventListener('mousedown', handleClickOutside);
    // }, [router]);

    useEffect(() => {
    function handleClickOutside(event) {
        if (modalRef.current && !modalRef.current.contains(event.target)) {
            router.push('/');
        }
    }

    function handleEscapeKey(event) {
        if (event.key === 'Escape') {
            router.push('/');
        }
    }

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscapeKey);

    return () => {
        document.removeEventListener('mousedown', handleClickOutside);
        document.removeEventListener('keydown', handleEscapeKey);
    };
}, [router]);

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

                {/* Left Section - Hidden on small screens */}
                <div className="hidden md:flex bg-mainGreen md:w-1/2 flex-col justify-center items-center text-white p-6 rounded-l-2xl">
                    <Image src="/logo.svg" alt="logo" width={100} height={100} className="m-4 w-24 md:w-32" />
                    <h1 className="text-lg md:text-xl font-semibold text-center px-4 animate-bounce">
                        🔐 Trust us with your data. It's not just secure — it's encrypted 🔐
                    </h1>
                    <Image
                        src="/qr-image-login.png"
                        alt="qr-image"
                        width={300}
                        height={300}
                        className="m-4 w-60 md:w-80 h-auto"
                    />
                    <h4 className="text-sm font-thin text-center px-4">
                        India's No.1 QR Code Generating and Managing Platform
                    </h4>
                </div>

                {/* Right Section - Full form rounded on all sides */}
                <div className="w-full md:w-1/2 flex flex-col justify-center items-center bg-white text-[#001a1a] p-6 rounded-2xl md:rounded-r-2xl">
                    <h1 className="text-2xl md:text-3xl text-loginBlue font-semibold text-center">Welcome Back!</h1>
                    <h4 className="font-light text-sm md:text-base text-loginBlue text-center mt-1">
                        Sign in to your ZM QR Code account
                    </h4>

                    <form className="flex flex-col items-center mt-6 w-full max-w-sm">
                        {/* Buttons Row */}
                        <div className="flex flex-col sm:flex-row justify-between w-full gap-2 mb-4">
                            <button
                                onClick={() => {
                                    setActive('new');
                                    router.push('/signup');
                                }}
                                type="button"
                                className={`flex-1 text-sm bg-[#e6e6e6] text-[#001a1a] px-4 py-2 rounded-sm hover:bg-[#d4d4d4] transition-all duration-300 ${
                                    active === 'new' ? 'border-b-4 border-[#008080]' : 'border-b-4 border-transparent cursor-pointer'
                                }`}
                            >
                                I'm a new user
                            </button>
                            <button
                                onClick={() => setActive('existing')}
                                type="button"
                                className={`flex-1 text-sm bg-[#e6e6e6] text-[#001a1a] px-4 py-2 rounded-sm hover:bg-[#c0c0c0] transition-all duration-300 ${
                                    active === 'existing' ? 'border-b-4 border-[#008080]' : 'border-b-4 border-transparent cursor-pointer'
                                }`}
                            >
                                I'm an existing user
                            </button>
                        </div>

                        {/* Input Fields */}
                        {[
                            { id: 'email', label: 'Official Email / Login ID*', type: 'text' },
                            { id: 'password', label: 'Password*', type: 'password' }
                        ].map((input) => (
                            <div className="relative w-full mt-3" key={input.id}>
                                <input
                                    type={input.type === 'password' && showPassword ? 'text' : input.type}
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

                                {input.type === 'password' && (
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword((prev) => !prev)}
                                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 focus:outline-none"
                                    >
                                        {showPassword ? <FiEye size={18} /> : <FiEyeOff size={18} />}
                                    </button>
                                )}
                            </div>
                        ))}

                        {/* Checkboxes */}
                        <div className="flex items-start mt-3 w-full gap-2 text-sm">
                            <input type="checkbox" defaultChecked className="border-2 border-mainGreen mt-1" />
                            <label>I agree to <a href="/terms-conditions" target="_blank"><span className="text-mainGreen">terms</span></a> and <a href="/privacy-policies" target="_blank"><span className="text-mainGreen">privacy</span></a> policy</label>
                        </div>
                        {/* Submit */}
                        <button
                            type="submit"
                            className="w-full my-4 relative overflow-hidden text-white font-medium px-6 py-2 rounded-sm transition duration-300 bg-[#008080] hover:bg-[#DF8788] group"
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
        </div>
    );
}