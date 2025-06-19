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
        <div className="bg-[#001a1a]  w-full overflow-x-hidden relative">
            {/* Fixed Top Navbar */}
            <nav className="bg-white text-mainGreen fixed top-18 py-2 left-0 w-full z-40 shadow-md">
                <div className="max-w-6xl mx-auto px-4 flex items-center justify-between h-14">
                    
                    <ul className="flex space-x-6 text-xl pr-30 font-medium ml-auto">
                        <li>
                            <a href="/faq" className="hover:underline transition duration-200">FAQ's</a>
                        </li>
                        <li>
                            <a href="/contactUs" className="hover:underline transition duration-200">Contact Us</a>
                        </li>
                    </ul>
                </div>
            </nav>

            {/* Main Content Area */}
            <div className="py-48 relative z-10 min-h-[calc(100vh-4rem)]">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h1 className="text-3xl md:text-5xl font-bold text-white text-center mb-10">
                        Frequently Asked Questions
                    </h1>

                    <div className="space-y-4">
                        {faqs.map((faq, index) => (
                            <div
                                key={faq.id}
                                className="border border-[#004d4d] rounded-xl overflow-hidden shadow-md bg-[#003e3e] transition-all duration-300"
                            >
                                <button
                                    className="w-full text-left text-base md:text-lg font-semibold text-white px-6 py-4 flex justify-between items-center hover:bg-[#2d6464] transition-colors duration-300"
                                    onClick={() => toggleFAQ(index)}
                                >
                                    <span className="mr-4">{faq.id}. {faq.question}</span>
                                    <span
                                        className={transform transition-transform duration-300 min-w-4 ${openIndex === index ? 'rotate-180' : ''}}
                                    >
                                        ▼
                                    </span>
                                </button>

                                {openIndex === index && (
                                    <div className="bg-[#001a1a] px-6 pb-6 pt-2 text-white text-sm md:text-base leading-relaxed">
                                        <p className="mb-4">{faq.answer}</p>
                                        {faq.videoUrl && (
                                            <div className="aspect-video w-full rounded-md overflow-hidden shadow-md">
                                                <iframe
                                                    src={faq.videoUrl}
                                                    title={FAQ Video ${faq.id}}
                                                    className="w-full h-full"
                                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                    allowFullScreen
                                                />
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            
            {/* Background with collision */}
            <BackgroundBeamsWithCollision className="fixed top-0 left-0 w-full h-full -z-10" />
        </div>
    );
};

export default FAQPage;