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
//      const [showPassword, setShowPassword] = useState(false);

//     // Optional: Close modal on outside click
//     useEffect(() => {
//         function handleClickOutside(event) {
//             if (modalRef.current && !modalRef.current.contains(event.target)) {
//                 router.push('/'); // Redirect to home or any other page
//             }
//         }
//         document.addEventListener('mousedown', handleClickOutside);
//         return () => document.removeEventListener('mousedown', handleClickOutside);
//     }, [router]);

//     return (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
//             <div
//                 ref={modalRef}
//                 className="relative flex flex-col md:flex-row bg-white text-[#001a1a] rounded-2xl shadow-2xl w-full max-w-4xl"
//             >
//                 {/* Close Button */}
//                 <button
//                     onClick={() => router.push('/')}
//                     className="absolute top-4 right-4 text-2xl text-gray-400 hover:text-gray-700 z-10"
//                     aria-label="Close"
//                 >
//                     &times;
//                 </button>

//                 {/* Left Section */}
//                 <div className="bg-mainGreen md:w-1/2 w-full flex flex-col justify-center items-center text-white p-6 md:rounded-l-2xl">
//                     <Image src="/logo.svg" alt="logo" width={120} height={120} className="m-5" />
//                     <h1 className="text-xl font-semibold text-center px-4">
//                         World's No.1 QR Code Generating and Managing Platform
//                     </h1>
//                     <Image src="/qr-image-login.png" alt="qr-image" width={400} height={400} className="m-5" />
//                     <h4 className="text-md font-thin text-center px-4">
//                         Trusted by the World's Top Brands.
//                     </h4>
//                 </div>

//                 {/* Right Section */}
//                 <div className="md:w-1/2 w-full flex flex-col justify-center items-center bg-white text-[#001a1a] p-6 md:rounded-r-2xl">
//                     <h1 className="text-3xl text-loginBlue font-semibold text-center">Welcome Back!</h1>
//                     <h4 className="font-light text-sm text-loginBlue text-center mt-1">Sign in to your ZM QR Code account</h4>

//                     <form className="flex flex-col items-center mt-6 w-full max-w-sm">
//                         {/* Buttons Row */}
//                         <div className="flex justify-between w-full gap-2 mb-4">
//                             <button
//                                 onClick={() => {
//                                     setActive('new');
//                                     router.push('/signup');
//                                 }}
//                                 type="button"
//                                 className={`flex-1 text-sm bg-[#e6e6e6] text-[#001a1a] px-4 py-2 rounded-sm hover:bg-[#d4d4d4] transition-all duration-300 ${active === 'new' ? 'border-b-4 border-[#008080]' : 'border-b-4 border-transparent cursor-pointer'
//                                     }`}
//                             >
//                                 I'm a new user
//                             </button>
//                             <button
//                                 onClick={() => setActive('existing')}
//                                 type="button"
//                                 className={`flex-1 text-sm bg-[#e6e6e6] text-[#001a1a] px-4 py-2 rounded-sm hover:bg-[#c0c0c0] transition-all duration-300 ${active === 'existing' ? 'border-b-4 border-[#008080]' : 'border-b-4 border-transparent cursor-pointer'
//                                     }`}
//                             >
//                                 I'm an existing user
//                             </button>
//                         </div>

//  {[
//         { id: "email", label: "Official Email / Login ID*", type: "text" },
//         { id: "password", label: "Password*", type: "password" },
//       ].map((input) => (
//         <div className="relative w-full mt-3" key={input.id}>
//           <input
//             type={input.type === "password" && showPassword ? "text" : input.type}
//             id={input.id}
//             placeholder=" "
//             className="peer w-full border-2 border-gray-300 rounded-sm px-2 pt-4 pb-2 text-gray-800 focus:outline-none focus:border-[#008080]"
//           />
//           <label
//             htmlFor={input.id}
//             className="absolute left-3 -top-2 bg-white px-1 text-sm text-gray-500 transition-all 
//               peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 
//               peer-focus:-top-2 peer-focus:text-sm peer-focus:text-[#001a1a] peer-focus:bg-white"
//           >
//             {input.label}
//           </label>

//           {input.type === "password" && (
//             <button
//               type="button"
//               onClick={() => setShowPassword((prev) => !prev)}
//               className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 focus:outline-none"
//             >
//               {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
//             </button>
//           )}
//         </div>
//       ))}
   

//                     {/* Checkboxes */}
//                     <div className="flex items-start mt-3 w-full gap-2 text-sm">
//                         <input type="checkbox" className="border-2 border-mainGreen mt-1" />
//                         <label>I agree to <span className="text-mainGreen">terms</span> and <span className="text-mainGreen">privacy</span> policy</label>
//                     </div>
//                     <div className="flex items-start mt-2 w-full gap-2 text-sm">
//                         <input type="checkbox" className="border-2 border-mainGreen mt-1" />
//                         <label>Remember me on this browser</label>
//                     </div>

//                         {/* Submit */}
//                         <button
//                             type="submit"
//                             className="w-full my-2 relative overflow-hidden text-white font-medium px-6 py-2 rounded-sm transition duration-300 bg-[#008080] hover:bg-[#DF8788] group"
//                         >
//                             <span className="relative z-10">Done</span>
//                             <span
//                                 className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent 
//                     translate-x-[-100%] group-hover:translate-x-[100%] 
//                     transition-transform duration-[1200ms] ease-in-out"
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
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Head from 'next/head';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [isAnimating, setIsAnimating] = useState(false);

  const navigateTo = (path) => {
    setIsAnimating(true);
    setTimeout(() => {
      router.push(path);
    }, 800);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      router.push('/dashboard');
    } catch (err) {
      setError(err.message || 'Login failed');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <Head>
        <title>Login | Your App</title>
      </Head>
      
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 animate-fade-in">
          Sign in to your account
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600 animate-fade-in">
          Or{' '}
          <button
            onClick={() => navigateTo('/auth/signup')}
            className="font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none transition-all duration-300 transform hover:scale-105"
          >
            create a new account
          </button>
        </p>
      </div>

      <div className={`mt-8 sm:mx-auto sm:w-full sm:max-w-md ${isAnimating ? 'animate-fade-out' : 'animate-fade-in'}`}>
        <div className="bg-white py-8 px-4 shadow-xl sm:rounded-lg sm:px-10 transition-all duration-700 transform hover:shadow-2xl">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {error && (
              <div className="rounded-md bg-red-50 p-4 mb-4 animate-shake">
                <div className="flex">
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-red-800">{error}</h3>
                  </div>
                </div>
              </div>
            )}

            <div className="animate-slide-in">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-all duration-200"
                />
              </div>
            </div>

            <div className="animate-slide-in-delay">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-all duration-200"
                />
              </div>
            </div>

            <div className="flex items-center justify-between animate-fade-in">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                  Forgot your password?
                </a>
              </div>
            </div>

            <div className="animate-fade-in">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-300 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Signing in...
                  </>
                ) : 'Sign in'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}