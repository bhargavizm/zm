'use client';
import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { FcGoogle } from 'react-icons/fc';
import { FaFacebook } from "react-icons/fa";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { signIn } from 'next-auth/react';
import toast, { Toaster } from 'react-hot-toast';

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

    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [agreeTerms, setAgreeTerms] = useState(true);

    const router = useRouter();
    const [active, setActive] = useState('new');
    const modalRef = useRef(null);

    // ✅ Close modal if clicked outside or pressed Escape
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

    // ✅ Toggle password visibility
    const toggleVisibility = (id) => {
        setVisiblePasswords((prev) => ({ ...prev, [id]: !prev[id] }));
    };

    // ✅ Handle input change + live validation
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));

        let newErrors = { ...errors };
        if (name === "email") {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            newErrors.email = emailRegex.test(value) ? "" : "Invalid email address";
        }
if (name === "phone") {
    const phoneRegex = /^\d{10,15}$/; 
    newErrors.phone = phoneRegex.test(value) ? "" : "Phone must be 10 to 15 digits";
}

        if (name === "password" || name === "confirmPassword") {
            if (name === "password" && value.length < 6) {
                newErrors.password = "Password must be at least 6 characters";
            } else {
                newErrors.password = "";
            }
            if (
                (name === "confirmPassword" && value !== formData.password) ||
                (name === "password" && formData.confirmPassword && formData.confirmPassword !== value)
            ) {
                newErrors.confirmPassword = "Passwords do not match";
            } else {
                newErrors.confirmPassword = "";
            }
        }
        setErrors(newErrors);
    };

    // ✅ Submit handler
    const handleSubmit = async (e) => {
        e.preventDefault();
        const { name, email, phone, password, confirmPassword } = formData;

        if (!name || !email || !phone || !password || !confirmPassword) {
            toast.error('Please fill in all required fields.');
            return;
        }
        if (errors.email || errors.phone || errors.password || errors.confirmPassword) {
            toast.error('Please fix the validation errors first.');
            return;
        }
        if (!agreeTerms) {
            toast.error('You must agree to the terms and privacy policy.');
            return;
        }

        setLoading(true);
        try {
            await axios.post('/api/signup', formData);
            toast.success('Signup successful! Redirecting...');
            setTimeout(() => router.push('/login'), 2000);
        } catch (error) {
            toast.error(error.response?.data?.error || 'Something went wrong. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">

            <div ref={modalRef} className="relative flex flex-col md:flex-row bg-white text-[#001a1a] rounded-2xl shadow-2xl w-full max-w-5xl max-h-[90vh]">
                
                {/* Close Button */}
                <button
                    onClick={() => router.push('/')}
                    className="absolute top-4 right-4 text-2xl text-[#001a1a] font-bold hover:text-gray-700"
                >
                    &times;
                </button>

                {/* Right Section (Form) */}
                <div className="w-full md:w-1/2 flex flex-col justify-center items-center p-6">
                    <h1 className="text-3xl text-loginBlue font-semibold text-center">Welcome!</h1>
                    <h4 className="font-light text-sm text-loginBlue text-center mt-1">Sign in to your ZM QR Code account</h4>

                    <form onSubmit={handleSubmit} className="flex flex-col items-center mt-6 w-full max-w-sm">
                        
                        {/* Toggle Buttons */}
                        <div className="flex justify-between w-full gap-2 mb-4">
                            <button
                                onClick={() => setActive('new')}
                                type="button"
                                className={`flex-1 text-sm bg-[#e6e6e6] px-4 py-2 rounded-sm ${active === 'new' ? 'border-b-4 border-[#008080]' : 'border-b-4 border-transparent'}`}
                            >
                                I'm a new user
                            </button>
                            <button
                                onClick={() => { setActive('existing'); router.push('/login'); }}
                                type="button"
                                className={`flex-1 text-sm bg-[#e6e6e6] px-4 py-2 rounded-sm ${active === 'existing' ? 'border-b-4 border-[#008080]' : 'border-b-4 border-transparent'}`}
                            >
                                I'm an existing user
                            </button>
                        </div>

                        {/* Input Fields */}
                        {[
                            { id: "name", label: "Name*", type: "text" },
                            { id: "email", label: "Email*", type: "text" },
                            { id: "phone", label: "Phone*", type: "text" },
                            { id: "password", label: "Password*", type: "password" },
                            { id: "confirmPassword", label: "Confirm Password*", type: "password" }
                        ].map((input) => (
                            <div className="relative w-full mt-3" key={input.id}>
                                <input
                                    type={input.type === "password" && visiblePasswords[input.id] ? "text" : input.type}
                                    id={input.id}
                                    name={input.id}
                                    value={formData[input.id]}
                                    onChange={handleChange}
                                    placeholder=" "
                                    className={`peer w-full border-2 rounded-sm px-2 pt-4 pb-2 focus:outline-none 
                                        ${errors[input.id] ? "border-red-500" : "border-gray-300 focus:border-[#008080]"}`}
                                />
                                <label
                                    htmlFor={input.id}
                                    className="absolute left-3 -top-2 bg-white px-1 text-sm text-gray-500 transition-all
                                    peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 
                                    peer-focus:-top-2 peer-focus:text-sm peer-focus:text-[#001a1a]"
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
                                {errors[input.id] && (
                                    <p className="text-xs text-red-500 mt-1">{errors[input.id]}</p>
                                )}
                            </div>
                        ))}

                        {/* Checkbox */}
                        <div className="flex items-start mt-3 w-full gap-2 text-sm">
                            <input
                                type="checkbox"
                                checked={agreeTerms}
                                onChange={(e) => setAgreeTerms(e.target.checked)}
                                className="mt-1"
                            />
                            <label>
                                I agree to <a href="/terms-conditions" className="text-mainGreen">terms</a> and <a href="/privacy-policies" className="text-mainGreen">privacy</a> policy
                            </label>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full my-2 relative text-white font-medium px-6 py-2 rounded-sm bg-[#008080] hover:bg-[#DF8788] transition"
                        >
                            {loading ? 'Processing...' : 'Done'}
                        </button>

                        {/* Social Logins */}
                        <p className="text-sm text-[#001a1a] mt-4">or</p>
                        <div className="flex gap-4 mt-2">
                            <button onClick={() => signIn("google")} type="button" className="flex items-center justify-center hover:bg-gray-100 rounded-md p-2">
                                <FcGoogle size={30} />
                            </button>
                            <button onClick={() => signIn("facebook")} type="button" className="flex items-center justify-center hover:bg-gray-100 rounded-md p-2">
                                <FaFacebook size={30} color="#1877F2" />
                            </button>
                        </div>
                    </form>
                </div>

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
            </div>
        </div>
    );
}
