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
        <div>
            <nav className="bg-[#008080] text-white py-4 mt-15 shadow-md">
                <div className="max-w-6xl mx-auto px-4 flex justify-between items-center">
                    <div className="text-xl font-bold"></div>
                    <ul className="flex space-x-6 text-sm font-medium">
                        <li>
                            <a href="/faq" className="hover:underline">FAQ's</a>
                        </li>
                        <li>
                            <a href="/contactUs" className="hover:underline">Contact Us</a>
                        </li>
                    </ul>
                </div>
            </nav>
            <BackgroundBeamsWithCollision className="relative min-h-screen w-full overflow-hidden bg-[#008080]">
                {/* Overlay noise */}
                {/* <div className="absolute inset-0 bg-[url('/noise.jpg')] opacity-[0.10] pointer-events-none z-0" /> */}

                {/* FAQ Container */}
                <div className="relative w-2/3 mx-auto z-10 px-4 sm:px-6 lg:px-8 py-12">
                    <h1 className="text-4xl md:text-5xl font-bold text-white text-center mb-12">
                        Frequently Asked Questions
                    </h1>

                    <div className="">
                        {faqs.map((faq, index) => (
                            <div
                                key={faq.id}
                                className="mb-4 border border-[#001a1a] rounded-xl overflow-hidden transition-all duration-300"
                            >
                                <button
                                    className="w-full text-left text-lg font-semibold text-[#fff] px-4 py-3 flex justify-between items-center bg-[#003e3e] hover:bg-[#3d7171] transition-colors duration-300"
                                    onClick={() => toggleFAQ(index)}
                                >
                                    {faq.id}. {faq.question}
                                    <span
                                        className={`transform transition-transform duration-300 ${openIndex === index ? 'rotate-180' : ''}`}
                                    >
                                        ▼
                                    </span>
                                </button>
                                {openIndex === index && (
                                    <div className="px-4 pb-4 pt-2">
                                        <div className="aspect-video w-full rounded-md overflow-hidden shadow-md">
                                            <iframe
                                                src={faq.videoUrl}
                                                title={`FAQ Video ${faq.id}`}
                                                className="w-full h-full"
                                                allowFullScreen
                                            />
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </BackgroundBeamsWithCollision>
        </div>
    );
};

export default FAQPage;
