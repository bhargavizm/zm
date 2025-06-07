import React from 'react';
import { IoIosSend } from "react-icons/io";

const ContactUs = () => {
    return (
        <div className="w-full min-h-screen">
            {/* Navbar */}
            <nav className="bg-[#008080] text-white py-4 mt-15 shadow-md">
                <div className="max-w-6xl mx-auto px-4 flex justify-between items-center">
                    <div className="text-xl font-bold"></div>
                    <ul className="flex space-x-6 text-sm font-medium">
                        <li>
                            <a href="/faq" className="hover:underline">FAQ's</a>
                        </li>
                        <li>
                            <a href="#contact" className="hover:underline">Contact Us</a>
                        </li>
                    </ul>
                </div>
            </nav>

            {/* Contact Section */}
            <div id="contact" className="flex flex-col items-center justify-center w-full px-4 py-10">
                <h1 className="text-4xl font-extrabold text-[#001a1a] mb-2">Contact Us</h1>
                <p className="text-md text-[#1b1a1a] mb-6 text-center max-w-xl">
                    We'd love to hear from you. Send us a message and we'll get back to you as soon as possible.
                </p>
                <div className="w-full max-w-2xl bg-white p-8 rounded-2xl border-2 border-[#008080] shadow-lg">
                    <h2 className="text-2xl font-semibold text-[#001a1a] mb-6">Send us a message</h2>
                    <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="flex flex-col">
                            <label htmlFor="fullname" className="mb-1 text-sm font-medium text-[#001a1a]">Full Name</label>
                            <input
                                type="text"
                                id="fullname"
                                name="fullname"
                                placeholder="Enter your full name"
                                required
                                className="border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#008080] shadow-lg"
                            />
                        </div>

                        <div className="flex flex-col">
                            <label htmlFor="email" className="mb-1 text-sm font-medium text-[#001a1a]">Email</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                placeholder="Enter your email"
                                required
                                className="border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#008080] shadow-lg"
                            />
                        </div>

                        <div className="flex flex-col md:col-span-2">
                            <label htmlFor="subject" className="mb-1 text-sm font-medium text-[#001a1a]">Subject</label>
                            <input
                                type="text"
                                id="subject"
                                name="subject"
                                placeholder="Enter the subject"
                                required
                                className="border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#008080] shadow-lg"
                            />
                        </div>

                        <div className="flex flex-col md:col-span-2">
                            <label htmlFor="message" className="mb-1 text-sm font-medium text-[#001a1a]">Message</label>
                            <textarea
                                id="message"
                                name="message"
                                rows="5"
                                placeholder="Enter your message"
                                required
                                className="border border-gray-300 rounded-lg px-4 py-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-[#008080] shadow-lg"
                            ></textarea>
                        </div>

                        <div className="md:col-span-2 flex justify-end">
                            <button
                                type="submit"
                                className="bg-[#008080] w-full hover:bg-[#006666] text-white font-semibold flex items-center justify-center gap-2 px-6 py-3 rounded-lg transition duration-300"
                            >
                                <IoIosSend className="text-lg" />
                                Send Message
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ContactUs;
