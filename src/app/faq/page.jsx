'use client';

import React, { useState, useEffect } from 'react';
import { BackgroundBeamsWithCollision } from "@/components/ui/background-beams-with-collision";

const FAQPage = () => {
    const [openIndex, setOpenIndex] = useState(null);
    const [faqs, setFaqs] = useState([]);

    const toggleFAQ = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    useEffect(() => {
        import('../data/faq.json').then((data) => setFaqs(data.default || data));
    }, []);

    return (
        <div className="bg-[#008080] pt-40 ">
            {/* Fixed Navbar */}
            <nav className="bg-[#008080] mt-36 my-30 text-white fixed top-0 left-0 w-full z-50 shadow-md">
                <div className="max-w-6xl mx-auto px-4 flex items-center justify-between h-14">
                    <ul className="flex space-x-6 text-sm font-medium ml-auto">
                        <li>
                            <a href="/faq" className="hover:underline transition duration-200">FAQ's</a>
                        </li>
                        <li>
                            <a href="/contactUs" className="hover:underline transition duration-200">Contact Us</a>
                        </li>
                    </ul>
                </div>
            </nav>

            {/* Main Section */}
            <BackgroundBeamsWithCollision className="pt-24 relative w-full min-h-screen overflow-x-hidden">
                <div className="max-w-4xl mx-auto z-10 px-4 sm:px-6 lg:px-8">
                    <h1 className="text-4xl md:text-5xl font-bold text-white text-center mb-6">
                        Frequently Asked Questions
                    </h1>

                    {/* FAQ Accordion List */}
                    <div className="space-y-4 pb-10">
                        {faqs.map((faq, index) => (
                            <div
                                key={faq.id}
                                className="border border-[#004d4d] rounded-xl overflow-hidden shadow-md bg-[#003e3e] transition-all duration-300"
                            >
                                <button
                                    className="w-full text-left text-lg font-semibold text-white px-6 py-4 flex justify-between items-center hover:bg-[#2d6464] transition-colors duration-300"
                                    onClick={() => toggleFAQ(index)}
                                >
                                    {faq.id}. {faq.question}
                                    <span
                                        className={`transform transition-transform duration-300 ${
                                            openIndex === index ? 'rotate-180' : ''
                                        }`}
                                    >
                                        ▼
                                    </span>
                                </button>

                                <div
                                    className={`grid transition-all duration-500 ease-in-out ${
                                        openIndex === index ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                                    }`}
                                >
                                    <div className="overflow-hidden">
                                        <div className="bg-[#001a1a] px-6 pb-6 pt-2 space-y-4 text-white text-base leading-relaxed">
                                            <p>{faq.answer}</p>
                                            <div className="aspect-video w-full rounded-md overflow-hidden shadow-md">
                                                <iframe
                                                    src={faq.videoUrl}
                                                    title={`FAQ Video ${faq.id}`}
                                                    className="w-full h-full"
                                                    allowFullScreen
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </BackgroundBeamsWithCollision>
        </div>
    );
};

export default FAQPage;
