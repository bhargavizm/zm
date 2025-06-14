'use client';
import React, { useState } from 'react';
import { IoIosSend } from "react-icons/io";

const ContactUs = () => {
    const [showSuccessModal, setShowSuccessModal] = useState(false);

    const handleFormSubmit = (e) => {
        e.preventDefault();
        setShowSuccessModal(true);
    };

    const closeSuccessModal = () => {
        setShowSuccessModal(false);
    };

    return (
        <div className="w-full min-h-screen bg-gradient-to-br from-teal-50 to-white font-sans">
            {/* Navbar */}
            <nav className="bg-teal-700 text-white py-4 shadow-xl">
                <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
                    <div className="text-2xl font-extrabold tracking-wide">Your Brand</div>
                    <ul className="flex space-x-8 text-base font-medium">
                        <li>
                            <a href="/faq" className="hover:text-teal-200 transition-colors duration-300">FAQ's</a>
                        </li>
                        <li>
                            <a href="#contact" className="hover:text-teal-200 transition-colors duration-300">Contact Us</a>
                        </li>
                    </ul>
                </div>
            </nav>

            {/* Contact Section */}
            <div id="contact" className="flex flex-col items-center justify-center w-full px-4 py-16 md:py-24">
                <h1 className="text-5xl md:text-6xl font-extrabold text-teal-900 mb-4 animate-fadeInDown">Get in Touch</h1>
                <p className="text-lg text-gray-700 mb-10 text-center max-w-2xl leading-relaxed animate-fadeInUp">
                    We'd love to hear from you! Whether you have a question about our services, need support, or just want to chat, our team is ready to help.
                </p>

                <div className="w-full max-w-5xl bg-white p-8 md:p-12 rounded-3xl border border-teal-200 shadow-2xl grid grid-cols-1 lg:grid-cols-2 gap-10">
                    {/* Left Section: Image */}
                    <div>
                        <img src="/images/normal/customerCare2.png" alt="Customer Care" />
                    </div>

                    {/* Right Section: Form */}
                    <div className="p-6">
                        <h2 className="text-3xl font-bold text-teal-900 mb-6">Send us a message</h2>
                        <form onSubmit={handleFormSubmit} className="grid grid-cols-1 gap-6">
                            <div className="flex flex-col">
                                <label htmlFor="fullname" className="mb-2 text-sm font-medium text-gray-700">Full Name</label>
                                <input
                                    type="text"
                                    id="fullname"
                                    name="fullname"
                                    placeholder="Enter your full name"
                                    required
                                    className="border border-gray-300 rounded-lg px-5 py-3 text-base text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-3 focus:ring-teal-400 focus:border-teal-500 transition-all duration-300 shadow-sm hover:shadow-md"
                                />
                            </div>

                            <div className="flex flex-col">
                                <label htmlFor="email" className="mb-2 text-sm font-medium text-gray-700">Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    placeholder="Enter your email"
                                    required
                                    className="border border-gray-300 rounded-lg px-5 py-3 text-base text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-3 focus:ring-teal-400 focus:border-teal-500 transition-all duration-300 shadow-sm hover:shadow-md"
                                />
                            </div>

                            <div className="flex flex-col">
                                <label htmlFor="subject" className="mb-2 text-sm font-medium text-gray-700">Subject</label>
                                <input
                                    type="text"
                                    id="subject"
                                    name="subject"
                                    placeholder="Enter the subject"
                                    required
                                    className="border border-gray-300 rounded-lg px-5 py-3 text-base text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-3 focus:ring-teal-400 focus:border-teal-500 transition-all duration-300 shadow-sm hover:shadow-md"
                                />
                            </div>

                            <div className="flex flex-col">
                                <label htmlFor="message" className="mb-2 text-sm font-medium text-gray-700">Message</label>
                                <textarea
                                    id="message"
                                    name="message"
                                    rows="6"
                                    placeholder="Enter your message"
                                    required
                                    className="border border-gray-300 rounded-lg px-5 py-3 text-base text-gray-800 placeholder-gray-400 resize-y focus:outline-none focus:ring-3 focus:ring-teal-400 focus:border-teal-500 transition-all duration-300 shadow-sm hover:shadow-md"
                                ></textarea>
                            </div>

                            <div className="flex justify-end mt-4">
                                <button
                                    type="submit"
                                    className="bg-teal-600 hover:bg-teal-700 text-white font-bold flex items-center justify-center gap-3 px-8 py-4 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-teal-300 transform hover:scale-105"
                                >
                                    <IoIosSend className="text-xl" />
                                    Send Message
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            {/* ✅ Success Modal */}
            {showSuccessModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
                    <div className="bg-white rounded-xl shadow-xl p-6 max-w-sm w-full border border-teal-200 text-center">
                        <h2 className="text-xl font-bold text-[#008080] mb-3">Message Sent!</h2>
                        <p className="text-sm text-gray-700 mb-4">
                            Thank you for reaching out. We’ll get back to you as soon as possible.
                        </p>
                        <button
                            onClick={closeSuccessModal}
                            className="mt-2 px-6 py-2 bg-[#008080] text-white rounded hover:bg-[#006666] transition"
                        >
                            OK
                        </button>
                    </div>
                </div>
            )}

            {/* Footer */}
            <footer className="bg-gray-800 text-white text-center py-6 text-sm">
                <p>&copy; {new Date().getFullYear()} Your Brand. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default ContactUs;
