// 'use client';
// import React, { useState, useRef, useEffect } from 'react';
// import Image from 'next/image';
// import { useRouter } from 'next/navigation';
// import { FcGoogle } from 'react-icons/fc';
// import { FiEye, FiEyeOff } from "react-icons/fi";

// export default function LoginPage() {
//     const [visiblePasswords, setVisiblePasswords] = useState({
//         password: false,
//         cpassword: false,
//     });
//     const router = useRouter();
//     const [active, setActive] = useState('new');
//     const modalRef = useRef(null);

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

//     const toggleVisibility = (id) => {
//         setVisiblePasswords((prev) => ({ ...prev, [id]: !prev[id] }));
//     };

//     return (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
//             <div
//                 ref={modalRef}
//                 className="relative flex flex-col md:flex-row bg-white text-[#001a1a] rounded-2xl shadow-2xl w-full max-w-4xl"
//             >
//                 {/* Close Button */}
//                 <button
//                     onClick={() => router.push('/')}
//                     className="absolute top-4 right-4 text-2xl text-white font-bold cursor-pointer hover:text-gray-700 z-10"
//                     aria-label="Close"
//                 >
//                     &times;
//                 </button>

//                 {/* Left Section
//                 <div className="bg-mainGreen md:w-1/2 w-full flex flex-col justify-center items-center text-white p-6 md:rounded-l-2xl">
//                     <Image src="/logo.svg" alt="logo" width={120} height={120} className="m-5" />
//                     <h1 className="text-xl font-semibold text-center px-4">
//                         World's No.1 QR Code Generating and Managing Platform
//                     </h1>
//                     <Image src="/qr-image-login.png" alt="qr-image" width={400} height={400} className="m-5" />
//                     <h4 className="text-md font-thin text-center px-4">
//                         Trusted by the World's Top Brands.
//                     </h4>
//                 </div> */}
//                 {/* Right Section */}
//                 <div className="md:w-1/2 w-full flex flex-col justify-center items-center bg-white text-[#001a1a] p-6 md:rounded-l-2xl">
//                     <h1 className="text-3xl text-loginBlue font-semibold text-center">Welcome!</h1>
//                     <h4 className="font-light text-sm text-loginBlue text-center mt-1">Sign in to your ZM QR Code account</h4>

//                     <form className="flex flex-col items-center mt-6 w-full max-w-sm">
//                         {/* Buttons Row */}
//                         <div className="flex justify-between w-full gap-2 mb-4">
//                             <button
//                                 onClick={() => {
//                                     setActive('new');
//                                 }}
//                                 type="button"
//                                 className={`flex-1 text-sm bg-[#e6e6e6] text-[#001a1a] px-4 py-2 rounded-sm hover:bg-[#d4d4d4] transition-all duration-300 ${active === 'new' ? 'border-b-4 border-[#008080]' : 'border-b-4 border-transparent cursor-pointer'
//                                     }`}
//                             >
//                                 I'm a new user
//                             </button>
//                             <button
//                                 onClick={() => {
//                                     setActive('existing');
//                                     router.push('/login')
//                                 }}
//                                 type="button"
//                                 className={`flex-1 text-sm bg-[#e6e6e6] text-[#001a1a] px-4 py-2 rounded-sm hover:bg-[#c0c0c0] transition-all duration-300 ${active === 'existing' ? 'border-b-4 border-[#008080]' : 'border-b-4 border-transparent cursor-pointer'
//                                     }`}
//                             >
//                                 I'm an existing user
//                             </button>
//                         </div>

//                         {[
//                             { id: "name", label: "Name*", type: "text" },
//                             { id: "email", label: "Official Email / Login ID*", type: "text" },
//                             { id: "phone", label: "Phone Number*", type: "text" },
//                             { id: "password", label: "Password*", type: "password" },
//                             { id: "cpassword", label: "Confirm password*", type: "password" },
//                         ].map((input) => (
//                             <div className="relative w-full mt-3" key={input.id}>
//                                 <input
//                                     type={
//                                         input.type === "password" && visiblePasswords[input.id]
//                                             ? "text"
//                                             : input.type
//                                     }
//                                     id={input.id}
//                                     placeholder=" "
//                                     className="peer w-full border-2 border-gray-300 rounded-sm px-2 pt-4 pb-2 text-gray-800 focus:outline-none focus:border-[#008080]"
//                                 />
//                                 <label
//                                     htmlFor={input.id}
//                                     className="absolute left-3 -top-2 bg-white px-1 text-sm text-gray-500 transition-all 
//               peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 
//               peer-focus:-top-2 peer-focus:text-sm peer-focus:text-[#001a1a] peer-focus:bg-white"
//                                 >
//                                     {input.label}
//                                 </label>

//                                 {input.type === "password" && (
//                                     <button
//                                         type="button"
//                                         onClick={() => toggleVisibility(input.id)}
//                                         className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
//                                     >
//                                         {visiblePasswords[input.id] ? (
//                                             <FiEyeOff size={18} />
//                                         ) : (
//                                             <FiEye size={18} />
//                                         )}
//                                     </button>
//                                 )}
//                             </div>
//                         ))}

//                         {/* Checkboxes */}
//                         <div className="flex items-start mt-3 w-full gap-2 text-sm">
//                             <input type="checkbox" defaultChecked className="border-2 border-mainGreen mt-1" />
//                             <label>I agree to <a href="/terms-conditions" target="_blank"><span className="text-mainGreen">terms</span></a> and <a href="/privacy-policies" target="_blank"><span className="text-mainGreen">privacy</span></a> policy</label>
//                         </div>
//                         {/* <div className="flex items-start mt-2 w-full gap-2 text-sm">
//                             <input type="checkbox" className="border-2 border-mainGreen mt-1" />
//                             <label>Remember me on this browser</label>
//                         </div> */}
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

//                 {/* Left Section */}
//                 <div className="bg-mainGreen md:w-1/2 w-full flex flex-col justify-center items-center text-white p-6 md:rounded-r-2xl">
//                     <Image src="/logos/zm-full.jpg" alt="logo" width={150} height={150} className="m-5 mb-10" />
//                     <h1 className="text-xl font-semibold text-center px-4 animate-bounce">
//                         🔐 Trust us with your data. It's not just secure — it's encrypted 🔐
//                     </h1>
//                     <Image src="/qr-image-login.png" alt="qr-image" width={400} height={400} className="m-5" />
//                     <h4 className="text-md font-thin text-center px-4">
//                         India's No.1 QR Code Generating and Managing Platform
//                     </h4>
//                 </div>
//             </div>
//         </div>
//     );
// }


// 'use client';
// import React, { useState, useRef, useEffect } from 'react';
// import Image from 'next/image';
// import { useRouter } from 'next/navigation';
// import { FcGoogle } from 'react-icons/fc';
// import { FiEye, FiEyeOff } from "react-icons/fi";

// export default function LoginPage() {
//     const [visiblePasswords, setVisiblePasswords] = useState({
//         password: false,
//         cpassword: false,
//     });

//     const router = useRouter();
//     const [active, setActive] = useState('new');
//     const modalRef = useRef(null);

//     useEffect(() => {
//     function handleClickOutside(event) {
//         if (modalRef.current && !modalRef.current.contains(event.target)) {
//             router.push('/');
//         }
//     }

//     function handleEscapeKey(event) {
//         if (event.key === 'Escape') {
//             router.push('/');
//         }
//     }

//     document.addEventListener('mousedown', handleClickOutside);
//     document.addEventListener('keydown', handleEscapeKey);

//     return () => {
//         document.removeEventListener('mousedown', handleClickOutside);
//         document.removeEventListener('keydown', handleEscapeKey);
//     };
// }, [router]);
//     const toggleVisibility = (id) => {
//         setVisiblePasswords((prev) => ({ ...prev, [id]: !prev[id] }));
//     };

//     return (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
//             <div
//                 ref={modalRef}
//                 className="relative flex flex-col md:flex-row bg-white text-[#001a1a] rounded-2xl shadow-2xl w-full max-w-5xl"
//             >
//                 {/* Close Button */}
//                 <button
//                     onClick={() => router.push('/')}
//                     className="absolute top-4 right-4 text-2xl text-[#001a1a] font-bold cursor-pointer hover:text-gray-700 z-10"
//                     aria-label="Close"
//                 >
//                     &times;
//                 </button>

//                 {/* Right Section (Form) */}
//                 <div className="w-full rounded-2xl md:w-1/2 flex flex-col justify-center items-center bg-white text-[#001a1a] p-6 md:rounded-l-2xl">
//                     <h1 className="text-3xl text-loginBlue font-semibold text-center">Welcome!</h1>
//                     <h4 className="font-light text-sm text-loginBlue text-center mt-1">Sign in to your ZM QR Code account</h4>

//                     <form className="flex flex-col items-center mt-6 w-full max-w-sm">
//                         {/* Buttons Row */}
//                         <div className="flex justify-between w-full gap-2 mb-4">
//                             <button
//                                 onClick={() => setActive('new')}
//                                 type="button"
//                                 className={`flex-1 text-sm bg-[#e6e6e6] text-[#001a1a] px-4 py-2 rounded-sm hover:bg-[#d4d4d4] transition-all duration-300 ${active === 'new' ? 'border-b-4 border-[#008080]' : 'border-b-4 border-transparent cursor-pointer'}`}
//                             >
//                                 I'm a new user
//                             </button>
//                             <button
//                                 onClick={() => {
//                                     setActive('existing');
//                                     router.push('/login');
//                                 }}
//                                 type="button"
//                                 className={`flex-1 text-sm bg-[#e6e6e6] text-[#001a1a] px-4 py-2 rounded-sm hover:bg-[#c0c0c0] transition-all duration-300 ${active === 'existing' ? 'border-b-4 border-[#008080]' : 'border-b-4 border-transparent cursor-pointer'}`}
//                             >
//                                 I'm an existing user
//                             </button>
//                         </div>

//                         {[
//                             { id: "name", label: "Name*", type: "text" },
//                             { id: "email", label: "Official Email / Login ID*", type: "text" },
//                             { id: "phone", label: "Phone Number*", type: "text" },
//                             { id: "password", label: "Password*", type: "password" },
//                             { id: "cpassword", label: "Confirm password*", type: "password" },
//                         ].map((input) => (
//                             <div className="relative w-full mt-3" key={input.id}>
//                                 <input
//                                     type={
//                                         input.type === "password" && visiblePasswords[input.id]
//                                             ? "text"
//                                             : input.type
//                                     }
//                                     id={input.id}
//                                     placeholder=" "
//                                     className="peer w-full border-2 border-gray-300 rounded-sm px-2 pt-4 pb-2 text-gray-800 focus:outline-none focus:border-[#008080]"
//                                 />
//                                 <label
//                                     htmlFor={input.id}
//                                     className="absolute left-3 -top-2 bg-white px-1 text-sm text-gray-500 transition-all 
//                                     peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 
//                                     peer-focus:-top-2 peer-focus:text-sm peer-focus:text-[#001a1a] peer-focus:bg-white"
//                                 >
//                                     {input.label}
//                                 </label>

//                                 {input.type === "password" && (
//                                     <button
//                                         type="button"
//                                         onClick={() => toggleVisibility(input.id)}
//                                         className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
//                                     >
//                                         {visiblePasswords[input.id] ? (
//                                             <FiEye size={18} />
//                                         ) : (
//                                             <FiEyeOff size={18} />
//                                         )}
//                                     </button>
//                                 )}
//                             </div>
//                         ))}

//                         {/* Checkbox */}
//                         <div className="flex items-start mt-3 w-full gap-2 text-sm">
//                             <input type="checkbox" defaultChecked className="border-2 border-mainGreen mt-1" />
//                             <label>
//                                 I agree to <a href="/terms-conditions" target="_blank"><span className="text-mainGreen">terms</span></a> and <a href="/privacy-policies" target="_blank"><span className="text-mainGreen">privacy</span></a> policy
//                             </label>
//                         </div>

//                         {/* Submit Button */}
//                         <button
//                             type="submit"
//                             className="w-full my-2 relative overflow-hidden text-white font-medium px-6 py-2 rounded-sm transition duration-300 bg-[#008080] hover:bg-[#DF8788] group"
//                         >
//                             <span className="relative z-10">Done</span>
//                             <span
//                                 className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent 
//                                 translate-x-[-100%] group-hover:translate-x-[100%] 
//                                 transition-transform duration-[1200ms] ease-in-out"
//                             />
//                         </button>

//                         {/* Social Logins */}
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

//                 {/* Left Section - Only Visible on md+ screens */}
//                 <div className="hidden md:flex bg-mainGreen md:w-1/2 flex-col justify-center items-center text-white p-6 md:rounded-r-2xl">
//                     <Image src="/logos/zm-full.jpg" alt="logo" width={150} height={150} className="m-5 mb-10" />
//                     <h1 className="text-xl font-semibold text-center px-4 animate-bounce">
//                         🔐 Trust us with your data. It's not just secure — it's encrypted 🔐
//                     </h1>
//                     <Image src="/qr-image-login.png" alt="qr-image" width={400} height={400} className="m-5" />
//                     <h4 className="text-md font-thin text-center px-4">
//                         India's No.1 QR Code Generating and Managing Platform
//                     </h4>
//                 </div>
//             </div>
//         </div>
//     );
// }


// 'use client';
// import React, { useState, useRef, useEffect } from 'react';
// import Image from 'next/image';
// import { useRouter } from 'next/navigation';
// import axios from 'axios';
// import { FcGoogle } from 'react-icons/fc';
// import { FiEye, FiEyeOff } from "react-icons/fi";

// export default function SignupPage() {
//     const [formData, setFormData] = useState({
//         name: '',
//         email: '',
//         phone: '',
//         password: '',
//         cpassword: ''
//     });

//     const [visiblePasswords, setVisiblePasswords] = useState({
//         password: false,
//         cpassword: false,
//     });

//     const [loading, setLoading] = useState(false);
//     const [errorMsg, setErrorMsg] = useState('');
//     const [successMsg, setSuccessMsg] = useState('');

//     const router = useRouter();
//     const [active, setActive] = useState('new');
//     const modalRef = useRef(null);

//     useEffect(() => {
//         function handleClickOutside(event) {
//             if (modalRef.current && !modalRef.current.contains(event.target)) {
//                 router.push('/');
//             }
//         }

//         function handleEscapeKey(event) {
//             if (event.key === 'Escape') {
//                 router.push('/');
//             }
//         }

//         document.addEventListener('mousedown', handleClickOutside);
//         document.addEventListener('keydown', handleEscapeKey);
//         return () => {
//             document.removeEventListener('mousedown', handleClickOutside);
//             document.removeEventListener('keydown', handleEscapeKey);
//         };
//     }, [router]);

//     const toggleVisibility = (id) => {
//         setVisiblePasswords((prev) => ({ ...prev, [id]: !prev[id] }));
//     };

//     const handleChange = (e) => {
//         setFormData((prev) => ({ ...prev, [e.target.id]: e.target.value }));
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setErrorMsg('');
//         setSuccessMsg('');
//         setLoading(true);

//         try {
//             const response = await axios.post('/api/signup', formData);
//             setSuccessMsg('Signup successful! Redirecting to login...');
//             setTimeout(() => router.push('/login'), 2000);
//         } catch (error) {
//             setErrorMsg(error.response?.data?.error || 'Something went wrong!');
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
//             <div ref={modalRef} className="relative flex flex-col md:flex-row bg-white text-[#001a1a] rounded-2xl shadow-2xl w-full max-w-5xl">
//                 {/* Close Button */}
//                 <button
//                     onClick={() => router.push('/')}
//                     className="absolute top-4 right-4 text-2xl text-[#001a1a] font-bold cursor-pointer hover:text-gray-700 z-10"
//                     aria-label="Close"
//                 >
//                     &times;
//                 </button>

//                 {/* Right Section (Form) */}
//                 <div className="w-full rounded-2xl md:w-1/2 flex flex-col justify-center items-center bg-white text-[#001a1a] p-6 md:rounded-l-2xl">
//                     <h1 className="text-3xl text-loginBlue font-semibold text-center">Welcome!</h1>
//                     <h4 className="font-light text-sm text-loginBlue text-center mt-1">Sign in to your ZM QR Code account</h4>

//                     <form onSubmit={handleSubmit} className="flex flex-col items-center mt-6 w-full max-w-sm">
//                         {/* Buttons Row */}
//                         <div className="flex justify-between w-full gap-2 mb-4">
//                             <button
//                                 onClick={() => setActive('new')}
//                                 type="button"
//                                 className={`flex-1 text-sm bg-[#e6e6e6] text-[#001a1a] px-4 py-2 rounded-sm hover:bg-[#d4d4d4] transition-all duration-300 ${active === 'new' ? 'border-b-4 border-[#008080]' : 'border-b-4 border-transparent cursor-pointer'}`}
//                             >
//                                 I'm a new user
//                             </button>
//                             <button
//                                 onClick={() => {
//                                     setActive('existing');
//                                     router.push('/login');
//                                 }}
//                                 type="button"
//                                 className={`flex-1 text-sm bg-[#e6e6e6] text-[#001a1a] px-4 py-2 rounded-sm hover:bg-[#c0c0c0] transition-all duration-300 ${active === 'existing' ? 'border-b-4 border-[#008080]' : 'border-b-4 border-transparent cursor-pointer'}`}
//                             >
//                                 I'm an existing user
//                             </button>
//                         </div>

//                         {/* Form Fields */}
//                         {[
//                             { id: "name", label: "Name*", type: "text" },
//                             { id: "email", label: "Official Email / Login ID*", type: "text" },
//                             { id: "phone", label: "Phone Number*", type: "text" },
//                             { id: "password", label: "Password*", type: "password" },
//                             { id: "cpassword", label: "Confirm password*", type: "password" },
//                         ].map((input) => (
//                             <div className="relative w-full mt-3" key={input.id}>
//                                 <input
//                                     type={input.type === "password" && visiblePasswords[input.id] ? "text" : input.type}
//                                     id={input.id}
//                                     value={formData[input.id]}
//                                     onChange={handleChange}
//                                     placeholder=" "
//                                     className="peer w-full border-2 border-gray-300 rounded-sm px-2 pt-4 pb-2 text-gray-800 focus:outline-none focus:border-[#008080]"
//                                 />
//                                 <label
//                                     htmlFor={input.id}
//                                     className="absolute left-3 -top-2 bg-white px-1 text-sm text-gray-500 transition-all 
//                     peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 
//                     peer-focus:-top-2 peer-focus:text-sm peer-focus:text-[#001a1a] peer-focus:bg-white"
//                                 >
//                                     {input.label}
//                                 </label>

//                                 {input.type === "password" && (
//                                     <button
//                                         type="button"
//                                         onClick={() => toggleVisibility(input.id)}
//                                         className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
//                                     >
//                                         {visiblePasswords[input.id] ? <FiEye size={18} /> : <FiEyeOff size={18} />}
//                                     </button>
//                                 )}
//                             </div>
//                         ))}

//                         {/* Checkbox */}
//                         <div className="flex items-start mt-3 w-full gap-2 text-sm">
//                             <input type="checkbox" defaultChecked className="border-2 border-mainGreen mt-1" />
//                             <label>
//                                 I agree to <a href="/terms-conditions" target="_blank"><span className="text-mainGreen">terms</span></a> and <a href="/privacy-policies" target="_blank"><span className="text-mainGreen">privacy</span></a> policy
//                             </label>
//                         </div>

//                         {/* Error/Success */}
//                         {errorMsg && <p className="text-red-600 mt-2 text-sm">{errorMsg}</p>}
//                         {successMsg && <p className="text-green-600 mt-2 text-sm">{successMsg}</p>}

//                         {/* Submit Button */}
//                         <button
//                             type="submit"
//                             disabled={loading}
//                             className="w-full my-2 relative overflow-hidden text-white font-medium px-6 py-2 rounded-sm transition duration-300 bg-[#008080] hover:bg-[#DF8788] group"
//                         >
//                             <span className="relative z-10">{loading ? 'Processing...' : 'Done'}</span>
//                             <span
//                                 className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent 
//                 translate-x-[-100%] group-hover:translate-x-[100%] 
//                 transition-transform duration-[1200ms] ease-in-out"
//                             />
//                         </button>

//                         {/* Social Logins */}
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

//                 {/* Left Section */}
//                 <div className="hidden md:flex bg-mainGreen md:w-1/2 flex-col justify-center items-center text-white p-6 md:rounded-r-2xl">
//                     <Image src="/logos/zm-full.webp" alt="logo" width={150} height={150} className="m-5 mb-10" />
//                     <h1 className="text-xl font-semibold text-center px-4 animate-bounce">
//                         🔐 Trust us with your data. It's not just secure — it's encrypted 🔐
//                     </h1>
//                     <Image src="/qr-image-login.webp" alt="qr-image" width={400} height={400} className="m-5" />
//                     <h4 className="text-md font-thin text-center px-4">
//                         India's No.1 QR Code Generating and Managing Platform
//                     </h4>
//                 </div>
//             </div>
//         </div>
//     );
// }



'use client';
import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { FcGoogle } from 'react-icons/fc';
import { FaFacebook } from "react-icons/fa";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { signIn } from 'next-auth/react';

export default function SignupPage() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: ''
    });

    const [visiblePasswords, setVisiblePasswords] = useState({
        password: false,
        confirmPassword: false,
    });

    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');
    const [successMsg, setSuccessMsg] = useState('');
    const [agreeTerms, setAgreeTerms] = useState(true); // You can toggle default as false if needed

    const router = useRouter();
    const [active, setActive] = useState('new');
    const modalRef = useRef(null);

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

    const toggleVisibility = (id) => {
        setVisiblePasswords((prev) => ({ ...prev, [id]: !prev[id] }));
    };

    const handleChange = (e) => {
        setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };


    const handleSubmit = async (e) => {
        e.preventDefault();

        // Reset messages
        setErrorMsg('');
        setSuccessMsg('');

        const { name, email, phone, password, confirmPassword } = formData;

        // Basic empty field validation
        if (!name || !email || !phone || !password || !confirmPassword) {
            setErrorMsg('Please fill in all required fields.');
            return;
        }

        // Email format validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setErrorMsg('Please enter a valid email address.');
            return;
        }

        // Phone number format validation (10 digits only)
        const phoneRegex = /^\d{10}$/;
        if (!phoneRegex.test(phone)) {
            setErrorMsg('Please enter a valid 10-digit phone number.');
            return;
        }

        // Password match check
        if (password !== confirmPassword) {
            setErrorMsg('Passwords do not match.');
            return;
        }

        // Password strength (optional)
        if (password.length < 6) {
            setErrorMsg('Password must be at least 6 characters long.');
            return;
        }

        // Terms and privacy agreement
        if (!agreeTerms) {
            setErrorMsg('You must agree to the terms and privacy policy.');
            return;
        }

        // Show loading state
        setLoading(true);

        try {
            // Make API request
            const response = await axios.post('/api/signup', formData);

            // Success feedback and redirect
            setSuccessMsg('Signup successful! Redirecting to login...');
            setTimeout(() => router.push('/login'), 2000);
        } catch (error) {
            // Error handling with safe fallback
            setErrorMsg(error.response?.data?.error || 'Something went wrong. Please try again.');
        } finally {
            // Reset loading state
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
            <div ref={modalRef} className="relative flex flex-col md:flex-row bg-white text-[#001a1a] rounded-2xl shadow-2xl w-full max-w-5xl">
                {/* Close Button */}
                <button
                    onClick={() => router.push('/')}
                    className="absolute top-4 right-4 text-2xl text-[#001a1a] font-bold cursor-pointer hover:text-gray-700 z-10"
                    aria-label="Close"
                >
                    &times;
                </button>

                {/* Right Section (Form) */}
                <div className="w-full rounded-2xl md:w-1/2 flex flex-col justify-center items-center bg-white text-[#001a1a] p-6 md:rounded-l-2xl">
                    <h1 className="text-3xl text-loginBlue font-semibold text-center">Welcome!</h1>
                    <h4 className="font-light text-sm text-loginBlue text-center mt-1">Sign in to your ZM QR Code account</h4>

                    <form onSubmit={handleSubmit} className="flex flex-col items-center mt-6 w-full max-w-sm">
                        {/* Buttons Row */}
                        <div className="flex justify-between w-full gap-2 mb-4">
                            <button
                                onClick={() => setActive('new')}
                                type="button"
                                className={`flex-1 text-sm bg-[#e6e6e6] text-[#001a1a] px-4 py-2 rounded-sm hover:bg-[#d4d4d4] transition-all duration-300 ${active === 'new' ? 'border-b-4 border-[#008080]' : 'border-b-4 border-transparent cursor-pointer'}`}
                            >
                                I'm a new user
                            </button>
                            <button
                                onClick={() => {
                                    setActive('existing');
                                    router.push('/login');
                                }}
                                type="button"
                                className={`flex-1 text-sm bg-[#e6e6e6] text-[#001a1a] px-4 py-2 rounded-sm hover:bg-[#c0c0c0] transition-all duration-300 ${active === 'existing' ? 'border-b-4 border-[#008080]' : 'border-b-4 border-transparent cursor-pointer'}`}
                            >
                                I'm an existing user
                            </button>
                        </div>

                        {/* Form Fields */}
                        {[
                            { id: "name", name: "name", label: "Name*", type: "text" },
                            { id: "email", name: "email", label: "Official Email / Login ID*", type: "text" },
                            { id: "phone", name: "phone", label: "Phone Number*", type: "text" },
                            { id: "password", name: "password", label: "Password*", type: "password" },
                            { id: "confirmPassword", name: "confirmPassword", label: "Confirm password*", type: "password" }

                        ].map((input) => (
                            <div className="relative w-full mt-3" key={input.id}>
                                <input
                                    type={input.type === "password" && visiblePasswords[input.id] ? "text" : input.type}
                                    id={input.id}
                                    name={input.name}
                                    value={formData[input.id]}
                                    onChange={handleChange}
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

                                {input.type === "password" && (
                                    <button
                                        type="button"
                                        onClick={() => toggleVisibility(input.id)}
                                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                                    >
                                        {visiblePasswords[input.id] ? <FiEye size={18} /> : <FiEyeOff size={18} />}
                                    </button>
                                )}
                            </div>
                        ))}

                        {/* Checkbox */}
                        <div className="flex items-start mt-3 w-full gap-2 text-sm">
                            <input
                                type="checkbox"
                                checked={agreeTerms}
                                onChange={(e) => setAgreeTerms(e.target.checked)}
                                className="border-2 border-mainGreen mt-1"
                            />
                            <label>
                                I agree to <a href="/terms-conditions" target="_blank"><span className="text-mainGreen">terms</span></a> and <a href="/privacy-policies" target="_blank"><span className="text-mainGreen">privacy</span></a> policy
                            </label>
                        </div>

                        {/* Error/Success */}
                        {errorMsg && <p className="text-red-600 mt-2 text-sm">{errorMsg}</p>}
                        {successMsg && <p className="text-green-600 mt-2 text-sm">{successMsg}</p>}

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full my-2 relative overflow-hidden text-white font-medium px-6 py-2 rounded-sm transition duration-300 bg-[#008080] hover:bg-[#DF8788] group"
                        >
                            <span className="relative z-10">{loading ? 'Processing...' : 'Done'}</span>
                            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-[1200ms] ease-in-out" />
                        </button>

                        {/* Social Logins */}
                        <p className="text-sm text-[#001a1a] mt-4">or</p>
                        <div className="flex gap-4 mt-2">
                            {/* <FcGoogle size={30} className="cursor-pointer hover:scale-105 transition" />
                            <FaFacebook size={30} className="text-blue-500 cursor-pointer hover:scale-105 transition"/> */}
                            {/* Google Login Button */}
                            <button
                                onClick={() => signIn("google")}
                                className="flex items-center justify-center gap-3 rounded-md hover:bg-gray-100 transition"
                            >
                                <FcGoogle size={30} />
                            </button>

                            {/* Facebook Login Button */}
                            <button
                                onClick={() => signIn("facebook")}
                                className="flex items-center justify-center gap-3 rounded-md  hover:bg-gray-100 transition"
                            >
                                <FaFacebook size={30} color="#1877F2" />
                            </button>
                        </div>
                    </form>
                </div>

                {/* Left Section */}
                <div className="hidden md:flex bg-mainGreen md:w-1/2 flex-col justify-center items-center text-white p-6 md:rounded-r-2xl">
                    <Image src="/logos/zm-full.webp" alt="logo" width={150} height={150} className="m-5 mb-10" />
                    <h1 className="text-xl font-semibold text-center px-4 animate-bounce">
                        🔐 Trust us with your data. It's not just secure — it's encrypted 🔐
                    </h1>
                    <Image src="/qr-image-login.webp" alt="qr-image" width={400} height={400} className="m-5" />
                    <h4 className="text-md font-thin text-center px-4">
                        India's No.1 QR Code Generating and Managing Platform
                    </h4>
                </div>
            </div>
        </div>
    );
}
