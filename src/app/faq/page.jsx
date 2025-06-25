// "use client";

// import React, { useState, useEffect } from "react";
// import { BackgroundBeamsWithCollision } from "@/components/ui/background-beams-with-collision";
// import { useLanguage } from '@/context/languageContext/LanguageContext';

// // const faq = [
// //     {
// //         "id": 1,
// //         "question": "What is the refund policy?",
// //         "answer": "You can request a refund within 7 days of purchase if the service hasn't been used or activated.",
// //         "videoUrl": "https://www.youtube.com/zm/zmqrcode"
// //     },
// //     {
// //         "id": 2,
// //         "question": "How do I update my profile?",
// //         "answer": "Log in to your dashboard, go to 'My Profile', and click 'Edit' to update your personal information.",
// //         "videoUrl": "https://www.youtube.com/zm/zmqrcode"
// //     },
// //     {
// //         "id": 3,
// //         "question": "How can I contact support?",
// //         "answer": "You can contact support through the 'Contact Us' page or by emailing support@zmqrcode.com.",
// //         "videoUrl": "https://www.youtube.com/zm/zmqrcode"
// //     },
// //     {
// //         "id": 4,
// //         "question": "After a QR code is generated, is it possible to add other content to it?",
// //         "answer": "Yes, you can update or add additional content through the dynamic QR code management section.",
// //         "videoUrl": "https://www.youtube.com/zm/zmqrcode"
// //     },
// //     {
// //         "id": 5,
// //         "question": "Using a single mobile number or email, how many QR codes can we generate?",
// //         "answer": "You can generate unlimited QR codes using a single account, depending on your subscription plan.",
// //         "videoUrl": "https://www.youtube.com/zm/zmqrcode"
// //     },
// //     {
// //         "id": 6,
// //         "question": "Can we generate a QR code without a password?",
// //         "answer": "Yes, password protection is optional. You can create public QR codes without a password.",
// //         "videoUrl": "https://www.youtube.com/zm/zmqrcode"
// //     },
// //     {
// //         "id": 7,
// //         "question": "Can we download an invoice through a QR code?",
// //         "answer": "Yes, you can link invoices to your QR code for users to download them instantly.",
// //         "videoUrl": "https://www.youtube.com/zm/zmqrcode"
// //     },
// //     {
// //         "id": 8,
// //         "question": "How can I contact customer support for QR codes?",
// //         "answer": "Reach out via live chat, email, or through the help section on our website.",
// //         "videoUrl": "https://www.youtube.com/zm/zmqrcode"
// //     },
// //     {
// //         "id": 9,
// //         "question": "Can I make payments using a QR code?",
// //         "answer": "Yes, our platform supports payment-enabled QR codes using UPI and other gateways.",
// //         "videoUrl": "https://www.youtube.com/zm/zmqrcode"
// //     },
// //     {
// //         "id": 10,
// //         "question": "Can I delete my saved data on a QR code?",
// //         "answer": "Yes, you can delete or update the content linked to any dynamic QR code via your dashboard.",
// //         "videoUrl": "https://www.youtube.com/zm/zmqrcode"
// //     },
// //     {
// //         "id": 11,
// //         "question": "Will I get a refund if I cancel my subscription?",
// //         "answer": "Refunds are provided based on our refund policy. Generally, cancellations within 7 days are eligible.",
// //         "videoUrl": "https://www.youtube.com/zm/zmqrcode"
// //     },
// //     {
// //         "id": 12,
// //         "question": "If I delete my QR account, will my data get erased?",
// //         "answer": "Yes, once your account is deleted, all your QR codes and related data will be permanently removed.",
// //         "videoUrl": "https://www.youtube.com/zm/zmqrcode"
// //     },
// //     {
// //         "id": 13,
// //         "question": "After the plan expires, what should I do?",
// //         "answer": "You can renew your plan to retain full access. Otherwise, your QR codes may be deactivated.",
// //         "videoUrl": "https://www.youtube.com/zm/zmqrcode"
// //     },
// //     {
// //         "id": 14,
// //         "question": "What is the validity of a QR code?",
// //         "answer": "Static QR codes are valid permanently. Dynamic codes are valid as long as your subscription is active.",
// //         "videoUrl": "https://www.youtube.com/zm/zmqrcode"
// //     },
// //     {
// //         "id": 15,
// //         "question": "How much does it cost to renew my QR code annually?",
// //         "answer": "Pricing varies by plan. Visit our pricing page to see the latest renewal charges.",
// //         "videoUrl": "https://www.youtube.com/zm/zmqrcode"
// //     },
// //     {
// //         "id": 16,
// //         "question": "Will I lose my data if I don’t renew my QR code?",
// //         "answer": "Yes, dynamic QR code data will become inaccessible unless the plan is renewed within the grace period.",
// //         "videoUrl": "https://www.youtube.com/zm/zmqrcode"
// //     },
// //     {
// //         "id": 17,
// //         "question": "Can I use my QR code for multiple services?",
// //         "answer": "Yes, you can link your QR code to multiple services or update the destination anytime for dynamic codes.",
// //         "videoUrl": "https://www.youtube.com/zm/zmqrcode"
// //     },
// //     {
// //         "id": 18,
// //         "question": "How do I create an account with ZMQRCode Services?",
// //         "answer": "Click on 'Sign Up' on the homepage and fill in the required details to create your account.",
// //         "videoUrl": "https://www.youtube.com/zm/zmqrcode"
// //     },
// //     {
// //         "id": 19,
// //         "question": "What information do I need to provide to create an account?",
// //         "answer": "You'll need a valid email address, mobile number, and a strong password.",
// //         "videoUrl": "https://www.youtube.com/zm/zmqrcode"
// //     },
// //     {
// //         "id": 20,
// //         "question": "I forgot my password. How can I reset it?",
// //         "answer": "Click 'Forgot Password' on the login page and follow the instructions sent to your email.",
// //         "videoUrl": "https://www.youtube.com/zm/zmqrcode"
// //     },
// //     {
// //         "id": 21,
// //         "question": "How do I update my account information?",
// //         "answer": "Log in to your account and navigate to the 'Settings' section to update your details.",
// //         "videoUrl": "https://www.youtube.com/zm/zmqrcode"
// //     },
// //     {
// //         "id": 22,
// //         "question": "Can I change my email address associated with my account?",
// //         "answer": "Yes, go to 'Account Settings' and update your email. A verification email will be sent.",
// //         "videoUrl": "https://www.youtube.com/zm/zmqrcode"
// //     }
// // ]
// const FAQPage = () => {
//     const [openIndex, setOpenIndex] = useState(null);
//     const [faqs, setFaqs] = useState([]);
//     const { dictionary } = useLanguage();

//     const toggleFAQ = (index) => {
//         setOpenIndex(openIndex === index ? null : index);
//     };

//     useEffect(() => {
//         import("../data/faq.json").then((data) => setFaqs(data.default || data));
//     }, []);

//     return (
//         <div className="bg-[#001a1a]  w-full overflow-x-hidden relative">
//             {/* Main Content Area */}
//             <div className="py-48 relative z-10 min-h-[calc(100vh-4rem)]">
//                 <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
//                     {/* <h1 className="text-3xl md:text-5xl font-bold text-white text-center mb-10">
//                         Frequently Asked Questions
//                     </h1> */}
//                     <h1 className="text-3xl md:text-5xl font-bold text-white text-center mb-10">
//                         {dictionary.faq.heading}
//                     </h1>

//                     <div className="space-y-4">
//                         {faqs.map((faq, index) => (
//                             <div
//                                 key={faq.id}
//                                 className="border border-[#004d4d] rounded-xl overflow-hidden shadow-md bg-[#003e3e] transition-all duration-300"
//                             >
//                                 <button
//                                     className="w-full text-left text-base md:text-lg font-semibold text-white px-6 py-4 flex justify-between items-center hover:bg-[#2d6464] transition-colors duration-300"
//                                     onClick={() => toggleFAQ(index)}
//                                 >
//                                     <span className="mr-4">
//                                         {faq.id}. {faq.question}
//                                     </span>
//                                     <span
//                                         className={`transform transition-transform duration-300 min-w-4 ${openIndex === index ? "rotate-180" : ""
//                                             }`}
//                                     >
//                                         ▼
//                                     </span>
//                                 </button>

//                                 {openIndex === index && (
//                                     <div className="bg-[#001a1a] px-6 pb-6 pt-2 text-white text-sm md:text-base leading-relaxed">
//                                         <p className="mb-4">{faq.answer}</p>
//                                         {faq.videoUrl && (
//                                             <div className="aspect-video w-full rounded-md overflow-hidden shadow-md">
//                                                 <iframe
//                                                     src={faq.videoUrl}
//                                                     title={`FAQ Video ${faq.id}`}
//                                                     className="w-full h-full"
//                                                     allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//                                                     allowFullScreen
//                                                 />
//                                             </div>
//                                         )}
//                                     </div>
//                                 )}
//                             </div>
//                         ))}
//                     </div>
//                 </div>
//             </div>

//             {/* Background with collision */}
//             <BackgroundBeamsWithCollision className="fixed top-0 left-0 w-full h-full -z-10" />
//         </div>
//     );
// };

// export default FAQPage;

"use client";

import React, { useState } from "react";
import { BackgroundBeamsWithCollision } from "@/components/ui/background-beams-with-collision";
import { useLanguage } from '@/context/languageContext/LanguageContext';

const FaqComponent = () => {
    const { dictionary } = useLanguage(); // Access multilingual data
    const faqList = dictionary?.faq?.faqs || [];
    const heading = dictionary?.faq?.heading || "FAQs";

    const [activeIndex, setActiveIndex] = useState(null);

    const toggleFAQ = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    return (
        <div className="bg-[#001a1a] w-full overflow-x-hidden relative">
            {/* Main Content Area */}
            <div className="py-48 relative z-10 min-h-[calc(100vh-4rem)]">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h1 className="text-3xl md:text-5xl font-bold text-white text-center mb-10">
                        {heading}
                    </h1>

                    <div className="space-y-4">
                        {faqList.map((item, index) => (
                            <div key={item.id} className="border border-[#004d4d] rounded-xl overflow-hidden shadow-md bg-[#003e3e] transition-all duration-300">
                                <button
                                    onClick={() => toggleFAQ(index)}
                                    className="w-full text-left text-base md:text-lg font-semibold text-white px-6 py-4 flex justify-between items-center hover:bg-[#2d6464] transition-colors duration-300"
                                >
                                    <span className="mr-4">
                                        {item.id}. {item.question}
                                    </span>
                                    <span className={`transform transition-transform duration-300 min-w-4 ${activeIndex === index ? "rotate-180" : ""}`}>
                                        ▼
                                    </span>
                                </button>

                                {activeIndex === index && (
                                    <div className="bg-[#001a1a] px-6 pb-6 pt-2 text-white text-sm md:text-base leading-relaxed">
                                        <p className="mb-4">{item.answer}</p>
                                        {item.videoUrl && (
                                            <div className="aspect-video w-full rounded-md overflow-hidden shadow-md">
                                                <iframe
                                                    src={item.videoUrl}
                                                    title={`FAQ Video ${item.id}`}
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

export default FaqComponent;
